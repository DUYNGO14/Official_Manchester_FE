// hooks/useDateFormatter.ts
import { format, parseISO, isValid, fromUnixTime } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useMemo } from 'react';

export type DateInput = Date | string | number;

interface UseDateFormatterOptions {
  locale?: 'vi' | 'en';
  defaultFormat?: string;
}

export const useDateFormatter = (options: UseDateFormatterOptions = {}) => {
  const { locale = 'vi', defaultFormat = 'dd/MM/yyyy HH:mm' } = options;

  const localeMap = {
    vi,
    en: enUS,
  };

  const formatDate = useMemo(() => {
    return (date: DateInput, formatString?: string): string => {
      try {
        let dateObj: Date;

        // Xử lý các kiểu input khác nhau
        if (typeof date === 'string') {
          // Kiểm tra nếu là ISO string hoặc timestamp string
          if (date.includes('T') || date.includes('-')) {
            dateObj = parseISO(date);
          } else {
            // Nếu là timestamp number trong string
            dateObj = new Date(Number(date));
          }
        } else if (typeof date === 'number') {
          // Xử lý timestamp (giây hoặc mili giây)
          dateObj = date.toString().length > 10 ? new Date(date) : fromUnixTime(date);
        } else {
          dateObj = date;
        }

        // Kiểm tra date hợp lệ
        if (!isValid(dateObj)) {
          console.warn('Invalid date:', date);
          return 'Invalid date';
        }

        return format(dateObj, formatString || defaultFormat, {
          locale: localeMap[locale],
        });
      } catch (error) {
        console.error('Date formatting error:', error);
        return 'Date error';
      }
    };
  }, [locale, defaultFormat]);

  // Các format thông dụng
  const formats = useMemo(() => ({
    // Ngày tháng
    shortDate: (date: DateInput) => formatDate(date, 'dd/MM/yyyy'),
    longDate: (date: DateInput) => formatDate(date, 'dd MMMM yyyy'),
    fullDate: (date: DateInput) => formatDate(date, 'EEEE, dd MMMM yyyy'),
    
    // Thời gian - PHẦN MỚI THÊM
    time: (date: DateInput) => formatDate(date, 'HH:mm'),
    time12h: (date: DateInput) => formatDate(date, 'hh:mm a'), // 12-hour format với AM/PM
    timeWithSeconds: (date: DateInput) => formatDate(date, 'HH:mm:ss'),
    time12hWithSeconds: (date: DateInput) => formatDate(date, 'hh:mm:ss a'), // 12-hour với seconds
    timeWithMilliseconds: (date: DateInput) => formatDate(date, 'HH:mm:ss.SSS'),
    
    // Chỉ giờ
    hour: (date: DateInput) => formatDate(date, 'HH'), // 24-hour
    hour12: (date: DateInput) => formatDate(date, 'hh'), // 12-hour
    minute: (date: DateInput) => formatDate(date, 'mm'),
    second: (date: DateInput) => formatDate(date, 'ss'),
    ampm: (date: DateInput) => formatDate(date, 'a'), // AM/PM
    
    // Kết hợp
    dateTime: (date: DateInput) => formatDate(date, 'dd/MM/yyyy HH:mm'),
    dateTime12h: (date: DateInput) => formatDate(date, 'dd/MM/yyyy hh:mm a'),
    fullDateTime: (date: DateInput) => formatDate(date, 'dd/MM/yyyy HH:mm:ss'),
    fullDateTime12h: (date: DateInput) => formatDate(date, 'dd/MM/yyyy hh:mm:ss a'),
    
    // Relative time (cần thêm date-fns formatRelative nếu muốn)
    // relative: (date: DateInput) => formatRelative(dateObj, new Date(), { locale: localeMap[locale] }),
    
    // Custom
    custom: formatDate,
  }), [formatDate]);

  return formats;
};

// Export hook mặc định
export default useDateFormatter;