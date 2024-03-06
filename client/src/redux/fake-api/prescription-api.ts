// Make sure to replace with the actual path to your interface file

import { Prescription, Medicine } from "../features/prescriptionSlice";

const generateFakePrescriptions = (): Prescription[] => {
  const fakePrescriptions: Prescription[] = [];

  for (let i = 1; i <= 5; i++) {
    const fakePrescription: Prescription = {
      id: `prescription${i}`,
      doctorId: `doctor${i}`,
      doctorName: `Doctor ${i}`,
      patientId: `patient${i}`,
      patientName: `Patient ${i}`,
      createdDay: new Date(),
      note: `Prescription ${i} note`,
      medicines: generateFakeMedicines(),
    };

    fakePrescriptions.push(fakePrescription);
  }

  return fakePrescriptions;
};

const generateFakeMedicines = (): Medicine[] => {
  const fakeMedicines: Medicine[] = [];

  for (let i = 1; i <= 3; i++) {
    const fakeMedicine: Medicine = {
      id: `medicine${i}`,
      prescriptionId: `prescription1`, // Assuming the same prescriptionId for simplicity
      name: `Medicine ${i}`,
      quantity: 1,
      breakfast: 1,
      lunch: 1,
      dinner: 1,
      beforeBreakfast: false,
      beforeLunch: false,
      beforeDinner: false,
    };

    fakeMedicines.push(fakeMedicine);
  }

  return fakeMedicines;
};

export const fakePrescriptions = generateFakePrescriptions();

