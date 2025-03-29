"use client";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialOptions = [
    { id: "1", text: "Your friend smiles and shares with you later.", answer: "You share your toy." },
    { id: "2", text: "You don’t have lunch at school.", answer: "You forget your lunchbox." },
    { id: "3", text: "They get distracted and can’t focus on their book.", answer: "You talk loudly while someone is reading." },
    { id: "4", text: "They smile and feel happy.", answer: "You say “Thank you.”" },
    { id: "5", text: "Someone steps on your toys and gets hurt.", answer: "You don’t clean up your toys." },
    { id: "6", text: "Your teacher gives you a sticker for being kind.", answer: "-" },
    { id: "8", text: "Your parents give you an extra bedtime story.", answer: "-" },
];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export default function DragDropOptions() {
    const alertTriggered = useRef(false);
    const [sections, setSections] = useState(null);

    useEffect(() => {
        const shuffledOptions = shuffleArray([...initialOptions]);
        const allDropZones = [...new Set(initialOptions.map(item => item.answer).filter(ans => ans !== "-"))];

        setSections({
            options: shuffledOptions.map(item => ({ ...item, color: "bg-yellow-500" })),
            ...Object.fromEntries(allDropZones.map(zone => [zone, []])),
        });
    }, []);

    if (!sections) return null; // Prevents rendering until state is initialized

    const onDragEnd = (result) => {
        if (!result.destination) return;

        setSections((prevSections) => {
            const sourceList = [...prevSections[result.source.droppableId]];
            const destinationList = [...(prevSections[result.destination.droppableId] || [])];

            const [movedItem] = sourceList.splice(result.source.index, 1);

            if (!destinationList.some(item => item.id === movedItem.id)) {
                destinationList.splice(result.destination.index, 0, movedItem);
            }

            return {
                ...prevSections,
                [result.source.droppableId]: sourceList,
                [result.destination.droppableId]: destinationList,
            };
        });
    };

    const handleSubmit = () => {
        if (alertTriggered.current) return;
        alertTriggered.current = true;

        let correctCount = 0;
        let totalCount = 0;

        const updatedSections = { ...sections };

        Object.keys(updatedSections).forEach((sectionKey) => {
            if (sectionKey !== "options") {
                updatedSections[sectionKey] = updatedSections[sectionKey].map((item) => {
                    const isCorrect = item.answer === sectionKey;
                    if (isCorrect) correctCount++;
                    totalCount++;
                    return { ...item, color: isCorrect ? "bg-green-500" : "bg-red-500" };
                });
            }
        });

        setSections(updatedSections);

        setTimeout(() => {
            alert(correctCount === totalCount && totalCount > 0 ? "Yay! All answers are correct!" : "Oops! Some answers are incorrect.");
            alertTriggered.current = false;
        }, 200);
    };

    return (
        <div className="relative h-screen p-5 flex flex-col sequenceContainerX">
            <DragDropContext onDragEnd={onDragEnd}>
                <h1 className="text-center font-semibold text-[22px] mb-4">Decisions</h1>
                <div className="flex flex-row gap-4 w-full overflow-x-auto">
                    {Object.keys(sections).filter(key => key !== "options").map((sectionKey) => (
                        <Droppable key={sectionKey} droppableId={sectionKey}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="w-64 min-h-[200px] p-4 bg-gray-100 rounded-lg shadow-lg d2 flex-shrink-0">
                                    <h2 className="text-lg font-semibold mb-2 text-center"><u>{sectionKey}</u></h2>
                                    {sections[sectionKey]?.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${item.color} text-white p-2 mb-2 rounded-md cursor-pointer`}>
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

                <div className="flex justify-center mt-4">
                    <button onClick={handleSubmit} className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-green-700 transition duration-300">
                        Submit
                    </button>
                </div>

                <div className="absolute bottom-10 w-full flex justify-center p-2 bg-blue-500">
                    <Droppable droppableId="options">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-full p-4 flex flex-wrap gap-2 justify-center">
                                <h2 className="w-full text-lg font-semibold text-center text-white mb-2">Consequences</h2>
                                {sections.options.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white text-black p-2 rounded-md cursor-pointer transition duration-300 hover:bg-green-500 hover:text-white">
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
