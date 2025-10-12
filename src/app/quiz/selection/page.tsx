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

    useEffect(() => {
        console.log('Router initialized:', router);
    }, [router]);

    const breadcrumbItems = [
        { label: "All Tracks", href: "/compete" },
        { label: "Selection Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Selection Sort on [64, 25, 12, 22, 11]. After FIRST iteration, what's the array?",
            array: [64, 25, 12, 22, 11],
            correctAnswer: [11, 25, 12, 22, 64],
        },
        {
            question: "Using Selection Sort on [29, 10, 14, 37, 13], what's the array after SECOND iteration?",
            array: [29, 10, 14, 37, 13],
            correctAnswer: [10, 13, 14, 37, 29],
        },
        {
            question: "Selection Sort: [7, 3, 9, 1, 5]. After FIRST iteration, which element is in its final position?",
            array: [7, 3, 9, 1, 5],
            correctAnswer: [1, 3, 9, 7, 5], // 1 is in final position
        },
        {
            question: "Apply Selection Sort to [15, 8, 20, 3, 12]. What's the array after THIRD iteration?",
            array: [15, 8, 20, 3, 12],
            correctAnswer: [3, 8, 12, 20, 15],
        },
        {
            question: "Selection Sort on [6, 9, 2, 4, 7]. After SECOND iteration, what's the result?",
            array: [6, 9, 2, 4, 7],
            correctAnswer: [2, 4, 9, 6, 7],
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
        console.log('Router object:', router);
        console.log('User:', user);
        console.log('Total Score:', totalScore);
        
        setIsFinishing(true);
        
        try {
            if (user) {
                console.log('Updating score...');
                await api.updateScore(user._id, totalScore, "selectionSort");
                console.log('Score updated successfully');
                
                console.log('Attempting router.push...');
                router.push('/compete');
                console.log('Router.push called');
                
                setTimeout(() => {
                    console.log('Backup redirect with window.location');
                    window.location.href = '/compete';
                }, 1000);
                
            } else {
                console.log('No user found, redirecting...');
                router.push('/compete');
            }
        } catch (error) {
            console.error("Failed to update final score:", error);
            console.log('Error case, redirecting...');
            window.location.href = '/compete';
        } finally {
            setIsFinishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="px-20 mt-20 max-w-screen-2xl mx-auto">
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Selection Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Selection Sort algorithm</p>
                    
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
                                topic="selectionSort"
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
                    {isFinishing ? 'Finishing...' : `Finish Quiz (${completedQuizzes.length}/${quizzes.length} completed)`}
                </button>
            </div>

            <Footer />
        </div>
    );
}