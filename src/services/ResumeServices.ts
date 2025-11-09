import { ResumeFormValues } from '../types/resumeTypes';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';
import { API_BASE_URL } from '@env';

export const PostResumeValues = async (
  resumeData: ResumeFormValues,
  templateName: string,
  userId: string | null,
) => {
  try {
    console.log(userId);
    const response = await fetch(
      `${API_BASE_URL}/api/resumes?templateName=${templateName}&userId=${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        body: JSON.stringify(resumeData),
      },
    );

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'PDF oluşturulamadı');
    }

    const pdfBlob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);

    const base64Data = await new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => {
        reject(error);
      };
    });

    const fileName = 'ozgecmis.pdf';
    const path = Platform.select({
      android: `${RNFS.DownloadDirectoryPath}/${fileName}`,
      ios: `${RNFS.TemporaryDirectoryPath}/${fileName}`,
    }) as string;

    await RNFS.writeFile(path, base64Data, 'base64');

    console.log(`Dosya başarıyla şuraya kaydedildi: ${path}`);

    await FileViewer.open(path);
  } catch (error) {
    console.error('CV post etme hatası: ', error);

    if (error && (error as any).message.includes('User cancelled')) {
      console.log("Kullanıcı PDF'i açmaktan vazgeçti.");
    } else {
      throw error;
    }
  }
};

export const GetMyResumes = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/resumes/${id}`, {
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
