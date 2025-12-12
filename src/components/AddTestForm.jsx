// import axios from 'axios';
// import { Activity, PlusCircle } from 'lucide-react';
// import { useEffect, useState } from 'react';

// const AddTestForm = ({ patientId, onSuccess }) => {
//     const [formData, setFormData] = useState({
//         weight: '', height: '',
//         sugar: '', bpSystolic: '', bpDiastolic: '',
//         rbs: '', temperature: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [previousTests, setPreviousTests] = useState([]);
//     const [isFormFilled, setIsFormFilled] = useState(false);

//     // Fetch previous tests
//     useEffect(() => {
//         fetchPreviousTests();
//     }, []);

//     const fetchPreviousTests = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/patients/:id/tests`);
//             const sortedTests = response.data; // Backend sorts or we trust order.
//             // If we need to ensure sort:
//             // const sortedTests = response.data.sort((a,b) => new Date(b.date) - new Date(a.date));
//             setPreviousTests(sortedTests);

//             // Auto-load the latest test (Incremental Entry Feature)
//             if (response.data.length > 0) {
//                 // Assuming the last item in the array is the most recently added
//                 const latestTest = response.data[response.data.length - 1];

//                 // Pre-fill form with latest data
//                 setFormData({
//                     weight: latestTest.weight || '',
//                     height: latestTest.height || '',
//                     sugar: latestTest.sugar || '',
//                     bpSystolic: latestTest.bpSystolic || '',
//                     bpDiastolic: latestTest.bpDiastolic || '',
//                     rbs: latestTest.rbs || '',
//                     temperature: latestTest.temperature || ''
//                 });
//                 setIsFormFilled(true);
//             }
//         } catch (err) {
//             console.error('Error fetching previous tests');
//         }
//     };

//     const handleChange = (e) => {
//         const newFormData = { ...formData, [e.target.name]: e.target.value };
//         setFormData(newFormData);
//         setIsFormFilled(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Remove empty strings to send clean partial data (though backend handles nulls too)
//         // We actually want to send whatever is in the form, even if it overwrites with empty? 
//         // No, typically we send the values we have.
//         // User wants: "fill kar ke save... click karte hai toh store hone chahiye"

//         const hasAnyValue = Object.values(formData).some(value => value !== "" && value != null);
//         if (!hasAnyValue) {
//             alert("Please enter at least one test value.");
//             return;
//         }

//         setLoading(true);

//         try {
//             await axios.post(`http://localhost:5000/api/patients/:id/test`, formData);

//             // Update history
//             await fetchPreviousTests();
//             onSuccess();

//             // IMPORTANT: We do NOT clear the form here.
//             // This enables the "Incremental Entry" workflow.
//             // The user can immediately add another value (like Sugar) 
//             // without re-typing Weight, because Weight is still in the form state.

//         } catch (err) {
//             alert('Error adding test');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const clearForm = () => {
//         setFormData({
//             weight: '', height: '',
//             sugar: '', bpSystolic: '', bpDiastolic: '',
//             rbs: '', temperature: ''
//         });
//         setIsFormFilled(false);
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                     <Activity className="text-indigo-500" /> Add New Clinical Record
//                 </h3>
//                 {isFormFilled && (
//                     <button
//                         type="button"
//                         onClick={clearForm}
//                         className="text-xs text-red-600 hover:text-red-800 bg-red-50 px-3 py-1 rounded-lg transition"
//                     >
//                         Clear Form
//                     </button>
//                 )}
//             </div>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 {/* Physical */}
//                 <div className="md:col-span-4 lg:col-span-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Physical</h4>
//                     <div className="space-y-3">
//                         <div>
//                             <label className="text-xs font-semibold text-gray-700">Weight (kg)</label>
//                             <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange}
//                                 className="w-full p-2 border rounded-lg text-sm focus:ring-2 ring-indigo-500 outline-none" placeholder="0.0" />
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-gray-700">Height (cm)</label>
//                             <input type="number" step="0.1" name="height" value={formData.height} onChange={handleChange}
//                                 className="w-full p-2 border rounded-lg text-sm focus:ring-2 ring-indigo-500 outline-none" placeholder="0.0" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Vitals */}
//                 <div className="md:col-span-4 lg:col-span-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Vitals & Labs</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div>
//                             <label className="text-xs font-semibold text-gray-700">Sugar (Fasting)</label>
//                             <input type="number" name="sugar" value={formData.sugar} onChange={handleChange}
//                                 className="w-full p-2 border rounded-lg text-sm focus:ring-2 ring-indigo-500 outline-none" placeholder="mg/dL" />
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-gray-700">RBS</label>
//                             <input type="number" name="rbs" value={formData.rbs} onChange={handleChange}
//                                 className="w-full p-2 border rounded-lg text-sm focus:ring-2 ring-indigo-500 outline-none" placeholder="mg/dL" />
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-gray-700">Temp (°F)</label>
//                             <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange}
//                                 className="w-full p-2 border rounded-lg text-sm focus:ring-2 ring-indigo-500 outline-none" placeholder="°F" />
//                         </div>

