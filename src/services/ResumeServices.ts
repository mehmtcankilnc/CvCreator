import { ResumeFormValues } from '../types/resumeTypes';
// import { API_BASE_URL } from '@env';
import { supabase } from '../lib/supabase';
import RNFetchBlob from 'react-native-blob-util';

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
      `http://localhost:5001/api/v1/resumes?templateName=${templateName}`,
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

export const GetMyResumes = async (searchText?: string, number?: number) => {
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
    console.log(session.access_token);
  }

  try {
    const url = new URL(`http://localhost:5001/api/v1/resumes`);

    if (searchText) {
      url.searchParams.append('searchText', searchText);
    }

    if (number !== undefined && number !== null) {
      url.searchParams.append('number', number.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Bütün CV'leri çekme hatası: ", error);
  }
};

export const GetMyResumeById = async (resumeId: string) => {
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
    const url = new URL(`http://localhost:5001/api/v1/resumes/${resumeId}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('CV çekme hatası: ', error);
  }
};

export const DownloadResumeById = async (
  resumeId: string,
  fileName: string,
) => {
  const { config } = RNFetchBlob;

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
    await config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${fileName}.pdf`,
        description: 'Downloading...',
        mime: 'application/pdf',
        mediaScannable: true,
      },
    }).fetch(
      'GET',
      `http://localhost:5001/api/v1/resumes/download/${resumeId}`,
      headers,
    );
  } catch (error) {
    console.error('Özgeçmiş indirme hatası:', error);
  }
};

export const DeleteResumeById = async (resumeId: string) => {
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
    const url = new URL(`http://localhost:5001/api/v1/resumes/${resumeId}`);

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Özgeçmiş indirme hatası: ', error);
    return false;
  }
};

export const UpdateResumeValues = async (
  resumeData: ResumeFormValues,
  templateName: string,
  resumeId: string,
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
      `http://localhost:5001/api/v1/resumes/${resumeId}?templateName=${templateName}`,
      {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(resumeData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'CV güncellenemedi');
    } else {
      return response;
    }
  } catch (error) {
    console.error('CV update etme hatası: ', error);

    if (error && (error as any).message.includes('User cancelled')) {
      console.log("Kullanıcı PDF'i açmaktan vazgeçti.");
    } else {
      throw error;
    }
  }
};
