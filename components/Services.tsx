
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, HelpCircle, Zap, Plus, Minus } from 'lucide-react';
import { ServiceItem, ServicesSection } from '../types';

interface ServicesProps {
  onNavigate?: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  onOpenContactModal?: () => void;
  config: ServicesSection;
}

const elosFaqData = [
  {
    question: 'Как подготовиться',
    answer: (
        <ul className="list-disc pl-5 space-y-1">
            <li>За 2-4 недели перестаньте удалять волосы воском, эпилятором или другими способами;</li>
            <li>За 2 недели до процедуры откажитесь от посещения пляжа и солярия;</li>
            <li>За 1-2 дня до процедуры сбрейте волосы станком;</li>
            <li>Перед процедурой очистите кожу от дезодоранта, тонального крема и остальных косметических средств;</li>
        </ul>
    )
  },
  {
    question: 'Что делать после процедуры',
    answer: (
        <ul className="list-disc pl-5 space-y-1">
            <li>На 24 часа откажитесь от спортзала, сауны и горячей ванны;</li>
            <li>2 недели после эпиляции не загорайте;</li>
            <li>Пару дней до и после процедуры не используйте скрабы, пилинги и мочалки;</li>
            <li>Остатки волосков не брейте, скоро они сами выпадут;</li>
            <li>Используйте кремы с SPF.</li>
        </ul>
    )
  },
  {
    question: 'Сколько сеансов потребуется',
    answer: 'В зависимости от типа кожи и цвета волос — от 8 до 12 процедур с интервалом 21-30 дней.'
  },
  {
    question: 'Волосы исчезнут навсегда?',
    answer: 'Аппарат разрушает корешок волоса, но он все равно может вырасти заново, поэтому раз в 3-6 месяцев (этот период индивидуален) нужно делать поддерживающую процедуру.'
  },
  {
    question: 'Когда появится эффект',
    answer: 'После процедуры фолликулы в обработанной зоне начинают разрушаться и волоски выпадают в течение 2-14 дней. Воздействие происходит только на волоски в фазе роста. Волоски в фазе «сна» удаляются в ходе последующих сеансов.'
  },
  {
    question: 'Сколько длится процедура',
    answer: 'Длительность процедуры зависит от зоны. Чтобы проэпилировать ноги полностью, потребуется 15-20 минут, а верхнюю губу — 3-5 минут.'
  }
];

