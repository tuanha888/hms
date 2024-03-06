import { createSlice } from "@reduxjs/toolkit"
import { getCategories } from "../actions/category-actions"


export interface PostCategory {
    id: string,
    name: string
}

const initValues : {
    categories: PostCategory[]
} = {
    categories: []
}

export const postCategorySlice = createSlice({
    name: 'postCategory',
    initialState: initValues,
    reducers: {
        setCategories: (state, action)=> {
            state.categories = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getCategories.fulfilled, (state, action)=> {
            state.categories = action.payload
        })
    },
})

export const {} = postCategorySlice.actions
export default postCategorySlice.reducer