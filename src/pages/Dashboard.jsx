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
//             const res = await axios.get('https://bim-backend-4i12.onrender.com/api/patients');
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
//             await axios.delete(`https://bim-backend-4i12.onrender.com/api/patients/${id}`);
//             fetchPatients();
//         } catch (err) {
//             alert('Error deleting');
//         }
//     };

//     const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

//     return (
//         <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                 <div className="p-6 text-white transition-all transform shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:scale-105">
//                     <h3 className="mb-1 font-medium text-blue-100">Total Patients</h3>
//                     <div className="text-4xl font-bold">{patients.length}</div>
//                 </div>
//                 <div className="p-6 text-white transition-all transform shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl hover:scale-105">
//                     <h3 className="mb-1 font-medium text-purple-100">Active Today</h3>
//                     <div className="text-4xl font-bold">--</div>
//                 </div>
//                 <div className="p-6 text-white transition-all transform shadow-xl bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl hover:scale-105">
//                     <h3 className="mb-1 font-medium text-pink-100">Critical Cases</h3>
//                     <div className="text-4xl font-bold">--</div>
//                 </div>
//             </div>

//             {/* List Header */}
//             <div className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
//                 <h3 className="text-xl font-bold text-gray-800">Patient Directory</h3>
//                 <div className="relative">
//                     <Search className="absolute text-gray-400 left-3 top-3" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-64 py-2 pl-10 pr-4 transition-all border-none rounded-lg outline-none bg-gray-50 focus:ring-2 ring-indigo-500"
//                     />
//                 </div>
//             </div>

//             {/* List Grid */}
//             {loading ? (
//                 <div className="py-10 text-center text-gray-500">Loading directory...</div>
//             ) : (
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl group">
//                             <div className="p-6">
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div>
//                                         <h4 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-indigo-600">{patient.name}</h4>
//                                         <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
//                                             <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-semibold">{patient.gender}</span>
//                                             <span>•</span>
//                                             <span>{patient.age} Yrs</span>
//                                         </div>
//                                     </div>
//                                     <button onClick={() => deletePatient(patient._id)} className="p-2 text-gray-300 transition-colors rounded-full hover:text-red-500 hover:bg-red-50">
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </div>

//                                 <div className="mb-6 space-y-2">
//                                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                                         <Phone size={14} className="text-indigo-400" /> {patient.contact}
//                                     </div>
//                                     <div className="flex items-center justify-between p-2 text-sm font-medium text-indigo-700 rounded-lg bg-indigo-50">
//                                         <span>Total Records</span>
//                                         <span className="bg-white px-2 py-0.5 rounded shadow-sm">{patient.testCount}</span>
//                                     </div>
//                                 </div>

//                                 <Link to={`/patient/${patient._id}`} className="flex items-center justify-center block w-full gap-2 py-3 font-medium text-center text-white transition-colors bg-gray-900 rounded-xl hover:bg-indigo-600">
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
//             const res = await axios.get('https://bim-backend-4i12.onrender.com/api/patients');

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
//             await axios.delete(`https://bim-backend-4i12.onrender.com/api/patients/${id}`);
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
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
//             <div className="flex flex-col items-center justify-between gap-3 p-4 bg-white border border-gray-100 shadow-sm sm:flex-row rounded-xl">
//                 <h3 className="text-xl font-bold text-gray-800">Patient Directory</h3>

//                 <div className="relative w-full sm:w-64">
//                     <Search className="absolute text-gray-400 left-3 top-3" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full py-2 pl-10 pr-4 transition-all border-none rounded-lg outline-none bg-gray-50 focus:ring-2 ring-indigo-500"
//                     />
//                 </div>
//             </div>

//             {/* ---------- PATIENT CARDS ---------- */}
//             {loading ? (
//                 <div className="py-10 text-center text-gray-500">Loading directory...</div>
//             ) : (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl group">

//                             <div className="p-6">

//                                 <div className="flex items-start justify-between mb-4">
//                                     <div>
//                                         <h4 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-indigo-600">
//                                             {patient.name}
//                                         </h4>

