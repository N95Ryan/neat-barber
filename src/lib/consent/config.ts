/** Cookie consent — durée de mémorisation (renouvellement CNIL ~6 mois) */
export const CONSENT_COOKIE_NAME = "neat_cookie_consent";
export const CONSENT_MAX_AGE_DAYS = 182;

export const GTM_ID = "GTM-P94C5H49";

export const EMR_WIDGET_ID = "9ad155a2-7a40-4d40-8915-a7253b37557e";
export const EMR_PIXEL_HOST = "app.getcoucou.io";
export const EMR_PIXEL_ACCOUNT = 11;

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentCategories & {
  v: 1;
  ts: number;
};

export function defaultDeniedConsent(): ConsentCategories {
  return { analytics: false, marketing: false };
}

export function allAcceptedConsent(): ConsentCategories {
  return { analytics: true, marketing: true };
}
