import React from 'react';
import { SITE_INFO as DEFAULT_SITE_INFO } from '../data/goodtime';
import { ShieldCheck, Clock, Award, Phone, Mail, MapPin, MessageCircle, Truck, CheckCircle2 } from 'lucide-react';
import { NavigationTab, SiteInfo } from '../types';

interface AboutSectionProps {
  onNavigateTab: (tab: NavigationTab) => void;
  siteInfo?: SiteInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateTab, siteInfo }) => {
  const currentSiteInfo = siteInfo || DEFAULT_SITE_INFO;
  return (
    <section className="py-12 sm:py-16 space-y-16">

      {/* Brand Hero & Introduction */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#121622] via-[#0d1017] to-[#07080b] p-8 sm:p-14">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-widest uppercase">
            Curated Destination • Bangladesh
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-100 leading-tight">
            About <span className="text-[#e6ca85]">Goodtime Watch SG</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Goodtime Watch SG is a curated destination for exceptional timepieces. We bring together celebrated watch brands — from everyday icons to rare collector statements — for discerning customers across Bangladesh.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('new-arrival')}
              className="px-6 py-3 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg transition-all"
            >
              Explore New Arrivals →
            </button>
            <a
              href={currentSiteInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-semibold text-[#f5deb3] bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#c5a059]" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card 1: Our Story */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1017]/80 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6ca85]">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-slate-100">
            Our Story
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            We are Bangladesh's most trusted destination for luxury timepieces. From Rolex to Patek Philippe, Audemars Piguet to Richard Mille we deal in the world's most coveted watches. Every piece we carry is 100% authentic, verified and comes with complete documentation. Whether you're looking to buy, sell or exchange we make every transaction seamless, transparent and unforgettable. Because at Goodtime Watch SG we don't just deal in watches. We deal in legacy.
          </p>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            Time to Evolve.
          </p>
        </div>

        {/* Card 2: What We Believe */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1017]/80 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6ca85]">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-slate-100">
            What We Believe
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            A great watch is more than a way to tell time. It is craftsmanship, character, and quiet confidence. We select every single piece in our catalogue with that belief in mind.
          </p>
          <div className="space-y-2.5 pt-2">
            {[
              "100% Guaranteed Authenticity with verified serial inspection",
              "Transparent condition grading and detailed high-definition photography",
              "Personal WhatsApp consultation before any order is dispatched",
              "Fair, transparent valuations for pre-owned sales and watch exchanges"
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Store & Direct Contact Information */}
      <div className="rounded-3xl border border-[#c5a059]/25 bg-gradient-to-r from-[#141009] via-[#10131d] to-[#0a0d12] p-8 sm:p-12">
        <div className="max-w-4xl space-y-6">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#c5a059]">
            Direct Customer Concierge
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-slate-100">
            Talk to Our Team
          </h2>
          <p className="text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
            We are a dedicated, hands-on team. Reach us on WhatsApp, by phone, or email — a real horological advisor answers your questions personally.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#c5a059] text-xs font-mono">
                <Phone className="w-3.5 h-3.5" />
                <span>Phone Call</span>
              </div>
              <a
                href={`tel:${currentSiteInfo.aboutPhone || currentSiteInfo.phoneIntl}`}
                className="text-sm font-semibold text-white hover:text-[#e6ca85] block"
              >
                {currentSiteInfo.aboutPhone || currentSiteInfo.phoneDisplay}
              </a>
              <span className="text-[10px] text-slate-400 block">Available 10 AM - 10 PM</span>
            </div>

            {/* WhatsApp */}
            <div className="p-4 rounded-2xl bg-black/40 border border-[#25D366]/30 space-y-1">
              <div className="flex items-center gap-2 text-[#25D366] text-xs font-mono">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Direct</span>
              </div>
              <a
                href={
                  currentSiteInfo.aboutWhatsapp
                    ? `https://wa.me/${currentSiteInfo.aboutWhatsapp}`
                    : currentSiteInfo.whatsappLink
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#25D366] hover:underline block"
              >
                +{currentSiteInfo.aboutWhatsapp || currentSiteInfo.whatsappNumber}
              </a>
              <span className="text-[10px] text-slate-400 block">Instant Chat & Video Verification</span>
            </div>

            {/* Email */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#c5a059] text-xs font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>Official Email</span>
              </div>
              <a href={`mailto:${currentSiteInfo.email}`} className="text-xs font-semibold text-white hover:text-[#e6ca85] block truncate">
                {currentSiteInfo.email}
              </a>
              <span className="text-[10px] text-slate-400 block">Business & Trade Enquiries</span>
            </div>

            {/* Location & Delivery */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#c5a059] text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Coverage</span>
              </div>
              <span className="text-sm font-semibold text-white block">
                Dhaka & Nationwide
              </span>
              <span className="text-[10px] text-slate-400 block">Insured Handover in Bangladesh</span>
            </div>

          </div>
        </div>
      </div>

      {/* 4 Pillars of Goodtime Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: ShieldCheck,
            title: "Guaranteed Authenticity",
            desc: "Every timepiece is thoroughly examined for movement integrity, original components, and serial authenticity."
          },
          {
            icon: MessageCircle,
            title: "WhatsApp Ordering",
            desc: "Personalized one-on-one communication. We confirm condition, macro video clips, and payment terms before dispatch."
          },
          {
            icon: Truck,
            title: "Insured Delivery",
            desc: "Fast, secured transit across Dhaka and all 64 districts in Bangladesh with safe unboxing protocol."
          },
          {
            icon: Award,
            title: "Sell & Exchange",
            desc: "Fair, market-calibrated valuations to sell your timepiece or trade up to your next dream luxury watch."
          }
        ].map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-[#0a0d12]/70 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e6ca85]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-base font-semibold text-slate-200">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
