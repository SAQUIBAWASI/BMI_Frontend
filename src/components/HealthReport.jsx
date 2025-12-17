import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import bmiChart from "../assets/bmi chart.jpg";
import signature from "../assets/signature.png";
import { generateMedicalReport } from "../utils/pdfGenerator";

const HealthReport = () => {
  const location = useLocation();
  const [patient, setPatient] = useState(null);
  const [tests, setTests] = useState(null);

  useEffect(() => {
    if (location.state?.patient && location.state?.tests) {
      setPatient(location.state.patient);
      setTests(location.state.tests);
    }
  }, [location.state]);

  if (!patient || !tests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Report...
      </div>
    );
  }

  /* ================= BMI ================= */
  const calculateBMI = () => {
    if (!tests.weight || !tests.height) return null;
    const h = Number(tests.height) / 100;
    const bmi = (Number(tests.weight) / (h * h)).toFixed(1);

    let category = "Healthy";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 25 && bmi < 30) category = "Overweight";
    else if (bmi >= 30) category = "Obese";

    return { bmi, category };
  };

  const bmiData = calculateBMI();

  /* ================= STATUS HELPERS ================= */
  const getBPStatus = (sys, dia) => {
    if (!sys || !dia) return "-";
    if (sys < 90 || dia < 60) return "Low";
    if (sys <= 120 && dia <= 80) return "Normal";
    return "High";
  };

  const getSugarRange = (type) =>
    (type || "Random").toLowerCase().includes("fasting")
      ? "70-100"
      : "70-140";

  const getSugarStatus = (val, type) => {
    if (!val) return "-";
    const v = Number(val);
    if (v < 70) return "Low";
    if ((type || "Random").toLowerCase().includes("fasting"))
      return v <= 100 ? "Normal" : "High";
    return v <= 140 ? "Normal" : "High";
  };

  const statusClass = (s) =>
    s === "Normal" || s === "Healthy"
      ? "text-green-600 font-semibold"
      : s === "-"
      ? "text-gray-500"
      : "text-red-600 font-semibold";

  return (
    <div className="min-h-screen bg-gray-200 py-10 flex flex-col items-center">

      {/* DOWNLOAD BUTTON */}
      <div className="w-[210mm] flex justify-end mb-4">
        <button
          onClick={() => generateMedicalReport(patient, tests, bmiData)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Download Official PDF
        </button>
      </div>

      {/* ================= A4 PAGE ================= */}
      <div className="bg-white w-[210mm] h-[297mm] shadow-xl relative">

        {/* ================= HEADER ================= */}
        <div className="bg-[#007A52] text-white px-8 py-6">
          <h1 className="text-2xl font-bold">Timely Health</h1>
          <p className="text-sm mt-1">
            Growth | Clinic | Lab | Pharmacy
          </p>
          <p className="text-xs mt-1 opacity-90">
            3rd Floor, Sri Sai Balaji Avenue, VIP Hills, Madhapur, Hyderabad – 500081
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-10 py-8 text-sm text-gray-800 space-y-10">

          {/* ===== PATIENT INFO ===== */}
          <section>
            <div className="border-t border-blue-500 pt-3 text-center mb-6">
              <h3 className="text-green-700 font-bold tracking-wide">
                PATIENT INFORMATION
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-12">
              <div>
                <p className="text-gray-500">Patient Name</p>
                <p className="font-bold text-lg">{patient.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Patient ID</p>
                <p className="font-bold">{patient.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-bold">{patient.date}</p>
              </div>
            </div>
          </section>

          {/* ===== CLINICAL VITALS ===== */}
          <section>
            <div className="border-t border-blue-500 pt-3 text-center mb-6">
              <h3 className="text-green-700 font-bold tracking-wide">
                CLINICAL VITALS
              </h3>
            </div>

            <table className="w-full border border-gray-300">
              <thead className="bg-[#007A52] text-white">
                <tr>
                  <th className="p-3 text-left">Test Description</th>
                  <th className="p-3 text-center">Observed Value</th>
                  <th className="p-3 text-center">Unit</th>
                  <th className="p-3 text-center">Reference Range</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-semibold">Body Weight</td>
                  <td className="p-3 text-center font-bold">{tests.weight}</td>
                  <td className="p-3 text-center">kg</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-center">-</td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="p-3 font-semibold">Height</td>
                  <td className="p-3 text-center font-bold">{tests.height}</td>
                  <td className="p-3 text-center">cm</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-center">-</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">Blood Pressure</td>
                  <td className="p-3 text-center font-bold">
                    {tests.systolic}/{tests.diastolic}
                  </td>
                  <td className="p-3 text-center">mmHg</td>
                  <td className="p-3 text-center">120/80</td>
                  <td className={`p-3 text-center ${statusClass(getBPStatus(tests.systolic, tests.diastolic))}`}>
                    {getBPStatus(tests.systolic, tests.diastolic)}
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="p-3 font-semibold">
                    Blood Sugar ({tests.sugarType || "Random"})
                  </td>
                  <td className="p-3 text-center font-bold">{tests.sugar}</td>
                  <td className="p-3 text-center">mg/dL</td>
                  <td className="p-3 text-center">
                    {getSugarRange(tests.sugarType)}
                  </td>
                  <td className={`p-3 text-center ${statusClass(getSugarStatus(tests.sugar, tests.sugarType))}`}>
                    {getSugarStatus(tests.sugar, tests.sugarType)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* ===== BMI ANALYSIS (IMAGE-1 EXACT) ===== */}
          {bmiData && (
            <section>
              <div className="border-t border-blue-500 pt-3 text-center mb-8">
                <h3 className="text-green-700 font-bold tracking-wide">
                  BMI ANALYSIS
                </h3>
              </div>

              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                {/* BMI CARD */}
                <div className="bg-[#2563EB] text-white rounded-2xl p-8 text-center shadow-lg">
                  <p className="text-sm mb-2 opacity-90">Calculated BMI</p>
                  <p className="text-5xl font-bold">{bmiData.bmi}</p>
                  <p className="mt-3 text-lg font-semibold">
                    {bmiData.category}
                  </p>
                </div>

                {/* BMI CHART */}
                <div className="flex flex-col items-center">
                  <img
                    src={bmiChart}
                    alt="BMI Chart"
                    className="w-[380px] h-[220px] object-contain"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    BMI Reference Chart
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="absolute bottom-8 w-full px-12">
          <div className="flex justify-between items-end">
            <p className="text-xs text-gray-500">Consultant Physician</p>
            <img src={signature} alt="Signature" className="w-32" />
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-6">
            This report is electronically generated and is valid without a physical signature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
