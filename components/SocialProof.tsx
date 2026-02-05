import React from 'react';
import { SocialProofData } from '../types';

interface SocialProofProps {
  data?: SocialProofData;
}

const SocialProof: React.FC<SocialProofProps> = ({ data }) => {
  // Fallback data if not provided from config
  const items = data?.items || [
    { id: 1, value: 'АГМУ', label: 'образование' },
    { id: 2, value: '6+', label: 'лет в косметологии' },
    { id: 3, value: '85%', label: 'пациентов рекомендуют меня своим близким' },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 my-12 md:my-0 md:mb-20 lg:mb-24">
      <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm border border-gray-100 overflow-hidden">

        {/* Mobile: Horizontal Carousel (Snap Scroll). Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-12 md:gap-y-0 md:gap-x-[30px] md:divide-y-0 no-scrollbar">

            {items.map((item, index) => (
              <div
                key={item.id}
                className="snap-center shrink-0 w-[240px] md:w-auto md:col-span-4 flex flex-col items-center justify-center text-center p-6 md:p-0 relative bg-sage-50 md:bg-transparent rounded-2xl md:rounded-none border border-sage-100 md:border-0"
              >
                <h3 className="text-3xl md:text-4xl text-sage-500 font-serif mb-2 whitespace-nowrap">
                  {item.value}
                </h3>
                <p className="text-gray-500 text-sm font-montserrat max-w-[200px] leading-tight">
                  {item.label}
                </p>
                {/* Desktop Separator */}
                {index < items.length - 1 && (
                  <div className="hidden md:block absolute -right-[15px] top-0 bottom-0 w-px bg-sage-200"></div>
                )}
              </div>
            ))}

        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex justify-center gap-1 mt-2">
            <div className="w-1 h-1 rounded-full bg-sage-300"></div>
            <div className="w-1 h-1 rounded-full bg-sage-200"></div>
            <div className="w-1 h-1 rounded-full bg-sage-100"></div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
