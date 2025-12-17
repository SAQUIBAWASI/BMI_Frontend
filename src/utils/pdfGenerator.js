import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Changed import
import bmiChart from "../assets/bmi chart.jpg";
import logo from "../assets/logo.png";
import signature from "../assets/signature.png";

/**
 * Generates and downloads a professional medical health report PDF.
 * @param {Object} patient - Patient details { name, age, gender, id, date, phone, address }
 * @param {Object} tests - Test results { weight, height, sugar, sugarType, systolic, diastolic, heartRate }
 * @param {Object} bmiData - Calculated BMI data { bmi, category }
 */
export const generateMedicalReport = (patient, tests, bmiData) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- COLORS ---
    const primaryColor = "#007A52"; // Green
    const secondaryColor = "#2563EB"; // Blue
    const darkText = "#1F2937";
    const lightText = "#6B7280";

    // --- HEADER ---
    // Top Green Bar
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 40, "F");

    // Logo & Hospital Name
    // doc.addImage(logo, "PNG", 15, 8, 24, 24);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#FFFFFF");
    doc.text("Timely Health", 15, 20); // Moved to left since logo is gone

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#E5E7EB");
    // doc.text("Excellence in Pathology & Diagnostics", 45, 26);
    doc.text("Growth | Clinic | Lab | Pharmacy", 15, 26);
    doc.text("3rd Floor, Sri Sai Balaji Avenue, VIP Hills, Madhapur, Hyderabad – 500081", 15, 31);

    // Report Title Box (Right side)
    // doc.setFillColor(secondaryColor);
    // doc.roundedRect(pageWidth - 85, 12, 70, 16, 2, 2, "F");
    // doc.setFontSize(12);
    // doc.setTextColor("#FFFFFF");
    // doc.text("MEDICAL HEALTH REPORT", pageWidth - 50, 22, { align: "right" });

    // --- PATIENT DETAILS SECTION ---
    let yPos = 50; // Optimized for single page

    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, yPos, pageWidth - 15, yPos);

    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    // Centered Header
    doc.text("PATIENT INFORMATION", pageWidth / 2, yPos - 3, { align: "center" });

    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(lightText);

    // Grid Layout for Patient Info
    const col1 = 15;
    const col2 = 80;
    const col3 = 140;
    const rowGap = 8;

    // Row 1
    doc.text("Patient Name", col1, yPos);
    doc.text("Patient ID", col2, yPos);
    doc.text("Date", col3, yPos);

    yPos += 5;
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.text((patient.name || "-").toUpperCase(), col1, yPos);
    doc.text(patient.id || "-", col2, yPos);
    doc.text(patient.date || new Date().toLocaleDateString(), col3, yPos);

    yPos += 5; // Reduced gap

    // Row 2 (Removed)
    // doc.setTextColor(lightText);
    // doc.setFont("helvetica", "normal");
    // doc.text("Age / Gender", col1, yPos);
    // yPos += 5;
    // doc.setTextColor(darkText);
    // doc.setFont("helvetica", "bold");
    // doc.text(`${patient.age || "-"} Yrs / ${patient.gender || "-"}`, col1, yPos);

    // Since Row 2 is removed, we don't add the extra line spacing for it.
    // yPos += 15; // Removed extra buffer

    // --- VITALS SECTION ---
    yPos += 8; // Reduced gap
    doc.setDrawColor(secondaryColor);
    doc.line(15, yPos, pageWidth - 15, yPos);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    // Centered Header
    doc.text("CLINICAL VITALS", pageWidth / 2, yPos - 3, { align: "center" });

    yPos += 8;

    // Helpers for Status
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
            // Random / Post-prandial
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
        if (status === "Normal" || status === "Healthy") return [22, 163, 74]; // Green
        if (status === "Low" || status === "High" || status === "Overweight" || status === "Obese") return [220, 38, 38]; // Red
        return [31, 41, 55]; // Dark Grey
    };

    // Using autoTable for professional grid
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
            // ["Heart Rate", tests.heartRate || "-", "bpm", "60-100", "-"],
        ],
        theme: "grid",
        headStyles: {
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: "bold",
            halign: "center",
        },
        bodyStyles: {
            textColor: darkText,
            halign: "center",
            cellPadding: 4,
        },
        columnStyles: {
            0: { halign: "left", fontStyle: "bold" }, // Test Name left aligned
            1: { fontStyle: "bold", halign: "center" }, // Observed Value bold & centered
            4: { fontStyle: "bold" } // Status column bold
        },
        didParseCell: function (data) {
            // Color the Status column based on value
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
        // Centered Header
        doc.text("BMI ANALYSIS", pageWidth / 2, yPos - 3, { align: "center" });

        yPos += 8;

        // Determine Header Color based on Category
        let headerColor = [0, 255, 0]; // Default Green (Healthy)
        const cat = (bmiData.category || "").toLowerCase();

        if (cat.includes("underweight")) headerColor = [0, 0, 255];   // Blue
        else if (cat.includes("healthy") || cat.includes("normal")) headerColor = [22, 163, 74]; // Green
        else if (cat.includes("overweight")) headerColor = [255, 165, 0]; // Orange
        else if (cat.includes("obese")) headerColor = [220, 38, 38];    // Red

        // 1. Top Status Bar (Dynamic Color)
        doc.setFillColor(...headerColor);
        doc.rect(15, yPos, pageWidth - 30, 20, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");

        // "BMI calculated value Status:"
        doc.text("BMI", 20, yPos + 8);
        doc.text("calculated value", 70, yPos + 8);
        doc.text("Status:", 140, yPos + 8);

        // Values
        doc.setFontSize(16);
        doc.text(String(bmiData.bmi), 70, yPos + 16);
        doc.text(bmiData.category || "-", 140, yPos + 16);

        yPos += 35; // Move down for scale

        // 2. Visual Scale Bar
        const barWidth = (pageWidth - 30) / 4;
        const barHeight = 15;
        const startX = 15;

        // const sections = [
        //     { label: "Underweight\n< 18.5", color: [0, 0, 255], range: [0, 18.5] }, // Blue
        //     { label: "Healthy\n18.5 – 24.9", color: [0, 255, 0], range: [18.5, 24.9] }, // Green
        //     { label: "25 – 29.9 Overweight", color: [255, 165, 0], range: [25, 29.9] }, // Orange
        //     { label: "Obese\n>30 Obese", color: [255, 0, 0], range: [30, 100] } // Red
        // ];

        const sections = [
            {
                label: "Underweight\n< 18.5",
                color: [0, 0, 255],        // Blue
                range: [0, 18.4]
            },
            {
                label: "Healthy\n18.5 – 24.9",
                color: [0, 255, 0],        // Green
                range: [18.5, 24.9]
            },
            {
                label: "Overweight\n25 – 29.9",
                color: [255, 165, 0],      // Orange
                range: [25, 29.9]
            },
            {
                label: "Obese\n>30",
                color: [255, 0, 0],        // Red
                range: [30, 100]
            }
        ];


        // Draw Dot Marker
        const bmiVal = parseFloat(bmiData.bmi);
        let markerX = startX;

        // Calculate Marker Position
        // We have 4 equal width blocks. We need to find which block the BMI falls in and map it.
        // Block 1: 0 - 18.5
        // Block 2: 18.5 - 25
        // Block 3: 25 - 30
        // Block 4: 30+ 

        let blockIndex = 0;
        let percentInBlock = 0;

        if (bmiVal < 18.5) {
            blockIndex = 0;
            percentInBlock = bmiVal / 18.5;
        } else if (bmiVal < 25) {
            blockIndex = 1;
            percentInBlock = (bmiVal - 18.5) / (25 - 18.5);
        } else if (bmiVal < 30) {
            blockIndex = 2;
            percentInBlock = (bmiVal - 25) / (30 - 25);
        } else {
            blockIndex = 3;
            // Cap at some reasonable max for visual purposes, say 40
            percentInBlock = Math.min((bmiVal - 30) / 10, 1);
        }

        markerX = startX + (blockIndex * barWidth) + (percentInBlock * barWidth);

        // Draw Marker (Black Dot)
        // doc.setFillColor(0, 0, 0);
        // doc.circle(markerX, yPos - 5, 2, "F");

        // Draw Bars
        sections.forEach((section, index) => {
            const x = startX + (index * barWidth);
            doc.setFillColor(...section.color);
            doc.rect(x, yPos, barWidth, barHeight, "F");

            // Labels
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");

            // Draw border box for label text
            doc.setDrawColor(0);
            doc.rect(x, yPos, barWidth, barHeight);

            // Text inside
            doc.setTextColor(0);
            if (index === 0) doc.setTextColor(255); // White text for dark blue
            if (index === 3) doc.setTextColor(255); // White text for red

            // Split text for multiline
            const lines = doc.splitTextToSize(section.label, barWidth - 2);
            doc.text(lines, x + 2, yPos + 5);
        });

    }

    // --- BMI VISUAL CHART IMAGE ---
    // --- BMI VISUAL CHART IMAGE ---
    if (bmiChart) {
        yPos += 20;

        doc.setFontSize(10);
        doc.setTextColor(primaryColor);

        // Center Text
        doc.text("BMI Reference Chart", pageWidth / 2, yPos, { align: "center" });

        // Center Image
        const chartWidth = 90;
        const chartHeight = 45;
        const chartX = (pageWidth - chartWidth) / 2;

        doc.addImage(bmiChart, "JPG", chartX, yPos + 2, chartWidth, chartHeight);
    }

    // --- FOOTER ---
    const footerY = 270;
    doc.setDrawColor("#E5E7EB");
    doc.line(15, footerY, pageWidth - 15, footerY);

    doc.setFontSize(9);
    doc.setTextColor(lightText);
    doc.setFont("helvetica", "normal");

    doc.text("Consultant Physician", 15, footerY + 10);
    // doc.text("Lab Technician", pageWidth - 40, footerY + 10);

    // Digital Signature (Placement above Lab Technician on Right)
    doc.setFont("ZapfDingbats"); // or styled text
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);

    // Add Signature Image
    if (signature) {
        doc.addImage(signature, "PNG", pageWidth - 60, footerY + 2, 40, 15);
    }

    // Align with Lab Technician or slightly adjusted
    // doc.text("Digitally Signed", pageWidth - 40, footerY - 5, { align: "center" });

    // Patient Name in Footer (CAPS)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(darkText);
    // doc.text(`PATIENT: ${(patient.name || "").toUpperCase()}`, pageWidth / 2, footerY + 10, { align: "center" });

    // Digital Signature Note
    doc.setFontSize(8);
    doc.setTextColor("#9CA3AF");
    doc.text(
        "This report is electronically generated and is valid without a physical signature.",
        pageWidth / 2,
        290,
        { align: "center" }
    );

    doc.save(`${(patient.name || "Report").replace(/\s+/g, "_")}_Medical_Report.pdf`);
};
