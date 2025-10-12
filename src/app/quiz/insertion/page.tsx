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
            question: "Insertion Sort on [5, 3, 8, 4, 2]. After inserting element 3, what's the array?",
            array: [5, 3, 8, 4, 2],
            correctAnswer: [3, 5, 8, 4, 2],
        },
        {
            question: "Using Insertion Sort on [12, 11, 13, 5, 6]. After inserting element 11, what's the result?",
            array: [12, 11, 13, 5, 6],
            correctAnswer: [11, 12, 13, 5, 6],
        },
        {
            question: "Insertion Sort: [8, 3, 5, 4, 7, 6, 1, 2]. After inserting element 5, what's the array?",
            array: [8, 3, 5, 4, 7, 6, 1, 2],
            correctAnswer: [3, 5, 8, 4, 7, 6, 1, 2],
        },
        {
            question: "Apply Insertion Sort to [9, 2, 6, 1, 3]. After inserting element 6, what's the result?",
            array: [9, 2, 6, 1, 3],
            correctAnswer: [2, 6, 9, 1, 3],
        },
        {
            question: "Insertion Sort on [15, 7, 12, 8, 10]. After inserting element 12, what's the array?",
            array: [15, 7, 12, 8, 10],
            correctAnswer: [7, 12, 15, 8, 10],
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