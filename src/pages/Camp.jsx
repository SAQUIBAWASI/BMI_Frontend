// import { Download } from "lucide-react";
// import { useMemo, useState } from "react";

// // Mock API data (replace with backend later)
// const CAMPS = [
//   { id: 1, name: "Camp-1", address: "Delhi", date: "2025-12-01", time: "10:00 AM" },
//   { id: 2, name: "Camp-2", address: "Noida", date: "2025-12-03", time: "11:00 AM" },
//   { id: 3, name: "Camp-3", address: "Gurgaon", date: "2025-12-05", time: "09:30 AM" },
//   { id: 4, name: "Camp-4", address: "Faridabad", date: "2025-12-06", time: "10:30 AM" }
// ];

// const PARTICIPANTS = [
//   { id: 1, campId: 1, name: "Amit", phone: "9999999999", height: 170, weight: 70, bmi: 24.2, sugar: 110 },
//   { id: 2, campId: 1, name: "Neha", phone: "8888888888", height: 160, weight: 60, bmi: 23.4, sugar: 105 },
//   { id: 3, campId: 2, name: "Rahul", phone: "7777777777", height: 175, weight: 75, bmi: 24.5, sugar: 120 },
//   { id: 4, campId: 3, name: "Sana", phone: "6666666666", height: 158, weight: 55, bmi: 22.0, sugar: 98 }
// ];

// export default function CampDashboard() {
//   const [selectedCamp, setSelectedCamp] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   const filteredParticipants = useMemo(() => {
//     return PARTICIPANTS.filter(p => {
//       const camp = CAMPS.find(c => c.id === p.campId);
//       if (!camp) return false;
//       if (selectedCamp && camp.id !== Number(selectedCamp)) return false;
//       if (selectedDate && camp.date !== selectedDate) return false;
//       return true;
//     });
//   }, [selectedCamp, selectedDate]);

//   const downloadCSV = () => {
//     const headers = ["Name", "Phone", "Height", "Weight", "BMI", "Sugar"];
//     const rows = filteredParticipants.map(p => [
//       p.name,
//       p.phone,
//       p.height,
//       p.weight,
//       p.bmi,
//       p.sugar
//     ]);

//     const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "camp-participants-report.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Camp Updates Dashboard</h1>

//       {/* Camp Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {CAMPS.map(camp => (
//           <div key={camp.id} className="border rounded-2xl p-4 shadow">
//             <h2 className="font-semibold">{camp.name}</h2>
//             <p className="text-sm">Address: {camp.address}</p>
//             <p className="text-sm">Date: {camp.date}</p>
//             <p className="text-sm">Time: {camp.time}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-wrap gap-4 items-end border p-4 rounded-2xl">
//         <div>
//           <label className="text-sm">Camp</label>
//           <select
//             className="block border rounded p-2"
//             value={selectedCamp}
//             onChange={e => setSelectedCamp(e.target.value)}
//           >
//             <option value="">All</option>
//             {CAMPS.map(c => (
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

//         <button
//           onClick={downloadCSV}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl"
//         >
//           <Download size={18} /> Download Report
//         </button>
//       </div>

//       {/* Participants Table */}
//       <div className="border rounded-2xl overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">#</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Phone</th>
//               <th className="p-2">Height</th>
//               <th className="p-2">Weight</th>
//               <th className="p-2">BMI</th>
//               <th className="p-2">Sugar</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredParticipants.map((p, i) => (
//               <tr key={p.id} className="border-t">
//                 <td className="p-2">{i + 1}</td>
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2">{p.phone}</td>
//                 <td className="p-2">{p.height}</td>
//                 <td className="p-2">{p.weight}</td>
//                 <td className="p-2">{p.bmi}</td>
//                 <td className="p-2">{p.sugar}</td>
//               </tr>
//             ))}
//             {filteredParticipants.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center p-4">No participants found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { FileText, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function CampDashboard() {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     FETCH CAMP DATA (REAL)
  ---------------------------------- */
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/patients`);
      const patients = res.data || [];

      const camp1 = {
        id: 1,
        name: "Camp-1",
        address: patients[0]?.address || "Main Camp",
        participants: patients
      };

      setCamps([camp1]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     FILTER PARTICIPANTS
  ---------------------------------- */
  const filteredParticipants = useMemo(() => {
    let all = [];
    camps.forEach(camp => {
      camp.participants.forEach(p => {
        all.push({ ...p, campId: camp.id });
      });
    });

    return all.filter(p => {
      if (selectedCamp && p.campId !== Number(selectedCamp)) return false;
      if (selectedDate && p.lastTest) {
        const d = new Date(p.lastTest).toISOString().slice(0, 10);
        if (d !== selectedDate) return false;
      }
      return true;
    });
  }, [camps, selectedCamp, selectedDate]);

  /* ----------------------------------
     DOWNLOAD PDF (DUMMY FOR NOW)
  ---------------------------------- */
  const downloadPDF = (patient) => {
    alert(`PDF download for ${patient.name}`);
    // later: backend pdf api call
  };

  /* ----------------------------------
     SHARE REPORT
  ---------------------------------- */
  const shareReport = (patient) => {
    const text = `Health Report\nName: ${patient.name}\nPhone: ${patient.contact}`;
    if (navigator.share) {
      navigator.share({ title: "Health Report", text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        Camp Updates Dashboard
      </h1>

      {/* CAMP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {camps.map(camp => (
          <div
            key={camp.id}
            className="rounded-2xl p-5 shadow-lg bg-white"
          >
            <h2 className="font-semibold text-lg">{camp.name}</h2>
            <p className="text-sm text-gray-600">📍 {camp.address}</p>
            <p className="text-sm font-medium mt-2">
              👥 Participants: {camp.participants.length}
            </p>
          </div>
        ))}
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-wrap gap-6 items-end bg-white shadow rounded-2xl p-6">
        <div>
          <label className="text-sm">Camp</label>
          <select
            className="block border rounded p-2"
            value={selectedCamp}
            onChange={e => setSelectedCamp(e.target.value)}
          >
            <option value="">All</option>
            {camps.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Date</label>
          <input
            type="date"
            className="block border rounded p-2"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* PARTICIPANTS TABLE */}
      <div className="rounded-2xl overflow-x-auto shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Report</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="p-4 text-center">Loading...</td>
              </tr>
            )}

            {!loading && filteredParticipants.map((p, i) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.contact}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadPDF(p)}
                      className="flex items-center gap-1 text-indigo-600 hover:underline"
                    >
                      <FileText size={16} /> PDF
                    </button>
                    <button
                      onClick={() => shareReport(p)}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && filteredParticipants.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No participants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
