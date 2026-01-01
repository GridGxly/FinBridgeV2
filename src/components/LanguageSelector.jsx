import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";

const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh', label: '中文' },
    { code: 'hi', label: 'िन्दी' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'tl', label: 'Tagalog' },
    { code: 'ar', label: 'العربية' },
    { code: 'ht', label: 'Kreyòl' }
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);


    const currentLangCode = i18n.language ? i18n.language.split('-')[0] : 'en';

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></span> {currentLangCode.toUpperCase()}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-3 animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-700/50 mb-1 flex justify-between items-center">
                        <span>Language</span>
                        <button onClick={() => setIsOpen(false)} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <FaTimes />
                        </button>
                    </div>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3 ${currentLangCode === lang.code ? 'text-[#064e3b] dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20' : 'text-slate-600 dark:text-slate-300'}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${currentLangCode === lang.code ? 'bg-[#064e3b] dark:bg-emerald-400' : 'bg-transparent'}`}></span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
