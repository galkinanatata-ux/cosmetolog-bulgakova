import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { BeforeAfterItem, BeforeAfterData } from '../types';

interface BeforeAfterProps {
  data?: BeforeAfterData;
}

// Default data (fallback)
const defaultTabs = [
  { id: 'pigment', label: 'Пигментация' },
  { id: 'couperose', label: 'Купероз' },
  { id: 'rejuvenation', label: 'Омоложение' },
  { id: 'acne', label: 'Акне' },
  { id: 'cleaning', label: 'Чистка' },
  { id: 'peeling', label: 'Пилинг' },
];

const defaultItems: BeforeAfterItem[] = [
  { id: 1, beforeImage: '/images/before-after/1-before.png', afterImage: '/images/before-after/1-after.png', tag: 'couperose', description: 'Удаление сосудистой сетки за 1-2 процедуры', details: 'Результат после 1 процедуры на аппарате Capello' },
  { id: 2, beforeImage: '/images/before-after/2-before.png', afterImage: '/images/before-after/2-after.png', tag: 'pigment', description: 'Работа с пигментацией: быстро и эффективно', details: 'Осветление пигмента после 1-й процедуры фотоомоложения на аппарате Capello' },
  { id: 3, beforeImage: '/images/before-after/3-before.png', afterImage: '/images/before-after/3-after.png', tag: 'acne', description: 'Лечение проблемной кожи (акне)', details: 'Результат комплексной терапии (4 месяца)' },
  { id: 4, beforeImage: '/images/before-after/4-before.png', afterImage: '/images/before-after/4-after.png', tag: 'cleaning', description: 'Комбинированная чистка лица', details: 'Результат сразу после одной процедуры' },
  { id: 5, beforeImage: '/images/before-after/5-before.png', afterImage: '/images/before-after/5-after.png', tag: 'rejuvenation', description: 'Плазмотерапия: естественное обновление кожи', details: 'Эффект уплотнения кожи и выравнивания тона после курса из 3 процедур' },
  { id: 6, beforeImage: '/images/before-after/6-before.png', afterImage: '/images/before-after/6-after.png', tag: 'couperose', description: 'Удаление сосудов на крыльях носа', details: 'Полное удаление сосудов после 1 процедуры коагуляции' },
  { id: 8, beforeImage: '/images/before-after/8-before.png', afterImage: '/images/before-after/8-after.png', tag: 'peeling', description: 'Пилинг: обновление кожи и сужение пор', details: 'Состояние кожи после 1-й процедуры пилинга BioRePeel' },
  { id: 10, beforeImage: '/images/before-after/10-before.png', afterImage: '/images/before-after/10-after.png', tag: 'peeling', description: 'Пилинг: ровный тон и сияние', details: 'Результат сразу после процедуры поверхностного пилинга' },
  { id: 11, beforeImage: '/images/before-after/11-before.png', afterImage: '/images/before-after/11-after.png', tag: 'cleaning', description: 'Комбинированная чистка лица', details: 'Результат сразу после процедуры' },
  { id: 12, beforeImage: '/images/before-after/12-before.png', afterImage: '/images/before-after/12-after.png', tag: 'acne', description: 'Комплексная терапия акне', details: 'Промежуточный результат лечения: без системных ретиноидов, только наружнее лечение и процедуры' },
  { id: 13, beforeImage: '/images/before-after/13-before.png', afterImage: '/images/before-after/13-after.png', tag: 'pigment', description: 'Фотоомоложение на аппарате Capello', details: 'Результат после 2-х процедур IPL-терапии' },
  { id: 14, beforeImage: '/images/before-after/14-before.png', afterImage: '/images/before-after/14-after.png', tag: 'rejuvenation', description: 'Фотоомоложение: выравнивание тона', details: 'Результат после 1 процедуры IPL-терапии с инъекционной подготовкой' },
];

