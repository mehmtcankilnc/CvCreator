import { toPascalKeys } from '../src/pdf/toPascalKeys';
import { renderTemplate } from '../src/pdf/renderTemplate';

const resume = {
  personalInfo: {
    fullName: 'Ayşe Öztürk',
    jobTitle: 'Yazılım Geliştirici',
    phoneNumber: '+90 555 000 00 00',
    email: 'ayse@example.com',
    website: 'ayse.dev',
  },
  summaryInfo: { text: 'Özet metni ğüşiöç' },
  educationsInfo: [
    {
      isCurrent: true,
      title: 'Bilgisayar Mühendisliği',
      startDate: '2020',
      endDate: '',
      institute: 'ODTÜ',
      gpa: '3.5',
    },
  ],
  experiencesInfo: [
    {
      isCurrent: false,
      title: 'Geliştirici',
      startDate: '2022',
      endDate: '2024',
      company: 'Acme',
      text: 'Mobil uygulama geliştirdi',
    },
  ],
  certificatesInfo: [
    { title: 'AWS', issuer: 'Amazon', date: '2023', link: 'aws.example' },
  ],
  skillsInfo: [{ title: 'React Native', scale: '90' }],
  languagesInfo: [{ title: 'İngilizce', scale: '80' }],
  referencesInfo: [{ fullName: 'Ali Veli', contact: 'ali@example.com' }],
  photoInfo: { base64Image: 'AAAA' },
};

const coverLetter = {
  senderInfo: { fullName: 'Ayşe Öztürk', email: 'ayse@example.com' },
  recipientInfo: { companyName: 'Acme', hiringManagerName: 'Bay Yönetici' },
  metaInfo: { subject: 'Başvuru', sentDate: '2026-09-30' },
  content: {
    salutation: 'Sayın',
    introduction: 'Giriş',
    body: 'Gövde',
    conclusion: 'Sonuç',
    signOff: 'Saygılar',
  },
};

describe('toPascalKeys', () => {
  it('capitalizes keys deeply and leaves values untouched', () => {
    expect(
      toPascalKeys({ personalInfo: { fullName: 'A' }, list: [{ title: 'x' }] }),
    ).toEqual({ PersonalInfo: { FullName: 'A' }, List: [{ Title: 'x' }] });
  });

  it('keeps primitives and null', () => {
    expect(toPascalKeys(null)).toBeNull();
    expect(toPascalKeys('text')).toBe('text');
    expect(toPascalKeys(3)).toBe(3);
  });
});

describe('renderTemplate', () => {
  it.each(['classic', 'modern', 'vertical', 'minimal'])(
    'renders the %s resume template with the form values',
    name => {
      const html = renderTemplate(name, resume);

      expect(html).toContain('Ayşe Öztürk');
      expect(html).toContain('Acme');
      expect(html).toContain('React Native');
      expect(html).not.toContain('{{');
    },
  );

  it.each(['classic', 'modern', 'minimal'])(
    'renders references in the %s template',
    name => {
      expect(renderTemplate(name, resume)).toContain('Ali Veli');
    },
  );

  it('renders the current education end date as present', () => {
    const html = renderTemplate('modern', resume);

    expect(html).toContain('Present');
  });

  it.each(['classic', 'modern', 'vertical', 'minimal'])(
    'renders Turkish labels and lang in the %s template',
    name => {
      const html = renderTemplate(name, resume, 'tr');

      expect(html).toContain('lang="tr"');
      expect(html).toContain('Eğitim');
      expect(html).toContain('Yetenekler');
      expect(html).toContain('Diller');
      expect(html).toContain('Sertifikalar');
      expect(html).not.toContain('>Education<');
      expect(html).not.toContain('>Skills<');
      expect(html).not.toContain('Present');
    },
  );

  it('renders the Turkish present label for current entries', () => {
    const currentJob = {
      ...resume,
      experiencesInfo: [{ ...resume.experiencesInfo[0], isCurrent: true }],
    };

    expect(renderTemplate('modern', currentJob, 'tr')).toContain(
      'Devam ediyor',
    );
    expect(renderTemplate('minimal', currentJob, 'tr')).toContain(
      'devam ediyor',
    );
  });

  it('defaults to English labels', () => {
    const html = renderTemplate('classic', resume);

    expect(html).toContain('lang="en"');
    expect(html).toContain('>Education<');
  });

  it('sets the cover letter lang attribute', () => {
    expect(renderTemplate('coverletter', coverLetter, 'tr')).toContain(
      'lang="tr"',
    );
  });

  it('renders the cover letter template', () => {
    const html = renderTemplate('coverletter', coverLetter);

    expect(html).toContain('Sayın');
    expect(html).toContain('Bay Yönetici');
    expect(html).toContain('Saygılar');
    expect(html).not.toContain('{{');
  });

  it('throws for an unknown template', () => {
    expect(() => renderTemplate('missing', resume)).toThrow();
  });
});
