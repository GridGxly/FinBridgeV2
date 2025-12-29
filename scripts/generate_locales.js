
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supportedLngs = ['en', 'es', 'zh', 'hi', 'fr', 'tl', 'vi', 'ar', 'ht', 'de'];

const dictionaries = {
    en: {
        header: {
            nav: { banking: "Banking", loans: "Mortgage & Loans", investing: "Investing", sign_in: "SIGN IN", dashboard: "DASHBOARD" }
        },
        translation: {
            hero: {
                badge: "Financial Literacy for All",
                title_start: "Bridging the gap between",
                title_highlight: "culture and finance.",
                subtitle: "Simplicity and clarity for your financial future. Finbridge connects you to your money with culturally aware guidance in your language.",
                cta_primary: "Connect Your Bank",
                cta_secondary: "Learn More",
                copyright: "© 2025 Finbridge"
            },
            features: {
                community: {
                    title: "Community First",
                    description: "Tailored financial advice that respects your cultural values and community saving practices."
                },
                literacy: {
                    title: "Financial Literacy",
                    description: "Learn about credit, savings, and investments in simple terms, translated into your language."
                },
                security: {
                    title: "Secure Connection",
                    description: "Bank-grade security ensures your data is safe while you get a clear view of your finances."
                }
            },
            footer: {
                about: {
                    title: "About Us",
                    mission: "Our Mission",
                    impact: "Community Impact",
                    diversity: "Diversity & Inclusion"
                },
                resources: {
                    title: "Resources",
                    guides: "Financial Guides",
                    language: "Language Support",
                    help: "Help Center"
                },
                stay_informed: {
                    title: "Stay Informed",
                    subtitle: "Subscribe to receive financial tips and market updates.",
                    placeholder: "Email Address",
                    button: "Sign Up",
                    subscribed: "Subscribed!"
                },
                copyright: "© 2025 Finbridge",
                description: "Serving our communities with integrity, transparency, and cultural understanding since 2025."
            },
            login: {
                brand: "Finbridge",
                hero: {
                    title: "Money,\nTranslated.",
                    subtitle: "Navigate your financial journey with clarity and confidence.",
                    copyright: "© 2025 Finbridge"
                },
                form: {
                    title: "Log in",
                    subtitle: "Link your primary financial account to verify your identity.",
                    button: "Connect Bank Account",
                    encryption: "End-to-end encrypted via Plaid",
                    terms_prefix: "By connecting, you agree to Finbridge's",
                    terms_link: "Terms",
                    privacy_link: "Privacy Policy",
                    terms_suffix: ".",
                    and: "and"
                },
                loading: "Establishing secure connection..."
            },
            dashboard: {
                title: "Dashboard",
                nav: { overview: "Overview", accounts: "Accounts", transactions: "Transactions", cash_flow: "Cash Flow", translate: "Translate Docs" },
                stats: { net_worth: "Net Worth", assets: "Assets", liabilities: "Liabilities" },
                graph: {
                    title: "Cash Flow",
                    generating: "Generating AI Graph...",
                    unavailable: "Graph Unavailable",
                    time: { this_month: "This Month", last_month: "Last Month", ytd: "YTD" }
                },
                translate: {
                    title: "Translate Documents",
                    updated: "Last updated: Just now",
                    upload_title: "Upload Document",
                    upload_desc: "Paste text or upload a file for translation and summarization.",
                    button_upload: "Upload File (PDF/IMG)",
                    button_process: "Translate & Summarize",
                    analysis_title: "AI Analysis",
                    powered_by: "Powered by Gemini",
                    waiting: "Waiting for content...",
                    waiting_desc: "AI will translate the document into your preferred language and provide a summary of key points.",
                    exec_summary: "Executive Summary",
                    translated_content: "Translated Content",
                    confidence: "Confidence"
                },
                recent: { title: "Recent Transactions", view_all: "View All" },
                updated: "Last updated: Just now"
            }
        }
    },
    es: {
        header: { nav: { banking: "Banca", loans: "Hipotecas", investing: "Inversiones", sign_in: "INICIAR SESIÓN", dashboard: "PANEL" } },
        translation: {
            hero: {
                badge: "Educación Financiera para Todos",
                title_start: "Uniendo",
                title_highlight: "cultura y finanzas.",
                subtitle: "Claridad para tu futuro financiero. Finbridge te conecta con tu dinero en tu idioma.",
                cta_primary: "Conectar Banco",
                cta_secondary: "Más Información"
            },
            features: {
                community: { title: "Comunidad Primero", description: "Asesoramiento financiero adaptado a tus valores culturales." },
                literacy: { title: "Educación Financiera", description: "Aprende sobre crédito, ahorros e inversiones en términos simples." },
                security: { title: "Conexión Segura", description: "Seguridad de nivel bancario para proteger tus datos." }
            },
            footer: {
                about: { title: "Sobre Nosotros", mission: "Nuestra Misión", impact: "Impacto Comunitario", diversity: "Diversidad e Inclusión" },
                resources: { title: "Recursos", guides: "Guías Financieras", language: "Soporte de Idiomas", help: "Centro de Ayuda" },
                stay_informed: { title: "Mantente Informado", subtitle: "Suscríbete para recibir consejos financieros.", placeholder: "Dirección de Correo", button: "Suscribirse", subscribed: "¡Suscrito!" },
                copyright: "© 2025 Finbridge",
                description: "Sirviendo a nuestras comunidades con integridad y entendimiento cultural."
            },
            login: {
                brand: "Finbridge",
                hero: { title: "Dinero,\nTraducido.", subtitle: "Navegue su viaje financiero con claridad.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Iniciar Sesión",
                    subtitle: "Conecte su cuenta bancaria para verificar su identidad.",
                    button: "Conectar Cuenta Bancaria",
                    encryption: "Encriptado de extremo a extremo vía Plaid",
                    terms_prefix: "Al conectar, acepta los",
                    terms_link: "Términos",
                    privacy_link: "Política de Privacidad",
                    terms_suffix: " de Finbridge.",
                    and: "y"
                },
                loading: "Estableciendo conexión segura..."
            },
            dashboard: {
                title: "Panel de Control",
                nav: { overview: "Resumen", accounts: "Cuentas", transactions: "Transacciones", cash_flow: "Flujo de Caja" },
                stats: { net_worth: "Patrimonio Neto", assets: "Activos", liabilities: "Pasivos" },
                graph: {
                    title: "Flujo de Caja",
                    generating: "Generando Gráfico IA...",
                    unavailable: "Gráfico No Disponible",
                    time: { this_month: "Este Mes", last_month: "Mes Pasado", ytd: "Año Actual" }
                },
                recent: { title: "Transacciones Recientes", view_all: "Ver Todo" },
                updated: "Última actualización: Justo ahora"
            }
        }
    },
    zh: {
        header: { nav: { banking: "银行业务", loans: "贷款", investing: "投资", sign_in: "登录", dashboard: "仪表板" } },
        translation: {
            hero: {
                badge: "全民金融素养",
                title_start: "弥合",
                title_highlight: "文化与金融。",
                subtitle: "为您的未来提供清晰的财务指导。Finbridge 用您的语言为您提供具有文化意识的指导。",
                cta_primary: "连接银行",
                cta_secondary: "了解更多"
            },
            features: {
                community: { title: "社区优先", description: "尊重您文化价值观的定制财务建议。" },
                literacy: { title: "金融素养", description: "用简单的术语学习信用、储蓄和投资。" },
                security: { title: "安全连接", description: "银行级安全保障您的数据安全。" }
            },
            footer: {
                about: { title: "关于我们", mission: "我们的使命", impact: "社区影响", diversity: "多元化与包容性" },
                resources: { title: "资源", guides: "理财指南", language: "语言支持", help: "帮助中心" },
                stay_informed: { title: "保持知情", subtitle: "订阅以接收理财技巧和市场更新。", placeholder: "电子邮件地址", button: "注册", subscribed: "已订阅！" },
                copyright: "© 2025 Finbridge",
                description: "以诚信、透明和文化理解服务我们的社区。"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "金钱，\n翻译。", subtitle: "清晰自信地驾驭您的财务之旅。", copyright: "© 2025 Finbridge" },
                form: {
                    title: "登录",
                    subtitle: "连接您的主要银行账户以验证您的身份。",
                    button: "连接银行账户",
                    encryption: "通过 Plaid 进行端到端加密",
                    terms_prefix: "连接即表示您同意 Finbridge 的",
                    terms_link: "条款",
                    privacy_link: "隐私政策",
                    terms_suffix: "。",
                    and: "和"
                },
                loading: "正在建立安全连接..."
            },
            dashboard: {
                title: "仪表板",
                nav: { overview: "概览", accounts: "账户", transactions: "交易", cash_flow: "现金流", translate: "翻译文档" },
                translate: {
                    title: "翻译文档",
                    updated: "最后更新：刚刚",
                    upload_title: "上传文档",
                    upload_desc: "粘贴文本或上传文件以进行翻译和摘要。",
                    input_placeholder: "在此粘贴您的财务文档内容（例如：租赁协议，银行对账单）...",
                    button_upload: "上传文件 (PDF/IMG)",
                    button_process: "翻译并摘要",
                    analysis_title: "AI 分析",
                    powered_by: "由 Gemini 提供支持",
                    waiting: "等待内容...",
                    waiting_desc: "AI 将把文档翻译成您的首选语言并提供关键点摘要。",
                    exec_summary: "执行摘要",
                    translated_content: "翻译内容",
                    confidence: "置信度"
                },
                stats: { net_worth: "净资产", assets: "资产", liabilities: "负债" },
                graph: {
                    title: "现金流",
                    generating: "正在生成 AI 图表...",
                    unavailable: "图表不可用",
                    time: { this_month: "本月", last_month: "上月", ytd: "年初至今" }
                },
                recent: { title: "近期交易", view_all: "查看全部" },
                updated: "最后更新：刚才"
            }
        }
    },
    de: {
        header: { nav: { banking: "Bankwesen", loans: "Kredite", investing: "Investieren", sign_in: "ANMELDEN", dashboard: "DASHBOARD" } },
        translation: {
            hero: {
                badge: "Finanzkompetenz für alle",
                title_start: "Die Brücke zwischen",
                title_highlight: "Kultur und Finanzen.",
                subtitle: "Einfachheit und Klarheit für Ihre finanzielle Zukunft. Finbridge verbindet Sie mit Ihrem Geld.",
                cta_primary: "Bank verbinden",
                cta_secondary: "Mehr erfahren"
            },
            dashboard: {
                title: "Dashboard",
                nav: { overview: "Überblick", accounts: "Konten", transactions: "Transaktionen", cash_flow: "Cashflow" },
                stats: { net_worth: "Reinvermögen", assets: "Vermögenswerte", liabilities: "Verbindlichkeiten" },
                graph: {
                    title: "Cashflow",
                    generating: "Generiere KI-Grafik...",
                    unavailable: "Grafik nicht verfügbar",
                    time: { this_month: "Diesen Monat", last_month: "Letzten Monat", ytd: "lfd. Jahr" }
                },
                recent: { title: "Letzte Transaktionen", view_all: "Alle ansehen" },
                updated: "Zuletzt aktualisiert: Gerade eben"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "Geld,\nÜbersetzt.", subtitle: "Navigieren Sie Ihre finanzielle Reise mit Klarheit.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Anmelden",
                    subtitle: "Verbinden Sie Ihr Bankkonto.",
                    button: "Bankkonto verbinden",
                    encryption: "End-to-End verschlüsselt via Plaid",
                    terms_prefix: "Mit der Verbindung stimmen Sie",
                    terms_link: "Bedingungen",
                    privacy_link: "Datenschutz",
                    terms_suffix: " zu.",
                    and: "und"
                },
                loading: "Sichere Verbindung herstellen..."
            }
        }
    },
    fr: {
        header: { nav: { banking: "Banque", loans: "Prêts", investing: "Investir", sign_in: "CONNEXION", dashboard: "TABLEAU DE BORD" } },
        translation: {
            hero: {
                badge: "Littératie financière pour tous",
                title_start: "Combler le fossé entre",
                title_highlight: "culture et finance.",
                subtitle: "Simplicité et clarté pour votre avenir financier.",
                cta_primary: "Connecter la banque",
                cta_secondary: "En savoir plus"
            },
            dashboard: {
                title: "Tableau de bord",
                nav: { overview: "Vue d'ensemble", accounts: "Comptes", transactions: "Transactions", cash_flow: "Flux de trésorerie" },
                stats: { net_worth: "Valeur Nette", assets: "Actifs", liabilities: "Passifs" },
                graph: {
                    title: "Flux de trésorerie",
                    generating: "Génération du graphique IA...",
                    unavailable: "Graphique indisponible",
                    time: { this_month: "Ce mois-ci", last_month: "Mois dernier", ytd: "Cumul annuel" }
                },
                recent: { title: "Transactions récentes", view_all: "Voir tout" },
                updated: "Mis à jour: À l'instant"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "L'argent,\nTraduit.", subtitle: "Naviguez votre parcours financier avec clarté.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Connexion",
                    subtitle: "Liez votre compte financier principal.",
                    button: "Connecter compte bancaire",
                    encryption: "Chiffré de bout en bout via Plaid",
                    terms_prefix: "En connectant, vous acceptez les",
                    terms_link: "Conditions",
                    privacy_link: "Confidentialité",
                    terms_suffix: ".",
                    and: "et"
                },
                loading: "Établissement connexion sécurisée..."
            }
        }
    },
    hi: {
        header: { nav: { banking: "बैंकिंग", loans: "ऋण", investing: "निवेश", sign_in: "साइन इन", dashboard: "डैशबोर्ड" } },
        translation: {
            hero: {
                badge: "सभी के लिए वित्तीय साक्षरता",
                title_start: "संस्कृति और",
                title_highlight: "वित्त को जोड़ना।",
                subtitle: "आपके वित्तीय भविष्य के लिए सरलता और स्पष्टता।",
                cta_primary: "बैंक कनेक्ट करें",
                cta_secondary: "और जानें"
            },
            dashboard: {
                title: "डैशबोर्ड",
                nav: { overview: "अवलोकन", accounts: "खाते", transactions: "लेनदेन", cash_flow: "नकदी प्रवाह", translate: "दस्तावेज़ अनुवाद" },
                stats: { net_worth: "कुल संपत्ति", assets: "संपत्ति", liabilities: "देनदारियां" },
                graph: {
                    title: "नकदी प्रवाह",
                    generating: "AI ग्राफ जनरेट हो रहा है...",
                    unavailable: "ग्राफ उपलब्ध नहीं है",
                    time: { this_month: "इस महीने", last_month: "पिछले महीने", ytd: "अब तक" }
                },
                translate: {
                    title: "दस्तावेज़ अनुवाद",
                    updated: "अंतिम अपडेट: अभी",
                    upload_title: "दस्तावेज़ अपलोड करें",
                    upload_desc: "अनुवाद और सारांश के लिए टेक्स्ट पेस्ट करें या फ़ाइल अपलोड करें।",
                    button_upload: "फाइल अपलोड करें (PDF/IMG)",
                    button_process: "अनुवाद और सारांश",
                    analysis_title: "AI विश्लेषण",
                    powered_by: "Gemini द्वारा संचालित",
                    waiting: "कंटेंट का इंतज़ार...",
                    waiting_desc: "AI दस्तावेज़ का अनुवाद करेगा और मुख्य बिंदुओं का सारांश प्रदान करेगा।",
                    exec_summary: "कार्यकारी सारांश",
                    translated_content: "अनुवादित सामग्री",
                    confidence: "विश्वास स्तर"
                },
                recent: { title: "हाल के लेनदेन", view_all: "सभी देखें" },
                updated: "अंतिम अपडेट: अभी"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "पैसे,\nअनुवादित।", subtitle: "स्पष्टता के साथ अपनी वित्तीय यात्रा नेविगेट करें।", copyright: "© 2025 Finbridge" },
                form: {
                    title: "लॉग इन करें",
                    subtitle: "अपनी पहचान सत्यापित करने के लिए बैंक खाता लिंक करें।",
                    button: "बैंक खाता जोड़ें",
                    encryption: "Plaid द्वारा सुरक्षित",
                    terms_prefix: "जुड़ने से आप",
                    terms_link: "शर्तें",
                    privacy_link: "गोपनीयता",
                    terms_suffix: " स्वीकार करते हैं।",
                    and: "और"
                },
                loading: "सुरक्षित कनेक्शन स्थापित हो रहा है..."
            }
        }
    },
    tl: {
        header: { nav: { banking: "Pagbabangko", loans: "Mga Pautang", investing: "Pamumuhunan", sign_in: "MAG-SIGN IN", dashboard: "DASHBOARD" } },
        translation: {
            hero: {
                badge: "Literasiyang Pinansyal para sa Lahat",
                title_start: "Pag-uugnay ng",
                title_highlight: "kultura at pananalapi.",
                subtitle: "Kalinawan para sa iyong kinabukasan.",
                cta_primary: "Ikonekta ang Bangko",
                cta_secondary: "Matuto Pa"
            },
            dashboard: {
                title: "Dashboard",
                nav: { overview: "Pangkalahatan", accounts: "Mga Account", transactions: "Mga Transaksyon", cash_flow: "Daloy ng Pera" },
                stats: { net_worth: "Kabuuang Halaga", assets: "Mga Ari-arian", liabilities: "Mga Pagkakautang" },
                graph: {
                    title: "Daloy ng Pera",
                    generating: "Bumubuo ng AI Graph...",
                    unavailable: "Hindi Magamit ang Graph",
                    time: { this_month: "Ngayong Buwan", last_month: "Nakaraang Buwan", ytd: "Simula ng Taon" }
                },
                recent: { title: "Kamakailang Transaksyon", view_all: "Tingnan Lahat" },
                updated: "Huling na-update: Kani-kanina lang"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "Pera,\nIsinalin.", subtitle: "Mag-navigate nang may kalinawan.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Mag-log in",
                    subtitle: "Ikonekta ang iyong pangunahing account.",
                    button: "Ikonekta ang Bank Account",
                    encryption: "Naka-encrypt sa pamamagitan ng Plaid",
                    terms_prefix: "Sa pagkonekta, sumasang-ayon ka sa",
                    terms_link: "Mga Tuntunin",
                    privacy_link: "Patakaran sa Pagkapribado",
                    terms_suffix: ".",
                    and: "at"
                },
                loading: "Nagtatatag ng secure na koneksyon..."
            }
        }
    },
    vi: {
        header: { nav: { banking: "Ngân hàng", loans: "Khoản vay", investing: "Đầu tư", sign_in: "ĐĂNG NHẬP", dashboard: "BẢNG ĐIỀU KHIỂN" } },
        translation: {
            hero: {
                badge: "Kiến thức tài chính cho mọi người",
                title_start: "Thu hẹp khoảng cách giữa",
                title_highlight: "văn hóa và tài chính.",
                subtitle: "Đơn giản và rõ ràng cho tương lai tài chính của bạn.",
                cta_primary: "Kết nối Ngân hàng",
                cta_secondary: "Tìm hiểu thêm"
            },
            dashboard: {
                title: "Bảng điều khiển",
                nav: { overview: "Tổng quan", accounts: "Tài khoản", transactions: "Giao dịch", cash_flow: "Dòng tiền" },
                stats: { net_worth: "Giá trị ròng", assets: "Tài sản", liabilities: "Nợ phải trả" },
                graph: {
                    title: "Dòng tiền",
                    generating: "Đang tạo biểu đồ AI...",
                    unavailable: "Biểu đồ không khả dụng",
                    time: { this_month: "Tháng này", last_month: "Tháng trước", ytd: "Từ đầu năm" }
                },
                recent: { title: "Giao dịch gần đây", view_all: "Xem tất cả" },
                updated: "Cập nhật lần cuối: Vừa xong"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "Tiền tệ,\nĐã dịch.", subtitle: "Điều hướng hành trình tài chính của bạn.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Đăng nhập",
                    subtitle: "Liên kết tài khoản tài chính chính của bạn.",
                    button: "Kết nối Tài khoản Ngân hàng",
                    encryption: "Được mã hóa đầu cuối qua Plaid",
                    terms_prefix: "Bằng cách kết nối, bạn đồng ý với",
                    terms_link: "Điều khoản",
                    privacy_link: "Chính sách quyền riêng tư",
                    terms_suffix: ".",
                    and: "và"
                },
                loading: "Đang thiết lập kết nối an toàn..."
            }
        }
    },
    ar: {
        header: { nav: { banking: "المصرفية", loans: "القروض", investing: "الاستثمار", sign_in: "تسجيل الدخول", dashboard: "لوحة القيادة" } },
        translation: {
            hero: {
                badge: "الثقافة المالية للجميع",
                title_start: "سد الفجوة بين",
                title_highlight: "الثقافة والمال.",
                subtitle: "البساطة والوضوح لمستقبلك المالي.",
                cta_primary: "ربط البنك",
                cta_secondary: "تعرف على المزيد"
            },
            dashboard: {
                title: "لوحة القيادة",
                nav: { overview: "نظرة عامة", accounts: "حسابات", transactions: "المعاملات", cash_flow: "التدفق النقدي" },
                stats: { net_worth: "صافي القيمة", assets: "الأصول", liabilities: "الخصوم" },
                graph: {
                    title: "التدفق النقدي",
                    generating: "جاري إنشاء الرسم البياني...",
                    unavailable: "الرسم البياني غير متاح",
                    time: { this_month: "هذا الشهر", last_month: "الشهر الماضي", ytd: "منذ بداية العام" }
                },
                recent: { title: "المعاملات الأخيرة", view_all: "عرض الكل" },
                updated: "آخر تحديث: للتو"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "المال،\nمترجم.", subtitle: "تصفح رحلتك المالية بوضوح.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "تسجيل الدخول",
                    subtitle: "اربط حسابك المالي الرئيسي.",
                    button: "ربط الحساب البنكي",
                    encryption: "مشفر من طرف إلى طرف عبر Plaid",
                    terms_prefix: "بالاتصال، أنت توافق على",
                    terms_link: "الشروط",
                    privacy_link: "سياسة الخصوصية",
                    terms_suffix: ".",
                    and: "و"
                },
                loading: "جاري إنشاء اتصال آمن..."
            }
        }
    },
    ht: {
        header: { nav: { banking: "Banking", loans: "Prè", investing: "Envestisman", sign_in: "KONEKTE", dashboard: "TABLO DEBÒ" } },
        translation: {
            hero: {
                badge: "Literasi Finansye pou Tout Moun",
                title_start: "Pon ant",
                title_highlight: "kilti ak finans.",
                subtitle: "Senplisite ak klète pou avni finansye ou.",
                cta_primary: "Konekte Bank",
                cta_secondary: "Aprann Plis"
            },
            dashboard: {
                title: "Tablo Debò",
                nav: { overview: "Apèsi", accounts: "Kont", transactions: "Tranzaksyon", cash_flow: "Koule Lajan" },
                stats: { net_worth: "Valè Filè", assets: "Byen", liabilities: "Dèt" },
                graph: {
                    title: "Koule Lajan",
                    generating: "Jenere Grafik AI...",
                    unavailable: "Grafik Pa Disponib",
                    time: { this_month: "Mwa Sa a", last_month: "Mwa Pase", ytd: "Ane Sa a" }
                },
                recent: { title: "Tranzaksyon Resan", view_all: "Wè Tout" },
                updated: "Dènye aktyalizasyon: Fenman"
            },
            login: {
                brand: "Finbridge",
                hero: { title: "Lajan,\nTradui.", subtitle: "Navige vwayaj finansye ou avèk konfyans.", copyright: "© 2025 Finbridge" },
                form: {
                    title: "Konekte",
                    subtitle: "Lyen kont prensipal ou.",
                    button: "Konekte Kont Bankè",
                    encryption: "Chifre bout-an-bout via Plaid",
                    terms_prefix: "Lè ou konekte, ou dakò ak",
                    terms_link: "Tèm yo",
                    privacy_link: "Règleman Konfidansyalite",
                    terms_suffix: ".",
                    and: "ak"
                },
                loading: "Etabli koneksyon an sekirite..."
            }
        }
    },
};

const baseDir = path.join(__dirname, '..', 'public', 'locales');

if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

supportedLngs.forEach(lng => {
    const langDir = path.join(baseDir, lng);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });


    const deepMerge = (target, source) => {
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], deepMerge(target[key], source[key]));
            }
        }
        Object.assign(target || {}, source);
        return target;
    };


    const baseHeader = JSON.parse(JSON.stringify(dictionaries.en.header));
    const baseTranslation = JSON.parse(JSON.stringify(dictionaries.en.translation));

    const content = dictionaries[lng] || {};


    const finalHeader = deepMerge(baseHeader, content.header || {});
    const finalTranslation = deepMerge(baseTranslation, content.translation || {});


    fs.writeFileSync(path.join(langDir, 'header.json'), JSON.stringify(finalHeader, null, 2));


    fs.writeFileSync(path.join(langDir, 'translation.json'), JSON.stringify(finalTranslation, null, 2));


    fs.writeFileSync(path.join(langDir, 'about.json'), "{}");
    fs.writeFileSync(path.join(langDir, 'chatbot.json'), "{}");

    console.log(`Generated locales for ${lng}`);
});
