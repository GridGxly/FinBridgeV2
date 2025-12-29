import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChatWidget({ financialData = {} }) {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);


    const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001').replace(/\/$/, '');

    const [messages, setMessages] = useState([
        { id: 1, text: t('chat.welcome'), sender: 'bot' }
    ]);


    useEffect(() => {
        if (messages.length === 1 && messages[0].sender === 'bot') {
            setMessages([{ id: 1, text: t('chat.welcome'), sender: 'bot' }]);
        }
    }, [t, messages.length]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/advice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    history: messages.map(m => ({ sender: m.sender, text: m.text })),
                    language: t('language_name') || 'English',
                    context: financialData
                })
            });
            const data = await response.json();

            const botMsg = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: t('chat.error'), sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-lg shadow-2xl border border-gray-200 mb-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="bg-[#063925] p-3 text-white flex justify-between items-center">
                        <span className="font-bold text-sm">{t('chat.title')}</span>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded p-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map(msg => (
                            <div key={msg.id} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-[#063925] text-white self-end ml-auto' : 'bg-white border border-gray-200 text-slate-800 self-start'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="self-start text-xs text-slate-400 italic p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={t('chat.placeholder')}
                            className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#063925]"
                        />
                        <button type="submit" disabled={isLoading} className="bg-[#063925] text-white p-2 rounded hover:bg-[#0a4d32] disabled:opacity-50">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                        </button>
                    </form>
                </div>
            )}


            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-14 h-14 bg-[#063925] hover:bg-[#0a4d32] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                )}
            </button>
        </div>
    );
}
