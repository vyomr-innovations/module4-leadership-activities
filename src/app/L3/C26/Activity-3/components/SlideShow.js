'use client'

import './style.css'
import { useState, useEffect } from 'react';

export default function SlideShow() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);

    const objects = [
        {
            "text": "What is the most important factor in a successful teamwork project?",
            "options": [
                "Letting one person do all the work",
                "Assigning tasks based on strengths",
                "Doing the easiest tasks first",
                "Ignoring team members' opinions"
            ],
            "correctAnswer": 1
        },
        {
            "text": "What should the best teams do when faced with a challenge?",
            "options": [
                "Blame each other",
                "Work together to find a solution",
                "Wait for someone else to fix it",
                "Give up and start over"
            ],
            "correctAnswer": 1
        },
        {
            "text": "Which of these is NOT a sign of a good team player?",
            "options": [
                "Helping teammates when needed",
                "Communicating clearly",
                "Ignoring feedback",
                "Completing tasks on time"
            ],
            "correctAnswer": 2
        },
        {
            "text": "What is 'social loafing'?",
            "options": [
                "A team where everyone contributes equally",
                "When one person takes over all the work",
                "When some team members do less work, assuming others will handle it",
                "A strategy for better teamwork"
            ],
            "correctAnswer": 2
        },
        {
            "text": "Which behavior can HURT teamwork the most?",
            "options": [
                "Helping teammates who need assistance",
                "Taking credit for others’ ideas",
                "Respecting everyone's opinions",
                "Completing tasks on time"
            ],
            "correctAnswer": 1
        },
        {
            "text": "When does teamwork make the dream work?",
            "options": [
                "When everyone knows their roles",
                "When one person leads",
                "When the team takes it easy",
                "When only the best player works"
            ],
            "correctAnswer": 0
        },
        {
            "text": "I help a team, but if I do too little, the others must do more. If too many act like me, the whole team will be sore. What am I?",
            "options": [
                "Social loafing",
                "Hard work",
                "Leadership",
                "Motivation"
            ],
            "correctAnswer": 0
        },
        {
            "text": "I have many hands, but I cannot clap. The more hands I have, the faster I finish the task. What am I?",
            "options": [
                "A team",
                "A clock",
                "A book",
                "A spider"
            ],
            "correctAnswer": 0
        },
        {
            "text": "A team of four people works on a project. Each person takes 5 minutes to finish their part. How long will it take for all four to finish together?",
            "options": [
                "5 minutes",
                "10 minutes",
                "20 minutes",
                "25 minutes"
            ],
            "correctAnswer": 0
        },
        {
            "text": "A wall needs to be painted. One painter takes 12 hours to finish it alone. If 4 painters work together at the same speed, how long will it take?",
            "options": [
                "48 hours",
                "6 hours",
                "3 hours",
                "12 hours"
            ],
            "correctAnswer": 2
        },
        {
            "text": "When we all pull, we are stronger. When one lets go, we struggle longer. What am I?",
            "options": [
                "A tug-of-war team",
                "A train",
                "A rubber band",
                "A chain"
            ],
            "correctAnswer": 0
        },
        {
            "text": "A factory produces 100 toys a day with 5 workers. If they hire 5 more workers at the same speed, how many days will it take to make 200 toys?",
            "options": [
                "2 days",
                "1 day",
                "4 days",
                "5 days"
            ],
            "correctAnswer": 1
        }
    ]

    const [quizCompleted, setQuizCompleted] = useState(false)
    useEffect(() => {
        if (timeLeft === 0) {
            alert('You missed answering! Moving to the next question.');
            nextQuestion();
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleSelectedOption = (selectedOption) => {
        if (selectedOption === objects[currentObjIndex].correctAnswer) {
            alert('Correct Answer');
            setScore(prevScore => prevScore + 1);
        } else {
            alert('Incorrect Answer');
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentObjIndex < objects.length - 1) {
            setCurrentObjIndex(prev => prev + 1);
            setTimeLeft(30);
        } else {
            setQuizCompleted(true)
            // alert(`Quiz complete! Your final score is ${score}/${objects.length}`);
        }
    };

    return (
        <div className="slideShowContainer p-4 space-y-4">
            {quizCompleted ? (
                <h1 className="text-[30px] font-semibold text-center">
                    Quiz completed! Your final score is {score}/{objects.length}
                </h1>
            ) : (
                <div>
                    <p className="text-right text-[30px] mt-4 mb-4 text-red-500 font-bold">Time left: {timeLeft}s</p>
                    <p className="text-lg font-semibold text-center mb-4 bg-gray-100 p-4 rounded-lg">
                        Question {currentObjIndex + 1}: {objects[currentObjIndex].text}
                    </p>
                    <center>
                        {objects[currentObjIndex].options.map((option, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => handleSelectedOption(index)}
                                    className="px-4 cursor-pointer py-2 m-2 bg-blue-500 text-white rounded-lg shadow-md">
                                    {option}
                                </button>
                                <br />
                            </div>

                        ))}
                    </center>
                </div>
            )}
        </div>
    );
}
