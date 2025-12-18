// import axios from 'axios';
// import { ArrowRight, Phone, Search, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//     const [patients, setPatients] = useState([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     const fetchPatients = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/patients');
//             setPatients(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPatients();
//     }, []);

//     const deletePatient = async (id) => {
//         if (!window.confirm("Are you sure? This will delete all history for this patient.")) return;
//         try {
//             await axios.delete(`http://localhost:5000/api/patients/${id}`);
//             fetchPatients();
//         } catch (err) {
//             alert('Error deleting');
//         }
//     };

//     const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

//     return (
//         <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
//                     <h3 className="text-blue-100 font-medium mb-1">Total Patients</h3>
//                     <div className="text-4xl font-bold">{patients.length}</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
//                     <h3 className="text-purple-100 font-medium mb-1">Active Today</h3>
//                     <div className="text-4xl font-bold">--</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
//                     <h3 className="text-pink-100 font-medium mb-1">Critical Cases</h3>
//                     <div className="text-4xl font-bold">--</div>
//                 </div>
//             </div>

//             {/* List Header */}
//             <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                 <h3 className="text-xl font-bold text-gray-800">Patient Directory</h3>
//                 <div className="relative">
//                     <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 ring-indigo-500 outline-none w-64 transition-all"
//                     />
//                 </div>
//             </div>

//             {/* List Grid */}
//             {loading ? (
//                 <div className="text-center py-10 text-gray-500">Loading directory...</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group">
//                             <div className="p-6">
//                                 <div className="flex justify-between items-start mb-4">
//                                     <div>
//                                         <h4 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{patient.name}</h4>
//                                         <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                                             <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-semibold">{patient.gender}</span>
//                                             <span>•</span>
//                                             <span>{patient.age} Yrs</span>
//                                         </div>
//                                     </div>
//                                     <button onClick={() => deletePatient(patient._id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </div>

//                                 <div className="space-y-2 mb-6">
//                                     <div className="flex items-center gap-2 text-gray-600 text-sm">
//                                         <Phone size={14} className="text-indigo-400" /> {patient.contact}
//                                     </div>
//                                     <div className="flex items-center justify-between text-sm bg-indigo-50 p-2 rounded-lg text-indigo-700 font-medium">
//                                         <span>Total Records</span>
//                                         <span className="bg-white px-2 py-0.5 rounded shadow-sm">{patient.testCount}</span>
//                                     </div>
//                                 </div>

//                                 <Link to={`/patient/${patient._id}`} className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors flex justify-center items-center gap-2">
//                                     View Details <ArrowRight size={16} />
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dashboard;

// import axios from 'axios';
// import { ArrowRight, Phone, Search, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//     const [patients, setPatients] = useState([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     // New States
//     const [activeToday, setActiveToday] = useState(0);
//     const [criticalCases, setCriticalCases] = useState(0);

//     const fetchPatients = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/patients');

//             setPatients(res.data);

//             // Auto-calc Active Today (patients added today)
//             const today = new Date().toDateString();
//             const active = res.data.filter(p => new Date(p.createdAt).toDateString() === today).length;
//             setActiveToday(active);

//             // Auto-calc critical cases
//             const critical = res.data.filter(p => p.isCritical === true).length;
//             setCriticalCases(critical);

//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPatients();
//     }, []);

//     const deletePatient = async (id) => {
//         if (!window.confirm("Are you sure? This will delete all history for this patient.")) return;
//         try {
//             await axios.delete(`http://localhost:5000/api/patients/${id}`);
//             fetchPatients();
//         } catch (err) {
//             alert('Error deleting');
//         }
//     };

//     const filtered = patients.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="space-y-6">

//             {/* ---------- STAT CARDS ---------- */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 <Card
//                     title="Total Patients"
//                     value={patients.length}
//                     from="from-blue-500"
//                     to="to-blue-600"
//                 />

//                 <Card
//                     title="Active Today"
//                     value={activeToday}
//                     from="from-purple-500"
//                     to="to-purple-600"
//                 />

//                 <Card
//                     title="Critical Cases"
//                     value={criticalCases}
//                     from="from-red-500"
//                     to="to-red-600"
//                 />
//             </div>

//             {/* ---------- HEADER ---------- */}
//             <div className="flex flex-col sm:flex-row justify-between gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                 <h3 className="text-xl font-bold text-gray-800">Patient Directory</h3>

//                 <div className="relative w-full sm:w-64">
//                     <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 ring-indigo-500 outline-none w-full transition-all"
//                     />
//                 </div>
//             </div>

