import React, { useState, useEffect } from 'react';
import { WatchProduct, UpcomingWatch, DeliveredWatch, NavigationTab } from '../types';
import { SITE_INFO } from '../data/goodtime';
import { generateProductWhatsAppLink, generateUpcomingWhatsAppLink } from '../utils/whatsapp';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Clock,
  Plane,
  ArrowRight,
  MessageCircle,
  Eye,
  CheckCircle,
  MapPin,
  Star,
  Quote,
  RefreshCw,
  Calendar,
  Layers,
  CheckCircle2,
  Store,
  Zap,
  Target
} from 'lucide-react';

import { isProductNewArrival } from '../utils/productUtils';

interface FrontPageProps {
  products: WatchProduct[];
  upcomingWatches: UpcomingWatch[];
  deliveredWatches: DeliveredWatch[];
  onSelectProduct: (product: WatchProduct) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaAction: NavigationTab;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'rolex-heritage',
    tag: 'Flagship Swiss Curation',
    title: 'Rolex Submariner & Oyster Collection',
    subtitle: 'The Ultimate Standard of Underwater Horology',
    description: 'Precision engineered in Oystersteel with ceramic Cerachrom bezels. Each chronometer is verified for authentic provenance and uncompromised mechanical excellence.',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Explore New Arrivals',
    ctaAction: 'new-arrival'
  },
  {
    id: 'omega-moonwatch',
    tag: 'Master Chronometer Heritage',
    title: 'OMEGA Speedmaster Professional',
    subtitle: 'The Legendary Moonwatch Tested in Space',
    description: 'A monument to human endeavor. Featuring manual-wind Co-Axial Master Chronometer caliber 3861 with antimagnetic resistance up to 15,000 gauss.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'View New Arrivals',
    ctaAction: 'new-arrival'
  },
  {
    id: 'upcoming-allocations',
    tag: 'Priority Pre-Booking Open',
    title: 'Upcoming Shipments in Transit',
    subtitle: 'Secured Allocations from Geneva & Tokyo',
    description: 'Reserve priority allocation before arrival in Dhaka. Inspected with full factory papers, international warranty, and white-glove personal handover.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Browse Upcoming Watches',
    ctaAction: 'upcoming'
  },
  {
    id: 'sell-trade',
    tag: 'Certified Trade-Up Program',
    title: 'Sell & Exchange Your Luxury Watch',
    subtitle: 'Instant Fair Valuation & Transparent Buyback',
    description: 'Trade in your pre-owned luxury timepiece towards your dream reference or receive same-day settlement with verified authentication in Dhaka.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Sell & Exchange Concierge',
    ctaAction: 'sell-exchange'
  }
];

const AUTHORIZED_BRANDS = [
  { name: 'ROLEX', font: 'font-serif', color: 'group-hover:text-[#006039]' },
  { name: 'OMEGA', font: 'font-sans tracking-widest', color: 'group-hover:text-[#c40018]' },
  { name: 'PATEK PHILIPPE', font: 'font-serif tracking-[0.15em]', color: 'group-hover:text-[#c5a059]' },
  { name: 'CARTIER', font: 'font-serif italic tracking-widest', color: 'group-hover:text-[#e4002b]' },
  { name: 'AUDEMARS PIGUET', font: 'font-serif tracking-[0.2em]', color: 'group-hover:text-[#c5a059]' },
  { name: 'TUDOR', font: 'font-serif font-black tracking-widest', color: 'group-hover:text-[#e31837]' },
  { name: 'IWC', font: 'font-serif font-bold tracking-widest', color: 'group-hover:text-[#c5a059]' },
  { name: 'GRAND SEIKO', font: 'font-serif font-bold tracking-wider', color: 'group-hover:text-[#003b82]' },
];

