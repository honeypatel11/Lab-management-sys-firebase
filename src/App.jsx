import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
// import Lab from "./pages/labs/Lab";
import ManageLab from "./pages/labs/ManageLab";
import Pc from "./pages/pcs/Pc";
import ManagePc from "./pages/pcs/ManagePc";
// import Student from "./pages/students/Student";
// import ManageStudent from "./pages/students/ManageStudent";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Lab from "./pages/labs/Lab";
import Student from "./pages/student/Student";
import ManageStudent from "./pages/student/ManageStudent";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="/login" element={<Login />} />

                <Route path="/labs" element={<ProtectedRoute Component={Lab} />} />
                <Route path="/add-lab" element={<ProtectedRoute Component={ManageLab} />} />
                <Route path="/edit-lab/:labId" element={<ProtectedRoute Component={ManageLab} />} />

                <Route path="/pcs" element={<ProtectedRoute Component={Pc} />} />
                <Route path="/add-pc" element={<ProtectedRoute Component={ManagePc} />} />
                <Route path="/edit-pc/:pcId" element={<ProtectedRoute Component={ManagePc} />} />

                <Route path="/students" element={<ProtectedRoute Component={Student} />} />
                <Route path="/add-student" element={<ProtectedRoute Component={ManageStudent} />} />
                <Route path="/edit-student/:studentId" element={<ProtectedRoute Component={ManageStudent} />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;