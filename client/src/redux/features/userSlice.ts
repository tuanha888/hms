import { createSlice } from "@reduxjs/toolkit";
import { Login, Logout } from "../actions/auth-actions";
import { getDoctor } from "../actions/doctor-actions";
import { getPatient } from "../actions/patient-actions";


export interface User {
    id: string,
    name: string,
    username: string,
    avatar: string, 
    role: string,
}
const user = localStorage.getItem("currentUser");
const initValues : {
    user: User | null
}= {
    user: user ? JSON.parse(user) : null
};
export const userSlice = createSlice({
    name: "user",
    initialState: initValues,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action)=> {
            state.user = action.payload;
        })
        builder.addCase(Logout.fulfilled, (state, action)=> {
            state.user = null
        })
        builder.addCase(getDoctor.fulfilled, (state, action)=> {
            state.user = action.payload
        })
        builder.addCase(getPatient.fulfilled, (state, action)=> {
            state.user = action.payload
        })
    },
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer