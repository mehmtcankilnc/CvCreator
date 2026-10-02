import compiledTemplates from './compiledTemplates';
import { toPascalKeys } from './toPascalKeys';
import { PdfLanguage } from './formatDates';
import { getLabels } from './labels';

export const COVER_LETTER_TEMPLATE = 'coverletter';

export const renderTemplate = (
  templateName: string,
  formValues: unknown,
  lang: PdfLanguage = 'en',
) => {
  const template = compiledTemplates[templateName];

  if (!template) {
    throw new Error(`${templateName} adlı şablon bulunamadı.`);
  }

  return template({
    ...(toPascalKeys(formValues) as Record<string, unknown>),
    Labels: getLabels(lang),
    Lang: lang,
  });
};
