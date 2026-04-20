
import React from 'react';
import { MapPin, Phone, Send, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../data/siteConfig'; // Import config

interface FooterProps {
  onNavigate?: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  isMainPage?: boolean;
  onOpenContactModal?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, isMainPage = false, onOpenContactModal }) => {
  const { contacts } = siteConfig;

  return (
    <footer className="bg-stone-50 py-16 lg:py-24 relative z-10" id="contacts">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Contacts Info */}
          <div className="flex flex-col relative h-full justify-center w-full">
            
            {/* Back Button (if not main page) */}
            {!isMainPage && onNavigate && (
                <div className="mb-8 w-full">
                    <button 
                        onClick={() => onNavigate('home')}
                        className="flex items-center text-gray-500 hover:text-sage-600 transition-colors font-montserrat text-base font-medium group py-2"
                    >
                        <ArrowLeft size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Назад на главную</span>
                    </button>
                </div>
            )}

            <div className="flex flex-col items-start w-full">
                <h2 className="font-serif font-bold italic text-sage-600 text-4xl md:text-5xl lg:text-6xl leading-none mb-10">
                  Контакты
                </h2>
                
                {/* Tablet Grid Split: Left (Info) | Right (Actions) */}
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:flex lg:flex-col w-full">
                    
                    {/* Info Block */}
                    <div className="space-y-8 w-full mb-10 md:mb-0">
                      {/* Address */}
                      <div className="flex items-start space-x-5 group">
                        <div className="w-12 h-12 rounded-full bg-white border border-sage-200 flex items-center justify-center flex-shrink-0 text-sage-600 shadow-sm group-hover:border-sage-400 group-hover:scale-105 transition-all duration-300">
                            <MapPin size={24} />
                        </div>
                        <div className="flex flex-col pt-1">
                          <span className="font-montserrat font-bold text-charcoal text-lg mb-1">Адрес кабинета:</span>
                          <span className="font-montserrat text-gray-600 text-base">{contacts.address}</span>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start space-x-5 group">
                         <div className="w-12 h-12 rounded-full bg-white border border-sage-200 flex items-center justify-center flex-shrink-0 text-sage-600 shadow-sm group-hover:border-sage-400 group-hover:scale-105 transition-all duration-300">
                            <Phone size={24} />
                        </div>
                        <div className="flex flex-col pt-1">
                          <span className="font-montserrat font-bold text-charcoal text-lg mb-1">Телефон для записи:</span>
                          <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className="font-montserrat text-gray-600 text-base hover:text-sage-600 transition-colors font-medium">{contacts.phoneDisplay}</a>
                        </div>
                      </div>
                    </div>

                    {/* Actions Block (Socials + Button) */}
                    <div className="flex flex-col md:items-end md:justify-center lg:items-start lg:justify-start">
                        {/* Social Icons - Row */}
                        <div className="flex items-center gap-4 mb-10 md:mb-6">
                               {/* Telegram */}
                           {contacts.telegram && (
                               <a 
                                 href={contacts.telegram} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-14 h-14 rounded-full bg-[#5B7360] text-white flex items-center justify-center hover:bg-[#495C4D] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                               >
                                 <Send size={26} className="ml-0.5" />
                               </a>
                           )}
                           {/* VK */}
                           {contacts.vk && (
                               <a 
                                 href={contacts.vk} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-14 h-14 rounded-full bg-[#5B7360] text-white flex items-center justify-center hover:bg-[#495C4D] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                               >
                                 <svg className="w-11 h-11 -mt-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.7 17.5c-4.5 0-7.2-3.1-7.3-8.2h2.2c.1 3.8 1.7 5.4 3 5.7V9.3h2.1v3.2c1.3-.1 2.6-1.6 3.1-3.2h2.2c-.4 1.8-1.7 3.2-2.4 3.7 1 .5 2.6 1.9 3.1 4.5h-2.3c-.6-2.1-2.2-2.6-2.9-2.7v2.7h-.9z"/>
                                 </svg>
                               </a>
                           )}
                           {/* MAX */}
                           {contacts.max && (
                               <a 
                                 href={contacts.max} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-14 h-14 rounded-full bg-[#5B7360] text-white flex items-center justify-center hover:bg-[#495C4D] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg overflow-hidden"
                               >
                                 <span className="font-black font-montserrat text-xs tracking-tight">MAX</span>
                               </a>
                           )}
                        </div>

                        {/* Consultation Button */}
                        <button 
                            onClick={onOpenContactModal}
                            className="bg-[#D9D9D9] border-2 border-dotted border-sage-400 text-sage-700 hover:bg-sage-500 hover:text-white hover:border-transparent px-8 py-5 rounded-[12px] text-sm font-bold transition-all duration-300 font-montserrat uppercase tracking-wider w-full md:w-auto shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            Записаться на консультацию
                        </button>
                    </div>
                </div>

            </div>
          </div>

          {/* Right Column: Map */}
          <div className="h-[350px] lg:h-[450px] w-full rounded-[40px] overflow-hidden shadow-2xl relative bg-gray-100 group border-4 border-white">
              <a 
                href={contacts.mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full h-full relative"
              >
                  <img 
                    src={contacts.mapImage} 
                    alt={`Карта проезда: ${contacts.address}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
              </a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-sage-200 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-montserrat text-gray-400">
          <p className="order-2 md:order-1 mt-4 md:mt-0">© {new Date().getFullYear()} {siteConfig.meta.title}</p>
          <div className="flex space-x-6 order-1 md:order-2">
             <span className="cursor-pointer hover:text-sage-500 transition-colors">Политика конфиденциальности</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