//                         <div className="md:col-span-4 grid grid-cols-2 gap-2 bg-white p-2 rounded-lg border">
//                             <div className="col-span-2 text-xs font-bold text-center text-gray-500">Blood Pressure</div>
//                             <input type="number" name="bpSystolic" value={formData.bpSystolic} onChange={handleChange}
//                                 className="p-2 border rounded text-sm text-center" placeholder="120" />
//                             <input type="number" name="bpDiastolic" value={formData.bpDiastolic} onChange={handleChange}
//                                 className="p-2 border rounded text-sm text-center" placeholder="80" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="md:col-span-4 flex gap-3">
//                     <button type="submit" disabled={loading}
//                         className="flex-1 bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition flex justify-center items-center gap-2">
//                         {loading ? 'Saving...' : <><PlusCircle size={18} /> Save Clinical Record</>}
//                     </button>
//                 </div>
//                 <div className="md:col-span-4 text-center">
//                     <p className="text-xs text-gray-400">
//                         Tip: You can verify and download reports from the history list below.
//                     </p>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddTestForm;

// AddTestForm.jsx
// import axios from "axios";
// import { Activity, PlusCircle } from "lucide-react";
// import { useEffect, useState } from "react";

// const TEST_TYPES = {
//   WEIGHT: "weight",
//   HEIGHT: "height",
//   SUGAR: "sugar",
//   BP: "bp"
// };

// const AddTestForm = ({ patientId, onSuccess = () => {} }) => {
//   const [selected, setSelected] = useState(TEST_TYPES.WEIGHT);
//   const [loading, setLoading] = useState(false);
//   const [tests, setTests] = useState([]);
//   const [patientInfo, setPatientInfo] = useState(null);
//   const [values, setValues] = useState({
//     weight: "",
//     height: "",
//     sugar: "",
//     systolic: "",
//     diastolic: ""
//   });
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Fetch patient data and tests
//   useEffect(() => {
//     if (!patientId) {
//       setError("Patient ID is missing");
//       setInitialLoad(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         console.log("Fetching data for patient:", patientId);

//         const patientRes = await axios.get(`http://localhost:5000/api/patients/${patientId}`);
//         setPatientInfo(patientRes.data);

//         const testsRes = await axios.get(`http://localhost:5000/api/patients/${patientId}/tests`);
//         console.log("Tests received:", testsRes.data);
//         setTests(testsRes.data || []);

//         setError("");
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.error || "Failed to load data");
//       } finally {
//         setInitialLoad(false);
//       }
//     };

//     fetchData();
//   }, [patientId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const selectTestType = (type) => {
//     setSelected(type);
//     setError("");
//     setSuccessMsg("");
//   };

//   const clearCurrentInput = () => {
//     setValues({
//       weight: "",
//       height: "",
//       sugar: "",
//       systolic: "",
//       diastolic: ""
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccessMsg("");

//     try {
//       let payload = { type: selected };

//       if (selected === TEST_TYPES.WEIGHT) {
//         payload.value = parseFloat(values.weight);
//       } else if (selected === TEST_TYPES.HEIGHT) {
//         payload.value = parseFloat(values.height);
//       } else if (selected === TEST_TYPES.SUGAR) {
//         payload.value = parseFloat(values.sugar);
//       } else if (selected === TEST_TYPES.BP) {
//         payload.value = parseInt(values.systolic);
//         payload.value2 = parseInt(values.diastolic);
//       }

//       console.log("Sending test data:", payload);

//       // FIXED API ROUTE 👇
//       const response = await axios.post(
//         `http://localhost:5000/api/patients/${patientId}/test`,
//         payload
//       );

//       console.log("Response:", response.data);

//       clearCurrentInput();
//       setSuccessMsg(`${selected.toUpperCase()} test added successfully!`);

//       const testsRes = await axios.get(`http://localhost:5000/api/patients/${patientId}/tests`);
//       setTests(testsRes.data || []);

