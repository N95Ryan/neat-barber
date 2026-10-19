import { describe, expect, it } from "vitest";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_DAYS,
  allAcceptedConsent,
  defaultDeniedConsent,
} from "./config";

describe("consent config", () => {
  it("uses stable cookie name and six-month retention", () => {
    expect(CONSENT_COOKIE_NAME).toBe("neat_cookie_consent");
    expect(CONSENT_MAX_AGE_DAYS).toBe(182);
  });

  it("defaults to denied categories", () => {
    expect(defaultDeniedConsent()).toEqual({
      analytics: false,
      marketing: false,
    });
  });

  it("accept-all enables optional categories", () => {
    expect(allAcceptedConsent()).toEqual({
      analytics: true,
      marketing: true,
    });
  });
});
