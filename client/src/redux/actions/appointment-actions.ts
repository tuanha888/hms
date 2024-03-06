import { createAsyncThunk } from "@reduxjs/toolkit";
import { fakeAppointments } from "../fake-api/appointment-api";
import axios from "axios";
import { HOST_URL, convertDatesToObjects } from "./config";

interface AppointmentRequest {
    doctorId: string,
    time: Date,
    note: string
}
export const getAppointmentsOfDoctor = createAsyncThunk(
    'get-appointments-of-doctor',
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/appointments/doctor`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);
    }
)


export const getAppointmentsOfPatient = createAsyncThunk(
    'get-appointments-of-patient',
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/appointments/patient`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);
    }
)

export const createAppointment = createAsyncThunk(
    'create-appointment',
    async (data: any, { rejectWithValue }) => {
        console.log(data)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/appointments/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);;
    }
)
export const updateAppointment = createAsyncThunk(
    'update-appointment',
    async (data: {
        id: string,
        value: any
    }, { rejectWithValue }) => {
        console.log(data.value)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/appointments/${data.id}?status=${data.value.status}`, data.value, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);
    }
)

export const deleteAppointment = createAsyncThunk(
    'delete-appointment',
    async (id: string, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(`${HOST_URL}/api/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return id;
    }
)
export const rejectAppoitment = createAsyncThunk(
    'reject-appointment',
    async (id: string, {rejectWithValue} )=> {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/appointments/reject/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return id;
    }
)
export const acceptAppoitment = createAsyncThunk(
    'accept-appointment',
    async (id: string, {rejectWithValue} )=> {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/appointments/accept/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return id;
    }
)