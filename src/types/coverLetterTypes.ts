import { PersonalInfo } from './resumeTypes';

export type CoverLetterSenderInfo = PersonalInfo & {
  address?: string;
};

export type CoverLetterRecipientInfo = {
  companyName: string;
  hiringManagerName: string;
};

export type CoverLetterMetaInfo = {
  sentDate: string;
  subject: string;
};

export type CoverLetterContent = {
  salutation: string;
  introduction: string;
  body: string;
  conclusion: string;
  signOff: string;
};

export type CoverLetterFormValues = {
  senderInfo: CoverLetterSenderInfo;
  recipientInfo: CoverLetterRecipientInfo;
  metaInfo: CoverLetterMetaInfo;
  content: CoverLetterContent;
};
