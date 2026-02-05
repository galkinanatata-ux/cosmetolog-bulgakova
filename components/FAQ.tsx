import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQData, FAQItem } from '../types';

interface FAQProps {
  data?: FAQData;
}

// Default data (fallback)
const defaultFaqData: FAQItem[] = [
  { id: 5, question: 'Есть ли смысл идти к косметологу в 45+? Или лучше сразу к пластическому хирургу?', answer: 'Хирургия работает с геометрией (натяжение тканей), но не с качеством. Можно натянуть кожу, но если она тонкая, с пигментом и без сияния — эффекта молодости не будет.' },
  { id: 2, question: 'А если у меня будет аллергия или лицо покроется пятнами?', answer: 'Безопасность — мой главный приоритет. Перед любой процедурой мы проводим подробный сбор анамнеза.' },
  { id: 3, question: 'Боюсь стать похожей на «надутую куклу» с лицом-маской. Делаете ли вы такие процедуры?', answer: 'Мой подход — физиологичное омоложение. Я против гиперкоррекции.' },
  { id: 4, question: 'У меня много дорогой косметики дома, зачем мне ваши салонные процедуры?', answer: 'Домашний уход — это поддержка (около 70% успеха), а кабинетные процедуры — это «тяжелая артиллерия».' },
  { id: 1, question: 'Я могу купить профессиональный пилинг на маркетплейсе и сделать его сама. Зачем идти к вам?', answer: 'Это один из самых опасных мифов.' },
];

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const titleText = data?.title?.content || 'Часто задаваемые вопросы';
  const faqData = data?.items || defaultFaqData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 lg:py-24 scroll-mt-28 md:scroll-mt-32">
      
      {/* Title Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] mb-12 items-center">
        {/* Line */}
        <div className="hidden lg:block lg:col-start-1 lg:col-span-3">
             <div className="h-px bg-sage-500 w-full opacity-50"></div>
        </div>

        {/* Title */}
        <div className="lg:col-start-4 lg:col-span-9">
            <h2 className="font-serif font-bold italic text-sage-500 text-3xl md:text-4xl leading-none tracking-tight">
                {titleText}
            </h2>
        </div>
      </div>

      {/* Accordion Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px]">
        {/* Empty left column to align with content grid */}
        <div className="hidden lg:block lg:col-span-3"></div>

        {/* FAQ List */}
        <div className="lg:col-span-9 space-y-2">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
               <div key={item.id} className="border-b border-gray-100 py-6">
                 <div 
                     className="flex items-start gap-4 md:gap-6 cursor-pointer group"
                     onClick={() => toggleAccordion(index)}
                 >
                     <span className="font-serif italic text-3xl md:text-4xl text-sage-200 group-hover:text-sage-400 transition-colors shrink-0 leading-none mt-1 select-none">
                         {String(index + 1).padStart(2, '0')}
                     </span>
                     <div className="flex-grow">
                         <div className="flex justify-between items-start">
                             <h3 className="font-montserrat font-medium text-gray-800 text-[15px] md:text-lg pr-8 group-hover:text-sage-600 transition-colors leading-tight">
                                 {item.question}
                             </h3>
                             <div className={`text-sage-500 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                 {isOpen ? <Minus size={20}/> : <Plus size={20}/>}
                             </div>
                         </div>
                         <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                             <div className="font-montserrat text-gray-500 leading-relaxed text-base max-w-prose">
                                <p className="whitespace-pre-line">{item.answer}</p>
                             </div>
                         </div>
                     </div>
                 </div>
               </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default FAQ;
