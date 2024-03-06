import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";
import { getDoctorsAPI } from "../fake-api/doctor-api";

export const getMessages = createAsyncThunk(
    "get-messages",
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/getMessagesOfUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const getContactedDoctors = createAsyncThunk(
    "get-contacted-doctors",
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/message/contactedDoctor`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
        // return getDoctorsAPI();
    }
)

export const getContactedPatients = createAsyncThunk(
    "get-contacted-patients",
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/message/contactedPatient`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
