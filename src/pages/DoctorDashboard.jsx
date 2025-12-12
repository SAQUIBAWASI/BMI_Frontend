import axios from 'axios';
import { CheckCircle, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [pendingTests, setPendingTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
            // We need full details, but the dashboard endpoint might only give summaries. 
            // For now, let's assume we need to fetch individual details if the main list doesn't have tests deeply populated, 
            // OR we assume the prompt meant we should iterate everything.
            // Actually, the current patientRoutes.js GET / returns a transformed list without full tests array (just testCount).
            // I need to update the backend to support a "doctor view" or just fetch details for all.
            // BETTER APPROACH: Let's fetch the summary list, then for each patient with recent activity, fetch details.
            // OR even better: Monitor the 'pending' status.

            // For simplicity in this demo, I will modify the logic to just fetch all patients DETAILs in a loop or changing the backend.
            // Let's rely on client-side fetching for now to avoid changing backend dashboard route too much if not needed.

            // Wait, the requirement says "Doctor ek panel me jaake report ko approve kare".
            // Let's try to fetch all patients and then filter.

            // Re-fetching full details for all is heavy. 
            // I will implement a client-side "fetch all details" for now, as the dataset is small.
            const allPatientsIds = res.data.map(p => p._id);
            const fullDetailsPromises = allPatientsIds.map(id => axios.get(`http://localhost:5000/api/patients/${id}`));
            const fullPatientsres = await Promise.all(fullDetailsPromises);
            const fullPatients = fullPatientsres.map(r => r.data);

            setPatients(fullPatients);
            processPendingTests(fullPatients);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const processPendingTests = (patientsList) => {
        const pending = [];
        patientsList.forEach(patient => {
            patient.tests.forEach(test => {
                if (test.doctorVerification?.status === 'pending') {
                    pending.push({
                        patientName: patient.name,
                        patientId: patient._id,
                        patientContact: patient.contact, // Needed for WhatsApp
                        ...test
                    });
                }
            });
        });
        // Sort by date desc
        pending.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPendingTests(pending);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleApprove = async (patientId, testId, contact) => {
        if (!window.confirm("Approve this medical report?")) return;

        try {
            await axios.patch(`http://localhost:5000/api/patients/${patientId}/tests/${testId}/verify`);

            // Simulate WhatsApp
            const message = `Hello, your Medical Report (Test ID: ${testId.substring(0, 6)}) has been verified by the doctor. Please login to the portal to download it.`;
            const whatsappUrl = `https://wa.me/${contact.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

            // In a real app we'd use Twilio/Meta API. Here we open the link.
            window.open(whatsappUrl, '_blank');
            alert("Report Verified! WhatsApp sending simulated.");

            // Refresh
            fetchPatients();
        } catch (err) {
            console.error(err);
            alert("Error trying to approve.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ShieldCheck className="text-green-400" size={32} /> Doctor's Dashboard
                    </h1>
                    <p className="text-indigo-200 mt-2">Verify pending lab reports and notify patients.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center min-w-[150px]">
                    <div className="text-3xl font-bold">{pendingTests.length}</div>
                    <div className="text-xs text-indigo-200 uppercase tracking-wider">Pending Reports</div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : pendingTests.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">All Caught Up!</h3>
                    <p className="text-gray-500">No pending reports to verify.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {pendingTests.map((test) => (
                        <div key={test.date} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Clock size={12} /> PENDING
                                    </span>
                                    <span className="text-xs text-gray-400">{new Date(test.date).toLocaleString()}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">{test.patientName}</h3>
                                <div className="text-sm text-gray-500 mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <span>BMI: <b className="text-gray-700">{test.bmi}</b></span>
                                    <span>Sugar: <b className="text-gray-700">{test.sugar}</b></span>
                                    <span>BP: <b className="text-gray-700">{test.bpSystolic}/{test.bpDiastolic}</b></span>
                                    <span>Result: <b className={test.healthStatus === 'Healthy' ? 'text-green-600' : 'text-red-500'}>{test.healthStatus}</b></span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link to={`/patient/${test.patientId}`} target="_blank" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition flex items-center gap-2">
                                    <ExternalLink size={16} /> View Full
                                </Link>
                                <button
                                    onClick={() => handleApprove(test.patientId, test._id, test.patientContact)}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-green-500/20"
                                >
                                    <CheckCircle size={16} /> Approve & Send
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
