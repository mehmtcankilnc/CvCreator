import { ResumeFormValues } from '../types/resumeTypes';
import { CoverLetterFormValues } from '../types/coverLetterTypes';

export type PdfLanguage = 'tr' | 'en';

const SHORT_MONTHS: Record<PdfLanguage, string[]> = {
  tr: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

const LONG_MONTHS: Record<PdfLanguage, string[]> = {
  tr: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})/;

const parseIso = (value?: string) => {
  const match = value ? ISO_DATE.exec(value) : null;
  if (!match) return null;

  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;

  return { year: match[1], month: month - 1, day: Number(match[3]) };
};

export const formatMonthYear = (
  value: string | undefined,
  lang: PdfLanguage,
) => {
  const parsed = parseIso(value);
  if (!parsed) return value;

  return `${SHORT_MONTHS[lang][parsed.month]} ${parsed.year}`;
};

export const formatFullDate = (
  value: string | undefined,
  lang: PdfLanguage,
) => {
  const parsed = parseIso(value);
  if (!parsed) return value;

  return `${parsed.day} ${LONG_MONTHS[lang][parsed.month]} ${parsed.year}`;
};

export const resolvePdfLanguage = (language?: string): PdfLanguage =>
  language && language.toLowerCase().startsWith('tr') ? 'tr' : 'en';

export const formatResumeDates = (
  formValues: ResumeFormValues,
  lang: PdfLanguage,
): ResumeFormValues => ({
  ...formValues,
  educationsInfo: formValues.educationsInfo?.map(item => ({
    ...item,
    startDate: formatMonthYear(item.startDate, lang) ?? '',
    endDate: formatMonthYear(item.endDate, lang),
  })),
  experiencesInfo: formValues.experiencesInfo?.map(item => ({
    ...item,
    startDate: formatMonthYear(item.startDate, lang) ?? '',
    endDate: formatMonthYear(item.endDate, lang),
  })),
  certificatesInfo: formValues.certificatesInfo?.map(item => ({
    ...item,
    date: formatMonthYear(item.date, lang),
  })),
});

export const formatCoverLetterDates = (
  formValues: CoverLetterFormValues,
  lang: PdfLanguage,
): CoverLetterFormValues => ({
  ...formValues,
  metaInfo: {
    ...formValues.metaInfo,
    sentDate: formatFullDate(formValues.metaInfo.sentDate, lang) ?? '',
  },
});
