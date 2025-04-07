'use client'

import './style.css'

import SwotCom from './SwotCom';
import Image from 'next/image'

import { useState, useEffect } from 'react';

export default function Slider(props) {
    const [startSwot, setStartSwot] = useState(false)
    const [seenCounter, setSeenCounter] = useState({})


    useEffect(() => {
        setStartSwot(false)
    }, [props.currentObjIndex]);


    const interMeditSassOnSwotData = (currentSwotData, currentSolutionLen, seen) => {
        // console.log(currentSwotData, currentSolutionLen, seen)
        const newObj = {
            [seen]: currentSolutionLen
        }
        setSeenCounter((prevSeenCounter) => ({ ...prevSeenCounter, ...newObj }));
        // console.log(seenCounter)
        if (seenCounter.s1 && seenCounter.s1 === 4 && seenCounter.s2 && seenCounter.s2 === 4) {
            props.passOnSwotData(currentSwotData, currentSolutionLen, "s1&&s2")
        }
    }

    const handleStartSwot = () => {
        setStartSwot(true)
    }

    return (
        <div className='slidesMainContainer'>
            {/* {console.log(props)} */}

            <div>
                <h1 className="heading">{props.currentObj.heading}</h1>
                <h1 className="subHeading">{props.currentObj.subHeading}</h1>
                <Image alt="currentObj" className='currentObj' src={props.currentObj.img} />
            </div>

            {!startSwot &&
                <button
                    onClick={handleStartSwot}
                    className="mt-4 mt-12 font-semibold p-2 bg-yellow-500 text-white cursor-pointer text-[20px] px-4 rounded-lg"
                >Start SWOT Analysis</button>
            }


            {startSwot &&
                <>
                    <br /><br /><br />
                    <hr />
                    <br />

                    <div className="flex gap-4">
                        <div className="w-1/2 p-4 rightCon">
                            <h1 className='font-semibold text-[23px]'>{props.currentObj.swotHeading1}</h1>
                            <SwotCom
                                seen="s1"
                                passOnSwotData={interMeditSassOnSwotData}
                                currentObjIndex={props.currentObjIndex}
                            />
                        </div>

                        <div className="w-1/2 p-4 rightCon">
                            <h1 className='font-semibold text-[23px]'>{props.currentObj.swotHeading2}</h1>
                            <SwotCom
                                seen="s2"
                                passOnSwotData={interMeditSassOnSwotData}
                                currentObjIndex={props.currentObjIndex}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
