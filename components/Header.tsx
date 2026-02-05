
import React, { useState } from 'react';
import { MapPin, Phone, Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig'; // Import config

export interface NavItem {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  noSeparator?: boolean;
}

interface HeaderProps {
  onNavigate?: (page: 'home' | 'injections' | 'esthetic' | 'hardware') => void;
  customNavItems?: NavItem[];
  useGridNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, customNavItems, useGridNav = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { contacts, navigation } = siteConfig;
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      if (window.location.hash) {
        try {
          window.history.pushState("", document.title, window.location.pathname + window.location.search);
        } catch (err) {
          console.warn('Navigation state update failed:', err);
        }
      }
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
    } else {
      window.location.href = '#';
    }
  };

  const handleNavItemClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false); // Close menu on click
    if (customNavItems) return;

    e.preventDefault();
    if (onNavigate && href.startsWith('#')) {
      const id = href.substring(1);
      try {
        window.history.pushState(null, '', href);
      } catch (err) {
        console.warn('Navigation state update failed:', err);
      }
      onNavigate('home');
      setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
      }, 100);
    }
  };

  // Build nav items from config if no custom ones provided
  const defaultNavItems: NavItem[] = navigation.map(item => ({
    label: item.label,
    href: item.href,
    onClick: (e) => handleNavItemClick(e, item.href)
  }));

  const navItems = customNavItems || defaultNavItems;

  return (
    <>
    <header className="w-full py-4 md:py-6 px-4 md:px-8 border-b border-gray-100 bg-stone-50/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0 z-50 relative">
            <a href="#" onClick={handleLogoClick} className="flex flex-col items-start group">
                 <span className="font-cormorant text-2xl md:text-3xl text-charcoal font-medium tracking-wide leading-none group-hover:text-sage-500 transition-colors">
                    SVETLANA
                 </span>
                 <span className="font-montserrat text-[10px] md:text-xs text-sage-500 uppercase tracking-[0.35em] ml-0.5 leading-none mt-1">
                    BULGAKOVA
                 </span>
            </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-end flex-grow ml-12">
            <nav className={useGridNav 
                ? "grid grid-cols-3 gap-x-2 gap-y-1 mr-8" 
                : "flex items-center gap-1 xl:gap-2 mr-8"
            }>
              {navItems.map((item, index) => (
                  <div key={index} className={`flex items-center ${useGridNav ? 'justify-center w-full' : ''}`}>
                    <a 
                      href={item.href} 
                      onClick={item.onClick} 
                      className={`
                        text-gray-600 hover:text-sage-500 transition-colors font-medium uppercase tracking-wider whitespace-nowrap cursor-pointer 
                        ${useGridNav ? 'text-[11px] px-1 py-1 text-center w-full' : 'px-3 xl:px-4 text-sm py-2'}
                      `}
                    >
                      {item.label}
                    </a>
                    {!useGridNav && index < navItems.length - 1 && !item.noSeparator && (
                         <div className="w-px h-3 bg-sage-500/30 mx-1"></div>
                    )}
                  </div>
              ))}
            </nav>

            <div className="w-px h-10 bg-sage-500/50 mr-8"></div>

            <div className="flex items-center gap-6">
               <div className="flex flex-col items-end leading-tight">
                  <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className="font-bold text-sage-600 hover:text-sage-800 transition-colors whitespace-nowrap text-lg">
                    {contacts.phoneDisplay}
                  </a>
                  <span className="text-xs text-gray-400 font-montserrat">{contacts.address}</span>
               </div>
            </div>
        </div>

        {/* Mobile Burger */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-sage-600 hover:bg-sage-50 rounded-full transition-colors z-50 relative"
            aria-label="Меню"
        >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>
    </header>

    {/* Mobile Fullscreen Menu */}
    <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden pt-24 px-6 pb-6 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-6 mb-8">
            {navItems.map((item, index) => (
                <a 
                    key={index}
                    href={item.href} 
                    onClick={item.onClick}
                    className="text-2xl font-serif italic text-charcoal hover:text-sage-500 transition-colors flex items-center justify-between border-b border-gray-100 pb-4"
                >
                    {item.label}
                    <ArrowRight size={20} className="text-sage-300" />
                </a>
            ))}
        </nav>

        <div className="mt-auto space-y-6">
            <div className="bg-sage-50 p-6 rounded-2xl">
                 <div className="flex items-center gap-3 mb-4 text-sage-600">
                    <MapPin size={20} />
                    <span className="font-medium">{contacts.address}</span>
                 </div>
                 <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sage-700 text-xl font-bold">
                    <Phone size={20} />
                    {contacts.phoneDisplay}
                 </a>
            </div>
        </div>
    </div>
    </>
  );
};

export default Header;
