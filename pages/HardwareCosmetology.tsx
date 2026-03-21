
import React, { useState, useRef } from 'react';
import Header, { NavItem } from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, HelpCircle, Plus, Minus, Star, Tag } from 'lucide-react';
import { hardwareFaqData } from '../data/hardwareFaq';
import { prices } from '../data/prices';

interface HardwarePageProps {
  onNavigate: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  onOpenContactModal?: () => void;
}

const HardwareCosmetology: React.FC<HardwarePageProps> = ({ onNavigate, onOpenContactModal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pigmentScrollRef = useRef<HTMLDivElement>(null);
  const couperoseScrollRef = useRef<HTMLDivElement>(null);
  const rejuvScrollRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollSection = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const isMobile = window.innerWidth < 640;
      const scrollAmount = isMobile ? ref.current.clientWidth : 400;
      ref.current.scrollBy({ 
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
    { label: 'Пигмент', href: '#pigment', onClick: (e) => handleScrollTo(e, 'pigment') },
    { label: 'Купероз', href: '#couperose', onClick: (e) => handleScrollTo(e, 'couperose') },
    { label: 'Фотоомоложение', href: '#rejuvenation', onClick: (e) => handleScrollTo(e, 'rejuvenation') },
  ];

  const pigmentImages = [
    'https://i.ibb.co/ymDSThmw/1.png',
    'https://i.ibb.co/93T9hzv4/2.png',
    'https://i.ibb.co/zhsJgwmL/3.png',
    'https://i.ibb.co/zh8Zy4kw/4-1.png',
    'https://i.ibb.co/FCTCmKW/5.png',
    'https://i.ibb.co/b5B5bjcD/6.png',
    'https://i.ibb.co/HL2DdSnt/8.png',
  ];

  const couperoseImages = [
    'https://i.ibb.co/Ldgf14kH/1.png',
    'https://i.ibb.co/ymjyWr9Z/2.png',
    'https://i.ibb.co/Kj4DWHC0/3.png',
    'https://i.ibb.co/nq88mfbc/4-1.png',
    'https://i.ibb.co/k6BSbBzy/5.png',
    'https://i.ibb.co/gbYvxJW9/6.png',
    'https://i.ibb.co/s9wRwkD3/7.png',
  ];

  const rejuvImages = [
    'https://i.ibb.co/BHB6pcsb/1.png',
    'https://i.ibb.co/kVZHCk34/2.png',
    'https://i.ibb.co/NdQPvTZ3/3.png',
    'https://i.ibb.co/LXMK1NyK/4-1.png',
    'https://i.ibb.co/Gfp6ybRv/5.png',
    'https://i.ibb.co/gZJQnF5D/6.png',
  ];

  return (
    <div className="bg-[#FAFAF9] min-h-screen relative">
      <Header onNavigate={onNavigate} customNavItems={customNavItems} />

      <section id="device" className="max-w-[1200px] mx-auto px-4 pt-10 pb-12 md:py-24 mb-24 md:mb-56">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 flex flex-col gap-12">
                <div>
                    <button 
                        onClick={() => onNavigate('home')}
                        className="flex items-center text-gray-500 hover:text-sage-600 transition-colors font-montserrat text-base font-medium group py-2 mb-6"
                    >
                        <ArrowLeft size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Назад на главную</span>
                    </button>
                    <h1 className="font-serif font-bold italic mb-6 leading-none tracking-tight">
                        <span className="text-charcoal text-4xl md:text-5xl lg:text-6xl mr-3">CAPELLO</span>
                        <span className="text-[#5B7360] text-4xl md:text-5xl lg:text-6xl">E-Light</span>
                    </h1>
                    <p className="font-montserrat text-gray-700 text-base leading-relaxed mb-6 max-w-xl">
                        Исправляет большинство эстетических дефектов кожи и&nbsp;корректирует признаки старения.
                    </p>
                    <div className="relative pl-6 py-2 border-l-4 border-sage-500">
                        <h4 className="font-serif font-bold italic text-charcoal text-lg mb-2 leading-tight">
                            Аппарат имеет Регистрационное удостоверение Минздрава РФ
                        </h4>
                        <p className="font-montserrat text-gray-600 text-base leading-relaxed max-w-[600px]">
                            Это значит, что он прошел все проверки, доказал свою эффективность и&nbsp;разрешен к&nbsp;использованию в&nbsp;медицинских клиниках. Вы получите яркий результат без&nbsp;вреда для&nbsp;здоровья!
                        </p>
                    </div>
                </div>

                <div className="bg-[#5B7360] rounded-[30px] p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
                    <h3 className="font-montserrat font-bold text-center text-sm uppercase tracking-widest mb-6 relative z-10 leading-relaxed text-white">
                        ТРИ НАИБОЛЕЕ ЭФФЕКТИВНЫХ АППАРАТНЫХ МЕТОДИКИ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative z-10">
                        <div className="flex flex-col items-center text-center px-2 md:border-r md:border-white/20">
                            <h4 className="font-serif font-bold italic text-3xl md:text-4xl mb-1">IPL</h4>
                            <span className="font-serif italic text-white text-lg mb-2 md:mb-4">(свет)</span>
                            <p className="font-montserrat text-base font-medium leading-relaxed text-white">Работает с&nbsp;тоном: устраняет пигмент и&nbsp;сосудистую сетку</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-2 md:border-r md:border-white/20">
                             <h4 className="font-serif font-bold italic text-3xl md:text-4xl mb-1">RF</h4>
                             <span className="font-serif italic text-white text-lg mb-2 md:mb-4">(радиочастота)</span>
                             <p className="font-montserrat text-base font-medium leading-relaxed text-white">Работает с&nbsp;качеством: обеспечивает лифтинг и&nbsp;уплотнение кожи</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-2">
                             <h4 className="font-serif font-bold italic text-3xl md:text-4xl mb-1">SHR</h4>
                             <span className="font-serif italic text-white text-lg mb-2 md:mb-4 opacity-0">.</span>
                             <p className="font-montserrat text-base font-medium leading-relaxed text-white">Технология быстрого и&nbsp;безболезненного удаления волос</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-start-9 lg:col-span-4 w-full relative h-[400px] lg:h-auto">
                 <div className="w-full h-full lg:absolute lg:inset-0 bg-white rounded-[30px] border border-stone-100 overflow-hidden">
                     <img src="https://i.ibb.co/PGys8HYw/image.png" alt="Capello" className="w-full h-full object-contain object-bottom" />
                 </div>
            </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 pb-20 space-y-24 md:space-y-48">
        <section id="methods" className="space-y-24 md:space-y-48">
            <div id="pigment" className="scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                    <div className="lg:col-span-4 relative pt-2">
                        <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">01</span>
                        <h2 className="font-serif font-bold italic text-charcoal text-3xl mb-4 relative z-10">Лечение пигментации</h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10">ОСВЕТЛЕНИЕ И&nbsp;РОВНЫЙ ТОН. Световой импульс находит меланин и&nbsp;разрушает его. В&nbsp;течение 1–2 недель разрушенный пигмент выводится лимфатической системой или отшелушивается.</p>
                        <div className="flex flex-row gap-8 mb-8 border-y border-gray-100 py-4 relative z-10">
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Курс</span>
                                <span className="font-serif italic text-2xl text-sage-600">2–4 <span className="text-base font-sans not-italic text-gray-400">сеансов</span></span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Интервал</span>
                                <span className="font-serif italic text-2xl text-sage-600">14–21 <span className="text-base font-sans not-italic text-gray-400">день</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                        <h4 className="font-serif font-bold italic text-sage-600 text-xl mb-4">Стоимость процедуры</h4>
                        <ul className="space-y-3 mb-4">
                            {prices.pigmentation.map((item, i) => (
                                <li key={i} className="flex justify-between items-end border-b border-dotted border-gray-200 pb-1">
                                    <span className="text-gray-700 text-base">{item.name}</span>
                                    <span className="font-bold text-sage-600 text-lg whitespace-nowrap">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative group">
                    <button onClick={() => scrollSection(pigmentScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowLeft size={20} /></button>
                    <div ref={pigmentScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 snap-x snap-mandatory no-scrollbar">
                        {pigmentImages.map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center bg-white shadow-sm mx-auto">
                                <img src={src} alt="Результат" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollSection(pigmentScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowRight size={20} /></button>
                </div>
            </div>

            <div id="couperose" className="scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                    <div className="lg:col-span-4 relative pt-2">
                        <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">02</span>
                        <h2 className="font-serif font-bold italic text-charcoal text-3xl mb-4 relative z-10">Лечение купероза</h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10">УДАЛЕНИЕ СОСУДОВ. Коагуляция расширенных сосудов. Световой импульс склеивает стенки поврежденного сосуда, делая его незаметным.</p>
                        <div className="flex flex-row gap-8 mb-8 border-y border-gray-100 py-4 relative z-10">
                            <div><span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Курс</span><span className="font-serif italic text-2xl text-sage-600">1–4 <span className="text-base font-sans not-italic text-gray-400">сеансов</span></span></div>
                            <div><span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Интервал</span><span className="font-serif italic text-2xl text-sage-600">14–21 <span className="text-base font-sans not-italic text-gray-400">день</span></span></div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                        <h4 className="font-serif font-bold italic text-sage-600 text-xl mb-4">Стоимость процедуры</h4>
                        <ul className="space-y-3">
                            {prices.couperose.map((item, i) => (
                                <li key={i} className="flex justify-between items-end border-b border-dotted border-gray-200 pb-1"><span className="text-gray-700 text-base">{item.name}</span><span className="font-bold text-sage-600 text-lg whitespace-nowrap">{item.price}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative group">
                    <button onClick={() => scrollSection(couperoseScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowLeft size={20} /></button>
                    <div ref={couperoseScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 snap-x snap-mandatory no-scrollbar">
                        {couperoseImages.map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center bg-white mx-auto shadow-sm">
                                <img src={src} alt="Результат" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollSection(couperoseScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowRight size={20} /></button>
                </div>
            </div>

            <div id="rejuvenation" className="scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start mb-8">
                    <div className="lg:col-span-4 relative pt-2">
                        <span className="absolute -top-28 -left-6 text-sage-200/30 font-serif text-[140px] leading-none italic select-none pointer-events-none z-0">03</span>
                        <h2 className="font-serif font-bold italic text-charcoal text-3xl mb-4 relative z-10">Фотоомоложение</h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10">ОМОЛОЖЕНИЕ И СВЕЖЕСТЬ. Стимулирует выработку собственного коллагена и эластина. Улучшает текстуру кожи, сужает поры и разглаживает мелкие морщины.</p>
                        <div className="flex flex-row gap-8 mb-8 border-y border-gray-100 py-4 relative z-10">
                            <div><span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Курс</span><span className="font-serif italic text-2xl text-sage-600">3–6 <span className="text-base font-sans not-italic text-gray-400">сеансов</span></span></div>
                            <div><span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Интервал</span><span className="font-serif italic text-2xl text-sage-600">21–30 <span className="text-base font-sans not-italic text-gray-400">дней</span></span></div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative z-10">
                        <h4 className="font-serif font-bold italic text-sage-600 text-xl mb-4">Стоимость процедуры</h4>
                        <ul className="space-y-3">
                            {prices.rejuvenation.map((item, i) => (
                                <li key={i} className="flex justify-between items-end border-b border-dotted border-gray-200 pb-1"><span className="text-gray-700 text-base">{item.name}</span><span className="font-bold text-sage-600 text-lg whitespace-nowrap">{item.price}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative group">
                    <button onClick={() => scrollSection(rejuvScrollRef, 'left')} className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowLeft size={20} /></button>
                    <div ref={rejuvScrollRef} className="flex overflow-x-auto gap-0 md:gap-6 pb-4 snap-x snap-mandatory no-scrollbar">
                        {rejuvImages.map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] h-[400px] sm:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden snap-center bg-white mx-auto shadow-sm">
                                <img src={src} alt="Результат" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollSection(rejuvScrollRef, 'right')} className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300"><ArrowRight size={20} /></button>
                </div>
            </div>
        </section>

        {/* Advantageous Procedures Block */}
        <section id="offers" className="scroll-mt-32">
             <div className="mb-10">
                  <div className="flex items-center space-x-3 mb-4">
                      <Tag className="text-sage-500" size={28} />
                      <h2 className="font-serif font-bold italic text-sage-600 text-3xl">Выгодные комплексы</h2>
                  </div>
                  <p className="font-montserrat text-gray-600 text-base leading-relaxed max-w-3xl">
                      Работаем со всем лицом сразу. Это не только выгоднее финансово, но и эффективнее клинически — мы решаем проблему комплексно.
                  </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {prices.offers.map((offer, idx) => (
                     <div key={idx} className={`bg-sage-50 rounded-[30px] p-8 border border-sage-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group relative overflow-hidden ${offer.isHit ? 'ring-2 ring-sage-400 ring-offset-2' : ''}`}>
                         <div className="flex flex-wrap gap-2 mb-4 relative z-10 self-start">
                             <div className="bg-white text-sage-600 text-xs font-bold uppercase tracking-widest py-1.5 px-3 rounded-full border border-sage-200">
                                 {offer.benefit}
                             </div>
                             {offer.isHit && (
                                <div className="bg-sage-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-3 rounded-full flex items-center shadow-md">
                                    <Star size={12} fill="currentColor" className="mr-1" /> ХИТ
                                </div>
                             )}
                         </div>
                         <h4 className="font-serif font-bold italic text-charcoal text-2xl mb-4 group-hover:text-sage-700 transition-colors z-10 leading-tight">{offer.title}</h4>
                         <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-8 flex-grow z-10">
                             {offer.desc}
                         </p>
                         <div className="flex items-end space-x-3 z-10 mt-auto pt-4 border-t border-sage-200/50">
                             <span className="text-gray-400 line-through font-montserrat text-lg decoration-sage-300/50 decoration-1 whitespace-nowrap">{offer.oldPrice}</span>
                             <span className="text-sage-700 font-bold text-3xl font-montserrat whitespace-nowrap">{offer.price}</span>
                         </div>
                         <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sage-200/20 rounded-full blur-2xl group-hover:bg-sage-200/30 transition-colors duration-500"></div>
                     </div>
                 ))}
             </div>
             <div className="mt-12 text-center">
                 <button 
                    onClick={onOpenContactModal}
                    className="bg-[#5B7360] text-white px-10 py-5 rounded-[12px] font-bold uppercase tracking-widest text-sm shadow-lg hover:bg-[#495C4D] transition-all hover:-translate-y-1 hover:shadow-xl"
                 >
                    Забронировать комплекс
                 </button>
             </div>
        </section>

        {/* Preparation Timeline Section */}
        <section className="scroll-mt-32 mb-24 md:mb-32">
             <div className="text-center mb-16">
                <h2 className="font-serif font-bold italic text-charcoal text-4xl md:text-5xl mb-4">Путь к идеальному результату</h2>
                <p className="font-montserrat text-gray-500 text-lg">Подготовка усиливает эффект от аппарата в 2 раза</p>
             </div>

             <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sage-200 -translate-x-1/2 md:translate-x-0"></div>

                {/* Step 1 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
                    <div className="pl-16 md:pl-0 md:pr-16 md:text-right">
                        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
                            <h3 className="font-serif italic text-sage-600 text-2xl mb-2">Этап 1. Пилинг</h3>
                            <p className="font-montserrat text-xs uppercase tracking-widest text-gray-400 mb-4">ЗА 2 НЕДЕЛИ ДО</p>
                            <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                                «Клининг» для кожи. Убираем ороговевший слой, чтобы свет проникал глубже и не рассеивался на поверхности.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-sage-500 text-white flex items-center justify-center font-serif font-medium text-xl border-4 border-[#FAFAF9] z-10 top-0 md:top-1/2 md:-translate-y-1/2">1</div>
                     <div className="hidden md:block"></div>
                </div>

                {/* Step 2 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
                     <div className="hidden md:block"></div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-sage-500 text-white flex items-center justify-center font-serif font-medium text-xl border-4 border-[#FAFAF9] z-10 top-0 md:top-1/2 md:-translate-y-1/2">2</div>
                    <div className="pl-16 md:pl-16">
                        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
                            <h3 className="font-serif italic text-sage-600 text-2xl mb-2">Этап 2. Биоревитализация</h3>
                            <p className="font-montserrat text-xs uppercase tracking-widest text-gray-400 mb-4">ЗА 10 ДНЕЙ ДО</p>
                            <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                                Если кожа «дефицитная» (сухая, тонкая, тусклая), ей просто не из чего будет строить новый коллаген в ответ на световую вспышку. Мезотерапия или биоревитализация насыщают ткани влагой, аминокислотами и витаминами.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="pl-16 md:pl-0 md:pr-16 md:text-right">
                        <div className="bg-sage-50 p-8 rounded-[30px] shadow-sm border border-sage-200 relative group hover:shadow-md transition-shadow">
                            <h3 className="font-serif italic text-sage-700 text-2xl mb-2">Этап 3. Аппаратная процедура</h3>
                            <p className="font-montserrat text-xs uppercase tracking-widest text-sage-500 mb-4">ДЕНЬ X</p>
                            <p className="font-montserrat text-gray-600 text-base leading-relaxed">
                                Напитанная кожа реагирует на импульс Capello гораздо активнее, и эффект омоложения становится в разы заметнее.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-sage-700 text-white flex items-center justify-center border-4 border-[#FAFAF9] z-10 top-0 md:top-1/2 md:-translate-y-1/2">
                        <Star size={20} fill="currentColor" />
                    </div>
                     <div className="hidden md:block"></div>
                </div>
             </div>
        </section>

        <section id="faq" className="pt-8 md:pt-10 border-t border-gray-100 scroll-mt-32">
             <div className="flex items-center justify-center space-x-3 mb-8">
                  <HelpCircle className="text-sage-500" size={28} />
                  <h4 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl text-center">Вопрос-ответ</h4>
             </div>
             <div className="space-y-2">
                 {hardwareFaqData.map((item, index) => (
                     <div key={index} className="border-b border-gray-100 py-6">
                         <div className="flex items-start gap-4 md:gap-6 cursor-pointer group" onClick={() => toggleFaq(index)}>
                             <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">{String(index + 1).padStart(2, '0')}</span>
                             <div className="flex-grow">
                                 <div className="flex justify-between items-start">
                                     <h3 className="font-montserrat font-medium text-gray-800 text-[15px] md:text-lg pr-8 group-hover:text-sage-600 transition-colors leading-tight">{item.q}</h3>
                                     <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>{openFaq === index ? <Minus size={20}/> : <Plus size={20}/>}</div>
                                 </div>
                                 <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                     <div className="font-montserrat text-gray-600 leading-relaxed text-base">{item.a}</div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>

             <div className="bg-[#5B7360] rounded-[30px] p-8 md:p-12 mt-20 relative overflow-hidden">
                <ShieldCheck className="absolute -right-10 -bottom-10 text-white/10 w-64 h-64 rotate-12 pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h4 className="font-serif font-bold italic text-white text-3xl md:text-4xl mb-6 leading-tight">Я не&nbsp;рискую <br/> вашим лицом</h4>
                        <p className="text-white text-base leading-relaxed font-montserrat">Аппаратная косметология обросла мифами об&nbsp;ожогах и&nbsp;рубцах. Эти страхи оправданы только в&nbsp;двух случаях: несертифицированное оборудование или отсутствие квалификации.</p>
                        <p className="text-white text-base leading-relaxed font-montserrat mt-4">В&nbsp;моем кабинете оба фактора исключены. Ваша безопасность для&nbsp;меня важнее, чем «быстрый» результат любой ценой.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[20px] border border-white/20">
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-start text-white"><Check className="w-5 h-5 mr-3 mt-0.5 text-[#FDE047] shrink-0" /><span className="text-sm md:text-base">Аппарат CAPELLO имеет <strong>Регистрационное удостоверение Минздрава РФ</strong>.</span></li>
                            <li className="flex items-start text-white"><Check className="w-5 h-5 mr-3 mt-0.5 text-[#FDE047] shrink-0" /><span className="text-sm md:text-base">Работаю строго по&nbsp;медицинским протоколам, без&nbsp;самодеятельности.</span></li>
                            <li className="flex items-start text-white"><Check className="w-5 h-5 mr-3 mt-0.5 text-[#FDE047] shrink-0" /><span className="text-sm md:text-base">Честно откажу в&nbsp;процедуре, если увижу противопоказания.</span></li>
                         </ul>
                         <button onClick={onOpenContactModal} className="w-full bg-white text-[#5B7360] hover:bg-stone-100 font-bold py-4 rounded-xl transition-all duration-300 shadow-lg uppercase tracking-wider text-sm">Записаться на консультацию</button>
                    </div>
                </div>
            </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} onOpenContactModal={onOpenContactModal} />
    </div>
  );
};

export default HardwareCosmetology;
