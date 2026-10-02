import { PdfLanguage } from './formatDates';

export type PdfLabels = {
  Summary: string;
  Experience: string;
  ProfessionalExperience: string;
  Education: string;
  Skills: string;
  Languages: string;
  Certificates: string;
  References: string;
  Present: string;
  PresentLower: string;
  Gpa: string;
};

const LABELS: Record<PdfLanguage, PdfLabels> = {
  tr: {
    Summary: 'Özet',
    Experience: 'Deneyim',
    ProfessionalExperience: 'İş Deneyimi',
    Education: 'Eğitim',
    Skills: 'Yetenekler',
    Languages: 'Diller',
    Certificates: 'Sertifikalar',
    References: 'Referanslar',
    Present: 'Devam ediyor',
    PresentLower: 'devam ediyor',
    Gpa: 'GNO',
  },
  en: {
    Summary: 'Summary',
    Experience: 'Experience',
    ProfessionalExperience: 'Professional Experience',
    Education: 'Education',
    Skills: 'Skills',
    Languages: 'Languages',
    Certificates: 'Certificates',
    References: 'References',
    Present: 'Present',
    PresentLower: 'present',
    Gpa: 'GPA',
  },
};

export const getLabels = (lang: PdfLanguage) => LABELS[lang];
