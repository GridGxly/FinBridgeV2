import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { usePlaidLink } from 'react-plaid-link';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001') : '';

const Login = () => {
    const [token, setToken] = useState(null);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

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
                    headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
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

    const { open, ready } = usePlaidLink({ token, onSuccess });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 font-sans text-slate-900 dark:text-white transition-colors duration-300">
            <Link to="/" className="mb-8 flex items-center gap-2">
                <img src="/favicon.png" alt="FinBridge" className="w-8 h-8 opacity-90" />
                <span className="font-serif font-bold text-2xl tracking-tight text-slate-900 dark:text-white">FINBRIDGE</span>
            </Link>

            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8 transition-colors duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{t('login.form.title', 'Log in')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {t('login.form.subtitle', 'Link your primary financial account to verify your identity.')}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2 border border-red-100 dark:border-red-900/50">
                        <FaLock /> {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="h-6 w-6 border-2 border-slate-200 dark:border-slate-600 border-t-slate-800 dark:border-t-emerald-400 rounded-full animate-spin mb-3"></div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('login.loading', 'Establishing Connection...')}</span>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <button
                            onClick={() => open()}
                            disabled={!ready}
                            className="w-full bg-[#111] dark:bg-emerald-600 text-white h-12 rounded-lg font-bold text-sm tracking-wide hover:bg-black dark:hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaShieldAlt className="text-emerald-400 dark:text-white" />
                            {t('login.form.button', 'Connect Bank Account')}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
                            <FaLock size={10} />
                            <span>{t('login.form.encryption', 'End-to-end encrypted via Plaid')}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                    &copy; 2025 Finbridge. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
