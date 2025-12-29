import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文 (Mandarin)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'fr', label: 'Français' },
    { code: 'tl', label: 'Tagalog' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'de', label: 'Deutsch' }
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

    return (
        <div className="relative z-50 text-left" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-[#063925] transition-all group"
            >
                <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold group-hover:text-[#063925] transition-colors">
                        Language
                    </span>
                    <span className="text-sm font-bold text-gray-900 leading-tight">
                        {currentLang.label}
                    </span>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 p-1">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                i18n.changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm rounded-md transition-colors flex items-center justify-between ${i18n.language === lang.code
                                ? 'bg-emerald-50 text-[#063925] font-bold'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {lang.label}
                            {i18n.language === lang.code && (
                                <span className="w-2 h-2 rounded-full bg-[#063925]"></span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
