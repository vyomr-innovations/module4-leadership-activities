"use client";
import './style.css'

import Image from 'next/image'
import S1 from '../assets/scenarios/scenario_1/s1.jpeg';
import S1_C1 from '../assets/scenarios/scenario_1/c1.jpeg';
import S1_C2 from '../assets/scenarios/scenario_1/c2.jpeg';
import S1_C3 from '../assets/scenarios/scenario_1/c3.jpeg';


import Filler from './Filler'
import Challanges from './Challanges'


import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// "Activity 3": {
//     "link": "/L3/C26/Activity-3",
//     "name": "The Science Project"
// },

/*
---------------------------- Class content :
In any team project, each person has unique strengths. A successful team knows how to use those strengths wisely! Let’s practice more on assigning tasks based on people's skills. Let’s dive into a scenario where three students must work together on a project. 
After assigning tasks to appropriate students there are 2 challenges to be solved let’s get started!

Scenario:
Lily, Max, and Ethan are assigned a science project on the solar system. Their task is to create a 3 slide presentation with fun facts about various planets.

Characters Involved:
Lily – Great at drawing and designing.
Max – Knows a lot about space and science.
Ethan – Very organized and good at writing neatly.

List of Tasks:
Research fun planet facts.
Write and formulate the content neatly.
Design and decorate the presentation.

Start assigning students to do the different tasks!

Who should complete Task 1, and why?

Who should complete Task 2, and why?

Who should complete Task 3, and why?












Challenge 1: If Max is sick and can’t finish his part, who should take over research? And why?
Options : 
Lily 
Ethan




Ethan should take over the research.
Since Ethan is organized and writes neatly, he can quickly find reliable information and summarize it in a structured way.
He can ensure the facts are clear and easy to read in the slides.

Q: Why Lily is NOT the Right Choice:
A: Lily is strong in design but not in research or writing. She might struggle with finding accurate scientific information.


Challenge 2: If at the last moment, the teacher asks the team to present the presentation, who is the right choice? And why?
Options : 
Lily 
Max
Ethan


Max is the Right Choice: 
Since Max knows a lot about space and science and he has done the research, he can confidently explain the facts without just reading from the slides.

Q: Why Ethan is NOT the Right Choice:
A: Ethan is organized and writes neatly, but he may not have deep knowledge of space to explain concepts clearly.
If someone asks a follow-up question, Ethan might struggle to answer beyond what’s written on the slides.

Q: Why Lily is NOT the Right Choice:
A: Lily focused on design, so she might not be familiar with all the facts in detail.




Ask the student to open activity 3





Ask the student to click on the start button.
In the bottom of the screen all the characters are present.

















Encourage the student to answer, and once the student has finaled who will be assigned, ask the student to drag that character and drop it in its respective task box.
Note: Once a character is placed in a task box, hover over them to view their name and skills.


Once done, ask the student to click on the "Complete" button. A popup will come, if the tasks are properly assigned activity will move to the challenge section, otherwise, students must adjust before proceeding.

Answer for teacher : 
Task 1 : Max 
Task 2 : Ethan
Task 3 : Lily 





The student has to make the choice by clicking on the student image. 
If the answer is correct the activity will move to the next challenge, otherwise, students re-think on the answer.












---------------------------- Teacher write up :
The student has to make the choice by clicking on the student image. 
If the answer is correct the activity is completed, otherwise, students re-think on the answer.

*/