//             {/* ---------- PATIENT CARDS ---------- */}
//             {loading ? (
//                 <div className="text-center py-10 text-gray-500">Loading directory...</div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group">

//                             <div className="p-6">

//                                 <div className="flex justify-between items-start mb-4">
//                                     <div>
//                                         <h4 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
//                                             {patient.name}
//                                         </h4>

//                                         <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
//                                             <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-semibold">
//                                                 {patient.gender}
//                                             </span>

//                                             <span>{patient.age} Yrs</span>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={() => deletePatient(patient._id)}
//                                         className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
//                                     >
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </div>

//                                 <div className="space-y-2 mb-6">
//                                     <div className="flex items-center gap-2 text-gray-600 text-sm">
//                                         <Phone size={14} className="text-indigo-400" /> {patient.contact}
//                                     </div>

//                                     <div className="flex items-center justify-between text-sm bg-indigo-50 p-2 rounded-lg text-indigo-700 font-medium">
//                                         <span>Total Records</span>
//                                         <span className="bg-white px-2 py-0.5 rounded shadow-sm">{patient.testCount}</span>
//                                     </div>
//                                 </div>

//                                 <Link
//                                     to={`/patient/${patient._id}`}
//                                     className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors flex justify-center items-center gap-2"
//                                 >
//                                     View Details <ArrowRight size={16} />
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // ---------- STAT CARD COMPONENT ----------
// const Card = ({ title, value, from, to }) => (
//     <div className={`bg-gradient-to-br ${from} ${to} rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.03] transition-all`}>
//         <h3 className="text-white/80 font-medium mb-1">{title}</h3>
//         <div className="text-4xl font-bold">{value}</div>
//     </div>
// );

// export default Dashboard;








// import axios from 'axios';
// import { MapPin, Phone, Search, Trash2, Users } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//     const [patients, setPatients] = useState([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     const [activeToday, setActiveToday] = useState(0);
//     const [criticalCases, setCriticalCases] = useState(0);

//     const fetchPatients = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/patients');
//             setPatients(res.data);

//             const today = new Date().toDateString();
//             setActiveToday(
//                 res.data.filter(p => new Date(p.createdAt).toDateString() === today).length
//             );

//             setCriticalCases(
//                 res.data.filter(p => p.isCritical === true).length
//             );
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPatients();
//     }, []);

//     const deletePatient = async (id) => {
//         if (!window.confirm("Are you sure?")) return;
//         await axios.delete(`http://localhost:5000/api/patients/${id}`);
//         fetchPatients();
//     };

//     const filtered = patients.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="space-y-8">


//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4
//                 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">

//                 {/* Title */}
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                     Patient Directory
//                 </h3>

//                 {/* Search */}
//                 <div className="relative w-full sm:w-72">
//                     <Search
//                         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                         size={18}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Search patients"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 text-sm
//                  bg-white border border-gray-300 rounded-lg
//                  focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20
//                  outline-none transition"
//                     />
//                 </div>

//             </div>


//             {/* ---------- STAT CARDS ---------- */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 <StatCard title="Total Patients" value={patients.length} />
//                 <StatCard title="Active Today" value={activeToday} />
//                 <StatCard title="Critical Cases" value={criticalCases} />
//             </div>

//             {/* ---------- HEADER ---------- */}
//             {/* <div className="flex flex-col sm:flex-row justify-between gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">

//                 <h3 className="text-xl font-bold text-gray-800">
//                     Patient Directory
//                 </h3>

            
//                 <div className="relative w-full sm:w-64">
//                     <Search
//                         className="absolute left-3 top-3 text-gray-400"
//                         size={18}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
//                        focus:ring-2 ring-indigo-500 outline-none w-full transition-all"
//                     />
//                 </div>

//             </div> */}


//             {/* ✅ CAMP CARD (IMAGE STYLE) */}
//             {/* <Link to="/camp" className="block max-w-sm">
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
//                     <h2 className="text-lg font-bold text-gray-900">Camp-1</h2>

//                     <div className="flex items-center gap-2 text-gray-600 mt-2">
//                         <MapPin size={16} className="text-red-500" />
//                         <span>Madhapur</span>
//                     </div>

                    

//                     <div className="flex items-center gap-2 text-gray-700 mt-3 font-medium">
//                         <Users size={18} />
//                         <span>Participants: {patients.length}</span>
//                     </div>
//                 </div>
//             </Link> */}
//             <div className="flex flex-wrap gap-5">
//                 <Link to="/camp" className="w-full sm:w-[260px]">
//                     <div className="bg-white rounded-xl p-4 border border-[#007A52]/30
//                   shadow-sm hover:shadow-md
//                   hover:border-[#007A52]
//                   transition-all duration-200 cursor-pointer">

