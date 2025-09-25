import Quiz from "@/component/quiz";
import Breadcrumb from "@/component/breadcrumb";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";

export default function Page() {
    const breadcrumbItems = [
        { label: "All Tracks", href: "/compete" },
        { label: "Bubble Sort Quiz" }
    ];

    const quizzes = [
        {
            question: "Using Bubble Sort on this array, how does the array look like after the FIRST run?",
            array: [7, 14, 11, 8, 9],
            correctAnswer: [7, 11, 8, 9, 14],
        },
        {
            question: "Using Bubble Sort, what does the array look like after the SECOND run?",
            array: [5, 3, 8, 4, 2],
            correctAnswer: [3, 4, 2, 5, 8],
        },
        {
            question: "Bubble Sort is performed on this array. How does the array look like after it is FULLY sorted?",
            array: [10, 2, 7, 5, 3],
            correctAnswer: [2, 3, 5, 7, 10],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="px-20 mt-20">
                <Breadcrumb items={breadcrumbItems} />
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Bubble Sort Quiz</h1>
                    <p className="text-gray-600">Test your understanding of the Bubble Sort algorithm</p>
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
                <button
                    className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 font-semibold">
                    Finish Quiz
                </button>
            </div>

            <Footer />
        </div>
    );
}