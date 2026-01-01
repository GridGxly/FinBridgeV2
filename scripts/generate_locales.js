
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
                    time: { this_month: "This Month", last_month: "Last Month", ytd: "YTD", today: "Today", tomorrow: "Tomorrow" }
                },
                chat: {
                    title: "Finbridge Assistant",
                    welcome: "Hi there! I'm Finbridge AI. How can I help you today?",
                    placeholder: "Ask about finances...",
                    error: "Sorry, I'm having trouble connecting right now.",
                    questions: {
                        "0": "How can I get my credit score to 750?",
                        "1": "How can I save more money?",
                        "2": "How can I start investing?"
                    }
                },
                docs: {
                    recent_title: "Recent Documents",
                    action_required: "Action Required",
                    ready: "Ready",
                    type_pdf: "PDF",
                    click_drag: "Click or Drag to Upload",
                    supported_formats: "Supported formats: PDF, PNG, JPG"
                },
                preview: {
                    close: "Close",
                    download: "Download",
                    secure_title: "Secure Document",
                    encrypted_text: "This document is encrypted for your security. Please download the file to view its full contents locally."
                },
                accounts: {
                    available_balance: "Available Balance",
                    current_balance: "Current Balance",
                    link_new: "Link New Account",
                    type: { checking: "CHECKING", credit: "CREDIT", savings: "SAVINGS" }
                },
                legal_disclaimer: "Disclaimer",
                legal_text: "This is a demo project. No real banking data is processed. Finbridge is not a registered financial institution. All data shown is for demonstration purposes only.",
                understood: "Understood",
                export: "Export CSV",
                categories: { utility: "Utility", food: "Food", transport: "Transport", income: "Income", subscription: "Subscription", shopping: "Shopping", travel: "Travel" },
                profile: { appearance: "Appearance", language: "Language", light: "Light", dark: "Dark", sign_out: "Sign out" },
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
                nav: { overview: "Resumen", accounts: "Cuentas", transactions: "Transacciones", cash_flow: "Flujo de Caja", translate: "Traductor" },
                translate: {
                    title: "Traducir Documentos",
                    updated: "Última actualización: Ahora mismo",
                    upload_title: "Subir Documento",
                    upload_desc: "Pegue texto o suba un archivo para traducción y resumen.",
                    button_upload: "Subir Archivo (PDF/IMG)",
                    button_process: "Traducir y Resumir",
                    analysis_title: "Análisis IA",
                    powered_by: "Desarrollado por Gemini",
                    waiting: "Esperando contenido...",
                    waiting_desc: "La IA traducirá el documento a su idioma preferido y proporcionará un resumen.",
                    exec_summary: "Resumen Ejecutivo",
                    translated_content: "Contenido Traducido",
                    confidence: "Confianza"
                },
                stats: { net_worth: "Patrimonio Neto", assets: "Activos", liabilities: "Pasivos" },
                graph: {
                    title: "Flujo de Caja",
                    generating: "Generando Gráfico IA...",
                    unavailable: "Gráfico No Disponible",
                    time: { this_month: "Este Mes", last_month: "Mes Pasado", ytd: "Año Actual", today: "Hoy", tomorrow: "Mañana" }
                },
                chat: {
                    title: "Asistente Finbridge",
                    welcome: "¡Hola! Soy Finbridge AI. ¿Cómo puedo ayudarte hoy?",
                    placeholder: "Pregunta sobre finanzas...",
                    error: "Lo siento, tengo problemas de conexión.",
                    questions: {
                        "0": "¿Cómo puedo mejorar mi crédito a 750?",
                        "1": "¿Cómo puedo ahorrar más dinero?",
                        "2": "¿Cómo puedo empezar a invertir?"
                    }
                },
                docs: {
                    recent_title: "Documentos Recientes",
                    action_required: "Acción Requerida",
                    ready: "Listo",
                    type_pdf: "PDF",
                    click_drag: "Haga clic o arrastre para cargar",
                    supported_formats: "Formatos soportados: PDF, PNG, JPG"
                },
                stats: {
                    net_worth: "Patrimonio Neto",
                    assets: "Activos",
                    liabilities: "Pasivos",
                    total_balance: "Saldo Total",
                    last_30_days: "últimos 30 días",
                    account_balance_history: "Historial de Saldo",
                    n_days: "30 Días",
                    money_out: "Gastos",
                    gemini_analysis: "Análisis Inteligente",
                    gemini_desc: "Gastaste $800 en comida este mes (20% de ingresos).",
                    great_job: "¡Buen trabajo!",
                    alert: "Alerta:",
                    under_budget: " Estás por debajo de tu presupuesto del 10%. ",
                    over_budget: " Has excedido tu presupuesto del 10%. ",
                    see: "Ver",
                    todo_list: "Pendientes",
                    recent_docs: "Documentos Recientes",
                    vs: "vs",
                    avg: "promedio"
                },
                preview: {
                    close: "Cerrar",
                    download: "Descargar",
                    secure_title: "Documento Seguro",
                    encrypted_text: "Este documento está encriptado por seguridad. Descargue el archivo para ver su contenido completo localmente."
                },
                accounts: {
                    available_balance: "Saldo Disponible",
                    current_balance: "Saldo Actual",
                    link_new: "Vincular Cuenta",
                    type: { checking: "CORRIENTE", credit: "CRÉDITO", savings: "AHORROS" }
                },
                legal_disclaimer: "Aviso Legal",
                legal_text: "Este es un proyecto de demostración. No se procesan datos bancarios reales. Finbridge no es una institución financiera registrada. Todos los datos mostrados son solo para fines de demostración.",
                understood: "Entendido",
                export: "Exportar CSV",
                categories: { utility: "Servicios", food: "Comida", transport: "Transporte", income: "Ingresos", subscription: "Suscripción", shopping: "Compras", travel: "Viajes" },
                profile: { appearance: "Apariencia", language: "Idioma", light: "Claro", dark: "Oscuro", sign_out: "Cerrar sesión" },
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
                    upload_desc: "粘贴文本或上传文件进行翻译和摘要。",
                    button_upload: "上传文件 (PDF/IMG)",
                    button_process: "翻译并摘要",
                    analysis_title: "AI 分析",
                    powered_by: "由 Gemini 提供支持",
                    waiting: "等待内容...",
                    waiting_desc: "AI 将把文档翻译成您的首选语言并提供摘要。",
                    exec_summary: "执行摘要",
                    translated_content: "翻译内容",
                    confidence: "置信度"
                },
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
                stats: {
                    net_worth: "净资产",
                    assets: "资产",
                    liabilities: "负债",
                    total_balance: "总余额",
                    last_30_days: "过去 30 天",
                    account_balance_history: "账户余额历史",
                    n_days: "30 天",
                    money_out: "支出",
                    gemini_analysis: "智能分析",
                    gemini_desc: "本月您在食物上花费了 $800（占收入的 20%）。",
                    great_job: "干得好！",
                    alert: "警报：",
                    under_budget: " 您保持在 10% 的预算之内。 ",
                    over_budget: " 超出了 10% 的预算目标。 ",
                    see: "查看",
                    todo_list: "待办事项",
                    recent_docs: "最近文档",
                    vs: "对比",
                    avg: "平均"
                },
                docs: {
                    recent_title: "最近文档",
                    action_required: "需要采取行动",
                    ready: "就绪",
                    type_pdf: "PDF",
                    click_drag: "点击或拖拽上传",
                    supported_formats: "支持的格式：PDF, PNG, JPG"
                },
                preview: {
                    close: "关闭",
                    download: "下载",
                    secure_title: "安全文档",
                    encrypted_text: "为了您的安全，本文档已加密。请下载文件以在本地查看完整内容。"
                },
                accounts: {
                    available_balance: "可用余额",
                    current_balance: "当前余额",
                    link_new: "链接新账户",
                    type: { checking: "支票账户", credit: "信用卡", savings: "储蓄账户" }
                },
                legal_disclaimer: "免责声明",
                legal_text: "这是一个演示项目。不处理真实的银行数据。Finbridge 不是注册的金融机构。",
                understood: "明白",
                export: "导出 CSV",
                categories: { utility: "公用事业", food: "餐饮", transport: "交通", income: "收入", subscription: "订阅", shopping: "购物", travel: "旅行" },
                profile: { appearance: "外观", language: "语言", light: "浅色", dark: "深色", sign_out: "退出登录" },
                graph: {
                    title: "现金流",
                    generating: "正在生成 AI 图表...",
                    unavailable: "图表不可用",
                    time: { this_month: "本月", last_month: "上月", ytd: "年初至今", today: "今天", tomorrow: "明天" }
                },
                chat: {
                    title: "Finbridge 助手",
                    welcome: "您好！我是 Finbridge AI。今天有什么可以帮您？",
                    placeholder: "询问财务问题...",
                    error: "抱歉，连接出现问题。",
                    questions: {
                        "0": "如何将信用分提高到 750？",
                        "1": "如何节省更多钱？",
                        "2": "如何开始投资？"
                    }
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
                nav: { overview: "Überblick", accounts: "Konten", transactions: "Transaktionen", cash_flow: "Cashflow", translate: "Übersetzer" },
                translate: {
                    title: "Dokumente Übersetzen",
                    updated: "Zuletzt aktualisiert: Gerade eben",
                    upload_title: "Dokument Hochladen",
                    upload_desc: "Text einfügen oder Datei hochladen zur Übersetzung.",
                    button_upload: "Datei Hochladen (PDF/IMG)",
                    button_process: "Übersetzen & Zusammenfassen",
                    analysis_title: "KI-Analyse",
                    powered_by: "Powered by Gemini",
                    waiting: "Warte auf Inhalt...",
                    waiting_desc: "KI übersetzt das Dokument in Ihre bevorzugte Sprache.",
                    exec_summary: "Zusammenfassung",
                    translated_content: "Übersetzter Inhalt",
                    confidence: "Konfidenz"
                },
                stats: {
                    net_worth: "Reinvermögen",
                    assets: "Vermögenswerte",
                    liabilities: "Verbindlichkeiten",
                    total_balance: "Gesamtsaldo",
                    last_30_days: "letzte 30 Tage",
                    account_balance_history: "Kontostand",
                    n_days: "30 Tage",
                    money_out: "Ausgaben",
                    gemini_analysis: "Smarte Analyse",
                    gemini_desc: "Sie haben diesen Monat $800 für Essen ausgegeben (20% des Einkommens).",
                    great_job: "Gut gemacht!",
                    alert: "Alarm:",
                    under_budget: " Sie liegen unter Ihrem 10%-Budget. ",
                    over_budget: " Budgetziel von 10% überschritten. ",
                    see: "Siehe",
                    todo_list: "Aufgaben",
                    recent_docs: "Aktuelle Dokumente",
                    vs: "vs",
                    avg: "Ø"
                },
                docs: {
                    recent_title: "Aktuelle Dokumente",
                    action_required: "Handlung erforderlich",
                    ready: "Bereit",
                    type_pdf: "PDF",
                    click_drag: "Klicken oder ziehen zum Hochladen",
                    supported_formats: "Unterstützte Formate: PDF, PNG, JPG"
                },
                preview: {
                    close: "Schließen",
                    download: "Herunterladen",
                    secure_title: "Sicheres Dokument",
                    encrypted_text: "Dieses Dokument ist verschlüsselt. Bitte herunterladen zum Ansehen."
                },
                accounts: {
                    available_balance: "Verfügbar",
                    current_balance: "Aktueller Saldo",
                    link_new: "Konto verknüpfen",
                    type: { checking: "GIROKONTO", credit: "KREDIT", savings: "SPARKONTO" }
                },
                legal_disclaimer: "Haftungsausschluss",
                legal_text: "Dies ist ein Demoprojekt. Keine echten Bankdaten. Finbridge ist keine Bank.",
                understood: "Verstanden",
                export: "CSV Exportieren",
                categories: { utility: "Dienstleistung", food: "Essen", transport: "Transport", income: "Einkommen", subscription: "Abo", shopping: "Einkaufen", travel: "Reisen" },
                profile: { appearance: "Erscheinung", language: "Sprache", light: "Hell", dark: "Dunkel", sign_out: "Abmelden" },
                graph: {
                    title: "Cashflow",
                    generating: "Generiere KI-Grafik...",
                    unavailable: "Grafik nicht verfügbar",
                    time: { this_month: "Diesen Monat", last_month: "Letzten Monat", ytd: "lfd. Jahr", today: "Heute", tomorrow: "Morgen" }
                },
                chat: {
                    title: "Finbridge Assistent",
                    welcome: "Hallo! Ich bin Finbridge AI.",
                    placeholder: "Fragen Sie nach Finanzen...",
                    error: "Entschuldigung, Verbindungsproblem.",
                    questions: {
                        "0": "Wie verbessere ich meinen Kreditscore?",
                        "1": "Wie kann ich mehr sparen?",
                        "2": "Wie fange ich an zu investieren?"
                    }
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
                nav: { overview: "Vue d'ensemble", accounts: "Comptes", transactions: "Transactions", cash_flow: "Flux de trésorerie", translate: "Traduire" },
                translate: {
                    title: "Traduire des Documents",
                    updated: "Mise à jour: À l'instant",
                    upload_title: "Télécharger un Document",
                    upload_desc: "Collez du texte ou téléchargez un fichier pour traduction.",
                    button_upload: "Télécharger Fichier (PDF/IMG)",
                    button_process: "Traduire & Résumer",
                    analysis_title: "Analyse IA",
                    powered_by: "Propulsé par Gemini",
                    waiting: "En attente de contenu...",
                    waiting_desc: "L'IA traduira le document dans votre langue préférée.",
                    exec_summary: "Résumé Exécutif",
                    translated_content: "Contenu Traduit",
                    confidence: "Confiance"
                },
                stats: {
                    net_worth: "Valeur Nette",
                    assets: "Actifs",
                    liabilities: "Passifs",
                    total_balance: "Solde Total",
                    last_30_days: "30 derniers jours",
                    account_balance_history: "Historique du solde",
                    n_days: "30 Jours",
                    money_out: "Dépenses",
                    gemini_analysis: "Analyse Intelligente",
                    gemini_desc: "Vous avez dépensé 800$ en nourriture ce mois-ci (20% des revenus).",
                    great_job: "Bon travail!",
                    alert: "Alerte:",
                    under_budget: " Vous êtes bien en dessous de votre budget de 10%. ",
                    over_budget: " Les dépenses ont dépassé l'objectif de 10%. ",
                    see: "Voir",
                    todo_list: "À faire",
                    recent_docs: "Documents Récents",
                    vs: "cz",
                    avg: "moy"
                },
                docs: {
                    recent_title: "Documents Récents",
                    action_required: "Action Requise",
                    ready: "Prêt",
                    type_pdf: "PDF",
                    click_drag: "Cliquer ou glisser pour télécharger",
                    supported_formats: "Formats supportés: PDF, PNG, JPG"
                },
                preview: {
                    close: "Fermer",
                    download: "Télécharger",
                    secure_title: "Document Sécurisé",
                    encrypted_text: "Ce document est chiffré pour votre sécurité. Veuillez télécharger le fichier."
                },
                accounts: {
                    available_balance: "Solde Disponible",
                    current_balance: "Solde Actuel",
                    link_new: "Lier un compte",
                    type: { checking: "COMPTE CHÈQUES", credit: "CRÉDIT", savings: "ÉPARGNE" }
                },
                legal_disclaimer: "Avis de non-responsabilité",
                legal_text: "Ceci est un projet de démonstration. Aucune donnée bancaire réelle n'est traitée.",
                understood: "Compris",
                export: "Exporter CSV",
                categories: { utility: "Utilitaires", food: "Nourriture", transport: "Transport", income: "Revenu", subscription: "Abonnement", shopping: "Achats", travel: "Voyage" },
                profile: { appearance: "Apparence", language: "Langue", light: "Clair", dark: "Sombre", sign_out: "Se déconnecter" },
                graph: {
                    title: "Flux de trésorerie",
                    generating: "Génération du graphique IA...",
                    unavailable: "Graphique indisponible",
                    time: { this_month: "Ce mois-ci", last_month: "Mois dernier", ytd: "Cumul annuel", today: "Aujourd'hui", tomorrow: "Demain" }
                },
                chat: {
                    title: "Assistant Finbridge",
                    welcome: "Bonjour! Je suis Finbridge AI.",
                    placeholder: "Posez une question finance...",
                    error: "Désolé, problème de connexion.",
                    questions: {
                        "0": "Comment améliorer mon score de crédit?",
                        "1": "Comment économiser plus?",
                        "2": "Comment commencer à investir?"
                    }
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
                nav: { overview: "अवलोकन", accounts: "खाते", transactions: "लेनदेन", cash_flow: "नकदी प्रवाह", translate: "अनुवाद" },
                translate: {
                    title: "दस्तावेज़ अनुवाद",
                    updated: "अंतिम अपडेट: अभी",
                    upload_title: "दस्तावेज़ अपलोड करें",
                    upload_desc: "अनुवाद और सारांश के लिए टेक्स्ट पेस्ट करें।",
                    button_upload: "फाइल अपलोड करें (PDF/IMG)",
                    button_process: "अनुवाद और सारांश",
                    analysis_title: "AI विश्लेषण",
                    powered_by: "Gemini द्वारा संचालित",
                    waiting: "सामग्री की प्रतीक्षा...",
                    waiting_desc: "AI दस्तावेज़ का अनुवाद करेगा और सारांश प्रदान करेगा।",
                    exec_summary: "कार्यकारी सारांश",
                    translated_content: "अनुवादित सामग्री",
                    confidence: "विश्वास स्तर"
                },
                stats: {
                    net_worth: "कुल संपत्ति",
                    assets: "संपत्ति",
                    liabilities: "देनदारियां",
                    total_balance: "कुल शेष",
                    last_30_days: "पिछले 30 दिन",
                    account_balance_history: "खाते का इतिहास",
                    n_days: "30 दिन",
                    money_out: "व्यय",
                    gemini_analysis: "स्मार्ट विश्लेषण",
                    gemini_desc: "आपने इस महीने भोजन पर $800 खर्च किए।",
                    great_job: "बहुत बढ़िया!",
                    alert: "चेतावनी:",
                    under_budget: " आप अपने बजट के भीतर हैं। ",
                    over_budget: " बजट सीमा पार हो गई है। ",
                    see: "देखें",
                    todo_list: "कार्य सूची",
                    recent_docs: "हाल के दस्तावेज़",
                    vs: "बनाम",
                    avg: "औसत"
                },
                docs: {
                    recent_title: "हाल के दस्तावेज़",
                    action_required: "कार्रवाई आवश्यक",
                    ready: "तैयार",
                    type_pdf: "PDF",
                    click_drag: "अपलोड करने के लिए क्लिक करें या खींचें",
                    supported_formats: "समर्थित प्रारूप: PDF, PNG, JPG"
                },
                preview: {
                    close: "बंद करें",
                    download: "डाउनलोड",
                    secure_title: "सुरक्षित दस्तावेज़",
                    encrypted_text: "यह दस्तावेज़ एन्क्रिप्टेड है। कृपया फ़ाइल डाउनलोड करें।"
                },
                accounts: {
                    available_balance: "उपलब्ध शेष",
                    current_balance: "वर्तमान शेष",
                    link_new: "नया खाता जोड़ें",
                    type: { checking: "चेकिंग", credit: "क्रेडिट", savings: "बचत" }
                },
                legal_disclaimer: "अस्वीकरण",
                legal_text: "यह एक डेमो प्रोजेक्ट है। कोई वास्तविक बैंकिंग डेटा संसाधित नहीं होता है।",
                understood: "समझ गया",
                export: "CSV निर्यात करें",
                categories: { utility: "उपयोगिता", food: "भोजन", transport: "परिवहन", income: "आय", subscription: "सदस्यता", shopping: "खरीदारी", travel: "यात्रा" },
                profile: { appearance: "दिखावट", language: "भाषा", light: "लाइट", dark: "डार्क", sign_out: "साइन आउट" },
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
                nav: { overview: "Pangkalahatan", accounts: "Mga Account", transactions: "Mga Transaksyon", cash_flow: "Daloy ng Pera", translate: "Tagasalin" },
                translate: {
                    title: "Isalin ang mga Dokumento",
                    updated: "Huling na-update: Ngayon lang",
                    upload_title: "Mag-upload ng Dokumento",
                    upload_desc: "I-paste ang text o mag-upload ng file para sa pagsasalin.",
                    button_upload: "Mag-upload ng File (PDF/IMG)",
                    button_process: "Isalin at Ibuod",
                    analysis_title: "Pagsusuri ng AI",
                    powered_by: "Pinapagana ng Gemini",
                    waiting: "Naghihintay ng nilalaman...",
                    waiting_desc: "Isasalin ng AI ang dokumento sa iyong gustong wika.",
                    exec_summary: "Ehekutibong Buod",
                    translated_content: "Isinalin na Nilalaman",
                    confidence: "Kumpiyansa"
                },
                stats: {
                    net_worth: "Kabuuang Halaga",
                    assets: "Mga Ari-arian",
                    liabilities: "Mga Pagkakautang",
                    total_balance: "Kabuuang Balanse",
                    last_30_days: "huling 30 araw",
                    account_balance_history: "Kasaysayan ng Balanse",
                    n_days: "30 Araw",
                    money_out: "Pera Lumabas",
                    gemini_analysis: "Matalinong Pagsusuri",
                    gemini_desc: "Gumastos ka ng $800 sa pagkain ngayong buwan.",
                    great_job: "Magaling!",
                    alert: "Alerto:",
                    under_budget: " Pasok ka sa iyong badyet. ",
                    over_budget: " Lumampas ka sa badyet. ",
                    see: "Tingnan",
                    todo_list: "Gagawin",
                    recent_docs: "Kamakailang Dokumento",
                    vs: "laban sa",
                    avg: "karaniwan"
                },
                docs: {
                    recent_title: "Kamakailang Dokumento",
                    action_required: "Kailangan ng Aksyon",
                    ready: "Handa na",
                    type_pdf: "PDF",
                    click_drag: "Mag-click o Mag-drag para Mag-upload",
                    supported_formats: "Mga sinusuportahang format: PDF, PNG, JPG"
                },
                preview: {
                    close: "Isara",
                    download: "I-download",
                    secure_title: "Ligtas na Dokumento",
                    encrypted_text: "Ang dokumentong ito ay naka-encrypt. Pakibisita ang file."
                },
                accounts: {
                    available_balance: "Magagamit na Balanse",
                    current_balance: "Kasalukuyang Balanse",
                    link_new: "Mag-link ng Bagong Account",
                    type: { checking: "CHECKING", credit: "CREDIT", savings: "IPON" }
                },
                legal_disclaimer: "Pagtanggi",
                legal_text: "Ito ay isang demo project. Walang totoong data ng bangko ang pinoproseso.",
                understood: "Naintindihan",
                export: "I-export ang CSV",
                categories: { utility: "Utilidad", food: "Pagkain", transport: "Transportasyon", income: "Kita", subscription: "Susbkripsyon", shopping: "Pamimili", travel: "Paglalakbay" },
                profile: { appearance: "Itsura", language: "Wika", light: "Maliwanag", dark: "Madilim", sign_out: "Mag-sign out" },
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
                nav: { overview: "Tổng quan", accounts: "Tài khoản", transactions: "Giao dịch", cash_flow: "Dòng tiền", translate: "Dịch thuật" },
                translate: {
                    title: "Dịch Tài Liệu",
                    updated: "Cập nhật: Vừa xong",
                    upload_title: "Tải lên Tài liệu",
                    upload_desc: "Dán văn bản hoặc tải lên tệp để dịch và tóm tắt.",
                    button_upload: "Tải lên Tệp (PDF/IMG)",
                    button_process: "Dịch & Tóm tắt",
                    analysis_title: "Phân tích AI",
                    powered_by: "Được hỗ trợ bởi Gemini",
                    waiting: "Đang chờ nội dung...",
                    waiting_desc: "AI sẽ dịch tài liệu sang ngôn ngữ bạn chọn.",
                    exec_summary: "Tóm tắt điều hành",
                    translated_content: "Nội dung đã dịch",
                    confidence: "Độ tin cậy"
                },
                stats: {
                    net_worth: "Giá trị ròng",
                    assets: "Tài sản",
                    liabilities: "Nợ phải trả",
                    total_balance: "Tổng số dư",
                    last_30_days: "30 ngày qua",
                    account_balance_history: "Lịch sử số dư",
                    n_days: "30 Ngày",
                    money_out: "Tiền ra",
                    gemini_analysis: "Phân tích thông minh",
                    gemini_desc: "Bạn đã chi $800 cho thực phẩm trong tháng này.",
                    great_job: "Làm tốt lắm!",
                    alert: "Cảnh báo:",
                    under_budget: " Bạn vẫn ở dưới mức ngân sách. ",
                    over_budget: " Chi tiêu đã vượt quá mục tiêu. ",
                    see: "Xem",
                    todo_list: "Việc cần làm",
                    recent_docs: "Tài liệu gần đây",
                    vs: "so với",
                    avg: "TB"
                },
                docs: {
                    recent_title: "Tài liệu gần đây",
                    action_required: "Cần hành động",
                    ready: "Sẵn sàng",
                    type_pdf: "PDF",
                    click_drag: "Nhấp hoặc Kéo để Tải lên",
                    supported_formats: "Định dạng hỗ trợ: PDF, PNG, JPG"
                },
                preview: {
                    close: "Đóng",
                    download: "Tải xuống",
                    secure_title: "Tài liệu bảo mật",
                    encrypted_text: "Tài liệu này được mã hóa để bảo mật. Vui lòng tải xuống tệp."
                },
                accounts: {
                    available_balance: "Số dư khả dụng",
                    current_balance: "Số dư hiện tại",
                    link_new: "Liên kết tài khoản mới",
                    type: { checking: "VÃNG LAI", credit: "TÍN DỤNG", savings: "TIẾT KIỆM" }
                },
                legal_disclaimer: "Tuyên bố từ chối trách nhiệm",
                legal_text: "Đây là một dự án demo. Không có dữ liệu ngân hàng thực nào được xử lý.",
                understood: "Đã hiểu",
                export: "Xuất CSV",
                categories: { utility: "Tiện ích", food: "Thực phẩm", transport: "Giao thông", income: "Thu nhập", subscription: "Đăng ký", shopping: "Mua sắm", travel: "Du lịch" },
                profile: { appearance: "Giao diện", language: "Ngôn ngữ", light: "Sáng", dark: "Tối", sign_out: "Đăng xuất" },
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
                nav: { overview: "نظرة عامة", accounts: "حسابات", transactions: "المعاملات", cash_flow: "التدفق النقدي", translate: "ترجمة" },
                translate: {
                    title: "ترجمة المستندات",
                    updated: "آخر تحديث: الآن",
                    upload_title: "تحميل مستند",
                    upload_desc: "الصق النص أو حمل ملفًا للترجمة والملخص.",
                    button_upload: "تحميل ملف (PDF/IMG)",
                    button_process: "ترجمة وتلخيص",
                    analysis_title: "تحليل AI",
                    powered_by: "مدعوم من Gemini",
                    waiting: "في انتظار المحتوى...",
                    waiting_desc: "سيقوم الذكاء الاصطناعي بترجمة المستند إلى لغتك.",
                    exec_summary: "ملخص تنفيذي",
                    translated_content: "المحتوى المترجم",
                    confidence: "ثقة"
                },
                stats: {
                    net_worth: "صافي القيمة",
                    assets: "الأصول",
                    liabilities: "الخصوم",
                    total_balance: "إجمالي الرصيد",
                    last_30_days: "آخر 30 يومًا",
                    account_balance_history: "سجل الرصيد",
                    n_days: "30 يومًا",
                    money_out: "المصروفات",
                    gemini_analysis: "تحليل ذكي",
                    gemini_desc: "لقد أنفقت 800 دولار على الطعام هذا الشهر.",
                    great_job: "عمل رائع!",
                    alert: "تنبيه:",
                    under_budget: " أنت تحت ميزانيتك. ",
                    over_budget: " لقد تجاوزت الميزانية. ",
                    see: "انظر",
                    todo_list: "قائمة المهام",
                    recent_docs: "المستندات الأخيرة",
                    vs: "مقابل",
                    avg: "متوسط"
                },
                docs: {
                    recent_title: "المستندات الأخيرة",
                    action_required: "إجراء مطلوب",
                    ready: "جاهز",
                    type_pdf: "PDF",
                    click_drag: "انقر أو اسحب للتحميل",
                    supported_formats: "تنسيقات مدعومة: PDF, PNG, JPG"
                },
                preview: {
                    close: "إغلاق",
                    download: "تحميل",
                    secure_title: "مستند آمن",
                    encrypted_text: "هذا المستند مشفر. يرجى تحميل الملف."
                },
                accounts: {
                    available_balance: "الرصيد المتاح",
                    current_balance: "الرصيد الحالي",
                    link_new: "ربط حساب جديد",
                    type: { checking: "جاري", credit: "ائتمان", savings: "توفير" }
                },
                legal_disclaimer: "إخلاء مسؤولية",
                legal_text: "هذا مشروع تجريبي. لا تتم معالجة بيانات مصرفية حقيقية.",
                understood: "مفهوم",
                export: "تصدير CSV",
                categories: { utility: "خدمات", food: "طعام", transport: "نقل", income: "دخل", subscription: "اشتراك", shopping: "توسق", travel: "سفر" },
                profile: { appearance: "مظهر", language: "لغة", light: "فاتح", dark: "داكن", sign_out: "تسجيل الخروج" },
                graph: {
                    title: "التدفق النقدي",
                    generating: "جاري إنشاء الرسم البياني...",
                    unavailable: "الرسم البياني غير متاح",
                    time: { this_month: "هذا الشهر", last_month: "الشهر الماضي", ytd: "منذ بداية العام", today: "اليوم", tomorrow: "غدا" }
                },
                chat: {
                    title: "مساعد Finbridge",
                    welcome: "أهلاً! أنا Finbridge AI. كيف يمكنني مساعدتك اليوم؟",
                    placeholder: "اسأل عن الشؤون المالية...",
                    error: "عذراً، أواجه مشكلة في الاتصال الآن.",
                    questions: {
                        "0": "كيف أرفع تصنيفي الائتماني؟",
                        "1": "كيف يمكنني توفير المال؟",
                        "2": "كيف أبدأ الاستثمار؟"
                    }
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
                nav: { overview: "Apèsi", accounts: "Kont", transactions: "Tranzaksyon", cash_flow: "Koule Lajan", translate: "Tradiktè" },
                translate: {
                    title: "Tradwi Dokiman",
                    updated: "Dènye aktyalizasyon: Kounye a",
                    upload_title: "Telechaje Dokiman",
                    upload_desc: "Kole tèks oswa telechaje yon dosye pou tradiksyon.",
                    button_upload: "Telechaje Dosye (PDF/IMG)",
                    button_process: "Tradwi & Rezime",
                    analysis_title: "Analiz AI",
                    powered_by: "Powered by Gemini",
                    waiting: "Ap tann kontni...",
                    waiting_desc: "AI pral tradwi dokiman an nan lang ou pi pito.",
                    exec_summary: "Rezime Egzekitif",
                    translated_content: "Kontni Tradui",
                    confidence: "Konfyans"
                },
                stats: {
                    net_worth: "Valè Filè",
                    assets: "Byen",
                    liabilities: "Dèt",
                    total_balance: "Balans Total",
                    last_30_days: "dènye 30 jou",
                    account_balance_history: "Istwa Balans",
                    n_days: "30 Jou",
                    money_out: "Depans",
                    gemini_analysis: "Analiz Entelijan",
                    gemini_desc: "Ou depanse $800 nan manje mwa sa a.",
                    great_job: "Bon travay!",
                    alert: "Alèt:",
                    under_budget: " Ou anba bidjè ou. ",
                    over_budget: " Ou depase bidjè ou. ",
                    see: "Gade",
                    todo_list: "Pou Fè",
                    recent_docs: "Dokiman Resan",
                    vs: "kont",
                    avg: "mwayèn"
                },
                docs: {
                    recent_title: "Dokiman Resan",
                    action_required: "Aksyon Obligatwa",
                    ready: "Pare",
                    type_pdf: "PDF",
                    click_drag: "Klike oswa Trennen pou Telechaje",
                    supported_formats: "Fòma sipòte: PDF, PNG, JPG"
                },
                preview: {
                    close: "Fèmen",
                    download: "Telechaje",
                    secure_title: "Dokiman Sekirize",
                    encrypted_text: "Dokiman sa a chifre. Tanpri telechaje fichye a."
                },
                accounts: {
                    available_balance: "Balans Disponib",
                    current_balance: "Balans Aktyèl",
                    link_new: "Konekte Nouvo Kont",
                    type: { checking: "CHÈK", credit: "KREDI", savings: "EPAY" }
                },
                legal_disclaimer: "Avètisman Legal",
                legal_text: "Sa a se yon pwojè demo. Pa gen okenn done reyèl labank trete.",
                understood: "Konprann",
                export: " ekspòte CSV",
                categories: { utility: "Sèvis piblik", food: "Manje", transport: "Transpò", income: "Revni", subscription: "Abònman", shopping: "Shopping", travel: "Vwayaj" },
                profile: { appearance: "Aparans", language: "Lang", light: "Limyè", dark: "Fènwa", sign_out: "Dekonekte" },
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
