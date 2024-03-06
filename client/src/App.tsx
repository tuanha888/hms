import Loading from "./components/common/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Protected from "./components/common/Protected";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import AdminLayout from "./pages/Admin/AdminLayout";
import DoctorLayout from "./pages/Doctor/DoctorLayout";
import PatientLayout from "./pages/Patient/PatientLayout";
import Surgeries from "./components/common/Surgeries";
import AdminDoctor from "./pages/Admin/AdminDoctor";
import Test from "./components/common/Test";
import PostsDoctor from "./components/common/PostsDoctor";
import Appointments from "./components/common/Appointments";
import Patients from "./pages/Doctor/Patients";
import Doctors from "./components/common/Doctors";
import Prescription from "./components/common/Prescription";
import Prescriptions from "./components/common/Prescriptions";
import Notification from "./components/common/Notification";
import DisplayUser from "./components/common/DisplayUser";
import Chat from "./components/common/Chat";
import TreatmentPlans from "./components/common/TreatmentPlans";
function App() {
  return (
    <div className="wrapper">
      {/* <Notification /> */}
      <Loading />
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={<Protected element={<AdminLayout />} />}
          >
            <Route
              path="/admin/surgeries"
              element={<Surgeries role="ADMIN" />}
            />
            <Route path="/admin/doctors" element={<AdminDoctor />} />
          </Route>
          <Route
            path="/doctor"
            element={<Protected element={<DoctorLayout />} />}
          >
            <Route path="/doctor/patients" element={<Patients />} />
            <Route
              path="/doctor/surgeries"
              element={<Surgeries role="DOCTOR" />}
            />
            <Route
              path="/doctor/appointments"
              element={<Appointments role="DOCTOR" />}
            />
            <Route path="/doctor/posts" element={<PostsDoctor />} />
            <Route path="/doctor/chat" element={<Chat role="DOCTOR" />} />
          </Route>
          <Route
            path="/patient"
            element={<Protected element={<PatientLayout />} />}
          >
            <Route
              path="/patient/appointments"
              element={<Appointments role="PATIENT" />}
            />
            <Route
              path="/patient/prescriptions"
              element={<Prescriptions id={null} isMargin={true} />}
            />
            <Route
              path="/patient/treatment_plans"
              element={<TreatmentPlans />}
            />
            <Route path="/patient/doctors" element={<Doctors />} />
            <Route path="/patient/chat" element={<Chat role="PATIENT" />} />
          </Route>
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
