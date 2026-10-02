import { generatePDF } from 'react-native-html-to-pdf';
import { renderTemplate, COVER_LETTER_TEMPLATE } from './renderTemplate';
import { ResumeFormValues } from '../types/resumeTypes';
import { CoverLetterFormValues } from '../types/coverLetterTypes';
import i18n from '../utilities/i18n';
import {
  formatCoverLetterDates,
  formatResumeDates,
  resolvePdfLanguage,
} from './formatDates';

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

export type GeneratedPdf = {
  path: string;
  fileName: string;
};

const toSafeFileName = (name: string) =>
  name
    .replace(/[\\/:*?"<>|\s]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60);

const buildPdf = async (
  html: string,
  displayName: string,
  fallbackName: string,
): Promise<GeneratedPdf> => {
  const cleanName = displayName.trim() || fallbackName;
  const uniqueName = `${
    toSafeFileName(cleanName) || fallbackName
  }_${Date.now()}`;

  const result = await generatePDF({
    html,
    fileName: uniqueName,
    width: A4_WIDTH,
    height: A4_HEIGHT,
    shouldPrintBackgrounds: true,
  });

  return { path: result.filePath, fileName: `${cleanName}.pdf` };
};

export const generateResumePdf = (
  formValues: ResumeFormValues,
  templateCode: string,
) => {
  const lang = resolvePdfLanguage(i18n.language);

  return buildPdf(
    renderTemplate(templateCode, formatResumeDates(formValues, lang), lang),
    formValues.personalInfo.fullName,
    'resume',
  );
};

export const generateCoverLetterPdf = (formValues: CoverLetterFormValues) => {
  const lang = resolvePdfLanguage(i18n.language);

  return buildPdf(
    renderTemplate(
      COVER_LETTER_TEMPLATE,
      formatCoverLetterDates(formValues, lang),
      lang,
    ),
    formValues.senderInfo.fullName,
    'coverletter',
  );
};
