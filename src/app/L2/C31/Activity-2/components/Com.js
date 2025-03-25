'use client'

import './style.css'

import S1_C1 from '../assets/s1/c1.jpeg'
import S1_C2 from '../assets/s1/c2.jpeg'

import S2_C1 from '../assets/s2/c1.jpeg'
import S2_C2 from '../assets/s2/c2.jpeg'

import Image from 'next/image';

import { useState } from 'react'
import jsPDF from "jspdf";

export default function Mystery() {
    const [inputErr, setInputErr] = useState(false)
    const [c1Ans, setC1Ans] = useState({})
    const [c2Ans, setC2Ans] = useState({})
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            c1: S1_C1,
            c2: S1_C2,
            heading: "Grandma’s Birthday Dinner",
            c1_name: "Lena",
            c2_name: "Ryan",
            c1_obj: "Lena wants to take Grandma to Grandma’s favorite restaurant because it serves her favorite soup.",
            c2_obj: "Ryan wants to have a home-cooked dinner because Grandma always says she loves family meals.",
            c1_questions: [
                "Why does Lena feel taking grandma to a restaurant is a better idea?",
                "What solution would be fair as per Lena?",
                "How can Lena show open-mindedness?"
            ],
            c2_questions: [
                "Why does Ryan feel having a home-cooked dinner is a better idea?",
                "What solution would be fair as per Ryan?",
                "How can Ryan show open-mindedness?"
            ]
        },
        {
            c1: S2_C1,
            c2: S2_C2,
            heading: "Choosing a Class Pet",
            c1_name: "Liam",
            c2_name: "Sophia",
            c1_obj: "Liam wants a turtle because he thinks it’s easy to take care of.",
            c2_obj: "Sophia wants a bunny because she loves fluffy animals.",
            c1_questions: [
                "Why does Liam think having a turtle is a better option?",
                "What solution would be fair as per Liam?",
                "How can Liam show open-mindedness?"
            ],
            c2_questions: [
                "Why does Sophia think having a bunny is a better option?",
                "What solution would be fair as per Sophia?",
                "How can Sophia show open-mindedness?"
            ]
        }
    ]

    const validatedAllAns = () => {
        let s = currentObjIndex === 0 ? 's0' : 's1'
        let err = false
        if (!c1Ans[s + '_c1_0'] || !c1Ans[s + '_c1_1'] || !c1Ans[s + '_c1_2']) {
            err = true
        }
        if (!c2Ans[s + '_c2_0'] || !c2Ans[s + '_c2_1'] || !c2Ans[s + '_c2_2']) {
            err = true
        }
        // console.log(c1Ans)
        // console.log(c2Ans)
        return err
    }

    const handleSubmit = () => {
        if (!validatedAllAns()) {
            let makeEmpty = false
            if (currentObjIndex < obj.length - 1) {
                setCurrentObjIndex(prevCurrentObjIndex => prevCurrentObjIndex + 1)
                makeEmpty = true
            }
            else {
                generatePDF()
            }

            if (makeEmpty) {
                document.querySelectorAll("textarea:not([readonly])").forEach(textarea => {
                    textarea.value = "";
                });
            }
        }
        else {
            setInputErr(true)
        }
    }


    const generatePDF = () => {
        const doc = new jsPDF();
        let pageHeight = doc.internal.pageSize.height;
        let margin = 10;
        let y = margin; // Start position for text

        doc.setFontSize(16);
        doc.text("Activity : See It from Both Sides!", margin, y);
        y += 10;

        obj.forEach((scenario, index) => {
            if (y + 20 > pageHeight) {
                doc.addPage();
                y = margin;
            }

            doc.setFontSize(14);
            doc.text(scenario.heading, margin, y);
            y += 10;

            doc.setFontSize(13);
            doc.text(scenario.c1_obj, margin, y);
            y += 10;

            doc.setFontSize(13);
            doc.text(scenario.c2_obj, margin, y);
            y += 10;

            doc.setFontSize(12);
            doc.text(`${scenario.c1_name}'s Perspective`, margin, y);
            y += 10;

            scenario.c1_questions.forEach((q, i) => {
                if (y + 20 > pageHeight) {
                    doc.addPage();
                    y = margin;
                }

                doc.text(`Q: ${q}`, margin, y);
                y += 5;

                let wrappedText = doc.splitTextToSize(c1Ans[`s${index}_c1_${i}`] || "No answer provided", 180);
                doc.text(wrappedText, margin + 5, y);
                y += wrappedText.length * 5 + 5;
            });

            doc.text(`${scenario.c2_name}'s Perspective`, margin, y);
            y += 10;

            scenario.c2_questions.forEach((q, i) => {
                if (y + 20 > pageHeight) {
                    doc.addPage();
                    y = margin;
                }

                doc.text(`Q: ${q}`, margin, y);
                y += 5;

                let wrappedText = doc.splitTextToSize(c2Ans[`s${index}_c2_${i}`] || "No answer provided", 180);
                doc.text(wrappedText, margin + 5, y);
                y += wrappedText.length * 5 + 5;
            });

            y += 10;
        });

        doc.save("See It from Both Sides.pdf");
    };


    

    const handleTextBoxChange = (e, char, ansId) => {
        setInputErr(false)
        const val = e.target.value
        let newAnsId = ansId;
        newAnsId = `s${currentObjIndex}_${char}_${newAnsId}`;
        const ans = {
            [newAnsId]: val
        }
        if (char == "c1") {
            setC1Ans((prevC1Ans) => ({ ...prevC1Ans, ...ans }));
        } else if (char == "c2") {
            setC2Ans((prevC2Ans) => ({ ...prevC2Ans, ...ans }));
        }

    }

    return (
        <div className="mainCon">
            <center>
                <h1 className='heading'>{obj[currentObjIndex]["heading"]}</h1>
                <div className='storyCon'>
                    <div className='storyCon_1'>
                        <Image src={obj[currentObjIndex]["c1"]} alt='char1' />
                        <p>{obj[currentObjIndex]["c1_obj"]}</p>
                        <Image src={obj[currentObjIndex]["c2"]} alt='char1' />
                        <p>{obj[currentObjIndex]["c2_obj"]}</p>
                    </div>
                </div>

                {inputErr &&
                    <h1 className='m-4 text-[18px] text-red-500 font-semibold' >Please ensure that all input fields are filled*</h1>
                }

                <table className="table-auto border-collapse w-full text-center border border-gray-300 rounded-lg overflow-hidden">

                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border border-gray-300 px-4 py-2" >Question for {obj[currentObjIndex]["c1_name"]}'s Perspective</th>
                            <th className="border border-gray-300 px-4 py-2" >{obj[currentObjIndex]["c1_name"]}'s Perspective</th>
                            <th className="border border-gray-300 px-4 py-2" >Question for {obj[currentObjIndex]["c2_name"]}'s Perspective</th>
                            <th className="border border-gray-300 px-4 py-2" >{obj[currentObjIndex]["c2_name"]}'s Perspective</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="odd:bg-gray-100 even:bg-white">
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c1_questions"][0]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c1", "0")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c2_questions"][0]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c2", "0")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                        </tr>

                        <tr className="odd:bg-gray-100 even:bg-white">
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c1_questions"][1]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c1", "1")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c2_questions"][1]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c2", "1")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                        </tr>

                        <tr className="odd:bg-gray-100 even:bg-white">
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c1_questions"][2]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c1", "2")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    readOnly
                                    defaultValue={obj[currentObjIndex]["c2_questions"][2]}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                                <textarea
                                    onChange={(e) => handleTextBoxChange(e, "c2", "2")}
                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    onClick={handleSubmit}
                    className='submitBtn'>
                    Submit
                </button>
            </center>
        </div>
    );
}
