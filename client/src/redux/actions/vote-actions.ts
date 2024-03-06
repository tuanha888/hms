import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVotesOfDoctorAPI } from "../fake-api/vote-api";
import { HOST_URL, convertDatesToObjects } from "./config";
import axios from "axios";
import { Vote } from "../features/voteSlice";


export const getDoctorVotes = createAsyncThunk(
    'get-dotor-votes',
    async (doctorId: string,{rejectWithValue} ) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/votes/doctor?doctorId=${doctorId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const addVote = createAsyncThunk(
    'add-vote',
    async (data: any, {rejectWithValue} ) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/votes`, data,  {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const updateVote = createAsyncThunk(
    'update-vote',
    async (data: {
        id: string,
        value: Vote
    }, {rejectWithValue}) => {
        console.log(data.value)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/votes/${data.id}`, data.value,  {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);
    }
)

export const deleteVote = createAsyncThunk(
    'delete-vote',
    async (id: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(`${HOST_URL}/api/votes/${id}`,  {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return id;
    }
)