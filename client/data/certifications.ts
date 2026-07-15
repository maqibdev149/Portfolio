export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  badgeUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "React Developer Certification",
    issuer: "Placeholder Issuer",
    date: "2024",
    credentialUrl: "https://example.com",
    badgeUrl: undefined,
  },
  {
    id: "cert-2",
    title: "JavaScript (ES6+) Certification",
    issuer: "Placeholder Issuer",
    date: "2024",
    credentialUrl: "https://example.com",
    badgeUrl: undefined,
  },
  {
    id: "cert-3",
    title: "Frontend Engineering Excellence",
    issuer: "Placeholder Issuer",
    date: "2024",
    credentialUrl: "https://example.com",
    badgeUrl: undefined,
  },
];
