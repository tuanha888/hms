import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL, convertDatesToObjects } from "./config";
import { getPostsAPI } from "../fake-api/posts-api";



export const getPosts = createAsyncThunk(
    'get-posts',
    async (_, {rejectWithValue})=> {
        const response = await axios.get(`${HOST_URL}/posts`);
        if (response.status < 200 || response.status >= 300 )
        {
            return rejectWithValue(response);
        }
        return response.data;
    }
)
export const getPost = createAsyncThunk(
    'get-post', 
    async (id: string, {rejectWithValue}) => {
        const response = await axios.get(`${HOST_URL}/posts/${id}`)
        if (response.status < 200 || response.status >= 300 )
        {
            return rejectWithValue(response);
        }
        return response.data;
    }
)

export const getPostsOfDoctor = createAsyncThunk(
    'get-posts-of-doctor',
    async (id: string, {rejectWithValue})=> {
        const response = await axios.get(`${HOST_URL}/posts/doctor?doctorId=${id}`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const createPost = createAsyncThunk(
    'create-post',
    async (data: any, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/posts`, data,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);;
    }
)

export const updatePost = createAsyncThunk(
    'update-post',
    async (data : {
        id: string,
        value: any
    }, {rejectWithValue}) => {
        const emptyImage : File  = new File([], "hello")
        const image = data.value.get("cover")
        if (typeof image === "string") data.value.set("cover", emptyImage)
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/posts/${data.id}`, data.value,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return convertDatesToObjects(response.data);;
    }
)

export const deletePost = createAsyncThunk(
    'delete-post',
    async (id: string, {rejectWithValue} ) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(`${HOST_URL}/api/posts/${id}`,{
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