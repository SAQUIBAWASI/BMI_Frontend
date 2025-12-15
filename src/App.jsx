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
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDetails from "./pages/PatientDetails";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* ✅ Health Report Download Page */}
          <Route path="/health-report" element={<HealthReport />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

