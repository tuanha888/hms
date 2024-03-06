import { createSlice } from "@reduxjs/toolkit"
import { createPost, deletePost, getPost, getPosts, getPostsOfDoctor, updatePost } from "../actions/post-actions"


export interface Post {
    id: string,
    title: string,
    content: string,
    cover: string,
    coverContent: string,
    summary: string,
    doctorId: string, 
    doctorName: string,
    categoryId: string,
    categoryName: string
}

const initValues : {
    posts: Post[],
    doctorPosts: Post[],
    post: Post | null
} = {
    posts: [],
    doctorPosts: [],
    post: null
}

export const postSlice = createSlice({
    name: "post",
    initialState: initValues,
    reducers: {
        
    },
    extraReducers: (builder) =>  {
        builder.addCase(getPosts.fulfilled, (state, action)=> {
            state.posts = action.payload;
        })
        builder.addCase(getPostsOfDoctor.fulfilled, (state, action)=> {
            state.doctorPosts = action.payload;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            const newPost = action.payload
            state.doctorPosts = [newPost, ...state.doctorPosts]
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const updated = action.payload
            state.doctorPosts = state.doctorPosts.map(post => {
                if (post.id !== updated.id) return post
                else return updated
            })

        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const id = action.payload
            state.doctorPosts = state.doctorPosts.filter(post => post.id !== id)
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.post = action.payload
        })
    },
})

export const {} = postSlice.actions
export default postSlice.reducer