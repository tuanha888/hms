import { createSlice } from "@reduxjs/toolkit"
import { createDoctor, getDoctors, updateDoctor } from "../actions/doctor-actions"


export interface Doctor {
    id: string,
    name: string,
    address: string,
    departmentId: string,
    departmentName: string,
    birthDay: Date,
    phoneNumber: string,
    gender: string,
    image: string,
    rating: number
}

const initValues : {
    doctors: Doctor[]
} = {
    doctors: []
}

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: initValues,
    reducers: {
        setDoctors: (state, action) => {
            state.doctors = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getDoctors.fulfilled, (state, action)=> {
            const doctors = action.payload
            const newDoctors = doctors.map(doctor => {
                return {
                    ...doctor,
                    phoneNumber: doctor.phoneNumber.replace('84', '0')
                }
            })
            state.doctors = newDoctors
        })
        builder.addCase(createDoctor.fulfilled, (state, action) => {
            
        })
        builder.addCase(updateDoctor.fulfilled, (state, action) =>{
            const updatedDoctor = action.payload
            state.doctors = state.doctors.map(doctor => {
                if (doctor.id !== updatedDoctor.id) return doctor
                else return updatedDoctor
            })
        })
    },
})

export const {} = doctorSlice.actions
export default doctorSlice.reducer