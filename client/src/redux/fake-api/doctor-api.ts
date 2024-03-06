import { departments } from "./department-api"
import {v4 as uuidv4} from 'uuid'
export const getDoctorsAPI = () => {
    const generateRandomBirthDay = () => {
        const currentDate = new Date();
        const randomYear = Math.floor(Math.random() * 30) + 1970; // Random year between 1970 and 2000
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming all months have up to 28 days
        return new Date(randomYear, randomMonth, randomDay);
      };
      
      // Function to generate a random phone number
      const generateRandomPhoneNumber = () => {
        const randomDigits = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
        return `(+84) ${randomDigits.slice(0, 4)} ${randomDigits.slice(4, 7)} ${randomDigits.slice(7)}`;
      };
      
      // Function to generate a random gender
      const generateRandomGender = () => {
        return Math.random() < 0.5 ? 'Male' : 'Female';
      };
      
      // Function to generate a random image URL
      const generateRandomImageUrl = () => {
        // Replace this with your actual image URL generation logic
        // For simplicity, I'm using placeholder image URLs
        const placeholderImages = [
          'https://placekitten.com/200/300',
          'https://placebear.com/200/300',
          'https://placekitten.com/200/300',
          // Add more placeholder image URLs
        ];
        const randomIndex = Math.floor(Math.random() * placeholderImages.length);
        return placeholderImages[randomIndex];
      };
      
      // Function to generate a random rating between 1 and 5
      const generateRandomRating = () => {
        return Math.floor(Math.random() * 5) + 1;
      };
      
      // Generate 10 doctors
      const doctors = Array.from({ length: 10 }, (_, index) => {
        const department = departments[index % departments.length];
        const uniqueId = uuidv4();
        return {
          id: uniqueId,
          name: `Bác sĩ ${String.fromCharCode(65 + index)}`, // A, B, C, ...
          address: `Địa chỉ ${index + 1}`,
          departmentId: department.id,
          departmentName: department.name,
          birthDay: generateRandomBirthDay(),
          phoneNumber: generateRandomPhoneNumber(),
          gender: generateRandomGender(),
          image: generateRandomImageUrl(),
          rating: generateRandomRating(),
        };
      });
    return doctors;
}