//                                         <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
//                                             <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-semibold">
//                                                 {patient.gender}
//                                             </span>

//                                             <span>{patient.age} Yrs</span>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={() => deletePatient(patient._id)}
//                                         className="p-2 text-gray-300 transition-colors rounded-full hover:text-red-500 hover:bg-red-50"
//                                     >
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </div>

//                                 <div className="mb-6 space-y-2">
//                                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                                         <Phone size={14} className="text-indigo-400" /> {patient.contact}
//                                     </div>

//                                     <div className="flex items-center justify-between p-2 text-sm font-medium text-indigo-700 rounded-lg bg-indigo-50">
//                                         <span>Total Records</span>
//                                         <span className="bg-white px-2 py-0.5 rounded shadow-sm">{patient.testCount}</span>
//                                     </div>
//                                 </div>

//                                 <Link
//                                     to={`/patient/${patient._id}`}
//                                     className="flex items-center justify-center block w-full gap-2 py-3 font-medium text-center text-white transition-colors bg-gray-900 rounded-xl hover:bg-indigo-600"
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
//         <h3 className="mb-1 font-medium text-white/80">{title}</h3>
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
//             const res = await axios.get('https://bim-backend-4i12.onrender.com/api/patients');
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
//         await axios.delete(`https://bim-backend-4i12.onrender.com/api/patients/${id}`);
//         fetchPatients();
//     };

//     const filtered = patients.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="space-y-8">


//             <div className="flex flex-col items-center justify-between gap-4 p-4 bg-white border border-gray-200 shadow-sm sm:flex-row // rounded-xl">

//                 {/* Title */}
//                 <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
//                     Patient Directory
//                 </h3>

//                 {/* Search */}
//                 <div className="relative w-full sm:w-72">
//                     <Search
//                         className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
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
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 <StatCard title="Total Patients" value={patients.length} />
//                 <StatCard title="Active Today" value={activeToday} />
//                 <StatCard title="Critical Cases" value={criticalCases} />
//             </div>

//             {/* ---------- HEADER ---------- */}
//             {/* <div className="flex flex-col items-center justify-between gap-3 p-4 bg-white border border-gray-100 shadow-sm sm:flex-row rounded-xl">

//                 <h3 className="text-xl font-bold text-gray-800">
//                     Patient Directory
//                 </h3>

            
//                 <div className="relative w-full sm:w-64">
//                     <Search
//                         className="absolute text-gray-400 left-3 top-3"
//                         size={18}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 // focus:ring-2 ring-indigo-500"
//                     />
//                 </div>

//             </div> */}


//             {/* ✅ CAMP CARD (IMAGE STYLE) */}
//             {/* <Link to="/camp" className="block max-w-sm">
//                 <div className="p-6 transition bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl">
//                     <h2 className="text-lg font-bold text-gray-900">Camp-1</h2>

//                     <div className="flex items-center gap-2 mt-2 text-gray-600">
//                         <MapPin size={16} className="text-red-500" />
//                         <span>Madhapur</span>
//                     </div>

                    

//                     <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
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
//                 <Search className="absolute text-gray-400 left-3 top-3" size={18} />
//                 <input
//                     type="text"
//                     placeholder="Search patients..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-50"
//                 />
//             </div>

//             {/* ---------- PATIENT CARDS ---------- */}
//             {loading ? (
//                 <div className="text-center text-gray-500">Loading...</div>
//             ) : (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {filtered.map(patient => (
//                         <div key={patient._id} className="p-6 bg-white border shadow rounded-2xl">
//                             <div className="flex justify-between mb-4">
//                                 <h4 className="font-bold">{patient.name}</h4>
//                                 <Trash2
//                                     size={18}
//                                     onClick={() => deletePatient(patient._id)}
//                                     className="text-red-400 cursor-pointer"
//                                 />
//                             </div>

//                             <p className="flex items-center gap-2 text-sm text-gray-600">
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


