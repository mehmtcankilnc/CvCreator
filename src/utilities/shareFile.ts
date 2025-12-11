import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export const shareFile = async (
  createdInfo: Response | null,
  type: 'resume' | 'coverletter',
) => {
  if (createdInfo) {
    const contentDisposition = createdInfo.headers.get('Content-Disposition');
    let fileName = null;

    if (contentDisposition) {
      let match = contentDisposition.match(
        /filename\*?=['"]?(?:utf-8''|UTF-8''|)([^;"]+)?/i,
      );

      if (!match) {
        match = contentDisposition.match(/filename=['"]?([^;"]+)/i);
      }

      if (match && match[1]) {
        fileName = match[1];

        if (contentDisposition.includes('filename*=UTF-8')) {
          fileName = decodeURIComponent(fileName);
        }
      }
    } else {
      fileName = 'file.pdf';
    }

    const pdfBlob = await createdInfo.blob();

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);

    const base64Data = await new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => {
        console.error('Blob read error:', error);
        reject(error);
      };
    });

    const path = `${RNFS.CachesDirectoryPath}/${fileName}`;

    await RNFS.writeFile(path, base64Data, 'base64');

    const exists = await RNFS.exists(path);

    if (exists) {
      try {
        const fileUri = `file://${path}`;

        await Share.open({
          title:
            type === 'coverletter'
              ? 'Mektubunu Görüntüle'
              : 'Özgeçmişini Görüntüle',
          url: fileUri,
          type: 'application/pdf',
          failOnCancel: false,
        });
      } catch (e) {
        console.log('Paylaşma/Açma hatası:', e);
      }
    }
  }
};

export const shareRemotePdf = async (
  url: string,
  fileName: string = 'file.pdf',
) => {
  try {
    const safeFileName = fileName.endsWith('.pdf')
      ? fileName
      : `${fileName}.pdf`;
    const localFileCmd = `${RNFS.CachesDirectoryPath}/${safeFileName}`;

    const options = {
      fromUrl: url,
      toFile: localFileCmd,
    };

    const downloadResult = await RNFS.downloadFile(options).promise;

    if (downloadResult.statusCode === 200) {
      const fileUri = `file://${localFileCmd}`;

      await Share.open({
        title: 'Belgeyi Paylaş',
        url: fileUri,
        type: 'application/pdf',
        filename: safeFileName,
        failOnCancel: false,
      });
    } else {
      console.error(
        'Dosya indirilemedi, Status Code:',
        downloadResult.statusCode,
      );
    }
  } catch (error) {
    console.error('PDF paylaşma hatası:', error);
  }
};
