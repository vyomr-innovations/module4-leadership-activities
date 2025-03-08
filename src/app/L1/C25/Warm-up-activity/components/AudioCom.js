'use client'

import './style.css'

import Logo1 from '../assets/logo1.jpg';
import Logo2 from '../assets/logo2.jpg';
import Image from 'next/image'

export default function AudioCom() {

    return (
        <div className="h-screen flex items-center justify-center">

            <div>
                <h1 className='audioHeading'>Music audio 1</h1>
                <audio controls style={{ width: "360px" }} >
                    <source src="/assets/L1-C25/Wram-up-activity/Dancing_with_Stars.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <br />
                <br />

                <h1 className='audioHeading'>Music audio 2</h1>
                <audio controls style={{ width: "360px" }} >
                    <source src="/assets/L1-C25/Wram-up-activity/minecraft.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>


            <Image className="absolute left-0 m-4 glowing-image" width={260} src={Logo1} alt="log" />
            <Image className="absolute right-0 m-4" width={360} src={Logo2} alt="log" />

        </div>
    );
}