import axios from 'axios';
import { MapPin, Phone, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    
    // ⬇️ ADD HERE
const [camps, setCamps] = useState([]);
const [selectedCampId, setSelectedCampId] = useState("all");

    const [activeToday, setActiveToday] = useState(0);
    const [criticalCases, setCriticalCases] = useState(0);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('https://bim-backend-4i12.onrender.com/api/patients');
            setPatients(res.data);

            const today = new Date().toDateString();
            setActiveToday(
                res.data.filter(p => new Date(p.createdAt).toDateString() === today).length
            );

            setCriticalCases(
                res.data.filter(p => p.isCritical === true).length
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCamps = async () => {
  try {
    const res = await axios.get(
      "https://bim-backend-4i12.onrender.com/api/camps/allcamps"
    );
    setCamps(res.data || []);
  } catch (err) {
    console.error(err);
  }
};


   useEffect(() => {
  fetchPatients();
  fetchCamps();
}, []);


    const deletePatient = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`https://bim-backend-4i12.onrender.com/api/patients/${id}`);
        fetchPatients();
    };

    const filtered = patients.filter(p => {
    const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCamp =
  selectedCampId === "all"
    ? true
    : p.campId?._id === selectedCampId;


    return matchSearch && matchCamp;
});


    return (
        <div className="space-y-8">


            <div className="flex flex-col items-center justify-between gap-2 p-2 bg-white border border-gray-200 shadow-sm sm:flex-row rounded-xl">

  {/* LEFT : Title */}
  <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
    Patient Directory
  </h3>

  {/* RIGHT : Search + All Camps */}
  <div className="flex items-center w-full gap-4 sm:w-auto">

    {/* Search */}
    <div className="relative w-full sm:w-72">
      <Search
        className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
        size={18}
      />
      <input
        type="text"
        placeholder="Search patients"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm
          bg-white border border-gray-300 rounded-lg
          focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20
          outline-none transition"
      />
    </div>

    {/* ALL CAMPS CARD */}
    <div
      onClick={() => setSelectedCampId("all")}
      className={`cursor-pointer min-w-[140px] rounded-lg px-4 py-2 border text-center
        ${selectedCampId === "all"
          ? "bg-[#2563EB] text-white"
          : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
    >
      <h2 className="text-sm font-semibold">All Camps</h2>
      {/* <p className="text-xs opacity-80">All Patients</p> */}
    </div>

  </div>
</div>



            {/* ---------- STAT CARDS ---------- */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
{/* <StatCard title="Total Patients" value={patients.length} />
<StatCard title="Active Today" value={activeToday} />
<StatCard title="Critical Cases" value={criticalCases} /> */}

                
                <StatCard title="Total Camps" value={camps.length} />
                <StatCard title="Total Patients" value={patients.length} />
                <StatCard title="Critical Cases" value={criticalCases} />

            </div>

            {/* ---------- HEADER ---------- */}
            {/* <div className="flex flex-col items-center justify-between gap-3 p-4 bg-white border border-gray-100 shadow-sm sm:flex-row rounded-xl">

                <h3 className="text-xl font-bold text-gray-800">
                    Patient Directory
                </h3>

            
                <div className="relative w-full sm:w-64">
                    <Search
                        className="absolute text-gray-400 left-3 top-3"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 ring-indigo-500"
                    />
                </div>

            </div> */}


            {/* ✅ CAMP CARD (IMAGE STYLE) */}
            {/* <Link to="/camp" className="block max-w-sm">
                <div className="p-6 transition bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl">
                    <h2 className="text-lg font-bold text-gray-900">Camp-1</h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <MapPin size={16} className="text-red-500" />
                        <span>Madhapur</span>
                    </div>

                    

                    <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
                        <Users size={18} />
                        <span>Participants: {patients.length}</span>
                    </div>
                </div>
            </Link> */}
            <div className="flex flex-wrap gap-5">
  {/* ALL CAMPS */}
  {/* <div
    onClick={() => setSelectedCampId("all")}
    className={`cursor-pointer w-[260px] rounded-xl p-4 border
      ${selectedCampId === "all"
        ? "bg-[#2563EB] text-white"
        : "bg-white"
      }`}
  >
    <h2 className="text-sm font-semibold">All Camps</h2>
    <p className="mt-2 text-sm">All Patients</p>
  </div> */}

  {/* INDIVIDUAL CAMPS */}
  {/* INDIVIDUAL CAMPS */}
{camps.map(camp => (
  <div
    key={camp._id}
    onClick={() => setSelectedCampId(camp._id)}
    className={`cursor-pointer w-[260px] rounded-xl p-4 border
      ${selectedCampId === camp._id
        ? "bg-[#2563EB] text-white"
        : "bg-white"
      }`}
  >
    <h2 className="text-sm font-semibold">{camp.name}</h2>

    <div className="flex items-center gap-2 mt-2 text-sm">
      <MapPin size={14} />
      <span>{camp.location}</span>
    </div>

    <div className="mt-3 text-sm font-medium">
      Patients: {
  patients.filter(p => p.campId?._id === camp._id).length
}

    </div>
  </div>
))}
</div>

            {/* ---------- PATIENT CARDS ---------- */}
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map(patient => (
                        <div key={patient._id} className="p-6 bg-white border shadow rounded-2xl">
                            <div className="flex justify-between mb-4">
    <div>
        <h4 className="font-bold">{patient.name}</h4>

        <p className="text-xs text-gray-500">
  Camp: {patient.campId?.name || "N/A"}

</p>

    </div>

    <Trash2
        size={18}
        onClick={() => deletePatient(patient._id)}
        className="text-red-400 cursor-pointer"
    />
</div>


                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={14} /> {patient.contact}
                            </p>

                            <Link
                                to={`/patient/${patient._id}`}
                                className="block mt-4 text-center bg-[#007A52] text-white py-2 rounded-xl"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-[#2563EB] text-white rounded-2xl p-6 shadow">
        <h4 className="text-sm">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default Dashboard;







// import axios from "axios";
// import {
//     Activity,
//     Calendar,
//     ChevronRight,
//     Eye,
//     FileText,
//     Filter,
//     MapPin,
//     MessageCircle,
//     Search,
//     Users
// } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateMedicalReport, generateMedicalReportFile } from "../utils/pdfGenerator";

// const API_BASE = "https://bim-backend-4i12.onrender.com/api";

// /* ================= UTILS ================= */

// const calculateBMI = (weight, heightCm) => {
//   if (!weight || !heightCm) return null;
//   const h = heightCm / 100;
//   return +(weight / (h * h)).toFixed(1);
// };

// const getBMICategory = (bmi) => {
//   if (!bmi) return "-";
//   if (bmi < 18.5) return "Underweight";
//   if (bmi < 25) return "Healthy";
//   if (bmi < 30) return "Overweight";
//   return "Obese";
// };

// const extractLatestVitals = (tests = []) => {
//   const r = {};
//   if (!tests) return r;

//   tests.forEach(t => {
//     r.date = t.date;
//     if (t.type === "weight") r.weight = t.value;
//     if (t.type === "height") r.height = t.value;
//     if (t.type === "sugar") r.sugar = t.value;
//     if (t.type === "bp") {
//       r.systolic = t.value;
//       r.diastolic = t.value2;
//     }
//   });
//   return r;
// };

// /* ================= COMPONENTS ================= */

// const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
//     <div className={`p-4 rounded-xl ${colorClass}`}>
//       <Icon size={24} className="text-white" />
//     </div>
//     <div>
//       <p className="text-sm font-medium text-gray-500">{title}</p>
//       <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
//     </div>
//   </div>
// );

// export default function Dashboard () {
//   const navigate = useNavigate();
//   const [camps, setCamps] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [selectedCampId, setSelectedCampId] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [currentWhatsAppUrl, setCurrentWhatsAppUrl] = useState("");

//   /* -------- FETCH DATA -------- */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [campsRes, patientsRes] = await Promise.all([
//           axios.get(`${API_BASE}/camps/allcamps`).catch(() => ({ data: [] })),
//           axios.get(`${API_BASE}/patients`).catch(() => ({ data: [] }))
//         ]);

//         setCamps(campsRes.data || []);
//         setPatients(patientsRes.data || []);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   /* -------- DERIVED DATA -------- */
//   const filteredPatients = useMemo(() => {
//     return patients.filter(p => {
//       // 1. Filter by Camp
//       if (selectedCampId !== "all") {
//         if (p.campId?._id !== selectedCampId) return false;
//       }

//       // 2. Filter by Search
//       if (searchQuery) {
//         const q = searchQuery.toLowerCase();
//         const matchesName = p.name?.toLowerCase().includes(q);
//         const matchesPhone = p.contact?.includes(q);
//         const matchesCamp = p.campId?.name?.toLowerCase().includes(q);
//         if (!matchesName && !matchesPhone && !matchesCamp) return false;
//       }

//       return true;
//     });
//   }, [patients, selectedCampId, searchQuery]);

//   const totalCamps = camps.length;
//   const totalPatients = patients.length;
//   const recentPatients = patients.filter(p => {
//     const d = new Date(p.createdAt);
//     const now = new Date();
//     return (now - d) < (7 * 24 * 60 * 60 * 1000); // Last 7 days
//   }).length;

//   const campsWithCount = useMemo(() => {
//     return camps.map(c => {
//       const count = patients.filter(p => p.campId?._id === c._id).length;
//       return { ...c, count };
//     });
//   }, [camps, patients]);

//   /* -------- HELPER: PREPARE REPORT DATA -------- */
//   const prepareReportData = async (patientId) => {
//     try {
//       const res = await axios.get(`${API_BASE}/patients/${patientId}`);
//       const fullPatient = res.data;

//       if (!fullPatient?.tests?.length) {
//         alert("No test data available for this patient.");
//         return null;
//       }

//       const test = extractLatestVitals(fullPatient.tests);
//       const bmiValue = calculateBMI(test.weight, test.height);

//       const patientData = {
//         name: fullPatient.name,
//         age: fullPatient.age,
//         gender: fullPatient.gender,
//         id: fullPatient._id.slice(-6).toUpperCase(),
//         date: new Date(test.date || Date.now()).toLocaleDateString(),
//         phone: fullPatient.contact,
//         address: fullPatient.address,
//       };

//       const testsData = {
//         weight: test.weight,
//         height: test.height,
//         sugar: test.sugar,
//         sugarType: test.sugarType || "Random",
//         systolic: test.systolic,
//         diastolic: test.diastolic,
//         heartRate: "-",
//       };

//       const bmiData = {
//         bmi: bmiValue,
//         category: getBMICategory(bmiValue),
//       };

//       return { patientData, testsData, bmiData };

//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch report data.");
//       return null;
//     }
//   };


//   /* -------- HANDLERS -------- */
//   const downloadPDF = async (patient) => {
//     const data = await prepareReportData(patient._id);
//     if (!data) return;
//     generateMedicalReport(data.patientData, data.testsData, data.bmiData);
//   };

//   const viewReport = async (patient) => {
//     const data = await prepareReportData(patient._id);
//     if (!data) return;
//     navigate('/health-report', {
//       state: {
//         patient: data.patientData,
//         tests: data.testsData
//       }
//     });
//   };

//   const shareReport = async (patient) => {
//     try {
//       // 1. Tell backend to generate and save a permanent PDF link
//       const res = await axios.post(`${API_BASE}/reports/generate-save/${patient._id}`);
//       const relativePath = res.data.url; // e.g. /uploads/reports/filename.pdf

//       // 2. Construct the full public link using current hostname
//       const backendPort = "5000";
//       const hostname = window.location.hostname;
//       const pdfLink = `http://${hostname}:${backendPort}${relativePath}`;

//       const message = `*Health Checkup Report* 🏥\n\nHello ${patient.name},\nYour medical health report is ready.\n\n📄 *Click to view/download PDF:* ${pdfLink}\n\n(Generated by Timely Health)`;

//       const phone = patient.contact ? patient.contact.replace(/\D/g, '') : '';
//       const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

//       // 3. Keep local features (download/share sheet)
//       const data = await prepareReportData(patient._id);
//       if (data) {
//         generateMedicalReport(data.patientData, data.testsData, data.bmiData);
//         const file = generateMedicalReportFile(data.patientData, data.testsData, data.bmiData);
//         if (navigator.canShare && navigator.canShare({ files: [file] }) && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
//           try {
//             await navigator.share({ files: [file], title: 'Medical Health Report', text: message });
//             return;
//           } catch (err) {
//             if (err.name !== 'AbortError') console.error("Share failed", err);
//           }
//         }
//       }

//       setCurrentWhatsAppUrl(whatsappUrl);
//       setShowShareModal(true);

//     } catch (err) {
//       console.error("Failed to generate share link", err);
//       alert("Failed to generate sharing link. Please try standard download instead.");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 space-y-8 bg-gray-50/50 md:p-8 animate-fade-in">

//       {/* HEADER Section */}
//       <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Camp Dashboard</h1>
//           <p className="mt-1 text-gray-500">Manage health camps, participants, and reports.</p>
//         </div>
//         <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-xl">
//           <Calendar size={18} className="text-indigo-600" />
//           <span className="text-sm font-medium text-gray-700">
//             {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
//           </span>
//         </div>
//       </div>

//       {/* STATS Section */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <StatsCard
//           title="Total Camps"
//           value={totalCamps}
//           icon={MapPin}
//           colorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
//         />
//         <StatsCard
//           title="Total Patients"
//           value={totalPatients}
//           icon={Users}
//           colorClass="bg-gradient-to-br from-blue-500 to-cyan-500"
//         />
//         <StatsCard
//           title="Recent Additions"
//           value={recentPatients}
//           icon={Activity}
//           colorClass="bg-gradient-to-br from-emerald-500 to-teal-500"
//         />
//       </div>

//       <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-4">

       
//         <div className="space-y-6 lg:col-span-1">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-bold text-gray-800">Camps</h3>
//             <span className="px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
//               {camps.length} Active
//             </span>
//           </div>

//           <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//             {/* 'ALL' Card */}
//             <div
//               onClick={() => setSelectedCampId("all")}
//               className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 group ${selectedCampId === "all"
//                 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-[1.02]"
//                 : "bg-white hover:border-indigo-300 hover:shadow-md text-gray-600"
//                 }`}
//             >
//               <div className="flex items-center justify-between">
//                 <span className="text-lg font-semibold">All Camps</span>
//                 {selectedCampId === "all" && <ChevronRight size={20} />}
//               </div>
//               <p className={`text-sm mt-1 ${selectedCampId === "all" ? "text-indigo-100" : "text-gray-500"}`}>
//                 View all participants
//               </p>
//             </div>

//             {/* Camp Cards */}
//             {campsWithCount.map(camp => (
//               <div
//                 key={camp._id}
//                 onClick={() => setSelectedCampId(camp._id)}
//                 className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 group ${selectedCampId === camp._id
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-[1.02]"
//                   : "bg-white hover:border-indigo-300 hover:shadow-md"
//                   }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h4 className={`font-bold ${selectedCampId === camp._id ? "text-white" : "text-gray-800"}`}>
//                       {camp.name}
//                     </h4>
//                     <div className={`mt-2 flex items-center gap-2 text-sm ${selectedCampId === camp._id ? "text-indigo-100" : "text-gray-500"}`}>
//                       <MapPin size={14} />
//                       <span className="truncate max-w-[150px]">{camp.location}</span>
//                     </div>
//                     <div className={`mt-1 flex items-center gap-2 text-sm ${selectedCampId === camp._id ? "text-indigo-100" : "text-gray-500"}`}>
//                       <Calendar size={14} />
//                       <span>{camp.date || "No date"}</span>
//                     </div>
//                   </div>
//                   <span className={`text-xs font-bold px-2 py-1 rounded-lg ${selectedCampId === camp._id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
//                     }`}>
//                     {camp.count}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             {camps.length === 0 && !loading && (
//               <div className="p-6 text-center bg-white border border-dashed rounded-2xl">
//                 <p className="text-sm text-gray-500">No camps found.</p>
//               </div>
//             )}
//           </div>
//         </div>

    
//         <div className="space-y-6 lg:col-span-3">

//           {/* Controls */}
//           <div className="flex flex-col items-center justify-between gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl sm:flex-row">
//             <div className="relative w-full sm:max-w-md">
//               <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search by name, phone or camp..."
//                 className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Filter size={16} />
//               <span>Showing {filteredPatients.length} participants</span>
//             </div>
//           </div>

//           {/* Table Container -- UPDATED COLUMNS */}
//           <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-100 bg-gray-50/50">
//                     <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Name</th>
//                     <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Phone</th>
//                     <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Reports</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {loading ? (
//                     <tr>
//                       <td colSpan={3} className="p-8 text-center text-gray-500">
//                         <div className="flex flex-col items-center gap-2">
//                           <div className="w-6 h-6 border-2 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
//                           <span>Loading participants...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredPatients.length > 0 ? (
//                     filteredPatients.map((patient) => (
//                       <tr key={patient._id} className="transition-colors group hover:bg-gray-50/80">
//                         {/* NAME Column */}
//                         <td className="p-4">
//                           <div className="flex items-center gap-3">
//                             <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-indigo-700 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
//                               {patient.name.charAt(0).toUpperCase()}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-gray-900">{patient.name}</p>
//                               <p className="text-xs text-gray-500">{patient.age} Y • {patient.gender}</p>
//                             </div>
//                           </div>
//                         </td>

//                         {/* PHONE Column */}
//                         <td className="p-4">
//                           <span className="text-sm font-medium text-gray-700">
//                             {patient.contact || "N/A"}
//                           </span>
//                         </td>

//                         {/* REPORTS Column (View, Download, Share) */}
//                         <td className="p-4">
//                           <div className="flex items-center gap-2">

//                             {/* VIEW Button */}
//                             <button
//                               onClick={() => viewReport(patient)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
//                             >
//                               <Eye size={14} />
//                               View
//                             </button>

//                             {/* DOWNLOAD Button */}
//                             <button
//                               onClick={() => downloadPDF(patient)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
//                             >
//                               <FileText size={14} />
//                               Download
//                             </button>

//                             {/* WHATSAPP/SHARE Button */}
//                             <button
//                               onClick={() => shareReport(patient)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
//                             >
//                               <MessageCircle size={14} />
//                               WhatsApp
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={3} className="p-12 text-center">
//                         <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
//                           <Users size={48} className="opacity-20" />
//                           <p className="text-lg font-medium">No participants found</p>
//                           <p className="text-sm">Try adjusting your search or filters.</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* --- SHARE GUIDANCE MODAL --- */}
//           {showShareModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
//               <div className="w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-3xl animate-scale-in">
//                 <div className="p-6 text-center text-white bg-green-600">
//                   <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/20">
//                     <MessageCircle size={32} />
//                   </div>
//                   <h3 className="text-xl font-bold">Report Ready!</h3>
//                 </div>
//                 <div className="p-8 space-y-4">
//                   <p className="leading-relaxed text-center text-gray-600">
//                     The PDF report has been <strong>downloaded</strong> to your computer.
//                   </p>
//                   <div className="p-4 border-2 border-green-200 border-dashed bg-green-50 rounded-2xl">
//                     <p className="text-sm font-bold text-center text-green-800">
//                       ⚠️ DESKTOP STEPS:
//                       <span className="block mt-2 font-medium">1. The PDF is now in your <b>Downloads</b>.</span>
//                       <span className="block mt-1 font-medium">2. Click "Open WhatsApp Chat" below.</span>
//                       <span className="block mt-1 font-medium">3. <b>Drag the PDF</b> into the chat!</span>
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       window.open(currentWhatsAppUrl, "_blank");
//                       setShowShareModal(false);
//                     }}
//                     className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all bg-green-600 shadow-lg rounded-2xl hover:bg-green-700 shadow-green-100"
//                   >
//                     Open WhatsApp Chat
//                   </button>
//                   <button
//                     onClick={() => setShowShareModal(false)}
//                     className="w-full py-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }




