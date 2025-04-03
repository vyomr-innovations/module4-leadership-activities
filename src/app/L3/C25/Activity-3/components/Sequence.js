"use client";
import './style.css'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialOptions = [
    { id: "1", text: "Encourages team members", answer: "boostsMorale" },
    { id: "2", text: "Ignores team ideas", answer: "hindersMorale" },
    { id: "3", text: "Shares responsibilities fairly", answer: "boostsMorale" },
    { id: "4", text: "Blames others unfairly", answer: "hindersMorale" },
    { id: "5", text: "Listens to ideas", answer: "boostsMorale" },
    { id: "6", text: "Excludes certain members", answer: "hindersMorale" },
    { id: "7", text: "Talks negatively often", answer: "hindersMorale" },
    { id: "8", text: "Avoids responsibility", answer: "hindersMorale" },
    { id: "9", text: "Helps struggling teammates", answer: "boostsMorale" },
    { id: "10", text: "Appreciates others' efforts", answer: "boostsMorale" },
    { id: "11", text: "Stays positive always", answer: "boostsMorale" },
    { id: "12", text: "Never takes breaks", answer: "waste" },
    { id: "13", text: "Always follows the majority", answer: "waste" },
    { id: "14", text: "Always tries to do everything alone.", answer: "waste" }
];

export default function DragDropOptions() {
    const [sections, setSections] = useState({
        options: initialOptions.map(item => ({ ...item, color: "bg-yellow-500" })), // Default yellow
        boostsMorale: [],
        hindersMorale: []
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceList = [...sections[result.source.droppableId]];
        const destinationList = [...sections[result.destination.droppableId]];

        const [movedItem] = sourceList.splice(result.source.index, 1);

        // Prevent duplicates by ensuring the item isn't already in the destination list
        if (!destinationList.some(item => item.id === movedItem.id)) {
            destinationList.splice(result.destination.index, 0, movedItem);
        }

        setSections({
            ...sections,
            [result.source.droppableId]: sourceList,
            [result.destination.droppableId]: destinationList,
        });
    };


    const handleSubmit = () => {
        const updatedSections = { ...sections };
        let correctCount = 0;
        let totalCount = 0;

        ["boostsMorale", "hindersMorale"].forEach((sectionKey) => {
            updatedSections[sectionKey] = updatedSections[sectionKey].map(item => {
                const isCorrect = item.answer === sectionKey;
                if (isCorrect) correctCount++;
                totalCount++;
                return { ...item, color: isCorrect ? "bg-green-500" : "bg-red-500" };
            });
        });

        setSections(updatedSections);
        setTimeout(function () {
            if (correctCount === totalCount) {
                alert("Yeh! All answers are correct!");
            } else {
                alert("Oops! your answers are incorrect.");
            }
        }, 200)
    };


    const showSubmitBtn = () => {
        let show = false;
        
        if (sections.options.length === 0) {
            show = true;
        } else if (sections.options.length === 3) {
            show = true;
            for (let i = 0; i < sections.options.length; i++) {
                if (sections.options[i]["id"] !== "12" && 
                    sections.options[i]["id"] !== "13" && 
                    sections.options[i]["id"] !== "14") {
                    show = false;
                    break;
                }
            }
        }
    
        return show;
    };
    
    return (
        <div className="relative h-screen p-5 flex flex-col sequenceConatinerX">
            <DragDropContext onDragEnd={onDragEnd}>

                {/* Top Sections */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    {["boostsMorale", "hindersMorale"].map((sectionKey) => (
                        <Droppable key={sectionKey} droppableId={sectionKey}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-64 min-h-[500px] p-4 bg-gray-100 rounded-lg shadow-lg d2"
                                >
                                    <h2 className="text-lg font-semibold mb-2 text-center">
                                        <u>
                                            {sectionKey === "boostsMorale"
                                                ? "Boosts Morale"
                                                : sectionKey === "hindersMorale"
                                                    ? "Hinders Morale"
                                                    : "Are Options"}
                                        </u>
                                    </h2>
                                    {sections[sectionKey].map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`${item.color} text-white p-2 mb-2 rounded-md cursor-pointer`}
                                                >
                                                    {item.text}
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


                {/* {(sections.options.length === 0 || (sections.options.length === 1 && sections.options[0]['id'] === '12')) && ( */}
                {showSubmitBtn() && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                )}

                {/* Bottom Options Section */}
                <div className="absolute bottom-10 w-full flex justify-center p-2 bg-blue-500">
                    <Droppable droppableId="options">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-full p-4 flex flex-wrap gap-2 justify-center"
                            >
                                <h2 className="w-full text-lg font-semibold text-center text-white mb-2">Options</h2>
                                {sections.options.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white text-black p-2 rounded-md cursor-pointer transition duration-300 hover:bg-green-500 hover:text-white"
                                            >
                                                {item.text}
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
    );
}