import { Link } from "react-router-dom";


export default function InfoPage({ title, content }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-2xl w-full border-t-4 border-[#063925]">
                <h1 className="text-4xl font-bold text-[#063925] mb-6">{title}</h1>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    {content || "This content is currently being updated for our new corporate platform. Please check back soon or contact support for immediate assistance."}
                </p>

                <div className="flex justify-center gap-4">
                    <Link to="/home" className="text-[#063925] font-bold hover:underline">
                        &larr; Return Home
                    </Link>
                    <Link to="/login" className="bg-[#063925] text-white px-6 py-2 rounded font-bold hover:bg-[#0a4d32] transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
