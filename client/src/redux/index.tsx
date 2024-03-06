import userReducer from "./features/userSlice";
import loadingReducer from "./features/loadingSlice";
import postReducer from "./features/postSlice";
import departmentReducer from "./features/departmentSlice";
import categoryReducer from "./features/postCategorySlice";
import surgeryReducer from "./features/surgerySlice";
import patientReducer from "./features/patientSlice";
import doctorReducer from "./features/doctorSlice";
import appointmentReducer from "./features/appointmentSlice";
import prescriptionReducer from "./features/prescriptionSlice";
import medicalRecordReducer from "./features/medicalRecordSlice";
import notificationReducer from "./features/notificationSlice";
import displayUserReducer from "./features/displayUserSlice";
import voteReducer from "./features/voteSlice";
import treatmentPlanReducer from "./features/treatmentPlanSlice";
import messageReducer from "./features/messageSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  post: postReducer,
  department: departmentReducer,
  category: categoryReducer,
  surgery: surgeryReducer,
  patient: patientReducer,
  doctor: doctorReducer,
  appointment: appointmentReducer,
  prescription: prescriptionReducer,
  medicalRecord: medicalRecordReducer,
  notification: notificationReducer,
  displayUser: displayUserReducer,
  vote: voteReducer,
  treatmentPlan: treatmentPlanReducer,
  message: messageReducer
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
