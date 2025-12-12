import jsPDF from 'jspdf';
import { Activity, ArrowLeft, Download, Heart, Thermometer, User } from 'lucide-react';

const HealthReport = ({ report, onBack }) => {
    if (!report) return null;

    const { name, age, gender, bmi, bmiCategory, healthStatus, analysis, weight, height, sugar, bpSystolic, bpDiastolic, rbs, temperature } = report;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Normal': return 'text-green-600';
            case 'Healthy': return 'text-green-600 bg-green-100';
            case 'Need Attention': return 'text-yellow-600 bg-yellow-100';
            case 'Critical': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600';
        }
    };

    const getValueColor = (status) => status !== 'Normal' ? 'text-red-500 font-bold' : 'text-gray-700';

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(41, 98, 255); // Indigo
        doc.text("Medical Health Report", 105, 20, null, null, "center");

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 30, null, null, "center");

        // Line
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Patient Details
        doc.setFontSize(16);
        doc.text("Patient Details", 20, 50);
        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 20, 60);
        doc.text(`Age: ${age}`, 20, 70);
        doc.text(`Gender: ${gender}`, 80, 70);
        doc.text(`Weight: ${weight} kg`, 20, 80);
        doc.text(`Height: ${height} cm`, 80, 80);

        // Health Analysis
        doc.setFontSize(16);
        doc.text("Vital Statistics & Analysis", 20, 100);

        let y = 110;
        const addRow = (label, value, status, normalRange) => {
            doc.setFontSize(12);
            doc.text(label, 20, y);
            doc.text(`${value}`, 80, y);
            doc.text(status, 120, y);
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(10);
            doc.text(`(Target: ${normalRange})`, 160, y, null, null, "center");
            doc.setTextColor(0, 0, 0);
            y += 10;
        };

        addRow("BMI", bmi, bmiCategory, "18.5 - 24.9");
        addRow("Sugar (Fasting)", `${sugar} mg/dL`, analysis.sugarStatus, "70 - 100");
        addRow("Blood Pressure", `${bpSystolic}/${bpDiastolic}`, analysis.bpStatus, "120/80");
        addRow("RBS", `${rbs} mg/dL`, analysis.rbsStatus, "< 140");
        addRow("Temperature", `${temperature} F`, analysis.tempStatus, "97 - 99");

        // Summary
        y += 20;
        doc.setFontSize(16);
        doc.text("Overall Summary", 20, y);
        doc.setFontSize(14);

        let statusColor = [0, 128, 0]; // Green
        if (healthStatus === 'Critical') statusColor = [255, 0, 0];
        else if (healthStatus === 'Need Attention') statusColor = [255, 165, 0];

        doc.setTextColor(...statusColor);
        doc.text(healthStatus.toUpperCase(), 20, y + 10);

        doc.save(`${name}_Health_Report.pdf`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Health Report</h2>
                    <p className="text-gray-500">Generated for {name}</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold shadow-sm ${getStatusColor(healthStatus)}`}>
                    {healthStatus}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* BMI Card */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 p-2">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="text-blue-500" />
                        <span className="font-semibold text-gray-700">BMI Analysis</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-700">{bmi}</div>
                    <div className="text-sm text-blue-600 font-medium badge">{bmiCategory}</div>
                </div>

                {/* Vitals Grid */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600 flex items-center gap-2"><Activity size={16} /> Sugar</span>
                        <div className="text-right">
                            <div className={`font-bold ${getValueColor(analysis.sugarStatus)}`}>{sugar} mg/dL</div>
                            <div className="text-xs text-gray-500">{analysis.sugarStatus}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600 flex items-center gap-2"><Heart size={16} /> BP</span>
                        <div className="text-right">
                            <div className={`font-bold ${getValueColor(analysis.bpStatus)}`}>{bpSystolic}/{bpDiastolic}</div>
                            <div className="text-xs text-gray-500">{analysis.bpStatus}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600 flex items-center gap-2"><Activity size={16} /> RBS</span>
                        <div className="text-right">
                            <div className={`font-bold ${getValueColor(analysis.rbsStatus)}`}>{rbs} mg/dL</div>
                            <div className="text-xs text-gray-500">{analysis.rbsStatus}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600 flex items-center gap-2"><Thermometer size={16} /> Temp</span>
                        <div className="text-right">
                            <div className={`font-bold ${getValueColor(analysis.tempStatus)}`}>{temperature}°F</div>
                            <div className="text-xs text-gray-500">{analysis.tempStatus}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={onBack} className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> New Entry
                </button>
                <button onClick={downloadPDF} className="flex-1 bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition flex justify-center items-center gap-2">
                    <Download size={20} /> Download PDF
                </button>
            </div>

        </div>
    );
};

export default HealthReport;
