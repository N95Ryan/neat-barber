/**
 * NEAT Barber - Transitions Manager
 * Gestion avancée des transitions View Transitions d'Astro
 * Préservation d'état, performance, et accessibilité
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
   * Initialiser le gestionnaire de transitions
   */
  private initialize(): void {
    // Vérifier les préférences utilisateur
    this.updatePreferenceReducedMotion();

    // Attacher les event listeners
    this.attachEventListeners();

    // Charger les états sauvegardés
    this.loadStoredStates();
  }

  /**
   * Vérifier la préférence prefers-reduced-motion
   */
  private updatePreferenceReducedMotion(): void {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Écouter les changements de préférence
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
  }

  /**
   * Attacher les event listeners aux transitions
   */
  private attachEventListeners(): void {
    // Avant la préparation de la transition
    document.addEventListener('astro:before-preparation', (e: any) => {
      this.handleBeforePreparation(e);
    });

    // Après le swap du DOM
    document.addEventListener('astro:after-swap', (e: any) => {
      this.handleAfterSwap(e);
    });

    // Après le chargement de la page
    document.addEventListener('astro:page-load', (e: any) => {
      this.handlePageLoad(e);
    });

    // Avant que la transition ne commence
    document.addEventListener('astro:before-swap', (e: any) => {
      this.handleBeforeSwap(e);
    });
  }

  /**
   * Avant la préparation de la transition
   */
  private handleBeforePreparation(event: any): void {
    const startTime = performance.now();
    this.transitionStartTime = startTime;

    // Sauvegarder la position de scroll
    this.saveScrollPosition();

    // Sauvegarder les états de formulaires
    this.saveFormStates();

    // Ajouter des classes CSS pour les animations
    document.documentElement.classList.add('astro-transition');
    document.body.classList.add('transitioning');

    // Enregistrer le début de la transition pour les métriques
    this.performanceMetrics.set('transitionStart', startTime);
  }

  /**
   * Avant le swap du DOM
   */
  private handleBeforeSwap(event: any): void {
    // Ajouter les data attributes pour les animations contextuelles
    this.updateTransitionScopes();

    // Mesurer le temps avant swap
    const beforeSwapTime = performance.now();
    this.performanceMetrics.set('beforeSwapTime', beforeSwapTime);
  }

  /**
   * Après le swap du DOM
   */
  private handleAfterSwap(event: any): void {
    // Mesurer le temps du swap
    const afterSwapTime = performance.now();
    const swapDuration =
      afterSwapTime - (this.performanceMetrics.get('beforeSwapTime') || 0);
    this.performanceMetrics.set('swapDuration', swapDuration);

    // Fermer les éléments interactifs ouverts
    this.closeOpenElements();

    // Réinitialiser la position de scroll
    window.scrollTo(0, 0);

    // Nettoyer les anciens listeners
    this.cleanupOldListeners();

    // Réinitialiser les animations WOW.js
    if (window.WOW) {
      new (window.WOW as any)().init();
    }
  }

  /**
   * Après le chargement complet de la page
   */
  private handlePageLoad(event: any): void {
    const transitionEndTime = performance.now();
    const totalDuration = transitionEndTime - this.transitionStartTime;

    // Enregistrer les métriques de performance
    this.recordPerformanceMetrics(totalDuration);

    // Retirer les classes CSS de transition
    document.documentElement.classList.remove('astro-transition');
    document.body.classList.remove('transitioning');

    // Réinitialiser les listeners
    this.reinitializeEventListeners();

    // Afficher les métriques en développement
    if (process.env.NODE_ENV === 'development') {
      this.logPerformanceMetrics();
    }
  }

  /**
   * Sauvegarder la position de scroll actuelle
   */
  private saveScrollPosition(): void {
    const path = window.location.pathname;
    const scrollPosition: ScrollPosition = {
      path,
      scrollY: window.scrollY,
      timestamp: Date.now(),
    };

    this.scrollPositions.set(path, scrollPosition);

    // Nettoyer les anciennes positions si nécessaire
    if (this.scrollPositions.size > this.maxStoredPositions) {
      const oldestEntry = Array.from(this.scrollPositions.values()).reduce(
        (oldest, current) =>
          current.timestamp < oldest.timestamp ? current : oldest
      );
      this.scrollPositions.delete(oldestEntry.path);
    }

    // Sauvegarder dans sessionStorage pour les rechargements
    try {
      sessionStorage.setItem(
        'scrollPositions',
        JSON.stringify(Array.from(this.scrollPositions.entries()))
      );
    } catch (e) {
      console.warn('Impossible de sauvegarder les positions de scroll', e);
    }
  }

  /**
   * Sauvegarder les états des formulaires
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

    // Nettoyer les anciens états si nécessaire
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
   * Charger les états sauvegardés
   */
  private loadStoredStates(): void {
    try {
      const scrollData = sessionStorage.getItem('scrollPositions');
      if (scrollData) {
        this.scrollPositions = new Map(JSON.parse(scrollData));
      }
    } catch (e) {
      console.warn('Impossible de charger les positions de scroll', e);
    }
  }

  /**
   * Fermer les éléments interactifs ouverts
   */
  private closeOpenElements(): void {
    // Fermer les menus mobiles
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    const burgerBtn = document.getElementById('burgerMenuBtn');

    if (mobileMenu?.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      burgerBtn?.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Fermer les modales (si présentes)
    const modales = document.querySelectorAll('[role="dialog"]');
    modales.forEach((modal) => {
      if (modal.hasAttribute('open')) {
        (modal as HTMLDialogElement).close();
      }
    });

    // Réinitialiser les dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('show');
    });
  }

  /**
   * Mettre à jour les data attributes pour les animations contextuelles
   */
  private updateTransitionScopes(): void {
    // Identifier le type de page et ajouter les scopes appropriés
    const articleContent = document.querySelector('[data-astro-transition-scope*="article"]');
    const pagination = document.querySelector('[data-astro-transition-scope*="pagination"]');
    const blogNav = document.querySelector('[data-astro-transition-scope*="blog-nav"]');

    // Les data attributes sont déjà définis dans les fichiers Astro
    // Cette fonction peut être utilisée pour des ajustements dynamiques
  }

  /**
   * Nettoyer les anciens listeners
   */
  private cleanupOldListeners(): void {
    // Les event listeners sont automatiquement nettoyés lors du swap du DOM
    // Cette fonction peut être utilisée pour des nettoyages spécifiques
  }

  /**
   * Réinitialiser les event listeners après la transition
   */
  private reinitializeEventListeners(): void {
    // Réinitialiser les listeners du navbar
    this.reinitializeNavbarListeners();

    // Réinitialiser les listeners des formulaires
    this.reinitializeFormListeners();

    // Réinitialiser les scripts d'animation globaux
    if ((window as any).initAnimations) {
      (window as any).initAnimations();
    }
  }

  /**
   * Réinitialiser les listeners du navbar
   */
  private reinitializeNavbarListeners(): void {
    const burgerBtn = document.getElementById('burgerMenuBtn');
    const closeBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenuOverlay');

    if (!burgerBtn || !closeBtn || !mobileMenu) return;

    // Cloner les éléments pour supprimer les anciens listeners
    const newBurgerBtn = burgerBtn.cloneNode(true) as HTMLElement;
    const newCloseBtn = closeBtn.cloneNode(true) as HTMLElement;
    const newMobileMenu = mobileMenu.cloneNode(true) as HTMLElement;

    burgerBtn.replaceWith(newBurgerBtn);
    closeBtn.replaceWith(newCloseBtn);
    mobileMenu.replaceWith(newMobileMenu);

    // Ajouter les nouveaux listeners
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
   * Réinitialiser les listeners des formulaires
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
   * Enregistrer les métriques de performance
   */
  private recordPerformanceMetrics(totalDuration: number): void {
    this.performanceMetrics.set('totalDuration', totalDuration);

    // Vérifier les Core Web Vitals
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
        console.warn('Performance observer non supporté', e);
      }
    }
  }

  /**
   * Afficher les métriques de performance (développement uniquement)
   */
  private logPerformanceMetrics(): void {
    console.group('📊 Transition Performance Metrics');
    this.performanceMetrics.forEach((value, key) => {
      console.log(`${key}: ${value.toFixed(2)}ms`);
    });
    console.groupEnd();
  }

  /**
   * Obtenir les métriques publiquement
   */
  public getMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    this.performanceMetrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Vérifier si les animations réduites sont activées
   */
  public getPreferReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }
}

// Initialiser le gestionnaire au chargement du document
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    (window as any).transitionsManager = new TransitionsManager();
  });
} else {
  (window as any).transitionsManager = new TransitionsManager();
}

export default TransitionsManager;
