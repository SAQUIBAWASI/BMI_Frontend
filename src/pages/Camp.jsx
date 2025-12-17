// // import { Download } from "lucide-react";
// // import { useMemo, useState } from "react";

// // // Mock API data (replace with backend later)
// // const CAMPS = [
// //   { id: 1, name: "Camp-1", address: "Delhi", date: "2025-12-01", time: "10:00 AM" },
// //   { id: 2, name: "Camp-2", address: "Noida", date: "2025-12-03", time: "11:00 AM" },
// //   { id: 3, name: "Camp-3", address: "Gurgaon", date: "2025-12-05", time: "09:30 AM" },
// //   { id: 4, name: "Camp-4", address: "Faridabad", date: "2025-12-06", time: "10:30 AM" }
// // ];

// // const PARTICIPANTS = [
// //   { id: 1, campId: 1, name: "Amit", phone: "9999999999", height: 170, weight: 70, bmi: 24.2, sugar: 110 },
// //   { id: 2, campId: 1, name: "Neha", phone: "8888888888", height: 160, weight: 60, bmi: 23.4, sugar: 105 },
// //   { id: 3, campId: 2, name: "Rahul", phone: "7777777777", height: 175, weight: 75, bmi: 24.5, sugar: 120 },
// //   { id: 4, campId: 3, name: "Sana", phone: "6666666666", height: 158, weight: 55, bmi: 22.0, sugar: 98 }
// // ];

// // export default function CampDashboard() {
// //   const [selectedCamp, setSelectedCamp] = useState("");
// //   const [selectedDate, setSelectedDate] = useState("");

// //   const filteredParticipants = useMemo(() => {
// //     return PARTICIPANTS.filter(p => {
// //       const camp = CAMPS.find(c => c.id === p.campId);
// //       if (!camp) return false;
// //       if (selectedCamp && camp.id !== Number(selectedCamp)) return false;
// //       if (selectedDate && camp.date !== selectedDate) return false;
// //       return true;
// //     });
// //   }, [selectedCamp, selectedDate]);

// //   const downloadCSV = () => {
// //     const headers = ["Name", "Phone", "Height", "Weight", "BMI", "Sugar"];
// //     const rows = filteredParticipants.map(p => [
// //       p.name,
// //       p.phone,
// //       p.height,
// //       p.weight,
// //       p.bmi,
// //       p.sugar
// //     ]);

// //     const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
// //     const blob = new Blob([csv], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "camp-participants-report.csv";
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       <h1 className="text-2xl font-bold">Camp Updates Dashboard</h1>

// //       {/* Camp Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {CAMPS.map(camp => (
// //           <div key={camp.id} className="border rounded-2xl p-4 shadow">
// //             <h2 className="font-semibold">{camp.name}</h2>
// //             <p className="text-sm">Address: {camp.address}</p>
// //             <p className="text-sm">Date: {camp.date}</p>
// //             <p className="text-sm">Time: {camp.time}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Filter Section */}
// //       <div className="flex flex-wrap gap-4 items-end border p-4 rounded-2xl">
// //         <div>
// //           <label className="text-sm">Camp</label>
// //           <select
// //             className="block border rounded p-2"
// //             value={selectedCamp}
// //             onChange={e => setSelectedCamp(e.target.value)}
// //           >
// //             <option value="">All</option>
// //             {CAMPS.map(c => (
// //               <option key={c.id} value={c.id}>{c.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="text-sm">Date</label>
// //           <input
// //             type="date"
// //             className="block border rounded p-2"
// //             value={selectedDate}
// //             onChange={e => setSelectedDate(e.target.value)}
// //           />
// //         </div>

// //         <button
// //           onClick={downloadCSV}
// //           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl"
// //         >
// //           <Download size={18} /> Download Report
// //         </button>
// //       </div>

