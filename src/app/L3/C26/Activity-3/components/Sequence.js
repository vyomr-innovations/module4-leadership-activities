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
