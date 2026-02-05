
import React, { useState, useRef, useEffect } from 'react';
import Header, { NavItem } from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Plus, Minus, X, Calendar, ShieldCheck, Zap, AlertCircle, Clock, Droplet, Sparkles, UserCheck, Check, Eye, Activity, ArrowUpRight } from 'lucide-react';

interface InjectionPageProps {
  onNavigate: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  onOpenContactModal?: () => void;
}

const InjectionCosmetology: React.FC<InjectionPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const [openBotoxMyth, setOpenBotoxMyth] = useState<number | null>(null);
  
  // Modals state
  const [isPlasmaModalOpen, setIsPlasmaModalOpen] = useState(false);
  const [isBotoxModalOpen, setIsBotoxModalOpen] = useState(false);
  const [isBiorevModalOpen, setIsBiorevModalOpen] = useState(false);
  const [isMesoModalOpen, setIsMesoModalOpen] = useState(false);
  const [isContourModalOpen, setIsContourModalOpen] = useState(false);
  const [isLipsModalOpen, setIsLipsModalOpen] = useState(false);
  
  // FAQ state inside Plasma Modal
  const [plasmaFaqOpen, setPlasmaFaqOpen] = useState<number | null>(null);
  // FAQ state inside Lips Modal
  const [lipsFaqOpen, setLipsFaqOpen] = useState<number | null>(null);

  // Scroll Refs
  const botoxScrollRef = useRef<HTMLDivElement>(null);
  const biorevScrollRef = useRef<HTMLDivElement>(null);
  const plasmaScrollRef = useRef<HTMLDivElement>(null);
  const contourScrollRef = useRef<HTMLDivElement>(null);
  const lipsScrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isPlasmaModalOpen || isBotoxModalOpen || isBiorevModalOpen || isMesoModalOpen || isContourModalOpen || isLipsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPlasmaModalOpen, isBotoxModalOpen, isBiorevModalOpen, isMesoModalOpen, isContourModalOpen, isLipsModalOpen]);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { current } = ref;
      const isMobile = window.innerWidth < 640;
      const scrollAmount = isMobile ? current.clientWidth : 400;
      current.scrollBy({ 
          left: direction === 'left' ? -scrollAmount : scrollAmount, 
          behavior: 'smooth' 
      });
    }
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Image Arrays
  const botoxImages = [
    'https://i.ibb.co/nNwhKfSM/1.png',
    'https://i.ibb.co/0prRn55Z/2.png',
    'https://i.ibb.co/7xb15Y42/3.png',
    'https://i.ibb.co/spqV98nG/4-1.png',
    'https://i.ibb.co/pjPGyNnm/5.png',
    'https://i.ibb.co/bg6D4YJb/6.png',
    'https://i.ibb.co/1t6rF6MV/7.png',
    'https://i.ibb.co/bMP1qCk1/8.png',
  ];

  const biorevImages = [
    'https://i.ibb.co/zhs7b9d5/1.png',
    'https://i.ibb.co/fYT2wWLK/2.png',
    'https://i.ibb.co/6Jr6WbvS/3.png',
    'https://i.ibb.co/mrYP2yFH/4.png',
    'https://i.ibb.co/Tqwmq8Q4/5.png',
    'https://i.ibb.co/7J2ZvRrZ/6.png',
    'https://i.ibb.co/S4FZRSrJ/7.png',
    'https://i.ibb.co/8gFKxQSc/8.png',
    'https://i.ibb.co/qMzRXd4k/9.png',
    'https://i.ibb.co/Pswr1fg6/10-1.png', // Updated slide 10
    'https://i.ibb.co/6c00563V/11.png',
    'https://i.ibb.co/v62SVPYQ/12.png',
    'https://i.ibb.co/BH5mtDXq/13.png',
    'https://i.ibb.co/bjxrRm30/14.png'
  ];

  const plasmaImages = [
      'https://i.ibb.co/1FzVXn6/1.png',
      'https://i.ibb.co/hFvY7LPN/2.png',
      'https://i.ibb.co/9m4jJQPq/3.png',
      'https://i.ibb.co/TBRn3XVt/4-1.png',
      'https://i.ibb.co/sp6TPbK4/5.png',
      'https://i.ibb.co/N2VDLMGF/6.png',
      'https://i.ibb.co/1J78gfpG/7.png',
      'https://i.ibb.co/HDXyQ11b/8.png',
      'https://i.ibb.co/xtQQ3KdT/9.png',
      'https://i.ibb.co/p6xRp50N/10.png',
      'https://i.ibb.co/PsBxyF8m/11.png',
      'https://i.ibb.co/67nh00PP/12.png',
  ];

  const contourImages = [
      'https://i.ibb.co/vCxh3ywy/2.png',
      'https://i.ibb.co/5WHSRKth/1.png',
      'https://i.ibb.co/rRLp5hrh/3.png',
      'https://i.ibb.co/CprbX5Nf/4.png',
      'https://i.ibb.co/jvn0vDjs/5.png',
      'https://i.ibb.co/qLGd4jqT/6.png',
  ];

  const lipsImages = [
      'https://i.ibb.co/D6Ry2P7/16.png',
      'https://i.ibb.co/wrShq1Cj/15.png',
      'https://i.ibb.co/L7GTMqn/17.png',
      'https://i.ibb.co/84RBRh68/18.png',
      'https://i.ibb.co/3YWwLms2/19.png',
      'https://i.ibb.co/cXX7cNkp/20.png',
      'https://i.ibb.co/zT2Lxrvm/21.png',
      'https://i.ibb.co/YTQ0FGNL/22.png',
      'https://i.ibb.co/DDw57NSc/23.png',
  ];

  const customNavItems: NavItem[] = [
    { label: 'Ботулинотерапия', href: '#botox', onClick: (e) => handleScrollTo(e, 'botox') },
    { label: 'Плазмотерапия', href: '#plasma', onClick: (e) => handleScrollTo(e, 'plasma') },
    { label: 'Биоревитализация', href: '#biorev', onClick: (e) => handleScrollTo(e, 'biorev') },
    { label: 'Мезотерапия', href: '#meso', onClick: (e) => handleScrollTo(e, 'meso') },
    { label: 'Контурная пластика', href: '#contour', onClick: (e) => handleScrollTo(e, 'contour') },
    { label: 'Губы', href: '#lips', onClick: (e) => handleScrollTo(e, 'lips') },
  ];

  const mythData = [
    { q: '«Пока морщины не стали явными — никаких уколов!»', a: 'Это одна из самых частых ошибок. Когда мимические морщины переходят в статические — бороться с ними становится сложно. И дорого. Ботулинотерапия работает не только на коррекцию, но и на профилактику. И именно профилактика дешевле, естественнее и эффективнее.' },
    { q: '«Кожа привыкнет»', a: 'Нет физической зависимости. Есть только психологическое привыкание к хорошему: когда действие закончится, вам просто захочется вернуть ту гладкость.' },
    { q: '«Это яд!»', a: 'Парацельс говорил: «Всё есть яд и всё есть лекарство — дело только в дозе». В моих руках — выверенная доза для вашей красоты.' },
    { q: '«После 50 уже поздно»', a: 'Никогда не поздно. Мы можем значительно смягчить черты лица, убрать «суровое» выражение и освежить взгляд в любом возрасте.' },
    { q: '«Будет лицо-маска»', a: 'Это случается только при избыточных дозах. Мой принцип — Natural Look. Ваша мимика останется живой, но без лишнего напряжения.' }
  ];

  const restrictionData = [
    { icon: <Clock size={24}/>, t: '4 часа', d: 'Не ложиться и не наклоняться вниз.' },
    { icon: <Calendar size={24}/>, t: '4 дня', d: 'Никакого перегрева (баня, сауна, ванна) и спорта.' },
    { icon: <AlertCircle size={24}/>, t: 'Алкоголь', d: '«Сухой закон» 3 дня до и 5 дней после.' },
    { icon: <Zap size={24}/>, t: 'Иммунитет', d: '1.5-2 месяца после вируса или вакцинации.' }
  ];

  const plasmaFaqData = [
      {
          q: 'Как подготовиться к процедуре?',
          a: (
              <div className="space-y-4">
                  <p className="italic border-l-2 border-sage-300 pl-4 py-1">
                      Чтобы плазмотерапия сработала на 100%, ваша плазма должна быть насыщена живыми тромбоцитами и очищена от «пищевого шума».
                  </p>
                  <div className="space-y-2">
                      <h6 className="font-bold text-sage-600 uppercase tracking-widest text-sm mb-1">За 2–3 дня до визита:</h6>
                      <ul className="space-y-1 pl-2 list-disc list-inside text-base">
                          <li><strong>Исключите алкоголь.</strong> Он склеивает тромбоциты.</li>
                          <li><strong>Минимизируйте жирное и жареное.</strong> Чтобы плазма не была мутной (хилёзной).</li>
                          <li><strong>Пауза в БАДах.</strong> Омега-3, витамин Е и аспирин повышают риск синяков.</li>
                      </ul>
                  </div>
                  <div className="space-y-2">
                      <h6 className="font-bold text-sage-600 uppercase tracking-widest text-sm mb-1">За сутки и в день процедуры:</h6>
                      <p className="text-base pl-2"><strong>Вода:</strong> Выпейте 1.5-2 литра воды.</p>
                      <p className="text-base pl-2"><strong>Голод:</strong> Не ешьте за 3–4 часа до визита (легкий завтрак допустим).</p>
                  </div>
              </div>
          )
      },
      {
          q: 'Будет ли больно?',
          a: 'Перед процедурой я наношу профессиональный анестезирующий крем, чтобы свести ощущения к минимуму. Большинство пациентов описывают ощущения как «вполне терпимые».'
      }
  ];

  const lipsFaqData = [
      {
          q: 'Как проходит период реабилитации?',
          a: (
              <div className="space-y-2">
                  <p>Первые 2–3 дня возможен отек и небольшие покраснения. Чтобы результат был идеальным, в течение недели важно:</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                      <li>Исключить баню, сауну, солярий и алкоголь.</li>
                      <li>Не использовать декоративную косметику (первые 48 часов).</li>
                      <li>Стараться спать на спине и не оказывать давления на губы.</li>
                  </ul>
              </div>
          )
      },
      {
          q: 'Это больно?',
          a: 'Я использую мощную аппликационную анестезию (крем), а в составе самих филлеров часто уже есть лидокаин. Ощущения могут быть неприятными, но вполне терпимыми.'
      },
      {
          q: 'Когда процедуру делать нельзя?',
          a: 'Беременность и ГВ, острые вирусные заболевания (герпес), сахарный диабет, нарушения свертываемости крови.'
      }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <Header onNavigate={onNavigate} customNavItems={customNavItems} useGridNav={true} />

      {/* Hero Section */}
      <section className="relative pt-10 pb-12 md:py-24 max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start">
            <div className="lg:col-span-6">
                 <button 
                    onClick={() => onNavigate('home')}
                    className="flex items-center text-gray-500 hover:text-sage-600 transition-colors font-montserrat text-base font-medium group py-2"
                 >
                    <ArrowLeft size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Назад на главную</span>
                 </button>
                 <h1 className="font-serif font-bold italic text-sage-500 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                    Инъекционная косметология
                 </h1>
                 <p className="font-montserrat text-gray-600 text-lg leading-relaxed max-w-lg">
                    Научный подход к вашей молодости. Быстрый и видимый результат, коррекция возрастных изменений и улучшение качества кожи изнутри.
                 </p>
            </div>
            <div className="lg:col-span-6 relative">
                 <div className="rounded-[40px] overflow-hidden shadow-lg h-[400px]">
                    <img src="https://i.ibb.co/x0wQYdS/2-1.png" alt="Инъекции" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sage-100 rounded-full blur-2xl -z-10"></div>
            </div>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-[1200px] mx-auto px-4 pb-20 space-y-24 md:space-y-48">
        
        {/* 1. Botulinum Therapy */}
        <section id="botox" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">01</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Ботулинотерапия</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Процедура для расслабления мимических мышц, которая помогает разгладить морщины на лбу, в межбровье и вокруг глаз. Лицо выглядит отдохнувшим, а мимика остается естественной.
                    </p>
                    <button 
                        onClick={() => setIsBotoxModalOpen(true)}
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                    <h3 className="font-montserrat font-bold text-gray-800 mb-6 text-sm uppercase tracking-wide">Стоимость за 1 единицу</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Диспорт (Dysport)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">85 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Релатокс (Relatox)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">260 ₽</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <button onClick={() => handleScroll(botoxScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={botoxScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {botoxImages.map((src, idx) => (
                            <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white group cursor-pointer mx-auto">
                                <img src={src} alt={`Результат ${idx + 1}`} className="w-full h-full object-contain bg-white" />
                            </div>
                        ))}
                </div>
                <button onClick={() => handleScroll(botoxScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

        {/* 2. Plasmolifting */}
        <section id="plasma" className="scroll-mt-32">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">02</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Плазмотерапия</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Инъекции собственной плазмы крови, обогащенной тромбоцитами. Мощно запускает процессы регенерации.
                    </p>
                    <button 
                        onClick={() => setIsPlasmaModalOpen(true)} 
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dotted border-gray-200 pb-2">
                            <span className="text-gray-800 font-medium">Meaplasma (1 пробирка)</span>
                            <span className="text-sage-600 font-bold text-xl whitespace-nowrap">4 000 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-200 pb-2">
                            <span className="text-gray-800 font-medium">Cortexil (1 пробирка)</span>
                            <span className="text-sage-600 font-bold text-xl whitespace-nowrap">5 500 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative group">
                <button onClick={() => handleScroll(plasmaScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={plasmaScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {plasmaImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white mx-auto">
                            <img src={src} alt="Плазма" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(plasmaScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

        {/* 3. Biorevitalization */}
        <section id="biorev" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">03</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Биоревитализация</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Глубокое увлажнение и «ремонт» кожи изнутри гиалуроновой кислотой. Возвращает плотность, сияние и упругость.
                    </p>
                    <button 
                        onClick={() => setIsBiorevModalOpen(true)} 
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Main Biorevitalization */}
                        <div>
                             <h4 className="font-serif font-bold italic text-sage-600 text-lg mb-4 border-b border-sage-200 pb-2">Препараты для лица</h4>
                             <ul className="space-y-3">
                                {[
                                    { name: 'Rejuven 25 (2 мл)', price: '6 500 ₽' },
                                    { name: 'Viscoline (1 мл / 2 мл)', price: '5 400 / 6 800 ₽' },
                                    { name: 'MiraLine gidro (2 мл)', price: '6 500 ₽' },
                                    { name: 'AquaShine (2 мл)', price: '7 000 ₽' },
                                    { name: 'Bioregen (1 мл)', price: '7 000 ₽' },
                                    { name: 'Nucleoform (2 мл)', price: '9 500 ₽' },
                                    { name: 'Nucleoform Rich (2 мл)', price: '9 700 ₽' },
                                    { name: 'Revi Silk (1 мл)', price: '8 300 ₽' },
                                    { name: 'Revi Strong (1 мл / 2 мл)', price: '9 000 / 11 150 ₽' },
                                    { name: 'Novacutan Ybio/Sbio (2 мл)', price: '13 000 ₽' },
                                    { name: 'Novacutan Bio Pro (2 мл)', price: '13 500 ₽' },
                                    { name: 'Meso Wharton P199 (1.5 мл)', price: '13 500 ₽' },
                                    { name: 'Meso-Xanthin (1,5 мл)', price: '13 500 ₽' },
                                ].map((item, i) => (
                                    <li key={i} className="flex justify-between items-end border-b border-dotted border-gray-200 pb-1 leading-snug">
                                        <span className="text-gray-700 text-base font-medium">{item.name}</span>
                                        <span className="text-sage-600 font-bold text-lg whitespace-nowrap ml-2">{item.price}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                        
                        {/* Eye Zone */}
                        <div>
                             <h4 className="font-serif font-bold italic text-sage-600 text-lg mb-4 border-b border-sage-200 pb-2">Зона вокруг глаз</h4>
                             <ul className="space-y-3">
                                {[
                                    { name: 'Revi Eye (0,5 / 1 мл)', price: '4 700 / 8 000 ₽' },
                                    { name: 'Микроколлост 0,05 мл', price: '7 000 ₽' },
                                    { name: 'Сферогель Medium (0,6 мл)', price: '7 200 ₽' },
                                    { name: 'Сферогель Long Fine (0,6 мл)', price: '10 700 ₽' },
                                    { name: 'Mesoeye C71 1 мл', price: '13 500 ₽' },
                                ].map((item, i) => (
                                    <li key={i} className="flex justify-between items-end border-b border-dotted border-gray-200 pb-1 leading-snug">
                                        <span className="text-gray-700 text-base font-medium">{item.name}</span>
                                        <span className="text-sage-600 font-bold text-lg whitespace-nowrap ml-2">{item.price}</span>
                                    </li>
                                ))}
                             </ul>
                             
                             {/* Decorative block */}
                             <div className="mt-8 bg-sage-50 p-4 rounded-xl border border-sage-100">
                                 <div className="flex items-center gap-2 mb-2">
                                     <Eye className="text-sage-500" size={20} />
                                     <span className="font-bold text-sage-700 text-sm uppercase">Важно</span>
                                 </div>
                                 <p className="text-base text-gray-600 leading-relaxed">
                                     Препараты для зоны глаз имеют особую формулу, чтобы не вызывать отеков в этой деликатной области.
                                 </p>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
            <div className="relative group">
                <button onClick={() => handleScroll(biorevScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={biorevScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {biorevImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white mx-auto">
                            <img src={src} alt="Биоревитализация" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(biorevScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

        {/* 4. Mesotherapy */}
        <section id="meso" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">04</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Мезотерапия</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Витаминные коктейли для решения конкретных проблем: акне, пигментация, темные круги под глазами или выпадение волос.
                    </p>
                    <button 
                        onClick={() => setIsMesoModalOpen(true)} 
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                    <div className="space-y-4">
                        {[
                            { name: 'Filorga NCTF 136 HA (1.5 мл / 3 мл)', price: '5 000 / 7 500 ₽' },
                            { name: 'Mevita 09 (2 мл / 4 мл)', price: '4 500 / 6 150 ₽' },
                            { name: 'Mevita 18 (3.5 мл)', price: '5 500 ₽' },
                            { name: 'Mevita 25 (2 мл / 4 мл)', price: '4 800 / 6 500 ₽' },
                            { name: 'Mevita С (2 мл / 4 мл)', price: '4 500 / 6 150 ₽' }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                                <span className="text-gray-700 font-medium text-base">{item.name}</span>
                                <span className="text-sage-600 font-bold text-lg whitespace-nowrap ml-2">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 5. Contour Plastic */}
        <section id="contour" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">05</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Контурная пластика</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Деликатное заполнение морщин и восполнение утраченных с возрастом объёмов с помощью филлеров.
                    </p>
                    <button 
                        onClick={() => setIsContourModalOpen(true)} 
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Viscoline (1 мл)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">10 000 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Biohyalux (1 мл)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">10 000 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">MiraLine (1 мл)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">10 500 ₽</span>
                        </div>
                         <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Regenyal (1 мл)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">13 500 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Novacutan (1 мл)</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">14 000 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative group">
                <button onClick={() => handleScroll(contourScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={contourScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {contourImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white mx-auto">
                            <img src={src} alt="Контурная пластика" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(contourScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

        {/* 6. Lip Augmentation */}
        <section id="lips" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">06</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Аугментация губ</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Коррекция формы и объема губ. Восстанавливаем чёткий контур, приподнимаем опущенные уголки и возвращаем губам природную сочность, сохраняя при этом полную натуральность и гармонию лица.
                    </p>
                    <button 
                        onClick={() => setIsLipsModalOpen(true)} 
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                    <div className="space-y-4">
                        {[
                            { name: 'Viscoline (1 мл)', price: '10 000 ₽' },
                            { name: 'Biohyalux (1 мл)', price: '10 000 ₽' },
                            { name: 'MiraLine (1 мл)', price: '10 500 ₽' },
                            { name: 'Dermallure (1 мл)', price: '12 000 ₽' },
                            { name: 'Regenyal Idea Lips (1 мл)', price: '13 500 ₽' },
                            { name: 'Novacutan Fbio (1 мл)', price: '14 000 ₽' },
                            { name: 'Stylage M (1 мл)', price: '15 000 ₽' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                                <span className="text-gray-700 font-medium text-base">{item.name}</span>
                                <span className="text-sage-600 font-bold text-lg whitespace-nowrap">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative group">
                <button onClick={() => handleScroll(lipsScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={lipsScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {lipsImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white mx-auto">
                            <img src={src} alt="Губы" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(lipsScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

      </div>

      <Footer onNavigate={onNavigate} onOpenContactModal={onOpenContactModal} />

      {/* --- MODALS --- */}

      {/* 1. BOTOX MODAL */}
      {isBotoxModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
           <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsBotoxModalOpen(false)}></div>
           <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
               
               <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                   <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Ботулинотерапия</h3>
                   <button onClick={() => setIsBotoxModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
               </div>

               <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-12">
                   {/* Intro Section */}
                   <div className="flex flex-col gap-8 items-start">
                       <div className="w-full">
                           <h4 className="font-serif font-bold italic text-sage-600 text-xl md:text-2xl mb-6 leading-tight">
                               Ботулинотерапия — стираем морщины, сохраняя эмоции
                           </h4>
                           <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                                <p>Многие до сих пор боятся «ботокса», представляя неподвижное лицо-маску. И зря!</p>
                                <p>Ботулинотерапия в 2026 году — это деликатная работа с мимикой, а не её «заморозка».</p>
                                <div className="bg-sage-50 p-6 rounded-2xl border border-sage-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Zap className="text-sage-500" size={24} />
                                        <h5 className="font-serif font-bold italic text-sage-700 text-xl">Как это работает?</h5>
                                    </div>
                                    <p className="text-base">Препарат избирательно расслабляет только те мышцы, которые создают залом на коже. Мышца «отдыхает», кожа над ней разглаживается. Бонус: за 4-6 месяцев действия вы просто отвыкаете хмуриться. Это лучшая профилактика глубоких статических морщин.</p>
                                </div>
                           </div>
                       </div>
                   </div>

                   {/* Safety Section */}
                   <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100">
                        <h5 className="font-bold text-stone-700 mb-6 font-serif text-xl flex items-center">
                            <ShieldCheck className="mr-3 text-sage-500" size={26} />
                            Безопасность — прежде всего
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-50 transition-shadow hover:shadow-md">
                                <strong className="text-sage-600 block mb-3 text-lg font-serif italic font-bold">Точность</strong>
                                <p className="text-base text-gray-600 leading-relaxed">Препарат не попадает в системный кровоток и работает только локально в месте введения.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-50 transition-shadow hover:shadow-md">
                                <strong className="text-sage-600 block mb-3 text-lg font-serif italic font-bold">История</strong>
                                <p className="text-base text-gray-600 leading-relaxed">В медицине ботулотоксины применяют в неврологии для лечения ДЦП у детей с 6 месяцев. Дозировки там в десятки раз выше, чем в косметологии.</p>
                            </div>
                        </div>
                   </div>

                   {/* Preparations Section */}
                   <div className="bg-[#5B7360] p-8 md:p-10 rounded-[30px] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h5 className="font-serif font-bold italic text-2xl md:text-3xl mb-6">С какими препаратами я работаю?</h5>
                                <p className="opacity-95 mb-8 leading-relaxed text-base md:text-lg">В моей практике — только проверенные и сертифицированные препараты: <span className="font-bold">Диспорт (Франция)</span> и <span className="font-bold">Релатокс (Россия)</span>.</p>
                                
                                <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-inner">
                                    <h6 className="font-bold mb-3 flex items-center gap-2 text-lg">Почему Релатокс дороже за единицу?</h6>
                                    <p className="text-base leading-relaxed opacity-90">Всё дело в концентрации. В 1 единице Релатокса в 2.5-3 раза больше активного вещества, чем в Диспорте. В итоге стоимость процедуры выходит примерно одинаковой. Что подойдет именно вам — решим на осмотре.</p>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <img 
                                    src="https://i.ibb.co/WN7SxR4b/Frame-817.png" 
                                    alt="Препараты Диспорт и Релатокс" 
                                    className="w-full max-w-[280px] md:max-w-full h-auto object-contain" 
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                   </div>

                   {/* Results & Restrictions */}
                   <div className="space-y-12">
                        <div>
                             <h5 className="font-bold text-charcoal mb-4 font-serif text-xl">Когда ждать результат?</h5>
                             <div className="bg-white border-l-4 border-sage-500 p-6 rounded-r-2xl shadow-sm italic text-gray-700 text-base md:text-lg leading-relaxed">
                                «Первые изменения видны уже через 24 часа, а окончательный эффект наступает через 2 недели. В этот момент я приглашаю вас на осмотр, чтобы при необходимости провести коррекцию»
                             </div>
                        </div>

                        <div>
                            <h5 className="font-montserrat font-bold text-gray-800 mb-8 text-base uppercase tracking-widest border-l-4 border-sage-500 pl-5">Важные ограничения</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {restrictionData.map((item, i) => (
                                    <div key={i} className="bg-stone-50 p-6 rounded-[24px] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
                                        <div className="text-sage-500 mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                        <strong className="text-sage-800 text-sm font-bold block mb-2 uppercase tracking-tight">{item.t}</strong>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                   </div>

                   {/* Myths Section */}
                   <div className="pt-16 border-t border-gray-100">
                        <div className="flex items-center justify-center mb-12">
                             <h4 className="font-serif font-bold italic text-sage-600 text-3xl md:text-4xl text-center tracking-tight">
                                 5 мифов, в которые пора перестать верить
                             </h4>
                        </div>
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {mythData.map((myth, index) => (
                                <div key={index} className="bg-white border border-stone-100 rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                                    <div 
                                        className="flex items-start gap-4 p-5 md:p-6 cursor-pointer group"
                                        onClick={() => setOpenBotoxMyth(openBotoxMyth === index ? null : index)}
                                    >
                                        <span className="font-serif italic text-2xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 select-none leading-none pt-0.5">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-montserrat font-medium text-gray-800 text-base pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                                    {myth.q}
                                                </h3>
                                                <div className={`text-sage-500 shrink-0 transition-transform duration-500 ${openBotoxMyth === index ? 'rotate-180' : ''}`}>
                                                    {openBotoxMyth === index ? <Minus size={18}/> : <Plus size={18}/>}
                                                </div>
                                            </div>
                                            <div className={`overflow-hidden transition-all duration-500 ${openBotoxMyth === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                <p className="font-montserrat text-gray-600 leading-relaxed text-base border-t border-stone-50 pt-4">
                                                    {myth.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                   </div>

                   {/* Footer CTA */}
                   <div className="bg-sage-500 text-white p-8 md:p-12 rounded-[30px] shadow-2xl text-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                       <p className="font-serif italic text-xl md:text-2xl leading-relaxed opacity-95 relative z-10">
                           «Ваше лицо останется вашим — только более свежим, спокойным и отдохнувшим»
                       </p>
                   </div>

               </div>
           </div>
        </div>
      )}

      {/* --- PLASMA MODAL --- */}
      {isPlasmaModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
                <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsPlasmaModalOpen(false)}></div>
                <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                    <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                        <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Плазмотерапия</h3>
                        <button onClick={() => setIsPlasmaModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                    </div>
                    <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-12">
                         
                         {/* Intro */}
                         <div className="flex flex-col md:flex-row gap-8 items-center">
                             <div className="flex-1">
                                 <h4 className="font-serif font-bold italic text-charcoal text-2xl mb-4">Регенеративная терапия вашей собственной кровью</h4>
                                 <p className="text-gray-600 leading-relaxed text-base">
                                     Многие ищут «эликсир молодости» в дорогих кремах, но самый мощный ресурс для восстановления заложен в нас самих. Я называю плазмотерапию <span className="font-bold text-sage-600">«клеточным ремонтом»</span>.
                                 </p>
                             </div>
                             <div className="w-full md:w-1/3 shrink-0 bg-sage-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-sage-100">
                                 <Droplet className="text-sage-500 w-12 h-12 mb-2" />
                                 <span className="font-bold text-sage-700 text-lg">100% биосовместимость</span>
                                 <span className="text-sm text-gray-500 mt-1">Никакой аллергии, ведь это ваша собственная кровь</span>
                             </div>
                         </div>

                         {/* How It Works */}
                         <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                             <div className="flex items-center gap-3 mb-4">
                                 <Zap className="text-sage-500" size={24} />
                                 <h5 className="font-serif font-bold text-xl text-charcoal">Как это работает «на пальцах»?</h5>
                             </div>
                             <p className="text-gray-600 text-base leading-relaxed mb-6">
                                 В нашей крови есть уникальные клетки — тромбоциты. Это природные «инженеры-строители». Когда мы вводим очищенную плазму с высокой концентрацией тромбоцитов в кожу, они:
                             </p>
                             <ul className="space-y-3 text-base text-gray-600">
                                 <li className="flex gap-3 items-start bg-sage-50 p-3 rounded-lg">
                                     <ArrowRight className="text-sage-500 mt-1 shrink-0" size={18} />
                                     <span>Устремляются в зоны дефицита и «поломки».</span>
                                 </li>
                                 <li className="flex gap-3 items-start bg-sage-50 p-3 rounded-lg">
                                     <ArrowRight className="text-sage-500 mt-1 shrink-0" size={18} />
                                     <span>Запускают синтез собственного коллагена, эластина и гиалуроновой кислоты.</span>
                                 </li>
                                 <li className="flex gap-3 items-start bg-sage-50 p-3 rounded-lg">
                                     <ArrowRight className="text-sage-500 mt-1 shrink-0" size={18} />
                                     <span>Координируют заживление и обновление тканей изнутри.</span>
                                 </li>
                             </ul>
                         </div>

                         {/* Results */}
                         <div>
                             <h5 className="font-bold text-lg text-charcoal mb-6 flex items-center gap-2">
                                 <Sparkles size={20} className="text-sage-500" />
                                 Результат, который вы увидите:
                             </h5>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="flex gap-3 items-start border border-gray-100 p-4 rounded-xl">
                                     <span className="text-sage-500 font-bold">➤</span>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Сияние и ровный тон</strong>
                                         <span className="text-base text-gray-600">уходит «серость» лица и пигментация.</span>
                                     </div>
                                 </div>
                                 <div className="flex gap-3 items-start border border-gray-100 p-4 rounded-xl">
                                     <span className="text-sage-500 font-bold">➤</span>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Чистая кожа</strong>
                                         <span className="text-base text-gray-600">уменьшаются воспаления и акне.</span>
                                     </div>
                                 </div>
                                 <div className="flex gap-3 items-start border border-gray-100 p-4 rounded-xl">
                                     <span className="text-sage-500 font-bold">➤</span>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Стирание шрамов</strong>
                                         <span className="text-base text-gray-600">рубцы и постакне становятся менее заметными.</span>
                                     </div>
                                 </div>
                                 <div className="flex gap-3 items-start border border-gray-100 p-4 rounded-xl">
                                     <span className="text-sage-500 font-bold">➤</span>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Густые волосы</strong>
                                         <span className="text-base text-gray-600">останавливает выпадение и «пробуждает» спящие луковицы.</span>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         {/* Meaplasma Advantage */}
                         <div className="bg-sage-500 text-white p-8 rounded-[24px] relative overflow-hidden">
                             <div className="relative z-10">
                                 <h5 className="font-serif font-bold text-2xl mb-6">Почему пробирки MEAPLASMA — это 50% успеха?</h5>
                                 <p className="opacity-90 mb-6 font-montserrat text-base">
                                     Качество плазмы напрямую зависит от того, в чем её готовят. Я работаю на системе MEAPLASMA, потому что я выбираю безопасность:
                                 </p>
                                 <ul className="space-y-4 font-montserrat text-base">
                                     <li className="flex gap-3 items-start">
                                         <div className="bg-white text-sage-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                                         <p><span className="font-bold">Регистрационное удостоверение:</span> они официально разрешены для применения in vivo (внутри организма).</p>
                                     </li>
                                     <li className="flex gap-3 items-start">
                                         <div className="bg-white text-sage-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                                         <p><span className="font-bold">Максимальная концентрация:</span> специальный разделительный гель позволяет получить плазму с живыми, активными тромбоцитами в нужной дозировке.</p>
                                     </li>
                                     <li className="flex gap-3 items-start">
                                         <div className="bg-white text-sage-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                                         <p><span className="font-bold">Чистота:</span> никакой аллергии и нежелательных реакций, так как мы работаем исключительно с вашим биоматериалом.</p>
                                     </li>
                                 </ul>
                             </div>
                             <div className="absolute -bottom-4 -right-4 w-[60%] md:w-[35%] opacity-30 pointer-events-none">
                                 <img src="https://i.ibb.co/Xks5zQsp/image.png" alt="" className="w-full h-auto object-contain object-right-bottom translate-y-2 translate-x-2" />
                             </div>
                         </div>

                         {/* FAQ Section - Updated Style */}
                         <div className="space-y-2 pt-4 border-t border-gray-100">
                             <h4 className="font-serif font-bold italic text-sage-600 text-2xl text-center md:text-left mb-6">Вопрос-ответ</h4>
                             
                             {plasmaFaqData.map((item, index) => (
                                 <div key={index} className="border-b border-gray-100 py-6">
                                     <div 
                                         className="flex items-start gap-4 md:gap-6 cursor-pointer group"
                                         onClick={() => setPlasmaFaqOpen(plasmaFaqOpen === index ? null : index)}
                                     >
                                         <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">
                                             {String(index + 1).padStart(2, '0')}
                                         </span>
                                         <div className="flex-grow">
                                             <div className="flex justify-between items-start">
                                                 <h3 className="font-montserrat font-medium text-gray-800 text-[15px] md:text-lg pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                                     {item.q}
                                                 </h3>
                                                 <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${plasmaFaqOpen === index ? 'rotate-180' : ''}`}>
                                                     {plasmaFaqOpen === index ? <Minus size={20}/> : <Plus size={20}/>}
                                                 </div>
                                             </div>
                                             <div className={`overflow-hidden transition-all duration-500 ease-in-out ${plasmaFaqOpen === index ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                 <div className="font-montserrat text-gray-500 leading-relaxed text-base">
                                                     {item.a}
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>

                    </div>
                </div>
           </div>
      )}

      {/* --- BIOREVITALIZATION MODAL --- */}
      {isBiorevModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
                <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsBiorevModalOpen(false)}></div>
                <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                    <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                        <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Биоревитализация</h3>
                        <button onClick={() => setIsBiorevModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                    </div>
                    <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-12">
                         {/* Intro */}
                         <div className="flex flex-col gap-6">
                             <div className="border-b border-sage-100 pb-6">
                                <h4 className="font-serif font-bold italic text-charcoal text-2xl mb-4">Глубокое увлажнение и «оживление» кожи изнутри</h4>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    В переводе с латыни «биоревитализация» означает «возвращение к жизни естественным путем». Я считаю эту процедуру базовой инвестицией в качество кожи. Если кремы работают только на поверхности, то биоревитализация доставляет влагу именно туда, где она необходима — в дерму.
                                </p>
                             </div>
                             
                             <div className="bg-stone-50 p-6 rounded-2xl">
                                 <div className="flex items-center gap-3 mb-3">
                                     <Droplet className="text-sage-500" size={24} />
                                     <h5 className="font-serif font-bold text-xl text-charcoal">Что это такое?</h5>
                                 </div>
                                 <p className="text-gray-600 text-base leading-relaxed">
                                     Это инъекционное введение препаратов на основе гиалуроновой кислоты высокой концентрации. <br/>
                                     <span className="font-bold text-sage-700">Важный нюанс:</span> гиалуроновая кислота — это естественный компонент нашей кожи, который отвечает за её упругость. С возрастом (после 25–30 лет) её выработка падает, и кожа начинает терять упругость и эластичность, становится сухой. Процедура восполняет этот дефицит, создавая мощный гидрорезерв.
                                 </p>
                             </div>
                         </div>

                         {/* Indications */}
                         <div>
                             <h5 className="font-bold text-lg text-charcoal mb-6 flex items-center gap-2">
                                 <UserCheck size={20} className="text-sage-500" />
                                 Кому необходима процедура?
                             </h5>
                             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <li className="flex gap-3 items-start p-5 border border-gray-100 rounded-xl hover:border-sage-200 transition-colors">
                                     <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Сухость и стянутость</strong>
                                         <p className="text-gray-600 text-base">когда увлажняющего крема хватает всего на час.</p>
                                     </div>
                                 </li>
                                 <li className="flex gap-3 items-start p-5 border border-gray-100 rounded-xl hover:border-sage-200 transition-colors">
                                     <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Сетка мелких морщин</strong>
                                         <p className="text-gray-600 text-base">так называемые «линии обезвоженности».</p>
                                     </div>
                                 </li>
                                 <li className="flex gap-3 items-start p-5 border border-gray-100 rounded-xl hover:border-sage-200 transition-colors">
                                     <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Тусклый цвет лица</strong>
                                         <p className="text-gray-600 text-base">«кожа курильщика», серый оттенок из-за стресса.</p>
                                     </div>
                                 </li>
                                 <li className="flex gap-3 items-start p-5 border border-gray-100 rounded-xl hover:border-sage-200 transition-colors">
                                     <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Снижение тонуса</strong>
                                         <p className="text-gray-600 text-base">кожа стала менее плотной, «уставшей».</p>
                                     </div>
                                 </li>
                                 <li className="flex gap-3 items-start p-5 border border-gray-100 rounded-xl md:col-span-2 hover:border-sage-200 transition-colors">
                                     <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                     <div>
                                         <strong className="block text-gray-800 text-base mb-1">Подготовка и реабилитация</strong>
                                         <p className="text-gray-600 text-base">до и после поездок на море (защита от фотостарения) или агрессивных лазерных процедур.</p>
                                     </div>
                                 </li>
                             </ul>
                         </div>

                         {/* Results */}
                         <div>
                             <h5 className="font-bold text-lg text-charcoal mb-6 flex items-center gap-2">
                                 <Sparkles size={20} className="text-sage-500" />
                                 Что вы получите в результате?
                             </h5>
                             <p className="text-gray-600 mb-6 text-base italic">Результат биоревитализации — это не «новое лицо», а ваша кожа в её лучшем состоянии:</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                 <div className="bg-sage-50 p-6 rounded-xl text-center">
                                     <strong className="block text-sage-800 text-base mb-2">Эффект «фотофильтра»</strong>
                                     <p className="text-base text-gray-600">кожа разглаживается, поры становятся менее заметными</p>
                                 </div>
                                 <div className="bg-sage-50 p-6 rounded-xl text-center">
                                     <strong className="block text-sage-800 text-base mb-2">Сияние</strong>
                                     <p className="text-base text-gray-600">лицо выглядит отдохнувшим, как после отпуска</p>
                                 </div>
                                 <div className="bg-sage-50 p-6 rounded-xl text-center">
                                     <strong className="block text-sage-800 text-base mb-2">Упругость</strong>
                                     <p className="text-base text-gray-600">повышается тургор, морщинки выталкиваются изнутри</p>
                                 </div>
                                 <div className="bg-sage-50 p-6 rounded-xl text-center">
                                     <strong className="block text-sage-800 text-base mb-2">Защита</strong>
                                     <p className="text-base text-gray-600">увлажненная кожа медленнее стареет</p>
                                 </div>
                             </div>
                         </div>

                         {/* Process */}
                         <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                             <h5 className="font-serif font-bold text-xl text-charcoal mb-6">Как проходит процедура?</h5>
                             <div className="space-y-6">
                                 <div className="flex gap-4">
                                     <div className="bg-stone-100 p-3 rounded-full h-fit"><ShieldCheck size={20} className="text-sage-600"/></div>
                                     <div>
                                         <strong className="block text-gray-800 mb-1 text-base">Препараты</strong>
                                         <p className="text-base text-gray-600">Я работаю только с сертифицированными биоревитализантами (с Регистрационным Удостоверением). Это гарантирует чистоту состава и прогнозируемый результат.</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-4">
                                     <div className="bg-stone-100 p-3 rounded-full h-fit"><Plus size={20} className="text-sage-600"/></div>
                                     <div>
                                         <strong className="block text-gray-800 mb-1 text-base">Анестезия</strong>
                                         <p className="text-base text-gray-600">Перед процедурой я наношу аппликационный обезболивающий крем, поэтому инъекции переносятся максимально комфортно.</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-4">
                                     <div className="bg-stone-100 p-3 rounded-full h-fit"><Activity size={20} className="text-sage-600"/></div>
                                     <div>
                                         <strong className="block text-gray-800 mb-1 text-base">Протокол</strong>
                                         <p className="text-base text-gray-600">Мы подбираем препарат индивидуально — кому-то нужно чистое увлажнение, а кому-то состав с пептидами и аминокислотами для лифтинга.</p>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         {/* Conclusion */}
                         <div className="bg-sage-500 text-white p-8 rounded-[24px] relative overflow-hidden text-center">
                             <div className="relative z-10">
                                 <h5 className="font-serif font-bold italic text-2xl mb-4">Нужно ли это вам прямо сейчас?</h5>
                                 <p className="opacity-95 font-montserrat text-lg leading-relaxed max-w-2xl mx-auto">
                                     Если вам 35+, биоревитализация становится ключевым этапом в сохранении молодости. Это не роскошь, а физиологическая потребность кожи, которая помогает избежать более серьезных и дорогостоящих вмешательств в будущем.
                                 </p>
                             </div>
                             <div className="absolute -left-10 -bottom-10 opacity-10 rotate-12">
                                 <Clock size={200} />
                             </div>
                         </div>

                    </div>
                </div>
           </div>
      )}

      {/* --- MESOTHERAPY MODAL --- */}
      {isMesoModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsMesoModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Мезотерапия</h3>
                       <button onClick={() => setIsMesoModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-10">
                       
                       <div className="flex flex-col gap-6">
                           <h4 className="font-serif font-bold italic text-charcoal text-2xl mb-2">Прицельный удар по проблемам кожи</h4>
                           <p className="text-gray-600 leading-relaxed text-base">
                               Если биоревитализация — это глобальное увлажнение, то мезотерапия — это <span className="font-bold text-sage-600">лечение</span>. Мы доставляем витамины, аминокислоты и лечебные компоненты прямо в цель, минуя защитный барьер кожи, который часто не пропускает кремы и сыворотки.
                           </p>
                       </div>

                       <div className="bg-sage-50 p-8 rounded-[24px]">
                           <h5 className="font-serif font-bold text-xl text-charcoal mb-6">Какие проблемы мы решаем?</h5>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
                                    <strong className="block text-sage-600 font-serif italic text-lg mb-2">Акне и постакне</strong>
                                    <p className="text-base text-gray-600">Коктейли с цинком, серой и витаминами группы B снимают воспаление, регулируют себум и рассасывают застойные пятна.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
                                    <strong className="block text-sage-600 font-serif italic text-lg mb-2">Пигментация</strong>
                                    <p className="text-base text-gray-600">Осветляющие компоненты (витамин С, глутатион) блокируют выработку лишнего меланина и выравнивают тон.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
                                    <strong className="block text-sage-600 font-serif italic text-lg mb-2">Темные круги и отеки</strong>
                                    <p className="text-base text-gray-600">Улучшение микроциркуляции и лимфодренаж. Взгляд становится свежим и отдохнувшим.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
                                    <strong className="block text-sage-600 font-serif italic text-lg mb-2">Выпадение волос</strong>
                                    <p className="text-base text-gray-600">Мезотерапия кожи головы «будит» спящие луковицы, останавливает волосопад и ускоряет рост волос.</p>
                                </div>
                           </div>
                       </div>

                       <div className="border-l-4 border-sage-500 pl-6 py-2">
                           <h5 className="font-bold text-charcoal text-lg mb-2">Курс процедур</h5>
                           <p className="text-base text-gray-600 leading-relaxed">
                               Мезотерапия имеет накопительный эффект. Для стойкого результата обычно требуется курс из <span className="font-bold text-sage-600">4–10 процедур</span> с интервалом 7–10 дней.
                           </p>
                       </div>

                       {/* New Content: Who fits mesotherapy */}
                       <div className="space-y-6">
                            <h5 className="font-serif font-bold text-xl text-charcoal">Кому подходит мезотерапия?</h5>
                            <div className="text-base text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Я рекомендую начинать мезотерапию уже с 20–25 лет как профилактику и лечение конкретных проблем (акне, сухость).
                                </p>
                                <p>
                                    Для пациентов 35+ это идеальный способ поддерживать кожу в «ресурсном» состоянии между более серьезными процедурами.
                                </p>
                            </div>
                       </div>

                       <div className="bg-sage-500 text-white p-8 rounded-[24px] text-center mt-4">
                            <p className="font-serif italic text-xl md:text-2xl leading-relaxed opacity-95">
                                «Запишитесь на консультацию, и я подберу именно тот состав «коктейля», который вернет вашей коже здоровое сияние и силу»
                            </p>
                       </div>

                   </div>
               </div>
           </div>
      )}

      {/* --- CONTOUR PLASTIC MODAL --- */}
      {isContourModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsContourModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Контурная пластика</h3>
                       <button onClick={() => setIsContourModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-12">
                       
                       <div className="flex flex-col gap-6">
                           <h4 className="font-serif font-bold italic text-charcoal text-2xl md:text-3xl mb-4 leading-tight">Гармонизация лица: <br/>Возвращаем объемы, данные природой</h4>
                           <p className="text-gray-600 leading-relaxed text-base">
                               С возрастом мы теряем не только коллаген в коже, но и объемы подкожно-жировой клетчатки и даже костной ткани. Лицо «сдувается» и ползет вниз. Контурная пластика — это способ деликатно вернуть эти объемы с помощью филлеров на основе гиалуроновой кислоты.
                           </p>
                           <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 inline-block w-fit">
                               <p className="text-base text-gray-700 italic font-medium">Это не про «перекачанное лицо», а про восстановление молодого каркаса.</p>
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 text-center">
                               <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-500 font-serif italic text-2xl">1</div>
                               <h5 className="font-bold text-lg mb-2 text-charcoal">Скулы и щеки</h5>
                               <p className="text-base text-gray-500">Восполнение утраченного объема дает мгновенный лифтинг-эффект и подтягивает овал лица.</p>
                           </div>
                           <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 text-center">
                               <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-500 font-serif italic text-2xl">2</div>
                               <h5 className="font-bold text-lg mb-2 text-charcoal">Подбородок</h5>
                               <p className="text-base text-gray-500">Коррекция формы подбородка гармонизирует профиль и делает лицо более утонченным.</p>
                           </div>
                           <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 text-center">
                               <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-500 font-serif italic text-2xl">3</div>
                               <h5 className="font-bold text-lg mb-2 text-charcoal">Носогубные складки</h5>
                               <p className="text-base text-gray-500">Заполнение глубоких заломов смягчает черты лица и убирает «усталый» вид.</p>
                           </div>
                       </div>

                       <div className="bg-sage-500 text-white p-8 md:p-10 rounded-[30px] relative overflow-hidden">
                           <ShieldCheck className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 rotate-12" />
                           <h5 className="font-serif font-bold text-2xl mb-4 relative z-10">Безопасность филлеров</h5>
                           <p className="text-base font-montserrat opacity-90 leading-relaxed relative z-10 max-w-2xl">
                               Я работаю только с биодеградируемыми филлерами от мировых производителей (Франция, Швейцария, Корея). Они полностью совместимы с тканями организма и со временем бесследно выводятся естественным путем. Никаких «вечных» гелей и миграции!
                           </p>
                       </div>

                   </div>
               </div>
           </div>
      )}

      {/* --- LIPS MODAL --- */}
      {isLipsModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsLipsModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Аугментация губ</h3>
                       <button onClick={() => setIsLipsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-12">
                       
                       <div className="flex flex-col gap-6">
                           <h4 className="font-serif font-bold italic text-charcoal text-2xl md:text-3xl mb-2 leading-tight">Аугментация губ: Эстетика, увлажнение и возвращение молодости</h4>
                           <p className="text-gray-600 leading-relaxed text-base">
                               Забудьте о стереотипах про «утиные губы». Современная контурная пластика губ — это про гармонию, увлажнение и восстановление.
                           </p>
                       </div>

                       <div className="bg-stone-50 p-8 rounded-2xl">
                           <h5 className="font-serif font-bold text-xl text-charcoal mb-4">Что мы можем исправить:</h5>
                           <ul className="space-y-3">
                               {[
                                   'Асимметрию формы',
                                   'Недостаток объема (тонкие губы)',
                                   'Опущенные уголки рта (грустное лицо)',
                                   'Сухость и шелушение',
                                   'Киссетные морщины вокруг рта'
                               ].map((item, i) => (
                                   <li key={i} className="flex items-center gap-3 text-base text-gray-700">
                                       <Check size={18} className="text-sage-500 shrink-0" />
                                       <span>{item}</span>
                                   </li>
                               ))}
                           </ul>
                       </div>

                       <div className="mt-8 space-y-6">
                            <h5 className="font-serif font-bold text-xl text-sage-600 italic">Мой подход: Бережная естественность</h5>
                            <p className="text-gray-600 text-base">Я за результат «свои, но лучше».</p>

                            <div className="space-y-4">
                                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                                     <strong className="block text-sage-700 font-bold mb-1">Поэтапность</strong>
                                     <p className="text-gray-600 text-base leading-relaxed">Начинаем с объема 0,6–0,8 мл. Если сделать губы слишком пухлыми за один раз — ткани растянутся. Это путь к деформации контура и эффекту «утки». Вместо естественной формы мы получим перерастянутую кожу, на которую в будущем филлер будет ложиться всё хуже.</p>
                                </div>
                                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                                     <strong className="block text-sage-700 font-bold mb-1">Докоррекция</strong>
                                     <p className="text-gray-600 text-base leading-relaxed">После того как спадет первичный отек, мы смотрим, нужно ли добавить «пышности» оставшимся объемом препарата.</p>
                                </div>
                                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                                     <strong className="block text-sage-700 font-bold mb-1">Безопасность</strong>
                                     <p className="text-gray-600 text-base leading-relaxed">Только сертифицированные филлеры с Регистрационным Удостоверением. Экономия на препаратах в этой зоне — прямой путь к миграции геля и осложнениям. Я выбираю только проверенные бренды с многолетними клиническими исследованиями.</p>
                                </div>
                            </div>
                       </div>

                        {/* FAQ Section - Updated Style */}
                        <div className="space-y-2 pt-4 border-t border-gray-100">
                             <h4 className="font-serif font-bold italic text-sage-600 text-2xl text-center md:text-left mb-6">Вопрос-ответ</h4>
                             
                             {lipsFaqData.map((item, index) => (
                                 <div key={index} className="border-b border-gray-100 py-6">
                                     <div 
                                         className="flex items-start gap-4 md:gap-6 cursor-pointer group"
                                         onClick={() => setLipsFaqOpen(lipsFaqOpen === index ? null : index)}
                                     >
                                         <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">
                                             {String(index + 1).padStart(2, '0')}
                                         </span>
                                         <div className="flex-grow">
                                             <div className="flex justify-between items-start">
                                                 <h3 className="font-montserrat font-medium text-gray-800 text-[15px] md:text-lg pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                                     {item.q}
                                                 </h3>
                                                 <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${lipsFaqOpen === index ? 'rotate-180' : ''}`}>
                                                     {lipsFaqOpen === index ? <Minus size={20}/> : <Plus size={20}/>}
                                                 </div>
                                             </div>
                                             <div className={`overflow-hidden transition-all duration-500 ease-in-out ${lipsFaqOpen === index ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                 <div className="font-montserrat text-gray-500 leading-relaxed text-base">
                                                     {item.a}
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>

                         {/* Conclusion */}
                         <div className="bg-sage-500 text-white p-8 rounded-[24px] text-center mt-8">
                             <p className="font-serif italic text-xl md:text-2xl leading-relaxed opacity-95">
                                 «Хотите губы, которые выглядят дорого и натурально? Записывайтесь на консультацию — я подробно разберу вашу анатомию и подберу идеальный план преображения.»
                             </p>
                         </div>

                   </div>
               </div>
           </div>
      )}
      
    </div>
  );
};

export default InjectionCosmetology;
