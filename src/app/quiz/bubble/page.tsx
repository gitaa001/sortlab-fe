'use client'
import { useState, useEffect } from 'react';
import Quiz from "@/component/quiz";
import Breadcrumb from "@/component/breadcrumb";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import { api } from '@/services/api';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation'; 

export default function Page() {
    const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
    const [totalScore, setTotalScore] = useState(0);
    const [isFinishing, setIsFinishing] = useState(false); 
    const { user } = useAuth();
    const router = useRouter(); 

    const breadcrumbItems = [
        { label: "All Tracks", href: "/compete" },
        { label: "Bubble Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Using Bubble Sort on [7, 14, 11, 8, 9], how does the array look after the FIRST pass?",
            array: [7, 14, 11, 8, 9],
            correctAnswer: [7, 11, 8, 9, 14],
        },
        {
            question: "Using Bubble Sort on [5, 3, 8, 4, 2], what is the array after the SECOND pass?",
            array: [5, 3, 8, 4, 2],
            correctAnswer: [3, 4, 2, 5, 8],
        },
        {
            question: "Bubble Sort on [64, 34, 25, 12, 22, 11, 90]. What's the array after FIRST pass?",
            array: [64, 34, 25, 12, 22, 11, 90],
            correctAnswer: [34, 25, 12, 22, 11, 64, 90],
        },
        {
            question: "Using Bubble Sort, which element reaches its final position after the FIRST pass of [9, 5, 1, 4, 3]?",
            array: [9, 5, 1, 4, 3],
            correctAnswer: [5, 1, 4, 3, 9], 
        },
        {
            question: "Bubble Sort on [3, 7, 1, 9, 2]. After how many passes will element 9 be in its correct position?",
            array: [3, 7, 1, 9, 2],
            correctAnswer: [3, 1, 7, 2, 9], 
        }
    ];

    const handleQuizComplete = (quizIndex: number, score: number) => {
        if (!completedQuizzes.includes(quizIndex)) {
            setCompletedQuizzes(prev => [...prev, quizIndex]);
            setTotalScore(prev => prev + score);
        }
    };

    const handleFinishQuiz = async () => {
        console.log('=== DEBUG: Finish Quiz clicked ===');
        console.log('User:', user);
        console.log('Total Score:', totalScore);
        
        setIsFinishing(true);
        
        try {
            if (user) {
                console.log('Updating score...');
                await api.updateScore(user._id, totalScore, "bubbleSort");
                console.log('Score updated successfully');
            }
        } catch (error) {
            console.error("Failed to update final score:", error);
        }
        
        console.log('Redirecting to /compete...');
        window.location.href = '/compete';
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="px-20 mt-20 max-w-screen-2xl mx-auto"> 
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Bubble Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Bubble Sort algorithm</p>
                    
                    {/* Progress indicator */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">
                            Progress: {completedQuizzes.length}/{quizzes.length} questions completed
                        </p>
                        <p className="text-sm text-purple-600 font-semibold">
                            Current Score: {totalScore} points
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {quizzes.map((quiz, idx) => (
                        <div key={idx} className="relative">
                            {completedQuizzes.includes(idx) && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs z-10">
                                    ✓ Completed
                                </div>
                            )}
                            <Quiz
                                key={idx}
                                question={quiz.question}
                                array={quiz.array}
                                correctAnswer={quiz.correctAnswer}
                                topic="bubbleSort"
                                onQuizComplete={(score) => handleQuizComplete(idx, score)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-2 mb-10 pt-6 max-w-screen-2xl mx-auto"> 
                <button 
                    onClick={handleFinishQuiz}
                    disabled={isFinishing} 
                    className={`px-8 py-3 rounded-lg font-semibold ${
                        isFinishing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-purple-500 hover:bg-purple-600'
                    } text-white`}
                >
                    {isFinishing ? 'Finishing...' : `Finish Quiz (${completedQuizzes.length}/${quizzes.length} completed)`} {/* ✅ Add loading text */}
                </button>
            </div>

            <Footer />
        </div>
    );
}