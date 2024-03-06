import {v4 as uuidv4} from 'uuid'
import { Surgery } from '../features/surgerySlice';

export const getSurgeryAPI = () => {
    const generateRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      };
      
      const today = new Date();
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + 6);
      
      const surgeries: Surgery[] = Array.from({ length: 10 }, (_, index) => {
        const surgeryDate = index < 3 ? today : generateRandomDate(today, endOfWeek);
        return {
          id: uuidv4(),
          doctorId: uuidv4(),
          doctorName: `Bác sĩ ${String.fromCharCode(65 + index)}`, // A, B, C, ...
          patientId: uuidv4(),
          patientName: `Nguyễn Văn ${String.fromCharCode(65 + index)}`, // A, B, C, ...
          time: surgeryDate,
          content: `Nội dung phẫu thuật ${index + 1}`,
          expectedTime: 2.5
        };
      });
      
      return surgeries;
}