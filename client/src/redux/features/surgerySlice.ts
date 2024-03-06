import { createSlice } from "@reduxjs/toolkit"
import { createSurgery, deleteSurgery, getSurgeries, updateSurgery } from "../actions/surgery-actions"

export interface Surgery {
    id: string,
    doctorId: string,
    doctorName: string,
    patientId: string,
    patientName: string,
    time: Date,
    content: string,
    expectedTime: number
}

const initValues : {
    surgeries: Surgery[],
    doctorSurgeries: Surgery[]
} = {
    surgeries: [],
    doctorSurgeries: []
}

export const surgerySlice = createSlice({
    name: 'surgery',
    initialState: initValues,
    reducers: {
        setSurgeries: (state, action) => {
            state.surgeries = action.payload
        },
        setDoctorSurgeries: (state, action)=> {
            state.doctorSurgeries = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getSurgeries.fulfilled, (state, action)=> {
            state.surgeries = action.payload
        })
        builder.addCase(updateSurgery.fulfilled, (state, action) => {
            const updatedSurgery = action.payload as Surgery
            state.surgeries = state.surgeries.map(surgery => {
                if (surgery.id !== updatedSurgery.id) return surgery;
                else return updatedSurgery
            })
        })
        builder.addCase(deleteSurgery.fulfilled, (state, action) => {
            const id = action.payload
            state.surgeries = state.surgeries.filter(surgery => surgery.id !== id)
        })
        builder.addCase(createSurgery.fulfilled, (state, action) => {
            const newSur = action.payload
            state.surgeries = [newSur, ...state.surgeries]
        })
    },
})

export const {setDoctorSurgeries, setSurgeries}= surgerySlice.actions
export default surgerySlice.reducer