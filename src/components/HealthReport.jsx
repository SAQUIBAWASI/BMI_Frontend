// import jsPDF from "jspdf";
// import { useState } from "react";
// import bmiChart from "../assets/bmi chart.jpg";
// import logo from "../assets/logo.png";

// const HealthReport = () => {
//   /* ===================== PATIENT DETAILS ===================== */
//   const [patient, setPatient] = useState({
//     name: "",
//     age: "",
//     gender: "Male",
//     phone: "",
//     address: "",
//   });

//   /* ===================== TEST VALUES ===================== */
//   const [tests, setTests] = useState({
//     weight: "",
//     height: "",
//     sugar: "",
//     sugarType: "Random",
//     systolic: "",
//     diastolic: "",
//   });

//   /* ===================== BMI CALCULATION ===================== */
//   const calculateBMI = () => {
//     if (!tests.weight || !tests.height) return null;

//     const heightInMeter = tests.height / 100;
//     const bmi = (tests.weight / (heightInMeter * heightInMeter)).toFixed(1);

//     let category = "";
//     if (bmi < 18.5) category = "Underweight";
//     else if (bmi < 25) category = "Healthy";
//     else if (bmi < 30) category = "Overweight";
//     else category = "Obese";

//     return { bmi, category };
//   };

//   const bmiData = calculateBMI();

//   /* ===================== PDF DOWNLOAD ===================== */
//   const downloadHealthReport = () => {
//     const doc = new jsPDF("p", "mm", "a4");

//     /* ---------- HEADER ---------- */
//     doc.addImage(logo, "PNG", 15, 10, 30, 30);

//     doc.setFontSize(18);
//     doc.text("Health Report", 105, 22, { align: "center" });

//     doc.setFontSize(10);
//     doc.text(`Report Date: ${new Date().toLocaleString()}`, 150, 35);

//     /* ---------- PATIENT DETAILS BOX ---------- */
//     doc.setDrawColor(200);
//     doc.rect(15, 45, 180, 40);

//     doc.setFontSize(11);
//     doc.text(`Patient Name : ${patient.name}`, 20, 55);
//     doc.text(`Age : ${patient.age} Years`, 20, 63);
//     doc.text(`Gender : ${patient.gender}`, 20, 71);

//     doc.text(`Phone : ${patient.phone}`, 110, 55);
//     doc.text(`Address : ${patient.address}`, 110, 63, { maxWidth: 75 });

//     /* ---------- CLINICAL VITALS ---------- */
//     let y = 95;
//     doc.setFontSize(14);
//     doc.text("Clinical Vitals", 15, y);

//     doc.setFontSize(11);
//     y += 10;

//     if (tests.weight) {
//       doc.text(`Weight : ${tests.weight} kg`, 20, y);
//       y += 8;
//     }

//     if (tests.height) {
//       doc.text(`Height : ${tests.height} cm`, 20, y);
//       y += 8;
//     }

//     if (tests.sugar) {
//       doc.text(
//         `Sugar (${tests.sugarType}) : ${tests.sugar} mg/dL`,
//         20,
//         y
//       );
//       y += 8;
//     }

//     if (tests.systolic && tests.diastolic) {
//       doc.text(
//         `Blood Pressure : ${tests.systolic}/${tests.diastolic} mmHg`,
//         20,
//         y
//       );
//       y += 8;
//     }

//     /* ---------- BMI SECTION ---------- */
//     if (bmiData) {
//       y += 5;
//       doc.setFontSize(14);
//       doc.text("BMI Analysis", 15, y);

//       doc.setFontSize(11);
//       y += 8;
//       doc.text(`BMI Value : ${bmiData.bmi}`, 20, y);
//       y += 7;
//       doc.text(`Category : ${bmiData.category}`, 20, y);

//       doc.addImage(bmiChart, "JPEG", 120, y - 18, 65, 40);
//     }

//     /* ---------- FOOTER ---------- */
//     doc.setFontSize(9);
//     doc.text(
//       "This report is system generated and does not require signature.",
//       105,
//       285,
//       { align: "center" }
//     );

//     doc.save(
//       `${patient.name || "Patient"}_Health_Report.pdf`
//     );
//   };

//   /* ===================== UI ===================== */
//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Patient Health Report
//       </h2>

//       {/* ---------- PATIENT FORM ---------- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           className="input"
//           placeholder="Patient Name"
//           onChange={(e) =>
//             setPatient({ ...patient, name: e.target.value })
//           }
//         />

//         <input
//           type="number"
//           className="input"
//           placeholder="Age"
//           onChange={(e) =>
//             setPatient({ ...patient, age: e.target.value })
//           }
//         />

//         <select
//           className="input"
//           onChange={(e) =>
//             setPatient({ ...patient, gender: e.target.value })
//           }
//         >
//           <option>Male</option>
//           <option>Female</option>
//         </select>

