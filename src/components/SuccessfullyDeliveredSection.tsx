import React, { useState, useMemo } from 'react';
import { DELIVERED_WATCHES, SITE_INFO as DEFAULT_SITE_INFO } from '../data/goodtime';
import {
  CheckCircle,
  MapPin,
  Star,
  ShieldCheck,
  MessageCircle,
  PackageCheck,
  Quote,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DeliveredWatch, SiteInfo } from '../types';

interface SuccessfullyDeliveredSectionProps {
  deliveredWatches?: DeliveredWatch[];
  siteInfo?: SiteInfo;
}

export const SuccessfullyDeliveredSection: React.FC<SuccessfullyDeliveredSectionProps> = ({
  deliveredWatches = DELIVERED_WATCHES,
  siteInfo
}) => {
  const currentSiteInfo = siteInfo || DEFAULT_SITE_INFO;
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // Extract unique brands dynamically from the delivered archives
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, string>();
    deliveredWatches.forEach((w) => {
      const trimmed = w.brand?.trim();
      if (trimmed) {
        const lower = trimmed.toLowerCase();
        if (!brandMap.has(lower)) {
          brandMap.set(lower, trimmed);
        }
      }
    });
    return Array.from(brandMap.values()).sort((a, b) => a.localeCompare(b));
  }, [deliveredWatches]);

  // Count items per brand
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: deliveredWatches.length };
    deliveredWatches.forEach((w) => {
      const b = w.brand?.trim() || 'Other';
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, [deliveredWatches]);

  // Filtered deliveries based on active brand panel selection
  const displayedWatches = useMemo(() => {
    if (selectedBrand === 'All') return deliveredWatches;
    return deliveredWatches.filter(
      (w) => w.brand?.trim().toLowerCase() === selectedBrand.toLowerCase()
    );
  }, [deliveredWatches, selectedBrand]);

  const targetWaNumber = currentSiteInfo.deliveredWhatsapp || currentSiteInfo.whatsappNumber;
  const deskPhone = currentSiteInfo.deliveredPhone || currentSiteInfo.phoneDisplay;
  const deskWaLink = currentSiteInfo.deliveredWhatsapp
    ? `https://wa.me/${currentSiteInfo.deliveredWhatsapp}`
    : currentSiteInfo.whatsappLink;

  return (
    <section className="py-12 sm:py-16 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#121622] via-[#0d1017] to-[#07080b] p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider uppercase">
            <PackageCheck className="w-3.5 h-3.5" />
            Verified Deliveries Across Bangladesh
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-slate-100">
            Successfully Delivered Archive
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Browse our archive of sold luxury timepieces and authentic reviews from satisfied collectors in Dhaka, Chattogram, Sylhet, and across Bangladesh. Select any watch brand below to inspect its dedicated delivery record.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>100% Verified Authenticity</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c5a059]" />
              <span>Handover in Dhaka & Insured Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Selection Panels / Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#c5a059]" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Filter By Watch Brand
            </span>
          </div>

          <div className="text-xs font-mono text-[#c5a059]">
            {selectedBrand === 'All' ? (
              <span>Showing All {deliveredWatches.length} Deliveries</span>
            ) : (
              <span>
                {selectedBrand}: {brandCounts[selectedBrand] || 0} Piece
                {(brandCounts[selectedBrand] || 0) > 1 ? 's' : ''} Archived
              </span>
            )}
          </div>
        </div>

        {/* Brand Tabs Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          {/* All Brands Tab */}
          <button
            onClick={() => setSelectedBrand('All')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              selectedBrand === 'All'
                ? 'bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold'
                : 'bg-[#0e121b] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <span>All Brands</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                selectedBrand === 'All'
                  ? 'bg-black/20 text-black font-bold'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              {deliveredWatches.length}
            </span>
          </button>

          {/* Individual Watch Brand Tabs */}
          {availableBrands.map((brand) => {
            const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
            const count = brandCounts[brand] || 0;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold'
                    : 'bg-[#0e121b] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{brand}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? 'bg-black/20 text-black font-bold'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Active Banner (When a specific brand is selected) */}
      {selectedBrand !== 'All' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#121622]/90 border border-[#c5a059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#e6ca85] font-serif-luxury font-bold text-lg">
              {selectedBrand[0]}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif-luxury font-bold text-white flex items-center gap-2">
                <span>{selectedBrand} Delivery Archive</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  Verified Records
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Displaying only authentic handovers and client experiences for {selectedBrand}.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedBrand('All')}
            className="text-xs text-[#e6ca85] hover:underline font-mono flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Show All Brands</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Delivered Watches Grid */}
      {displayedWatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedWatches.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#11141d] to-[#090b0e] border border-white/10 hover:border-[#c5a059]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              {/* Image & Delivered Badge */}
              <div className="relative aspect-[16/11] bg-[#07090d] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <CheckCircle className="w-3 h-3" />
                    Successfully Delivered
                  </span>
                </div>

                {/* Brand Badge on Card */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-[#e6ca85] border border-[#c5a059]/30 backdrop-blur-md shadow-md">
                    {item.brand}
                  </span>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/80 backdrop-blur-md border border-white/10 text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    {item.deliveryLocation}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
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

                  {/* Client Review Box */}
                  <div className="p-4 rounded-2xl bg-[#141824]/60 border border-white/5 space-y-2.5 relative">
                    <Quote className="w-6 h-6 text-[#c5a059]/20 absolute top-3 right-3" />

                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 font-light leading-relaxed italic">
                      "{item.clientReview}"
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-200">{item.clientName}</span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Collector
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action: Enquire about similar watch */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400 font-light">
                    Looking for this piece?
                  </span>

                  <a
                    href={`https://wa.me/${targetWaNumber}?text=${encodeURIComponent(
                      `Hello Goodtime Watch SG,\n\nI saw your successfully delivered ${item.brand} ${item.model} (Ref: ${item.reference}) in your archive and would like to check if you can source another piece for me. Thank you.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#f5deb3] bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Request Similar Model</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State for a brand with no deliveries yet */
        <div className="p-12 rounded-3xl bg-[#0e121b] border border-white/10 text-center space-y-4 max-w-xl mx-auto">
          <Sparkles className="w-10 h-10 text-[#c5a059] mx-auto opacity-70" />
          <h3 className="font-serif-luxury text-xl font-bold text-white">
            No {selectedBrand} Archive Found
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            We are continuously procuring and fulfilling client orders. If you are looking for a {selectedBrand} reference, our concierge team can source it directly for you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setSelectedBrand('All')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              View All Archived Brands
            </button>
          </div>
        </div>
      )}

      {/* Trust Callout */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141009] via-[#0d1017] to-[#07080b] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif-luxury text-xl font-bold text-slate-100">
            Have a watch in mind that you'd like delivered?
          </h3>
          <p className="text-xs text-slate-400 font-light">
            We source rare references and special allocations from authorized networks worldwide.
          </p>
        </div>

        <a
          href={deskWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-md transition-all shrink-0"
        >
          Contact Concierge Desk: {deskPhone}
        </a>
      </div>
    </section>
  );
};
