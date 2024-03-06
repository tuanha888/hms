import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";
import { departments } from "../fake-api/department-api";



export const getDepartments = createAsyncThunk(
    'get-departments',
    async (_, {rejectWithValue})=> {
        const accessToken = localStorage.getItem('accessToken');
        const res = await axios.get(`${HOST_URL}/departments`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.status < 200 || res.status >= 300) {
            return rejectWithValue(res)
        };
        return res.data;
    }
)