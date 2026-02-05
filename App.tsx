
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import AdminPanel from './components/AdminPanel'; 
import { Phone, Calendar } from 'lucide-react';
import { siteConfig } from './data/siteConfig';
import { SocialProofSection, BeforeAfterSection, ReviewsSection, FAQSection, QuizSection } from './types';
import { AdminStorage } from './data/adminStorage';

// Lazy load heavy components and pages to reduce initial bundle size
const InjectionCosmetology = lazy(() => import('./pages/InjectionCosmetology'));
const EstheticCosmetology = lazy(() => import('./pages/EstheticCosmetology'));
const HardwareCosmetology = lazy(() => import('./pages/HardwareCosmetology'));

// Lazy load heavy below-the-fold sections
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Reviews = lazy(() => import('./components/Reviews'));
const FAQ = lazy(() => import('./components/FAQ'));
const Blog = lazy(() => import('./components/Blog'));
const Quiz = lazy(() => import('./components/Quiz'));

export type PageType = 'home' | 'injections' | 'esthetic' | 'hardware';

const PageLoader = () => (
  <div className="min-h-screen bg-stone-50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin"></div>
  </div>
);

// Helper to determine if a section should be rendered based on screen size
const getVisibilityClass = (style: { hiddenOnMobile?: boolean; hiddenOnDesktop?: boolean; customClasses?: string }) => {
  const classes = [style.customClasses || ''];
  if (style.hiddenOnMobile) classes.push('hidden md:block');
  if (style.hiddenOnDesktop) classes.push('md:hidden');
  return classes.join(' ');
};

// Mobile Sticky Action Bar
const MobileStickyBar = ({ onOpenContactModal }: { onOpenContactModal: () => void }) => (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 lg:hidden flex justify-between items-center gap-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <a 
        href={`tel:${siteConfig.contacts.phone.replace(/\s+/g, '')}`} 
        className="flex-1 flex items-center justify-center gap-2 bg-stone-100 active:bg-stone-200 text-charcoal py-3.5 rounded-xl font-bold text-sm transition-colors"
      >
         <Phone size={18} className="text-sage-600" /> 
         <span>Позвонить</span>
      </a>
      <button 
        onClick={onOpenContactModal} 
        className="flex-[1.5] flex items-center justify-center gap-2 bg-sage-500 active:bg-sage-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
      >
         <Calendar size={18} />
         <span>Записаться</span>
      </button>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Load config from localStorage if available, otherwise use default
  const [activeConfig] = useState(() => AdminStorage.load());

  // Check for Admin Mode hash
  useEffect(() => {
    const checkHash = () => {
        if (window.location.hash === '#admin') {
            setIsAdminMode(true);
        } else {
            setIsAdminMode(false);
        }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Scroll handling logic
  const handleScrollPosition = () => {
    if (window.location.hash && window.location.hash !== '#admin') {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      // Retry for lazy loads
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          clearInterval(interval);
        } else if (attempts >= 10) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    } else if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    handleScrollPosition();
  }, [currentPage]);

  useEffect(() => {
    if (isContactModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isContactModalOpen]);

  const navigateTo = (page: PageType) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    } else {
      if (page === 'home' && !window.location.hash) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Render Admin Panel if in admin mode
  if (isAdminMode) {
      return <AdminPanel />;
  }

  // Sub-pages rendering
  if (currentPage === 'injections') {
    return (
      <Suspense fallback={<PageLoader />}>
        <div className="bg-stone-50 min-h-screen animate-in fade-in duration-500 pb-20 lg:pb-0">
          <InjectionCosmetology onNavigate={navigateTo} onOpenContactModal={() => setIsContactModalOpen(true)} />
          <MobileStickyBar onOpenContactModal={() => setIsContactModalOpen(true)} />
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
      </Suspense>
    );
  }

  if (currentPage === 'esthetic') {
    return (
      <Suspense fallback={<PageLoader />}>
        <div className="bg-stone-50 min-h-screen animate-in fade-in duration-500 pb-20 lg:pb-0">
          <EstheticCosmetology onNavigate={navigateTo} onOpenContactModal={() => setIsContactModalOpen(true)} />
          <MobileStickyBar onOpenContactModal={() => setIsContactModalOpen(true)} />
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
      </Suspense>
    );
  }

  if (currentPage === 'hardware') {
    return (
      <Suspense fallback={<PageLoader />}>
        <div className="bg-stone-50 min-h-screen animate-in fade-in duration-500 pb-20 lg:pb-0">
          <HardwareCosmetology onNavigate={navigateTo} onOpenContactModal={() => setIsContactModalOpen(true)} />
          <MobileStickyBar onOpenContactModal={() => setIsContactModalOpen(true)} />
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
      </Suspense>
    );
  }

  // --- Main Page Builder ---
  return (
    <div className={`min-h-screen animate-in fade-in duration-500 pb-20 lg:pb-0 ${activeConfig.theme.colors.secondary}`}>
      <Header onNavigate={navigateTo} />

      <main>
        {activeConfig.sections.map((section) => {
          if (!section.isVisible) return null;

          const commonProps = {
            onNavigate: navigateTo,
            onOpenContactModal: () => setIsContactModalOpen(true),
          };

          const containerClasses = `
            ${section.style.backgroundColor || ''} 
            ${section.style.paddingTop || ''} 
            ${section.style.paddingBottom || ''}
            ${getVisibilityClass(section.style)}
          `;

          // Wrap component in a div to handle background/padding/visibility
          const renderContent = () => {
            switch (section.type) {
              case 'hero':
                // Hero is critical, load immediately (not lazy)
                return <Hero {...commonProps} config={section} />;
              case 'socialProof':
                return <SocialProof data={(section as SocialProofSection).data} />;
              case 'services':
                return <Services {...commonProps} config={section} />;
              case 'beforeAfter':
                return <Suspense fallback={<div className="h-96"></div>}><BeforeAfter data={(section as BeforeAfterSection).data} /></Suspense>;
              case 'reviews':
                return <Suspense fallback={<div className="h-96"></div>}><Reviews data={(section as ReviewsSection).data} /></Suspense>;
              case 'faq':
                return <Suspense fallback={<div className="h-40"></div>}><FAQ data={(section as FAQSection).data} /></Suspense>;
              case 'blog':
                return <Suspense fallback={<div className="h-96"></div>}><Blog /></Suspense>;
              case 'quiz':
                return <Suspense fallback={<div className="h-96"></div>}><Quiz onOpenContactModal={commonProps.onOpenContactModal} data={(section as QuizSection).data} /></Suspense>;
              default:
                return null;
            }
          };

          return (
            <div key={section.id} id={section.id} className={containerClasses}>
              {renderContent()}
            </div>
          );
        })}
      </main>

      <Footer onNavigate={navigateTo} isMainPage={true} onOpenContactModal={() => setIsContactModalOpen(true)} />
      
      <MobileStickyBar onOpenContactModal={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default App;
