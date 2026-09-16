import React, { useState, useMemo } from 'react';
import { WatchProduct } from '../types';
import { ALL_PRODUCTS } from '../data/goodtime';
import { generateProductWhatsAppLink } from '../utils/whatsapp';
import { MessageCircle, Search, Eye, Sparkles, Filter } from 'lucide-react';
import { isProductNewArrival } from '../utils/productUtils';

interface NewArrivalsSectionProps {
  products?: WatchProduct[];
  onSelectProduct: (product: WatchProduct) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ 
  products = ALL_PRODUCTS,
  onSelectProduct 
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique brands from products
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => brandSet.add(p.brandName));
    return Array.from(brandSet).sort();
  }, [products]);

  // Filter products: prefer new arrivals first, or filter based on user selection
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = selectedBrand === 'all' || product.brandName === selectedBrand;
      
      const matchesStyle = selectedStyle === 'all' || 
        product.styles.some(s => s.toLowerCase() === selectedStyle.toLowerCase()) ||
        product.tags.some(t => t.toLowerCase() === selectedStyle.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        product.name.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query) ||
        product.brandName.toLowerCase().includes(query) ||
        product.reference.toLowerCase().includes(query) ||
        product.movement.toLowerCase().includes(query) ||
        product.dialColor.toLowerCase().includes(query);

      return matchesBrand && matchesStyle && matchesQuery;
    });
  }, [products, selectedBrand, selectedStyle, searchQuery]);

  return (
    <section className="py-12 sm:py-16 space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e6ca85]" />
            Fresh From Geneva, Japan & Switzerland
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-slate-100">
            New Arrivals
          </h1>
          <p className="text-sm text-slate-400 font-light max-w-xl leading-relaxed">
            Discover the latest curated additions to Goodtime Watch SG. From pristine luxury chronometers to everyday automatic icons, ready for immediate delivery across Bangladesh.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Showing:</span>
          <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f5deb3] font-semibold">
            {filteredProducts.length} Timepieces
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 bg-[#0a0d12]/80 p-5 rounded-2xl border border-white/10">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search New Arrivals by model, reference, brand (e.g., Speedmaster, Submariner, PRX, Presage)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#121620] rounded-xl border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Brand Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-[11px] font-mono uppercase text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#c5a059]" /> Brand:
          </span>

          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded-lg text-xs shrink-0 transition-all font-medium ${
              selectedBrand === 'all'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            All Brands ({products.length})
          </button>

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs shrink-0 transition-all font-medium ${
                selectedBrand === brand
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Quick Style Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="text-[11px] font-mono uppercase text-slate-500 shrink-0">Style:</span>
          {['all', 'Diver', 'Chronograph', 'Dress', 'Sport', 'Classic'].map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                selectedStyle === style
                  ? 'text-[#f5deb3] bg-[#c5a059]/20 border border-[#c5a059]/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {style === 'all' ? 'All Styles' : style}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#11141d] to-[#0a0c10] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              
              {/* Product Image Box */}
              <div className="relative aspect-[4/3] bg-[#07090d] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                <img
                  src={product.images[0]}
                  alt={`${product.brandName} ${product.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {isProductNewArrival(product) && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#c5a059] text-black tracking-wider uppercase">
                      New Arrival
                    </span>
                  )}
                  {product.isLuxury && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 text-[#e6ca85] border border-[#c5a059]/40 tracking-wider uppercase backdrop-blur-sm">
                      Luxury
                    </span>
                  )}
                </div>

                {/* Availability Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md ${
                    product.availability === 'In Stock'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                  }`}>
                    {product.availability}
                  </span>
                </div>

                {/* Quick View Overlay Icon */}
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

                {/* Specs Chips */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {product.movement}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {product.caseSizeMm}mm
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {product.waterResistance}
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
                    <span>Order</span>
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#0a0d12] border border-white/10 space-y-3">
          <p className="text-slate-300 font-serif-luxury text-lg">
            No timepieces found matching "{searchQuery || selectedBrand}"
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your filters or search query to browse all available timepieces.
          </p>
          <button
            onClick={() => {
              setSelectedBrand('all');
              setSelectedStyle('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs bg-[#c5a059] text-black font-semibold hover:bg-[#d4af37] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
