import React, { useState } from 'react';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { ReviewsData, ReviewItem, ReviewScreenshot } from '../types';

interface ReviewsProps {
  data?: ReviewsData;
}

// Layout configuration for the 3 visible phone slots on desktop
const layoutSlots = [
    {
        rotate: '-rotate-6',
        zIndex: 'z-10',
        position: 'top-0 left-10 md:left-20',
    },
    {
        rotate: 'rotate-3',
        zIndex: 'z-20',
        position: 'top-32 right-4 md:right-10',
    },
    {
        rotate: '-rotate-3',
        zIndex: 'z-30',
        position: 'bottom-10 left-4 md:left-24',
    }
];

// Default data (fallback)
const defaultTextReviews: ReviewItem[] = [
  { id: 1, name: 'Марина А.', procedure: 'Плазмотерапия', text: 'Я в\u00A0очередной раз в\u00A0восторге от\u00A0действия плазмолифтинга!', rating: 5 },
  { id: 2, name: 'Татьяна Ч.', procedure: '1 процедура биоревитализации + 1 процедура IPL-терапии', text: 'Такой классный результат от\u00A0фотоомоложения!', rating: 5 },
];

const defaultScreenshots: ReviewScreenshot[] = [
  { id: 1, src: '/images/reviews/1.png' },
  { id: 2, src: '/images/reviews/2.png' },
  { id: 3, src: '/images/reviews/3.png' },
];

const Reviews: React.FC<ReviewsProps> = ({ data }) => {
  const titleText = data?.title?.content || 'Отзывы моих пациентов';
  const subtitle = data?.subtitle || 'Ваши слова — моё вдохновение';
  const textReviews = data?.textReviews || defaultTextReviews;
  const screenshots = data?.screenshots || defaultScreenshots;
  // Initialize state with shuffled array immediately to avoid "null" render delay
  const [shuffledScreenshots] = useState(() => [...screenshots].sort(() => 0.5 - Math.random()));
  const [activeIndex, setActiveIndex] = useState(0);

  const nextBatch = () => {
    // Advance by 3 to show a completely new set
    setActiveIndex((prev) => (prev + 3) % shuffledScreenshots.length);
  };

  const prevBatch = () => {
    // Go back by 3
    setActiveIndex((prev) => (prev - 3 + shuffledScreenshots.length) % shuffledScreenshots.length);
  };

  return (
    <section id="reviews" className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 lg:py-24 relative overflow-hidden scroll-mt-28 md:scroll-mt-32">
      
      {/* Title Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] mb-12 items-center">
        {/* Line */}
        <div className="hidden lg:block lg:col-start-1 lg:col-span-3">
             <div className="h-px bg-sage-500 w-full opacity-50"></div>
        </div>

        {/* Title */}
        <div className="lg:col-start-4 lg:col-span-9 flex justify-between items-end">
            <div>
                 <h2 className="font-serif font-bold italic text-sage-500 text-3xl md:text-4xl leading-none mb-2">
                    {titleText}
                </h2>
                <p className="font-montserrat text-gray-500 text-base italic">
                    {subtitle}
                </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 text-sage-300">
                 <div className="flex space-x-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <span className="font-montserrat text-sm font-medium">5.0</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Text Reviews - Hidden on Mobile */}
        <div className="hidden lg:flex flex-col gap-6">
            {textReviews.map((review) => (
              <div key={review.id} className="relative group cursor-default">
                 <div className="bg-white rounded-tl-[30px] rounded-br-[30px] rounded-tr-[4px] rounded-bl-[4px] p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative z-10 hover:z-20">
                    
                    <div className="absolute top-4 right-6 text-sage-100 font-serif text-[80px] leading-none opacity-50 pointer-events-none group-hover:text-sage-200 transition-colors">
                        ”
                    </div>

                    <div className="flex space-x-1 mb-4 text-sage-400">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                        ))}
                    </div>

                    <p className="font-montserrat text-gray-600 text-base leading-relaxed mb-6 relative z-10">
                        {review.text}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                             <div className="font-annabelle text-2xl text-sage-600 mb-1 pr-4">
                                {review.name}
                             </div>
                             <div className="text-[10px] uppercase tracking-wider text-gray-400">
                                {review.procedure}
                             </div>
                        </div>
                        {review.date && (
                            <div className="text-gray-300 text-xs font-montserrat">
                                {review.date}
                            </div>
                        )}
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-sage-50 rounded-tl-[30px] rounded-br-[30px] rounded-tr-[4px] rounded-bl-[4px] transform translate-x-2 translate-y-2 -z-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            ))}
        </div>

        {/* Right Column: Chaotic Screenshots with Carousel Logic (Desktop) */}
        <div className="relative min-h-[500px] h-full w-full hidden lg:block">
            {/* Background Circle Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sage-100/50 rounded-full blur-3xl -z-10"></div>
            
            {/* Visible Phones Slots */}
            {layoutSlots.map((slot, index) => {
                // Calculate which image to show in this slot based on activeIndex
                const imageIndex = (activeIndex + index) % shuffledScreenshots.length;
                const image = shuffledScreenshots[imageIndex];

                return (
                    <div 
                        key={`slot-${index}`} 
                        className={`
                            absolute w-[240px] aspect-[9/16] transition-all duration-500 ease-out cursor-pointer origin-center
                            ${slot.position} ${slot.rotate} ${slot.zIndex} 
                            hover:z-50 hover:scale-[1.15] hover:rotate-0
                        `}
                    >
                        <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-xl border-4 border-white bg-white transition-all duration-500">
                            {/* Fake Phone Header */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 z-10 flex items-center justify-center space-x-1">
                                <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                            
                            <img 
                                src={image.src} 
                                alt={`Отзыв ${image.id}`} 
                                className="w-full h-full object-cover bg-gray-200"
                                loading="eager" // Load visible desktop images eagerly to prevent pop-in
                                decoding="async"
                                width="240"
                                height="426"
                            />
                        </div>
                    </div>
                );
            })}

            {/* Carousel Controls */}
            <div className="absolute bottom-0 right-0 z-40 flex items-center space-x-4">
                 <button 
                    onClick={prevBatch}
                    className="w-12 h-12 rounded-full border border-sage-500 text-sage-500 flex items-center justify-center hover:bg-sage-500 hover:text-white transition-all duration-300 shadow-sm"
                 >
                    <ArrowLeft size={20} />
                 </button>
                 <button 
                    onClick={nextBatch}
                    className="w-12 h-12 rounded-full bg-sage-500 text-white flex items-center justify-center hover:bg-sage-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                 >
                    <ArrowRight size={20} />
                 </button>
            </div>
        </div>
        
        {/* Mobile View for Screenshots (Horizontal Scroll - All Screenshots) */}
        <div className="lg:hidden flex overflow-x-auto pb-8 gap-4 snap-x snap-mandatory px-6 md:px-0">
             {shuffledScreenshots.map((screen, index) => (
                <div 
                    key={screen.id} 
                    className="snap-center shrink-0 w-[80vw] sm:w-[350px] aspect-[9/16] rounded-[20px] overflow-hidden shadow-md border-4 border-white bg-gray-100 relative transition-all duration-300 active:scale-[1.02] origin-center"
                >
                     <img 
                            src={screen.src} 
                            alt="Отзыв клиента" 
                            className="w-full h-full object-cover bg-gray-200"
                            loading={index < 2 ? "eager" : "lazy"} // Eager load only the first two visible on mobile
                            decoding="async"
                            width="350"
                            height="622"
                        />
                </div>
             ))}
        </div>

      </div>

    </section>
  );
};

export default Reviews;