//                         {/* Camp Title */}
//                         <h2 className="text-sm font-semibold text-[#2563EB]">
//                             Camp – 1
//                         </h2>

//                         {/* Location */}
//                         <div className="flex items-center gap-2 mt-2 text-sm text-[#007A52]">
//                             <MapPin size={14} />
//                             <span>Madhapur</span>
//                         </div>

//                         {/* Divider */}
//                         <div className="border-t border-[#007A52]/20 my-3"></div>

//                         {/* Participants */}
//                         <div className="flex items-center gap-2 text-sm font-medium text-[#2563EB]">
//                             <Users size={16} />
//                             <span>Participants: {patients.length}</span>
//                         </div>

//                     </div>
//                 </Link>

//                 <Link to="/camp" className="w-full sm:w-[260px]">
//                     <div className="bg-white rounded-xl p-4 border border-[#007A52]/30
//                   shadow-sm hover:shadow-md
//                   hover:border-[#007A52]
//                   transition-all duration-200 cursor-pointer">

//                         {/* Camp Title */}
//                         <h2 className="text-sm font-semibold text-[#2563EB]">
//                             Camp – 1
//                         </h2>

//                         {/* Location */}
//                         <div className="flex items-center gap-2 mt-2 text-sm text-[#007A52]">
//                             <MapPin size={14} />
//                             <span>Madhapur</span>
//                         </div>

//                         {/* Divider */}
//                         <div className="border-t border-[#007A52]/20 my-3"></div>

//                         {/* Participants */}
//                         <div className="flex items-center gap-2 text-sm font-medium text-[#2563EB]">
//                             <Users size={16} />
//                             <span>Participants: {patients.length}</span>
//                         </div>

//                     </div>
//                 </Link>
//             </div>









//             {/* ---------- SEARCH ---------- */}
//             <div className="relative w-full sm:w-64">
//                 <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//                 <input
//                     type="text"
//                     placeholder="Search patients..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full"
//                 />
//             </div>

//             {/* ---------- PATIENT CARDS ---------- */}
//             {loading ? (
//                 <div className="text-center text-gray-500">Loading...</div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="bg-white rounded-2xl shadow border p-6">
//                             <div className="flex justify-between mb-4">
//                                 <h4 className="font-bold">{patient.name}</h4>
//                                 <Trash2
//                                     size={18}
//                                     onClick={() => deletePatient(patient._id)}
//                                     className="cursor-pointer text-red-400"
//                                 />
//                             </div>

//                             <p className="text-sm text-gray-600 flex items-center gap-2">
//                                 <Phone size={14} /> {patient.contact}
//                             </p>

//                             <Link
//                                 to={`/patient/${patient._id}`}
//                                 className="block mt-4 text-center bg-[#007A52] text-white py-2 rounded-xl"
//                             >
//                                 View Details
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// const StatCard = ({ title, value }) => (
//     <div className="bg-[#2563EB] text-white rounded-2xl p-6 shadow">
//         <h4 className="text-sm">{title}</h4>
//         <p className="text-3xl font-bold">{value}</p>
//     </div>
// );

// export default Dashboard;







import axios from "axios";
import {
  Activity,
  Calendar,
  ChevronRight,
  Eye,
  FileText,
  Filter,
  MapPin,
  MessageCircle,
  Search,
  Share2,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateMedicalReport, generateMedicalReportFile } from "../utils/pdfGenerator";

const API_BASE = "http://localhost:5000/api";

/* ================= UTILS ================= */

const calculateBMI = (weight, heightCm) => {
  if (!weight || !heightCm) return null;
  const h = heightCm / 100;
  return +(weight / (h * h)).toFixed(1);
};

