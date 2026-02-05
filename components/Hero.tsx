
import React from 'react';
import { HeroSection } from '../types';

interface HeroProps {
  onOpenContactModal?: () => void;
  config: HeroSection;
}

const Hero: React.FC<HeroProps> = ({ onOpenContactModal, config }) => {
  const { data } = config;

  return (
    <section className="max-w-[1200px] mx-auto px-4 relative">
      
      {/* --- MOBILE VERSION (Visible only on small screens < 768px) --- */}
      <div className="md:hidden flex flex-col pt-4 pb-12">
        
        {/* 1. Headings */}
        <div className="mb-8">
            <h1 className="font-serif italic text-[34px] leading-[1.15] mb-4">
                <span className="text-sage-500 font-normal">Естественность —</span>
                <br />
                <span className="text-charcoal font-bold">главный тренд 2026</span>
            </h1>
            <div className="border-l-2 border-sage-500 pl-4 py-1">
                <p className="font-montserrat text-gray-700 text-base font-light leading-snug max-w-[95%]">
                    {data.subHeading}
                </p>
            </div>
        </div>

        {/* 2. Main Procedure Image - LCP Candidate on Mobile */}
        <div className="w-full rounded-[30px] overflow-hidden aspect-[4/3] mb-6 shadow-sm bg-sage-50">
             <img 
                src={data.procedurePhoto} 
                alt="Процедура" 
                className="w-full h-full object-cover object-[10%_center]"
                loading="eager"
                fetchPriority="high"
                width="800"
                height="600"
             />
        </div>

        {/* 3. Green Block (First part of badgeText) */}
        <div className="bg-sage-500 rounded-[20px] p-6 text-white mb-8 shadow-md">
             <p className="font-montserrat text-[15px] leading-relaxed font-light opacity-95">
                 <span dangerouslySetInnerHTML={{ __html: data.badgeText[0] }} />
             </p>
        </div>

        {/* 4. Portrait & Text Columns - Styled to match screenshot */}
        <div className="flex gap-5 items-start">
             
             {/* Left Column: Photo & Name */}
             <div className="flex flex-col items-center w-[110px] shrink-0">
                 {/* Added aspect ratio to container */}
                 <div className="w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-gray-100 shadow-sm mb-3">
                      <img
                        src={data.photo}
                        alt={data.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                        width="300"
                        height="400"
                      />
                 </div>
                 <p className="font-serif italic text-charcoal text-[13px] text-center leading-tight">
                    Косметолог<br/>Булгакова<br/>Светлана
                 </p>
             </div>

             {/* Right Column: Texts */}
             <div className="flex flex-col gap-5 pt-1">
                 <div className="font-montserrat text-charcoal text-base leading-[1.4] font-normal">
                     Порекомендую только те процедуры, которые будут эффективны именно в вашем случае.
                 </div>
                 
                 {/* Text with green vertical line */}
                 <div className="font-montserrat text-charcoal text-base leading-[1.4] border-l-2 border-sage-500 pl-4 py-1">
                     <span dangerouslySetInnerHTML={{ __html: 'Вы получите чёткое понимание: <span class="font-bold">что, <br/>как и главное почему <br/>мы будем делать.</span>' }} />
                 </div>
             </div>
        </div>

      </div>

      {/* --- TABLET VERSION (Visible only on md screens 768px - 1023px) --- */}
      <div className="hidden md:flex lg:hidden flex-col pt-0 pb-16">
        
        {/* Headings - Shifted up by 50px as requested */}
        <div className="mb-8 relative -mt-[50px]">
            <h1 className="font-serif italic text-[42px] leading-[1.1] mb-6 font-bold">
                <span className="text-sage-500">Естественность —</span>
                <br />
                {/* Moved up by 10px to reduce gap */}
                <span className="text-charcoal block text-right -mt-[10px]">главный тренд 2026</span>
            </h1>
            {/* Added mt-[30px] to move subheading down */}
            <div className="flex items-start pl-1 mt-[30px]">
                <div className="w-0.5 bg-sage-400 h-6 mr-4 mt-1.5"></div>
                <p className="font-montserrat text-gray-700 text-lg leading-relaxed whitespace-nowrap w-full">
                    {data.subHeading}
                </p>
            </div>
        </div>

        {/* Main Procedure Image - Less cropped vertically (height increased to 360px) */}
        <div className="w-full rounded-[40px] overflow-hidden h-[360px] shadow-md bg-sage-50 mb-10">
             <img 
                src={data.procedurePhoto} 
                alt="Процедура" 
                className="w-full h-full object-cover object-center"
                loading="eager"
                width="800"
                height="360"
             />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
            
             {/* Left Column: Photo */}
             <div className="col-span-5">
                 <div className="w-full aspect-[3/4] rounded-[30px] overflow-hidden bg-gray-100 shadow-md">
                      <img 
                        src={data.photo} 
                        alt={data.name} 
                        className="w-full h-full object-cover object-top"
                        width="400"
                        height="533"
                      />
                 </div>
             </div>

             {/* Right Column: Content */}
             <div className="col-span-7 flex flex-col gap-6">
                 {/* Name aligned with top of photo and centered relative to block */}
                 <p className="font-montserrat text-charcoal text-lg font-medium text-center w-full -mt-1.5">
                    Косметолог Булгакова Светлана
                 </p>
                 
                 <div className="bg-sage-500 rounded-[30px] p-8 text-white shadow-md">
                     <div className="font-montserrat text-[15px] leading-relaxed font-light opacity-95 flex flex-col gap-4">
                        <div dangerouslySetInnerHTML={{ __html: data.badgeText[0] }} />
                        <div className="border-t border-white/20 pt-4" dangerouslySetInnerHTML={{ __html: data.badgeText[1] }} />
                     </div>
                 </div>
                 
                 {/* Button centered and normal size - Changed font-bold to font-medium */}
                 <button 
                    onClick={onOpenContactModal}
                    className="self-center w-auto bg-[#D9D9D9] border-2 border-dotted border-sage-400 text-sage-700 hover:bg-white hover:border-sage-500 hover:text-sage-800 px-8 py-4 rounded-[20px] text-base font-medium transition-all uppercase tracking-wider shadow-sm hover:shadow-md font-montserrat"
                >
                    {data.buttonText}
                </button>
             </div>
        </div>

      </div>

      {/* --- DESKTOP VERSION (Visible only on lg+ screens 1024px+) --- */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[30px] items-end">
        
        {/* --- LEFT STACK (Cols 1-6) --- */}
        <div className="lg:col-start-1 lg:col-span-6 flex flex-col items-end w-full order-2 lg:order-1">
            
            {/* Top Group: Photo + Name/Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-[30px] w-full mb-6 md:mb-[30px]">
                
                {/* Photo - Priority High on Desktop */}
                <div className="relative rounded-[24px] md:rounded-[30px] overflow-hidden shadow-xl shrink-0 w-full h-[320px] sm:h-[397px] bg-sage-100 order-1">
                    <img 
                      src={data.photo} 
                      alt={data.name} 
                      className="w-full h-full object-cover object-center"
                      width="600"
                      height="800"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                    />
                </div>

                {/* Name & Button */}
                <div className="flex flex-col justify-between h-auto sm:h-[397px] gap-4 sm:gap-0 order-2">
                    {/* Name - Aligned to top with negative margin */}
                    <h2 className="text-charcoal font-normal font-montserrat text-xl lg:text-xl leading-snug whitespace-nowrap overflow-visible -mt-1.5">
                       {data.name}
                    </h2>
                    
                    {/* Button - Hidden on mobile if Sticky Bar is present */}
                    <button 
                        onClick={onOpenContactModal}
                        className="w-full bg-[#D9D9D9] border-2 border-dotted border-sage-400 text-sage-700 hover:bg-white hover:border-sage-500 hover:text-sage-800 px-4 py-4 rounded-[10px] text-sm font-semibold transition-all duration-300 cursor-pointer text-center font-montserrat tracking-tight hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap hidden sm:block"
                    >
                        {data.buttonText}
                    </button>
                </div>
            </div>

            {/* Green Badge Block */}
            <div className="bg-sage-500 rounded-[20px] md:rounded-[10px] p-5 md:p-6 text-white shadow-lg flex items-center shrink-0 w-full mb-8 lg:mb-0">
                <div className="font-montserrat text-sm md:text-base font-normal opacity-95 leading-relaxed text-left">
                  {data.badgeText.map((text, index) => (
                    <p 
                      key={index} 
                      className={index < data.badgeText.length - 1 ? "mb-2" : ""}
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ))}
                </div>
            </div>
        </div>


        {/* --- RIGHT STACK (Cols 7-12) --- */}
        <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-end w-full relative order-1 lg:order-2 mb-2 lg:mb-0">
            
            {/* Main Heading Part 1 */}
            <div className="relative z-20 w-full md:w-[200%] md:-ml-[calc(50%+15px)] mb-3 md:mb-6 pointer-events-none lg:translate-y-[30px]">
                <h1 className="font-serif font-bold italic text-sage-400 text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight">
                   {data.mainHeading.line1}
                </h1>
            </div>

            {/* Main Heading Part 2 */}
            <div className="relative z-20 mb-6 md:mb-[40px]">
                 <h1 className="font-serif font-bold italic text-charcoal text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-none whitespace-nowrap tracking-tight">
                    {data.mainHeading.line2}
                 </h1>
            </div>

            {/* Caption & Photo */}
            <div className="flex flex-col items-start w-full">
                {/* Caption */}
                <p className="text-gray-500 font-montserrat font-medium text-sm md:text-base leading-snug w-full mb-4 md:mb-[15px] pl-2 border-l-2 border-sage-300">
                    {data.subHeading}
                </p>
                
                {/* Procedure Image - Lazy on Desktop (since portrait is priority) */}
                <div className="rounded-[24px] md:rounded-[30px] overflow-hidden relative shadow-md shrink-0 w-full h-[240px] md:h-[340px] bg-gray-100 block">
                    <img 
                        src={data.procedurePhoto} 
                        alt="Процедура косметологии" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="340"
                    />
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
