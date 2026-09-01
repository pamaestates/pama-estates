export type WebsiteLeadFormName =
  | "PRIVATE_ACCESS"
  | "PRIVATE_ACCESS_INVESTOR"
  | "PRIVATE_ACCESS_END_USER"
  | "BROKER_COLLABORATION"
  | "SELL_WITH_US"
  | "RENT_WITH_US"
  | "OWNER_INQUIRY"
  | "PROPERTY_REVIEW";

export type WebsiteLeadType = "BUYER" | "SELLER" | "LANDLORD" | "BROKER" | "OTHER";

export type WebsiteLeadSubmission = {
  formName: WebsiteLeadFormName;
  leadType: WebsiteLeadType;
  fullName: string;
  email?: string;
  mobile?: string;
  message?: string;
};

const submissionVariants = new Map<string, Map<string, string>>();

function utmContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    landingPage: `${window.location.origin}${window.location.pathname}`,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
  };
}

function submissionFingerprint(submission: WebsiteLeadSubmission) {
  return JSON.stringify({
    formName: submission.formName,
    leadType: submission.leadType,
    fullName: submission.fullName.trim(),
    email: submission.email?.trim().toLowerCase() || "",
    mobile: submission.mobile?.trim() || "",
    message: submission.message?.trim() || "",
  });
}

function resolveSubmissionId(
  requestedSubmissionId: string,
  submission: WebsiteLeadSubmission,
) {
  if (typeof window === "undefined") return requestedSubmissionId;

  const fingerprint = submissionFingerprint(submission);
  let variants = submissionVariants.get(requestedSubmissionId);

  if (!variants) {
    variants = new Map<string, string>();
    submissionVariants.set(requestedSubmissionId, variants);
  }

  const existing = variants.get(fingerprint);
  if (existing) return existing;

  const effectiveSubmissionId =
    variants.size === 0
      ? requestedSubmissionId
      : newSubmissionId("website-revision");

  variants.set(fingerprint, effectiveSubmissionId);
  return effectiveSubmissionId;
}

export async function captureWebsiteLead(
  submission: WebsiteLeadSubmission,
  submissionId: string,
) {
  const effectiveSubmissionId = resolveSubmissionId(submissionId, submission);

  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submissionId: effectiveSubmissionId,
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
