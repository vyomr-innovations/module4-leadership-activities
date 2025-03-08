'use client'

import './styleCom2.css'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import Image from 'next/image'

import { useState } from 'react';
export default function SlideShow() {

    const [currentObjIndex, setCurrentObjIndex] = useState(0)

    const objects = [
        {
            img: S1,
            text: 'Your team is losing by one point, and there are only two minutes left. Everyone is feeling nervous, and the game is intense. As the leader, how should you respond?',
            supportiveApproch: "We’ve got this! Let’s stay focused, work as a team, and make the best plays. No matter what happens, we give our best effort and support each other!",
            bossyLeaderApproch: "You're all playing terribly! Just give me the ball—I’ll do it myself! If we lose, it’s your fault, not mine!",
            seen: "Leading a Sports Team in a Close Game"
        },
        {
            img: S2,
            text: 'Your family is on a camping trip, but things aren’t going as planned. The tent is difficult to set up, some people are tired, and others are frustrated.',
            supportiveApproch: "Let’s take it step by step! You hold the poles while I set up the stakes. We’ll get this done together and then enjoy a campfire",
            bossyLeaderApproch: "You're doing it all wrong! Just let me handle it because no one else knows what they’re doing!",
            seen: "Managing a Family Camping Trip"
        }
    ]

    const handleSelectedOption = () => {
        if (currentObjIndex < objects.length - 1) {
            setCurrentObjIndex(currentObjIndex + 1)
        } else {
            alert('The activity is completed.')
        }
    }


    return (
        <div className="slideShowContainer">
            <div className="flex items-center">

                <div className="w-1/2 p-4 leftContainer">
                    <p className='objText0'>Scenario {currentObjIndex + 1} : {objects[currentObjIndex]['seen']}</p>
                    <p className="objText">{objects[currentObjIndex]['text']}</p>
                    <Image className="objImg" src={objects[currentObjIndex]['img']} alt="objImg" />
                </div>

                <div className="w-1/2 p-4 rightContainer">
                    <div className='d1'>
                        <p className='selectionBtnHeading'>Supportive Leader Approach : </p>
                        <button className="selectionBtn" onClick={handleSelectedOption}>
                            {objects[currentObjIndex]['supportiveApproch']}
                        </button>
                    </div>
                    <br />
                    <div className='d2'>
                        <p className='selectionBtnHeading'>Bossy Leader Approach :</p>
                        <button className="selectionBtn" onClick={handleSelectedOption}>
                            {objects[currentObjIndex]['bossyLeaderApproch']}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
