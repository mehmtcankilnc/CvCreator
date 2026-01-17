import { CoverLetterFormValues } from '../types/coverLetterTypes';
import RNFetchBlob from 'react-native-blob-util';
import { API_BASE_URL } from '@env';

type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export const PostCoverLetterValues = async (
  authenticatedFetch: Fetcher,
  coverLetterData: CoverLetterFormValues,
) => {
  try {
    const response = await authenticatedFetch('/coverletters', {
      method: 'POST',
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
  authenticatedFetch: Fetcher,
  searchText?: string,
  limit?: number,
) => {
  try {
    const params = new URLSearchParams();
    if (searchText) params.append('searchText', searchText);
    if (limit) params.append('limit', limit.toString());

    const url = `/coverletters?${params.toString()}`;
    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Mektupları çekme hatası: ', error);
  }
};

export const GetMyCoverLetterById = async (
  authenticatedFetch: Fetcher,
  coverLetterId: string,
) => {
  try {
    const response = await authenticatedFetch(
      `/coverletters/${coverLetterId}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      console.error('Hata: ', response);
      return;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Mektup çekme hatası: ', error);
  }
};

export const DownloadCoverLetterById = async (
  coverLetterId: string,
  fileName: string,
  token: string | null,
) => {
  if (!token) {
    console.error('İndirme başarısız: Token bulunamadı.');
    return;
  }

  const { config } = RNFetchBlob;

  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/pdf',
    Authorization: `Bearer ${token}`,
  };

  const downloadUrl = `${API_BASE_URL}/coverletters/download/${coverLetterId}`;

  try {
    const res = await config({
      fileCache: true,
      // path: filePath,
      trusty: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${fileName}.pdf`,
        description: 'Downloading...',
        mime: 'application/pdf',
        mediaScannable: true,
      },
    }).fetch('GET', downloadUrl, headers);

    try {
      await RNFetchBlob.fs.scanFile([
        { path: res.path(), mime: 'application/pdf' },
      ]);
    } catch (scanErr) {
      console.warn('Dosya tarama hatası:', scanErr);
    }
  } catch (error) {
    console.error('Mektup indirme hatası:', error);
  }
};

export const DeleteCoverLetterById = async (
  authenticatedFetch: Fetcher,
  coverLetterId: string,
) => {
  try {
    const response = await authenticatedFetch(
      `/coverletters/${coverLetterId}`,
      {
        method: 'DELETE',
      },
    );

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
  authenticatedFetch: Fetcher,
  coverLetterData: CoverLetterFormValues,
  coverLetterId: string,
) => {
  try {
    const response = await authenticatedFetch(
      `/coverletters/${coverLetterId}`,
      { method: 'PUT', body: JSON.stringify(coverLetterData) },
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
