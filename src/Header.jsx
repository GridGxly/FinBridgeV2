import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./context/AuthContext";

function Header() {
    const { t } = useTranslation('header');
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-[#063925] text-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <span className="font-bold text-xl tracking-tighter">Fb</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-[#063925] transition-colors">FINBRIDGE</span>
                    </Link>

                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">
                                {user.name}
                            </span>
                            <Link
                                to="/dashboard"
                                className="bg-[#063925] text-white px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-[#0a4d32] transition-all shadow-sm hover:shadow"
                            >
                                {t('nav.dashboard', 'DASHBOARD')}
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#063925] text-white px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-[#0a4d32] transition-all shadow-sm hover:shadow"
                        >
                            {t('nav.sign_in')}
                        </Link>
                    )}
                </div>
            </div>
        </header >
    );
}

export default Header;