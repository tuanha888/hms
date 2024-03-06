import { createSlice } from "@reduxjs/toolkit";
import { getContactedDoctors, getContactedPatients, getMessages } from "../actions/message-actions";
import { Doctor } from "./doctorSlice";
import { Patient } from "./patientSlice";

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    time: Date
}

const initialValue: {
    messages: Message[],
    contactedDoctors: Doctor[],
    contactedPatients: Patient[]
} = {
    messages: [],
    contactedDoctors: [],
    contactedPatients: []
}

export const messageSlice = createSlice({
    name: "message",
    initialState: initialValue,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
        })
        builder.addCase(getContactedDoctors.fulfilled, (state, action) => {
            state.contactedDoctors = action.payload;
        })
        builder.addCase(getContactedPatients.fulfilled, (state, action) => {
            state.contactedPatients = action.payload;
        })
    },
})

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;