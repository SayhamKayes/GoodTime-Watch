import React from 'react';
import { UPCOMING_WATCHES } from '../data/goodtime';
import { generateUpcomingWhatsAppLink } from '../utils/whatsapp';
import { Plane, Calendar, Clock, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { UpcomingWatch } from '../types';

interface UpcomingSectionProps {
  upcomingWatches?: UpcomingWatch[];
}

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({
  upcomingWatches = UPCOMING_WATCHES
}) => {
  return (
    <section className="py-12 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#16120b] via-[#0d1017] to-[#07080b] p-8 sm:p-12">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase">
            <Plane className="w-3.5 h-3.5 text-[#e6ca85]" />
            In Transit & Future Allocations
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-slate-100">
            Upcoming Timepieces
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            These exceptional watches are currently en route to Dhaka or scheduled in upcoming partner shipments from Switzerland and Japan. Reserve your piece before arrival to guarantee priority allocation.
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Full Box & Authenticity Papers</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Pre-Booking Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingWatches.map((watch) => (
          <div
            key={watch.id}
            className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#121622]/90 to-[#090b0e] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            {/* Image & Badges */}
            <div className="relative aspect-[16/10] bg-[#07090e] overflow-hidden">
              <img
                src={watch.image}
                alt={`${watch.brand} ${watch.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#1c1409]/90 text-[#f5deb3] border border-[#c5a059]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3 h-3 text-[#e6ca85]" />
                  {watch.statusBadge}
                </span>
              </div>

              {/* Expected Arrival Pill */}
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

            {/* Content Details */}
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
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

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {watch.description}
                </p>

                {/* Key horological feature */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#c5a059] block">
                    Highlight
                  </span>
                  <p className="text-[11px] font-medium text-slate-200">
                    {watch.keyFeature}
                  </p>
                </div>

                {/* Technical Specs */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">Movement</span>
                    <span className="truncate block">{watch.movement}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">Case / Dial</span>
                    <span className="truncate block">{watch.caseSize} • {watch.dialColor}</span>
                  </div>
                </div>
              </div>

              {/* Allocation & WhatsApp Pre-book */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">
                    Allocation
                  </span>
                  <span className="text-xs font-semibold text-[#e6ca85]">
                    Price on Request
                  </span>
                </div>

                <a
                  href={generateUpcomingWhatsAppLink(watch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black/20" />
                  <span>Pre-book on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Pre-order Policy Footnote */}
      <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 text-xs text-slate-400 space-y-2">
        <h4 className="font-semibold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
          How Pre-Booking Works
        </h4>
        <p className="font-light leading-relaxed">
          Pre-booking an upcoming timepiece places you first in line for allocation upon arrival in Dhaka. We will provide high-definition unboxing videos and timegrapher readings to you via WhatsApp before dispatch.
        </p>
      </div>

    </section>
  );
};
