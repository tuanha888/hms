import { createSlice } from "@reduxjs/toolkit"
import { getDepartments } from "../actions/department-actions"

export interface Department {
    id: string,
    name: string
}
const initValues : {
    departments: Department[]
}= {
    departments: []
}
export const departmentSlice = createSlice({
    name: "department",
    initialState: initValues,
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartments.fulfilled, (state, action)=> {
            state.departments = action.payload
        })
    }
})

export const {setDepartments} = departmentSlice.actions;

export default departmentSlice.reducer;