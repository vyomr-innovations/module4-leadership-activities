'use client'

import './style.css'

import { useState, useEffect } from "react";

export default function Slider(props) {
    const [currentSolutionObj, setCurrentSolutionObj] = useState([])
    // currentSwotData holds the data of all swot and can be pushed put
    const [currentSwotData, setCurrentSwotData] = useState({})

    const solutionObj = [
        "S : Strengths",
        "W : Weaknesses",
        "O : Opportunities",
        "T : Threats",
    ]

    const borderStyles = [
        'border-red-400 shadow-md shadow-red-200',
        'border-blue-400 shadow-md shadow-blue-200',
        'border-green-400 shadow-md shadow-green-200',
        'border-yellow-400 shadow-md shadow-yellow-200',
    ];


    useEffect(() => {
        setCurrentSolutionObj([])
    }, [props.currentObjIndex]);


    const updateSolution = () => {
        const len = currentSolutionObj.length;
        if (len < solutionObj.length) {
            setCurrentSolutionObj([...currentSolutionObj, solutionObj[len]]);
        }
    };

    const swotUpdate = (e) => {
        const val = e.target.value
        const index = currentSolutionObj.length - 1;
        const newObj = {
            [solutionObj[index]]: val
        }
        setCurrentSwotData((prevCurrentSwotData) => ({ ...prevCurrentSwotData, ...newObj }));
        props.passOnSwotData(currentSwotData, currentSolutionObj.length, props.seen)
    }

    return (
        <div className='slidesMainContainer'>
            {/* {console.log(props)} */}
            <div className="flex gap-4">

                <div className="w-[100%] p-4 rightCon">

                    {currentSolutionObj.length > 0 &&
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
                            {currentSolutionObj.map((value, index) => (
                                <div key={index}>
                                    <p className='mb-2 font-semibold'>{value}</p>
                                    <textarea
                                        key={index}
                                        className={`w-full h-42 p-2 rounded border ${borderStyles[index % borderStyles.length]}`}
                                        // value={value}
                                        onChange={(e) => swotUpdate(e)}
                                    />
                                </div>
                            ))}
                        </div>
                    }


                    {currentSolutionObj.length < solutionObj.length &&
                        <center>
                            <button onClick={updateSolution} className="mt-4 font-semibold p-2 bg-yellow-500 text-white cursor-pointer text-[20px] px-4 rounded-lg">
                                Update SWOT Chart
                            </button>
                        </center>
                    }

                </div>
            </div>
        </div>
    );
}
