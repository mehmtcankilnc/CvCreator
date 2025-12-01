import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { FILE_DOWNLOAD_BASE_URL } from '@env';

export const downloadPDF = async (
  pdfUrl: string,
  fileName: string,
  fileType: 'resumes' | 'coverletters',
) => {
  const finalUrl = `${FILE_DOWNLOAD_BASE_URL}${fileType}/${pdfUrl}`;

  const { config } = RNFetchBlob;

  if (!finalUrl || !finalUrl.startsWith('http')) {
    console.error('Geçersiz veya boş URL, indirme işlemi iptal edildi.');
    return;
  }

  config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: `${fileName}.pdf`,
      description: 'Downloading...',
      mime: 'application/pdf',
      mediaScannable: true,
    },
  })
    .fetch('GET', finalUrl, {})
    .then(res => {
      if (Platform.OS === 'ios') {
        console.log(res.path);
      }
    })
    .catch(error => console.error('Hata: ', error));
};
