
import React, { useState, useRef, useEffect } from 'react';
import Header, { NavItem } from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Plus, Minus, X, Check, Droplet, Sparkles, Gem, Wind, Clock, Star, Shield, AlertTriangle, UserCheck, ArrowUpRight, Heart, Smile } from 'lucide-react';

interface EstheticPageProps {
  onNavigate: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  onOpenContactModal?: () => void;
}

const EstheticCosmetology: React.FC<EstheticPageProps> = ({ onNavigate, onOpenContactModal }) => {
  const [openCleaningFaq, setOpenCleaningFaq] = useState<number | null>(0);
  
  // Modals state
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [isPeelsModalOpen, setIsPeelsModalOpen] = useState(false);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  
  const cleaningScrollRef = useRef<HTMLDivElement>(null);
  const peelsScrollRef = useRef<HTMLDivElement>(null);
  const careScrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCleaningModalOpen || isPeelsModalOpen || isCareModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCleaningModalOpen, isPeelsModalOpen, isCareModalOpen]);

  const toggleCleaningFaq = (index: number) => {
    setOpenCleaningFaq(openCleaningFaq === index ? null : index);
  };

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

  const customNavItems: NavItem[] = [
    { label: 'Чистка лица', href: '#cleaning', onClick: (e) => handleScrollTo(e, 'cleaning') },
    { label: 'Пилинги', href: '#peels', onClick: (e) => handleScrollTo(e, 'peels') },
    { label: 'Уходовые процедуры', href: '#care', onClick: (e) => handleScrollTo(e, 'care') },
  ];

  // Specific images for Peels
  const peelImages = [
    'https://i.ibb.co/VcVgf5jw/1.png',
    'https://i.ibb.co/BHmcT6K4/24.png',
    'https://i.ibb.co/wN2Zpm6C/25.png',
    'https://i.ibb.co/Nn3Bzcm4/26.png',
    'https://i.ibb.co/PsDfz97x/33.png',
    'https://i.ibb.co/nq0tjNYh/34.png',
    'https://i.ibb.co/dssbgKNw/44.png',
    'https://i.ibb.co/VcWG5Rgn/47.png',
    'https://i.ibb.co/Qx7KKnM/48.png',
    'https://i.ibb.co/jScdvkF/49.png',
    'https://i.ibb.co/MDnQ8m5h/50.png',
    'https://i.ibb.co/0VBsGYnz/51.png',
    'https://i.ibb.co/wN2ndDKk/52.png',
  ];

  // Specific images for Cleaning
  const cleaningImages = [
    'https://i.ibb.co/dwNVVw61/1.png',
    'https://i.ibb.co/CFBZZfq/2.png',
    'https://i.ibb.co/BHwSGB7n/3.png',
    'https://i.ibb.co/nMfV6bJ6/4-1.png',
    'https://i.ibb.co/3mtYFNzK/5.png',
    'https://i.ibb.co/8nQD21jR/6.png',
    'https://i.ibb.co/4ZPdCrhJ/7.png',
    'https://i.ibb.co/YrKXbrj/8.png',
    'https://i.ibb.co/j9sF8tLZ/9.png',
    'https://i.ibb.co/Qv0Ynk0R/10.png',
    'https://i.ibb.co/wr374Syg/11.png',
    'https://i.ibb.co/s9N2sgNL/12.png',
    'https://i.ibb.co/tPWkH42j/13.png',
    'https://i.ibb.co/kgLWkjxj/14.png',
  ];

  // Specific images for Care Procedures
  const careImages = [
    'https://i.ibb.co/gbr883yP/1.png',
    'https://i.ibb.co/8DBvRQ4q/2.png',
    'https://i.ibb.co/9kWDQgGT/3.png',
    'https://i.ibb.co/GvGX9xs4/4-1.png',
    'https://i.ibb.co/1G0CP9KH/5.png',
    'https://i.ibb.co/QFsGYy6G/7-1.png',
    'https://i.ibb.co/xq71N773/8.png',
  ];

  const cleaningFaqData = [
      {
          q: '«Я выйду от вас с красным лицом и в "дырочку"? Мне завтра на работу...»',
          a: 'Мой протокол включает мощный успокаивающий этап: антисептические и\u00A0поросуживающие маски. После процедуры может наблюдаться легкое покраснение, которое проходит в\u00A0течение 2–3 часов. Никаких «дырок» и\u00A0жутких отеков. Большинство моих клиенток спокойно идут по\u00A0своим делам сразу после визита.'
      },
      {
          q: '«Чистка провоцирует новые прыщи: один выдавишь — десять вылезет».',
          a: 'Это случается только при\u00A0нарушении стерильности или неправильном завершении процедуры. Я использую одноразовые расходные материалы, стерильные инструменты и\u00A0обязательно закрываю поры специальной маской и\u00A0пилингом. Это блокирует путь бактериям и\u00A0купирует воспаления в\u00A0зародыше.'
      },
      {
          q: '«Это больно! Помню, как в прошлый раз у меня слезы из глаз катились...»',
          a: 'Мы живем в\u00A0эпоху «умной» косметологии. Я использую метод холодного гидрирования (специальный гель), который максимально размягчает кожу. Сальные пробки выходят гораздо легче, поэтому мучить вас и\u00A0давить изо\u00A0всех сил не\u00A0придется. Большую часть работы делает ультразвук.'
      },
      {
          q: '«У меня расширятся поры, если их постоянно чистить».',
          a: 'Всё ровно наоборот. Если пору не\u00A0чистить, сальная пробка растягивает её стенки, и\u00A0пора становится еще шире. Регулярная чистка позволяет порам сократиться и\u00A0оставаться незаметными.'
      },
      {
          q: '«Зачем мне чистка, если у меня нет прыщей?»',
          a: 'Чистка — это не\u00A0только про\u00A0акне. Это удаление «мертвых» клеток и\u00A0комедонов (черных точек), которые мешают коже дышать. Без\u00A0чистки даже самый дорогой крем будет просто лежать «слоем пыли» на\u00A0поверхности, не\u00A0проникая внутрь.'
      },
      {
          q: '«Боюсь, что занесут инфекцию».',
          a: 'Безопасность — мой приоритет. Всё, что касается вашей кожи, либо одноразовое, либо прошло многоступенчатую стерилизацию по\u00A0медицинским стандартам. В\u00A0кабинете косметолога чище, чем в\u00A0операционной.'
      }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <Header onNavigate={onNavigate} customNavItems={customNavItems} />

      {/* Hero Section */}
      <section className="relative pt-10 pb-12 md:py-24 max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start">
            {/* Text */}
            <div className="lg:col-span-6">
                 <button 
                    onClick={() => onNavigate('home')}
                    className="flex items-center text-gray-500 hover:text-sage-600 transition-colors font-montserrat text-base font-medium group py-2 mb-6"
                 >
                    <ArrowLeft size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Назад на главную</span>
                 </button>
                 <h1 className="font-serif font-bold italic text-sage-500 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                    Эстетическая косметология
                 </h1>
                 <p className="font-montserrat text-gray-600 text-lg leading-relaxed max-w-lg">
                    Основа вашей красоты. Регулярный профессиональный уход, который поддерживает здоровье кожи, дарит сияние и&nbsp;продлевает молодость без&nbsp;инъекций.
                 </p>
            </div>
            {/* Image */}
            <div className="lg:col-span-6 relative">
                 <div className="rounded-[40px] overflow-hidden shadow-lg h-[400px]">
                    <img src="https://i.ibb.co/rK7yfzLq/0012.png" alt="Эстетическая косметология" className="w-full h-full object-cover" />
                 </div>
                 {/* Decorative Circle */}
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sage-100 rounded-full blur-2xl -z-10"></div>
            </div>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-[1200px] mx-auto px-4 pb-20 space-y-24 md:space-y-48">
        
        {/* 1. Cleaning */}
        <section id="cleaning" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">01</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Чистка лица</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Глубокое очищение пор, удаление комедонов и&nbsp;ороговевших клеток. 10-этапный протокол для&nbsp;идеально чистой и&nbsp;дышащей кожи.
                    </p>
                    <button 
                        onClick={() => setIsCleaningModalOpen(true)}
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Подробнее о&nbsp;10 этапах <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10 min-h-[160px] flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Аппаратная чистка</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 400 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Комбинированная чистка</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 800 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Механическая чистка</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">3 200 ₽</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="relative group">
                <button 
                    onClick={() => handleScroll(cleaningScrollRef, 'left')}
                    className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div 
                    ref={cleaningScrollRef}
                    className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                        {cleaningImages.map((src, idx) => (
                            <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white group cursor-pointer mx-auto">
                                <img src={src} alt={`Чистка лица ${idx + 1}`} className="w-full h-full object-contain bg-white" />
                            </div>
                        ))}
                </div>
                <button 
                    onClick={() => handleScroll(cleaningScrollRef, 'right')}
                    className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </section>

        {/* 2. Peels (Renumbered to 02 in display logic) */}
        <section id="peels" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">02</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Пилинги</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Обновление кожи, выравнивание тона и рельефа. От легких поверхностных до срединных пилингов для решения сложных задач.
                    </p>
                    <button 
                        onClick={() => setIsPeelsModalOpen(true)}
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10 min-h-[160px] flex flex-col justify-center">
                    <div className="space-y-6">
                        <div>
                            <h5 className="font-montserrat font-bold text-sage-500 text-sm uppercase tracking-widest mb-3">Биоревитализирующие</h5>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1">
                                    <span className="text-gray-700 font-medium text-base">TC+</span>
                                    <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 600 ₽</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1">
                                    <span className="text-gray-700 font-medium text-base">BioRePeelCl3</span>
                                    <span className="text-sage-600 font-bold text-lg whitespace-nowrap">3 000 ₽</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-montserrat font-bold text-sage-500 text-sm uppercase tracking-widest mb-3">Желтый (Ретиноловый)</h5>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1">
                                    <span className="text-gray-700 font-medium text-base">TimeCode</span>
                                    <span className="text-sage-600 font-bold text-lg whitespace-nowrap">3 000 ₽</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1">
                                    <span className="text-gray-700 font-medium text-base">MediDerma</span>
                                    <span className="text-sage-600 font-bold text-lg whitespace-nowrap">3 500 ₽</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1">
                                    <span className="text-gray-700 font-medium text-base">DermaTime</span>
                                    <span className="text-sage-600 font-bold text-lg whitespace-nowrap">3 500 ₽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <button onClick={() => handleScroll(peelsScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={peelsScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {peelImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white group cursor-pointer mx-auto">
                            <img src={src} alt={`Пилинг ${idx + 1}`} className="w-full h-full object-contain bg-white" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(peelsScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

        {/* 3. Care (Renumbered to 03) */}
        <section id="care" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                <div className="lg:col-span-4 relative pt-2">
                    <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">03</span>
                    <h2 className="font-serif font-bold italic text-charcoal text-3xl md:text-4xl mb-4 relative z-10">Уходовые процедуры</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        Комплексные программы для мгновенного сияния, увлажнения и восстановления кожи перед важным событием или как регулярная забота.
                    </p>
                    <button 
                        onClick={() => setIsCareModalOpen(true)}
                        className="flex items-center w-fit text-sage-600 border-b border-sage-400 pb-1 text-xs uppercase tracking-widest font-bold hover:text-sage-800 hover:border-sage-600 transition-all relative z-10 group"
                    >
                        Узнать больше <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10 min-h-[160px] flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Карбокситерапия</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 200 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Бриллиантовый уход</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 700 ₽</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-2">
                            <span className="text-gray-700 font-medium text-base">Газожидкостный пилинг</span>
                            <span className="text-sage-600 font-bold text-lg whitespace-nowrap">2 300 ₽</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <button onClick={() => handleScroll(careScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowLeft size={20} /></button>
                <div ref={careScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 px-0 md:px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {careImages.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center relative border border-gray-100 shadow-sm bg-white group cursor-pointer mx-auto">
                            <img src={src} alt={`Уход ${idx + 1}`} className="w-full h-full object-contain bg-white" />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleScroll(careScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white lg:-ml-6 transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"><ArrowRight size={20} /></button>
            </div>
        </section>

      </div>

      <Footer onNavigate={onNavigate} onOpenContactModal={onOpenContactModal} />

      {/* --- MODALS --- */}
      
      {/* Cleaning Modal */}
      {isCleaningModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsCleaningModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Чистка лица</h3>
                       <button onClick={() => setIsCleaningModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                            <div className="flex-1 space-y-6">
                                 <h4 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl leading-tight">
                                    Чистка лица: Больше, чем просто удаление «черных точек»
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    Это не просто "выдавливание прыщей", а полноценная терапевтическая процедура из 10 этапов. Мы последовательно очищаем, разрыхляем, удаляем содержимое пор, дезинфицируем и успокаиваем кожу. Результат — свежее, дышащее лицо без красноты и воспалений.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    Чистая кожа — это не только эстетика, но и залог её нормальной жизни. Наша кожа дышит, защищает нас и выводит токсины. Но если поры закупорены сальными пробками и пылью, она перестает справляться со своими обязанностями на 100%.
                                </p>
                            </div>
                            
                            <div className="w-full md:w-1/3 shrink-0">
                                 <img 
                                    src="https://i.ibb.co/SwC7trnw/image.png" 
                                    alt="Чистка лица" 
                                    className="w-full h-auto rounded-2xl shadow-sm border border-gray-100" 
                                 />
                            </div>
                        </div>

                        <div className="space-y-12 mb-12">
                            <div className="bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-100">
                                 <div className="flex items-center gap-3 mb-3">
                                    <AlertTriangle className="text-sage-500" />
                                    <h5 className="font-serif font-bold text-lg text-charcoal">Почему не стоит «чистить» лицо дома?</h5>
                                 </div>
                                 <p className="text-gray-700 text-base leading-relaxed">
                                    Самостоятельные попытки выдавить прыщик часто превращаются в замкнутый круг: <span className="font-bold">травма ткани ➜ разнос инфекции ➜ новые воспаления на утро ➜ рубцы и пятна постакне.</span>
                                    <br/><br/>
                                    Чтобы чистка действительно оздоравливала, а не калечила, её должен проводить специалист в стерильных условиях.
                                 </p>
                            </div>

                            <div>
                                <h5 className="font-serif font-bold text-xl text-charcoal mb-4">Мой золотой стандарт: Комбинированная чистка</h5>
                                <p className="text-gray-600 mb-6 text-base">Я сторонник разумного подхода, поэтому чаще всего выбираю комбинированную методику:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-sage-50 p-6 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-sage-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                            <strong className="text-sage-800">Ультразвук</strong>
                                        </div>
                                        <p className="text-base text-gray-600">Деликатно отшелушивает роговой слой и удаляет поверхностные загрязнения на непроблемных участках. Это дарит коже сияние и гладкость.</p>
                                    </div>
                                    <div className="bg-sage-50 p-6 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-sage-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                            <strong className="text-sage-800">Механический этап</strong>
                                        </div>
                                        <p className="text-base text-gray-600">Вручную (петлей или ложкой УНО) я прорабатываю только те зоны, где есть плотные, глубоко сидящие сальные пробки. Только так можно гарантированно очистить пору.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm">
                                <h5 className="font-serif font-bold text-xl text-charcoal mb-6">Как проходит процедура</h5>
                                <p className="text-gray-600 text-base mb-6">Я не просто «давлю точки», я провожу полноценную терапию кожи, которая включает 10 этапов:</p>
                                <ul className="space-y-4">
                                     <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                        <div className="text-base text-gray-700"><strong className="text-sage-700">Подготовка:</strong> Бережное умывание, глубокое очищение и скрабирование.</div>
                                     </li>
                                     <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                        <div className="text-base text-gray-700"><strong className="text-sage-700">Раскрытие пор:</strong> Нанесение специального гидрирующего геля. Он разрыхляет эпидермис, что позволяет удалять загрязнения эффективно и с минимальным дискомфортом.</div>
                                     </li>
                                     <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                        <div className="text-base text-gray-700"><strong className="text-sage-700">Сам процесс:</strong> Ультразвуковое и ручное очищение.</div>
                                     </li>
                                     <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                        <div className="text-base text-gray-700">
                                            <strong className="text-sage-700">Лечебный уход (обязательный этап!):</strong>
                                            <ul className="pl-4 mt-2 space-y-1 border-l border-sage-200">
                                                <li>➞ Поверхностный пилинг (подбираю по типу кожи).</li>
                                                <li>➞ Противовоспалительная маска, чтобы утром не было «сюрпризов».</li>
                                                <li>➞ Поросуживающая маска, чтобы закрыть чистые поры и защитить их от бактерий.</li>
                                            </ul>
                                        </div>
                                     </li>
                                     <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                        <div className="text-base text-gray-700"><strong className="text-sage-700">Финиш:</strong> Защитный крем по типу кожи.</div>
                                     </li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-serif font-bold text-xl text-charcoal mb-4">Результат, который вы почувствуете сразу:</h5>
                                <div className="grid gap-3">
                                     <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <Check className="text-sage-500 shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-700 text-base font-medium">Кожа начинает «дышать» и освобождается от токсинов.</span>
                                     </div>
                                     <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <Check className="text-sage-500 shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-700 text-base font-medium">Улучшается цвет лица, уходит серость.</span>
                                     </div>
                                     <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <Check className="text-sage-500 shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-700 text-base font-medium">Микрорельеф выравнивается, кожа становится гладкой на ощупь.</span>
                                     </div>
                                     <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <Check className="text-sage-500 shrink-0 mt-0.5" size={18} />
                                        <span className="text-gray-700 text-base font-medium">Главный бонус: ваши домашние кремы и сыворотки начинают работать в разы эффективнее, так как путь к клеткам теперь открыт!</span>
                                     </div>
                                </div>
                            </div>
                            
                            <p className="font-serif italic text-lg text-center text-sage-600 border-t border-gray-100 pt-6">
                                Чистка — это база, которая полезна всем: и женщинам, и подросткам. Подарите своей коже чистоту и здоровье!
                            </p>
                        </div>
                        
                        <div className="space-y-2 mb-8 border-t border-gray-100 pt-8">
                            <h4 className="font-serif font-bold italic text-sage-600 text-xl mb-6">Частые вопросы</h4>
                            {cleaningFaqData.map((item, index) => (
                                <div key={index} className="border-b border-gray-100 py-6">
                                    <div 
                                        className="flex items-start gap-4 cursor-pointer group"
                                        onClick={() => toggleCleaningFaq(index)}
                                    >
                                        <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-montserrat font-medium text-gray-800 text-base pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                                    {item.q}
                                                </h3>
                                                <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${openCleaningFaq === index ? 'rotate-180' : ''}`}>
                                                    {openCleaningFaq === index ? <Minus size={18}/> : <Plus size={18}/>}
                                                </div>
                                            </div>
                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openCleaningFaq === index ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                <p className="font-montserrat text-gray-500 leading-relaxed text-base">
                                                    {item.a}
                                                </p>
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

       {/* Peels Modal */}
       {isPeelsModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsPeelsModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Пилинги</h3>
                       <button onClick={() => setIsPeelsModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-8">
                       <div className="flex flex-col md:flex-row gap-6 items-start">
                           <div className="flex-1">
                               <h4 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl mb-4 leading-tight">
                                   Пилинги: Почему этой процедуры не стоит бояться?
                               </h4>
                               <div className="text-gray-600 leading-relaxed text-base space-y-4">
                                   <p>
                                       Пилинг — это база, которая нужна абсолютно каждому. Наша кожа постоянно обновляется, но с возрастом этот процесс замедляется. Пилинги помогают «сбросить лишнее», возвращая лицу сияние, гладкость и упругость.
                                   </p>
                                   <p>
                                       Несмотря на популярность процедуры, многие пациентки до сих пор боятся «выпасть из жизни» на неделю из-за шелушений. Давайте разберем по порядку, почему современный пилинг — это безопасно и комфортно.
                                   </p>
                               </div>
                           </div>
                           <div className="w-full md:w-1/3 shrink-0">
                                <img 
                                   src="https://i.ibb.co/0ymZ534P/image.png" 
                                   alt="Пилинги" 
                                   className="w-full h-auto rounded-2xl shadow-sm border border-gray-100" 
                                />
                           </div>
                       </div>

                       <div className="bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-100">
                           <h5 className="font-serif font-bold text-xl text-charcoal mb-4">1. Шелушение — это не обязательное условие</h5>
                           <p className="text-gray-600 text-base mb-4">Многие думают, что если кожа не «слезает лоскутами», то пилинг не сработал. Это миф!</p>
                           <ul className="space-y-3 mb-6">
                               <li className="flex gap-3 text-base text-gray-700">
                                   <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                   <span><strong>Поверхностные пилинги:</strong> Не дают красноты и шелушения. Их можно делать круглый год (даже летом!). Они мягко обновляют кожу, но требуют курса из 4–6 процедур.</span>
                               </li>
                               <li className="flex gap-3 text-base text-gray-700">
                                   <div className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2.5 shrink-0"></div>
                                   <span><strong>Срединные пилинги (Джесснера, Ретиноевый):</strong> Дают выраженный результат, но требуют реабилитации.</span>
                               </li>
                           </ul>
                           <div className="bg-white p-5 rounded-xl border-l-4 border-sage-500 shadow-sm">
                               <strong className="block text-sage-700 font-bold mb-1 text-sm uppercase tracking-wide">Моя позиция:</strong>
                               <p className="text-base text-gray-600 italic">Я против агрессивного «знакомства» с пилингами. Сначала мы готовим кожу мягкими составами, отслеживаем реакцию, и только потом переходим к серьезным задачам.</p>
                           </div>
                       </div>

                       <div>
                           <h5 className="font-serif font-bold text-xl text-charcoal mb-4">2. Профессиональный состав — это не «домашняя химия»</h5>
                           <p className="text-gray-600 text-base mb-6">Профессиональные пилинги — это сложные формулы с высокой концентрацией активных веществ.</p>
                           <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <li className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm text-base text-gray-700 leading-relaxed">
                                   <Shield size={24} className="text-sage-500 mb-3"/>
                                   Они продаются только специалистам через официальных дистрибьюторов.
                               </li>
                               <li className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm text-base text-gray-700 leading-relaxed">
                                   <Clock size={24} className="text-sage-500 mb-3"/>
                                   У каждого состава свой протокол (время выдержки, способ нейтрализации).
                               </li>
                               <li className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm text-base text-gray-700 leading-relaxed">
                                   <UserCheck size={24} className="text-sage-500 mb-3"/>
                                   Только косметолог может учесть все нюансы вашей кожи, чтобы процедура принесла пользу, а не ожог.
                               </li>
                           </ul>
                       </div>

                       <div className="flex flex-col md:flex-row gap-6 items-start bg-white border border-sage-100 p-6 md:p-8 rounded-2xl shadow-sm">
                           <div className="bg-sage-50 p-4 rounded-full text-sage-600 shrink-0">
                                <Sparkles size={32} />
                           </div>
                           <div>
                               <h5 className="font-serif font-bold text-xl text-charcoal mb-3">3. Идеальный тандем с инъекциями</h5>
                               <p className="text-gray-600 text-base leading-relaxed">
                                   Пилинги не заменяют уколы, а усиливают их! Они подготавливают кожу, делают её более восприимчивой к биоревитализации и продлевают эффект от ботулинотерапии.
                                </p>
                           </div>
                       </div>

                       <div className="bg-sage-500 text-white p-8 rounded-[24px] text-center relative overflow-hidden">
                           <p className="relative z-10 font-montserrat text-lg md:text-xl leading-relaxed font-medium">
                               Девочки, не бойтесь пилингов! Это инвестиция в вашу свежесть и тонус. Приходите на консультацию — мы подберем тот состав, который заставит вашу кожу сиять, не выбивая вас из привычного графика жизни.
                           </p>
                           <div className="absolute -right-6 -bottom-6 opacity-10 text-white">
                               <Heart size={150} fill="currentColor" />
                           </div>
                       </div>

                   </div>
               </div>
           </div>
       )}

       {/* Care Modal */}
       {isCareModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-4 sm:py-8">
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsCareModalOpen(false)}></div>
               <div className="bg-white rounded-[30px] w-full max-w-5xl max-h-full flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                   <div className="flex-none p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                       <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Уходовые процедуры</h3>
                       <button onClick={() => setIsCareModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-16">
                       
                       {/* 1. Carboxytherapy */}
                       <div className="space-y-8">
                           <div className="border-b border-sage-100 pb-4">
                               <h4 className="font-serif font-bold italic text-charcoal text-2xl md:text-3xl mb-2">Карбокситерапия: «Эффект Золушки» без уколов</h4>
                           </div>
                           
                           <div className="flex flex-col md:flex-row gap-8 items-start">
                               <div className="flex-1">
                                   <p className="text-gray-600 leading-relaxed text-base">
                                       Хотите сиять «здесь и сейчас»? Неинвазивная карбокситерапия — это экспресс-перезагрузка кожи, когда нужно привести лицо в порядок перед важным событием. Никаких игл, только чистое насыщение клеток кислородом.
                                   </p>
                               </div>
                               <div className="w-full md:w-5/12 lg:w-1/3 rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0">
                                    <img 
                                       src="https://i.ibb.co/6c0dMFxY/IMG-5933-2.png" 
                                       alt="Карбокситерапия" 
                                       className="w-full h-auto object-contain" 
                                    />
                               </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div>
                                   <div className="flex items-center gap-3 mb-4">
                                       <Wind className="text-sage-500" size={24} />
                                       <h5 className="font-serif font-bold text-xl text-charcoal">Как это работает?</h5>
                                   </div>
                                   <p className="text-gray-600 text-base leading-relaxed mb-4">
                                       Специальные составы запускают выделение углекислого газа (CO2) на поверхности кожи. Организм воспринимает это как сигнал к действию:
                                   </p>
                                   <ul className="space-y-2 text-base text-gray-600">
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> Расширяет сосуды, обеспечивая мощный приток крови.</li>
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> Насыщает ткани кислородом и питанием изнутри.</li>
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> Стимулирует синтез коллагена и обновление клеток.</li>
                                   </ul>
                               </div>
                               
                               <div className="bg-sage-50 p-6 rounded-2xl">
                                   <h5 className="font-bold text-sage-800 text-sm uppercase tracking-wide mb-4">Что вы получите за 40 минут:</h5>
                                   <ul className="space-y-3 text-base text-gray-700">
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Мгновенный лифтинг:</strong> кожа становится плотной и подтянутой.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Свежий тон:</strong> исчезает тусклость, осветляются темные круги.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Чистые поры:</strong> уменьшаются проявления акне, кожа матовая.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Увлажнение:</strong> мелкая сетка морщин разглаживается изнутри.</span></li>
                                   </ul>
                               </div>
                           </div>

                           <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm">
                               <div className="space-y-2 text-base text-gray-600">
                                   <p><strong className="text-charcoal">Почему это идеально:</strong> Комфорт (приятные «пузырьки»), Безопасность (подходит беременным), Без реабилитации.</p>
                                   <div className="flex flex-wrap gap-2 pt-2">
                                       <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-medium">Разово — «на выход»</span>
                                       <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-medium">Курс (5–7) — для оздоровления</span>
                                   </div>
                               </div>
                               <div className="shrink-0 font-serif italic text-xl text-sage-600 border-l-0 md:border-l border-gray-200 pl-0 md:pl-6">
                                   Подарите своей коже глоток чистого кислорода!
                               </div>
                           </div>
                       </div>

                       {/* 2. Diamond Care */}
                       <div className="space-y-8 pt-8 border-t border-gray-100">
                           <div className="border-b border-sage-100 pb-4">
                               <h4 className="font-serif font-bold italic text-charcoal text-2xl md:text-3xl mb-2">Бриллиантовый уход: Роскошная реновация вашей кожи</h4>
                           </div>
                           
                           <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
                                <div className="flex-1">
                                   <p className="text-gray-600 leading-relaxed text-base">
                                       Это премиальная процедура-ритуал для тех, кому нужен безупречный вид «здесь и сейчас». Сочетание глубокого очищения, микрошлифовки и насыщения кожи активными сыворотками.
                                   </p>
                                </div>
                                <div className="w-full md:w-5/12 lg:w-1/3 rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0">
                                    <img 
                                       src="https://i.ibb.co/ZpkGqFTj/IMAGE-2024-12-23-13-45-55-2.png" 
                                       alt="Бриллиантовый уход" 
                                       className="w-full h-auto object-contain" 
                                    />
                               </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div>
                                   <div className="flex items-center gap-3 mb-4">
                                       <Gem className="text-sage-500" size={24} />
                                       <h5 className="font-serif font-bold text-xl text-charcoal">Что дает процедура:</h5>
                                   </div>
                                   <ul className="space-y-3 text-base text-gray-700">
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Эффект «отполированной» кожи:</strong> лицо становится идеально гладким и мягким, как шелк.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Фарфоровое сияние:</strong> уходит тусклость, тон выравнивается и начинает «светиться» изнутри.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Сужение пор и лифтинг:</strong> кожа подтягивается, контуры становятся четче.</span></li>
                                       <li className="flex items-start gap-2"><Check size={16} className="text-sage-600 shrink-0"/> <span><strong>Мгновенное преображение:</strong> идеальный вариант перед важным торжеством.</span></li>
                                   </ul>
                               </div>
                               
                               <div className="bg-stone-50 p-6 rounded-2xl flex flex-col justify-center">
                                   <h5 className="font-serif font-bold text-charcoal text-lg italic mb-3">Почему «Бриллиантовый»?</h5>
                                   <p className="text-gray-600 text-base leading-relaxed mb-4">
                                       Потому что процедура возвращает коже чистоту и игру света, свойственную драгоценному камню. Без боли, без уколов, без реабилитации.
                                   </p>
                                   <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-sage-600">
                                       <div className="flex items-center gap-1"><Clock size={14}/> 40–60 минут</div>
                                       <div className="flex items-center gap-1"><Smile size={14}/> Результат сразу</div>
                                   </div>
                               </div>
                           </div>
                       </div>

                       {/* 3. Gas-Liquid Peeling */}
                       <div className="space-y-8 pt-8 border-t border-gray-100">
                           <div className="border-b border-sage-100 pb-4">
                               <h4 className="font-serif font-bold italic text-charcoal text-2xl md:text-3xl mb-2">Газожидкостный пилинг: Свежесть на сверхзвуковой скорости</h4>
                           </div>
                           
                           <div className="flex flex-col md:flex-row gap-8 items-start">
                               <div className="flex-1">
                                   <p className="text-gray-600 leading-relaxed text-base">
                                       Хотите идеально чистую и сияющую кожу без боли и шелушений? Аппарат «АтисМед» превращает очищение в сеанс глубокого увлажнения и SPA-релакса.
                                   </p>
                               </div>
                               <div className="w-full md:w-5/12 lg:w-1/3 rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0">
                                    <img 
                                       src="https://i.ibb.co/fYrR1Y6Z/image.png" 
                                       alt="Газожидкостный пилинг" 
                                       className="w-full h-auto object-contain" 
                                    />
                               </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div>
                                   <div className="flex items-center gap-3 mb-4">
                                       <Droplet className="text-sage-500" size={24} />
                                       <h5 className="font-serif font-bold text-xl text-charcoal">Как это работает?</h5>
                                   </div>
                                   <p className="text-gray-600 text-base leading-relaxed mb-4">
                                       Струя воздуха и лечебной сыворотки подается на кожу под мощным давлением. Этот поток:
                                   </p>
                                   <ul className="space-y-2 text-base text-gray-600">
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> <strong>Шлифует:</strong> мягко убирает ороговевшие клетки.</li>
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> <strong>Очищает:</strong> буквально «выдувает» загрязнения из пор.</li>
                                       <li className="flex items-start gap-2"><ArrowRight size={14} className="text-sage-500 mt-1 shrink-0"/> <strong>Насыщает:</strong> доставляет активные компоненты в дерму без единого укола.</li>
                                   </ul>
                               </div>
                               
                               <div className="bg-sage-50 p-6 rounded-2xl">
                                   <h5 className="font-bold text-sage-800 text-sm uppercase tracking-wide mb-4">Почему стоит попробовать:</h5>
                                   <ul className="space-y-3 text-base text-gray-700">
                                       <li className="flex items-start gap-2"><Star size={14} className="text-sage-500 mt-0.5 shrink-0"/> <span><strong>Абсолютный комфорт:</strong> никакой боли — только приятная прохлада.</span></li>
                                       <li className="flex items-start gap-2"><Star size={14} className="text-sage-500 mt-0.5 shrink-0"/> <span><strong>Лимфодренаж:</strong> мощный поток воздуха снимает отеки.</span></li>
                                       <li className="flex items-start gap-2"><Star size={14} className="text-sage-500 mt-0.5 shrink-0"/> <span><strong>Многозадачность:</strong> лицо, декольте и даже кожа головы.</span></li>
                                       <li className="flex items-start gap-2"><Star size={14} className="text-sage-500 mt-0.5 shrink-0"/> <span><strong>Без реабилитации:</strong> идеально в обеденный перерыв.</span></li>
                                   </ul>
                                   <p className="mt-4 text-base font-medium text-sage-700 italic border-t border-sage-200 pt-2">
                                       Результат: кожа становится гладкой, «дышащей», с ровным фарфоровым тоном.
                                   </p>
                               </div>
                           </div>
                       </div>

                       {/* Indications */}
                       <div className="bg-sage-500 text-white p-8 rounded-[24px] relative overflow-hidden">
                           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                               <div className="flex-1">
                                   <h5 className="font-serif font-bold text-2xl mb-4">Когда стоит записаться на уход?</h5>
                                   <ul className="space-y-3 font-montserrat text-white/90">
                                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full"></div>Перед важным мероприятием (свадьба, фотосессия, свидание)</li>
                                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full"></div>Чтобы восстановиться после перелета или болезни</li>
                                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full"></div>Если кожа выглядит «уставшей», тусклой и обезвоженной</li>
                                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full"></div>Просто чтобы порадовать себя и расслабиться</li>
                                   </ul>
                               </div>
                               <div className="shrink-0">
                                    <button 
                                       onClick={onOpenContactModal}
                                       className="bg-white text-sage-600 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-sage-50 transition-colors shadow-lg"
                                   >
                                       Записаться
                                   </button>
                               </div>
                           </div>
                           <div className="absolute -right-10 -bottom-10 opacity-10">
                               <Sparkles size={200} />
                           </div>
                       </div>

                   </div>
               </div>
           </div>
       )}

    </div>
  );
};

export default EstheticCosmetology;
