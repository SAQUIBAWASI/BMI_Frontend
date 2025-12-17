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

import axios from 'axios';
import { MapPin, Phone, Search, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [activeToday, setActiveToday] = useState(0);
    const [criticalCases, setCriticalCases] = useState(0);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
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

    useEffect(() => {
        fetchPatients();
    }, []);

    const deletePatient = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`http://localhost:5000/api/patients/${id}`);
        fetchPatients();
    };

    const filtered = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">

            {/* ---------- STAT CARDS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <StatCard title="Total Patients" value={patients.length} />
                <StatCard title="Active Today" value={activeToday} />
                <StatCard title="Critical Cases" value={criticalCases} />
            </div>

            {/* ---------- HEADER ---------- */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">

                <h3 className="text-xl font-bold text-gray-800">
                    Patient Directory
                </h3>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:ring-2 ring-indigo-500 outline-none w-full transition-all"
                    />
                </div>

            </div>


            {/* ✅ CAMP CARD (IMAGE STYLE) */}
            <Link to="/camp" className="block max-w-sm">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
                    <h2 className="text-lg font-bold text-gray-900">Camp-1</h2>

                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin size={16} className="text-red-500" />
                        <span>Madhapur</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 mt-3 font-medium">
                        <Users size={18} />
                        <span>Participants: {patients.length}</span>
                    </div>
                </div>
            </Link>

            {/* ---------- SEARCH ---------- */}
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full"
                />
            </div>

            {/* ---------- PATIENT CARDS ---------- */}
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(patient => (
                        <div key={patient._id} className="bg-white rounded-2xl shadow border p-6">
                            <div className="flex justify-between mb-4">
                                <h4 className="font-bold">{patient.name}</h4>
                                <Trash2
                                    size={18}
                                    onClick={() => deletePatient(patient._id)}
                                    className="cursor-pointer text-red-400"
                                />
                            </div>

                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Phone size={14} /> {patient.contact}
                            </p>

                            <Link
                                to={`/patient/${patient._id}`}
                                className="block mt-4 text-center bg-black text-white py-2 rounded-xl"
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
    <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow">
        <h4 className="text-sm">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default Dashboard;


