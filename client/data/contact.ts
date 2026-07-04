export const personalInfo = {
  fullName: "Muhammad Aqib Aziz",
  firstName: "Aqib",
  shortName: "Aqib",
  role: "Frontend Developer",
  email: "maqib8373@gmail.com",
  phone: "03091468292",
  phoneDisplay: "0309 1468292",
  phoneHref: "tel:+923091468292",
  whatsapp: "https://wa.me/923091468292",
  location: "Multan, Pakistan",
  resumeUrl: "/resume.pdf",
} as const;

export const socialLinks = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: personalInfo.whatsapp,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${personalInfo.email}`,
  },
  {
    id: "phone",
    label: "Phone",
    href: personalInfo.phoneHref,
  },
] as const;