// //       {/* Participants Table */}
// //       <div className="border rounded-2xl overflow-x-auto">
// //         <table className="w-full text-sm">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="p-2">#</th>
// //               <th className="p-2">Name</th>
// //               <th className="p-2">Phone</th>
// //               <th className="p-2">Height</th>
// //               <th className="p-2">Weight</th>
// //               <th className="p-2">BMI</th>
// //               <th className="p-2">Sugar</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredParticipants.map((p, i) => (
// //               <tr key={p.id} className="border-t">
// //                 <td className="p-2">{i + 1}</td>
// //                 <td className="p-2">{p.name}</td>
// //                 <td className="p-2">{p.phone}</td>
// //                 <td className="p-2">{p.height}</td>
// //                 <td className="p-2">{p.weight}</td>
// //                 <td className="p-2">{p.bmi}</td>
// //                 <td className="p-2">{p.sugar}</td>
// //               </tr>
// //             ))}
// //             {filteredParticipants.length === 0 && (
// //               <tr>
// //                 <td colSpan={7} className="text-center p-4">No participants found</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// import axios from "axios";
// import { FileText, Share2 } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";

// const API_BASE = "http://localhost:5000/api";

// export default function CampDashboard() {
//   const [camps, setCamps] = useState([]);
//   const [selectedCamp, setSelectedCamp] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ----------------------------------
//      FETCH CAMP DATA (REAL)
//   ---------------------------------- */
//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/patients`);
//       const patients = res.data || [];

//       const camp1 = {
//         id: 1,
//         name: "Camp-1",
//         address: patients[0]?.address || "Main Camp",
//         participants: patients
//       };

//       setCamps([camp1]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------------------------------
//      FILTER PARTICIPANTS
//   ---------------------------------- */
//   const filteredParticipants = useMemo(() => {
//     let all = [];
//     camps.forEach(camp => {
//       camp.participants.forEach(p => {
//         all.push({ ...p, campId: camp.id });
//       });
//     });

//     return all.filter(p => {
//       if (selectedCamp && p.campId !== Number(selectedCamp)) return false;
//       if (selectedDate && p.lastTest) {
//         const d = new Date(p.lastTest).toISOString().slice(0, 10);
//         if (d !== selectedDate) return false;
//       }
//       return true;
//     });
//   }, [camps, selectedCamp, selectedDate]);

//   /* ----------------------------------
//      DOWNLOAD PDF (DUMMY FOR NOW)
//   ---------------------------------- */
//   const downloadPDF = (patient) => {
//     alert(`PDF download for ${patient.name}`);
//     // later: backend pdf api call
//   };

//   /* ----------------------------------
//      SHARE REPORT
//   ---------------------------------- */
//   const shareReport = (patient) => {
//     const text = `Health Report\nName: ${patient.name}\nPhone: ${patient.contact}`;
//     if (navigator.share) {
//       navigator.share({ title: "Health Report", text });
//     } else {
//       window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
//     }
//   };

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">
//         Camp Updates Dashboard
//       </h1>

//       {/* CAMP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {camps.map(camp => (
//           <div
//             key={camp.id}
//             className="rounded-2xl p-5 shadow-lg bg-white"
//           >
//             <h2 className="font-semibold text-lg">{camp.name}</h2>
//             <p className="text-sm text-gray-600">📍 {camp.address}</p>
//             <p className="text-sm font-medium mt-2">
//               👥 Participants: {camp.participants.length}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* FILTER SECTION */}
//       <div className="flex flex-wrap gap-6 items-end bg-white shadow rounded-2xl p-6">
//         <div>
//           <label className="text-sm">Camp</label>
//           <select
//             className="block border rounded p-2"
//             value={selectedCamp}
//             onChange={e => setSelectedCamp(e.target.value)}
//           >
//             <option value="">All</option>
//             {camps.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm">Date</label>
//           <input
//             type="date"
//             className="block border rounded p-2"
//             value={selectedDate}
//             onChange={e => setSelectedDate(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* PARTICIPANTS TABLE */}
//       <div className="rounded-2xl overflow-x-auto shadow bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-indigo-50">
//             <tr>
//               <th className="p-3">S.No</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Phone</th>
//               <th className="p-3">Report</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center">Loading...</td>
//               </tr>
//             )}

