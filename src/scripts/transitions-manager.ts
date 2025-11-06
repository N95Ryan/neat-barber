/**
 * NEAT Barber - Transitions Manager
 * Advanced management of Astro View Transitions
 * State preservation, performance, and accessibility
 */

interface ScrollPosition {
  path: string;
  scrollY: number;
  timestamp: number;
}

interface FormState {
  path: string;
  data: FormData;
  timestamp: number;
}

class TransitionsManager {
  private scrollPositions: Map<string, ScrollPosition> = new Map();
  private formStates: Map<string, FormState> = new Map();
  private prefersReducedMotion: boolean = false;
  private performanceMetrics: Map<string, number> = new Map();
  private maxStoredPositions: number = 20;
  private maxStoredForms: number = 10;
  private transitionStartTime: number = 0;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the transitions manager
   */
  private initialize(): void {
    // Check user preferences
    this.updatePreferenceReducedMotion();

    // Attach event listeners
    this.attachEventListeners();

    // Load saved states
    this.loadStoredStates();
  }

  /**
   * Check the prefers-reduced-motion preference
   */
  private updatePreferenceReducedMotion(): void {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Listen for preference changes
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
  }

  /**
   * Attach event listeners to transitions
   */
  private attachEventListeners(): void {
    // Before transition preparation
    document.addEventListener('astro:before-preparation', (e: any) => {
      this.handleBeforePreparation(e);
    });

    // After DOM swap
    document.addEventListener('astro:after-swap', (e: any) => {
      this.handleAfterSwap(e);
    });

    // After page load
    document.addEventListener('astro:page-load', (e: any) => {
      this.handlePageLoad(e);
    });

    // Before transition starts
    document.addEventListener('astro:before-swap', (e: any) => {
      this.handleBeforeSwap(e);
    });
  }

  /**
   * Before transition preparation
   */
  private handleBeforePreparation(event: any): void {
    const startTime = performance.now();
    this.transitionStartTime = startTime;

    // Save scroll position
    this.saveScrollPosition();

    // Save form states
    this.saveFormStates();

    // Add CSS classes for animations
    document.documentElement.classList.add('astro-transition');
    document.body.classList.add('transitioning');

    // Record transition start for metrics
    this.performanceMetrics.set('transitionStart', startTime);
  }

  /**
   * Before DOM swap
   */
  private handleBeforeSwap(event: any): void {
    // Add data attributes for contextual animations
    this.updateTransitionScopes();

    // Measure time before swap
    const beforeSwapTime = performance.now();
    this.performanceMetrics.set('beforeSwapTime', beforeSwapTime);
  }

  /**
   * After DOM swap
   */
  private handleAfterSwap(event: any): void {
    // Measure swap time
    const afterSwapTime = performance.now();
    const swapDuration =
      afterSwapTime - (this.performanceMetrics.get('beforeSwapTime') || 0);
    this.performanceMetrics.set('swapDuration', swapDuration);

    // Close open interactive elements
    this.closeOpenElements();

    // Reset scroll position
    window.scrollTo(0, 0);

    // Clean old listeners
    this.cleanupOldListeners();

    // Reset WOW.js animations
    if (window.WOW) {
      new (window.WOW as any)().init();
    }
  }

  /**
   * After page load completion
   */
  private handlePageLoad(event: any): void {
    const transitionEndTime = performance.now();
    const totalDuration = transitionEndTime - this.transitionStartTime;

    // Record performance metrics
    this.recordPerformanceMetrics(totalDuration);

    // Remove transition CSS classes
    document.documentElement.classList.remove('astro-transition');
    document.body.classList.remove('transitioning');

    // Reset event listeners
    this.reinitializeEventListeners();

    // Display metrics in development
    if (process.env.NODE_ENV === 'development') {
      this.logPerformanceMetrics();
    }
  }

  /**
   * Save current scroll position
   */
  private saveScrollPosition(): void {
    const path = window.location.pathname;
    const scrollPosition: ScrollPosition = {
      path,
      scrollY: window.scrollY,
      timestamp: Date.now(),
    };

    this.scrollPositions.set(path, scrollPosition);

    // Clean old positions if necessary
    if (this.scrollPositions.size > this.maxStoredPositions) {
      const oldestEntry = Array.from(this.scrollPositions.values()).reduce(
        (oldest, current) =>
          current.timestamp < oldest.timestamp ? current : oldest
      );
      this.scrollPositions.delete(oldestEntry.path);
    }

    // Save to sessionStorage for page reloads
    try {
      sessionStorage.setItem(
        'scrollPositions',
        JSON.stringify(Array.from(this.scrollPositions.entries()))
      );
    } catch (e) {
      console.warn('Unable to save scroll positions', e);
    }
  }