const BeforeAfter: React.FC<BeforeAfterProps> = ({ data }) => {
  const tabs = data?.tabs || defaultTabs;
  const items = data?.items || defaultItems;
  const titleText = data?.title?.content || 'До и После';
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || 'pigment');
  const [startIndex, setStartIndex] = useState(0);
  const [tappedItem, setTappedItem] = useState<number | null>(null);

  const filteredItems = items.filter(item => item.tag === activeTab);
  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const isEndOfList = startIndex + 2 >= filteredItems.length;

  const switchToTab = (tabId: string, index: number = 0) => {
    setActiveTab(tabId);
    setStartIndex(index);
    setTappedItem(null);
  };

  const handleNext = () => {
    if (!isEndOfList) {
      setStartIndex(prev => prev + 2);
    } else {
      // Loop to next tab
      const nextIndex = (currentTabIndex + 1) % tabs.length;
      switchToTab(tabs[nextIndex].id, 0);
    }
    setTappedItem(null);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 2);
    } else {
      // Loop to previous tab
      const prevIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
      const prevTabId = tabs[prevIndex].id;
      const prevItems = items.filter(item => item.tag === prevTabId);
      // Go to the last page of the previous tab
      const lastIndex = prevItems.length > 0 ? Math.floor((prevItems.length - 1) / 2) * 2 : 0;
      
      switchToTab(prevTabId, lastIndex);
    }
    setTappedItem(null);
  };
  
  const handleItemClick = (id: number) => {
    if (window.innerWidth < 768) {
        setTappedItem(tappedItem === id ? null : id);
    }
  };

  const visibleItems = filteredItems.slice(startIndex, startIndex + 2);

  return (
    <section id="before-after" className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 lg:py-24 scroll-mt-28 md:scroll-mt-32">
      
      {/* Title Row with Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] mb-8 items-center">
        {/* Line in columns 1-3 */}
        <div className="hidden lg:block lg:col-start-1 lg:col-span-3">
             <div className="h-px bg-sage-500 w-full opacity-50"></div>
        </div>

        {/* Title starting at column 4 */}
        <div className="lg:col-start-4 lg:col-span-9">
            <h2 className="font-serif font-bold italic text-sage-500 text-3xl md:text-4xl leading-none">
                {titleText}
            </h2>
        </div>
      </div>

      {/* Custom Tabs - Mobile Adaptive */}
      
      {/* Mobile Wrapper */}
      <div className="md:hidden flex items-center gap-3 mb-6 -mx-4 px-4">
          <div className="flex overflow-x-auto gap-2 pb-1 snap-x no-scrollbar w-full">
             {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => switchToTab(tab.id, 0)}
                    className={`
                        flex-shrink-0 px-5 py-2.5 rounded-full border border-sage-200 text-sm font-medium transition-all duration-300 whitespace-nowrap snap-start
                        ${activeTab === tab.id 
                            ? 'bg-sage-500 text-white border-sage-500 shadow-md transform scale-105' 
                            : 'bg-white text-gray-500 hover:border-sage-400'
                        }
                    `}
                >
                    {tab.label}
                </button>
             ))}
          </div>
      </div>

      {/* Desktop Grid Tabs */}
      <div className="
        hidden md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-0 md:pb-0 md:mx-0 md:px-0 md:mb-12
        md:border-t md:border-b border-sage-200
      ">
        {tabs.map((tab, index) => (
             <button
                key={tab.id}
                onClick={() => switchToTab(tab.id, 0)}
                className={`
                    md:rounded-none md:border-0 md:border-r md:border-sage-300 md:shadow-none md:transform-none md:scale-100 md:bg-transparent
                    md:py-4 md:px-2 md:flex md:items-center md:justify-center md:w-auto md:text-center md:uppercase md:tracking-wider md:text-sm md:group md:relative
                    
                    ${index % 3 !== 2 ? 'md:border-r' : 'md:border-r-0'}
                    ${index !== tabs.length - 1 ? 'lg:border-r' : 'lg:border-r-0'}
                    ${activeTab === tab.id ? 'md:text-charcoal md:font-semibold md:bg-sage-50/50' : 'md:text-gray-400 md:hover:text-charcoal'}
                `}
            >
                <span className="mr-0 md:mr-2">{tab.label}</span>
                <div className={`hidden md:flex w-6 h-6 rounded-full bg-sage-500 items-center justify-center transition-all duration-300 transform ${activeTab === tab.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}>
                     <ArrowUpRight size={14} className="text-white" />
                </div>
            </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="relative flex items-center gap-4">
        {/* Left Arrow */}
        <button 
            onClick={handlePrev}
            className="hidden md:flex w-10 h-10 rounded-full border border-sage-500 text-sage-500 items-center justify-center transition-colors hover:bg-sage-50"
        >
            <ArrowLeft size={16} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:min-h-0 lg:min-h-[300px]">
            {visibleItems.length > 0 ? (
                visibleItems.map((item) => (
                    // Group container for hover effects
                    <div 
                        key={item.id} 
                        onClick={() => handleItemClick(item.id)}
                        className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 group cursor-pointer border border-gray-100 md:cursor-default"
                    >
                        {/* Images: Zoom on hover (desktop only) */}
                        <img 
                            src={item.beforeImage} 
                            alt="До" 
                            className="absolute left-0 top-0 w-1/2 h-full object-cover border-r border-white/20 transition-transform duration-700 md:group-hover:scale-110 origin-center"
                            loading="lazy"
                            decoding="async" 
                        />
                        <img 
                            src={item.afterImage} 
                            alt="После" 
                            className="absolute right-0 top-0 w-1/2 h-full object-cover transition-transform duration-700 md:group-hover:scale-110 origin-center"
                            loading="lazy"
                            decoding="async" 
                        />
                        
                        {/* Overlay Darkening: Hover on desktop, Tapped on mobile */}
                        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 pointer-events-none z-10 ${tappedItem === item.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
                        
                        {/* Tooltip Popup (Centered): Hover on desktop, Tapped on mobile */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-30 px-6 ${tappedItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'}`}>
                            <div className="bg-white/95 backdrop-blur-md text-charcoal p-5 rounded-xl shadow-2xl max-w-sm text-center border border-sage-100">
                                <p className="text-sm font-montserrat font-medium text-sage-700 leading-snug">
                                    {item.details}
                                </p>
                            </div>
                        </div>

                        {/* Labels: Always visible */}
                        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-20">До</div>
                        <div className="absolute top-4 right-4 bg-sage-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-20">После</div>

                        {/* Bottom Description (Hides on interaction) */}
                        <div className={`absolute bottom-4 left-4 right-4 text-center transition-opacity duration-300 z-20 ${tappedItem === item.id ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'}`}>
                            <span className="bg-white/90 backdrop-blur text-charcoal text-xs py-2 px-4 rounded-full shadow-sm inline-flex items-center gap-2">
                                {item.description}
                                <Info size={12} className="text-sage-500 md:hidden" />
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-1 md:col-span-2 flex items-center justify-center h-full min-h-[300px] text-gray-400 font-montserrat text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    В данной категории пока нет фото
                </div>
            )}
        </div>

        {/* Right Arrow */}
        <button 
            onClick={handleNext}
            className="hidden md:flex w-10 h-10 rounded-full bg-sage-500 text-white items-center justify-center transition-colors hover:bg-sage-600"
        >
            <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Mobile Pagination Dots */}
      {filteredItems.length > 2 && (
          <div className="md:hidden flex justify-center mt-4 gap-2">
              {Array.from({ length: Math.ceil(filteredItems.length / 2) }).map((_, idx) => (
                  <button
                    key={idx} 
                    onClick={() => setStartIndex(idx * 2)}
                    className={`w-2 h-2 rounded-full transition-colors ${Math.floor(startIndex / 2) === idx ? 'bg-sage-500' : 'bg-gray-300'}`}
                  />
              ))}
          </div>
      )}

      {/* Footer Text */}
      <div className="mt-8 md:mt-4 lg:mt-8 text-center">
          <p className="text-gray-500 font-montserrat text-sm italic">
              Больше До и После в разделе <a href="#services" className="text-sage-500 hover:text-sage-600 transition-colors">Мои услуги и цены</a>
          </p>
      </div>

    </section>
  );
};

export default BeforeAfter;
