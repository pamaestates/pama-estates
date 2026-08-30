export type WebsiteLeadFormName =
  | "PRIVATE_ACCESS"
  | "PRIVATE_ACCESS_INVESTOR"
  | "PRIVATE_ACCESS_END_USER"
  | "BROKER_COLLABORATION"
  | "SELL_WITH_US"
  | "RENT_WITH_US"
  | "OWNER_INQUIRY";

export type WebsiteLeadType = "BUYER" | "SELLER" | "LANDLORD" | "BROKER" | "OTHER";

export type WebsiteLeadSubmission = {
  formName: WebsiteLeadFormName;
  leadType: WebsiteLeadType;
  fullName: string;
  email?: string;
  mobile?: string;
  message?: string;
};

function utmContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    landingPage: window.location.href,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
  };
}

export async function captureWebsiteLead(
  submission: WebsiteLeadSubmission,
  submissionId: string,
) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submissionId,
      submittedAt: new Date().toISOString(),
      ...submission,
      ...utmContext(),
    }),
  });

  if (!response.ok) {
    throw new Error("CRM_CAPTURE_FAILED");
  }

  return response.json() as Promise<{
    data: { captured: boolean; duplicate: boolean; leadReference: string | null };
  }>;
}

export function newSubmissionId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}
