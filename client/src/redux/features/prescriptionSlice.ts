import { createSlice } from "@reduxjs/toolkit"
import { createPrescription, deletePrescription, getPrescriptionOfPatient, updatePrescription } from "../actions/prescription-actions"


export interface Medicine {
    id: string,
    prescriptionId: string,
    name: string,
    quantity: number,
    breakfast: number,
    lunch: number,
    dinner: number,
    beforeBreakfast: boolean,
    beforeLunch: boolean,
    beforeDinner: boolean
}

export interface Prescription {
    id: string,
    doctorId: string,
    doctorName: string,
    patientId: string,
    patientName: string,
    createdDay: Date,
    note: string,
    medicines: Medicine[]
}

const initValues : {
    patientPrescriptions: Prescription[]
} = {
    patientPrescriptions: []
}

export const prescriptionSlice = createSlice({
    name: "prescription",
    initialState: initValues,
    reducers: {
        setPatientPrescriptions: (state, action)=> {
            state.patientPrescriptions = action.payload
        }

    },
    extraReducers(builder) {
        builder.addCase(getPrescriptionOfPatient.fulfilled, (state, action) => {
            state.patientPrescriptions = action.payload;
        })
        builder.addCase(createPrescription.fulfilled, (state, action) => {
            state.patientPrescriptions = [action.payload, ...state.patientPrescriptions]
        })
        builder.addCase(updatePrescription.fulfilled, (state, action) => {
            state.patientPrescriptions = state.patientPrescriptions.map(pres => {
                if (pres.id !== action.payload.id)  return pres
                else return action.payload
            })
        })
        builder.addCase(deletePrescription.fulfilled, (state, action) => {
            state.patientPrescriptions = state.patientPrescriptions.filter(pres => pres.id !== action.payload)
        })
    },
})

export const {} = prescriptionSlice.actions
export default prescriptionSlice.reducer