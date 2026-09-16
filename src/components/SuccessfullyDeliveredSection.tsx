import React from 'react';
import { DELIVERED_WATCHES, SITE_INFO } from '../data/goodtime';
import { CheckCircle, MapPin, Star, ShieldCheck, MessageCircle, PackageCheck, Quote, Calendar } from 'lucide-react';
import { DeliveredWatch } from '../types';

interface SuccessfullyDeliveredSectionProps {
  deliveredWatches?: DeliveredWatch[];
}

export const SuccessfullyDeliveredSection: React.FC<SuccessfullyDeliveredSectionProps> = ({
  deliveredWatches = DELIVERED_WATCHES
}) => {
  return (
    <section className="py-12 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#121622] via-[#0d1017] to-[#07080b] p-8 sm:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider uppercase">
            <PackageCheck className="w-3.5 h-3.5" />
            Verified Deliveries Across Bangladesh
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-slate-100">
            Successfully Delivered
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Browse our archive of sold luxury timepieces and authentic reviews from satisfied collectors in Dhaka, Chattogram, Sylhet, and across Bangladesh. Each piece was delivered in pristine condition with complete provenance.
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

      {/* Delivered Watches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deliveredWatches.map((item) => (
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
                    {[...Array(item.rating)].map((_, i) => (
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
                  href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Goodtime Watch SG,\n\nI saw your successfully delivered ${item.brand} ${item.model} (Ref: ${item.reference}) and would like to check if you can source another piece for me. Thank you.`
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

      {/* Trust Callout */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141009] via-[#0d1017] to-[#07080b] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif-luxury text-xl font-bold text-slate-100">
            Have a watch in mind that you'd like delivered?
          </h3>
          <p className="text-xs text-slate-400 font-light">
            We source rare references and special allocations from authorized networks worldwide.
          </p>
        </div>

        <a
          href={SITE_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-md transition-all shrink-0"
        >
          Contact Concierge Desk: {SITE_INFO.phoneDisplay}
        </a>
      </div>

    </section>
  );
};
