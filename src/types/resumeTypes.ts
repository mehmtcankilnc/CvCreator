export type PersonalInfo = {
  fullName: string;
  jobTitle?: string;
  phoneNumber?: string;
  email: string;
  link?: string;
};

export type SummaryInfo = {
  text: string;
};

export type EducationInfo = {
  isCurrent?: boolean;
  title: string;
  startDate: string;
  endDate?: string;
  institute: string;
  gpa?: string;
};

export type ExperienceInfo = {
  isCurrent?: boolean;
  title: string;
  startDate: string;
  endDate?: string;
  company?: string;
  text?: string;
};

export type CertificateInfo = {
  title: string;
  issuer?: string;
  date?: string;
  link?: string;
};

export type SkillInfo = {
  title: string;
  scale?: string;
};

export type LanguageInfo = {
  title: string;
  scale?: string;
};

export type ReferenceInfo = {
  fullName: string;
  contact: string;
};

export type ResumeFormValues = {
  personalInfo: PersonalInfo;
  summaryInfo?: SummaryInfo;
  educationsInfo?: Array<EducationInfo>;
  experiencesInfo?: Array<ExperienceInfo>;
  certificatesInfo?: Array<CertificateInfo>;
  skillsInfo?: Array<SkillInfo>;
  languagesInfo?: Array<LanguageInfo>;
  referencesInfo?: Array<ReferenceInfo>;
};
