import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Slider() {
    const [formData, setFormData] = useState(
        Array(3).fill({ home: "", responsible: "", kind: "" })
    );

    const handleChange = (index, field, value) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [field]: value };
        setFormData(updatedFormData);
    };


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Plan to Help at Home", 10, 10);
    
        doc.setFontSize(14);
        let yOffset = 20;
        const pageHeight = doc.internal.pageSize.height; // Get page height
    
        const generateColumn = (title, key) => {
            doc.text(title, 10, yOffset);
            yOffset += 8;
    
            formData.forEach(row => {
                if (row[key]) {
                    let text = `- ${row[key]}`;
                    let splitText = doc.splitTextToSize(text, 180); // Wrap text to fit the page width
                    let textHeight = splitText.length * 8; // Approximate height needed per text block
    
                    // If text goes beyond the page, create a new page
                    if (yOffset + textHeight > pageHeight - 20) {
                        doc.addPage();
                        yOffset = 20; // Reset yOffset for new page
                    }
    
                    doc.text(splitText, 15, yOffset);
                    yOffset += textHeight;
                }
            });
    
            yOffset += 5; // Add some spacing after each section
        };
    
        generateColumn("Helping at Home", "home");
        generateColumn("Being Responsible", "responsible");
        generateColumn("Being Kind", "kind");
    
        doc.save("Plan to Help at Home.pdf");
    };
    
  
    
    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Helping at Home, Being Responsible, Being Kind</h1>
            <div className="overflow-x-auto w-full max-w-8xl">
                <table className="w-full border-collapse border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-3 border border-gray-300">Helping at Home</th>
                            <th className="p-3 border border-gray-300">Being Responsible</th>
                            <th className="p-3 border border-gray-300">Being Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((row, index) => (
                            <tr key={index} className="bg-white hover:bg-gray-100">
                                <td className="p-3 border border-gray-300">
                                    <textarea
                                        className="w-full p-2 h-20 border border-gray-300 rounded-md"
                                        value={row.home}
                                        onChange={(e) => handleChange(index, "home", e.target.value)}
                                    />
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <textarea
                                        className="w-full p-2 h-20 border border-gray-300 rounded-md"
                                        value={row.responsible}
                                        onChange={(e) => handleChange(index, "responsible", e.target.value)}
                                    />
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <textarea
                                        className="w-full p-2 h-20 border border-gray-300 rounded-md"
                                        value={row.kind}
                                        onChange={(e) => handleChange(index, "kind", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={generatePDF}
                className="mt-4 cursor-pointer px-6 py-2 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600"
            >
                Download PDF
            </button>
        </div>
    );
}