const Services: React.FC<ServicesProps> = ({ onNavigate, onOpenContactModal, config }) => {
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);
  const [openElosFaq, setOpenElosFaq] = useState<number | null>(0);
  const { data } = config;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeServiceId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeServiceId]);

  const toggleElosFaq = (index: number) => {
    setOpenElosFaq(openElosFaq === index ? null : index);
  };

  const leftColumnServices = [data.items[0], data.items[2]];
  const rightColumnServices = [data.items[1], data.items[3]];

  const handleServiceClick = (item: ServiceItem) => {
    if (item.link === 'modal') {
      setActiveServiceId(item.id);
    } else if (onNavigate && item.link) {
      onNavigate(item.link as any);
    }
  };

  const renderServiceCard = (service: ServiceItem, isMobile: boolean = false) => {
    const desktopClasses = `${service.height} ${service.borderRadius}`;
    const mobileClasses = `h-[180px] rounded-[20px]`; 
    
    // Logic to set text position:
    // ID 1 (Hardware) & 2 (Esthetic) -> TOP
    // ID 3 (Elos) & 4 (Injection) -> BOTTOM
    let positionClass = '';
    if (service.id === 1 || service.id === 2) {
        positionClass = 'top-8 left-8';
    } else {
        positionClass = 'bottom-8 left-8';
    }
    
    const mobileOverlay = (
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4">
            <span className="text-white font-montserrat font-semibold text-sm leading-tight mb-2">
                {service.title}
            </span>
             <div className="bg-sage-500 group-active:bg-sage-700 transition-colors duration-200 w-8 h-8 rounded-full flex items-center justify-center text-white">
                 <ArrowUpRight size={16} />
             </div>
        </div>
    );

    const desktopOverlay = (
        <div className={`absolute ${positionClass} group/btn bg-white py-4 px-6 rounded-[10px] flex items-center justify-between gap-6 shadow-lg max-w-[85%] overflow-hidden isolate transition-transform duration-300 hover:scale-[1.02]`}>
           <div className="absolute inset-0 bg-sage-500 w-0 group-hover/btn:w-full transition-all duration-500 ease-out left-0"></div>
           <span className={`text-charcoal font-medium text-base leading-tight max-w-[120px] transition-colors duration-300 relative z-10 group-hover/btn:text-white`}>
             {service.title}
           </span>
           <div className="bg-sage-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover/btn:bg-white group-hover/btn:text-sage-500 transition-colors duration-300 relative z-10">
              <ArrowUpRight size={20} />
           </div>
        </div>
    );

    return (
      <div 
        key={service.id} 
        onClick={() => handleServiceClick(service)}
        className={`group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full ${isMobile ? mobileClasses : desktopClasses} cursor-pointer bg-gray-100 active:scale-[0.98] duration-200`}
      >
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-gray-200"
          loading="lazy"
          decoding="async"
          width="600"
          height="400"
        />
        {isMobile ? mobileOverlay : desktopOverlay}
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 relative py-12 md:py-20 lg:py-24">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] mb-8 md:mb-12 items-center">
        <div className="hidden lg:block lg:col-start-1 lg:col-span-3">
             <div className="h-px bg-sage-500 w-full opacity-50"></div>
        </div>
        <div className="lg:col-start-4 lg:col-span-9">
            <h2 className="font-serif font-bold italic text-sage-500 text-3xl md:text-4xl leading-none tracking-tight">
                {data.title}
            </h2>
        </div>
      </div>

      {/* Mobile Grid Layout (2 columns) */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
          {data.items.map(service => renderServiceCard(service, true))}
      </div>

      {/* Desktop Masonry Layout */}
      <div className="hidden md:flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-6 md:gap-8">
            {leftColumnServices.map(s => renderServiceCard(s, false))}
        </div>
        <div className="flex-1 flex flex-col gap-6 md:gap-8">
            {rightColumnServices.map(s => renderServiceCard(s, false))}
        </div>
      </div>

      {/* ELOS EPILATION MODAL */}
      {activeServiceId === 3 && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-8">
           <div 
               className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
               onClick={() => setActiveServiceId(null)}
           ></div>

           <div className="bg-white w-full max-w-4xl h-[85vh] sm:h-auto sm:max-h-[90vh] flex flex-col relative z-10 shadow-2xl animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 overflow-hidden rounded-t-[30px] sm:rounded-[30px] border-t sm:border border-gray-100">
               
               {/* Mobile Drag Handle */}
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2 sm:hidden shrink-0"></div>

               <div className="flex-none p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                   <h3 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl tracking-tight">Элос-эпиляция</h3>
                   <button 
                       onClick={() => setActiveServiceId(null)}
                       className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors hidden sm:block"
                   >
                       <X size={24} />
                   </button>
                   {/* Mobile Close Button */}
                   <button 
                       onClick={() => setActiveServiceId(null)}
                       className="sm:hidden bg-gray-100 text-gray-500 p-2 rounded-full"
                   >
                       <X size={20} />
                   </button>
               </div>

               <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar overscroll-contain pb-24 sm:pb-10">
                   
                   <div className="space-y-6 mb-10 max-w-3xl">
                       <p className="font-montserrat text-gray-600 leading-relaxed text-base">
                          <span className="font-semibold text-sage-600">E-light эпиляция</span> — это удаление волос при помощи разрушения волосяных фолликулов электрооптическим методом. Забудьте о бритве, воске, шугаринге, эпиляторах! А вместе с ними о боли, раздражении, вросших волосках и бесконечной борьбе с нежелательными волосами на лице и теле.
                       </p>
                       <div className="bg-sage-50 p-5 rounded-xl flex gap-4 items-start shadow-sm border border-sage-200">
                           <Zap className="text-sage-500 shrink-0 mt-1" size={24} />
                           <p className="text-base text-gray-700 leading-relaxed">
                             Аппарат <span className="font-bold text-sage-700">Capello</span> имеет качественную систему охлаждения, поэтому все, что вы почувствуете, — лишь приятная прохлада и легкое покалывание.
                           </p>
                       </div>
                   </div>

                   {/* Before and After Block */}
                   <div className="mb-12">
                       <h4 className="font-serif font-bold italic text-sage-600 text-xl mb-4">До и После</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="relative rounded-[20px] overflow-hidden shadow-md group bg-gray-100 h-[250px] md:h-[300px]">
                                <img
                                    src="/images/services/1.png" 
                                    alt="До процедуры эпиляции"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="eager" 
                                    decoding="async"
                                />
                                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    До
                                </div>
                           </div>
                           <div className="relative rounded-[20px] overflow-hidden shadow-md group bg-gray-100 h-[250px] md:h-[300px]">
                                <img
                                    src="/images/services/2.png" 
                                    alt="После процедуры эпиляции"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="eager" 
                                    decoding="async"
                                />
                                <div className="absolute top-4 left-4 bg-sage-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    После
                                </div>
                           </div>
                       </div>
                       <div className="mt-4 text-center">
                            <p className="font-serif italic text-sage-600 text-lg font-medium">
                                гладкая ровная кожа без вросших волос и воспалений!
                            </p>
                       </div>
                   </div>

                   <div className="mb-12">
                       <h3 className="font-serif text-2xl text-charcoal mb-6 border-l-4 border-sage-500 pl-4">Стоимость</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           
                           {/* Single Zones */}
                           <div>
                               <h4 className="font-montserrat font-bold text-sage-600 uppercase text-xs tracking-widest mb-4">Отдельные зоны</h4>
                               <ul className="space-y-3">
                                   {[
                                       { name: 'Верхняя губа', price: '500 ₽' },
                                       { name: 'Подмышки', price: '1 000 ₽' },
                                       { name: 'Руки до локтя', price: '1 500 ₽' },
                                       { name: 'Линия живота', price: '1 000 ₽' },
                                       { name: 'Бикини классическое / глубокое', price: '2 000 ₽ / 2 500 ₽' },
                                       { name: 'Ноги голени / полностью', price: '1 500 ₽ / 2 500 ₽' },
                                   ].map((item, i) => (
                                       <li key={i} className="flex justify-between items-end border-b border-gray-100 pb-2 border-dotted">
                                           <span className="text-gray-700 text-base">{item.name}</span>
                                           <span className="font-bold text-sage-600 whitespace-nowrap ml-2 text-base">{item.price}</span>
                                       </li>
                                   ))}
                               </ul>
                           </div>

                           {/* Complexes */}
                           <div>
                               <h4 className="font-montserrat font-bold text-sage-600 uppercase text-xs tracking-widest mb-4">Комплексы</h4>
                               <ul className="space-y-4">
                                   {[
                                       { name: 'Подмышки + голени', price: '2 000 ₽' },
                                       { name: 'Подмышки + голени + бикини классическое / глубокое', price: '2 500 ₽ / 3 000 ₽' },
                                       { name: 'Подмышки + ноги полностью + бикини классическое / глубокое', price: '3 500 ₽ / 4 000 ₽' },
                                   ].map((item, i) => (
                                       <li key={i} className="flex flex-col border-b border-gray-100 pb-3 border-dotted">
                                           <span className="text-gray-700 text-base mb-1">{item.name}</span>
                                           <span className="font-bold text-sage-600 text-lg self-end whitespace-nowrap">{item.price}</span>
                                       </li>
                                   ))}
                               </ul>

                               <div className="mt-8">
                                   <button 
                                       onClick={onOpenContactModal}
                                       className="w-full bg-[#D9D9D9] border-2 border-dotted border-sage-400 text-sage-600 hover:bg-sage-500 hover:text-white hover:border-transparent px-6 py-4 rounded-[10px] text-sm font-semibold transition-all duration-300 font-montserrat uppercase tracking-wider"
                                   >
                                       Записаться на процедуру
                                   </button>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Q&A */}
                   <div className="border-t border-gray-100 pt-10">
                       <div className="flex items-center justify-center space-x-3 mb-8">
                            <HelpCircle className="text-sage-500" size={28} />
                            <h4 className="font-serif font-bold italic text-sage-600 text-2xl md:text-3xl text-center">
                                Вопрос-ответ
                            </h4>
                       </div>
                       <div className="space-y-2">
                           {elosFaqData.map((item, index) => (
                               <div key={index} className="border-b border-gray-100 py-6">
                                   <div 
                                       className="flex items-start gap-4 md:gap-6 cursor-pointer group"
                                       onClick={() => toggleElosFaq(index)}
                                   >
                                       <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-montserrat font-medium text-gray-800 text-[15px] md:text-lg pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                                    {item.question}
                                                </h3>
                                                <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${openElosFaq === index ? 'rotate-180' : ''}`}>
                                                    {openElosFaq === index ? <Minus size={20}/> : <Plus size={20}/>}
                                                </div>
                                            </div>
                                            <div className={`overflow-hidden transition-all duration-300 ${openElosFaq === index ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                <div className="font-montserrat text-gray-600 leading-relaxed text-base">
                                                    {item.answer}
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
        </div>
      )}

    </div>
  );
};

export default Services;
