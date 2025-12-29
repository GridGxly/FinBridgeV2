import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { usePlaidLink } from 'react-plaid-link';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001').replace(/\/$/, '');

const Login = () => {
    const [token, setToken] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        const createLinkToken = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/plaid/create_link_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: 'demo_user_' + Math.floor(Math.random() * 1000) }),
                });
                const data = await response.json();
                if (data.link_token) {
                    setToken(data.link_token);
                } else {
                    setError('Failed to initialize Plaid Link');
                }
            } catch (err) {
                console.error(err);
                setError('Could not connect to backend service.');
            } finally {
                setLoading(false);
            }
        };
        createLinkToken();
    }, []);

    const onSuccess = useCallback(async (public_token, metadata) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/plaid/exchange_public_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token }),
            });
            const data = await response.json();

            login({
                name: 'Finbridge User',
                bank: metadata.institution.name,
                itemId: data.item_id
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to exchange token');
            setLoading(false);
        }
    }, [login, navigate]);

    const config = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    const { t } = useTranslation();

    return (
        <div className="flex h-screen w-full font-sans overflow-hidden bg-white text-[#111]">
            <div className="hidden lg:flex w-[45%] bg-[#063925] flex-col justify-between p-16 text-white relative overflow-hidden">
                <Link to="/" className="font-medium tracking-widest text-base font-bold opacity-90 uppercase z-10 pl-[2px] hover:text-emerald-100 transition-colors cursor-pointer">{t('login.brand')}</Link>

                <div className="max-w-md z-10">
                    <h1 className="text-6xl font-serif tracking-tight mb-6 leading-[1.1] -ml-[3px] whitespace-pre-line">
                        {t('login.hero.title')}
                    </h1>
                    <p className="text-xl text-emerald-100/90 font-light leading-relaxed">
                        {t('login.hero.subtitle')}
                    </p>
                </div>

                <div className="flex gap-6 opacity-60 text-sm z-10 w-full pl-[2px]">
                    <span>{t('login.hero.copyright')}</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 bg-[#F3F4F6]">
                <div className="w-full max-w-[480px] bg-white px-10 pt-12 pb-10 sm:px-12 sm:pt-14 sm:pb-12 rounded-3xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-200/60 ring-1 ring-black/5">

                    <div className="mb-8 text-center sm:text-left">
                        <h1 className="text-3xl font-semibold tracking-tighter text-[#111] mb-3">{t('login.form.title')}</h1>
                        <p className="text-gray-600 text-[15px] leading-relaxed max-w-sm text-balance">
                            {t('login.form.subtitle')}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 border border-red-100 flex items-start gap-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <div className="font-medium">{error}</div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8 gap-4 opacity-75">
                            <div className="h-6 w-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
                            <span className="text-xs text-gray-900 font-medium tracking-wide uppercase">{t('login.loading')}</span>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <button
                                onClick={() => open()}
                                disabled={!ready}
                                className="w-full bg-[#1a1a1a] hover:bg-black active:scale-[0.98] active:shadow-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 text-white h-14 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg shadow-gray-900/20"
                            >
                                <span className="font-medium text-[15px] tracking-wide">{t('login.form.button')}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-white transition-colors">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </button>

                            <div className="space-y-5">
                                <div className="flex items-center justify-center gap-2 opacity-90">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#111]">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                    </svg>
                                    <span className="text-[13px] font-medium text-gray-600">{t('login.form.encryption')}</span>
                                </div>

                                <p className="text-[11px] text-gray-600 leading-relaxed text-center max-w-xs mx-auto">
                                    {t('login.form.terms_prefix')} <a href="https://plaid.com/legal/#consumers" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black underline decoration-gray-300 hover:decoration-gray-500 underline-offset-2 transition-colors">{t('login.form.terms_link')}</a> {t('login.form.and')} <a href="https://plaid.com/legal/#privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black underline decoration-gray-300 hover:decoration-gray-500 underline-offset-2 transition-colors">{t('login.form.privacy_link')}</a>{t('login.form.terms_suffix')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Login;
