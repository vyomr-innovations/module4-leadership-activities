'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import S4 from '../assets/s4.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            heading: "",
            text: "Imagine you’re standing at the edge of a busy road. Would you just run across without looking?",
            choices: [
                "Wait, look both ways, and cross only when the road is completely clear.",
                "Cross quickly before a car gets too close."
            ],
            choice1_CC: [
                "This might take a little longer, but it ensures you stay safe"
            ],
            choice2_CC: [
                "Sounds fast, but it's dangerous! If the car speeds up or doesn’t see you, you will hurt yourself"
            ],
            ans: 0
        },
        {
            img: S2,
            heading: "Lost & Found",
            text: "Rhyan is walking on the playground when he sees a $10 bill on the ground. No one is around, and he doesn’t know who lost it. What should he do?",
            choices: [
                "Keep the money and buy a treat for himself.",
                "Take it to the teacher or the lost and found."
            ],
            choice1_CC: [
                "Rhyan enjoys a treat, but later feels guilty.",
                "The real owner might be upset."
            ],
            choice2_CC: [
                "The teacher thanks Rhyan.",
                "The rightful owner gets their money back and is happy.",
            ],
            ans: 1
        },
        {
            img: S3,
            heading: "The Homework Shortcut",
            text: "Lily has homework due tomorrow. Her friend tells her, ‘Just copy my answers, and we’ll both save time!’ What should she do?",
            choices: [
                "Do the work herself, even if it takes longer.",
                "Copy the answers to save time."
            ],
            choice1_CC: [
                "She understands the topic better.",
                "She feels proud of her effort"
            ],
            choice2_CC: [
                "Lily finishes quickly, but doesn’t learn the topic. ",
                "The teacher might find out, and she feels guilty."
            ],
            ans: 0
        },
        {
            img: S4,
            heading: "The School Project vs. Soccer Game",
            text: "Alex's teacher gave a group project due tomorrow. His friends invite him to play soccer after school. He really wants to go, but his team is counting on him to finish his part. What should he do?",
            choices: [
                "Go play soccer with his friends and finish the project later at night.",
                "Finish his project first, then ask if he can join soccer afterward."
            ],
            choice1_CC: [
                "Alex has fun playing but is tired later.",
                "He struggles to finish, and his team is upset."
            ],
            choice2_CC: [
                "His team is happy because he finished his work.",
                "He still gets to play a little soccer.",
            ],
            ans: 1
        },
    ]


    const [currentSolutionObj, setCurrentSolutionObj] = useState([])
    const stopArr = [
        "STOP", "Think", "Options", "Pick"
    ]

    const [choicesMade, setChoicesMade] = useState({})
    const [tempChoice1_CC, setTempChoice1_CC] = useState([])
    const [tempChoice2_CC, setTempChoice2_CC] = useState([])

    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
        setCurrentSolutionObj([])
        setTempChoice1_CC([])
        setTempChoice2_CC([])
        setChoicesMade({})
    }

    const updateSolution = () => {
        const len = currentSolutionObj.length
        if (len < stopArr.length) {
            setCurrentSolutionObj([...currentSolutionObj, stopArr[len]]);
        }
    };

    const handleOptSelection = (choice_index) => {
        updateSolution()
        let temp_choice = []
        if (choice_index === 0 && obj[currentObjIndex]["choice1_CC"].length > 0) {
            temp_choice = obj[currentObjIndex]["choice1_CC"]
            setTempChoice1_CC(temp_choice)
            setChoicesMade((prevChoiceMade) => ({ ...prevChoiceMade, choice1_CC: true }));
        } else if (choice_index === 1 && obj[currentObjIndex]["choice2_CC"].length > 0) {
            temp_choice = obj[currentObjIndex]["choice2_CC"]
            setTempChoice2_CC(temp_choice)
            setChoicesMade((prevChoiceMade) => ({ ...prevChoiceMade, choice2_CC: true }));
        }
    }

    const showNextBtn = () => {
        let showNextBtn = false
        if ((choicesMade["choice1_CC"] && choicesMade["choice2_CC"])
            && currentSolutionObj.length === stopArr.length
            && currentObjIndex < obj.length - 1) {
            showNextBtn = true
        }
        return showNextBtn
    }

    return (
        <div className='slidesMainContainer'>
            <div className="flex gap-4">
                <div className="w-1/2 bg-blue-500 p-4 text-white leftCon">
                    <h1 className='headingOg'>{obj[currentObjIndex]["heading"]}</h1>
                    <h1 className="heading">{obj[currentObjIndex]["text"]}</h1>
                    <Image alt="currentObjIndex" className='currentObj' src={obj[currentObjIndex]["img"]} />

                </div>
                <div className="w-1/2 bg-green-500 p-4 text-white rightCon">
                    {currentSolutionObj.map((value, index) => (
                        <div key={index} >
                            <div className="bg-white text-black text-[19px] px-2 py-1 rounded-lg mb-5 solutionPara">
                                <p className='sp1'>{value}</p>
                            </div>

                            <div className='rightCon3'>
                                {value === "Options" && obj[currentObjIndex]["choices"].map((choice, choice_index) => (
                                    <button onClick={() => handleOptSelection(choice_index)} key={choice_index} >{choice}</button>
                                ))}
                            </div>

                            {value === "Pick" &&
                                <div className='flex justify-evenly rightCon4'>
                                    <div className='one'>
                                        <ul className="list-disc minx-h-[100px] transition-all duration-300 ease-in-out">
                                            {choicesMade["choice1_CC"] && tempChoice1_CC.map((tempChoice_1, tempChoice_1_index) => (
                                                <li key={tempChoice_1_index} className="text-left">{tempChoice_1}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='two'>
                                        <ul className="list-disc minx-h-[100px] transition-all duration-300 ease-in-out">
                                            {choicesMade["choice2_CC"] && tempChoice2_CC.map((tempChoice_2, tempChoice_2_index) => (
                                                <li key={tempChoice_2_index} className="text-left">{tempChoice_2}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            }

                        </div>
                    ))}

                    {currentSolutionObj.length < stopArr.length - 1 &&
                        <center>
                            <button onClick={updateSolution} className="buttonS1 mt-2 p-2">
                                Update Solution
                            </button>
                        </center>
                    }

                </div>
            </div>

            <br />
            {!showNextBtn() && currentObjIndex < obj.length - 1 &&
                <p>
                    <i>
                        Note : Make sure all the options are explored and discussed to reveal the next button.
                    </i>
                </p>
            }
            {showNextBtn() &&
                <button className='buttonS1' onClick={handleNext}>Next</button>
            }
        </div>
    );
}
