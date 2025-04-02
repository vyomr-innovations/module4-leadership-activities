'use client'

import './style.css'


export default function Slider() {
    const data = [
        {
            col1: "Dad",
            col2: ""
        },
        {
            col1: "",
            col2: ""
        },
        {
            col1: "",
            col2: ""
        },
        {
            col1: "",
            col2: ""
        }
    ];
    return (
        <div className='slidesMainContainer p-10'>
            <div className='text-left text-[23px]'>
                <p className='mb-3'>Date ____________</p>
                <p className='mb-3'>Your Name ____________</p>
                <p className='mb-3'>Topic ________________________________________________</p>

                <br />
                <br />
                <br />
            </div>

            <p className='text-2xl font-bold mb-8'>
                All family members were included? Who all attended the discussion {' '}
                <span className='bg-[#c20c82] text-[16px] shadow-lg text-white font-semibol rounded px-3 py-2 mr-2'>(SPACE)</span> : ___________________ _______________________________________________________________________________________</p>

            <br />
            <br />
            <br />

            <div className="p-6 mb-8">
                <h1 className="text-2xl font-bold mb-4">
                    Thoughts of everyone {' '}
                    <span className='bg-[#c20c82] text-[16px] shadow-lg text-white font-semibol rounded px-3 py-2 mr-2'>(VOICE)
                    </span>
                </h1>
                <div className="overflow-x-auto">
                    <table className="t1 w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left th1">Family Member</th>
                                <th className="border border-gray-300 p-3 text-left">Thought</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="trx border border-gray-300 odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 p-3 td1">{row.col1}</td>
                                    <td className="border border-gray-300 p-3">{row.col2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h1 className="mt-4 font-semibold text-[20px] text-blue-600">
                        Add more rows as per the discussion
                    </h1>
                </div>
            </div>

            <br />
            <br />
            <br />
            <p className='text-2xl font-bold mb-8'>
                Was everyone heard properly? If not, how did you ensure that everyone's voice was included in the discussion? {' '}
                <span className='bg-[#c20c82] text-[16px] shadow-lg text-white font-semibol rounded px-3 py-2 mr-2'>(AUDIENCE)</span> : ___________________ _______________________________________________________________________________________</p>
            <br />
            <br />
            <br />
            <p className='text-2xl font-bold mb-4'>
                What decision was made? How did your family work together to reach that decision? {' '}
                <span className='bg-[#c20c82] text-[16px] shadow-lg text-white font-semibol rounded px-3 py-2 mr-2'>(INLUENCE)</span> : ___________________ _______________________________________________________________________________________</p>


        </div>
    );
}
