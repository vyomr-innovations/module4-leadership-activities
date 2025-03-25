'use client'

import './style.css'

import { useState } from 'react';
import jsPDF from "jspdf";

export default function Slider() {
    const [err, setErr] = useState(false)
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [allAns, setAllAns] = useState({})
    const obj = [
        {
            scenario: "The Playground Equipment Dilemma",
            scenarioT: "The school is getting new playground equipment. Most students (Alpha group) want a new basketball court. A smaller group (Beta group) prefers a quiet reading area because not everyone enjoys sports.",
            questions: [
                "Why does your group believe a basketball court is the best choice?",
                "Why is your group’s choice important?",
                "How would your group feel if their idea wasn’t considered?"
            ]
        },
        {
            scenario: "The Community Safety Debate",
            scenarioT: "A local town is deciding on a new safety rule. The majority (Alpha group) wants to set a curfew for all kids under 14 after 8 PM, arguing that it will keep them safe. A smaller group (Beta group) believes kids should be allowed to stay out later with parental permission, saying it’s unfair to restrict responsible kids.",
            questions: [
                "How does your group feel about the curfew?",
                "Why does your group think this is the best solution?",
                "How would your group feel if their concerns weren’t considered?"
            ]
        }
    ]


    const handleTextBoxChange = (e, groupId, ansIndex) => {
        setErr(false)
        const val = e.target.value
        const s = `s${currentObjIndex}`
        if (allAns[s]) {
            if (allAns[s][groupId]) {
                allAns[s][groupId][ansIndex] = val
            } else {
                const temp_s = allAns[s]
                temp_s[groupId] = {
                    [ansIndex]: val
                }
                setAllAns((prevAllAns) => ({
                    ...prevAllAns, [s]: temp_s
                }))
            }
        } else {
            setAllAns((prevAllAns) => ({
                ...prevAllAns, [s]: {
                    [groupId]: {
                        [ansIndex]: val
                    }
                }
            }))
        }
    }



    function isValidatedAllAns() {
        let isValid = false
        let s = currentObjIndex === 0 ? 's0' : 's1'
        if (allAns[s] && allAns[s]['alpha'] && allAns[s]['beta']) {
            if (Object.entries(allAns[s]['alpha']).length == 3 && Object.entries(allAns[s]['beta']).length == 3) {
                let noneOfThemAreEmpty_alpha = Object.values(allAns[s]['alpha']).every(value => Boolean(value));
                let noneOfThemAreEmpty_beta = Object.values(allAns[s]['beta']).every(value => Boolean(value));
                if (noneOfThemAreEmpty_alpha && noneOfThemAreEmpty_beta) {
                    isValid = true
                }
            }
        }
        return isValid
    }

    const handleSubmit = () => {
        if (isValidatedAllAns()) {
            let makeEmpty = false

            if (currentObjIndex < obj.length - 1) {
                setCurrentObjIndex(prevCurrentObjIndex => prevCurrentObjIndex + 1)
                makeEmpty = true
            }
            else {
                // console.log(allAns)
                generatePDF()
            }


            if (makeEmpty) {
                document.querySelectorAll("textarea:not([readonly])").forEach(textarea => {
                    textarea.value = "";
                });
            }

        } else {
            setErr(true)
        }
    }


    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth() - 20; // Margin
        let y = 10;

        doc.setFontSize(16);
        doc.text("Alpha vs Beta", 10, y);
        y += 10;

        obj.forEach((scenario, index) => {
            const scenarioKey = `s${index}`;
            const responses = allAns[scenarioKey] || {};

            doc.setFontSize(14);
            let scenarioText = `Scenario ${index + 1}: ${scenario.scenario}`;
            let wrappedScenario = doc.splitTextToSize(scenarioText, pageWidth);
            doc.text(wrappedScenario, 10, y);
            y += wrappedScenario.length * 7;

            doc.setFontSize(12);
            let description = `Scenario Details: ${scenario.scenarioT}`;
            let wrappedDesc = doc.splitTextToSize(description, pageWidth);
            doc.text(wrappedDesc, 10, y);
            y += wrappedDesc.length * 7;

            ["alpha", "beta"].forEach((group) => {
                doc.setFontSize(13);
                doc.text(`${group === "alpha" ? "Alpha Group" : "Beta Group"}`, 10, y);
                y += 7;

                let answer = Object.values(responses[group] || {}).join(" ")
                let wrappedAnswer = doc.splitTextToSize(`Script: ${answer}`, pageWidth);
                doc.text(wrappedAnswer, 15, y);
                y += wrappedAnswer.length * 7 + 5;

                y += 10;
                if (y > 270) {
                    doc.addPage();
                    y = 10;
                }
            });
        });

        doc.save("Alpha vs Beta.pdf");
    };


    return (
        <div className='slidesMainContainer'>
            <h1 className='scenario'>{obj[currentObjIndex]["scenario"]}</h1>
            <h1 className='scenarioT'><b>Scenario:</b> {obj[currentObjIndex]["scenarioT"]}</h1>

            <div className="flex gap-4">
                <div className="w-1/2 p-4 leftCon">
                    <h1 className='grpHeading'>Alpha Group</h1>
                    {obj[currentObjIndex]["questions"].map((question, index) => (
                        <div key={index} className='questionContaienr'>
                            <p>{question}</p>
                            <textarea
                                onChange={(e) => handleTextBoxChange(e, 'alpha', index)}
                                className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </textarea>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 p-4 rightCon">
                    <h1 className='grpHeading'>Beta Group</h1>
                    {obj[currentObjIndex]["questions"].map((question, index) => (
                        <div key={index} className='questionContaienr'>
                            <p>{question}</p>
                            <textarea
                                onChange={(e) => handleTextBoxChange(e, 'beta', index)}
                                className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </textarea>
                        </div>
                    ))}
                </div>
            </div>

            {err &&
                <h1 className='text-[18px] text-red-500 font-semibold' >Please ensure that all input fields are filled*</h1>
            }

            <button
                onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
