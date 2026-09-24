import React from 'react';
import { SITE_INFO as DEFAULT_SITE_INFO } from '../data/goodtime';
import { NavigationTab, SiteInfo } from '../types';
import { Phone, Mail, MessageCircle, MapPin, ShieldCheck, Lock, ArrowUpRight, Clock } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAdmin: () => void;
  siteInfo?: SiteInfo;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAdmin, siteInfo }) => {
  const currentSiteInfo = siteInfo || DEFAULT_SITE_INFO;
  return (
    <footer className="bg-[#080a0f] border-t-2 border-[#c5a059]/30 text-slate-300 text-xs relative z-20">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand & Authenticity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#c5a059] bg-[#141824] flex items-center justify-center text-[#e6ca85] font-serif-luxury font-bold text-base shadow-sm">
                G
              </div>
              <div>
                <span className="font-serif-luxury tracking-widest text-white font-bold text-base block">
                  GOODTIME WATCH SG
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#c5a059] uppercase block font-semibold">
                  Dhaka • Authentic Horology
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Curated destination for authentic luxury and premium timepieces in Bangladesh. Sourced directly from verified horological networks worldwide with unconditional provenance.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Provenance Guaranteed</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-luxury font-bold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Collections & Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>Home Showcase</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>About Goodtime Watch SG</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('new-arrival'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>New Arrivals (Stock Catalog)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('upcoming'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>Upcoming Timepieces in Transit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('sell-exchange'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>Sell & Exchange Concierge</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('delivered'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-[#e6ca85] transition-colors flex items-center gap-1.5"
                >
                  <span>Successfully Delivered Archive</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-luxury font-bold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Concierge Contact
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`tel:${currentSiteInfo.phoneIntl}`} className="text-white hover:text-[#e6ca85] font-semibold transition-colors">
                  {currentSiteInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={currentSiteInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>WhatsApp: +{currentSiteInfo.whatsappNumber}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`mailto:${currentSiteInfo.email}`} className="text-slate-300 hover:text-white transition-colors truncate">
                  {currentSiteInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span className="text-slate-300">{currentSiteInfo.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Delivery & Operating Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-luxury font-bold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Delivery & Desk Hours
            </h3>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              We offer white-glove personal handover across Dhaka and fully insured, tracked shipping to Chattogram, Sylhet, and all 64 districts in Bangladesh.
            </p>
            <div className="p-3.5 rounded-xl bg-[#121622] border border-white/10 space-y-1 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-[#e6ca85] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Concierge Desk:</span>
              </div>
              <span className="text-slate-200 block">Everyday: 10:00 AM – 10:00 PM BST</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Lock */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Goodtime Watch SG. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Developed by{' '}
              <a
                href="https://dynamiteitsolution.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a059] hover:underline font-semibold"
              >
                Dynamite IT Solution
              </a>
            </span>

            {/* <span className="text-white/20">|</span> */}

            {/* Discreet Secured Admin Portal Button */}
            {/* <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-[#e6ca85] border border-white/10 transition-colors font-mono text-[10px]"
              title="Secured Admin Portal"
            >
              <Lock className="w-3 h-3 text-[#c5a059]" />
              <span>Admin Portal</span>
            </button> */}
          </div>
        </div>

      </div>

    </footer>
  );
};
