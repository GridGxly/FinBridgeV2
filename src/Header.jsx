import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { FaGlobe, FaSun, FaMoon } from "react-icons/fa";
import LanguageSelector from "./components/LanguageSelector";

function Header() {
    const { t } = useTranslation('header');
    const { user } = useAuth();
    const { darkMode, toggleTheme } = useTheme();


    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 h-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">


                <Link to="/" className="flex items-center gap-3 group">
                    <img src="/favicon.png" alt="FinBridge" className="w-8 h-8 opacity-90 grayscale group-hover:grayscale-0 transition-all" />
                    <span className="font-serif font-bold text-2xl tracking-tight text-[#0b0f19] dark:text-white">FINBRIDGE</span>
                </Link>

                <div className="flex items-center gap-4">

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        aria-label="Toggle Theme"
                    >
                        {darkMode ? <FaSun className="text-amber-400" /> : <FaMoon />}
                    </button>


                    <LanguageSelector />

                    {user ? (
                        <Link
                            to="/dashboard"
                            className="bg-[#0b0f19] dark:bg-white text-white dark:text-[#0b0f19] px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                        >
                            {t('nav.dashboard', 'Dashboard')}
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#0b0f19] dark:bg-white text-white dark:text-[#0b0f19] px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                        >
                            {t('nav.sign_in', 'Sign In')}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;