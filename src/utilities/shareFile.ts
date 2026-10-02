import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { GeneratedPdf } from '../pdf/generatePdf';

export const shareFile = async (
  createdInfo: GeneratedPdf | null,
  type: 'resume' | 'coverletter',
) => {
  if (!createdInfo) return;

  const exists = await RNFS.exists(createdInfo.path);
  if (!exists) return;

  try {
    await Share.open({
      title:
        type === 'coverletter'
          ? 'Mektubunu Görüntüle'
          : 'Özgeçmişini Görüntüle',
      url: `file://${createdInfo.path}`,
      type: 'application/pdf',
      filename: createdInfo.fileName.replace(/\.pdf$/i, ''),
      failOnCancel: false,
    });
  } catch (e) {
    console.log('Paylaşma/Açma hatası:', e);
  }
};
