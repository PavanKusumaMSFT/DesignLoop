export type SecurityAuditStatus = "In Use" | "Unclear";

export interface SecurityAuditGuideline {
  category: string;
  guideline: string;
}

export interface SecurityAuditCitation {
  citationlink: string;
  citationtitle: string;
}

export const SECURITY_AUDIT_GUIDELINES: SecurityAuditGuideline[] = [
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Avoid complex settings that confuse users",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Make authentication steps easy to follow",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Use role-based access aligned to need",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Ensure access is appropriate across views",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Avoid exposing high-level access to anonymous users",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Design recovery steps that verify identity",
  },
  {
    category: "Protect Identity & Safeguard Access",
    guideline: "Let users confirm identities of others when needed",
  },
  {
    category: "Use Data to Improve Security",
    guideline: "Show recent activity history in a clear way",
  },
  {
    category: "Use Data to Improve Security",
    guideline: "Help technical teams know what logs are required",
  },
  {
    category: "Use Data to Improve Security",
    guideline: "Ensure logs cannot be changed or erased",
  },
  {
    category: "Make the Default Options Secure",
    guideline: "Use safe settings by default",
  },
  {
    category: "Make the Default Options Secure",
    guideline: "Make default choices usable",
  },
  {
    category: "Make the Default Options Secure",
    guideline: "Offer easy-to-understand data sharing labels",
  },
  {
    category: "Make the Default Options Secure",
    guideline: "Support secure-by-default options for organizations",
  },
  {
    category: "Provide Ongoing User Communication",
    guideline: "Add helpful information during onboarding",
  },
  {
    category: "Provide Ongoing User Communication",
    guideline: "Make outcomes of user actions easy to understand",
  },
  {
    category: "Provide Ongoing User Communication",
    guideline: "Warn users when something seems unsafe",
  },
  {
    category: "Provide Ongoing User Communication",
    guideline: "Offer clear, reassuring updates when systems go down",
  },
];

export const SECURITY_AUDIT_CITATIONS: SecurityAuditCitation[] = [
  {
    citationtitle: "Secure Future Initiative overview",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-overview",
  },
  {
    citationtitle: "What is Zero Trust?",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview",
  },
  {
    citationtitle: "SFI - Protect identities and secrets",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-identity-overview",
  },
  {
    citationtitle: "SFI - Monitor and detect threats",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-threat-overview",
  },
  {
    citationtitle: "SFI - Accelerate response and remediation",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-response-overview",
  },
];