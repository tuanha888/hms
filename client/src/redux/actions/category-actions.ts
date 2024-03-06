import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAPI } from "../fake-api/category-api";
import axios from "axios";
import { HOST_URL } from "./config";


export const getCategories = createAsyncThunk(
    'get-categories',
    async (_, {rejectWithValue})=> {
        
        const res = await axios.get(`${HOST_URL}/categories`)
        if (res.status < 200 || res.status >= 300) {
            return rejectWithValue(res)
        };
        return res.data;
    }
)