"use client";
import './style.css'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialOptions = [
    { id: "1", text: "Help others", answer: "canOptions" },
    { id: "2", text: "Confidence", answer: "haveOptions" },
    { id: "3", text: "Brave", answer: "areOptions" },
    { id: "4", text: "Solve problems", answer: "canOptions" },
    { id: "5", text: "Patience", answer: "haveOptions" },
    { id: "6", text: "Fair", answer: "areOptions" },
    { id: "8", text: "Honesty", answer: "haveOptions" },
    { id: "9", text: "Responsible", answer: "areOptions" },
    { id: "10", text: "Make decisions", answer: "canOptions" },
    { id: "11", text: "Kindness", answer: "haveOptions" },
    { id: "12", text: "Friendly", answer: "areOptions" },
    { id: "13", text: "Inspire people", answer: "canOptions" },
    { id: "14", text: "Respect", answer: "haveOptions" },
    { id: "15", text: "Wise", answer: "areOptions" },
    { id: "16", text: "Determination", answer: "haveOptions" }
];

export default function DragDropOptions() {
    const [sections, setSections] = useState({
        options: initialOptions.map(item => ({ ...item, color: "bg-yellow-500" })), // Default yellow
        canOptions: [],
        haveOptions: [],
        areOptions: [],
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

        ["canOptions", "haveOptions", "areOptions"].forEach((sectionKey) => {
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

    return (
        <div className="relative h-screen p-5 flex flex-col sequenceConatinerX">
            <DragDropContext onDragEnd={onDragEnd}>

                {/* Top Sections */}
                <div className="grid grid-cols-3 gap-4 w-full">
                    {["canOptions", "haveOptions", "areOptions"].map((sectionKey) => (
                        <Droppable key={sectionKey} droppableId={sectionKey}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-64 min-h-[500px] p-4 bg-gray-100 rounded-lg shadow-lg d2"
                                >
                                    <h2 className="text-lg font-semibold mb-2 text-center">
                                        <u>
                                            {sectionKey === "canOptions"
                                                ? "Can Options"
                                                : sectionKey === "haveOptions"
                                                    ? "Have Options"
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

                {/* Submit Button (Only when options are empty) */}
                {sections.options.length === 0 && (
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
