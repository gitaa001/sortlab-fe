import Quiz from "@/component/quiz";
import Breadcrumb from "@/component/breadcrumb";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import Link from 'next/link';

export default function Page() {
    const breadcrumbItems = [
        { label: "All Tracks", href: "/compete" },
        { label: "Selection Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Using Selection Sort on this array, how does the array look like after the FIRST iteration?",
            array: [64, 25, 12, 22, 11],
            correctAnswer: [11, 25, 12, 22, 64],
        },
        {
            question: "Using Selection Sort, what does the array look like after the SECOND iteration?",
            array: [29, 10, 14, 37, 13],
            correctAnswer: [10, 13, 14, 37, 29],
        },
        {
            question: "Selection Sort is performed on this array. How does the array look like after it is FULLY sorted?",
            array: [5, 2, 4, 6, 1, 3],
            correctAnswer: [1, 2, 3, 4, 5, 6],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="px-20 mt-20">
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Selection Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Selection Sort algorithm</p>
                </div>

                <div className="space-y-6">
                    {quizzes.map((quiz, idx) => (
                        <Quiz
                            key={idx}
                            question={quiz.question}
                            array={quiz.array}
                            correctAnswer={quiz.correctAnswer}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-2 mb-10 pt-6">
                <Link href="/practice">
                    <button className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 font-semibold">
                        Finish Quiz
                    </button>
                </Link>
            </div>

            <Footer />
        </div>
    );
}