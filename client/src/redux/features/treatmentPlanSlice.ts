import { createSlice } from "@reduxjs/toolkit"
import { createTreatmentPlan, deleteTreatmentPlan, getTreatmentPlanOfPatients, updateTreatmentPlan } from "../actions/treatmentPlan-actions"

export interface TreatmentPlan {
    id: string,
    doctorId: string,
    doctorName: string,
    patientId: string,
    patientName: string,
    treatmentMethod: string,
    lastExaminationDay: Date,
    nextExpectedExaminationDay: Date,
    note: string,
    medicalRecordId: string
}

const initValues: {
    treatmentPlans: TreatmentPlan[]
} = {
    treatmentPlans: []
}

export const treatmentPlanSlice = createSlice({
    name: "treatmentPlan",
    initialState: initValues,
    reducers: {
        setTreatmentPlans: (state, action) => {
            state.treatmentPlans = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getTreatmentPlanOfPatients.fulfilled, (state, action)=> {
            state.treatmentPlans = action.payload
        })
        builder.addCase(createTreatmentPlan.fulfilled, (state, action) => {
            state.treatmentPlans = [action.payload, ...state.treatmentPlans]
        })
        builder.addCase(updateTreatmentPlan.fulfilled, (state, action)=> {
            state.treatmentPlans = state.treatmentPlans.map(tm => {
                if (tm.id !== action.payload.id) return tm
                else return action.payload
            })

        })
        builder.addCase(deleteTreatmentPlan.fulfilled, (state, action) => {
            state.treatmentPlans = state.treatmentPlans.filter(tm => tm.id !== action.payload)
        })
    },
})

export const {setTreatmentPlans} = treatmentPlanSlice.actions
export default treatmentPlanSlice.reducer