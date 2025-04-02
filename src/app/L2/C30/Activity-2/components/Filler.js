'use client'

import './style.css'


import Image from 'next/image'
import D1 from '../assets/d1.jpeg';

import { useState } from 'react';

export default function Filler(props) {
    const [currentCol2Temp, setCurrentCol2Temp] = useState([])
    const [currentCol2Index, setCurrentCol2Index] = useState(0)

    const [currentCol3Temp, setCurrentCol3Temp] = useState([])
    const [currentCol3Index, setCurrentCol3Index] = useState(-1)

    const scenarioDetails = {
        img: D1,
        subHeading: "Sam loves pizza too! Tonight, Sam’s family is ordering pizza for dinner, and they want to make sure everyone is happy."
    }

    const col2 = [
        "The pizza table",
        "Kids share their topping wishes! ",
        "Parents Really Listen ",
        "Sam & Sophia’s choices where considered "
    ]

    const col3 = [
        "Everyone has a seat at the table.",
        "Everyone’s opinions are heard.",
        "Decision-makers listen carefully.",
        "Ideas are not just heard but also acted upon."
    ]


    const handleUpdateSol1 = () => {
        setCurrentCol2Temp([...currentCol2Temp, col2[currentCol2Index]]);
        if (currentCol2Index === col2.length - 1) {
            setCurrentCol3Index(currentCol3Index + 1)
        }
        setCurrentCol2Index(currentCol2Index + 1)
    }

    const handleUpdateSol2 = () => {
        setCurrentCol3Temp([...currentCol3Temp, col3[currentCol3Index]]);
        setCurrentCol3Index(currentCol3Index + 1)
        if (currentCol3Index === col3.length - 1) {
            props.handleShowStartBtn()
        }
    }

    const handleLundyModelEle = (index) => {
        const words = ["SPACE", "VOICE", "AUDIENCE", "INFLUENCE"];
        return words[index]
    }
    return (
        <div className="flex justify-between space-x-4 fillerMainCon">

            <div className="w-1/3 comDiv p-4 text-left">
                <h1 className='d1Text text-[22px] text-[#8b005a] mb-4 font-semibold'>{scenarioDetails["subHeading"]}</h1>
                <Image alt="d1" className='d1 rounded width-[70%]' src={scenarioDetails["img"]} />
            </div>

            <div className="w-1/3 comDiv p-4 text-left">
                <h1 className='text-[26px] mb-4 font-semibold'>Pizza party preparation</h1>
                <ul className='list-disc list-inside'>
                    {currentCol2Temp.map((col2, index) => (
                        <li className='mb-2 text-[20px]' key={index}>{col2}</li>
                    ))}
                </ul>
                {currentCol2Temp.length < col2.length &&
                    <button
                        className='bg-[#296d8e] hover:bg-[#02557d] mt-4 font-semibold text-[17px] cursor-pointer text-white px-5 py-2 rounded'
                        onClick={handleUpdateSol1}>Update Solution 1</button>
                }
            </div>

            <div className="w-1/3 comDiv p-4 text-left">
                <h1 className='text-[26px] mb-4 font-semibold'>Lundy Model</h1>
                <ul className='list-disc list-inside'>
                    {currentCol3Temp.map((col3, index) => (
                        <li key={index} className='mb-4 text-[20px]'>
                            <span className='bg-[#c20c82] shadow-lg text-white font-semibol rounded px-3 py-2 mr-2'>{handleLundyModelEle(index)} {' '}</span>
                            → {col3}
                        </li>
                    ))}
                </ul>

                {currentCol3Index > -1 && currentCol3Temp.length < col3.length &&
                    <button
                        className='bg-[#296d8e] hover:bg-[#02557d] mt-4 font-semibold text-[17px] cursor-pointer text-white px-5 py-2 rounded'
                        onClick={handleUpdateSol2}>Update Solution 2</button>
                }
            </div>

        </div>
    );
}
