import {
  formatCoverLetterDates,
  formatFullDate,
  formatMonthYear,
  formatResumeDates,
  resolvePdfLanguage,
} from '../src/pdf/formatDates';

describe('formatDates', () => {
  it('formats month and year in Turkish and English', () => {
    expect(formatMonthYear('2021-03-01', 'tr')).toBe('Mar 2021');
    expect(formatMonthYear('2023-02-28', 'tr')).toBe('Şub 2023');
    expect(formatMonthYear('2023-08-05', 'en')).toBe('Aug 2023');
  });

  it('formats a full date', () => {
    expect(formatFullDate('2026-09-30', 'tr')).toBe('30 Eylül 2026');
    expect(formatFullDate('2026-01-05', 'en')).toBe('5 January 2026');
  });

  it('leaves empty and non ISO values untouched', () => {
    expect(formatMonthYear('', 'tr')).toBe('');
    expect(formatMonthYear(undefined, 'tr')).toBeUndefined();
    expect(formatMonthYear('2021', 'tr')).toBe('2021');
    expect(formatMonthYear('2021-13-01', 'tr')).toBe('2021-13-01');
  });

  it('resolves the pdf language', () => {
    expect(resolvePdfLanguage('tr')).toBe('tr');
    expect(resolvePdfLanguage('tr-TR')).toBe('tr');
    expect(resolvePdfLanguage('en')).toBe('en');
    expect(resolvePdfLanguage(undefined)).toBe('en');
  });

  it('formats resume dates without touching the original values', () => {
    const original = {
      personalInfo: { fullName: 'A', email: 'a@a.com' },
      experiencesInfo: [
        { title: 'T', startDate: '2021-03-01', endDate: '', isCurrent: true },
      ],
      certificatesInfo: [{ title: 'C', date: '2023-05-10' }],
    };

    const formatted = formatResumeDates(original, 'tr');

    expect(formatted.experiencesInfo?.[0].startDate).toBe('Mar 2021');
    expect(formatted.experiencesInfo?.[0].endDate).toBe('');
    expect(formatted.certificatesInfo?.[0].date).toBe('May 2023');
    expect(original.experiencesInfo[0].startDate).toBe('2021-03-01');
  });

  it('formats the cover letter sent date', () => {
    const formatted = formatCoverLetterDates(
      {
        senderInfo: { fullName: 'A', email: 'a@a.com' },
        recipientInfo: { companyName: 'C', hiringManagerName: 'H' },
        metaInfo: { subject: 'S', sentDate: '2026-09-30' },
        content: {
          salutation: '',
          introduction: '',
          body: '',
          conclusion: '',
          signOff: '',
        },
      },
      'tr',
    );

    expect(formatted.metaInfo.sentDate).toBe('30 Eylül 2026');
  });
});
