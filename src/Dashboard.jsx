import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileUploader } from "react-drag-drop-files";
import { usePlaidLink } from 'react-plaid-link';
import {
    FaHome,
    FaExchangeAlt,
    FaFileAlt,
    FaWallet,
    FaQuestionCircle,
    FaBell,
    FaArrowDown,
    FaArrowRight,
    FaPlus,
    FaDownload,
    FaCheckCircle,
    FaGlobe,
    FaTrash,
    FaTimes
} from 'react-icons/fa';
import { FiUploadCloud, FiFileText, FiLoader } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWidget from './components/ChatWidget';
import LanguageSelector from './components/LanguageSelector';

const getDate = (daysAgo, locale = 'en-US') => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
};

const getDayLabel = (daysAgo, locale = 'en-US') => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString(locale, { weekday: 'short' });
};

const getFullDate = (daysAgo, locale = 'en-US') => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
};

const getInitialAccountsData = (t) => [
    { id: 1, name: 'Chase Total Checking', mask: '1234', balance: 4520.50, type: t('dashboard.accounts.type.checking', 'CHECKING'), logo: 'https://www.google.com/s2/favicons?domain=chase.com&sz=128' },
    { id: 2, name: 'Chase Sapphire Preferred', mask: '5670', balance: -1240.20, type: t('dashboard.accounts.type.credit', 'CREDIT'), logo: 'https://www.google.com/s2/favicons?domain=chase.com&sz=128' },
    { id: 3, name: 'Wells Fargo Savings', mask: '9012', balance: 18500.00, type: t('dashboard.accounts.type.savings', 'SAVINGS'), logo: 'https://www.google.com/s2/favicons?domain=wellsfargo.com&sz=128' }
];





const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

const LegalModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-auto shadow-2xl border border-transparent dark:border-gray-700"
            >
                <h2 className="text-2xl font-bold mb-4 font-serif text-[#064e3b] dark:text-emerald-400">{t('dashboard.legal_disclaimer', 'Disclaimer')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
                    {t('dashboard.legal_text', 'This is a demo project. No real banking data is processed. Finbridge is not a registered financial institution. All data shown is for demonstration purposes only.')}
                </p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#064e3b] text-white rounded-lg font-semibold hover:bg-[#053d2e] transition-colors shadow-lg shadow-emerald-900/20"
                    >
                        {t('dashboard.understood', 'Understood')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const DocPreviewModal = ({ doc, onClose }) => {
    const { t } = useTranslation();
    if (!doc) return null;

    const isImage = doc.preview && (doc.title.match(/\.(jpeg|jpg|png|gif)$/i) || doc.type === 'image');
    const hasPreview = !!doc.preview;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-0 max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col h-[85vh] border border-transparent dark:border-gray-700"
            >
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-900 dark:border-gray-700 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">{doc.icon}</div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{doc.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{doc.date} • {doc.type ? doc.type.toUpperCase() : 'FILE'}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-1 bg-gray-100 dark:bg-gray-900/50 overflow-hidden relative flex items-center justify-center">
                    {hasPreview ? (
                        isImage ? (
                            <img src={doc.preview} alt="Preview" className="max-w-full max-h-full object-contain shadow-sm" />
                        ) : (
                            <iframe src={doc.preview} className="w-full h-full bg-white" title="Document Preview" />
                        )
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-10 shadow-sm border dark:border-gray-700 rounded-xl max-w-md w-full text-center">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                {doc.icon}
                            </div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">{t('dashboard.preview.secure_title', 'Secure Document')}</h4>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                                {t('dashboard.preview.encrypted_text', 'This document is encrypted for your security. Please download the file to view its full contents locally.')}
                            </p>

                            <div className="text-left bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500 dark:text-gray-400">Status</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">{doc.status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500 dark:text-gray-400">Detail</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">{doc.detail}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500 dark:text-gray-400">ID Reference</span>
                                    <span className="font-mono text-gray-800 dark:text-gray-200 text-xs mt-0.5">{doc.id}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 flex justify-end gap-3 shrink-0">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-transparent rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{t('dashboard.preview.close', 'Close')}</button>
                    <button className="px-5 py-2.5 text-sm font-bold bg-[#064e3b] text-white rounded-xl hover:bg-[#053d2e] flex items-center gap-2 shadow-sm shadow-green-900/10">
                        <FaDownload /> {t('dashboard.preview.download', 'Download')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const GeminiIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.5 6.5 17.5 10.5 22 12C17.5 13.5 13.5 17.5 12 22C10.5 17.5 6.5 13.5 2 12C6.5 10.5 10.5 6.5 12 2Z" fill="url(#gemini-gradient)" />
        <defs>
            <linearGradient id="gemini-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4E79F3" />
                <stop offset="1" stopColor="#9C52F6" />
            </linearGradient>
        </defs>
    </svg>
);

export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { darkMode, setDarkMode } = useTheme();

    const [activeTab, setActiveTab] = useState('overview');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showLegal, setShowLegal] = useState(false);

    const [linkToken, setLinkToken] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [documents, setDocuments] = useState([]);

    const accounts = React.useMemo(() => getInitialAccountsData(t), [t]);



    // memoize localized data to update when i18n.language changes
    const currentLocale = i18n.language || 'en-US';

    const BALANCE_HISTORY = React.useMemo(() => [
        { date: getDate(30, currentLocale), balance: 20800 },
        { date: getDate(25, currentLocale), balance: 21100 },
        { date: getDate(20, currentLocale), balance: 21350 },
        { date: getDate(15, currentLocale), balance: 21200 },
        { date: getDate(10, currentLocale), balance: 21500 },
        { date: getDate(5, currentLocale), balance: 21650 },
        { date: t('dashboard.graph.time.today', 'Today'), balance: 21780 },
    ], [currentLocale, t]);

    const transactions = React.useMemo(() => [
        { id: 0, name: 'Electric Bill', date: getDate(0, currentLocale), category: t('dashboard.categories.utility', 'Utility'), amount: -120.50, logo: 'https://www.google.com/s2/favicons?domain=coned.com&sz=128' },
        { id: 1, name: 'Shake Shack', date: getDate(0, currentLocale), category: t('dashboard.categories.food', 'Food'), amount: -15.40, logo: 'https://www.google.com/s2/favicons?domain=shakeshack.com&sz=128' },
        { id: 2, name: 'Uber Ride', date: getDate(1, currentLocale), category: t('dashboard.categories.transport', 'Transport'), amount: -24.50, logo: 'https://www.google.com/s2/favicons?domain=uber.com&sz=128' },
        { id: 3, name: 'Google Inc.', date: getDate(3, currentLocale), category: t('dashboard.categories.income', 'Income'), amount: 2800.00, logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128' },
        { id: 4, name: 'Whole Foods Market', date: getDate(4, currentLocale), category: t('dashboard.categories.food', 'Food'), amount: -86.12, logo: 'https://www.google.com/s2/favicons?domain=wholefoodsmarket.com&sz=128' },
        { id: 5, name: 'Netflix Subscription', date: getDate(7, currentLocale), category: t('dashboard.categories.subscription', 'Subscription'), amount: -15.99, logo: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128' },
        { id: 6, name: 'Con Ed (Electric)', date: getDate(10, currentLocale), category: t('dashboard.categories.utility', 'Utility'), amount: -110.00, logo: 'https://www.google.com/s2/favicons?domain=coned.com&sz=128' },
        { id: 7, name: 'Starbucks', date: getDate(11, currentLocale), category: t('dashboard.categories.food', 'Food'), amount: -6.45, logo: 'https://www.google.com/s2/favicons?domain=starbucks.com&sz=128' },
        { id: 8, name: 'Target', date: getDate(12, currentLocale), category: t('dashboard.categories.shopping', 'Shopping'), amount: -42.30, logo: 'https://www.google.com/s2/favicons?domain=target.com&sz=128' },
        { id: 9, name: 'Spotify', date: getDate(15, currentLocale), category: t('dashboard.categories.subscription', 'Subscription'), amount: -10.99, logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128' },
        { id: 11, name: 'Delta Airlines', date: getDate(20, currentLocale), category: t('dashboard.categories.travel', 'Travel'), amount: -1590.35, logo: 'https://www.google.com/s2/favicons?domain=delta.com&sz=128' },
        { id: 10, name: 'Rent Payment', date: getDate(30, currentLocale), category: t('dashboard.categories.utility', 'Utility'), amount: -1500.00, logo: 'https://www.google.com/s2/favicons?domain=wellsfargo.com&sz=128' },
    ], [currentLocale, t]);

    const notifications = React.useMemo(() => [
        { id: 1, title: 'Electric Bill', desc: `${t('dashboard.graph.time.today', 'Today')} • $120.50` },
        { id: 2, title: 'Rent Due', desc: `${t('dashboard.graph.time.tomorrow', 'Tomorrow')} • $1,500.00` }
    ], [t]);

    const bills = React.useMemo(() => [
        { id: 1, name: 'Electric Bill', amount: 120.50, due: t('dashboard.graph.time.today', 'Today'), status: 'urgent' },
        { id: 2, name: 'Rent Due', amount: 1500.00, due: t('dashboard.graph.time.tomorrow', 'Tomorrow'), status: 'warning' }
    ], [t]);

    const initialDocuments = React.useMemo(() => [
        {
            id: 1,
            title: `Lease Renewal ${new Date().getFullYear()}`,
            status: t('dashboard.docs.action_required', 'Action Required'),
            detail: 'Late Fee Risk',
            date: getFullDate(5, currentLocale),
            type: t('dashboard.docs.type_pdf', 'PDF'),
            icon: <FaFileAlt className="text-red-500" />
        },
        {
            id: 2,
            title: `Chase Statement ${new Date().toLocaleDateString(currentLocale, { month: 'short' })}`,
            status: t('dashboard.docs.ready', 'Ready'),
            detail: 'Summary Available',
            date: getFullDate(12, currentLocale),
            type: t('dashboard.docs.type_pdf', 'PDF'),
            icon: <FiFileText className="text-blue-500" />
        },
        {
            id: 3,
            title: `Medical Bill ${new Date().toLocaleDateString(currentLocale, { month: 'short' })}`,
            status: t('dashboard.docs.ready', 'Ready'),
            detail: 'Simplified',
            date: getFullDate(18, currentLocale),
            type: t('dashboard.docs.type_pdf', 'PDF'),
            icon: <FiFileText className="text-gray-500" />
        }
    ], [currentLocale, t]);

    useEffect(() => {
        setDocuments(prevDocs => {
            const userDocs = prevDocs.filter(d => d.id > 100);
            return [...initialDocuments, ...userDocs];
        });
    }, [initialDocuments]);

    const SPENDING_CHART_DATA = React.useMemo(() => [
        { day: getDayLabel(6, currentLocale), v: 120 },
        { day: getDayLabel(5, currentLocale), v: 210 },
        { day: getDayLabel(4, currentLocale), v: 180 },
        { day: getDayLabel(3, currentLocale), v: 160 },
        { day: getDayLabel(2, currentLocale), v: 240 },
        { day: getDayLabel(1, currentLocale), v: 190 },
        { day: getDayLabel(0, currentLocale), v: 105 },
    ], [currentLocale]);






    useEffect(() => {
        const generateLinkToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plaid/create_link_token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user?.uid || 'demo_user' }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setLinkToken(data.link_token);
                } else {
                    console.warn("Could not fetch Plaid Link Token - backend might be down.");
                }

            } catch (error) {
                console.error("Error fetching link token:", error);
            }
        };
        generateLinkToken();
    }, [user]);

    const handlePlaidSuccess = useCallback(async (public_token, metadata) => {
        try {
            console.log("Plaid Success:", metadata);
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plaid/exchange_public_token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_token }),
            });
            alert("Account connected successfully! (In a real app, data would now refresh)");

        } catch (error) {
            console.error("Error exchanging public token:", error);
        }
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: handlePlaidSuccess,
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setHasUnread(false);
        }
    };



    const handleExportCSV = () => {
        const headers = ["Transaction", "Date", "Category", "Amount"];
        const rows = transactions.map(tx => [
            tx.name,
            tx.date,
            tx.category,
            tx.amount
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewDoc = (doc) => {
        setSelectedDoc(doc);
    };

    const handleFileUploadSafe = async (fileOrEvent) => {
        let file = fileOrEvent;
        if (fileOrEvent.target && fileOrEvent.target.files) {
            file = fileOrEvent.target.files[0];
        }

        if (!file) return;

        setIsAnalyzing(true);
        setUploadError(null);
        setAnalysisResult(null);

        let displayTitle = file.name;
        if (file.name.match(/^(IMG|DSC|Screenshot)/i) || file.name.length > 20) {
            displayTitle = `Scanned Doc ${new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}`;
        }

        const previewUrl = URL.createObjectURL(file);

        const tempId = Date.now();
        const newDoc = {
            id: tempId,
            title: displayTitle,
            status: 'Analyzing',
            detail: 'Processing...',
            date: getFullDate(0),
            type: file.type.includes('pdf') ? 'pdf' : 'image',
            icon: <FiLoader className="text-yellow-500 animate-spin" />,
            preview: previewUrl
        };
        setDocuments(prev => [newDoc, ...prev]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetLanguage', 'English');
        if (user?.uid) formData.append('userId', user.uid);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/translate`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Backend failed');

            const data = await response.json();

            setAnalysisResult(data);
            setDocuments(prev => prev.map(d => d.id === tempId ? {
                ...d,
                status: 'Ready',
                detail: 'Analysis Complete',
                icon: <FiFileText className="text-green-500" />
            } : d));
            setIsAnalyzing(false);

        } catch (error) {
            console.log("Backend offline? Using CLIENT-SIDE FALLBACK for presentation.");

            setTimeout(() => {
                setAnalysisResult({
                    summary: "This document appears to be a monthly statement. Total due is $120.50. No unusual activity detected.",
                    translatedText: "Statement Date: Dec 31, 2025\nTotal Due: $120.50\nVendor: Con Edison"
                });
                setDocuments(prev => prev.map(d => d.id === tempId ? {
                    ...d,
                    status: 'Ready',
                    detail: 'Analyzed (Offline)',
                    icon: <FiFileText className="text-green-500" />
                } : d));
                setIsAnalyzing(false);
            }, 1500);
        }
    };


    const totalMoneyOut = Math.abs(transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const foodSpending = Math.abs(transactions
        .filter(t => t.category === 'Food' && t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const foodPercentage = totalMoneyOut > 0 ? ((foodSpending / totalMoneyOut) * 100).toFixed(0) : 0;

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);



    const transitionClass = "transition-all duration-500 ease-in-out";

    const bgClass = `${transitionClass} ${darkMode ? 'bg-gray-900' : 'bg-[#F9F9F5]'}`;
    const textClass = `${transitionClass} ${darkMode ? 'text-white' : 'text-gray-900'}`;
    const cardClass = `${transitionClass} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`;
    const subTextClass = `${transitionClass} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className={`flex h-screen ${bgClass} ${transitionClass} overflow-hidden font-sans ${darkMode ? 'dark' : ''}`}>

            <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
            <DocPreviewModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />

            <aside className={`w-64 border-r flex flex-col fixed h-full z-20 ${transitionClass} ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <button
                            onClick={() => navigate('/')}
                            className={`flex items-center gap-3 group hover:opacity-80 transition-opacity`}
                        >
                            <img src="/favicon.png" alt="FinBridge" className={`w-8 h-8 ${darkMode ? 'opacity-90 grayscale' : 'opacity-90 grayscale group-hover:grayscale-0'} transition-all`} />
                            <span className={`text-2xl font-bold font-serif tracking-tight ${darkMode ? 'text-white' : 'text-[#0b0f19]'}`}>
                                FINBRIDGE
                            </span>
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { id: 'overview', icon: <FaHome />, label: t('dashboard.nav.overview', 'Overview') },
                            { id: 'transactions', icon: <FaExchangeAlt />, label: t('dashboard.nav.transactions', 'Activity') },
                            { id: 'documents', icon: <FaFileAlt />, label: t('dashboard.nav.documents', 'Documents') },
                            { id: 'accounts', icon: <FaWallet />, label: t('dashboard.nav.accounts', 'Accounts') },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-[#E6F4F1] text-[#064e3b] font-semibold'
                                    : `${subTextClass} hover:bg-opacity-10 hover:bg-gray-500`
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span> {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={`mt-auto p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <button
                        onClick={() => setShowLegal(true)}
                        className={`flex items-center gap-3 hover:text-[#064e3b] transition-colors ${subTextClass}`}
                    >
                        <FaQuestionCircle /> {t('dashboard.legal_disclaimer', 'Disclaimer')}
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-6 overflow-y-auto h-full">

                <header className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className={`text-2xl font-bold font-serif ${darkMode ? 'text-white' : 'text-[#064e3b]'}`}>
                            {activeTab === 'overview' ? t('dashboard.nav.overview', 'Overview') : activeTab === 'transactions' ? t('dashboard.nav.transactions', 'Activity') : activeTab === 'documents' ? t('dashboard.nav.documents', 'Documents') : t('dashboard.nav.accounts', 'Accounts')}
                        </h1>
                        {activeTab === 'overview' && (
                            <button
                                onClick={() => setActiveTab('documents')}
                                className="bg-[#064e3b] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm hover:bg-[#053d2e]"
                            >
                                <FiFileText /> {t('dashboard.translate.upload_title', 'Upload Document')}
                            </button>
                        )}

                    </div>

                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <button onClick={toggleNotifications} className={`relative hover:text-[#064e3b] ${subTextClass}`}>
                                <FaBell className="text-xl" />
                                {hasUnread && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                                    >
                                        <h3 className="font-bold text-gray-800 mb-3">{t('dashboard.notifications.title', 'Notifications')}</h3>
                                        <div className="space-y-3">
                                            {notifications.map(n => (
                                                <div key={n.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-800">{n.title}</p>
                                                        <p className="text-xs text-gray-500">{n.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm"
                            >
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" />
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 z-50 text-gray-800 dark:text-gray-100"
                                    >
                                        <div className="pb-4 mb-4 border-b border-gray-100 dark:border-gray-700">
                                            <p className="font-bold text-gray-800 dark:text-white text-lg">Sarah Jenkins</p>
                                            <p className="text-sm text-gray-500">sarah.jenkins.design@gmail.com</p>
                                        </div>

                                        <div className="space-y-4 mb-4">

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">{t('dashboard.profile.appearance', 'Appearance')}</span>
                                                <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                                                    <button
                                                        onClick={() => setDarkMode(false)}
                                                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${!darkMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                                    >
                                                        {t('dashboard.profile.light', 'Light')}
                                                    </button>
                                                    <button
                                                        onClick={() => setDarkMode(true)}
                                                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${darkMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                                    >
                                                        {t('dashboard.profile.dark', 'Dark')}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">{t('dashboard.profile.language', 'Language')}</span>
                                                <LanguageSelector />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2 font-semibold transition-colors px-2"
                                            >
                                                <FaArrowRight className="rotate-180" /> {t('dashboard.profile.sign_out', 'Sign out')}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-20"
                    >

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border`}>
                                <h3 className={`${subTextClass} text-xs font-semibold mb-2 uppercase tracking-wide`}>{t('dashboard.stats.total_balance', 'Total Balance')}</h3>
                                <div className="flex items-end gap-3">
                                    <span className={`text-3xl font-bold tracking-tight tabular-nums ${textClass}`}>
                                        ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className={`w-16 h-1 mt-4 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <div className="w-full h-full bg-[#10B981]"></div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-[#064e3b] text-sm font-medium flex items-center gap-1">
                                        <FaArrowDown className="text-xs rotate-180" /> 4.2% <span className={`${subTextClass} font-normal`}>{t('dashboard.stats.last_30_days', 'last 30 days')}</span>
                                    </p>
                                    <div className="h-6 w-16">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={[{ v: 10 }, { v: 12 }, { v: 15 }, { v: 20 }, { v: 25 }, { v: 30 }]}>
                                                <Area type="monotone" dataKey="v" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border h-64 flex flex-col`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className={`font-bold ${textClass} text-sm`}>{t('dashboard.stats.account_balance_history', 'Balance History')}</h3>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{t('dashboard.stats.n_days', '30 Days')}</span>
                                </div>
                                <div className="flex-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={BALANCE_HISTORY}>
                                            <defs>
                                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} stroke={darkMode ? '#374151' : '#f3f4f6'} strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 9, fill: '#9CA3AF' }}
                                                dy={10}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 9, fill: '#9CA3AF' }}
                                                domain={[20000, 22000]}
                                                tickFormatter={(value) => `$${value / 1000}k`}
                                                width={30}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: darkMode ? '#1F2937' : '#fff',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                                formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                                            />
                                            <Area
                                                type="linear"
                                                dataKey="balance"
                                                stroke="#10B981"
                                                strokeWidth={2}
                                                fill="url(#colorBalance)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border`}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className={`${subTextClass} text-xs font-semibold uppercase tracking-wide`}>{t('dashboard.stats.money_out', 'Money Out')}</h3>
                                    <button onClick={() => setActiveTab('transactions')} className="text-xs font-bold text-gray-400 hover:text-[#064e3b]">{t('dashboard.recent.view_all', 'View All')}</button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-800 tracking-tight tabular-nums">
                                            ${totalMoneyOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                        <p className="text-gray-500 text-xs mt-1 font-medium">
                                            {t('dashboard.stats.vs', 'vs')} <span className="text-gray-400">$3,100</span> <span className={`${subTextClass} font-normal`}>{t('dashboard.stats.avg', 'avg')}</span>
                                        </p>
                                    </div>
                                    <div className="h-24 w-44">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={SPENDING_CHART_DATA} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f3f4f6'} />
                                                <XAxis
                                                    dataKey="day"
                                                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    interval={0}
                                                    height={12}
                                                />
                                                <YAxis
                                                    domain={[0, 300]}
                                                    ticks={[0, 100, 200, 300]}
                                                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tickFormatter={(value) => `$${value}`}
                                                    width={35}
                                                />
                                                <Bar dataKey="v" fill="#EF4444" radius={[2, 2, 0, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border flex flex-col justify-center relative overflow-hidden h-48`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                                    <GeminiIcon className="w-24 h-24" />
                                </div>
                                <div className="w-8 h-8 mb-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg flex items-center justify-center shadow-sm border border-indigo-100">
                                    <GeminiIcon className="w-5 h-5" />
                                </div>
                                <h3 className={`font-bold mb-1 ${textClass} text-sm`}>{t('dashboard.stats.gemini_analysis', 'Smart Insights')}</h3>
                                <p className={`text-xs mb-3 leading-relaxed ${subTextClass}`}>
                                    {t('dashboard.stats.gemini_desc', 'You spent $800 on food this month (20% of income).').replace('$800', `$${foodSpending.toFixed(0)}`).replace('20%', `${foodPercentage}%`)}
                                </p>
                                <div className={`${foodPercentage < 10 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'} p-3 rounded-lg border`}>
                                    <p className={`text-[10px] ${foodPercentage < 10 ? 'text-green-800' : 'text-orange-800'} leading-snug font-medium`}>
                                        <span className={`font-bold ${foodPercentage < 10 ? 'text-green-700' : 'text-orange-700'}`}>
                                            {foodPercentage < 10 ? t('dashboard.stats.great_job', 'Great job!') : t('dashboard.stats.alert', 'Alert:')}
                                        </span>
                                        {foodPercentage < 10
                                            ? t('dashboard.stats.under_budget', ' You remain well under your 10% dining budget. ')
                                            : t('dashboard.stats.over_budget', ' Dining spend has exceeded 10% target. ')}
                                        {t('dashboard.stats.see', 'See')} <button onClick={() => setActiveTab('transactions')} className={`underline cursor-pointer inline-flex items-center font-bold hover:opacity-80 ${foodPercentage < 10 ? 'text-green-700' : 'text-orange-700'}`}>{t('dashboard.nav.transactions', 'Activity')}</button>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border`}>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className={`${subTextClass} text-xs font-semibold uppercase tracking-wide`}>{t('dashboard.stats.todo_list', 'To-Do')}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full">2 {t('dashboard.stats.alerts', 'Alerts')}</span>
                                        <button onClick={() => { }} className="text-xs font-bold text-gray-400 hover:text-[#064e3b]">{t('dashboard.recent.view_all', 'View All')}</button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {bills.map(bill => (
                                        <div key={bill.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{bill.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-bold tabular-nums ${textClass}`}>${bill.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider ${bill.due === t('dashboard.graph.time.today', 'Today') ? 'text-red-600' : 'text-orange-500'
                                                    }`}>{bill.due}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`${cardClass} p-5 rounded-2xl shadow-sm border flex-1`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className={`font-bold ${textClass} text-sm`}>{t('dashboard.docs.recent_title', 'Recent Documents')}</h3>
                                    <button onClick={() => setActiveTab('documents')} className="text-xs font-bold text-gray-400 hover:text-[#064e3b]">{t('dashboard.recent.view_all', 'View All')}</button>
                                </div>
                                <div className="space-y-3">
                                    {documents.slice(0, 3).map(doc => (
                                        <div key={doc.id} className={`group p-2.5 rounded-xl transition-colors border border-transparent cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50 hover:border-gray-100'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-50 group-hover:bg-white group-hover:shadow-sm'}`}>
                                                        {doc.icon}
                                                    </div>
                                                    <div>
                                                        <p className={`font-bold text-sm leading-tight mb-0.5 ${textClass}`}>{doc.title}</p>
                                                        <p className="text-[10px] text-gray-400">{doc.date}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleViewDoc(doc)}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-200 hover:text-[#064e3b] transition-colors"
                                                >
                                                    <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>

                    </motion.div>
                )}

                {activeTab === 'transactions' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 pb-20"
                    >
                        <div className={`${cardClass} rounded-2xl shadow-sm border overflow-hidden`}>
                            <div className={`p-5 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <h3 className={`font-bold ${textClass}`}>{t('dashboard.activity.title', 'Recent Activity')}</h3>
                                <button onClick={handleExportCSV} className="text-xs font-bold text-white bg-[#064e3b] px-4 py-2 rounded-lg hover:bg-[#053d2e] flex items-center gap-2 transition-all shadow-sm">
                                    <FaDownload /> {t('dashboard.linked_accounts_export', 'Export CSV')}
                                </button>
                            </div>
                            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                                {transactions.map(tx => (
                                    <div key={tx.id} className={`p-4 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 bg-white ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
                                                <img src={tx.logo} alt={tx.name} className="w-full h-full object-contain p-1" />
                                            </div>
                                            <div>
                                                <p className={`font-bold text-sm ${textClass}`}>{tx.name}</p>
                                                <p className="text-xs text-gray-400">{tx.date} • {tx.category}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold text-sm tabular-nums ${tx.amount > 0 ? 'text-green-600' : textClass}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'documents' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 pb-20 max-w-5xl mx-auto"
                    >
                        <div className={`${cardClass} rounded-2xl shadow-sm border overflow-hidden`}>
                            <div className={`p-5 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <h3 className={`font-bold ${textClass}`}>{t('dashboard.docs.title', 'My Documents')}</h3>
                                <span className="text-xs text-gray-400">{documents.length} {t('dashboard.docs.files_count', 'files')}</span>
                            </div>
                            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                                {documents.map(doc => (
                                    <div key={doc.id} className={`p-4 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-sm`}>
                                                {doc.icon}
                                            </div>
                                            <div>
                                                <p className={`font-bold text-sm ${textClass}`}>{doc.title}</p>
                                                <p className="text-xs text-gray-400">{doc.date} • {doc.type.toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${doc.status === t('dashboard.docs.action_required', 'Action Required') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {doc.status}
                                            </span>
                                            <button
                                                onClick={() => handleViewDoc(doc)}
                                                className="text-gray-400 hover:text-[#064e3b] p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${cardClass} rounded-2xl shadow-sm border p-8 text-center`}>

                            {!isAnalyzing && !analysisResult && (
                                <FileUploader
                                    handleChange={handleFileUploadSafe}
                                    name="file"
                                    types={fileTypes}
                                    classes="w-full h-full"
                                >
                                    <div
                                        className="cursor-pointer group relative border-2 border-dashed border-gray-300 hover:border-[#064e3b] rounded-2xl p-12 transition-all bg-gray-50 hover:bg-[#E6F4F1] flex flex-col items-center justify-center min-h-[300px]"
                                    >
                                        <div className="flex flex-col items-center gap-4 pointer-events-none">
                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-[#064e3b] group-hover:scale-110 transition-transform">
                                                <FiUploadCloud size={40} />
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-bold ${textClass} mb-2`}>{t('dashboard.translate.drag_drop', 'Click or Drag to Upload')}</h3>
                                                <p className="text-gray-500">{t('dashboard.translate.formats', 'Supported formats: PDF, PNG, JPG')}</p>
                                                <p className="text-gray-400 text-xs mt-2">({t('dashboard.translate.max_size', 'Max 5MB')})</p>
                                            </div>
                                        </div>
                                    </div>
                                </FileUploader>
                            )}

                            {uploadError && (
                                <p className="text-red-500 mt-4 font-bold">{uploadError}</p>
                            )}

                            {isAnalyzing && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FiLoader className="text-4xl text-[#064e3b] animate-spin mb-4" />
                                    <p className={`font-bold ${textClass}`}>{t('dashboard.translate.analyzing', 'Analyzing Document...')}</p>
                                    <p className="text-sm text-gray-500">{t('dashboard.translate.extracting', 'Extracting financial data safely')}</p>
                                </div>
                            )}

                            {analysisResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-left max-w-2xl mx-auto"
                                >
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FaCheckCircle className="text-green-600 text-xl" />
                                            <h3 className="font-bold text-green-900 text-lg">{t('dashboard.translate.complete', 'Analysis Complete')}</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-bold text-green-700 uppercase tracking-wide">{t('dashboard.translate.exec_summary', 'Executive Summary')}</p>
                                                <p className="text-gray-800 leading-relaxed">{analysisResult.summary}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t('dashboard.translate.extracted_data', 'Extracted Data')}</p>
                                                <p className="text-sm font-mono text-gray-700 whitespace-pre-line">{analysisResult.translatedText}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setAnalysisResult(null); setIsAnalyzing(false); }}
                                        className="mx-auto block text-gray-500 hover:text-gray-900 underline text-sm"
                                    >
                                        {t('dashboard.translate.upload_another', 'Upload Another')}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'accounts' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 pb-20 max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {accounts.map(acc => (
                                <div key={acc.id} className={`${cardClass} p-6 rounded-2xl shadow-sm border relative overflow-hidden group transition-all hover:shadow-md`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg p-1 border shadow-sm flex items-center justify-center">
                                                <img src={acc.logo} alt={acc.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h3 className={`font-bold ${textClass} text-sm`}>{acc.name}</h3>
                                                <p className="text-xs text-gray-400">•••• •••• •••• {acc.mask}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${acc.type === 'checking' ? 'bg-blue-50 text-blue-600' :
                                            acc.type === 'savings' ? 'bg-green-50 text-green-600' :
                                                'bg-orange-50 text-orange-600'
                                            }`}>
                                            {acc.type}
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500 mb-1">
                                            {acc.type === 'credit' ? t('dashboard.accounts.current_balance', 'Current Balance') : t('dashboard.accounts.available_balance', 'Available Balance')}
                                        </p>
                                        <p className={`text-2xl font-bold tabular-nums ${acc.type !== 'credit' && acc.balance < 0 ? 'text-red-500' : textClass}`}>
                                            ${Math.abs(acc.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => open()}
                                disabled={!ready}
                                className={`border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-600 hover:border-[#064e3b] hover:text-[#064e3b] hover:bg-green-50/50 transition-all min-h-[180px] ${!ready ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-white">
                                    <FaPlus className="text-xl" />
                                </div>
                                <span className="font-semibold text-sm">{ready ? t('dashboard.accounts.link_new', 'Link New Account') : t('dashboard.accounts.loading_plaid', 'Loading Plaid...')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}

            </main>
        </div>
    );
}
