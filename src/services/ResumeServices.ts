import { ResumeFormValues } from '../types/resumeTypes';
import { supabase, getSavableUserId } from '../lib/supabase';
import { generateResumePdf, GeneratedPdf } from '../pdf/generatePdf';

type ResumeRow = {
  id: string;
  file_name: string;
  template: string;
  form_values: ResumeFormValues;
  created_at: string;
  updated_at: string;
};

const escapeLike = (text: string) =>
  text.replace(/[\\%_]/g, char => `\\${char}`);

export const PostResumeValues = async (
  resumeData: ResumeFormValues,
  templateName: string,
): Promise<GeneratedPdf> => {
  try {
    const pdf = await generateResumePdf(resumeData, templateName);
    const userId = await getSavableUserId();

    if (userId) {
      const { error } = await supabase.from('resumes').insert({
        file_name: resumeData.personalInfo.fullName,
        template: templateName,
        form_values: resumeData,
      });
      if (error) throw error;
    }

    return pdf;
  } catch (error) {
    console.error('CV oluşturma hatası: ', error);
    throw error;
  }
};

export const GetMyResumes = async (searchText?: string, limit?: number) => {
  try {
    let query = supabase
      .from('resumes')
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
    console.error("Bütün CV'leri çekme hatası: ", error);
  }
};

export const GetMyResumeById = async (resumeId: string) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('id, file_name, template, form_values, created_at, updated_at')
      .eq('id', resumeId)
      .maybeSingle<ResumeRow>();
    if (error) throw error;
    if (!data) return;

    return {
      id: data.id,
      template: data.template,
      formValues: data.form_values,
    };
  } catch (error) {
    console.error('CV çekme hatası: ', error);
  }
};

export const GetResumePdfById = async (
  resumeId: string,
): Promise<GeneratedPdf | undefined> => {
  const resume = await GetMyResumeById(resumeId);
  if (!resume) return;

  return generateResumePdf(resume.formValues, resume.template);
};

export const DeleteResumeById = async (resumeId: string) => {
  try {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId);
    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Özgeçmiş silme hatası: ', error);
    return false;
  }
};

export const UpdateResumeValues = async (
  resumeData: ResumeFormValues,
  templateName: string,
  resumeId: string,
): Promise<GeneratedPdf> => {
  try {
    const pdf = await generateResumePdf(resumeData, templateName);

    const { error } = await supabase
      .from('resumes')
      .update({
        file_name: resumeData.personalInfo.fullName,
        template: templateName,
        form_values: resumeData,
      })
      .eq('id', resumeId);
    if (error) throw error;

    return pdf;
  } catch (error) {
    console.error('CV güncelleme hatası: ', error);
    throw error;
  }
};
