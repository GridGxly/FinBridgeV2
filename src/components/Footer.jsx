import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-[#0b1120] text-white py-16 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">


                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/favicon.png" alt="FinBridge" className="w-6 h-6 opacity-80 invert" />
                        <span className="font-serif font-bold text-xl tracking-tight text-white">FINBRIDGE</span>
                    </div>

                    <p className="text-slate-600 text-sm">
                        {t('footer.copyright', '© 2025 Finbridge. All rights reserved.')}
                    </p>
                </div>


                <div className="flex flex-col items-start md:items-end">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">{t('footer.project', 'Project')}</h4>
                    <ul className="space-y-4 text-sm text-slate-400 font-medium flex flex-col items-start md:items-end">
                        <li>
                            <a href="https://github.com/GridGxly/FinBridgeV2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                                <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                {t('footer.github', 'GitHub Repo')}
                            </a>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-white transition-colors flex items-center gap-2 group">
                                {t('footer.live_demo', 'Live Demo')} <FiArrowUpRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
