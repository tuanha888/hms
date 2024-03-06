import { createSlice } from "@reduxjs/toolkit"
import { createPatient, deletePatient, getDoctorPatients, getPatient, getPatients, updatePatient } from "../actions/patient-actions"


export interface Patient {
    id: string,
    name: string,
    address: string,
    birthday: Date,
    job: string,
    phoneNumber: string,
    nation: string,
    gender: string
}

const initValues: {
    doctorPatients: Patient[],
    patient: Patient | null,
    patients: Patient[]
} = {
    doctorPatients: [],
    patient: null,
    patients: []
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState: initValues,
    reducers: {
        setDoctorPatients: (state, action) => {
            state.doctorPatients = action.payload
        },
        setPatient: (state, action) => {
            state.patient = action.payload
        }

    },
    extraReducers(builder) {
        builder.addCase(getPatient.fulfilled, (state, action) => {
            state.patient = action.payload
        })
        builder.addCase(getPatients.fulfilled, (state, action) => {
            const patients = action.payload
            const newPatients = patients.map(patient => {
                return {
                    ...patient,
                    phoneNumber: patient.phoneNumber.replace('84', '0')
                }
            })
            state.patients =newPatients
        })
        builder.addCase(getDoctorPatients.fulfilled, (state, action) => {
            const patients = action.payload
            const newPatients = patients.map(patient => {
                return {
                    ...patient,
                    phoneNumber: patient.phoneNumber.replace('84', '0')
                }
            })
            state.doctorPatients = newPatients
            
        })
        builder.addCase(updatePatient.fulfilled, (state, action) => {
            state.doctorPatients = state.doctorPatients.map(patient => {
                if (patient.id !== action.payload.id) return patient
                else return action.payload
            })
            state.patients = state.patients.map(patient => {
                if (patient.id !== action.payload.id) return patient
                else return action.payload
            })
        })
        builder.addCase(deletePatient.fulfilled, (state, action) => {
            state.doctorPatients = state.doctorPatients.filter(patient => patient.id !== action.payload)
            state.patients = state.patients.filter(patient => patient.id !== action.payload)
        })
}})

export const { setDoctorPatients, setPatient } = patientSlice.actions
export default patientSlice.reducer