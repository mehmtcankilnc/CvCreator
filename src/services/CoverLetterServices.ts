import { CoverLetterFormValues } from '../types/coverLetterTypes';
// import { API_BASE_URL } from '@env';
import { supabase } from '../lib/supabase';
import RNFetchBlob from 'react-native-blob-util';

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
    const response = await fetch(`http://localhost:5001/api/coverletters`, {
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

export const GetMyCoverLetters = async (
  searchText?: string,
  number?: number,
) => {
  try {
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

    const url = new URL(`http://localhost:5001/api/coverletters`);

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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Mektupları çekme hatası: ', error);
  }
};

export const GetMyCoverLetterById = async (coverLetterId: string) => {
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
    const url = new URL(
      `http://localhost:5001/api/coverletters/${coverLetterId}`,
    );

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    });

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

export const DownloadCoverLetterById = async (
  coverLetterId: string,
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
      `http://localhost:5001/api/coverletters/download/${coverLetterId}`,
      headers,
    );
  } catch (error) {
    console.error('Mektup indirme hatası:', error);
  }
};

export const DeleteCoverLetterById = async (coverLetterId: string) => {
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
    const url = new URL(
      `http://localhost:5001/api/coverletters/${coverLetterId}`,
    );

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
    console.error('Mektup indirme hatası: ', error);
    return false;
  }
};

export const UpdateCoverLetterValues = async (
  coverLetterData: CoverLetterFormValues,
  coverLetterId: string,
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
      `http://localhost:5001/api/coverletters/${coverLetterId}`,
      {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(coverLetterData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'Mektup güncellenemedi');
    } else {
      return response;
    }
  } catch (error) {
    console.error('Mektup update etme hatası: ', error);

    if (error && (error as any).message.includes('User cancelled')) {
      console.log("Kullanıcı PDF'i açmaktan vazgeçti.");
    } else {
      throw error;
    }
  }
};
