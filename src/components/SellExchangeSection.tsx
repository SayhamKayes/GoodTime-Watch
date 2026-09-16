import React, { useState } from 'react';
import { SITE_INFO } from '../data/goodtime';
import { generateSellExchangeWhatsAppLink } from '../utils/whatsapp';
import { RefreshCw, ArrowRightLeft, ShieldAlert, CheckCircle2, FileText, Camera, DollarSign, Clock, MessageCircle, AlertCircle } from 'lucide-react';

export const SellExchangeSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'Sell' | 'Exchange'>('Exchange');
  const [selectedBrand, setSelectedBrand] = useState<string>('Rolex');
  const [modelName, setModelName] = useState<string>('');
  const [condition, setCondition] = useState<string>('Excellent (Minor hairlines)');
  const [hasBoxPapers, setHasBoxPapers] = useState<string>('Full Set (Original Box & Warranty Card)');

  const handleLaunchWhatsApp = () => {
    const url = generateSellExchangeWhatsAppLink({
      brand: selectedBrand,
      model: modelName.trim() || 'Model to be shared via photos',
      condition,
      hasBoxPapers,
      inquiryType
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 sm:py-16 space-y-16">
      
      {/* Header Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#19130a] via-[#0d1017] to-[#07080b] p-8 sm:p-14">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#e6ca85]" />
            Sell or Trade Up Your Timepiece
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-slate-100">
            Sell & Exchange Concierge
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Upgrade your horological collection or monetize your pre-owned luxury timepiece with complete transparency, verified authenticity, and immediate settlement in Bangladesh.
          </p>

          <div className="pt-2">
            <a
              href={generateSellExchangeWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black/20" />
              <span>Submit Watch on WhatsApp: {SITE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4-Step Process Guide */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#c5a059] uppercase">
            How It Works
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-slate-100">
            Simple 4-Step Evaluation Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              icon: Camera,
              title: "Send Photos on WhatsApp",
              desc: "Take clear photos of the dial, caseback, bracelet, and original box/warranty card. Message them to our WhatsApp desk."
            },
            {
              step: "02",
              icon: Clock,
              title: "Preliminary Valuation",
              desc: "Within 2 hours, our valuation experts evaluate current global and local market value and share a transparent price quote."
            },
            {
              step: "03",
              icon: FileText,
              title: "Physical Inspection",
              desc: "Meet us in Dhaka or send via secured courier. Our watchmaker verifies movement accuracy, amplitude, and serial numbers."
            },
            {
              step: "04",
              icon: DollarSign,
              title: "Instant Cash or Trade Credit",
              desc: "Receive instant bank transfer or cash, or apply credit toward any watch in our New Arrivals catalog with bonus trade value."
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 space-y-3 relative overflow-hidden group hover:border-[#c5a059]/40 transition-colors">
                <span className="text-3xl font-serif-luxury font-bold text-white/5 absolute top-3 right-4">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#e6ca85]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-base font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules & Regulations Section (Requested specifically by user) */}
      <div className="rounded-3xl border border-white/10 bg-[#0a0d12] p-8 sm:p-12 space-y-8">
        
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            Terms of Transaction
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-slate-100">
            Sell & Exchange Rules & Regulations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
            Please review our strict standards and guidelines before submitting a timepiece for appraisal, sale, or trade-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Rule 1: Authenticity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">1</span>
              <h3 className="text-sm font-semibold text-slate-200">
                100% Authenticity Requirement
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              We exclusively transact genuine, original luxury timepieces. Watches with counterfeit parts, cloned movements, or fake dials are strictly rejected and will not be returned to the submitter without formal dispute verification.
            </p>
          </div>

          {/* Rule 2: Proof of Identity & Ownership */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">2</span>
              <h3 className="text-sm font-semibold text-slate-200">
                Proof of Identity & Clear Ownership
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              The seller must provide a valid government-issued photo ID (National ID Card or Passport). Stolen property checks are cross-referenced across global watch registries (The Watch Register).
            </p>
          </div>

          {/* Rule 3: Box & Papers Importance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">3</span>
              <h3 className="text-sm font-semibold text-slate-200">
                Box, Papers & Valuation Criteria
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              Timepieces with their original manufacturer presentation box, dated warranty card/certificate, serial tags, and extra links yield the highest trade valuations. "Watch-only" pieces are accepted subject to deeper verification.
            </p>
          </div>

          {/* Rule 4: Inspection Protocol */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">4</span>
              <h3 className="text-sm font-semibold text-slate-200">
                24-48 Hour Testing & Timing Tolerance
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              Our in-house master horologist conducts a multi-point inspection including amplitude, beat error, water resistance gaskets, and casing wear before final settlement is disbursed.
            </p>
          </div>

          {/* Rule 5: Payout Methods */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">5</span>
              <h3 className="text-sm font-semibold text-slate-200">
                Instant Settlement & Exchange Credit
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              Payment is disbursed immediately upon verification via direct bank transfer, BEFTN/RTGS, or cash handover in Dhaka. For exchanges, trade-in credit receives a preferential 5% value bonus against any in-stock model.
            </p>
          </div>

          {/* Rule 6: Quote Validity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-mono font-bold">6</span>
              <h3 className="text-sm font-semibold text-slate-200">
                7-Day Valuation Validity
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
              Preliminary valuations provided over WhatsApp are valid for 7 business days from issuance, reflecting international secondary market currency fluctuations and precious metal spot values.
            </p>
          </div>

        </div>

      </div>

      {/* Interactive WhatsApp Submission Tool */}
      <div className="rounded-3xl border border-[#c5a059]/30 bg-gradient-to-b from-[#121622] to-[#0a0d12] p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#c5a059]">
            Direct WhatsApp Submission
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-slate-100">
            Submit Your Watch for Valuation
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Fill in the details below. Clicking the submit button will automatically format your request and open a direct chat with Goodtime Watch SG on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Service Option */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              I Want To:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInquiryType('Exchange')}
                className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  inquiryType === 'Exchange'
                    ? 'bg-[#c5a059] text-black border-[#c5a059]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Exchange / Trade-In
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('Sell')}
                className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  inquiryType === 'Sell'
                    ? 'bg-[#c5a059] text-black border-[#c5a059]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Sell for Cash
              </button>
            </div>
          </div>

          {/* Watch Brand */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Watch Brand:
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-3 px-4 bg-[#121620] rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            >
              {['Rolex', 'OMEGA', 'Tudor', 'Cartier', 'Grand Seiko', 'Breitling', 'TAG Heuer', 'Longines', 'Tissot', 'Seiko', 'Casio / G-SHOCK', 'Citizen', 'Orient', 'Hamilton', 'Rado', 'Other Luxury Brand'].map((b) => (
                <option key={b} value={b} className="bg-[#121620] text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Model / Reference */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Model Name / Reference Number:
            </label>
            <input
              type="text"
              placeholder="e.g. Submariner 116610LN or PRX Powermatic"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full py-3 px-4 bg-[#121620] rounded-xl border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Box & Papers */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Box & Papers:
            </label>
            <select
              value={hasBoxPapers}
              onChange={(e) => setHasBoxPapers(e.target.value)}
              className="w-full py-3 px-4 bg-[#121620] rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="Full Set (Original Box & Warranty Card)">Full Set (Original Box & Warranty Card)</option>
              <option value="Watch & Original Box Only">Watch & Original Box Only</option>
              <option value="Watch Only (No Box or Papers)">Watch Only (No Box or Papers)</option>
            </select>
          </div>

        </div>

        {/* Condition selection */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-mono uppercase text-slate-400 block">
            Watch Condition:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              "Unworn / Like New",
              "Excellent (Minor hairlines)",
              "Very Good (Light signs of wear)",
              "Fair / Well-Loved"
            ].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={`p-2.5 rounded-xl text-[11px] text-center transition-all border ${
                  condition === c
                    ? 'bg-[#c5a059]/20 text-[#f5deb3] border-[#c5a059] font-medium'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Submit to WhatsApp Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fast response via WhatsApp desk within 2 hours.</span>
          </div>

          <button
            type="button"
            onClick={handleLaunchWhatsApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-black/20" />
            <span>Send Details on WhatsApp ({SITE_INFO.phoneDisplay})</span>
          </button>
        </div>

      </div>

    </section>
  );
};
