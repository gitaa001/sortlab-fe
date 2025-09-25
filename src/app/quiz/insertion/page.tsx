import Quiz from "@/component/quiz";
import Breadcrumb from "@/component/breadcrumb";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import Link from 'next/link';

export default function Page() {
    const breadcrumbItems = [
        { label: "All Tracks", href: "/compete" },
        { label: "Insertion Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Using Insertion Sort on this array, how does the array look like after the FIRST insertion (element 3)?",
            array: [5, 3, 8, 4, 2],
            correctAnswer: [3, 5, 8, 4, 2],
        },
        {
            question: "Using Insertion Sort, what does the array look like after the SECOND insertion (element 8)?",
            array: [12, 11, 13, 5, 6],
            correctAnswer: [11, 12, 13, 5, 6],
        },
        {
            question: "Insertion Sort is performed on this array. How does the array look like after it is FULLY sorted?",
            array: [4, 1, 3, 9, 7],
            correctAnswer: [1, 3, 4, 7, 9],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="px-20 mt-20">
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Insertion Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Insertion Sort algorithm</p>
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