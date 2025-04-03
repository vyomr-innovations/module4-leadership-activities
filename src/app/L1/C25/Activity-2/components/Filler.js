import './style.css';
import S1 from '../assets/s1.jpeg';
import Image from 'next/image';

import { useState } from "react";

export default function Filler() {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const handleAddText = () => {
        if (text.trim() !== "") {
            setItems([...items, text]); // Add text to the list
            setText(""); // Clear input
        }
    };

    return (
        <div className="flex p-6 mt-4">
            <div className="w-1/2">
                <center>
                    <h1 className='text-[25px] font-semibold mb-4'>Maya and the Rainy Day</h1>
                    <h1 className='text-[20px] mb-4'>One day, Maya and her friends were excited to go out and play, but suddenly, it started to rain. Everyone groaned. Instead of complaining, Maya had an idea. She gathered her friends and suggested fun indoor games like “Simon Says” and a storytelling circle. Soon, laughter filled the room.</h1>
                    <Image className='rounded w-[70%]' src={S1} alt="s1" />
                </center>
            </div>


            <div className="w-1/2 flex flex-col space-y-4">

                <center>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-3/4 p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the leadership qualities"
                    />

                    <br />
                    <br />

                    <button
                        onClick={handleAddText}
                        className="px-4 py-2 bg-blue-500 text-white w-[200px] rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </center>

                <div className="mt-4">
                    {items.length > 0 &&
                        <h1
                            style={{ fontSize: '30px' }}
                            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 my-1">Leadership qualities</h1>
                    }
                    {items.map((item, index) => (
                        <p
                            key={index}
                            style={{ fontSize: '23px' }}
                            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 my-1"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
