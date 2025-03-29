'use client'

import './style.css'


export default function Slider() {
    const data = [
        {
            col1: "Dad",
            col2: "Help put away groceries",
            col3: "Dad will have more time to play",
            col4: "10/10",
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        },
        {
            col1: "",
            col2: "",
            col3: "",
            col4: '',
        }
    ];
    return (
        <div className='slidesMainContainer p-10'>
            <div className='text-left text-[23px]'>
                <p className='mb-3'>Date ____________</p>
                <p>Your Name ____________</p>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Choice Board</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Family Member</th>
                                <th className="border border-gray-300 p-3 text-left">How I Can Help</th>
                                <th className="border border-gray-300 p-3 text-left">Outcome</th>
                                <th className="border border-gray-300 p-3 text-left">Rating given by the family member (After Completing)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="trx border border-gray-300 odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 p-3">{row.col1}</td>
                                    <td className="border border-gray-300 p-3">{row.col2}</td>
                                    <td className="border border-gray-300 p-3">{row.col3}</td>
                                    <td className="border border-gray-300 p-3">{row.col4}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h1 className="mt-4 font-semibold text-[20px] text-blue-600">
                        Add more rows as per the number of family members you are helping
                    </h1>
                </div>
            </div>
        </div>
    );
}