//             {!loading && filteredParticipants.map((p, i) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{i + 1}</td>
//                 <td className="p-3 font-medium">{p.name}</td>
//                 <td className="p-3">{p.contact}</td>
//                 <td className="p-3">
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => downloadPDF(p)}
//                       className="flex items-center gap-1 text-indigo-600 hover:underline"
//                     >
//                       <FileText size={16} /> PDF
//                     </button>
//                     <button
//                       onClick={() => shareReport(p)}
//                       className="flex items-center gap-1 text-green-600 hover:underline"
//                     >
//                       <Share2 size={16} /> Share
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!loading && filteredParticipants.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center">
//                   No participants found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import axios from "axios";
// import { FileText, Share2 } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { generateMedicalReport } from "../utils/pdfGenerator";

// const API_BASE = "http://localhost:5000/api";

// /* ================= HELPERS (NO UI CHANGE) ================= */

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

// /* ================= COMPONENT ================= */

// export default function CampDashboard() {
//   const [camps, setCamps] = useState([]);
//   const [selectedCamp, setSelectedCamp] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* -------- FETCH DATA (AS IT IS) -------- */
//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/patients`);
//       const patients = res.data || [];

//       const camp1 = {
//         id: 1,
//         name: "Camp-1",
//         address: patients[0]?.address || "Main Camp",
//         participants: patients
//       };

//       setCamps([camp1]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* -------- FILTER (NO CHANGE) -------- */
//   const filteredParticipants = useMemo(() => {
//     let all = [];
//     camps.forEach(camp => {
//       camp.participants.forEach(p => {
//         all.push({ ...p, campId: camp.id });
//       });
//     });

//     return all.filter(p => {
//       if (selectedCamp && p.campId !== Number(selectedCamp)) return false;
//       return true;
//     });
//   }, [camps, selectedCamp, selectedDate]);

//   /* ================= MAIN FIX: REAL PDF DOWNLOAD ================= */

//   const downloadPDF = async (patient) => {
//     try {
//       const res = await axios.get(`${API_BASE}/patients/${patient._id}`);
//       const fullPatient = res.data;

//       if (!fullPatient?.tests?.length) {
//         alert("No test data available");
//         return;
//       }

//       const test = extractLatestVitals(fullPatient.tests);
//       const bmiValue = calculateBMI(test.weight, test.height);

//       const patientData = {
//         name: fullPatient.name,
//         age: fullPatient.age,
//         gender: fullPatient.gender,
//         id: fullPatient._id.slice(-6).toUpperCase(),
//         date: new Date(test.date).toLocaleDateString(),
//         phone: fullPatient.contact,
//         address: fullPatient.address,
//       };

//       const testsData = {
//         weight: test.weight,
//         height: test.height,
//         sugar: test.sugar,
//         sugarType: "Random",
//         systolic: test.systolic,
//         diastolic: test.diastolic,
//         heartRate: "-",
//       };

//       const bmiData = {
//         bmi: bmiValue,
//         category: getBMICategory(bmiValue),
//       };

//       // ✅ SAME REPORT FORMAT, DIRECT DOWNLOAD
//       generateMedicalReport(patientData, testsData, bmiData);

//     } catch (err) {
//       console.error(err);
//       alert("Failed to download PDF");
//     }
//   };

//   /* -------- SHARE (AS IT IS) -------- */
//   const shareReport = (patient) => {
//     const text = `Health Report\nName: ${patient.name}\nPhone: ${patient.contact}`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
//   };

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">
//         Camp Updates Dashboard
//       </h1>

//       {/* CAMP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {camps.map(camp => (
//           <div key={camp.id} className="rounded-2xl p-5 shadow-lg bg-white">
//             <h2 className="font-semibold text-lg">{camp.name}</h2>
//             <p className="text-sm text-gray-600">📍 {camp.address}</p>
//             <p className="text-sm font-medium mt-2">
//               👥 Participants: {camp.participants.length}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* FILTER */}
//       <div className="flex flex-wrap gap-6 items-end bg-white shadow rounded-2xl p-6">
//         <div>
//           <label className="text-sm">Camp</label>
//           <select
//             className="block border rounded p-2"
//             value={selectedCamp}
//             onChange={e => setSelectedCamp(e.target.value)}
//           >
//             <option value="">All</option>
//             {camps.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="rounded-2xl overflow-x-auto shadow bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-indigo-50">
//             <tr>
//               <th className="p-3">S.No</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Phone</th>
//               <th className="p-3">Report</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center">Loading...</td>
//               </tr>
//             )}