export const FrontPage: React.FC<FrontPageProps> = ({
  products,
  upcomingWatches,
  deliveredWatches,
  onSelectProduct,
  onNavigateTab
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroProducts = products.slice(0, 3);

  // Auto-advance hero slider every 5 seconds ALWAYS
  useEffect(() => {
    if (heroProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : heroProducts.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  // User requested: 3 rows for New Arrivals snippet (12 watches on 4-col or 3-col grid)
  const newArrivalsSnippet = products.slice(0, 12);

  // User requested: 1 row for Upcoming watches (3 watches)
  const upcomingSnippet = upcomingWatches.slice(0, 3);

  // User requested: 1 row for Successfully Delivered (3 watches)
  const deliveredSnippet = deliveredWatches.slice(0, 3);

  return (
    <div className="pb-12">
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 35s linear infinite;
        }
        .pause-scroll:hover .animate-logo-scroll {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. HERO SECTION WITH SLIDER */}
      <section
        className="relative overflow-hidden border-b border-white/10 bg-[#090b10] shadow-2xl h-screen flex items-center w-full"
      >
        {heroProducts.map((product, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100 z-20 scale-100' : 'opacity-0 z-0 pointer-events-none scale-105'
                }`}
            >
              {/* Background Image with Dark Gradient Overlays */}
              <img
                src={product.images[0]}
                alt={`${product.brandName} ${product.name}`}
                className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'
                  }`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080b] via-[#07080b]/85 to-transparent z-10" />
              <div className="absolute inset-0 bg-black/30 z-10" />

              {/* Slide Content */}
              <div className="absolute inset-0 z-30 flex items-center">
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f5deb3] text-xs font-mono tracking-widest uppercase w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-[#e6ca85]" />
                      {product.brandName}
                    </div>

                    <div className="space-y-2">
                      <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
                        {product.name}
                      </h1>
                      <p className="text-sm sm:text-lg font-mono text-[#e6ca85] tracking-wide font-medium">
                        Ref. {product.reference} - {product.model}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl line-clamp-3">
                      {product.description}
                    </p>

                    {/* Call-to-actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 active:scale-95"
                      >
                        <span>View Details</span>
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={generateProductWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-[#c5a059]" />
                        <span>Enquire via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-12 left-0 right-0 z-40 flex justify-center">
          <div className="flex items-center gap-1.5 px-3">
            {heroProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-7 bg-[#c5a059]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-20 left-0 right-0 z-40 flex justify-center">
          <button
            onClick={() => document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll down"
            className="p-2 hover:bg-white/10 rounded-full transition-colors group cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 text-white/50 group-hover:text-white transition-colors animate-bounce" />
          </button>
        </div>

      </section>

      {/* 1.5 AUTHORIZED BRANDS MARQUEE */}
      <section id="next-section" className="scroll-mt-[115px] py-16 sm:py-20 overflow-hidden pause-scroll">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
           <p className="text-center text-[10px] font-mono tracking-widest uppercase text-slate-500">
             Authorized & Authenticated Brands
           </p>
        </div> */}
        <div
          className="relative w-full flex"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          {/* Container holding exactly 2 identical sets, sliding left by 50% to create perfect loop */}
          <div className="flex w-max animate-logo-scroll items-center">

            {/* Set 1 */}
            <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3">
              {AUTHORIZED_BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center w-40 h-28 sm:w-48 sm:h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(197,160,89,0.15)]"
                >
                  <div className={`text-slate-500/50 transition-colors duration-500 ${brand.color} ${brand.font} text-lg sm:text-xl text-center px-4 leading-tight`}>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Duplicate) */}
            <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3">
              {AUTHORIZED_BRANDS.map((brand, i) => (
                <div
                  key={i + 'dup'}
                  className="group flex flex-col items-center justify-center w-40 h-28 sm:w-48 sm:h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(197,160,89,0.15)]"
                >
                  <div className={`text-slate-500/50 transition-colors duration-500 ${brand.color} ${brand.font} text-lg sm:text-xl text-center px-4 leading-tight`}>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Set 3 (Duplicate for ultra-wide safety) */}
            <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3">
              {AUTHORIZED_BRANDS.map((brand, i) => (
                <div
                  key={i + 'dup2'}
                  className="group flex flex-col items-center justify-center w-40 h-28 sm:w-48 sm:h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(197,160,89,0.15)]"
                >
                  <div className={`text-slate-500/50 transition-colors duration-500 ${brand.color} ${brand.font} text-lg sm:text-xl text-center px-4 leading-tight`}>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Set 4 (Duplicate for ultra-wide safety) */}
            <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3">
              {AUTHORIZED_BRANDS.map((brand, i) => (
                <div
                  key={i + 'dup3'}
                  className="group flex flex-col items-center justify-center w-40 h-28 sm:w-48 sm:h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(197,160,89,0.15)]"
                >
                  <div className={`text-slate-500/50 transition-colors duration-500 ${brand.color} ${brand.font} text-lg sm:text-xl text-center px-4 leading-tight`}>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-20 sm:space-y-28">
        {/* 2. ABOUT SNIPPET (1 section highlighting Goodtime Watch SG) */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#121622] via-[#0d1017] to-[#07090e] p-8 sm:p-12 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                About Goodtime Watch SG
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light text-slate-100">
                Bangladesh’s Trusted Curator for Authentic Luxury Timepieces
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Founded on the belief that acquiring a fine timepiece should be anchored in absolute trust, transparent provenance, and personalized service. Operating from Dhaka, we connect discerning collectors across Bangladesh with verified Swiss, German, and Japanese horology.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="block font-serif-luxury text-lg font-bold text-[#e6ca85]">100%</span>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Authentic</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="block font-serif-luxury text-lg font-bold text-[#e6ca85]">48-Hour</span>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Inspection</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="block font-serif-luxury text-lg font-bold text-[#e6ca85]">Direct</span>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Sourcing</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="block font-serif-luxury text-lg font-bold text-[#e6ca85]">64 Districts</span>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Insured Delivery</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end space-y-3">
              <button
                onClick={() => { onNavigateTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black bg-[#e6ca85] hover:bg-[#d4af37] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] font-mono text-slate-400">
                Official Helpline: {SITE_INFO.phoneDisplay}
              </p>
            </div>
          </div>
        </section>

        {/* 3. NEW ARRIVALS SNIPPET (3 rows with View All button) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                Current In-Stock Selection
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light text-slate-100">
                New Arrivals Showcase
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
                Curated watches ready for immediate viewing, physical check, and delivery across Bangladesh.
              </p>
            </div>

            <button
              onClick={() => { onNavigateTab('new-arrival'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-mono text-[#e6ca85] hover:text-white flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
            >
              <span>Browse All Models</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Rows of Watches Grid (12 watches) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivalsSnippet.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#11141d] to-[#0a0c10] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Product Image */}
                <div
                  className="relative aspect-[4/3] bg-[#07090d] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={`${product.brandName} ${product.name}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {isProductNewArrival(product) && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#c5a059] text-black tracking-wider uppercase">
                        New Arrival
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {product.availability}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-black/80 text-white text-xs border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#c5a059]" /> View Details
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#c5a059] font-medium tracking-wider uppercase text-[11px]">
                        {product.brandName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Ref. {product.reference}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif-luxury text-base font-semibold text-slate-100 group-hover:text-[#e6ca85] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name} {product.model}
                    </h3>

                    <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {product.movement}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {product.caseSizeMm}mm
                    </span>
                  </div>

                  {/* Pricing & WhatsApp Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">
                        Pricing
                      </span>
                      <span className="text-xs font-semibold text-[#e6ca85]">
                        Price on Request
                      </span>
                    </div>

                    <a
                      href={generateProductWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 transition-all shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black/20" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* View All New Arrivals Button */}
          <div className="text-center pt-4">
            <button
              onClick={() => { onNavigateTab('new-arrival'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg transition-all inline-flex items-center gap-2.5 active:scale-95"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 4. UPCOMING WATCHES SNIPPET (1 row with View All button) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase mb-2">
                <Plane className="w-3 h-3" />
                Incoming In Transit
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light text-slate-100">
                Upcoming Timepieces
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
                Currently en route from Switzerland & Japan. Reserve early to lock in allocation.
              </p>
            </div>

            <button
              onClick={() => { onNavigateTab('upcoming'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-mono text-[#e6ca85] hover:text-white flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
            >
              <span>View All Upcoming</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 1 Row of Upcoming Watches (3 items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingSnippet.map((watch) => (
              <div
                key={watch.id}
                className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#121622]/90 to-[#090b0e] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative aspect-[16/10] bg-[#07090e] overflow-hidden">
                  <img
                    src={watch.image}
                    alt={`${watch.brand} ${watch.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#1c1409]/90 text-[#f5deb3] border border-[#c5a059]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3 h-3 text-[#e6ca85]" />
                      {watch.statusBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#e6ca85]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>ETA:</span>
                      </span>
                      <span className="font-semibold text-white">{watch.expectedArrival}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#c5a059] font-medium tracking-wider uppercase">
                        {watch.brand}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Ref. {watch.reference}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-xl font-bold text-slate-100 group-hover:text-[#e6ca85] transition-colors">
                      {watch.model}
                    </h3>

                    <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                      {watch.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                      <span className="text-[10px] font-mono uppercase text-[#c5a059] block">Highlight</span>
                      <p className="text-[11px] font-medium text-slate-200 truncate">{watch.keyFeature}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Allocation</span>
                      <span className="text-xs font-semibold text-[#e6ca85]">Price on Request</span>
                    </div>

                    <a
                      href={generateUpcomingWhatsAppLink(watch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 transition-all shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black/20" />
                      <span>Pre-book</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Upcoming Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => { onNavigateTab('upcoming'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all inline-flex items-center gap-2"
            >
              <span>View All Upcoming Shipments</span>
              <ArrowRight className="w-4 h-4 text-[#e6ca85]" />
            </button>
          </div>
        </section>

        {/* 5. SELL & EXCHANGE SNIPPET (with View Full Guide button) */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#181309] via-[#0d1017] to-[#07080b] p-8 sm:p-12 shadow-xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase">
              <RefreshCw className="w-3.5 h-3.5 text-[#e6ca85]" />
              Sell & Trade-In Concierge
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light text-slate-100">
              Monetize or Upgrade Your Luxury Timepiece in Bangladesh
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Ready for your next horological milestone? Our certified valuation team provides rapid, transparent appraisals for Rolex, OMEGA, Tudor, Cartier, Grand Seiko, and other leading marques.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[#e6ca85] text-xs font-bold block">01. Photos</span>
                <span className="text-slate-300 font-light">Send dial, caseback & papers on WhatsApp</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[#e6ca85] text-xs font-bold block">02. Valuation</span>
                <span className="text-slate-300 font-light">Receive transparent market quote in hours</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[#e6ca85] text-xs font-bold block">03. Physical Check</span>
                <span className="text-slate-300 font-light">Hands-on timegrapher & movement verification</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[#e6ca85] text-xs font-bold block">04. Settlement</span>
                <span className="text-slate-300 font-light">Immediate bank payout or upgrade credit</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { onNavigateTab('sell-exchange'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg transition-all flex items-center gap-2"
              >
                <span>View Full Sell & Exchange Guide & Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. SUCCESSFULLY DELIVERED SNIPPET (1 row with View All button) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider uppercase mb-2">
                <CheckCircle className="w-3 h-3" />
                Client Handover Archive
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light text-slate-100">
                Successfully Delivered
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
                Sold luxury timepieces delivered across Dhaka, Chattogram, Sylhet, and verified collector reviews.
              </p>
            </div>

            <button
              onClick={() => { onNavigateTab('delivered'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-mono text-[#e6ca85] hover:text-white flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 1 Row of Delivered Watches (3 items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliveredSnippet.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#11141d] to-[#090b0e] border border-white/10 hover:border-[#c5a059]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative aspect-[16/11] bg-[#07090d] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <CheckCircle className="w-3 h-3" />
                      Delivered
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/80 backdrop-blur-md border border-white/10 text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#c5a059]" />
                      {item.deliveryLocation}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#c5a059] font-medium tracking-wider uppercase">
                        {item.brand}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Ref. {item.reference}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-lg font-bold text-slate-100">
                      {item.model}
                    </h3>

                    <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Delivered: </span>
                      <span className="text-slate-200 font-medium">{item.deliveredDate}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#141824]/60 border border-white/5 space-y-2 relative">
                      <Quote className="w-5 h-5 text-[#c5a059]/20 absolute top-2 right-2" />
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 font-light italic line-clamp-2">
                        "{item.clientReview}"
                      </p>
                      <span className="block text-[11px] font-semibold text-slate-200 pt-1 border-t border-white/5">
                        {item.clientName}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 font-light">Looking for similar?</span>
                    <a
                      href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Goodtime Watch SG,\n\nI saw your delivered ${item.brand} ${item.model} (Ref: ${item.reference}) on your website and would like to inquire about sourcing another piece.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#f5deb3] bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 text-[#25D366]" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Delivered Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => { onNavigateTab('delivered'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all inline-flex items-center gap-2"
            >
              <span>View All Delivered Timepieces & Client Reviews</span>
              <ArrowRight className="w-4 h-4 text-[#e6ca85]" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