//         <input
//           className="input"
//           placeholder="WhatsApp Number"
//           onChange={(e) =>
//             setPatient({ ...patient, phone: e.target.value })
//           }
//         />

//         <textarea
//           className="input md:col-span-2"
//           placeholder="Full Address"
//           onChange={(e) =>
//             setPatient({ ...patient, address: e.target.value })
//           }
//         />
//       </div>

//       {/* ---------- TESTS ---------- */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <input
//           className="input"
//           placeholder="Weight (kg)"
//           onChange={(e) =>
//             setTests({ ...tests, weight: e.target.value })
//           }
//         />

//         <input
//           className="input"
//           placeholder="Height (cm)"
//           onChange={(e) =>
//             setTests({ ...tests, height: e.target.value })
//           }
//         />

//         <input
//           className="input"
//           placeholder="Sugar (mg/dL)"
//           onChange={(e) =>
//             setTests({ ...tests, sugar: e.target.value })
//           }
//         />

//         <select
//           className="input"
//           onChange={(e) =>
//             setTests({ ...tests, sugarType: e.target.value })
//           }
//         >
//           <option>Fasting</option>
//           <option>Random</option>
//           <option>PPBS</option>
//         </select>

//         <input
//           className="input"
//           placeholder="Systolic"
//           onChange={(e) =>
//             setTests({ ...tests, systolic: e.target.value })
//           }
//         />

//         <input
//           className="input"
//           placeholder="Diastolic"
//           onChange={(e) =>
//             setTests({ ...tests, diastolic: e.target.value })
//           }
//         />
//       </div>

//       {/* ---------- BMI CARD ---------- */}
//       {bmiData && (
//         <div className="p-4 rounded-xl bg-green-50 font-semibold">
//           BMI : {bmiData.bmi} ({bmiData.category})
//         </div>
//       )}

//       {/* ---------- DOWNLOAD BUTTON ---------- */}
//       <button
//         onClick={downloadHealthReport}
//         className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
//       >
//         Download Health Report
//       </button>
//     </div>
//   );
// };

// export default HealthReport;

import jsPDF from "jspdf";
import { useState } from "react";
import bmiChart from "../assets/bmi chart.jpg";
import logo from "../assets/logo.png";

const HealthReport = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
  });

  const [tests, setTests] = useState({
    weight: "",
    height: "",
    sugar: "",
    sugarType: "Random",
    systolic: "",
    diastolic: "",
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
    const doc = new jsPDF("p", "mm", "a4");

    /* HEADER */
    doc.addImage(logo, "PNG", 15, 10, 30, 30);
    doc.setFontSize(18);
    doc.text("Health Report", 105, 22, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Report Date: ${new Date().toLocaleString()}`, 150, 35);

    /* PATIENT INFO */
    doc.rect(15, 45, 180, 40);
    doc.setFontSize(11);

    doc.text(`Patient Name : ${patient.name || "-"}`, 20, 55);
    doc.text(`Age : ${patient.age || "-"}`, 20, 63);
    doc.text(`Gender : ${patient.gender}`, 20, 71);

    doc.text(`Phone : ${patient.phone || "-"}`, 110, 55);
    doc.text(`Address : ${patient.address || "-"}`, 110, 63, { maxWidth: 75 });

    /* VITALS */
    let y = 95;
    doc.setFontSize(14);
    doc.text("Clinical Vitals", 15, y);
    doc.setFontSize(11);
    y += 10;

    if (tests.weight) doc.text(`Weight : ${tests.weight} kg`, 20, y), y += 8;
    if (tests.height) doc.text(`Height : ${tests.height} cm`, 20, y), y += 8;
    if (tests.sugar)
      doc.text(`Sugar (${tests.sugarType}) : ${tests.sugar} mg/dL`, 20, y), y += 8;
    if (tests.systolic && tests.diastolic)
      doc.text(`BP : ${tests.systolic}/${tests.diastolic} mmHg`, 20, y), y += 8;

    /* BMI */
    if (bmiData) {
      y += 5;
      doc.setFontSize(14);
      doc.text("BMI Analysis", 15, y);
      doc.setFontSize(11);
      y += 8;

      doc.text(`BMI Value : ${bmiData.bmi}`, 20, y);
      y += 7;
      doc.text(`Category : ${bmiData.category}`, 20, y);

      doc.addImage(bmiChart, "JPEG", 120, y - 18, 65, 40);
    }

    doc.setFontSize(9);
    doc.text(
      "This report is system generated and does not require signature.",
      105,
      285,
      { align: "center" }
    );

    doc.save(`${patient.name || "Patient"}_Health_Report.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Patient Health Report</h2>

      <button
        onClick={downloadHealthReport}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
      >
        Download Health Report
      </button>
    </div>
  );
};

export default HealthReport;