//             {!loading && filteredParticipants.map((p, i) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{i + 1}</td>
//                 <td className="p-3 font-medium">{p.name}</td>
//                 <td className="p-3">{p.contact}</td>
//                 <td className="p-3">
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => downloadPDF(p)}
//                       className="flex items-center gap-1 text-indigo-600 hover:underline"
//                     >
//                       <FileText size={16} /> PDF
//                     </button>
//                     <button
//                       onClick={() => shareReport(p)}
//                       className="flex items-center gap-1 text-green-600 hover:underline"
//                     >
//                       <Share2 size={16} /> Share
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!loading && filteredParticipants.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center">
//                   No participants found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import axios from "axios";
// import { FileText, Share2 } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { generateMedicalReport } from "../utils/pdfGenerator";

// const API_BASE = "http://localhost:5000/api";

// /* ================= HELPERS ================= */

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

// /* ================= COMPONENT ================= */

// export default function CampDashboard() {
//   const [camps, setCamps] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedCamp, setSelectedCamp] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ---------- FETCH PATIENTS ---------- */
//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/patients`);
//       const data = res.data || [];

//       setPatients(data);

//       /* 🔥 GROUP BY CAMP */
//       const campMap = {};

//       data.forEach(p => {
//         if (!p.campId) return;

//         const campKey = p.campId._id;

//         if (!campMap[campKey]) {
//           campMap[campKey] = {
//             _id: campKey,
//             name: p.campId.name,
//             location: p.campId.location,
//             participants: []
//           };
//         }

//         campMap[campKey].participants.push(p);
//       });

//       setCamps(Object.values(campMap));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- FILTER PATIENTS ---------- */
//   const filteredPatients = useMemo(() => {
//     if (!selectedCamp) return patients;
//     return patients.filter(p => p.campId?._id === selectedCamp);
//   }, [patients, selectedCamp]);

//   /* ---------- PDF ---------- */
//   const downloadPDF = async (patient) => {
//     try {
//       const res = await axios.get(`${API_BASE}/patients/${patient._id}`);
//       const fullPatient = res.data;

//       if (!fullPatient?.tests?.length) {
//         alert("No test data available");
//         return;
//       }

//       const test = extractLatestVitals(fullPatient.tests);
//       const bmiValue = calculateBMI(test.weight, test.height);

//       generateMedicalReport(
//         {
//           name: fullPatient.name,
//           age: fullPatient.age,
//           gender: fullPatient.gender,
//           id: fullPatient._id.slice(-6).toUpperCase(),
//           date: new Date(test.date).toLocaleDateString(),
//           phone: fullPatient.contact,
//           address: fullPatient.address,
//         },
//         {
//           weight: test.weight,
//           height: test.height,
//           sugar: test.sugar,
//           systolic: test.systolic,
//           diastolic: test.diastolic,
//         },
//         {
//           bmi: bmiValue,
//           category: getBMICategory(bmiValue),
//         }
//       );
//     } catch {
//       alert("Failed to download PDF");
//     }
//   };

//   const shareReport = (patient) => {
//     const text = `Health Report\nName: ${patient.name}\nPhone: ${patient.contact}`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
//   };

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold">Camp Dashboard</h1>

