'use client'

import './style.css'


export default function Slider() {
    const data = [
        {
            date: "March 23",
            conflict: "My friend ignored me at lunch and sat with someone else.",
            feelings: "I felt left out and upset.",
            betterResponse:
                'I said, "I felt left out when you sat somewhere else. I’d love to join next time!" (Using an \'I\' message)',
        },
        {
            date: "",
            conflict: "",
            feelings: "",
            betterResponse: '',
        },
        {
            date: "",
            conflict: "",
            feelings: "",
            betterResponse: '',
        },
        {
            date: "",
            conflict: "",
            feelings: "",
            betterResponse: '',
        }
    ];
    return (
        <div className='slidesMainContainer p-10'>
            <div className='text-left text-[23px]'>
                <p className='mb-3'>Date ____________</p>
                <p>Your Name ____________</p>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Conflict Reflection Table</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Date</th>
                                <th className="border border-gray-300 p-3 text-left">What happened?</th>
                                <th className="border border-gray-300 p-3 text-left">How did I feel?</th>
                                <th className="border border-gray-300 p-3 text-left">How did I handled the situation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="trx border border-gray-300 odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 p-3">{row.date}</td>
                                    <td className="border border-gray-300 p-3">{row.conflict}</td>
                                    <td className="border border-gray-300 p-3">{row.feelings}</td>
                                    <td className="border border-gray-300 p-3">{row.betterResponse}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