//       onSuccess();

//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (err) {
//       console.error("Error adding test:", err);
//       setError(err.response?.data?.error || "Failed to add test.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getLatestValue = (type) => {
//     const typeTests = tests.filter((t) => t.type === type);
//     if (typeTests.length === 0) return null;

//     return [...typeTests].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
//   };

//   const formatTest = (test) => {
//     const date = new Date(test.date).toLocaleString();

//     if (test.type === "bp") return `${date} — BP: ${test.value}/${test.value2}`;
//     return `${date} — ${test.type.toUpperCase()}: ${test.value}`;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow border">
//       <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-4">
//         <Activity className="text-indigo-500" /> Add Single Test
//       </h4>

//       {/* Test Type Selection */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {Object.values(TEST_TYPES).map((type) => (
//           <button
//             key={type}
//             type="button"
//             onClick={() => selectTestType(type)}
//             className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
//               selected === type
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {type === "bp" ? "Blood Pressure" : type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Input Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Inputs */}
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           {selected === "weight" && (
//             <input
//               name="weight"
//               value={values.weight}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter weight (kg)"
//               type="number"
//             />
//           )}

//           {selected === "height" && (
//             <input
//               name="height"
//               value={values.height}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter height (cm)"
//               type="number"
//             />
//           )}

//           {selected === "sugar" && (
//             <input
//               name="sugar"
//               value={values.sugar}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter sugar (mg/dL)"
//               type="number"
//             />
//           )}

//           {selected === "bp" && (
//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 name="systolic"
//                 value={values.systolic}
//                 onChange={handleInputChange}
//                 className="p-3 border rounded-lg"
//                 placeholder="Systolic"
//                 type="number"
//               />
//               <input
//                 name="diastolic"
//                 value={values.diastolic}
//                 onChange={handleInputChange}
//                 className="p-3 border rounded-lg"
//                 placeholder="Diastolic"
//                 type="number"
//               />
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-indigo-600 text-white px-4 py-3 rounded-lg"
//           >
//             <PlusCircle size={18} className="inline-block" /> Save Test
//           </button>

//           <button
//             type="button"
//             onClick={clearCurrentInput}
//             className="bg-gray-200 px-4 py-3 rounded-lg"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Error & Success */}
//         {error && (
//           <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
//         )}

//         {successMsg && (
//           <div className="p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>
//         )}

//         {/* Test History */}
//         <div className="mt-6">
//           <h5 className="text-sm font-semibold mb-2">Test History</h5>
//           {tests.length === 0 ? (
//             <p className="text-gray-500">No tests yet.</p>
//           ) : (
//             tests.slice().reverse().map((t, i) => (
//               <div key={i} className="p-3 bg-white border rounded mb-2">
//                 {formatTest(t)}
//               </div>
//             ))
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTestForm;


import axios from "axios";
import { Activity, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const TEST_TYPES = {
  WEIGHT: "weight",
  HEIGHT: "height",
  SUGAR: "sugar",
  BP: "bp"
};

const AddTestForm = ({ patientId, onSuccess = () => {} }) => {
  const [selected, setSelected] = useState(TEST_TYPES.WEIGHT);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);

  const [values, setValues] = useState({
    weight: "",
    height: "",
    sugar: "",
    sugarType: "",
    systolic: "",
    diastolic: ""
  });

  const [showSugarPopup, setShowSugarPopup] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all tests
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/patients/${patientId}/tests`
        );
        setTests(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const selectTestType = (type) => {
    setSelected(type);
    setError("");
    setSuccessMsg("");
  };

  const clearCurrentInput = () => {
    setValues({
      weight: "",
      height: "",
      sugar: "",
      sugarType: "",
      systolic: "",
      diastolic: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let payload = { type: selected };

      if (selected === TEST_TYPES.WEIGHT)
        payload.value = parseFloat(values.weight);

      if (selected === TEST_TYPES.HEIGHT)
        payload.value = parseFloat(values.height);

      if (selected === TEST_TYPES.SUGAR) {
        payload.value = parseFloat(values.sugar);
        payload.sugarType = values.sugarType;
      }

      if (selected === TEST_TYPES.BP) {
        payload.value = parseInt(values.systolic);
        payload.value2 = parseInt(values.diastolic);
      }

      await axios.post(
        `http://localhost:5000/api/patients/${patientId}/test`,
        payload
      );

      clearCurrentInput();
      setSuccessMsg("Test Added!");

      const updated = await axios.get(
        `http://localhost:5000/api/patients/${patientId}/tests`
      );
      setTests(updated.data || []);

      onSuccess();
    } catch (err) {
      setError("Failed to add test.");
    }

    setLoading(false);
  };

  // BMI Calculation
  const bmi = (() => {
    if (!values.weight || !values.height) return "";
    const h = values.height / 100;
    return (values.weight / (h * h)).toFixed(1);
  })();

  const bmiCategory = (() => {
    if (!bmi) return "";
    const b = parseFloat(bmi);

    if (b < 18.5) return "Underweight";
    if (b < 25) return "Healthy";
    if (b < 30) return "Overweight";
    return "Obese";
  })();

  const idealBMI = "18.5 - 24.9";

  const formatTest = (t) => {
    let date = new Date(t.date).toLocaleString();
    if (t.type === "bp")
      return `${date} — Blood Pressure: ${t.value}/${t.value2}`;
    if (t.type === "sugar")
      return `${date} — Sugar (${t.sugarType}): ${t.value}`;
    return `${date} — ${t.type.toUpperCase()}: ${t.value}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-xl shadow border">

      <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-4">
        <Activity className="text-indigo-500" /> Add Test
      </h4>

      {/* Test Type Selection */}
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.values(TEST_TYPES).map((type) => (
          <button
            key={type}
            onClick={() => selectTestType(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              selected === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "bp" ? "Blood Pressure" : type.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="bg-gray-50 p-4 rounded-lg border">

          {/* Weight */}
          {selected === "weight" && (
            <>
              <input
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter weight (kg)"
                type="number"
              />

              {/* BMI CARD LIKE IMAGE */}
              {bmi && (
                <div className="mt-4 bg-white border rounded-xl p-4 shadow-sm">
                  <p className="text-lg font-semibold">BMI Result</p>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <p><b>BMI:</b> {bmi}</p>
                    <p><b>Category:</b> {bmiCategory}</p>
                    <p><b>Ideal BMI:</b> {idealBMI}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Height */}
          {selected === "height" && (
            <input
              name="height"
              value={values.height}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter height (cm)"
              type="number"
            />
          )}

          {/* Sugar */}
          {selected === "sugar" && (
            <>
              <div className="flex gap-2">
                <input
                  name="sugar"
                  value={values.sugar}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter sugar (mg/dL)"
                  type="number"
                />

                <button
                  type="button"
                  onClick={() => setShowSugarPopup(true)}
                  className="bg-indigo-600 text-white px-4 rounded"
                >
                  Type
                </button>
              </div>

              <p className="mt-1 text-sm text-gray-600">
                Selected: {values.sugarType || "None"}
              </p>
            </>
          )}

          {/* BP */}
          {selected === "bp" && (
            <div className="grid grid-cols-2 gap-3">
              <input
                name="systolic"
                value={values.systolic}
                onChange={handleInputChange}
                className="p-3 border rounded-lg"
                placeholder="Systolic"
                type="number"
              />
              <input
                name="diastolic"
                value={values.diastolic}
                onChange={handleInputChange}
                className="p-3 border rounded-lg"
                placeholder="Diastolic"
                type="number"
              />
            </div>
          )}

        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-3 rounded-lg"
          >
            <PlusCircle size={18} className="inline-block" /> Save Test
          </button>

          <button
            type="button"
            onClick={clearCurrentInput}
            className="bg-gray-200 px-4 py-3 rounded-lg"
          >
            Clear
          </button>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {successMsg && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            {successMsg}
          </div>
        )}

        {/* HISTORY */}
        <div className="mt-6">
          <h5 className="text-sm font-semibold mb-2">Test History</h5>

          {tests.length === 0 ? (
            <p className="text-gray-500">No tests yet.</p>
          ) : (
            tests
              .slice()
              .reverse()
              .map((t, i) => (
                <div
                  key={i}
                  className="p-3 bg-white border rounded mb-2 text-sm"
                >
                  {formatTest(t)}
                </div>
              ))
          )}
        </div>
      </form>

      {/* Sugar Popup */}
      {showSugarPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow w-64">
            <h3 className="font-semibold mb-2">Select Sugar Type</h3>

            {["Fasting", "Random", "PPBS"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setValues((prev) => ({ ...prev, sugarType: item }));
                  setShowSugarPopup(false);
                }}
                className="w-full p-2 border rounded mb-2"
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => setShowSugarPopup(false)}
              className="w-full bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AddTestForm;