  /**
   * Save form states
   */
  private saveFormStates(): void {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const formData = new FormData(form);
      const path = window.location.pathname;

      if (formData.entries().next().done === false) {
        const formState: FormState = {
          path,
          data: formData,
          timestamp: Date.now(),
        };

        const formKey = `${path}_${form.id || form.name}`;
        this.formStates.set(formKey, formState);
      }
    });

    // Clean old states if necessary
    if (this.formStates.size > this.maxStoredForms) {
      const oldestEntry = Array.from(this.formStates.values()).reduce(
        (oldest, current) =>
          current.timestamp < oldest.timestamp ? current : oldest
      );
      const keyToDelete = Array.from(this.formStates.entries()).find(
        ([_, v]) => v === oldestEntry
      )?.[0];
      if (keyToDelete) this.formStates.delete(keyToDelete);
    }
  }

  /**
   * Load saved states
   */
  private loadStoredStates(): void {
    try {
      const scrollData = sessionStorage.getItem('scrollPositions');
      if (scrollData) {
        this.scrollPositions = new Map(JSON.parse(scrollData));
      }
    } catch (e) {
      console.warn('Unable to load scroll positions', e);
    }
  }

  /**
   * Close open interactive elements
   */
  private closeOpenElements(): void {
    // Close mobile menus
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    const burgerBtn = document.getElementById('burgerMenuBtn');

    if (mobileMenu?.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      burgerBtn?.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close modals (if present)
    const modales = document.querySelectorAll('[role="dialog"]');
    modales.forEach((modal) => {
      if (modal.hasAttribute('open')) {
        (modal as HTMLDialogElement).close();
      }
    });

    // Reset dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('show');
    });
  }

  /**
   * Update data attributes for contextual animations
   */
  private updateTransitionScopes(): void {
    // Identify page type and add appropriate scopes
    const articleContent = document.querySelector('[data-astro-transition-scope*="article"]');
    const pagination = document.querySelector('[data-astro-transition-scope*="pagination"]');
    const blogNav = document.querySelector('[data-astro-transition-scope*="blog-nav"]');

    // Data attributes are already defined in Astro files
    // This function can be used for dynamic adjustments
  }

  /**
   * Clean old listeners
   */
  private cleanupOldListeners(): void {
    // Event listeners are automatically cleaned during DOM swap
    // This function can be used for specific cleanups
  }

  /**
   * Reinitialize event listeners after transition
   */
  private reinitializeEventListeners(): void {
    // Reset navbar listeners
    this.reinitializeNavbarListeners();

    // Reset form listeners
    this.reinitializeFormListeners();

    // Reset global animation scripts
    if ((window as any).initAnimations) {
      (window as any).initAnimations();
    }
  }

  /**
   * Reset navbar listeners
   */
  private reinitializeNavbarListeners(): void {
    const burgerBtn = document.getElementById('burgerMenuBtn');
    const closeBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenuOverlay');

    if (!burgerBtn || !closeBtn || !mobileMenu) return;

    // Clone elements to remove old listeners
    const newBurgerBtn = burgerBtn.cloneNode(true) as HTMLElement;
    const newCloseBtn = closeBtn.cloneNode(true) as HTMLElement;
    const newMobileMenu = mobileMenu.cloneNode(true) as HTMLElement;

    burgerBtn.replaceWith(newBurgerBtn);
    closeBtn.replaceWith(newCloseBtn);
    mobileMenu.replaceWith(newMobileMenu);

    // Add new listeners
    const body = document.body;

    function openMenu(): void {
      newBurgerBtn?.classList.add('active');
      newMobileMenu?.classList.add('active');
      body.style.overflow = 'hidden';
    }

    function closeMenu(): void {
      newBurgerBtn?.classList.remove('active');
      newMobileMenu?.classList.remove('active');
      body.style.overflow = '';
    }

    newBurgerBtn?.addEventListener('click', openMenu);
    newCloseBtn?.addEventListener('click', closeMenu);

    newMobileMenu?.addEventListener('click', (e) => {
      if (e.target === newMobileMenu) {
        closeMenu();
      }
    });

    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /**
   * Reset form listeners
   */
  private reinitializeFormListeners(): void {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        this.saveFormStates();
      });
    });
  }

  /**
   * Record performance metrics
   */
  private recordPerformanceMetrics(totalDuration: number): void {
    this.performanceMetrics.set('totalDuration', totalDuration);

    // Check Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-input') {
              this.performanceMetrics.set('FID', (entry as any).processingDuration);
            }
          }
        });

        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('Performance observer not supported', e);
      }
    }
  }

  /**
   * Display performance metrics (development only)
   */
  private logPerformanceMetrics(): void {
    console.group('📊 Transition Performance Metrics');
    this.performanceMetrics.forEach((value, key) => {
      console.log(`${key}: ${value.toFixed(2)}ms`);
    });
    console.groupEnd();
  }

  /**
   * Get metrics publicly
   */
  public getMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    this.performanceMetrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Check if reduced animations are enabled
   */
  public getPreferReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }
}

// Initialize the manager on document load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    (window as any).transitionsManager = new TransitionsManager();
  });
} else {
  (window as any).transitionsManager = new TransitionsManager();
}

export default TransitionsManager;
