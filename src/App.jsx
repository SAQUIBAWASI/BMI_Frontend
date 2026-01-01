// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Layout from './components/Layout';
// import AddPatient from './pages/AddPatient';
// import Dashboard from './pages/Dashboard';
// import DoctorDashboard from './pages/DoctorDashboard';
// import PatientDetails from './pages/PatientDetails';

// function App() {
//     return (
//         <Router>
//             <Layout>
//                 <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/add-patient" element={<AddPatient />} />
//                     <Route path="/patient/:id" element={<PatientDetails />} />
//                     <Route path="/doctor" element={<DoctorDashboard />} />
//                 </Routes>
//             </Layout>
//         </Router>
//     );
// }

// export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HealthReport from "./components/HealthReport";
import Layout from "./components/Layout";
import AddPatient from "./pages/AddPatient";
import Camp from "./pages/Camp";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDetails from "./pages/PatientDetails";
import OurVolunteers from "./pages/OurVolunteers";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Import Register
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ Register Route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/camp" element={<Camp />} />
          {/* ✅ Health Report Download Page */}
          <Route path="/health-report" element={<HealthReport />} />
          <Route path="/our-volunteers" element={<OurVolunteers />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

