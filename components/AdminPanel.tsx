import React, { useState, useRef } from 'react';
import { SiteConfig, HeroSection, ServicesSection, SocialProofSection, BeforeAfterSection, ReviewsSection, FAQSection, QuizSection, BlogSection, BeforeAfterItem, FAQItem as FAQItemType, QuizQuestion, BlogPost } from '../types';
import { AdminStorage } from '../data/adminStorage';
import { siteConfig as defaultConfig } from '../data/siteConfig';
import {
  Save, Copy, Eye, EyeOff, Lock, Layout, Phone, X, Check,
  ChevronUp, ChevronDown, Trash2, Plus, Upload, Image, Star, MessageSquare,
  HelpCircle, Layers, PenTool, FileText, Download, RotateCcw, BookOpen
} from 'lucide-react';

// =============================================
// Shared UI Helpers
// =============================================

const Field: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
  type?: 'text' | 'textarea' | 'url'; placeholder?: string; hint?: string;
}> = ({ label, value, onChange, type = 'text', placeholder, hint }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
    {type === 'textarea' ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sage-500 outline-none text-sm resize-none h-24" />
    ) : (
      <input type={type === 'url' ? 'url' : 'text'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sage-500 outline-none text-sm" />
    )}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const ImageField: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('https://api.imgbb.com/1/upload?key=0a7fa3fb43f5b3b1a58c5e16f9b1c7e0', {
        method: 'POST', body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.data.url);
      } else {
        alert('Ошибка загрузки изображения');
      }
    } catch {
      alert('Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <div className="flex gap-2 items-start">
        <input type="url" value={value} onChange={e => onChange(e.target.value)} placeholder="https://..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sage-500 outline-none text-sm" />
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 flex items-center gap-1 shrink-0 disabled:opacity-50">
          <Upload size={14} /> {uploading ? '...' : 'Файл'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }} />
      </div>
      {value && (
        <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-200 w-24 h-24">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {title && <h3 className="font-bold text-lg text-charcoal mb-4">{title}</h3>}
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-serif font-bold text-charcoal">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

// Section names in Russian
const sectionNames: Record<string, string> = {
  hero: 'Главный блок', 'social-proof': 'Достижения', services: 'Услуги',
  'before-after': 'До и После', reviews: 'Отзывы', faq: 'FAQ',
  blog: 'Блог', quiz: 'Квиз',
};

// =============================================
// Tab Type
// =============================================
type TabType = 'sections' | 'hero' | 'social-proof' | 'services' | 'before-after' | 'reviews' | 'faq' | 'quiz' | 'blog' | 'contacts' | 'export';

// =============================================
// Main AdminPanel Component
// =============================================
const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(() => AdminStorage.load());
  const [activeTab, setActiveTab] = useState<TabType>('sections');
  const [copySuccess, setCopySuccess] = useState('');
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin30') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  // ---- Config helpers ----
  const updateConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setConfig(prev => {
      const next = updater(prev);
      AdminStorage.save(next);
      return next;
    });
  };

  const updateSectionData = (sectionId: string, dataUpdates: Record<string, any>) => {
    updateConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? { ...s, data: { ...(s as any).data, ...dataUpdates } } : s
      ),
    }));
  };

  const handleContactChange = (key: keyof typeof config.contacts, value: string) => {
    updateConfig(prev => ({ ...prev, contacts: { ...prev.contacts, [key]: value } }));
  };

  const toggleSectionVisibility = (id: string) => {
    updateConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s),
    }));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    updateConfig(prev => {
      const sections = [...prev.sections];
      [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
      return { ...prev, sections };
    });
  };

  const moveSectionDown = (index: number) => {
    updateConfig(prev => {
      if (index >= prev.sections.length - 1) return prev;
      const sections = [...prev.sections];
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      return { ...prev, sections };
    });
  };

  const handleSave = () => {
    AdminStorage.save(config);
    setSavedAt(new Date().toLocaleTimeString('ru-RU'));
    setTimeout(() => setSavedAt(null), 3000);
  };

  const handleReset = () => {
    if (confirm('Сбросить все изменения к значениям по умолчанию?')) {
      AdminStorage.reset();
      setConfig(defaultConfig);
    }
  };

  const handleExportJSON = () => AdminStorage.exportJSON(config);
  const handleExportTS = () => AdminStorage.exportTypeScript(config);

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const imported = await AdminStorage.importJSON(file);
          setConfig(imported);
          AdminStorage.save(imported);
          alert('Конфиг успешно загружен!');
        } catch {
          alert('Ошибка при загрузке файла');
        }
      }
    };
    input.click();
  };

  const copyToClipboard = () => {
    const code = AdminStorage.getTypeScriptCode(config);
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess('Скопировано!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  // ---- Login Screen ----
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[9999] bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center text-white">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-center text-charcoal mb-6">Панель управления</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none" placeholder="Пароль" />
            <button type="submit" className="w-full bg-sage-500 text-white py-3 rounded-xl font-bold hover:bg-sage-600 transition-colors shadow-lg">
              Войти
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-sage-500 transition-colors">Вернуться на сайт</a>
          </div>
        </div>
      </div>
    );
  }

  // ---- Sidebar Navigation ----
  const navItems: { id: TabType; label: string; icon: React.ReactNode; group?: string }[] = [
    { id: 'sections', label: 'Секции', icon: <Layers size={18} />, group: 'Управление' },
    { id: 'hero', label: 'Главный блок', icon: <PenTool size={18} />, group: 'Редакторы' },
    { id: 'social-proof', label: 'Достижения', icon: <Star size={18} /> },
    { id: 'services', label: 'Услуги', icon: <Layout size={18} /> },
    { id: 'before-after', label: 'До и После', icon: <Image size={18} /> },
    { id: 'reviews', label: 'Отзывы', icon: <MessageSquare size={18} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { id: 'quiz', label: 'Квиз', icon: <FileText size={18} /> },
    { id: 'blog', label: 'Блог', icon: <BookOpen size={18} /> },
    { id: 'contacts', label: 'Контакты', icon: <Phone size={18} />, group: 'Настройки' },
    { id: 'export', label: 'Экспорт', icon: <Download size={18} />, group: 'Сохранение' },
  ];

  // ---- Main Render ----
  return (
    <div className="fixed inset-0 z-[9999] bg-stone-50 flex flex-col md:flex-row overflow-hidden font-sans text-gray-800">

      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-auto md:h-full">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="font-serif font-bold text-lg text-sage-600">Админка</span>
          <a href="/" className="text-gray-400 hover:text-sage-500"><X size={20} /></a>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
          {navItems.map((item, i) => (
            <React.Fragment key={item.id}>
              {item.group && (
                <div className={`text-[10px] uppercase tracking-widest text-gray-400 font-bold px-3 ${i > 0 ? 'mt-4' : ''} mb-1`}>
                  {item.group}
                </div>
              )}
              <button onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.id ? 'bg-sage-50 text-sage-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                {item.icon} {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-2">
          <button onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-sage-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-sage-600 transition-colors">
            <Save size={16} /> {savedAt ? `Сохранено в ${savedAt}` : 'Сохранить'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-stone-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">

          {/* === SECTIONS MANAGER === */}
          {activeTab === 'sections' && (
            <div>
              <SectionHeader title="Управление секциями" subtitle="Включение, выключение и порядок блоков на сайте" />
              <div className="space-y-2">
                {config.sections.map((section, index) => (
                  <div key={section.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveSectionUp(index)} disabled={index === 0}
                        className="text-gray-400 hover:text-sage-500 disabled:opacity-20"><ChevronUp size={16} /></button>
                      <button onClick={() => moveSectionDown(index)} disabled={index === config.sections.length - 1}
                        className="text-gray-400 hover:text-sage-500 disabled:opacity-20"><ChevronDown size={16} /></button>
                    </div>
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${section.isVisible ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm">{sectionNames[section.id] || section.id}</span>
                    </div>
                    <button onClick={() => setActiveTab(section.id as TabType)}
                      className="text-xs text-sage-500 hover:text-sage-700 font-medium px-2 py-1 rounded hover:bg-sage-50">
                      Редактировать
                    </button>
                    <button onClick={() => toggleSectionVisibility(section.id)}
                      className={`p-2 rounded-lg transition-colors ${section.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                      {section.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === HERO EDITOR === */}
          {activeTab === 'hero' && (() => {
            const hero = config.sections.find(s => s.id === 'hero') as HeroSection | undefined;
            if (!hero) return <p>Секция Hero не найдена</p>;
            const d = hero.data;
            const update = (updates: Partial<HeroSection['data']>) => updateSectionData('hero', updates);
            return (
              <div>
                <SectionHeader title="Главный блок (Hero)" subtitle="Тексты, фотографии и кнопка на первом экране" />
                <div className="space-y-4">
                  <Card title="Тексты">
                    <div className="space-y-3">
                      <Field label="Имя" value={d.name} onChange={v => update({ name: v })} />
                      <Field label="Профессия" value={d.profession} onChange={v => update({ profession: v })} />
                      <Field label="Заголовок (строка 1)" value={d.mainHeading.line1}
                        onChange={v => update({ mainHeading: { ...d.mainHeading, line1: v } })} />
                      <Field label="Заголовок (строка 2)" value={d.mainHeading.line2}
                        onChange={v => update({ mainHeading: { ...d.mainHeading, line2: v } })} />
                      <Field label="Подзаголовок" value={d.subHeading} onChange={v => update({ subHeading: v })} />
                      <Field label="Текст кнопки" value={d.buttonText} onChange={v => update({ buttonText: v })} />
                    </div>
                  </Card>
                  <Card title="Текст на бейдже">
                    <div className="space-y-3">
                      {d.badgeText.map((text, i) => (
                        <Field key={i} label={`Текст ${i + 1}`} value={text} type="textarea"
                          onChange={v => {
                            const newBadge = [...d.badgeText];
                            newBadge[i] = v;
                            update({ badgeText: newBadge });
                          }} hint="Поддерживает HTML: &nbsp; <strong></strong>" />
                      ))}
                    </div>
                  </Card>
                  <Card title="Фотографии">
                    <div className="space-y-4">
                      <ImageField label="Основное фото" value={d.photo} onChange={v => update({ photo: v })} />
                      <ImageField label="Фото процедуры" value={d.procedurePhoto} onChange={v => update({ procedurePhoto: v })} />
                    </div>
                  </Card>
                </div>
              </div>
            );
          })()}

          {/* === SOCIAL PROOF EDITOR === */}
          {activeTab === 'social-proof' && (() => {
            const section = config.sections.find(s => s.id === 'social-proof') as SocialProofSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const items = section.data.items;
            const updateItems = (newItems: typeof items) => updateSectionData('social-proof', { items: newItems });
            return (
              <div>
                <SectionHeader title="Достижения" subtitle="Блок с цифрами и фактами" />
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <Card key={item.id}>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Значение" value={item.value} placeholder="6+" onChange={v => {
                          const n = [...items]; n[i] = { ...n[i], value: v }; updateItems(n);
                        }} />
                        <Field label="Подпись" value={item.label} placeholder="лет опыта" onChange={v => {
                          const n = [...items]; n[i] = { ...n[i], label: v }; updateItems(n);
                        }} />
                      </div>
                    </Card>
                  ))}
                  <button onClick={() => updateItems([...items, { id: Date.now(), value: '', label: '' }])}
                    className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-sage-300 hover:text-sage-500 flex items-center justify-center gap-2">
                    <Plus size={16} /> Добавить
                  </button>
                </div>
              </div>
            );
          })()}

          {/* === SERVICES EDITOR === */}
          {activeTab === 'services' && (() => {
            const section = config.sections.find(s => s.id === 'services') as ServicesSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            return (
              <div>
                <SectionHeader title="Услуги" subtitle="Карточки услуг и их изображения" />
                <Card className="mb-4">
                  <Field label="Заголовок секции" value={d.title} onChange={v => updateSectionData('services', { title: v })} />
                </Card>
                <div className="space-y-3">
                  {d.items.map((item, i) => (
                    <Card key={item.id}>
                      <div className="space-y-3">
                        <Field label="Название" value={item.title} onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], title: v };
                          updateSectionData('services', { items });
                        }} />
                        <ImageField label="Изображение" value={item.image} onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], image: v };
                          updateSectionData('services', { items });
                        }} />
                        <Field label="Ссылка" value={item.link || ''} hint="hardware, esthetic, injections, modal" onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], link: v };
                          updateSectionData('services', { items });
                        }} />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* === BEFORE/AFTER EDITOR === */}
          {activeTab === 'before-after' && (() => {
            const section = config.sections.find(s => s.id === 'before-after') as BeforeAfterSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            const updateItems = (items: BeforeAfterItem[]) => updateSectionData('before-after', { items });
            const tagOptions = d.tabs.map(t => t.id);
            return (
              <div>
                <SectionHeader title="До и После" subtitle="Фотографии результатов процедур" />

                <Card title="Категории (табы)" className="mb-4">
                  <div className="space-y-2">
                    {d.tabs.map((tab, i) => (
                      <div key={tab.id} className="flex gap-2 items-center">
                        <input value={tab.id} onChange={e => {
                          const tabs = [...d.tabs]; tabs[i] = { ...tabs[i], id: e.target.value };
                          updateSectionData('before-after', { tabs });
                        }} className="w-32 px-2 py-1.5 rounded border border-gray-300 text-sm" placeholder="ID" />
                        <input value={tab.label} onChange={e => {
                          const tabs = [...d.tabs]; tabs[i] = { ...tabs[i], label: e.target.value };
                          updateSectionData('before-after', { tabs });
                        }} className="flex-1 px-2 py-1.5 rounded border border-gray-300 text-sm" placeholder="Название" />
                        <button onClick={() => {
                          const tabs = d.tabs.filter((_, j) => j !== i);
                          updateSectionData('before-after', { tabs });
                        }} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => updateSectionData('before-after', { tabs: [...d.tabs, { id: 'new', label: 'Новая' }] })}
                      className="text-sm text-sage-500 hover:text-sage-700 flex items-center gap-1"><Plus size={14} /> Добавить категорию</button>
                  </div>
                </Card>

                <div className="space-y-3">
                  {d.items.map((item, i) => (
                    <Card key={item.id}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold text-gray-400">#{item.id}</span>
                        <button onClick={() => updateItems(d.items.filter((_, j) => j !== i))}
                          className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <ImageField label="До" value={item.beforeImage} onChange={v => {
                            const items = [...d.items]; items[i] = { ...items[i], beforeImage: v }; updateItems(items);
                          }} />
                          <ImageField label="После" value={item.afterImage} onChange={v => {
                            const items = [...d.items]; items[i] = { ...items[i], afterImage: v }; updateItems(items);
                          }} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Категория</label>
                            <select value={item.tag} onChange={e => {
                              const items = [...d.items]; items[i] = { ...items[i], tag: e.target.value }; updateItems(items);
                            }} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm">
                              {tagOptions.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <Field label="Описание" value={item.description} onChange={v => {
                            const items = [...d.items]; items[i] = { ...items[i], description: v }; updateItems(items);
                          }} />
                        </div>
                        <Field label="Детали (при наведении)" value={item.details} onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], details: v }; updateItems(items);
                        }} />
                      </div>
                    </Card>
                  ))}
                  <button onClick={() => updateItems([...d.items, {
                    id: Date.now(), beforeImage: '', afterImage: '',
                    tag: tagOptions[0] || 'new', description: '', details: '',
                  }])}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-sage-300 hover:text-sage-500 flex items-center justify-center gap-2">
                    <Plus size={16} /> Добавить пару До/После
                  </button>
                </div>
              </div>
            );
          })()}

          {/* === REVIEWS EDITOR === */}
          {activeTab === 'reviews' && (() => {
            const section = config.sections.find(s => s.id === 'reviews') as ReviewsSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            return (
              <div>
                <SectionHeader title="Отзывы" subtitle="Текстовые отзывы и скриншоты" />

                <Card title="Текстовые отзывы" className="mb-4">
                  <div className="space-y-4">
                    {d.textReviews.map((review, i) => (
                      <div key={review.id} className="border border-gray-100 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs font-bold text-gray-400">Отзыв #{review.id}</span>
                          <button onClick={() => updateSectionData('reviews', {
                            textReviews: d.textReviews.filter((_, j) => j !== i),
                          })} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Имя" value={review.name} onChange={v => {
                            const reviews = [...d.textReviews]; reviews[i] = { ...reviews[i], name: v };
                            updateSectionData('reviews', { textReviews: reviews });
                          }} />
                          <Field label="Процедура" value={review.procedure} onChange={v => {
                            const reviews = [...d.textReviews]; reviews[i] = { ...reviews[i], procedure: v };
                            updateSectionData('reviews', { textReviews: reviews });
                          }} />
                        </div>
                        <Field label="Текст" type="textarea" value={review.text} onChange={v => {
                          const reviews = [...d.textReviews]; reviews[i] = { ...reviews[i], text: v };
                          updateSectionData('reviews', { textReviews: reviews });
                        }} />
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Рейтинг</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(n => (
                              <button key={n} onClick={() => {
                                const reviews = [...d.textReviews]; reviews[i] = { ...reviews[i], rating: n };
                                updateSectionData('reviews', { textReviews: reviews });
                              }} className={`p-1 ${n <= review.rating ? 'text-sage-400' : 'text-gray-300'}`}>
                                <Star size={16} fill="currentColor" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => updateSectionData('reviews', {
                      textReviews: [...d.textReviews, { id: Date.now(), name: '', procedure: '', text: '', rating: 5 }],
                    })} className="text-sm text-sage-500 hover:text-sage-700 flex items-center gap-1">
                      <Plus size={14} /> Добавить отзыв
                    </button>
                  </div>
                </Card>

                <Card title="Скриншоты отзывов">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {d.screenshots.map((s, i) => (
                      <div key={s.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-[9/16]">
                        <img src={s.src} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => updateSectionData('reviews', {
                          screenshots: d.screenshots.filter((_, j) => j !== i),
                        })} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <ImageField label="Добавить скриншот" value="" onChange={v => {
                    if (v) updateSectionData('reviews', {
                      screenshots: [...d.screenshots, { id: Date.now(), src: v }],
                    });
                  }} />
                </Card>
              </div>
            );
          })()}

          {/* === FAQ EDITOR === */}
          {activeTab === 'faq' && (() => {
            const section = config.sections.find(s => s.id === 'faq') as FAQSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            const updateItems = (items: FAQItemType[]) => updateSectionData('faq', { items });
            return (
              <div>
                <SectionHeader title="FAQ" subtitle="Часто задаваемые вопросы" />
                <div className="space-y-3">
                  {d.items.map((item, i) => (
                    <Card key={item.id}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-400">Вопрос {i + 1}</span>
                        <div className="flex gap-1">
                          <button onClick={() => {
                            if (i === 0) return;
                            const items = [...d.items];
                            [items[i - 1], items[i]] = [items[i], items[i - 1]];
                            updateItems(items);
                          }} className="text-gray-400 hover:text-sage-500 disabled:opacity-20"><ChevronUp size={14} /></button>
                          <button onClick={() => {
                            if (i === d.items.length - 1) return;
                            const items = [...d.items];
                            [items[i], items[i + 1]] = [items[i + 1], items[i]];
                            updateItems(items);
                          }} className="text-gray-400 hover:text-sage-500"><ChevronDown size={14} /></button>
                          <button onClick={() => updateItems(d.items.filter((_, j) => j !== i))}
                            className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Field label="Вопрос" value={item.question} onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], question: v }; updateItems(items);
                        }} />
                        <Field label="Ответ" type="textarea" value={item.answer} onChange={v => {
                          const items = [...d.items]; items[i] = { ...items[i], answer: v }; updateItems(items);
                        }} />
                      </div>
                    </Card>
                  ))}
                  <button onClick={() => updateItems([...d.items, { id: Date.now(), question: '', answer: '' }])}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-sage-300 hover:text-sage-500 flex items-center justify-center gap-2">
                    <Plus size={16} /> Добавить вопрос
                  </button>
                </div>
              </div>
            );
          })()}

          {/* === QUIZ EDITOR === */}
          {activeTab === 'quiz' && (() => {
            const section = config.sections.find(s => s.id === 'quiz') as QuizSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            const updateQ = (questions: QuizQuestion[]) => updateSectionData('quiz', { questions });
            return (
              <div>
                <SectionHeader title="Квиз" subtitle="Вопросы и варианты ответов" />
                <Card className="mb-4">
                  <div className="space-y-3">
                    <Field label="Заголовок" value={d.sectionTitle.content} onChange={v => updateSectionData('quiz', { sectionTitle: { content: v } })} />
                    <Field label="Подзаголовок" value={d.sectionSubtitle} onChange={v => updateSectionData('quiz', { sectionSubtitle: v })} />
                    <Field label="Заголовок после прохождения" value={d.completedTitle} onChange={v => updateSectionData('quiz', { completedTitle: v })} />
                    <Field label="Текст после прохождения" value={d.completedSubtitle} type="textarea" onChange={v => updateSectionData('quiz', { completedSubtitle: v })} />
                  </div>
                </Card>
                <div className="space-y-4">
                  {d.questions.map((q, qi) => (
                    <Card key={q.id} title={`Вопрос ${qi + 1}`}>
                      <div className="space-y-3">
                        <Field label="Заголовок" value={q.title} onChange={v => {
                          const qs = [...d.questions]; qs[qi] = { ...qs[qi], title: v }; updateQ(qs);
                        }} />
                        <Field label="Подсказка" value={q.subtitle} onChange={v => {
                          const qs = [...d.questions]; qs[qi] = { ...qs[qi], subtitle: v }; updateQ(qs);
                        }} />
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Макет</label>
                          <div className="flex gap-2">
                            {(['grid', 'list'] as const).map(layout => (
                              <button key={layout} onClick={() => {
                                const qs = [...d.questions]; qs[qi] = { ...qs[qi], layout }; updateQ(qs);
                              }} className={`px-3 py-1.5 rounded-lg text-sm border ${q.layout === layout ? 'bg-sage-50 border-sage-300 text-sage-700' : 'border-gray-200 text-gray-500'}`}>
                                {layout === 'grid' ? 'Сетка (с фото)' : 'Список'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Варианты ответов</label>
                          <div className="space-y-2">
                            {q.options.map((opt, oi) => (
                              <div key={opt.id} className="flex gap-2 items-start">
                                <input value={opt.label} onChange={e => {
                                  const qs = [...d.questions];
                                  const opts = [...qs[qi].options];
                                  opts[oi] = { ...opts[oi], label: e.target.value };
                                  qs[qi] = { ...qs[qi], options: opts };
                                  updateQ(qs);
                                }} className="flex-1 px-2 py-1.5 rounded border border-gray-300 text-sm" placeholder="Текст" />
                                {q.layout === 'grid' && (
                                  <input value={opt.image || ''} onChange={e => {
                                    const qs = [...d.questions];
                                    const opts = [...qs[qi].options];
                                    opts[oi] = { ...opts[oi], image: e.target.value };
                                    qs[qi] = { ...qs[qi], options: opts };
                                    updateQ(qs);
                                  }} className="w-40 px-2 py-1.5 rounded border border-gray-300 text-sm" placeholder="URL фото" />
                                )}
                                <button onClick={() => {
                                  const qs = [...d.questions];
                                  qs[qi] = { ...qs[qi], options: qs[qi].options.filter((_, j) => j !== oi) };
                                  updateQ(qs);
                                }} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                              </div>
                            ))}
                            <button onClick={() => {
                              const qs = [...d.questions];
                              qs[qi] = { ...qs[qi], options: [...qs[qi].options, { id: `opt_${Date.now()}`, label: '' }] };
                              updateQ(qs);
                            }} className="text-sm text-sage-500 hover:text-sage-700 flex items-center gap-1">
                              <Plus size={14} /> Вариант
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* === BLOG EDITOR (BASIC) === */}
          {activeTab === 'blog' && (() => {
            const section = config.sections.find(s => s.id === 'blog') as BlogSection | undefined;
            if (!section?.data) return <p>Секция не найдена</p>;
            const d = section.data;
            const updatePosts = (posts: BlogPost[]) => updateSectionData('blog', { posts });
            return (
              <div>
                <SectionHeader title="Блог" subtitle="Заголовки, превью и изображения статей" />
                <div className="space-y-4">
                  {d.posts.map((post, i) => (
                    <Card key={post.id}>
                      <div className="flex gap-4 items-start">
                        {post.image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <Field label="Заголовок" value={post.title} type="textarea" onChange={v => {
                            const posts = [...d.posts]; posts[i] = { ...posts[i], title: v }; updatePosts(posts);
                          }} />
                          <Field label="Превью" value={post.excerpt} type="textarea" onChange={v => {
                            const posts = [...d.posts]; posts[i] = { ...posts[i], excerpt: v }; updatePosts(posts);
                          }} />
                          <ImageField label="Изображение" value={post.image} onChange={v => {
                            const posts = [...d.posts]; posts[i] = { ...posts[i], image: v }; updatePosts(posts);
                          }} />
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Время чтения" value={post.readTime} onChange={v => {
                              const posts = [...d.posts]; posts[i] = { ...posts[i], readTime: v }; updatePosts(posts);
                            }} />
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1.5">Ширина карточки</label>
                              <select value={post.gridClass} onChange={e => {
                                const posts = [...d.posts]; posts[i] = { ...posts[i], gridClass: e.target.value }; updatePosts(posts);
                              }} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm">
                                <option value="lg:col-span-7">Широкая (7/12)</option>
                                <option value="lg:col-span-5">Узкая (5/12)</option>
                                <option value="lg:col-span-6">Средняя (6/12)</option>
                                <option value="lg:col-span-12">Полная ширина</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* === CONTACTS === */}
          {activeTab === 'contacts' && (
            <div>
              <SectionHeader title="Контакты" subtitle="Телефон, соцсети, адрес" />
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Телефон (для ссылки)" value={config.contacts.phone} onChange={v => handleContactChange('phone', v)} hint="+79039496603" />
                  <Field label="Телефон (отображение)" value={config.contacts.phoneDisplay} onChange={v => handleContactChange('phoneDisplay', v)} />
                  <Field label="Адрес" value={config.contacts.address} onChange={v => handleContactChange('address', v)} />
                  <Field label="Instagram" value={config.contacts.instagram} onChange={v => handleContactChange('instagram', v)} type="url" />
                  <Field label="Telegram" value={config.contacts.telegram} onChange={v => handleContactChange('telegram', v)} type="url" />
                  <Field label="VK" value={config.contacts.vk} onChange={v => handleContactChange('vk', v)} type="url" />
                  <Field label="MAX" value={config.contacts.max} onChange={v => handleContactChange('max', v)} type="url" />
                  <Field label="Ссылка на карту" value={config.contacts.mapLink} onChange={v => handleContactChange('mapLink', v)} type="url" />
                  <ImageField label="Скриншот карты" value={config.contacts.mapImage} onChange={v => handleContactChange('mapImage', v)} />
                </div>
              </Card>
            </div>
          )}

          {/* === EXPORT === */}
          {activeTab === 'export' && (
            <div>
              <SectionHeader title="Экспорт и импорт" subtitle="Сохранение конфигурации для деплоя" />

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl mb-6">
                <p className="text-green-800 text-sm">
                  Изменения <strong>автоматически сохраняются в браузере</strong> (localStorage). При обновлении страницы они сохранятся.
                  Для деплоя скачайте файл конфигурации.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button onClick={handleExportTS}
                  className="flex items-center justify-center gap-2 bg-sage-500 text-white py-3 rounded-xl font-bold hover:bg-sage-600 transition-colors shadow-lg">
                  <Download size={18} /> Скачать siteConfig.ts
                </button>
                <button onClick={handleExportJSON}
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                  <Download size={18} /> Скачать JSON
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button onClick={handleImport}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:border-sage-400 hover:text-sage-600 transition-colors">
                  <Upload size={18} /> Импорт из JSON
                </button>
                <button onClick={handleReset}
                  className="flex items-center justify-center gap-2 border-2 border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors">
                  <RotateCcw size={18} /> Сбросить к дефолту
                </button>
              </div>

              <Card title="Код для копирования">
                <div className="relative">
                  <button onClick={copyToClipboard}
                    className="absolute top-2 right-2 flex items-center gap-1.5 bg-sage-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-sage-600 transition-colors z-10">
                    {copySuccess ? <Check size={14} /> : <Copy size={14} />}
                    {copySuccess || 'Копировать'}
                  </button>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-auto text-xs font-mono leading-relaxed max-h-[400px] custom-scrollbar">
                    {AdminStorage.getTypeScriptCode(config)}
                  </pre>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
