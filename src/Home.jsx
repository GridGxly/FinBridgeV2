import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import LanguageSelector from "./components/LanguageSelector";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <main className="bg-white font-sans text-slate-900 border-t border-gray-100">
            <section className="bg-[#063925] text-white py-16 px-6 lg:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(to right, #063925, #0a4d32)' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 space-y-6">
                        <div className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-sm inline-block uppercase tracking-widest border border-white/20">
                            {t('hero.badge')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            {t('hero.title_start')} <span className="text-[#EF4444]">{t('hero.title_highlight')}</span>
                        </h1>
                        <p className="text-lg text-white/90 max-w-xl">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-[#EAB308] text-[#713F12] px-8 py-3 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-[#FACC15] transition-colors shadow-md"
                            >
                                {t('hero.cta_primary')}
                            </button>
                            <button
                                onClick={() => document.getElementById("about-footer")?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-transparent border border-white text-white px-8 py-3 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                            >
                                {t('hero.cta_secondary')}
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:block w-80 bg-white rounded-lg shadow-2xl p-6 border border-gray-100">
                        <div className="mb-2">
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 text-slate-400">Select Your Language</label>
                            <LanguageSelector />
                        </div>
                        <p className="text-xs text-slate-400 italic mt-4 text-center">
                            "We speak your language."
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-20 px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-white p-6 border-l-4 border-[#063925] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="w-12 h-12 bg-emerald-50 text-[#063925] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#063925] group-hover:text-white transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#063925" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h8v4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.community.title')}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {t('features.community.description')}
                        </p>
                    </div>

                    <div className="bg-white p-6 border-l-4 border-[#EAB308] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="w-12 h-12 bg-yellow-50 text-[#EAB308] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#EAB308] group-hover:text-white transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.literacy.title')}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {t('features.literacy.description')}
                        </p>
                    </div>

                    <div className="bg-white p-6 border-l-4 border-[#063925] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="w-12 h-12 bg-emerald-50 text-[#063925] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#063925] group-hover:text-white transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#063925" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.security.title')}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {t('features.security.description')}
                        </p>
                    </div>
                </div>
            </section>

            <footer id="about-footer" className="bg-[#1e293b] text-white pt-16 pb-8 border-t-4 border-[#063925]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

                    <div className="col-span-1 md:col-span-1 text-center">
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#063925] hover:text-white transition-all transform hover:-translate-y-1">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#063925] hover:text-white transition-all transform hover:-translate-y-1">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#063925] hover:text-white transition-all transform hover:-translate-y-1">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#063925] hover:text-white transition-all transform hover:-translate-y-1">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-slate-300">{t('footer.about.title')}</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><Link to="/about/mission" className="hover:text-white transition-colors">{t('footer.about.mission')}</Link></li>
                            <li><Link to="/about/impact" className="hover:text-white transition-colors">{t('footer.about.impact')}</Link></li>
                            <li><Link to="/about/diversity" className="hover:text-white transition-colors">{t('footer.about.diversity')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-slate-300">{t('footer.resources.title')}</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><Link to="/resources/guides" className="hover:text-white transition-colors">{t('footer.resources.guides')}</Link></li>
                            <li><Link to="/resources/language" className="hover:text-white transition-colors">{t('footer.resources.language')}</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">{t('footer.resources.help')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-slate-300">{t('footer.stay_informed.title')}</h4>
                        <p className="text-slate-500 text-xs mb-4">
                            {t('footer.stay_informed.subtitle')}
                        </p>
                        <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-800 border border-slate-700 p-3 rounded-sm text-white focus:outline-none focus:border-[#063925] transition-colors"
                                placeholder={t('footer.stay_informed.placeholder')}
                            />
                            <button type="submit" className="bg-[#063925] text-white font-bold py-2 rounded-sm hover:bg-[#0a4d32] transition-colors uppercase text-xs tracking-wide">
                                {subscribed ? t('footer.stay_informed.subscribed') : t('footer.stay_informed.button')}
                            </button>
                        </form>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-slate-800 text-slate-500 text-xs text-center md:text-left">
                    <p>{t('footer.copyright')}</p>
                </div>
            </footer>
        </main>
    );
}