//       {/* CAMP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {camps.map(c => (
//           <div key={c._id} className="bg-white p-5 rounded-2xl shadow">
//             <h2 className="font-semibold">{c.name}</h2>
//             <p className="text-sm">📍 {c.location}</p>
//             <p className="mt-2 font-medium">
//               👥 Participants: {c.participants.length}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* FILTER */}
//       <div className="bg-white p-4 rounded-2xl shadow">
//         <label className="text-sm">Camp</label>
//         <select
//           className="block border rounded p-2 mt-1"
//           value={selectedCamp}
//           onChange={e => setSelectedCamp(e.target.value)}
//         >
//           <option value="">All Camps</option>
//           {camps.map(c => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-indigo-50">
//             <tr>
//               <th className="p-3">S.No</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Phone</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredPatients.map((p, i) => (
//               <tr key={p._id} className="border-t">
//                 <td className="p-3">{i + 1}</td>
//                 <td className="p-3">{p.name}</td>
//                 <td className="p-3">{p.contact}</td>
//                 <td className="p-3 flex gap-3">
//                   <button onClick={() => downloadPDF(p)} className="text-indigo-600 flex gap-1">
//                     <FileText size={16} /> PDF
//                   </button>
//                   <button onClick={() => shareReport(p)} className="text-green-600 flex gap-1">
//                     <Share2 size={16} /> Share
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {!loading && filteredPatients.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center">
//                   No patients found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { Eye, FileText, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { generateMedicalReport } from "../utils/pdfGenerator";

const API_BASE = "http://localhost:5000/api";

/* ================= HELPERS ================= */

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

/* ================= COMPONENT ================= */

export default function CampDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCamp, setSelectedCamp] = useState("");
  const [search, setSearch] = useState("");

  /* -------- FETCH PATIENTS -------- */
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/patients`);
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* -------- CAMP LIST -------- */
  const camps = useMemo(() => {
    const map = {};
    patients.forEach(p => {
      if (p.campId && p.campId._id) {
        if (!map[p.campId._id]) {
          map[p.campId._id] = {
            ...p.campId,
            participants: 0
          };
        }
        map[p.campId._id].participants += 1;
      }
    });
    return Object.values(map);
  }, [patients]);

  /* -------- FILTER PATIENTS -------- */
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const campMatch =
        !selectedCamp || p.campId?._id === selectedCamp;

      const searchMatch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.contact?.includes(search);

      return campMatch && searchMatch;
    });
  }, [patients, selectedCamp, search]);

  /* -------- VIEW / DOWNLOAD REPORT -------- */
  const openReport = async (patient, autoDownload = false) => {
    try {
      const res = await axios.get(`${API_BASE}/patients/${patient._id}`);
      const fullPatient = res.data;

      if (!fullPatient?.tests?.length) {
        alert("No test data available");
        return;
      }

      const test = extractLatestVitals(fullPatient.tests);
      const bmiValue = calculateBMI(test.weight, test.height);

      const patientData = {
        name: fullPatient.name,
        age: fullPatient.age,
        gender: fullPatient.gender,
        id: fullPatient._id.slice(-6).toUpperCase(),
        date: new Date(test.date).toLocaleDateString(),
        phone: fullPatient.contact,
        address: fullPatient.address,
      };

      const testsData = {
        weight: test.weight,
        height: test.height,
        sugar: test.sugar,
        sugarType: "Random",
        systolic: test.systolic,
        diastolic: test.diastolic,
        heartRate: "-",
      };

      const bmiData = {
        bmi: bmiValue,
        category: getBMICategory(bmiValue),
      };

      generateMedicalReport(patientData, testsData, bmiData, autoDownload);
    } catch (err) {
      console.error(err);
      alert("Failed to open report");
    }
  };

  const shareReport = (patient) => {
    const text = `Health Report\nName: ${patient.name}\nPhone: ${patient.contact}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold">Camp Dashboard</h1>

      {/* CAMP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {camps.map(c => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:ring-2 hover:ring-indigo-400"
            onClick={() => setSelectedCamp(c._id)}
          >
            <h2 className="font-semibold text-lg">{c.name}</h2>
            <p className="text-sm text-gray-600">📍 {c.location}</p>
            <p className="mt-2 font-medium">
              👥 Participants: {c.participants}
            </p>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="text-sm">Camp</label>
          <select
            className="block border rounded p-2"
            value={selectedCamp}
            onChange={e => setSelectedCamp(e.target.value)}
          >
            <option value="">All Camps</option>
            {camps.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Search</label>
          <input
            placeholder="Name or Phone"
            className="block border rounded p-2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Camp</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading...</td>
              </tr>
            )}

            {!loading && filteredPatients.map((p, i) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.contact}</td>
                <td className="p-3">{p.campId?.name || "-"}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openReport(p, false)}
                      className="flex items-center gap-1 text-blue-600"
                    >
                      <Eye size={16} /> View
                    </button>

                    <button
                      onClick={() => openReport(p, true)}
                      className="flex items-center gap-1 text-indigo-600"
                    >
                      <FileText size={16} /> Download
                    </button>

                    <button
                      onClick={() => shareReport(p)}
                      className="flex items-center gap-1 text-green-600"
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && filteredPatients.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
