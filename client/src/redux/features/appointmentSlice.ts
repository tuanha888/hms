import { createSlice } from "@reduxjs/toolkit"
import { acceptAppoitment, createAppointment, deleteAppointment, getAppointmentsOfDoctor, getAppointmentsOfPatient, rejectAppoitment, updateAppointment } from "../actions/appointment-actions"


export interface Appointment {
    id: string,
    doctorId: string,
    patientId: string,
    doctorName: string,
    patientName: string,
    time: Date,
    status: string,
    note: string

}

const initValues : {
    doctorAppointments: Appointment[],
    patientAppointments: Appointment[]
} = {
    doctorAppointments: [],
    patientAppointments: []
}

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: initValues,
    reducers: {
        setDoctorAppointments: (state, action)=> {
            state.doctorAppointments = action.payload
        },
        setPatientAppointments: (state, action)=> {
            state.patientAppointments = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getAppointmentsOfDoctor.fulfilled, (state, action)=> {
            state.doctorAppointments = action.payload;
        })
        builder.addCase(getAppointmentsOfPatient.fulfilled, (state, action) => {
            state.patientAppointments = action.payload;
        })
        builder.addCase(createAppointment.fulfilled, (state, action) => {
            const newApp = action.payload
            state.patientAppointments = [newApp, ...state.patientAppointments]
        })
        builder.addCase(updateAppointment.fulfilled, (state, action) => {
            const updated = action.payload
            state.patientAppointments = state.patientAppointments.map(appointment => {
                if (appointment.id !== updated.id) return appointment
                else return updated
            })
        })
        builder.addCase(deleteAppointment.fulfilled, (state, action) => {
            const id = action.payload;
            state.patientAppointments = state.patientAppointments.filter((appointment) => appointment.id !== id)
        })
        builder.addCase(acceptAppoitment.fulfilled, (state, action)=> {
            const id = action.payload;
            state.doctorAppointments = state.doctorAppointments.map(app => {
                if (app.id !== id) return app
                else {
                    app.status = "ACCEPT"
                    return app
                }
            })
        })
        builder.addCase(rejectAppoitment.fulfilled, (state, action)=> {
            state.doctorAppointments = state.doctorAppointments.map(app => {
                const id = action.payload;
                if (app.id !== id) return app
                else {
                    app.status = "REJECT"
                    return app
                }
            })
        })
    },
})

export const {} = appointmentSlice.actions
export default appointmentSlice.reducer