const getBMICategory = (bmi) => {
  if (!bmi) return "-";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

const extractLatestVitals = (tests = []) => {
  const r = {};
  if (!tests) return r;

  tests.forEach(t => {
    r.date = t.date;
    if (t.type === "weight") r.weight = t.value;
    if (t.type === "height") r.height = t.value;
    if (t.type === "sugar") r.sugar = t.value;
    if (t.type === "bp") {
      r.systolic = t.value;
      r.diastolic = t.value2;
    }
  });
  return r;
};

/* ================= COMPONENTS ================= */

const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default function Dashboard () {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCampId, setSelectedCampId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentWhatsAppUrl, setCurrentWhatsAppUrl] = useState("");

  /* -------- FETCH DATA -------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [campsRes, patientsRes] = await Promise.all([
          axios.get(`${API_BASE}/camps/allcamps`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/patients`).catch(() => ({ data: [] }))
        ]);

        setCamps(campsRes.data || []);
        setPatients(patientsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* -------- DERIVED DATA -------- */
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      // 1. Filter by Camp
      if (selectedCampId !== "all") {
        if (p.campId?._id !== selectedCampId) return false;
      }

      // 2. Filter by Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesPhone = p.contact?.includes(q);
        const matchesCamp = p.campId?.name?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesCamp) return false;
      }

      return true;
    });
  }, [patients, selectedCampId, searchQuery]);

  const totalCamps = camps.length;
  const totalPatients = patients.length;
  const recentPatients = patients.filter(p => {
    const d = new Date(p.createdAt);
    const now = new Date();
    return (now - d) < (7 * 24 * 60 * 60 * 1000); // Last 7 days
  }).length;

  const campsWithCount = useMemo(() => {
    return camps.map(c => {
      const count = patients.filter(p => p.campId?._id === c._id).length;
      return { ...c, count };
    });
  }, [camps, patients]);

  /* -------- HELPER: PREPARE REPORT DATA -------- */
  const prepareReportData = async (patientId) => {
    try {
      const res = await axios.get(`${API_BASE}/patients/${patientId}`);
      const fullPatient = res.data;

      if (!fullPatient?.tests?.length) {
        alert("No test data available for this patient.");
        return null;
      }

      const test = extractLatestVitals(fullPatient.tests);
      const bmiValue = calculateBMI(test.weight, test.height);

      const patientData = {
        name: fullPatient.name,
        age: fullPatient.age,
        gender: fullPatient.gender,
        id: fullPatient._id.slice(-6).toUpperCase(),
        date: new Date(test.date || Date.now()).toLocaleDateString(),
        phone: fullPatient.contact,
        address: fullPatient.address,
      };

      const testsData = {
        weight: test.weight,
        height: test.height,
        sugar: test.sugar,
        sugarType: test.sugarType || "Random",
        systolic: test.systolic,
        diastolic: test.diastolic,
        heartRate: "-",
      };

      const bmiData = {
        bmi: bmiValue,
        category: getBMICategory(bmiValue),
      };

      return { patientData, testsData, bmiData };

    } catch (err) {
      console.error(err);
      alert("Failed to fetch report data.");
      return null;
    }
  };


  /* -------- HANDLERS -------- */
  const downloadPDF = async (patient) => {
    const data = await prepareReportData(patient._id);
    if (!data) return;
    generateMedicalReport(data.patientData, data.testsData, data.bmiData);
  };

  const viewReport = async (patient) => {
    const data = await prepareReportData(patient._id);
    if (!data) return;
    navigate('/health-report', {
      state: {
        patient: data.patientData,
        tests: data.testsData
      }
    });
  };

  const shareReport = async (patient) => {
    try {
      // 1. Tell backend to generate and save a permanent PDF link
      const res = await axios.post(`${API_BASE}/reports/generate-save/${patient._id}`);
      const relativePath = res.data.url; // e.g. /uploads/reports/filename.pdf

      // 2. Construct the full public link using current hostname
      const backendPort = "5000";
      const hostname = window.location.hostname;
      const pdfLink = `http://${hostname}:${backendPort}${relativePath}`;

      const message = `*Health Checkup Report* 🏥\n\nHello ${patient.name},\nYour medical health report is ready.\n\n📄 *Click to view/download PDF:* ${pdfLink}\n\n(Generated by Timely Health)`;

      const phone = patient.contact ? patient.contact.replace(/\D/g, '') : '';
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      // 3. Keep local features (download/share sheet)
      const data = await prepareReportData(patient._id);
      if (data) {
        generateMedicalReport(data.patientData, data.testsData, data.bmiData);
        const file = generateMedicalReportFile(data.patientData, data.testsData, data.bmiData);
        if (navigator.canShare && navigator.canShare({ files: [file] }) && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
          try {
            await navigator.share({ files: [file], title: 'Medical Health Report', text: message });
            return;
          } catch (err) {
            if (err.name !== 'AbortError') console.error("Share failed", err);
          }
        }
      }

      setCurrentWhatsAppUrl(whatsappUrl);
      setShowShareModal(true);

    } catch (err) {
      console.error("Failed to generate share link", err);
      alert("Failed to generate sharing link. Please try standard download instead.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 space-y-8 animate-fade-in">

      {/* HEADER Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Camp Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage health camps, participants, and reports.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <Calendar size={18} className="text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* STATS Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Camps"
          value={totalCamps}
          icon={MapPin}
          colorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
        />
        <StatsCard
          title="Total Patients"
          value={totalPatients}
          icon={Users}
          colorClass="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Recent Additions"
          value={recentPatients}
          icon={Activity}
          colorClass="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

       
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Camps</h3>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {camps.length} Active
            </span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* 'ALL' Card */}
            <div
              onClick={() => setSelectedCampId("all")}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 group ${selectedCampId === "all"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-[1.02]"
                : "bg-white hover:border-indigo-300 hover:shadow-md text-gray-600"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">All Camps</span>
                {selectedCampId === "all" && <ChevronRight size={20} />}
              </div>
              <p className={`text-sm mt-1 ${selectedCampId === "all" ? "text-indigo-100" : "text-gray-500"}`}>
                View all participants
              </p>
            </div>

            {/* Camp Cards */}
            {campsWithCount.map(camp => (
              <div
                key={camp._id}
                onClick={() => setSelectedCampId(camp._id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 group ${selectedCampId === camp._id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-[1.02]"
                  : "bg-white hover:border-indigo-300 hover:shadow-md"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-bold ${selectedCampId === camp._id ? "text-white" : "text-gray-800"}`}>
                      {camp.name}
                    </h4>
                    <div className={`mt-2 flex items-center gap-2 text-sm ${selectedCampId === camp._id ? "text-indigo-100" : "text-gray-500"}`}>
                      <MapPin size={14} />
                      <span className="truncate max-w-[150px]">{camp.location}</span>
                    </div>
                    <div className={`mt-1 flex items-center gap-2 text-sm ${selectedCampId === camp._id ? "text-indigo-100" : "text-gray-500"}`}>
                      <Calendar size={14} />
                      <span>{camp.date || "No date"}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${selectedCampId === camp._id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                    {camp.count}
                  </span>
                </div>
              </div>
            ))}
            {camps.length === 0 && !loading && (
              <div className="text-center p-6 bg-white rounded-2xl border border-dashed">
                <p className="text-gray-500 text-sm">No camps found.</p>
              </div>
            )}
          </div>
        </div>

    
        <div className="lg:col-span-3 space-y-6">

          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, phone or camp..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Filter size={16} />
              <span>Showing {filteredPatients.length} participants</span>
            </div>
          </div>

          {/* Table Container -- UPDATED COLUMNS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reports</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading participants...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient._id} className="group hover:bg-gray-50/80 transition-colors">
                        {/* NAME Column */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                              {patient.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{patient.name}</p>
                              <p className="text-xs text-gray-500">{patient.age} Y • {patient.gender}</p>
                            </div>
                          </div>
                        </td>

                        {/* PHONE Column */}
                        <td className="p-4">
                          <span className="text-sm text-gray-700 font-medium">
                            {patient.contact || "N/A"}
                          </span>
                        </td>

                        {/* REPORTS Column (View, Download, Share) */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">

                            {/* VIEW Button */}
                            <button
                              onClick={() => viewReport(patient)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                            >
                              <Eye size={14} />
                              View
                            </button>

                            {/* DOWNLOAD Button */}
                            <button
                              onClick={() => downloadPDF(patient)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              <FileText size={14} />
                              Download
                            </button>

                            {/* WHATSAPP/SHARE Button */}
                            <button
                              onClick={() => shareReport(patient)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                            >
                              <MessageCircle size={14} />
                              WhatsApp
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400 gap-3">
                          <Users size={48} className="opacity-20" />
                          <p className="text-lg font-medium">No participants found</p>
                          <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- SHARE GUIDANCE MODAL --- */}
          {showShareModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in">
                <div className="bg-green-600 p-6 text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Report Ready!</h3>
                </div>
                <div className="p-8 space-y-4">
                  <p className="text-gray-600 text-center leading-relaxed">
                    The PDF report has been <strong>downloaded</strong> to your computer.
                  </p>
                  <div className="bg-green-50 p-4 rounded-2xl border-2 border-dashed border-green-200">
                    <p className="text-sm text-green-800 font-bold text-center">
                      ⚠️ DESKTOP STEPS:
                      <span className="block font-medium mt-2">1. The PDF is now in your <b>Downloads</b>.</span>
                      <span className="block font-medium mt-1">2. Click "Open WhatsApp Chat" below.</span>
                      <span className="block font-medium mt-1">3. <b>Drag the PDF</b> into the chat!</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      window.open(currentWhatsAppUrl, "_blank");
                      setShowShareModal(false);
                    }}
                    className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                  >
                    Open WhatsApp Chat
                  </button>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-full py-2 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}




