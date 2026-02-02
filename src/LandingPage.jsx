
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud } from "react-icons/fi";
import { FaUserFriends, FaBookOpen } from "react-icons/fa";
import Footer from "./components/Footer";

export default function LandingPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 font-sans text-[#0b0f19] dark:text-gray-100 selection:bg-emerald-100 dark:selection:bg-emerald-900 transition-colors duration-300">

            <section className="pt-24 pb-16 px-6 relative overflow-hidden text-center">
                <div className="max-w-4xl mx-auto relative z-10">


                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-serif font-medium text-[#0b0f19] dark:text-white leading-[1.05] mb-8 md:mb-12 tracking-tight transition-colors"
                    >
                        {t('hero.title_start', 'Finbridge translates')} <br className="hidden md:block" />
                        {t('hero.title_middle', 'confusing bank documents')} <br className="hidden md:block" />
                        {t('hero.title_end', 'into plain\u00A0English.')}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-[#064e3b] dark:bg-emerald-500 text-white dark:text-[#0b0f19] text-lg md:text-2xl px-8 py-3 md:px-10 md:py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            {t('hero.cta', 'Start Translating')}
                        </button>
                    </motion.div>


                </div>
            </section>

            <section className="py-20 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] p-12 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 text-[#065F46] dark:text-emerald-400 mb-6">
                                <FaUserFriends size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4 text-[#0b0f19] dark:text-white transition-colors">{t('features.community.title', 'Tailored for You.')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed transition-colors max-w-sm">
                                {t('features.community.description', "Financial advice isn't one-size-fits-all. We consider your background, language, and goals.")}
                            </p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-slate-100 dark:text-slate-700 transform rotate-12 transition-colors duration-300">
                            <FaUserFriends size={200} className="group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        transition={{ delay: 0.2 }}
                        className="bg-[#F0FDF4] dark:bg-emerald-900/10 rounded-[2.5rem] p-12 transition-colors relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 text-[#065F46] dark:text-emerald-400 mb-6">
                                <FaBookOpen size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4 text-[#065F46] dark:text-emerald-400 transition-colors">{t('features.jargon.title', 'Jargon Free.')}</h3>
                            <p className="text-[#065F46]/80 dark:text-emerald-300/80 text-lg leading-relaxed transition-colors max-w-sm">
                                {t('features.jargon.description', 'We strip away the confusing terms so you can focus on the numbers.')}
                            </p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-emerald-100 dark:text-emerald-900/20 transform rotate-12 transition-colors duration-300">
                            <FaBookOpen size={200} className="group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 bg-slate-200 dark:bg-slate-700 text-[10px] font-bold px-3 py-1 rounded text-slate-600 dark:text-slate-300 uppercase tracking-wider z-20 shadow-sm transition-colors">
                            {t('demo.original_scan', 'ORIGINAL SCAN')}
                        </div>
                        <div className="w-64 md:w-80 h-[28rem] bg-white rounded-3xl p-6 shadow-xl border border-slate-200 rotate-[-2deg] transition-all duration-300 ease-in-out relative overflow-hidden group">

                            <div className="w-24 h-6 bg-slate-200 rounded mb-6" />

                            <div className="space-y-3 mb-8 opacity-60">
                                <div className="h-1.5 bg-slate-800 rounded w-full" />
                                <div className="h-1.5 bg-slate-800 rounded w-11/12" />
                                <div className="h-1.5 bg-slate-800 rounded w-full" />
                                <div className="h-1.5 bg-slate-800 rounded w-4/5" />
                                <div className="h-1.5 bg-slate-800 rounded w-full" />
                            </div>

                            <div className="space-y-3 mb-8 opacity-60">
                                <div className="h-1.5 bg-slate-800 rounded w-10/12" />
                                <div className="h-1.5 bg-slate-800 rounded w-full" />
                                <div className="h-1.5 bg-slate-800 rounded w-9/12" />
                            </div>

                            <div className="w-full h-24 bg-slate-100 rounded-xl border border-slate-200 p-4 mb-4">
                                <div className="h-2 bg-slate-300 rounded w-1/3 mb-2" />
                            </div>

                            <div className="space-y-3 opacity-60">
                                <div className="h-1.5 bg-slate-800 rounded w-full" />
                                <div className="h-1.5 bg-slate-800 rounded w-1/2" />
                            </div>

                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-200/50 to-transparent rounded-br-3xl pointer-events-none" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative cursor-pointer z-10 w-full max-w-[320px] md:max-w-none"
                    >
                        <div className="absolute -top-6 -right-4 bg-[#064e3b] text-white text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-30 border-2 border-white ring-2 ring-emerald-500">
                            {t('demo.simplified', 'SIMPLIFIED')}
                        </div>

                        <div className="relative bg-[#0b0f19] rounded-[2.5rem] p-3 shadow-2xl border border-slate-700/50 rotate-1 transition-transform">
                            <div className="w-full md:w-80 bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-[2rem] p-6 text-white min-h-[24rem] flex flex-col justify-center border border-white/5 relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                                <div className="space-y-4 relative z-10">
                                    <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg group/item hover:bg-white/15 transition-colors">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                                            <span className="text-lg font-bold tracking-tight">{t('demo.pay_alert', 'Pay $125.00')}</span>
                                        </div>
                                        <div className="text-emerald-100/70 text-xs ml-5 font-medium">{t('demo.fee_alert', 'Avoid $35 late fee.')}</div>
                                    </div>

                                    <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg group/item hover:bg-white/15 transition-colors">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            <span className="text-lg font-bold tracking-tight">{t('demo.call_action', 'Call 800-555...')}</span>
                                        </div>
                                        <div className="text-emerald-100/70 text-xs ml-5 font-medium">{t('demo.plan_action', 'Confirm payment plan.')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#0b0f19] text-white py-32 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">{t('how_it_works.title', 'How it works')}</h2>
                        <p className="text-slate-400 text-lg font-light">{t('how_it_works.subtitle', 'Three steps to financial clarity.')}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: t('how_it_works.steps.0.title', 'Upload'), desc: t('how_it_works.steps.0.desc', 'Upload a photo or PDF of your document.') },
                            { step: "02", title: t('how_it_works.steps.1.title', 'Analyze'), desc: t('how_it_works.steps.1.desc', 'We highlight key dates, amounts, and risks.') },
                            { step: "03", title: t('how_it_works.steps.2.title', 'Action'), desc: t('how_it_works.steps.2.desc', 'You get a clear, step-by-step to-do list.') }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-[#131b2c] p-10 rounded-3xl border border-slate-800/50 hover:border-slate-700 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] text-emerald-400 font-bold flex items-center justify-center mx-auto mb-8 group-hover:bg-[#064e3b] group-hover:text-white transition-colors text-sm">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-light text-base">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}