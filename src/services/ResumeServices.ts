import { ResumeFormValues } from '../types/resumeTypes';
// import { API_BASE_URL } from '@env';
import { supabase } from '../lib/supabase';

export const PostResumeValues = async (
  resumeData: ResumeFormValues,
  templateName: string,
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/pdf',
  };

  if (session?.access_token && !session?.user.is_anonymous) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  try {
    const response = await fetch(
      `http://localhost:5001/api/resumes?templateName=${templateName}`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(resumeData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'PDF oluşturulamadı');
    } else {
      return response;
    }
  } catch (error) {
    console.error('CV post etme hatası: ', error);

    if (error && (error as any).message.includes('User cancelled')) {
      console.log("Kullanıcı PDF'i açmaktan vazgeçti.");
    } else {
      throw error;
    }
  }
};

export const GetMyResumes = async (
  id: string,
  searchText?: string,
  number?: number,
) => {
  try {
    const url = new URL(`http://localhost:5001/api/resumes/${id}`);

    if (searchText) {
      url.searchParams.append('searchText', searchText);
    }

    if (number !== undefined && number !== null) {
      url.searchParams.append('number', number.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CV çekme hatası: ', error);
  }
};
