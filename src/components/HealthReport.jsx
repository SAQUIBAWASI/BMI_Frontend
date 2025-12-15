import { useState } from "react";
import bmiChart from "../assets/bmi chart.jpg";
import logo from "../assets/logo.png";
import "jspdf-autotable";
import { generateMedicalReport } from "../utils/pdfGenerator";

const HealthReport = () => {
  // Hardcoded data for demonstration - in a real app this might come from props or context
  const [patient] = useState({
    name: "John Doe",
    age: "35",
    gender: "Male",
    id: "PT-2023-8492",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    phone: "+91 98765 43210",
    address: "Banjara Hills, Hyderabad, Telangana",
  });

  const [tests] = useState({
    weight: "72",
    height: "170",
    sugar: "110",
    sugarType: "Fasting",
    systolic: "120",
    diastolic: "80",
    heartRate: "72",
  });

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

  const downloadHealthReport = () => {
    generateMedicalReport(patient, tests, bmiData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Health Report Preview</h2>
          <p className="text-gray-500 mt-1">Review the patient's medical details before downloading.</p>
        </div>
        <button
          onClick={downloadHealthReport}
          className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium transition-transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Official PDF
        </button>
      </div>

      {/* PAPER PREVIEW */}
      <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] relative mx-auto hidden md:block" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* HEADER */}
        <div className="h-32 bg-[#007A52] p-8 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain brightness-0 invert" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Timely Health</h1>
              <p className="text-green-100 text-sm opacity-90">Growth | Clinic | Lab | Pharmacy</p>
            </div>
          </div>
          <div className="bg-[#2563EB] px-6 py-2 rounded shadow-md">
            <p className="font-semibold text-sm tracking-widest uppercase">Medical Health Report</p>
          </div>
        </div>

        <div className="p-12 space-y-10">
          {/* PATIENT INFO */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-[#2563EB] rounded-full"></div>
              <h3 className="text-xl font-bold text-[#007A52] uppercase tracking-wide">Patient Information</h3>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>

            <div className="grid grid-cols-3 gap-y-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Patient Name</p>
                <p className="font-bold text-gray-800 text-lg">{patient.name}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Patient ID</p>
                <p className="font-bold text-gray-800 text-lg">{patient.id}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Report Date</p>
                <p className="font-bold text-gray-800 text-lg">{patient.date}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Age / Gender</p>
                <p className="font-semibold text-gray-800">{patient.age} Yrs / {patient.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Contact</p>
                <p className="font-semibold text-gray-800">{patient.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Address</p>
                <p className="font-semibold text-gray-800 max-w-[200px] leading-tight">{patient.address}</p>
              </div>
            </div>
          </section>

          {/* VITALS TABLE */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-[#2563EB] rounded-full"></div>
              <h3 className="text-xl font-bold text-[#007A52] uppercase tracking-wide">Clinical Vitals</h3>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#007A52] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left font-semibold">Test Description</th>
                    <th className="py-3 px-6 text-center font-semibold">Observed Value</th>
                    <th className="py-3 px-6 text-center font-semibold">Unit</th>
                    <th className="py-3 px-6 text-center font-semibold">Reference Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50/50">
                    <td className="py-3 px-6 font-medium text-gray-800">Body Weight</td>
                    <td className="py-3 px-6 text-center text-gray-800 font-bold">{tests.weight}</td>
                    <td className="py-3 px-6 text-center text-gray-500">kg</td>
                    <td className="py-3 px-6 text-center text-gray-500">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 font-medium text-gray-800">Height</td>
                    <td className="py-3 px-6 text-center text-gray-800 font-bold">{tests.height}</td>
                    <td className="py-3 px-6 text-center text-gray-500">cm</td>
                    <td className="py-3 px-6 text-center text-gray-500">-</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-3 px-6 font-medium text-gray-800">Blood Pressure</td>
                    <td className="py-3 px-6 text-center text-gray-800 font-bold">{tests.systolic}/{tests.diastolic}</td>
                    <td className="py-3 px-6 text-center text-gray-500">mmHg</td>
                    <td className="py-3 px-6 text-center text-gray-500">120/80</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 font-medium text-gray-800">Blood Sugar ({tests.sugarType})</td>
                    <td className="py-3 px-6 text-center text-gray-800 font-bold">{tests.sugar}</td>
                    <td className="py-3 px-6 text-center text-gray-500">mg/dL</td>
                    <td className="py-3 px-6 text-center text-gray-500">70-100 (Fasting)</td>
                  </tr>
                  {/* <tr className="bg-gray-50/50"> */}
                  {/* <td className="py-3 px-6 font-medium text-gray-800">Heart Rate</td> */}
                  {/* <td className="py-3 px-6 text-center text-gray-800 font-bold">{tests.heartRate}</td> */}
                  {/* <td className="py-3 px-6 text-center text-gray-500">bpm</td> */}
                  {/* <td className="py-3 px-6 text-center text-gray-500">60-100</td> */}
                  {/* </tr> */}
                </tbody>
              </table>
            </div>
          </section>

          {/* BMI SECTION */}
          {bmiData && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-[#2563EB] rounded-full"></div>
                <h3 className="text-xl font-bold text-[#007A52] uppercase tracking-wide">BMI Analysis</h3>
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="bg-[#2563EB] text-white p-6 rounded-2xl shadow-lg w-64 text-center">
                  <p className="text-blue-100 text-sm mb-2 font-medium uppercase tracking-wider">Calculated BMI</p>
                  <p className="text-5xl font-bold mb-2">{bmiData.bmi}</p>
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {bmiData.category}
                  </span>
                </div>

                <div className="flex-grow border rounded-xl p-2 bg-gray-50">
                  <img src={bmiChart} alt="BMI Chart" className="w-full h-40 object-contain mix-blend-multiply" />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full p-12">
          <div className="flex justify-between items-end mb-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-px bg-gray-300 mb-2"></div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Consultant Physician</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-px bg-gray-300 mb-2"></div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Lab Technician</p>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">
              This report is electronically generated by City Care Diagnostics System and is valid without a physical signature.
            </p>
          </div>
        </div>

      </div>

      {/* Mobile Replacement Warning */}
      <div className="md:hidden text-center p-8 bg-white rounded-xl shadow mt-8">
        <p className="text-gray-500">Please view on a desktop to see the full report preview.</p>
      </div>
    </div>
  );
};

export default HealthReport;
