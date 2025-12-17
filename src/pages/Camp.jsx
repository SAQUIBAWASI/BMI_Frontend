import axios from "axios";
import {
  Calendar,
  ChevronRight,
  Eye,
  FileText,
  Filter,
  MapPin,
  Search,
  Share2,
  Users,
  Activity
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateMedicalReport } from "../utils/pdfGenerator";

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

export default function CampDashboard() {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCampId, setSelectedCampId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const shareReport = (patient) => {
    const text = `*Health Checkup Report* 🏥\n\nName: ${patient.name}\nDate: ${new Date().toLocaleDateString()}\n\nView your full report on our portal.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
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

        {/* LEFT SIDEBAR - CAMP LIST */}
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

        {/* RIGHT SIDE - PARTICIPANTS TABLE */}
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

                            {/* SHARE Button */}
                            <button
                              onClick={() => shareReport(patient)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                            >
                              <Share2 size={14} />
                              Share
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
        </div>
      </div>
    </div>
  );
}
