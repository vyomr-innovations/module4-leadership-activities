import './style.css'
import Image from 'next/image'

export default function Filler(props) {
    return (
        <div className='FillerMainContainer'>
            <center>
            <h1 className='headingOg'>{props.heading}</h1>
            <h1 className="heading">{props.subHeading}</h1>
            <Image alt="currentObj" className='currentObj' src={props.imagex} />
            <button onClick={props.handleStart}>Start</button>
            </center>
        </div>
    );
}
