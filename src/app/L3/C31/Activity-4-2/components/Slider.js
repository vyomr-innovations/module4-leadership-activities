'use client'

import './style.css'

import C1 from '../assets/c1.jpeg'
import C2 from '../assets/c2.jpeg'
import Image from 'next/image'
import jsPDF from "jspdf";
import { useState } from 'react';

export default function Slider() {
    const [inputErr, setInputErr] = useState(false)
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [selectedOpi, setSelectedOpi] = useState(-1)

    const [allInputs, setAllInputs] = useState({})
    const [selectedOpiToCarry, setSelectedOpiToCarry] = useState({})

    const frameWorkQ = [
        "Acknowledge the other person’s opinion",
        "Share your own perspective without judging",
        "Find Common Ground"
    ]

    const obj = [
        {
            char: C1,
            scenario: "Playing Video Games vs. Playing Outside",
            opi: [
                "Playing video games is better",
                "Playing outside is better"
            ],
            opiStatement: [
                "Emma believes playing outside is better than playing video games!",
                "Emma believes playing video games is better than playing outside!"
            ]
        },
        {
            char: C2,
            scenario: "Having a Set Bedtime vs. Choosing Your Own Bedtime",
            opi: [
                "Should have a set bedtime",
                "Should choose their own bedtime"
            ],
            opiStatement: [
                "Max believes kids should be allowed to choose their own bedtime!",
                "Max believes kids should have a set bedtime! "
            ]
        }
    ]



    const validatedAllAns = () => {
        let err = false
        let s = currentObjIndex === 0 ? 's0' : 's1'
        if (!allInputs[s] || Object.entries(allInputs[s]).length !== 3) {
            err = true
        } else {
            let noneOfThemAreEmpty = Object.values(allInputs[s]).every(value => Boolean(value));
            if (!noneOfThemAreEmpty) {
                err = true
            }
        }
        return err
    }


    const handleSubmit = () => {
        if (!validatedAllAns()) {
            let makeEmpty = false
            if (currentObjIndex < obj.length - 1) {
                setSelectedOpi(-1)
                setCurrentObjIndex(prevCurrentObjIndex => prevCurrentObjIndex + 1)
                makeEmpty = true
            }
            else {
                // console.log(allInputs)
                // console.log(selectedOpiToCarry)
                generatePDF()
            }

            if (makeEmpty) {
                document.querySelectorAll("textarea").forEach(textarea => {
                    textarea.value = "";
                });
            }
        }
        else {
            setInputErr(true)
        }
    }


    const handleOpiSelection = (opiSelectedIndex) => {
        const s = `s${currentObjIndex}`

        if (!selectedOpiToCarry[s]) {
            setSelectedOpiToCarry((prevSelectedOpiToCarry) => ({
                ...prevSelectedOpiToCarry, [s]: {
                    scenario: obj[currentObjIndex]["scenario"],
                    opiStatement: obj[currentObjIndex]["opiStatement"][opiSelectedIndex]
                }
            }))
            if (!allInputs[s]) {
                setAllInputs((prevAllInputs) => ({ ...prevAllInputs, [s]: {} }))
                setSelectedOpi(opiSelectedIndex)
            }
        } else {
            alert('Please refresh the page to change the choice')
        }
    }


    const handleTextBoxChange = (e, ansId) => {
        setInputErr(false)
        const val = e.target.value
        const s = `s${currentObjIndex}`
        if (allInputs[s]) {
            allInputs[s][ansId] = val
        } else {
            setAllInputs((prevAllInputs) => ({ ...prevAllInputs, [s]: { ansId: val } }))
        }
    }


    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth() - 20; // Adjusting for margin
        let y = 10;

        doc.setFontSize(16);
        doc.text("The Art of Respectful Disagreement", 10, y);
        y += 10;

        Object.keys(selectedOpiToCarry).forEach((key, index) => {
            const scenarioData = selectedOpiToCarry[key];
            const userResponses = allInputs[key] || {};

            doc.setFontSize(14);
            let scenarioText = `Scenario ${index + 1}: ${scenarioData.scenario}`;
            let wrappedScenario = doc.splitTextToSize(scenarioText, pageWidth);
            doc.text(wrappedScenario, 10, y);
            y += wrappedScenario.length * 7; // Adjust line spacing

            doc.setFontSize(12);
            let opinionText = `Opinion: ${scenarioData.opiStatement}`;
            let wrappedOpinion = doc.splitTextToSize(opinionText, pageWidth);
            doc.text(wrappedOpinion, 10, y);
            y += wrappedOpinion.length * 7;

            frameWorkQ.forEach((question, i) => {
                let wrappedQuestion = doc.splitTextToSize(`${i + 1}. ${question}`, pageWidth);
                doc.text(wrappedQuestion, 10, y);
                y += wrappedQuestion.length * 7;

                let responseText = `Response: ${userResponses[i] || "Not provided"}`;
                let wrappedResponse = doc.splitTextToSize(responseText, pageWidth);
                doc.text(wrappedResponse, 15, y);
                y += wrappedResponse.length * 7 + 5;
            });

            y += 10; 

            if (y > 270) {
                doc.addPage();
                y = 10;
            }
        });

        doc.save("The Art of Respectful Disagreement.pdf");
    };


    return (
        <div className='slidesMainContainer'>
            <h1 className='scenario'>Scenario : {obj[currentObjIndex]["scenario"]}</h1>
            {selectedOpi === -1 &&
                <div className='optionsCon'>
                    <p className='text-[17px] font-semibold'>Select one option</p>
                    <button onClick={() => handleOpiSelection(0)}>
                        {obj[currentObjIndex]["opi"][0]}
                    </button>
                    <button onClick={() => handleOpiSelection(1)}>
                        {obj[currentObjIndex]["opi"][1]}
                    </button>
                </div>
            }

            {selectedOpi > -1 &&
                <div className='statementCon'>
                    <Image className='char' src={obj[currentObjIndex]["char"]} alt='char' />
                    <h1 className='statement'>Statement : {obj[currentObjIndex]["opiStatement"][selectedOpi]}</h1>
                </div>
            }

            {inputErr &&
                <h1 className='m-4 text-[18px] text-red-500 font-semibold' >Please ensure that all input fields are filled*</h1>
            }

            {selectedOpi > -1 &&
                <div className='qna1'>
                    {frameWorkQ.map((q, i) => (
                        <div className='listCon' key={i}>
                            <h2>{q}</h2>
                            <textarea
                                onChange={(e) => handleTextBoxChange(e, i)}
                                className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </textarea>

                        </div>
                    ))}
                </div>
            }

            {selectedOpi > -1 &&
                <button
                    className='submitBtn'
                    onClick={handleSubmit}>Submit</button>
            }
        </div>
    );
}
