import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import { FaHome, FaWallet, FaExchangeAlt, FaChartLine, FaLanguage, FaSignOutAlt, FaBars, FaTimes, FaFileUpload, FaRobot } from 'react-icons/fa';
import { SiChase, SiGooglegemini } from "react-icons/si";
import { useAuth } from './context/AuthContext';

export default function Dashboard() {
    const { t } = useTranslation();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [translateInput, setTranslateInput] = useState('');
    const [translateResult, setTranslateResult] = useState(null);
    const [translating, setTranslating] = useState(false);



    const [token, setToken] = useState(null);
    const [plaidLoading, setPlaidLoading] = useState(true);

    const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001').replace(/\/$/, '');



    useEffect(() => {
        const createLinkToken = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/plaid/create_link_token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user?.id || 'demo_user' }),
                });
                const data = await response.json();
                if (data.link_token) {
                    setToken(data.link_token);
                }
            } catch (err) {
                console.error("Plaid Token Error:", err);
            } finally {
                setPlaidLoading(false);
            }
        };
        createLinkToken();
    }, [user, API_BASE_URL]);

    const netWorth = "$142,500.00";
    const netWorthChange = "+$2,340 (1.6%)";

    const transactions = [
        { id: 1, date: 'Oct 24', merchant: 'Whole Foods Market', amount: -124.50, category: 'Groceries' },
        { id: 2, date: 'Oct 23', merchant: 'Uber Cloud Inc', amount: -15.90, category: 'Transport' },
        { id: 3, date: 'Oct 22', merchant: 'Salary Deposit', amount: 3450.00, category: 'Income' },
        { id: 4, date: 'Oct 21', merchant: 'Netflix Subscription', amount: -14.99, category: 'Entertainment' },
    ];

    const [graphData, setGraphData] = useState(null);
    const [graphLoading, setGraphLoading] = useState(true);

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/graphs?type=spending`);
                const data = await res.json();
                if (data && data.labels) setGraphData(data);
            } catch (e) {
                console.error("Graph fetch error", e);
                setGraphData(null);
            } finally {
                setGraphLoading(false);
            }
        };
        fetchGraph();
    }, []);

    const onSuccess = useCallback(async (public_token, metadata) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/plaid/exchange_public_token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_token }),
            });
            const data = await response.json();
            console.log("Plaid Exchange Success:", data, metadata);
            alert(`Successfully connected to ${metadata.institution.name}!`);
        } catch (err) {
            console.error("Plaid Exchange Error:", err);
        }
    }, [API_BASE_URL]);

    const config = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    const handleLogout = () => {
        logout();
        navigate('/');
    };



    const NavItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => {
                setActiveTab(id);
                setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === id ? 'bg-[#063925] text-white font-bold shadow-md' : 'text-slate-500 hover:bg-gray-50 hover:text-[#063925]'
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full z-20">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/home" className="flex items-center gap-2 text-[#063925] font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-[#063925] text-white rounded flex items-center justify-center font-serif text-lg">Fb</div>
                        FINBRIDGE
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <NavItem id="overview" icon={FaHome} label={t('dashboard.nav.overview')} />
                    <NavItem id="accounts" icon={FaWallet} label={t('dashboard.nav.accounts')} />
                    <NavItem id="transactions" icon={FaExchangeAlt} label={t('dashboard.nav.transactions')} />
                    <NavItem id="cash_flow" icon={FaChartLine} label={t('dashboard.nav.cash_flow')} />
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tools</span>
                    </div>
                    <NavItem id="translate" icon={FaLanguage} label="Translate Docs" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <FaSignOutAlt size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            <div className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-xl text-[#063925]">FINBRIDGE</span>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500"><FaTimes size={20} /></button>
                </div>
                <nav className="p-4 space-y-1">
                    <NavItem id="overview" icon={FaHome} label={t('dashboard.nav.overview')} />
                    <NavItem id="accounts" icon={FaWallet} label={t('dashboard.nav.accounts')} />
                    <NavItem id="transactions" icon={FaExchangeAlt} label={t('dashboard.nav.transactions')} />
                    <NavItem id="cash_flow" icon={FaChartLine} label={t('dashboard.nav.cash_flow')} />
                    <NavItem id="translate" icon={FaLanguage} label="Translate Docs" />
                </nav>
            </div>

            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto w-full">
                <div className="md:hidden flex justify-between items-center mb-6">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-slate-600"><FaBars size={24} /></button>
                    <div className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-xs">
                        {user ? user.name[0] : 'U'}
                    </div>
                </div>

                <header className="hidden md:flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab === 'translate' ? 'Translate Documents' : activeTab.replace('_', ' ')}</h1>

                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-slate-600 hover:text-[#063925] bg-white px-4 py-2 rounded border border-gray-200 shadow-sm">
                            {t('dashboard.graph.time.this_month')}
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#063925] text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:bg-[#0a4d32] transition-colors">
                            {user ? user.name[0] : 'JD'}
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto space-y-6">

                    {activeTab === 'overview' && (
                        <>
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.stats.net_worth')}</h3>
                                    <div className="text-3xl font-bold text-slate-900">{netWorth}</div>
                                    <div className="text-sm font-medium text-emerald-600 mt-2 flex items-center gap-1">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L2 6H5V10H7V6H10L6 2Z" fill="currentColor" /></svg>
                                        {netWorthChange}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.stats.assets')}</h3>
                                    <div className="text-2xl font-bold text-slate-900">$254,200</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.stats.liabilities')}</h3>
                                    <div className="text-2xl font-bold text-slate-900">$111,700</div>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-slate-800">{t('dashboard.graph.title')}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active
                                        </div>
                                    </div>

                                    <div className="relative min-h-[16rem] flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-b from-slate-50 to-white border border-dashed border-slate-200">
                                        {graphLoading ? (
                                            <div className="flex flex-col items-center gap-3 animate-pulse">
                                                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                                <div className="text-slate-400 text-sm font-medium">{t('dashboard.graph.generating')}</div>
                                            </div>
                                        ) : graphData ? (
                                            <div className="w-full h-full flex items-end justify-between gap-4 pt-8 px-4">
                                                {graphData.labels.map((label, idx) => {
                                                    const value = graphData.datasets[0].data[idx] || 0;
                                                    const max = Math.max(...(graphData.datasets[0].data || [1]));
                                                    const height = Math.max((value / max) * 100, 10);
                                                    return (
                                                        <div key={idx} className="flex flex-col items-center flex-1 group">
                                                            <div className="w-full bg-[#063925] rounded-t-md transition-all duration-500 hover:bg-[#0a4d32] relative group-hover:scale-105 shadow-sm" style={{ height: `${height}%` }}>
                                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                                    ${value.toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <span className="text-xs font-semibold text-slate-500 mt-3 truncate w-full text-center">{label}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center opacity-60">
                                                <FaChartLine size={32} className="text-slate-300 mb-2" />
                                                <span className="text-sm font-medium text-slate-500">{t('dashboard.graph.unavailable')}</span>
                                            </div>
                                        )}

                                        <div className="absolute top-4 right-4">
                                            <span className="text-[10px] font-bold text-[#063925] bg-[#063925]/10 px-2 py-1 rounded tracking-wider flex items-center gap-1">
                                                ✦ GEMINI AI
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-slate-800">{t('dashboard.recent.title')}</h3>
                                        <button className="text-xs font-bold text-[#063925] hover:underline uppercase tracking-wide">{t('dashboard.recent.view_all')}</button>
                                    </div>
                                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                        {transactions.map(tx => (
                                            <div key={tx.id} className="group flex justify-between items-center py-3 border-b border-gray-50 last:border-0 hover:bg-slate-50 px-3 rounded-lg transition-colors cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold transition-all">
                                                        {tx.merchant[0]}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-900">{tx.merchant}</div>
                                                        <div className="text-[11px] text-slate-500 uppercase tracking-wide">{tx.category} • {tx.date}</div>
                                                    </div>
                                                </div>
                                                <div className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'accounts' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Connected Accounts</h2>

                            {user?.bank && (
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-6 bg-slate-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
                                            {user.bank.includes('Chase') ? (
                                                <SiChase size={24} className="text-[#117ACA]" />
                                            ) : (
                                                <FaWallet size={20} className="text-[#063925]" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{user.bank}</h3>
                                            <p className="text-xs text-slate-500">Primary • Connected</p>
                                        </div>
                                    </div>
                                    <div className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                        Active
                                    </div>
                                </div>
                            )}

                            <div className="text-center pt-8 border-t border-gray-100">
                                <p className="text-slate-500 mb-6">Link additional accounts to view all your finances in one place.</p>
                                <button
                                    onClick={() => open()}
                                    disabled={!ready || plaidLoading}
                                    className="bg-black text-white px-8 py-3 rounded-md font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add Bank Account
                                </button>
                                <p className="mt-4 text-xs text-slate-400">Secure connection via Plaid.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">All Transactions</h2>
                            <div className="space-y-4">
                                {transactions.concat(transactions).concat(transactions).map((tx, i) => (
                                    <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 font-bold">{tx.merchant[0]}</div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{tx.merchant}</div>
                                                <div className="text-xs text-slate-500">{tx.category} • {tx.date}</div>
                                            </div>
                                        </div>
                                        <div className={`font-mono font-medium ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'cash_flow' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <FaChartLine size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Cash Flow Analysis</h2>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">Detailed income vs expense analysis over time.</p>

                            <div className="bg-slate-50 h-64 rounded-lg flex items-center justify-center border border-dashed border-slate-300">
                                <span className="text-slate-400 font-medium">Interactive Cash Flow Chart Loading...</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'translate' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <FaFileUpload size={18} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">{t('dashboard.translate.upload_title')}</h2>
                                        <p className="text-xs text-slate-500">{t('dashboard.translate.upload_desc')}</p>
                                    </div>
                                </div>

                                <div
                                    className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-colors relative ${translateInput ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/10'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        accept=".txt,.md,.json,.csv"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setTranslateInput(ev.target.result);
                                                reader.readAsText(file);
                                            }
                                        }}
                                    />
                                    {translateInput ? (
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M9 15l3 3 3-3"></path></svg>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 mb-1">Document Loaded</p>
                                            <p className="text-xs text-slate-500">Ready to Process</p>
                                            <button
                                                onClick={(e) => { e.preventDefault(); setTranslateInput(''); setTranslateResult(null); }}
                                                className="text-xs text-red-500 font-bold mt-4 hover:underline z-20 relative"
                                            >
                                                Remove File
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center cursor-pointer">
                                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaFileUpload size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 mb-1">{t('dashboard.translate.button_upload')}</p>
                                            <p className="text-xs text-slate-400">TXT, MD, CSV (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={async () => {
                                            if (!translateInput) return;
                                            setTranslating(true);
                                            try {
                                                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/translate`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ text: translateInput, targetLanguage: t('language_name') || 'English' })
                                                });
                                                const data = await res.json();
                                                setTranslateResult(data);
                                            } catch (e) {
                                                console.error(e);
                                                setTranslateResult({ summary: "Error connecting to AI.", translatedText: "Please check your internet connection.", confidence: "Low" });
                                            } finally {
                                                setTranslating(false);
                                            }
                                        }}
                                        disabled={translating || !translateInput}
                                        className={`w-full bg-[#063925] text-white px-6 py-3 rounded-md font-bold transition-all flex items-center justify-center gap-2 ${translating || !translateInput ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0a4d32] shadow-lg shadow-emerald-900/10'}`}
                                    >
                                        {translating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <FaLanguage /> {t('dashboard.translate.button_process')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <SiGooglegemini size={22} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">{t('dashboard.translate.analysis_title')}</h2>
                                        <p className="text-xs text-slate-500">{t('dashboard.translate.powered_by')}</p>
                                    </div>
                                </div>

                                {translateResult ? (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.translate.exec_summary')}</h3>
                                            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-100">
                                                {translateResult.summary}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.translate.translated_content')}</h3>
                                            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line border-l-2 border-slate-200 pl-4">
                                                {translateResult.translatedText}
                                            </div>
                                        </div>
                                        <div className="absolute top-6 right-6 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                                            {translateResult.confidence} {t('dashboard.translate.confidence')}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 pb-12">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <SiGooglegemini size={40} className="text-slate-300" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">{t('dashboard.translate.waiting')}</p>
                                        <p className="text-xs text-slate-400 max-w-xs mt-2">{t('dashboard.translate.waiting_desc')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
