import { createSlice } from "@reduxjs/toolkit";
import { createMedicalRecord, deleteMedicalRecord, getMedicalRecord, getMedicalRecordOfPatients, updateMedicalRecord } from "../actions/medicalRecord-actions";
import { TreatmentPlan } from "./treatmentPlanSlice";
import { createTreatmentPlan, deleteTreatmentPlan, updateTreatmentPlan } from "../actions/treatmentPlan-actions";

export interface MedicalRecord {
    id: string
    doctorId: string,
    doctorName: string,
    patientId: string,
    patientName: string,
    departmentId: string,
    departmentName: string,
    bhytCode: string,
    inDay: Date,
    outDay: Date,
    inDayDiagnose: string,
    outDayDiagnose: string,
    medicalHistory: string,
    diseaseProgress: string,
    testResults: string,
    hospitalDischargeStatus: string,
    stayType: string,
    note: string,
    treatmentPlan: TreatmentPlan | null
}

const initValues: {
    medicalRecord: MedicalRecord | null;
    medicalRecords: MedicalRecord[]
} = {
    medicalRecord: null,
    medicalRecords: []
};

export const medicalRecordSlice = createSlice({
    name: 'medicalRecord',
    initialState: initValues,
    reducers: {
        setMedicalRecord: (state, action)=> {
            state.medicalRecord = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getMedicalRecord.fulfilled, (state, action)=> {
            
        })
        builder.addCase(getMedicalRecordOfPatients.fulfilled, (state, action) => {
            state.medicalRecords = action.payload
        })
        builder.addCase(createMedicalRecord.fulfilled, (state, action) => {
            const newMR = action.payload
            state.medicalRecords = [newMR, ...state.medicalRecords]
        })
        builder.addCase(updateMedicalRecord.fulfilled, (state, action) => {
            const updated = action.payload
            state.medicalRecords = state.medicalRecords.map(medical => {
                if (medical.id !== updated.id) return medical
                else return updated
            })
        })
        builder.addCase(deleteMedicalRecord.fulfilled, (state, action) => {
            const id = action.payload
            state.medicalRecords = state.medicalRecords.filter(medical => medical.id !== id)
        })
        builder.addCase(createTreatmentPlan.fulfilled, (state, action) => {
            const newTM = action.payload
            state.medicalRecords = state.medicalRecords.map(med => {
                if (med.id !== newTM.medicalRecordId) return med
                else return {
                    ...med,
                    treatmentPlan: newTM
                }
            })
        })
        builder.addCase(deleteTreatmentPlan.fulfilled, (state, action)=> {
            const id = action.payload
            state.medicalRecords = state.medicalRecords.map(med => {
                if (med.treatmentPlan !== null && med.treatmentPlan.id === id) {
                    return {
                        ...med,
                    treatmentPlan: null
                    }
                }
                else return med
            })
        })
        builder.addCase(updateTreatmentPlan.fulfilled, (state, action) => {
            const updated = action.payload
            state.medicalRecords = state.medicalRecords.map(med => {
                if (med.treatmentPlan?.id === updated.id) {
                    return {
                        ...med,
                    treatmentPlan: updated
                    }
                }
                else return med
            })
        })
    },
})
export const {} = medicalRecordSlice.actions
export default medicalRecordSlice.reducer