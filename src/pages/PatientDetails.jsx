import axios from 'axios';
import jsPDF from 'jspdf';
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle, Clock, FileDown, MessageCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddTestForm from '../components/AddTestForm';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPatient = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/patients/${id}`);
            setPatient(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const generatePDF = (test) => {
        const doc = new jsPDF();

        // Styling constants
        const primaryColor = [79, 70, 229]; // Indigo 600

        // Header
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("Medical Lab Report", 105, 25, null, null, "center");

        // Patient Info Strip
        doc.setFillColor(245, 247, 250);
        doc.rect(15, 50, 180, 40, 'F'); // Increased height for Address
        doc.setTextColor(50, 50, 50);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(patient.name.toUpperCase(), 25, 65);

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Age: ${patient.age} | Gender: ${patient.gender}`, 25, 72);
        doc.text(`Contact: ${patient.contact}`, 25, 78);
        doc.text(`Address: ${patient.address || 'N/A'}`, 25, 84); // Added Address

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Date: ${new Date(test.date).toLocaleDateString()}`, 180, 65, null, null, "right");

        // Report Status Tag
        const isVerified = test.doctorVerification?.status === 'approved';
        doc.setFillColor(isVerified ? 220 : 255, isVerified ? 255 : 240, isVerified ? 220 : 240); // Light Green or Light Red
        doc.roundedRect(150, 75, 30, 8, 2, 2, 'F');
        doc.setTextColor(isVerified ? 0 : 200, isVerified ? 128 : 50, isVerified ? 0 : 50);
        doc.setFontSize(8);
        doc.text(isVerified ? "VERIFIED" : "PENDING", 165, 80, null, null, "center");

        // Table Header
        let y = 110;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 10;

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text("TEST PARAMETER", 25, y);
        doc.text("RESULT", 90, y);
        doc.text("STATUS", 130, y);
        doc.text("NORMAL RANGE", 170, y);
        y += 5;
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFont(undefined, 'normal');

        const addRow = (label, value, status, normalRange) => {
            doc.text(label, 25, y);
            doc.text(String(value), 90, y);

            if (status === 'Normal' || status === 'Healthy') doc.setTextColor(22, 163, 74); // Green
            else if (status === 'Critical' || status === 'High' || status === 'Obese' || status === 'Low' || status === 'Underweight') doc.setTextColor(220, 38, 38); // Red
            else doc.setTextColor(234, 88, 12); // Orange

            doc.text(status, 130, y);
            doc.setTextColor(100, 100, 100);
            doc.text(normalRange, 170, y);
            doc.setTextColor(0, 0, 0);
            y += 10;
            doc.setDrawColor(245, 245, 245);
            doc.line(20, y - 5, 190, y - 5);
        };

        addRow("BMI", test.bmi, test.bmiCategory, "18.5 - 24.9");
        addRow("Sugar (Fasting)", `${test.sugar} mg/dL`, test.analysis.sugarStatus, "70 - 100");
        addRow("Blood Pressure", `${test.bpSystolic}/${test.bpDiastolic}`, test.analysis.bpStatus, "120/80");
        addRow("RBS", `${test.rbs} mg/dL`, test.analysis.rbsStatus, "< 140");
        addRow("Temperature", `${test.temperature} °F`, test.analysis.tempStatus, "97 - 99");

        // Summary Box
        y += 15;
        doc.setFillColor(248, 250, 252);

        // Verification & Signature Section
        const pageHeight = doc.internal.pageSize.height;
        y = Math.max(y, pageHeight - 60);

        doc.setDrawColor(200, 200, 200);
        doc.rect(20, y, 170, 40); // Doctor Box Status

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Doctor Verification:", 25, y + 10);

        if (isVerified) {
            doc.setFontSize(14);
            doc.setTextColor(22, 163, 74);
            doc.setFont(undefined, 'bold');
            doc.text("APPROVED BY DOCTOR", 105, y + 25, null, null, "center");
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Digitally Verified on ${new Date(test.doctorVerification.approvedAt).toLocaleString()}`, 105, y + 35, null, null, "center");
        } else {
            doc.setFontSize(14);
            doc.setTextColor(200, 200, 200);
            doc.setFont(undefined, 'bold');
            doc.text("PENDING APPROVAL", 105, y + 25, null, null, "center");
        }

        doc.save(`${patient.name}_Report_${new Date(test.date).toISOString().split('T')[0]}.pdf`);
    };

    if (loading || !patient) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition"><ArrowLeft /></Link>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800">{patient.name}</h2>
                    <div className="text-gray-500 flex flex-wrap gap-4 text-sm mt-2">
                        <span>Age: <span className="font-semibold text-gray-700">{patient.age}</span></span>
                        <span>•</span>
                        <span className="capitalize">Gender: <span className="font-semibold text-gray-700">{patient.gender}</span></span>
                        <span>•</span>
                        <span>Ph: <span className="font-semibold text-gray-700">{patient.contact}</span></span>
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                        Address: <span className="font-semibold text-gray-700">{patient.address || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <AddTestForm patientId={patient._id} onSuccess={fetchPatient} />

            {/* History */}
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Medical History</h3>
            <div className="space-y-4">
                {patient.tests.slice().reverse().map(test => {
                    const isVerified = test.doctorVerification?.status === 'approved';
                    return (
                        <div key={test._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                            {/* Date & Verification Status */}
                            <div className="flex gap-4 items-center min-w-[180px]">
                                <div className={`p-3 rounded-lg ${test.healthStatus === 'Healthy' ? 'bg-green-50 text-green-600' : test.healthStatus === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {test.healthStatus === 'Healthy' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={12} /> {new Date(test.date).toLocaleDateString()}</div>
                                    <div className="font-bold text-lg mb-1">{test.healthStatus}</div>
                                    {isVerified ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                            <ShieldCheck size={10} /> Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                            <Clock size={10} /> Pending
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm flex-1 border-l pl-6 border-gray-100">
                                <div>
                                    <span className="text-gray-400 text-xs block">BMI</span>
                                    <span className="font-bold text-gray-700">{test.bmi}</span> <span className="text-xs text-gray-500">({test.bmiCategory})</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs block">BP</span>
                                    <span className="font-semibold text-gray-700">{test.bpSystolic}/{test.bpDiastolic}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs block">Sugar</span>
                                    <span className="font-semibold text-gray-700">{test.sugar}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs block">Temp</span>
                                    <span className="font-semibold text-gray-700">{test.temperature}°</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button onClick={() => {
                                    const message = `Hello ${patient.name}, your Medical Report (Date: ${new Date(test.date).toLocaleDateString()}) is ready. Status: ${test.healthStatus}.`;
                                    const whatsappUrl = `https://wa.me/${patient.contact.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                                    window.open(whatsappUrl, '_blank');
                                }} className="min-w-[40px] h-[40px] flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 border border-green-200 transition" title="Send via WhatsApp">
                                    <MessageCircle size={20} />
                                </button>
                                <button onClick={() => generatePDF(test)} className="min-w-[40px] h-[40px] flex items-center justify-center bg-gray-50 text-indigo-600 rounded-lg hover:bg-indigo-50 border border-indigo-100 transition" title="Download Report">
                                    <FileDown size={20} />
                                </button>
                            </div>
                        </div>
                    )
                })}
                {patient.tests.length === 0 && <div className="text-center text-gray-400 py-10">No records found. Add a new clinical record above.</div>}
            </div>
        </div>
    );
};

export default PatientDetails;
