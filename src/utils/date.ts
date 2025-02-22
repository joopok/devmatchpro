import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatTime = (date: string | Date): string => {
  const messageDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  if (messageDate.getDate() === now.getDate()) {
    return format(messageDate, 'HH:mm');
  }
  
  if (messageDate.getFullYear() === now.getFullYear()) {
    return format(messageDate, 'M월 d일 HH:mm');
  }
  
  return format(messageDate, 'yyyy년 M월 d일 HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
};

export function formatDate(date: string | Date | undefined): string {
  if (!date) return '날짜 정보 없음';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}; 