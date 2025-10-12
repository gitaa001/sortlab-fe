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
        { label: "Merge Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Merge Sort: Split [38, 27, 43, 3] into two halves. What's the LEFT subarray?",
            array: [38, 27, 43, 3],
            correctAnswer: [38, 27],
        },
        {
            question: "Merge two sorted arrays [1, 3, 5] and [2, 4, 6]. What's the merged result?",
            array: [1, 3, 5, 2, 4, 6],
            correctAnswer: [1, 2, 3, 4, 5, 6],
        },
        {
            question: "Merge Sort: Merge [3, 7, 9] and [1, 4, 8]. What's the final merged array?",
            array: [3, 7, 9, 1, 4, 8],
            correctAnswer: [1, 3, 4, 7, 8, 9],
        },
        {
            question: "Split [16, 21, 11, 8, 12, 22] for Merge Sort. What's the RIGHT subarray?",
            array: [16, 21, 11, 8, 12, 22],
            correctAnswer: [8, 12, 22],
        },
        {
            question: "Final challenge: Sort [25, 12, 18, 6, 30, 15, 9] completely using Merge Sort.",
            array: [25, 12, 18, 6, 30, 15, 9],
            correctAnswer: [6, 9, 12, 15, 18, 25, 30],
        },
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
                await api.updateScore(user._id, totalScore, "mergeSort");
                console.log('Score updated successfully');
            }
        } catch (error) {
            console.error("Failed to update final score:", error);
        }
        
        // ✅ Direct redirect ke /compete
        console.log('Redirecting to /compete...');
        window.location.href = '/compete';
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="px-20 mt-20 max-w-screen-2xl mx-auto">
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Merge Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Merge Sort algorithm</p>
                    
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
                                topic="mergeSort"
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