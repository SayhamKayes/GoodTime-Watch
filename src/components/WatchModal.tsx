import React, { useState } from 'react';
import { WatchProduct } from '../types';
import { generateProductWhatsAppLink } from '../utils/whatsapp';
import { X, MessageCircle, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface WatchModalProps {
  product: WatchProduct | null;
  onClose: () => void;
}

export const WatchModal: React.FC<WatchModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = product.images.length > 0 ? product.images : [];

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      
      {/* Sticky Close Button - Fixed to viewport */}
      <button
        onClick={onClose}
        aria-label="Close Modal"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[110] p-2.5 rounded-full bg-black/80 text-slate-200 hover:text-white hover:bg-black border border-white/20 transition-all shadow-xl backdrop-blur-md"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div 
        className="relative w-full max-w-4xl bg-[#0d1017] rounded-3xl border border-white/15 shadow-2xl overflow-hidden m-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Viewer */}
          <div className="p-6 sm:p-8 bg-[#07090d] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            
            {/* Main Active Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
              <img
                src={images[activeImgIndex] || images[0]}
                alt={`${product.brandName} ${product.name}`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {images.length > 1 && (
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 pointer-events-auto border border-white/20 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 pointer-events-auto border border-white/20 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border shrink-0 transition-all ${
                      activeImgIndex === idx
                        ? 'border-[#c5a059] scale-105 shadow-md'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Guarantee Note */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>100% Guaranteed Authentic with Warranty</span>
            </div>

          </div>

          {/* Right Column: Details & Specs */}
          <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Brand & Reference */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#c5a059] font-medium tracking-widest uppercase">
                  {product.brandName}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Ref. {product.reference}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100">
                {product.name} {product.model}
              </h2>

              {/* Price & Availability */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Pricing & Allocation
                  </span>
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#e6ca85]">
                    Available on Request
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {product.availability}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Specification Table */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#c5a059]">
                  Technical Specifications
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Movement</span>
                    <span className="text-slate-200 block truncate">{product.movement}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Case Diameter</span>
                    <span className="text-slate-200 block">{product.caseSizeMm} mm</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Case Material</span>
                    <span className="text-slate-200 block truncate">{product.caseMaterial}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Dial Color</span>
                    <span className="text-slate-200 block">{product.dialColor}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Strap / Bracelet</span>
                    <span className="text-slate-200 block truncate">{product.strapMaterial}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-slate-500 text-[10px] uppercase block">Water Resistance</span>
                    <span className="text-slate-200 block">{product.waterResistance}</span>
                  </div>
                </div>
              </div>

              {/* Perks */}
              <div className="space-y-1.5 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Physical check & unboxing confirmation before dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nationwide insured delivery across Bangladesh</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={generateProductWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-black/20" />
                <span>Order Now on WhatsApp</span>
              </a>

              <p className="text-[10px] text-slate-500 text-center font-mono">
                Clicking opens WhatsApp with pre-filled model & reference details.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
