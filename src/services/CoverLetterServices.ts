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

  if (session?.access_token && !session?.user.is_anonymous) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  try {
    const response = await fetch(`http://localhost:5128/api/coverletters`, {
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
    console.error('Mektup post etme hatası: ', error);

    if (error && (error as any).message.includes('User cancelled')) {
      console.log("Kullanıcı PDF'i açmaktan vazgeçti.");
    } else {
      throw error;
    }
  }
};

export const GetMyCoverLetters = async (id: string, searchText?: string) => {
  try {
    const response = await fetch(
      `http://localhost:5128/api/coverletters/${id}?searchText=${searchText}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Mektup çekme hatası: ', error);
  }
};
