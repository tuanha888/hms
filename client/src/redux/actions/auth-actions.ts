import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOST_URL } from "./config";
import axios from 'axios'

export interface LoginProps {
    username: string,
    password: string
}
export interface ChangePassword {
    oldPassword: string,
    newPassword: string
}
export const Login = createAsyncThunk(
    'login',
    async (data: LoginProps, {rejectWithValue}) => {
            const response = await axios.post(`${HOST_URL}/auth/login`, data);
            if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
            }
            response.data.avatar = "https://res.cloudinary.com/ddiudyz6q/image/upload/v1705380139/hms/avatars/6yvpkj_d98mou.jpg"
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            return response.data;
    }
)

export const Logout = createAsyncThunk(
    'logout',
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${HOST_URL}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        localStorage.clear();
    }
)

export const ChangePasswordAPI = createAsyncThunk(
    'change-password',
    async (data : ChangePassword, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`${HOST_URL}/auth/api/change_password`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
    }
)