export default function DragDropOptions() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [isSVisible, setIsSVisible] = useState(true)
    const obj = [
        {
            heading: 'The Science Project',
            img: S1,
            subHeading: 'Lily, Max, and Ethan are assigned a science project on the solar system. Their task is to create a 3 slide presentation with fun facts about various planets.',
            tasks: [
                'Research fun planet facts.',
                'Write and formulate the content neatly.',
                'Design and decorate the presentation.'
            ],
            chars: [
                { id: 1, name: 'Lily', img: S1_C1, skills: ['Great at drawing and designing.'] },
                { id: 2, name: 'Max', img: S1_C2, skills: ['Knows a lot about space and science.'] },
                { id: 3, name: 'Ethan', img: S1_C3, skills: ['Very organized and good at writing neatly.'] }
            ],
            ans: [
                [2], [3], [1]
            ]
        }
    ];

    const currentObj = obj[currentObjIndex];

    const [sections, setSections] = useState({});

    useEffect(() => {
        if (currentObjIndex < obj.length) {
            const newObj = obj[currentObjIndex];
            setSections({
                ...Object.fromEntries(newObj.tasks.map(task => [task, []])),
                characters: newObj.chars.map(char => ({ ...char, color: "bg-blue-500" }))
            });
        }
    }, [currentObjIndex]);


    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceList = [...sections[result.source.droppableId]];
        const destinationList = [...sections[result.destination.droppableId]];

        const [movedItem] = sourceList.splice(result.source.index, 1);
        if (!destinationList.some(item => item.name === movedItem.name)) {
            destinationList.splice(result.destination.index, 0, movedItem);
        }

        setSections({
            ...sections,
            [result.source.droppableId]: sourceList,
            [result.destination.droppableId]: destinationList,
        });
    };

    const handleSubmit = () => {
        let rightAns = 0;
        currentObj.tasks.forEach((task, taskIndex) => {
            if (sections[task] && sections[task].length > 0) {
                if (currentObj["ans"][taskIndex].includes(sections[task][0]["id"])) {
                    rightAns++
                }
            }
        })
        if (rightAns == currentObj.tasks.length) {
            alert('Yeh! The answer is correct')
            setCurrentObjIndex((prevIndex) => prevIndex + 1);
            setIsSVisible(true)
        } else {
            alert('Oops! The answe is incorrect')
        }
    }

    const handleStart = () => {
        setIsSVisible(false)
    }
    return (
        <div>
            {currentObjIndex < obj.length ? (
                <div>
                    {isSVisible ?
                        (
                            <Filler
                                heading={currentObj.heading}
                                subHeading={currentObj.subHeading}
                                imagex={currentObj.img}
                                handleStart={handleStart}
                            />
                        ) : (
                            <div className="relative h-screen flex flex-col">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    {/* Horizontal Task Containers */}
                                    <div className="flex justify-center gap-6 mt-6">
                                        {currentObj.tasks.map((task) => (
                                            <Droppable key={task} droppableId={task}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[120px] p-4 bg-gray-100 rounded-lg shadow-lg text-center">
                                                        <h2 className="font-semibold">{task}</h2>
                                                        {sections[task]?.map((char, index) => (
                                                            <Draggable key={char.name} draggableId={char.name} index={index}>
                                                                {(provided) => (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${char.color} charImgContainer text-white p-1 mb-2 rounded-md cursor-pointer`}>
                                                                        <div className="relative group inline-block">
                                                                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                                                                <Image className='charImg' src={char.img} alt='char' />
                                                                            </button>
                                                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-white text-sm bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                Name : {char.name}
                                                                                <br />
                                                                                {char.skills.map((skill, index) => (
                                                                                    <p className='charSkill' key={index}>{skill}</p>
                                                                                ))}
                                                                            </span>
                                                                        </div>

                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        ))}
                                    </div>


                                    {sections.characters && sections.characters.length === 0 &&
                                        <div className='text-center mt-6 '>
                                            <button
                                                onClick={handleSubmit}
                                                className='bg-green-600 w-[50%] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-700 transition duration-300'>Submit</button>
                                        </div>
                                    }

                                    {/* Draggable Characters Section */}
                                    <div className="absolute bottom-1 w-full flex justify-center p-2 bg-blue-500">
                                        <Droppable droppableId="characters">
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps} className="w-full p-4 flex flex-wrap gap-2 justify-center">
                                                    <h2 className="w-full text-lg font-semibold text-center text-white mb-2">Characters</h2>
                                                    {sections.characters && sections.characters.map((char, index) => (
                                                        <Draggable key={char.name} draggableId={char.name} index={index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white text-black p-1 rounded-md cursor-pointer transition duration-300 hover:bg-green-500 hover:text-white charImgContainer">
                                                                    <p className='charName'>{char.name}</p>
                                                                    <Image className='charImg' src={char.img} alt='char' />
                                                                    {char.skills.map((skill, index) => (
                                                                        <p className='charSkill' key={index}>{skill}</p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                </DragDropContext>
                            </div>
                        )}
                </div>
            ) : (
                <Challanges />
            )}
        </div>

    );
}
