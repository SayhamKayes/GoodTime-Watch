import React, { useState, useEffect } from 'react';
import { NavigationTab, WatchProduct, UpcomingWatch, DeliveredWatch } from './types';
import { SITE_INFO } from './data/goodtime';
import { getStoredProducts, getStoredUpcoming, getStoredDelivered } from './utils/storage';
import { Header } from './components/Header';
import { FrontPage } from './components/FrontPage';
import { AboutSection } from './components/AboutSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { UpcomingSection } from './components/UpcomingSection';
import { SellExchangeSection } from './components/SellExchangeSection';
import { SuccessfullyDeliveredSection } from './components/SuccessfullyDeliveredSection';
import { AdminPanel } from './components/AdminPanel';
import { WatchModal } from './components/WatchModal';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { MessageCircle, ChevronUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);

  // Managed Catalog Datasets
  const [products, setProducts] = useState<WatchProduct[]>(getStoredProducts);
  const [upcomingWatches, setUpcomingWatches] = useState<UpcomingWatch[]>(getStoredUpcoming);
  const [deliveredWatches, setDeliveredWatches] = useState<DeliveredWatch[]>(getStoredDelivered);

  // URL Hash router support (e.g. #new-arrival)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      if (['home', 'about', 'new-arrival', 'upcoming', 'sell-exchange', 'delivered'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWhatsAppExpanded(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button when scrolled down half a screen
      if (window.scrollY > window.innerHeight / 2) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Separate Admin Route
  if (window.location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-[#07080b] text-[#e2e8f0] relative flex flex-col selection:bg-[#c5a059]/30 selection:text-white">
        <AnimatedBackground />
        <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          <AdminPanel
            products={products}
            upcomingWatches={upcomingWatches}
            deliveredWatches={deliveredWatches}
            onUpdateProducts={setProducts}
            onUpdateUpcoming={setUpcomingWatches}
            onUpdateDelivered={setDeliveredWatches}
            onExitAdmin={() => { window.location.href = '/'; }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-[#e2e8f0] relative flex flex-col selection:bg-[#c5a059]/30 selection:text-white">
      
      {/* Horological Motion Animated Background */}
      <AnimatedBackground />

      {/* Main Header with All Navigation Tabs */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Content Area */}
      <main className={`relative z-10 flex-1 w-full ${activeTab !== 'home' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[140px] pb-16' : 'pb-16'}`}>
        
        {/* Render Front Page / Landing Page */}
        {activeTab === 'home' && (
          <FrontPage
            products={products}
            upcomingWatches={upcomingWatches}
            deliveredWatches={deliveredWatches}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateTab={handleSelectTab}
          />
        )}

        {/* Render About Section */}
        {activeTab === 'about' && (
          <AboutSection onNavigateTab={handleSelectTab} />
        )}

        {/* Render Full New Arrivals Catalog */}
        {activeTab === 'new-arrival' && (
          <NewArrivalsSection 
            products={products} 
            onSelectProduct={(p) => setSelectedProduct(p)} 
          />
        )}

        {/* Render Full Upcoming Shipments */}
        {activeTab === 'upcoming' && (
          <UpcomingSection upcomingWatches={upcomingWatches} />
        )}

        {/* Render Full Sell & Exchange Concierge */}
        {activeTab === 'sell-exchange' && (
          <SellExchangeSection />
        )}

        {/* Render Full Successfully Delivered Archive */}
        {activeTab === 'delivered' && (
          <SuccessfullyDeliveredSection deliveredWatches={deliveredWatches} />
        )}



      </main>

      {/* Product Detail Modal */}
      <WatchModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Sticky WhatsApp Concierge Button */}
        <a
          href={SITE_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Concierge"
          className={`group relative flex items-center h-[52px] rounded-full bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all duration-700 ${
            isWhatsAppExpanded ? 'px-5' : 'px-3.5 group-hover:px-5'
          }`}
        >
          <div className="relative shrink-0 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-black/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div
            className={`hidden sm:block text-left leading-tight transition-all duration-700 overflow-hidden whitespace-nowrap ${
              isWhatsAppExpanded
                ? 'max-w-[200px] opacity-100 ml-3'
                : 'max-w-0 opacity-0 ml-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-3'
            }`}
          >
            <span className="block text-[10px] font-mono tracking-wider uppercase text-black/70 font-bold">
              WhatsApp Desk
            </span>
            <span className="block text-xs font-bold uppercase tracking-wider">
              {SITE_INFO.phoneDisplay}
            </span>
          </div>
        </a>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={`p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 group ${
            showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <ChevronUp className="w-5 h-5 group-hover:text-[#c5a059] transition-colors" />
        </button>
      </div>

      {/* Footer */}
      <Footer 
        onSelectTab={handleSelectTab} 
        onOpenAdmin={() => { window.location.href = '/admin'; }} 
      />

    </div>
  );
}
