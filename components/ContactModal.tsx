
import React from 'react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Card / Bottom Sheet */}
      <div className="bg-white w-full sm:w-auto sm:max-w-md relative z-10 shadow-2xl animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 overflow-hidden border-t sm:border border-gray-100 p-6 sm:p-8 rounded-t-[30px] sm:rounded-[30px]">
        
        {/* Mobile Handle Bar */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>

        <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors hidden sm:block"
        >
            <X size={20} />
        </button>

        <div className="text-center mb-8">
            <h3 className="font-serif font-bold italic text-sage-600 text-2xl mb-2">
                Запись на прием
            </h3>
            <p className="font-montserrat text-gray-500 text-base">
                Выберите удобный способ связи, чтобы записаться на процедуру или задать вопрос
            </p>
        </div>

        <div className="space-y-4">
            {/* MAX Button */}
            <a
                href="https://max.ru/u/f9LHodD0cOKYto_MCKQG2Qnif9VenEoHTGR88WAesB6ZNkwQs5ehc4-MGAs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-sage-600 text-white py-4 rounded-xl font-medium transition-all duration-300 hover:bg-sage-700 hover:-translate-y-0.5 shadow-md"
            >
                <span className="font-montserrat tracking-wide">Написать в MAX</span>
            </a>

            {/* Telegram Button */}
            <a
                href="https://t.me/cosmetologbulgakova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-sage-400 text-white py-4 rounded-xl font-medium transition-all duration-300 hover:bg-sage-500 hover:-translate-y-0.5 shadow-md group"
            >
                <Send size={20} className="mr-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span className="font-montserrat tracking-wide">Написать в Telegram</span>
            </a>
        </div>

        <div className="mt-8 text-center border-t border-gray-100 pt-6 mb-[env(safe-area-inset-bottom)] sm:mb-0">
            <p className="text-xs text-gray-400 font-montserrat">
                Я отвечу вам в ближайшее время
            </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;