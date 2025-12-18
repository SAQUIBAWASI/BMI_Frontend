import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import bmiChart from "../assets/bmi chart.jpg";
import signature from "../assets/signature.png";

/**
 * Common logic to create the jsPDF document.
 */
const createReportDoc = (patient, tests, bmiData) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- COLORS ---
    const primaryColor = "#007A52"; // Green
    const secondaryColor = "#2563EB"; // Blue
    const darkText = "#1F2937";
    const lightText = "#6B7280";

    // --- HEADER ---
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#FFFFFF");
    doc.text("Timely Health", 15, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#E5E7EB");
    doc.text("Growth | Clinic | Lab | Pharmacy", 15, 26);
    doc.text("3rd Floor, Sri Sai Balaji Avenue, VIP Hills, Madhapur, Hyderabad – 500081", 15, 31);

    // --- PATIENT DETAILS SECTION ---
    let yPos = 50;
    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, yPos, pageWidth - 15, yPos);

    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT INFORMATION", pageWidth / 2, yPos - 3, { align: "center" });

    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(lightText);

    const col1 = 15;
    const col2 = 80;
    const col3 = 140;

    doc.text("Patient Name", col1, yPos);
    doc.text("Patient ID", col2, yPos);
    doc.text("Date", col3, yPos);

    yPos += 5;
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.text((patient.name || "-").toUpperCase(), col1, yPos);
    doc.text(patient.id || "-", col2, yPos);
    doc.text(patient.date || new Date().toLocaleDateString(), col3, yPos);

    // --- VITALS SECTION ---
    yPos += 8;
    doc.setDrawColor(secondaryColor);
    doc.line(15, yPos, pageWidth - 15, yPos);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text("CLINICAL VITALS", pageWidth / 2, yPos - 3, { align: "center" });

    yPos += 8;

    const getSugarRange = (type) => {
        const t = (type || "Random").toLowerCase();
        if (t.includes("fasting")) return "70-100";
        return "70-140";
    };

    const getSugarStatus = (val, type) => {
        if (!val) return "-";
        const v = Number(val);
        const t = (type || "Random").toLowerCase();
        if (v < 70) return "Low";
        if (t.includes("fasting")) {
            if (v <= 100) return "Normal";
            return "High";
        } else {
            if (v <= 140) return "Normal";
            return "High";
        }
    };

    const getBPStatus = (sys, dias) => {
        if (!sys || !dias) return "-";
        const s = Number(sys);
        const d = Number(dias);
        if (s < 90 || d < 60) return "Low";
        if (s <= 120 && d <= 80) return "Normal";
        return "High";
    };

    const getStatusColor = (status) => {
        if (status === "Normal" || status === "Healthy") return [22, 163, 74];
        if (status === "Low" || status === "High" || status === "Overweight" || status === "Obese") return [220, 38, 38];
        return [31, 41, 55];
    };

    autoTable(doc, {
        startY: yPos,
        head: [["Test Description", "Observed Value", "Unit", "Reference Range", "Status"]],
        body: [
            ["Body Weight", tests.weight || "-", "kg", "-", "-"],
            ["Height", tests.height || "-", "cm", "-", "-"],
            [
                "Blood Pressure",
                `${tests.systolic || "-"}/${tests.diastolic || "-"}`,
                "mmHg",
                "120/80",
                getBPStatus(tests.systolic, tests.diastolic)
            ],
            [
                `Blood Sugar (${tests.sugarType || "Random"})`,
                tests.sugar || "-",
                "mg/dL",
                getSugarRange(tests.sugarType),
                getSugarStatus(tests.sugar, tests.sugarType)
            ],
        ],
        theme: "grid",
        headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold", halign: "center" },
        bodyStyles: { textColor: darkText, halign: "center", cellPadding: 4 },
        columnStyles: {
            0: { halign: "left", fontStyle: "bold" },
            1: { fontStyle: "bold", halign: "center" },
            4: { fontStyle: "bold" }
        },
        didParseCell: function (data) {
            if (data.section === 'body' && data.column.index === 4) {
                const status = data.cell.raw;
                const color = getStatusColor(status);
                data.cell.styles.textColor = color;
            }
        },
        margin: { left: 15, right: 15 },
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // --- BMI ANALYSIS SECTION ---
    if (bmiData && bmiData.bmi) {
        doc.setDrawColor(secondaryColor);
        doc.line(15, yPos, pageWidth - 15, yPos);
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text("BMI ANALYSIS", pageWidth / 2, yPos - 3, { align: "center" });

        yPos += 8;

        let headerColor = [22, 163, 74];
        const cat = (bmiData.category || "").toLowerCase();
        if (cat.includes("underweight")) headerColor = [0, 0, 255];
        else if (cat.includes("healthy") || cat.includes("normal")) headerColor = [22, 163, 74];
        else if (cat.includes("overweight")) headerColor = [255, 165, 0];
        else if (cat.includes("obese")) headerColor = [220, 38, 38];

        doc.setFillColor(...headerColor);
        doc.rect(15, yPos, pageWidth - 30, 20, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("BMI", 20, yPos + 8);
        doc.text("calculated value", 70, yPos + 8);
        doc.text("Status:", 140, yPos + 8);

        doc.setFontSize(16);
        doc.text(String(bmiData.bmi), 70, yPos + 16);
        doc.text(bmiData.category || "-", 140, yPos + 16);

        yPos += 35;

        const barWidth = (pageWidth - 30) / 4;
        const barHeight = 15;
        const startX = 15;

        const sections = [
            { label: "Underweight\n< 18.5", color: [0, 0, 255] },
            { label: "Healthy\n18.5 – 24.9", color: [0, 255, 0] },
            { label: "Overweight\n25 – 29.9", color: [255, 165, 0] },
            { label: "Obese\n>30", color: [255, 0, 0] }
        ];

        sections.forEach((section, index) => {
            const x = startX + (index * barWidth);
            doc.setFillColor(...section.color);
            doc.rect(x, yPos, barWidth, barHeight, "F");
            doc.setDrawColor(0);
            doc.rect(x, yPos, barWidth, barHeight);

            doc.setTextColor(0);
            if (index === 0 || index === 3) doc.setTextColor(255);

            const lines = doc.splitTextToSize(section.label, barWidth - 2);
            doc.text(lines, x + 2, yPos + 5);
        });
    }

    if (bmiChart) {
        yPos += 20;
        doc.setFontSize(10);
        doc.setTextColor(primaryColor);
        doc.text("BMI Reference Chart", pageWidth / 2, yPos, { align: "center" });
        const chartWidth = 90;
        const chartHeight = 45;
        const chartX = (pageWidth - chartWidth) / 2;
        doc.addImage(bmiChart, "JPG", chartX, yPos + 2, chartWidth, chartHeight);
    }

    const footerY = 270;
    doc.setDrawColor("#E5E7EB");
    doc.line(15, footerY, pageWidth - 15, footerY);

    doc.setFontSize(9);
    doc.setTextColor(lightText);
    doc.setFont("helvetica", "normal");
    doc.text("Consultant Physician", 15, footerY + 10);

    doc.setTextColor(primaryColor);
    if (signature) {
        doc.addImage(signature, "PNG", pageWidth - 60, footerY + 2, 40, 15);
    }

    doc.setFontSize(8);
    doc.setTextColor("#9CA3AF");
    doc.text(
        "This report is electronically generated and is valid without a physical signature.",
        pageWidth / 2,
        290,
        { align: "center" }
    );

    return doc;
};

/**
 * Generates and downloads the PDF report.
 */
export const generateMedicalReport = (patient, tests, bmiData) => {
    const doc = createReportDoc(patient, tests, bmiData);
    const fileName = `${(patient.name || "Report").replace(/\s+/g, "_")}_Medical_Report.pdf`;
    doc.save(fileName);
};

/**
 * Generates the PDF report and returns it as a File object.
 */
export const generateMedicalReportFile = (patient, tests, bmiData) => {
    const doc = createReportDoc(patient, tests, bmiData);
    const blob = doc.output("blob");
    const fileName = `${(patient.name || "Report").replace(/\s+/g, "_")}_Medical_Report.pdf`;
    return new File([blob], fileName, { type: "application/pdf" });
};
