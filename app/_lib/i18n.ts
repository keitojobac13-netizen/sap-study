export type Language = 'ja' | 'en';
export type ModuleKey = 'fi' | 'co' | 'sd' | 'mm' | 'pp' | 'abap' | 'basis' | 'ps';

type ModuleData = {
  fullName: string;
  description: string;
  topics: readonly string[];
};

type Translation = {
  siteName: string;
  nav: { home: string; modules: string; dictionary: string };
  langToggle: string;
  hero: { badge: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  modules: {
    sectionTitle: string;
    sectionSubtitle: string;
    learnMore: string;
    items: Record<ModuleKey, ModuleData>;
  };
  features: { sectionTitle: string; items: { icon: string; title: string; description: string }[] };
  dictionary: { sectionTitle: string; description: string; button: string; badge: string };
  footer: { description: string; links: { modules: string; dictionary: string; about: string }; copyright: string };
};

export const translations: Record<Language, Translation> = {
  ja: {
    siteName: 'SAP学習ポータル',
    nav: { home: 'ホーム', modules: 'モジュール', dictionary: '用語辞典' },
    langToggle: 'EN',
    hero: {
      badge: '無料学習サイト',
      title: 'SAPコンサルタントのための学習ポータル',
      subtitle: 'FI・CO・SD・MM・PP・ABAP・Basis・PSの基礎から実務知識まで、体系的に学べます。日英対応の用語辞典も完備。',
      ctaPrimary: '学習を始める',
      ctaSecondary: '用語辞典を見る',
    },
    modules: {
      sectionTitle: '学習モジュール',
      sectionSubtitle: 'SAPの主要モジュールをわかりやすく解説します',
      learnMore: '学習する →',
      items: {
        fi: {
          fullName: '財務会計',
          description: '勘定科目・仕訳・財務諸表など財務会計の基礎を学びます。',
          topics: ['勘定科目マスタ', '伝票入力・照会', '期末決算処理', '財務諸表の確認'],
        },
        co: {
          fullName: '管理会計',
          description: '原価センタ・利益センタ・内部指図を使った管理会計を学びます。',
          topics: ['原価センタ管理', '利益センタ会計', '内部指図', '製品原価計算'],
        },
        sd: {
          fullName: '販売管理',
          description: '受注から出荷・請求までの販売プロセス全体を学びます。',
          topics: ['得意先マスタ', '受注入力', '出荷・ピッキング', '請求書処理'],
        },
        mm: {
          fullName: '購買・在庫管理',
          description: '購買依頼から入庫・請求照合までの調達プロセスを学びます。',
          topics: ['購買依頼・発注', '入庫処理', '請求照合', '在庫管理'],
        },
        pp: {
          fullName: '生産管理',
          description: '需要管理からMRP・製造指図・確認までの生産プロセスを学びます。',
          topics: ['需要管理・MRP', '製造指図作成', '製造確認', '実績原価'],
        },
        abap: {
          fullName: 'ABAP開発',
          description: 'SAPの標準開発言語ABAPの基礎から実践までを学びます。',
          topics: ['データ型・制御構文', '内部テーブル・Open SQL', 'モジュール化・OOP', 'ALV・デバッグ'],
        },
        basis: {
          fullName: 'Basis（システム管理）',
          description: 'SAPシステムの管理・運用の基礎を学びます。',
          topics: ['システム構成', 'ユーザー・権限管理', 'トランスポート管理', 'バックグラウンドジョブ'],
        },
        ps: {
          fullName: 'プロジェクト管理',
          description: 'プロジェクトの計画・実行・決算の全体プロセスを学びます。',
          topics: ['WBS・ネットワーク', 'プロジェクト計画', '実績管理', 'プロジェクト決済'],
        },
      },
    },
    features: {
      sectionTitle: 'このサイトの特徴',
      items: [
        { icon: '📚', title: '体系的な学習コンテンツ', description: 'SAPの基本概念からトランザクション操作まで、初心者でもわかるように体系的に解説します' },
        { icon: '🌐', title: '日英バイリンガル対応', description: '日本語・英語を切り替えて学習。グローバルプロジェクトの実務でも活用できます' },
        { icon: '📖', title: 'SAP用語辞典', description: '業務用語・技術用語を日英対応で収録。現場でわからない用語をすぐに検索できます' },
        { icon: '🆓', title: '完全無料', description: '登録不要・無料でお使いいただけます。広告収入によって運営されています' },
      ],
    },
    dictionary: {
      sectionTitle: 'SAP用語辞典',
      description: '財務・物流・生産など各領域の専門用語を日本語・英語で検索できます。現場でわからない用語をすぐ確認できます。',
      button: '辞典を開く',
      badge: '日英対応',
    },
    footer: {
      description: 'SAPコンサルタントのための無料学習サイト',
      links: { modules: 'モジュール', dictionary: '用語辞典', about: 'このサイトについて' },
      copyright: '© 2026 SAP学習ポータル',
    },
  },
  en: {
    siteName: 'SAP Study Portal',
    nav: { home: 'Home', modules: 'Modules', dictionary: 'Dictionary' },
    langToggle: 'JP',
    hero: {
      badge: 'Free Learning Site',
      title: 'Learning Portal for SAP Consultants',
      subtitle: 'Systematically learn FI, CO, SD, MM, PP, ABAP, Basis, and PS from basics to practical knowledge. Includes a bilingual terminology dictionary.',
      ctaPrimary: 'Start Learning',
      ctaSecondary: 'Open Dictionary',
    },
    modules: {
      sectionTitle: 'Learning Modules',
      sectionSubtitle: 'Clear explanations of major SAP modules',
      learnMore: 'Learn More →',
      items: {
        fi: {
          fullName: 'Financial Accounting',
          description: 'Learn the basics of financial accounting: chart of accounts, journal entries, and financial statements.',
          topics: ['Chart of Accounts', 'Document Entry & Display', 'Period-End Closing', 'Financial Statements'],
        },
        co: {
          fullName: 'Controlling',
          description: 'Learn management accounting with cost centers, profit centers, and internal orders.',
          topics: ['Cost Center Management', 'Profit Center Accounting', 'Internal Orders', 'Product Costing'],
        },
        sd: {
          fullName: 'Sales & Distribution',
          description: 'Understand the complete sales process from sales order to delivery and billing.',
          topics: ['Customer Master', 'Sales Order Entry', 'Delivery & Picking', 'Billing Processing'],
        },
        mm: {
          fullName: 'Materials Management',
          description: 'Learn the procurement process from purchase requisition to goods receipt and invoice verification.',
          topics: ['Purchase Req. & Orders', 'Goods Receipt', 'Invoice Verification', 'Inventory Management'],
        },
        pp: {
          fullName: 'Production Planning',
          description: 'Learn the production process from demand management to MRP, production orders, and confirmation.',
          topics: ['Demand Mgmt. & MRP', 'Production Order Creation', 'Order Confirmation', 'Actual Costing'],
        },
        abap: {
          fullName: 'ABAP Development',
          description: 'Learn the fundamentals and practical use of SAP\'s standard development language ABAP.',
          topics: ['Data Types & Control Flow', 'Internal Tables & Open SQL', 'Modularization & OOP', 'ALV & Debugging'],
        },
        basis: {
          fullName: 'Basis (System Admin)',
          description: 'Learn the fundamentals of SAP system administration and operations.',
          topics: ['System Architecture', 'User & Authorization Mgmt.', 'Transport Management', 'Background Jobs'],
        },
        ps: {
          fullName: 'Project System',
          description: 'Learn the complete project process from planning to execution and settlement.',
          topics: ['WBS & Networks', 'Project Planning', 'Actual Tracking', 'Project Settlement'],
        },
      },
    },
    features: {
      sectionTitle: 'Features',
      items: [
        { icon: '📚', title: 'Structured Learning', description: 'Step-by-step explanations from SAP concepts to transactions, designed for beginners' },
        { icon: '🌐', title: 'Bilingual Support', description: 'Switch between Japanese and English. Perfect for global project environments' },
        { icon: '📖', title: 'SAP Dictionary', description: 'Business and technical terms in JP/EN. Look up unfamiliar terms instantly in the field' },
        { icon: '🆓', title: 'Completely Free', description: 'No registration required, free to use. Supported by advertising revenue' },
      ],
    },
    dictionary: {
      sectionTitle: 'SAP Terminology Dictionary',
      description: 'Search for specialized terms in finance, logistics, and production in Japanese and English. Quickly verify unfamiliar terms in the field.',
      button: 'Open Dictionary',
      badge: 'JP / EN',
    },
    footer: {
      description: 'Free learning site for new SAP consultants',
      links: { modules: 'Modules', dictionary: 'Dictionary', about: 'About' },
      copyright: '© 2026 SAP Study Portal',
    },
  },
};
