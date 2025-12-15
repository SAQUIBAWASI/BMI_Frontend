import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Changed import
import bmiChart from "../assets/bmi chart.jpg";
import logo from "../assets/logo.png";

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
    doc.text("Timely Health", 45, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#E5E7EB");
    // doc.text("Excellence in Pathology & Diagnostics", 45, 26);
    doc.text("Growth | Clinic | Lab | Pharmacy", 45, 26);
    doc.text("3rd Floor, Sri Sai Balaji Avenue, VIP Hills, Madhapur, Hyderabad – 500081", 45, 31);

    // Report Title Box (Right side)
    // doc.setFillColor(secondaryColor);
    // doc.roundedRect(pageWidth - 85, 12, 70, 16, 2, 2, "F");
    // doc.setFontSize(12);
    // doc.setTextColor("#FFFFFF");
    // doc.text("MEDICAL HEALTH REPORT", pageWidth - 50, 22, { align: "right" });

    // --- PATIENT DETAILS SECTION ---
    let yPos = 55;

    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, yPos, pageWidth - 15, yPos);

    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT INFORMATION", 15, yPos - 3);

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
    doc.text(patient.name || "-", col1, yPos);
    doc.text(patient.id || "-", col2, yPos);
    doc.text(patient.date || new Date().toLocaleDateString(), col3, yPos);

    yPos += rowGap;

    // Row 2
    doc.setTextColor(lightText);
    doc.setFont("helvetica", "normal");
    doc.text("Age / Gender", col1, yPos);
    doc.text("Contact", col2, yPos);
    doc.text("Address", col3, yPos);

    yPos += 5;
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.text(`${patient.age || "-"} Yrs / ${patient.gender || "-"}`, col1, yPos);
    doc.text(patient.phone || "-", col2, yPos);

    // Address wrap
    const addressLines = doc.splitTextToSize(patient.address || "-", 60);
    doc.text(addressLines, col3, yPos);

    // --- VITALS SECTION ---
    yPos += 20;
    doc.setDrawColor(secondaryColor);
    doc.line(15, yPos, pageWidth - 15, yPos);
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text("CLINICAL VITALS", 15, yPos - 3);

    yPos += 10;

    yPos += 10;

    // Helpers for Status
    const getSugarStatus = (val) => {
        if (!val) return "-";
        const v = Number(val);
        if (v < 70) return "Low";
        if (v <= 100) return "Normal"; // Adjusted to 100 for Fasting reference match, or keep 140 if random. Keeping standard logic.
        return "High";
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
                "70-100 (Fasting)",
                getSugarStatus(tests.sugar)
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

    yPos = doc.lastAutoTable.finalY + 20;

    // --- BMI ANALYSIS SECTION ---
    if (bmiData && bmiData.bmi) {
        doc.setDrawColor(secondaryColor);
        doc.line(15, yPos, pageWidth - 15, yPos);
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text("BMI ANALYSIS", 15, yPos - 3);

        yPos += 10;

        // Container Box for layout
        // Left: Calculated BMI (Big Box)
        // Center: Reference Table
        // Right: Graph Image

        // 1. Calculated BMI Box (Left)
        doc.setFillColor(secondaryColor);
        doc.roundedRect(15, yPos, 50, 45, 2, 2, "F");

        doc.setTextColor(255);
        doc.setFontSize(10);
        doc.text("Calculated BMI", 40, yPos + 10, { align: "center" });

        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text(String(bmiData.bmi), 40, yPos + 24, { align: "center" });

        doc.setFontSize(11);
        doc.text(bmiData.category || "-", 40, yPos + 35, { align: "center" });

        // 2. Reference Table (Center)
        const tableX = 75;
        const tableY = yPos;
        const tableW = 70;
        const tableH = 45;

        doc.setDrawColor(0); // Black border
        doc.setLineWidth(0.1);
        doc.rect(tableX, tableY, tableW, tableH);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(darkText);

        const ranges = [
            { range: "< 18.5", category: "Underweight" },
            { range: "18.5 – 24.9", category: "Healthy" },
            { range: "25 – 29.9", category: "Overweight" },
            { range: "≥ 30", category: "Obese" }
        ];

        let rowY = tableY + 8;
        const col1Input = tableX + 5;
        const col2Input = tableX + 35;

        ranges.forEach(r => {
            // Check if this is the active category
            const isActive = (bmiData.category || "").toLowerCase() === r.category.toLowerCase();

            if (isActive) {
                doc.setFont("helvetica", "bold");
                doc.setTextColor(secondaryColor);
            } else {
                doc.setFont("helvetica", "normal");
                doc.setTextColor(darkText);
            }

            doc.text(r.range, col1Input, rowY);
            doc.text(r.category, col2Input, rowY);

            if (isActive) {
                // Add a marker
                doc.text("●", col2Input + 25, rowY);
            }

            rowY += 10; // Spacing
        });


        // 3. Chart Image (Right)
        doc.addImage(bmiChart, "JPEG", 155, yPos, 40, 45);
    }

    // --- FOOTER ---
    const footerY = 270;
    doc.setDrawColor("#E5E7EB");
    doc.line(15, footerY, pageWidth - 15, footerY);

    doc.setFontSize(9);
    doc.setTextColor(lightText);
    doc.setFont("helvetica", "normal");

    doc.text("Consultant Physician", 15, footerY + 10);
    doc.text("Lab Technician", pageWidth - 40, footerY + 10);

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
