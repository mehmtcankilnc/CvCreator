import { ResumeFormValues } from '../types/resumeTypes';
import RNFetchBlob from 'react-native-blob-util';

type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export const PostResumeValues = async (
  authenticatedFetch: Fetcher,
  resumeData: ResumeFormValues,
  templateName: string,
) => {
  try {
    const response = await authenticatedFetch(
      `/resumes?templateName=${templateName}`,
      {
        method: 'POST',
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
  authenticatedFetch: Fetcher,
  searchText?: string,
  limit?: number,
) => {
  try {
    const params = new URLSearchParams();
    if (searchText) params.append('searchText', searchText);
    if (limit) params.append('limit', limit.toString());

    const url = `/resumes?${params.toString()}`;
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
    console.error("Bütün CV'leri çekme hatası: ", error);
  }
};

export const GetMyResumeById = async (
  authenticatedFetch: Fetcher,
  resumeId: string,
) => {
  try {
    const response = await authenticatedFetch(`/resumes/${resumeId}`, {
      method: 'GET',
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

  const downloadUrl = `http://192.168.1.101:5128/api/v1/resumes/download/${resumeId}`;

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
    console.error('Özgeçmiş indirme hatası:', error);
  }
};

export const DeleteResumeById = async (
  authenticatedFetch: Fetcher,
  resumeId: string,
) => {
  try {
    const response = await authenticatedFetch(`/resumes/${resumeId}`, {
      method: 'DELETE',
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
  authenticatedFetch: Fetcher,
  resumeData: ResumeFormValues,
  templateName: string,
  resumeId: string,
) => {
  try {
    const response = await authenticatedFetch(
      `/resumes/${resumeId}?templateName=${templateName}`,
      { method: 'PUT', body: JSON.stringify(resumeData) },
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
