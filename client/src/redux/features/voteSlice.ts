import { createSlice } from "@reduxjs/toolkit"
import { addVote, deleteVote, getDoctorVotes, updateVote } from "../actions/vote-actions"


export interface Vote {
    id: string,
    patientId: string,
    patientName: string,
    doctorId: string,
    doctorName: string
    rating: number,
    content: string
}
const initValues : {
    doctorVotes: Vote[]
} = {
    doctorVotes: []
}

export const voteSlice = createSlice({
    name: 'vote',
    initialState: initValues,
    reducers: {
        setDoctorVotes: (state, action)=> {
            state.doctorVotes = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getDoctorVotes.fulfilled, (state, action) => {
            state.doctorVotes = action.payload
        })
        builder.addCase(addVote.fulfilled, (state, action) => {
            const newVote = action.payload
            state.doctorVotes = [...state.doctorVotes, newVote]
        })
        builder.addCase(updateVote.fulfilled, (state, action)=> {
            const updated = action.payload
            state.doctorVotes = state.doctorVotes.map(vote => {
                if (vote.id !== updated.id) return vote
                else return updated
            })
        })
        builder.addCase(deleteVote.fulfilled, (state, action)=> {
            const id = action.payload
            state.doctorVotes = state.doctorVotes.filter(vote => vote.id !== id)
        })
    },
})

export const {} = voteSlice.actions
export default voteSlice.reducer