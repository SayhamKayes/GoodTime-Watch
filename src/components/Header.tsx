import React, { useState } from 'react';
import { NavigationTab, SiteInfo } from '../types';
import { SITE_INFO as DEFAULT_SITE_INFO } from '../data/goodtime';
import { MessageCircle, Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  siteInfo?: SiteInfo;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, siteInfo }) => {
  const currentSiteInfo = siteInfo || DEFAULT_SITE_INFO;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'new-arrival', label: 'New Arrival' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'sell-exchange', label: 'Sell & Exchange' },
    { id: 'delivered', label: 'Successfully Delivered' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex flex-col items-center justify-center ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}>
      
      {/* Top Announcement Bar */}
      <div className={`hidden sm:flex w-full bg-[#141009] border-[#c5a059]/20 text-center transition-all duration-500 overflow-hidden ${
        isScrolled ? 'h-0 opacity-0 border-transparent' : 'h-[40px] border-b opacity-100 items-center'
      }`}>
        <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 px-4 text-xs">
          <p className="text-[#e2c78a] tracking-wide text-[11px] sm:text-xs">
            {currentSiteInfo.announcement}
          </p>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <a
              href={`tel:${currentSiteInfo.phoneIntl}`}
              className="hover:text-[#c5a059] flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c5a059]" />
              <span>{currentSiteInfo.phoneDisplay}</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href={currentSiteInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full transition-all duration-500 bg-[#0a0d12]/95 backdrop-blur-md border border-white/10 ${
        isScrolled 
          ? 'max-w-6xl rounded-full shadow-2xl mt-0' 
          : 'max-w-full rounded-none border-t-0 border-x-0 bg-transparent'
      }`}>
        <div className={`mx-auto transition-all duration-500 flex items-center justify-between ${
          isScrolled ? 'h-16 px-6 sm:px-8' : 'max-w-7xl h-20 px-4 sm:px-6 lg:px-8'
        }`}>

          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            aria-label="Goodtime Watch SG Home"
          >
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/50 bg-gradient-to-br from-[#1f180c] to-[#0a0d12] flex items-center justify-center group-hover:border-[#e6ca85] transition-colors shadow-inner">
              <span className="font-serif-luxury text-xl font-bold text-[#c5a059] group-hover:text-[#e6ca85]">
                G
              </span>
            </div>
            <div>
              <span className="font-serif-luxury tracking-[0.2em] text-lg sm:text-xl font-semibold text-slate-100 block group-hover:text-white transition-colors">
                GOODTIME WATCH SG
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] block uppercase">
                Dhaka • Premium Watches
              </span>
            </div>
          </button>

          {/* Desktop Navigation Menu (Exactly the 5 requested items) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs tracking-wider transition-all relative font-medium ${isActive
                      ? 'text-[#f5deb3] bg-[#c5a059]/15 border border-[#c5a059]/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#c5a059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action: WhatsApp Direct Button */}
          {/* <div className="hidden sm:flex items-center gap-3">
            <a
              href={currentSiteInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black/20" />
              <span>WhatsApp: {currentSiteInfo.phoneDisplay}</span>
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#c5a059]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0d12]/98 backdrop-blur-xl flex flex-col lg:hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <span className="font-serif-luxury tracking-[0.2em] text-lg font-semibold text-[#c5a059]">
              MENU
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <X className="w-8 h-8 text-[#c5a059]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-lg sm:text-xl transition-all flex items-center justify-between ${isActive
                      ? 'bg-[#c5a059]/20 text-[#f5deb3] font-semibold border border-[#c5a059]/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[#c5a059] text-sm">●</span>}
                </button>
              );
            })}

            <div className="pt-8 mt-4">
              <a
                href={currentSiteInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059]"
              >
                <MessageCircle className="w-5 h-5 fill-black/20" />
                <span>WhatsApp: {currentSiteInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
