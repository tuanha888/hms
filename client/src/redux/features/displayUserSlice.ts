import { createDoctor } from '../actions/doctor-actions';
import { createPatient } from '../actions/patient-actions';
import { ChangePassword } from './../../../.history/src/redux/actions/auth-actions_20240101112046';
import { createSlice } from "@reduxjs/toolkit";


const initValues : {
    username: string,
    password: string,
    display: boolean
}
 = {
    username: "",
    password: "",
    display: false
 }
export const displayUserSlice = createSlice({
    name: 'display-user',
    initialState: initValues,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.display = action.payload.display
        }
    },
    extraReducers(builder) {
        builder.addCase(createDoctor.fulfilled, (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.display = true
        })
        builder.addCase(createPatient.fulfilled, (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.display = true
        })
    },
})

export const {setUser} = displayUserSlice.actions
export default displayUserSlice.reducer