import './style.css';
import { useState } from "react";

export default function Com() {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const handleAddText = () => {
        if (text.trim() !== "") {
            setItems([...items, text]); // Add text to the list
            setText(""); // Clear input
        }
    };

    return (
        <div className="flex p-6">
            <div className="w-1/2">
                <video
                    className="w-[100%] rounded-lg"
                    controls
                    src="/assets/L2-C25/Activity-1/v1.mp4"
                ></video>
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
                        Submit
                    </button>
                </center>

                <div className="mt-4">
                    {items.length > 0 &&
                        <h1 
                            style={{fontSize:'30px'}}
                            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 my-1">Leadership qualities</h1>
                    }
                    {items.map((item, index) => (
                        <p
                            key={index}
                            style={{fontSize:'23px'}}
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
