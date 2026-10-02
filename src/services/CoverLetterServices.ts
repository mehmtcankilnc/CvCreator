import { CoverLetterFormValues } from '../types/coverLetterTypes';
import { supabase, getSavableUserId } from '../lib/supabase';
import { generateCoverLetterPdf, GeneratedPdf } from '../pdf/generatePdf';

type CoverLetterRow = {
  id: string;
  file_name: string;
  form_values: CoverLetterFormValues;
  created_at: string;
  updated_at: string;
};

const escapeLike = (text: string) =>
  text.replace(/[\\%_]/g, char => `\\${char}`);

export const PostCoverLetterValues = async (
  coverLetterData: CoverLetterFormValues,
): Promise<GeneratedPdf> => {
  try {
    const pdf = await generateCoverLetterPdf(coverLetterData);
    const userId = await getSavableUserId();

    if (userId) {
      const { error } = await supabase.from('cover_letters').insert({
        file_name: coverLetterData.senderInfo.fullName,
        form_values: coverLetterData,
      });
      if (error) throw error;
    }

    return pdf;
  } catch (error) {
    console.error('Mektup oluşturma hatası: ', error);
    throw error;
  }
};

export const GetMyCoverLetters = async (
  searchText?: string,
  limit?: number,
) => {
  try {
    let query = supabase
      .from('cover_letters')
      .select('id, file_name, created_at, updated_at')
      .order('updated_at', { ascending: false });

    const trimmed = searchText?.trim();
    if (trimmed) {
      query = query.ilike('file_name', `%${escapeLike(trimmed)}%`);
    }
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map(row => ({
      id: row.id as string,
      fileName: row.file_name as string,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    }));
  } catch (error) {
    console.error('Mektupları çekme hatası: ', error);
  }
};

export const GetMyCoverLetterById = async (coverLetterId: string) => {
  try {
    const { data, error } = await supabase
      .from('cover_letters')
      .select('id, file_name, form_values, created_at, updated_at')
      .eq('id', coverLetterId)
      .maybeSingle<CoverLetterRow>();
    if (error) throw error;
    if (!data) return;

    return { id: data.id, formValues: data.form_values };
  } catch (error) {
    console.error('Mektup çekme hatası: ', error);
  }
};

export const GetCoverLetterPdfById = async (
  coverLetterId: string,
): Promise<GeneratedPdf | undefined> => {
  const coverLetter = await GetMyCoverLetterById(coverLetterId);
  if (!coverLetter) return;

  return generateCoverLetterPdf(coverLetter.formValues);
};

export const DeleteCoverLetterById = async (coverLetterId: string) => {
  try {
    const { error } = await supabase
      .from('cover_letters')
      .delete()
      .eq('id', coverLetterId);
    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Mektup silme hatası: ', error);
    return false;
  }
};

export const UpdateCoverLetterValues = async (
  coverLetterData: CoverLetterFormValues,
  coverLetterId: string,
): Promise<GeneratedPdf> => {
  try {
    const pdf = await generateCoverLetterPdf(coverLetterData);

    const { error } = await supabase
      .from('cover_letters')
      .update({
        file_name: coverLetterData.senderInfo.fullName,
        form_values: coverLetterData,
      })
      .eq('id', coverLetterId);
    if (error) throw error;

    return pdf;
  } catch (error) {
    console.error('Mektup güncelleme hatası: ', error);
    throw error;
  }
};
