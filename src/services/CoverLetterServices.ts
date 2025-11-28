import { CoverLetterFormValues } from '../types/coverLetterTypes';
// import { API_BASE_URL } from '@env';
import { supabase } from '../lib/supabase';

export const PostCoverLetterValues = async (
  coverLetterData: CoverLetterFormValues,
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/pdf',
  };

  if (session?.access_token) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  try {
    const response = await fetch(`http://192.168.1.103:5128/api/coverletters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(coverLetterData),
    });

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
