import { DatePicker } from '../DatePicker'; 

// DatePicker를 DateRangePicker로 내보냅니다
export const DateRangePicker = (props: any) => {
  return DatePicker({
    ...props,
    selectsRange: true
  });
}; 