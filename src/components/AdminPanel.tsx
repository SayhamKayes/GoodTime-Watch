import React, { useState, useEffect, useRef } from 'react';
import { WatchProduct, UpcomingWatch, DeliveredWatch, AuthorizedBrand, SiteInfo, NavigationTab } from '../types';
import {
  getAdminPasscode,
  setAdminPasscode,
  validateAdminPassword,
  setAdminAuthenticated,
  saveStoredProducts,
  saveStoredUpcoming,
  saveStoredDelivered,
  saveStoredBrands,
  saveStoredSiteInfo,
  resetAllCatalogData
} from '../utils/storage';
import {
  syncSaveProduct,
  syncDeleteProduct,
  syncSaveUpcoming,
  syncDeleteUpcoming,
  syncSaveDelivered,
  syncDeleteDelivered,
  syncSaveBrands,
  syncSaveSiteSettings
} from '../services/api';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Check,
  AlertTriangle,
  X,
  Search,
  Eye,
  LogOut,
  ArrowLeft,
  Package,
  Plane,
  CheckCircle,
  Key,
  Download,
  Upload,
  Clock,
  Sparkles,
  Tag,
  Sliders,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  Type,
  MessageCircle,
  Layers,
  Globe,
  FileText
} from 'lucide-react';

interface AdminPanelProps {
  products: WatchProduct[];
  upcomingWatches: UpcomingWatch[];
  deliveredWatches: DeliveredWatch[];
  brands: AuthorizedBrand[];
  siteInfo: SiteInfo;
  onUpdateProducts: (products: WatchProduct[]) => void;
  onUpdateUpcoming: (upcoming: UpcomingWatch[]) => void;
  onUpdateDelivered: (delivered: DeliveredWatch[]) => void;
  onUpdateBrands: (brands: AuthorizedBrand[]) => void;
  onUpdateSiteInfo: (siteInfo: SiteInfo) => void;
  onExitAdmin: () => void;
}

type AdminTab = 'products' | 'upcoming' | 'delivered' | 'slider' | 'brands' | 'contact' | 'security';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  upcomingWatches,
  deliveredWatches,
  brands,
  siteInfo,
  onUpdateProducts,
  onUpdateUpcoming,
  onUpdateDelivered,
  onUpdateBrands,
  onUpdateSiteInfo,
  onExitAdmin
}) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Section
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Arrivals Edit/Add Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<WatchProduct | null>(null);
  const [productForm, setProductForm] = useState<Partial<WatchProduct>>({
    name: '',
    brandId: 'rolex',
    brandName: 'Rolex',
    model: '',
    reference: '',
    movement: 'Automatic, Self-Winding',
    caseSizeMm: 40,
    caseMaterial: 'Oystersteel (904L Stainless Steel)',
    strapMaterial: 'Oystersteel Bracelet',
    dialColor: 'Black',
    waterResistance: '300m / 1,000ft',
    description: '',
    images: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop'],
    availability: 'In Stock',
    isNew: true
  });

  // Upcoming Watch Edit/Add Modal State
  const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);
  const [editingUpcoming, setEditingUpcoming] = useState<UpcomingWatch | null>(null);
  const [upcomingForm, setUpcomingForm] = useState<Partial<UpcomingWatch>>({
    brand: 'Rolex',
    model: '',
    reference: '',
    expectedArrival: 'Next Week',
    statusBadge: 'In Transit',
    caseSize: '41mm',
    dialColor: 'Black',
    movement: 'Automatic Calibre',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    description: '',
    keyFeature: 'Full factory presentation with 5-year warranty'
  });

  // Delivered Watch Edit/Add Modal State
  const [isDeliveredModalOpen, setIsDeliveredModalOpen] = useState(false);
  const [editingDelivered, setEditingDelivered] = useState<DeliveredWatch | null>(null);
  const [deliveredForm, setDeliveredForm] = useState<Partial<DeliveredWatch>>({
    brand: 'Rolex',
    model: '',
    reference: '',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop',
    deliveryLocation: 'Gulshan-2, Dhaka',
    deliveredDate: 'March 2025',
    clientName: 'Verified Collector',
    clientReview: 'Exceptional service and authentic piece verified at official center.',
    rating: 5
  });

  // Brand Edit/Add Modal State
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AuthorizedBrand | null>(null);
  const [brandForm, setBrandForm] = useState<Partial<AuthorizedBrand>>({
    name: '',
    logo: '',
    font: 'font-serif',
    color: '#e6ca85'
  });

  // Contact / Concierge State
  const [contactForm, setContactForm] = useState<SiteInfo>(siteInfo);

  useEffect(() => {
    setContactForm(siteInfo);
  }, [siteInfo]);

  // Passcode Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');
  const [passChangeError, setPassChangeError] = useState('');

  // Confirmation modal for deleting or resetting
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'product' | 'upcoming' | 'delivered' | 'brand' | 'reset';
    id?: string;
    title: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminPassword(passcode)) {
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      setAuthError('');
      showToast('Admin Portal Authenticated Successfully');
    } else {
      setAuthError('Invalid administrator security key. Please check your passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
    setPasscode('');
    onExitAdmin();
  };

  // -------------------------------------------------------------
  // CRUD FOR PRODUCTS (New Arrivals)
  // -------------------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      brandId: 'rolex',
      brandName: 'Rolex',
      model: '',
      reference: '',
      movement: 'Automatic Mechanical',
      caseSizeMm: 41,
      caseMaterial: 'Stainless Steel / Ceramic',
      strapMaterial: 'Oystersteel Bracelet',
      dialColor: 'Black',
      waterResistance: '100m / 330ft',
      description: '',
      images: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop'],
      availability: 'In Stock',
      isNew: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: WatchProduct) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.brandName || !productForm.model) {
      alert('Please fill in Watch Name, Brand, and Model.');
      return;
    }

    if (editingProduct) {
      // Update
      const updatedItem = { ...editingProduct, ...productForm } as WatchProduct;
      const updated = products.map((p) =>
        p.id === editingProduct.id ? updatedItem : p
      );
      onUpdateProducts(updated);
      saveStoredProducts(updated);
      syncSaveProduct(updatedItem);
      showToast(`Updated ${productForm.brandName} ${productForm.model}`);
    } else {
      // Add
      const bId = productForm.brandId || productForm.brandName.toLowerCase().replace(/\s+/g, '-');
      const newProd: WatchProduct = {
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: productForm.name || '',
        brandId: bId,
        brandName: productForm.brandName || '',
        model: productForm.model || '',
        reference: productForm.reference || 'Ref. N/A',
        gender: 'unisex',
        movement: productForm.movement || 'Automatic',
        caseSizeMm: Number(productForm.caseSizeMm) || 40,
        caseMaterial: productForm.caseMaterial || 'Stainless Steel',
        strapMaterial: productForm.strapMaterial || 'Oyster Bracelet',
        dialColor: productForm.dialColor || 'Black',
        waterResistance: productForm.waterResistance || '100m',
        description: productForm.description || 'Authentic luxury timepiece in pristine condition.',
        images: productForm.images?.length ? productForm.images : ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop'],
        availability: (productForm.availability as any) || 'In Stock',
        isNew: !!productForm.isNew,
        isFeaturedInHero: !!productForm.isFeaturedInHero,
        isBestSeller: false,
        isLuxury: true,
        styles: ['Luxury', 'Dress', 'Sport'],
        tags: [productForm.brandName, 'Automatic', 'Swiss Made'],
        rating: 5,
        reviewsCount: 1
      };
      const updated = [newProd, ...products];
      onUpdateProducts(updated);
      saveStoredProducts(updated);
      syncSaveProduct(newProd);
      showToast(`Added ${newProd.brandName} ${newProd.model}`);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    onUpdateProducts(updated);
    saveStoredProducts(updated);
    syncDeleteProduct(id);
    showToast('Watch deleted from inventory');
    setDeleteConfirm(null);
  };

  // -------------------------------------------------------------
  // HERO SLIDER CONTROLS
  // -------------------------------------------------------------
  const handleToggleHeroSlider = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isFeaturedInHero: !p.isFeaturedInHero } : p
    );
    onUpdateProducts(updated);
    saveStoredProducts(updated);
    const target = updated.find((p) => p.id === id);
    if (target) {
      syncSaveProduct(target);
    }
    if (target?.isFeaturedInHero) {
      showToast(`Added ${target.model} to Homepage Hero Slider`);
    } else {
      showToast(`Removed ${target?.model} from Hero Slider`);
    }
  };

  // -------------------------------------------------------------
  // BRAND MARQUEE CONTROLS
  // -------------------------------------------------------------
  const handleOpenAddBrand = () => {
    setEditingBrand(null);
    setBrandForm({
      name: '',
      logo: '',
      font: 'font-serif',
      color: '#e6ca85'
    });
    setIsBrandModalOpen(true);
  };

  const handleOpenEditBrand = (b: AuthorizedBrand) => {
    setEditingBrand(b);
    setBrandForm({ ...b });
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name?.trim()) {
      alert('Please enter a Brand Name.');
      return;
    }

    if (editingBrand) {
      const updated = brands.map((b) =>
        b.id === editingBrand.id
          ? ({ ...b, ...brandForm, name: brandForm.name!.trim(), logo: brandForm.logo?.trim() || undefined } as AuthorizedBrand)
          : b
      );
      onUpdateBrands(updated);
      saveStoredBrands(updated);
      syncSaveBrands(updated);
      showToast(`Updated brand ${brandForm.name}`);
    } else {
      const newBrand: AuthorizedBrand = {
        id: `brand_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: brandForm.name.trim(),
        logo: brandForm.logo?.trim() || undefined,
        font: brandForm.font || 'font-serif',
        color: brandForm.color || '#e6ca85'
      };
      const updated = [...brands, newBrand];
      onUpdateBrands(updated);
      saveStoredBrands(updated);
      syncSaveBrands(updated);
      showToast(`Added brand ${newBrand.name} to Marquee`);
    }
    setIsBrandModalOpen(false);
  };

  const handleDeleteBrand = (id: string) => {
    const updated = brands.filter((b) => b.id !== id);
    onUpdateBrands(updated);
    saveStoredBrands(updated);
    syncSaveBrands(updated);
    showToast('Brand removed from Marquee');
    setDeleteConfirm(null);
  };

  // -------------------------------------------------------------
  // CONTACT & CONCIERGE SETTINGS
  // -------------------------------------------------------------
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteInfo = {
      ...contactForm,
      topHeaderHotlineDisplay: contactForm.topHeaderHotlineDisplay || contactForm.phoneDisplay || '01327-426905',
      topHeaderHotlineDial: contactForm.topHeaderHotlineDial || contactForm.phoneIntl || '+8801327426905',
      topHeaderWhatsappNumber: contactForm.topHeaderWhatsappNumber || contactForm.whatsappNumber || '8801327426905',
      topHeaderWhatsappLink:
        contactForm.topHeaderWhatsappLink ||
        `https://wa.me/${contactForm.topHeaderWhatsappNumber || contactForm.whatsappNumber || '8801327426905'}`,
      floatingWhatsappDisplay: contactForm.floatingWhatsappDisplay || contactForm.phoneDisplay || '01327-426905',
      floatingWhatsappNumber: contactForm.floatingWhatsappNumber || contactForm.whatsappNumber || '8801327426905',
      floatingWhatsappLink:
        contactForm.floatingWhatsappLink ||
        `https://wa.me/${contactForm.floatingWhatsappNumber || contactForm.whatsappNumber || '8801327426905'}`
    };
    onUpdateSiteInfo(updated);
    saveStoredSiteInfo(updated);
    setContactForm(updated);
    syncSaveSiteSettings(updated);
    showToast('Contact and business concierge settings updated!');
  };

  // -------------------------------------------------------------
  // CRUD FOR UPCOMING WATCHES
  // -------------------------------------------------------------
  const handleOpenAddUpcoming = () => {
    setEditingUpcoming(null);
    setUpcomingForm({
      brand: 'Rolex',
      model: '',
      reference: '',
      expectedArrival: 'Next Week',
      statusBadge: 'In Transit',
      caseSize: '41mm',
      dialColor: 'Black',
      movement: 'Automatic Chronometer',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      description: 'Incoming priority allocation with box and warranty card.',
      keyFeature: 'Full Box & Authenticity Papers'
    });
    setIsUpcomingModalOpen(true);
  };

  const handleOpenEditUpcoming = (watch: UpcomingWatch) => {
    setEditingUpcoming(watch);
    setUpcomingForm({ ...watch });
    setIsUpcomingModalOpen(true);
  };

  const handleSaveUpcoming = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upcomingForm.brand || !upcomingForm.model) {
      alert('Please fill in Brand and Model.');
      return;
    }

    if (editingUpcoming) {
      const updatedItem = { ...editingUpcoming, ...upcomingForm } as UpcomingWatch;
      const updated = upcomingWatches.map((w) =>
        w.id === editingUpcoming.id ? updatedItem : w
      );
      onUpdateUpcoming(updated);
      saveStoredUpcoming(updated);
      syncSaveUpcoming(updatedItem);
      showToast(`Updated upcoming watch ${upcomingForm.model}`);
    } else {
      const newWatch: UpcomingWatch = {
        id: `upc_${Date.now()}`,
        brand: upcomingForm.brand || upcomingForm.brandName || '',
        brandId: upcomingForm.brandId || (upcomingForm.brandName || upcomingForm.brand || '').toLowerCase().replace(/\s+/g, '-'),
        brandName: upcomingForm.brandName || upcomingForm.brand || '',
        name: upcomingForm.name || '',
        model: upcomingForm.model || '',
        reference: upcomingForm.reference || 'Ref. N/A',
        expectedArrival: upcomingForm.expectedArrival || 'Next Week',
        expectedArrivalDate: upcomingForm.expectedArrivalDate || new Date().toISOString().split('T')[0],
        statusBadge: upcomingForm.statusBadge || 'In Transit',
        caseSize: upcomingForm.caseSize || `${upcomingForm.caseSizeMm || 40}mm`,
        caseSizeMm: upcomingForm.caseSizeMm || parseInt(upcomingForm.caseSize || '40') || 40,
        dialColor: upcomingForm.dialColor || 'Black',
        movement: upcomingForm.movement || 'Automatic',
        caseMaterial: upcomingForm.caseMaterial || 'Stainless Steel',
        strapMaterial: upcomingForm.strapMaterial || 'Stainless Steel',
        gender: upcomingForm.gender || 'men',
        image: upcomingForm.image || (upcomingForm.images && upcomingForm.images[0]) || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
        images: upcomingForm.images || (upcomingForm.image ? [upcomingForm.image] : []),
        description: upcomingForm.description || '',
        keyFeature: upcomingForm.keyFeature || 'Original Factory Box & Warranty'
      };
      const updated = [newWatch, ...upcomingWatches];
      onUpdateUpcoming(updated);
      saveStoredUpcoming(updated);
      syncSaveUpcoming(newWatch);
      showToast(`Added upcoming watch ${newWatch.model}`);
    }
    setIsUpcomingModalOpen(false);
  };

  const handleDeleteUpcoming = (id: string) => {
    const updated = upcomingWatches.filter((w) => w.id !== id);
    onUpdateUpcoming(updated);
    saveStoredUpcoming(updated);
    syncDeleteUpcoming(id);
    showToast('Upcoming watch removed');
    setDeleteConfirm(null);
  };

  // -------------------------------------------------------------
  // CRUD FOR DELIVERED WATCHES
  // -------------------------------------------------------------
  const handleOpenAddDelivered = () => {
    setEditingDelivered(null);
    setDeliveredForm({
      brand: 'Rolex',
      model: '',
      reference: '',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop',
      deliveryLocation: 'Gulshan, Dhaka',
      deliveredDate: 'Recent Delivery',
      clientName: 'Verified Collector',
      clientReview: 'Excellent communication and pristine watch in original condition.',
      rating: 5
    });
    setIsDeliveredModalOpen(true);
  };

  const handleOpenEditDelivered = (item: DeliveredWatch) => {
    setEditingDelivered(item);
    setDeliveredForm({ ...item });
    setIsDeliveredModalOpen(true);
  };

  const handleSaveDelivered = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveredForm.brand || !deliveredForm.model || !deliveredForm.clientReview) {
      alert('Please fill in Brand, Model, and Client Review.');
      return;
    }

    if (editingDelivered) {
      const updatedItem = { ...editingDelivered, ...deliveredForm } as DeliveredWatch;
      const updated = deliveredWatches.map((d) =>
        d.id === editingDelivered.id ? updatedItem : d
      );
      onUpdateDelivered(updated);
      saveStoredDelivered(updated);
      syncSaveDelivered(updatedItem);
      showToast(`Updated delivered review for ${deliveredForm.model}`);
    } else {
      const newDel: DeliveredWatch = {
        id: `del_${Date.now()}`,
        brand: deliveredForm.brand || '',
        model: deliveredForm.model || '',
        reference: deliveredForm.reference || 'Ref. N/A',
        image: deliveredForm.image || 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop',
        deliveryLocation: deliveredForm.deliveryLocation || 'Dhaka',
        deliveredDate: deliveredForm.deliveredDate || 'March 2025',
        clientName: deliveredForm.clientName || 'Private Collector',
        clientReview: deliveredForm.clientReview || 'Verified authentic purchase.',
        rating: deliveredForm.rating || 5,
        verifiedPurchase: true
      };
      const updated = [newDel, ...deliveredWatches];
      onUpdateDelivered(updated);
      saveStoredDelivered(updated);
      syncSaveDelivered(newDel);
      showToast(`Added delivered watch entry for ${newDel.model}`);
    }
    setIsDeliveredModalOpen(false);
  };

  const handleDeleteDelivered = (id: string) => {
    const updated = deliveredWatches.filter((d) => d.id !== id);
    onUpdateDelivered(updated);
    saveStoredDelivered(updated);
    syncDeleteDelivered(id);
    showToast('Delivered watch entry deleted');
    setDeleteConfirm(null);
  };

  // -------------------------------------------------------------
  // RESET ALL DATA TO DEFAULT
  // -------------------------------------------------------------
  const handleResetCatalog = () => {
    resetAllCatalogData();
    window.location.reload();
  };

  // -------------------------------------------------------------
  // PASSCODE CHANGE
  // -------------------------------------------------------------
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess('');

    if (!validateAdminPassword(currentPass)) {
      setPassChangeError('Current passcode is incorrect.');
      return;
    }

    if (newPass.length < 4) {
      setPassChangeError('New passcode must be at least 4 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      setPassChangeError('New passcode and confirmation do not match.');
      return;
    }

    setAdminPasscode(newPass);
    setPassChangeSuccess('Admin security passcode updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    showToast('Passcode updated successfully');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Export & Import Catalog
  const handleExportJSON = () => {
    const data = {
      products,
      upcomingWatches,
      deliveredWatches,
      brands,
      siteInfo,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `goodtime_catalog_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Catalog exported as JSON');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (parsed.products && Array.isArray(parsed.products)) {
          onUpdateProducts(parsed.products);
          saveStoredProducts(parsed.products);
        }
        if (parsed.upcoming && Array.isArray(parsed.upcoming)) {
          onUpdateUpcoming(parsed.upcoming);
          saveStoredUpcoming(parsed.upcoming);
        } else if (parsed.upcomingWatches && Array.isArray(parsed.upcomingWatches)) {
          onUpdateUpcoming(parsed.upcomingWatches);
          saveStoredUpcoming(parsed.upcomingWatches);
        }
        if (parsed.delivered && Array.isArray(parsed.delivered)) {
          onUpdateDelivered(parsed.delivered);
          saveStoredDelivered(parsed.delivered);
        } else if (parsed.deliveredWatches && Array.isArray(parsed.deliveredWatches)) {
          onUpdateDelivered(parsed.deliveredWatches);
          saveStoredDelivered(parsed.deliveredWatches);
        }
        if (parsed.brands && Array.isArray(parsed.brands)) {
          onUpdateBrands(parsed.brands);
          saveStoredBrands(parsed.brands);
        }
        if (parsed.siteInfo && typeof parsed.siteInfo === 'object') {
          onUpdateSiteInfo(parsed.siteInfo);
          saveStoredSiteInfo(parsed.siteInfo);
        }

        showToast('Catalog, brands, and contact settings successfully restored!');
      } catch (err) {
        console.error(err);
        alert('Invalid JSON file format. Please check the backup file.');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Filtered products list for search
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.reference.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // AUTHENTICATION LOGIN SCREEN IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-[#141824] to-[#090b10] border border-white/10 p-8 shadow-2xl space-y-6 relative overflow-hidden">

          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#e6ca85] mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>

            <h1 className="font-serif-luxury text-2xl font-bold text-white">
              Secured Admin Portal
            </h1>

            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Authorized access only. Enter your administrator passcode to manage inventory, upcoming timepieces, and client archives.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 block">
                Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode (Default: admin123)"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  autoFocus
                />
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                Default system key: <code className="text-[#e6ca85]">admin123</code>
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 text-center">
            <button
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 pb-16">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#c5a059] text-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header Bar */}
      <div className="rounded-3xl border border-white/10 bg-[#0d1017] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e6ca85]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authorized Management System</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Goodtime Watch SG • Catalog Admin
          </h1>
          <p className="text-xs text-slate-400">
            Real-time management for New Arrivals, Upcoming pieces, and Delivered archives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto">
          <button
            onClick={onExitAdmin}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#c5a059]" />
            <span>Storefront</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>New Arrivals ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('slider')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'slider'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Hero Slider ({products.filter((p) => p.isFeaturedInHero).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('brands')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'brands'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Brand Marquee ({brands.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Upcoming Watches ({upcomingWatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'delivered'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Delivered Archive ({deliveredWatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'contact'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact & Concierge</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'security'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Security & Backup</span>
        </button>
      </div>

      {/* ------------------------------------------------------ */}
      {/* TAB 1: PRODUCTS / NEW ARRIVALS */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by brand, model, or ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Watch</span>
              </button>
            </div>
          </div>

          {/* Table of products */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0f16] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-black/40 text-[11px] font-mono uppercase text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Watch</th>
                    <th className="py-3.5 px-4">Reference</th>
                    <th className="py-3.5 px-4">Specs</th>
                    <th className="py-3.5 px-4">Availability</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover bg-black border border-white/10 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-mono text-[10px] text-[#c5a059] block uppercase">
                              {prod.brandName}
                            </span>
                            <span className="font-semibold text-white block">
                              {prod.model}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">
                              {prod.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-300">
                        {prod.reference}
                      </td>

                      <td className="py-3 px-4 text-slate-400 space-y-0.5">
                        <span className="block font-mono text-[11px] text-slate-300">
                          {prod.movement}
                        </span>
                        <span className="block text-[10px]">
                          {prod.caseSizeMm}mm • {prod.dialColor}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                          {prod.availability}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#e6ca85] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({
                              type: 'product',
                              id: prod.id,
                              title: `${prod.brandName} ${prod.model}`
                            })}
                            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-mono text-xs">
                        No watches found matching "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB 2: UPCOMING WATCHES */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-serif-luxury text-lg font-bold">Upcoming Allocations</h2>
              <p className="text-xs text-slate-400">Watches scheduled for shipment or arriving soon.</p>
            </div>
            <button
              onClick={handleOpenAddUpcoming}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Upcoming Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWatches.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-white/10 bg-[#0d1017] p-4 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={w.image}
                    alt={w.model}
                    className="w-20 h-20 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#c5a059] uppercase block font-semibold">
                      {w.brand}
                    </span>
                    <h3 className="font-serif-luxury font-bold text-white text-sm">
                      {w.model}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Ref. {w.reference}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#e6ca85] border border-white/10 mt-1">
                      ETA: {w.expectedArrival}
                      {w.expectedArrivalDate && (
                        <span className="ml-1 text-emerald-400">
                          ({Math.max(0, Math.ceil((new Date(w.expectedArrivalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days left)
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Status: <span className="text-slate-200">{w.statusBadge}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditUpcoming(w)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#e6ca85]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({
                        type: 'upcoming',
                        id: w.id,
                        title: `${w.brand} ${w.model}`
                      })}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB 3: DELIVERED ARCHIVE */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'delivered' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-serif-luxury text-lg font-bold">Successfully Delivered Archive</h2>
              <p className="text-xs text-slate-400">Sold luxury timepieces and verified client reviews.</p>
            </div>
            <button
              onClick={handleOpenAddDelivered}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Delivered Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveredWatches.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0d1017] p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.model}
                      className="w-16 h-16 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] text-[#c5a059] uppercase block">
                        {item.brand}
                      </span>
                      <h3 className="font-serif-luxury font-bold text-white text-sm">
                        {item.model}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 block">
                        Location: {item.deliveryLocation}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Date: {item.deliveredDate}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-200 flex items-center justify-between">
                      <span>{item.clientName}</span>
                      <span className="text-amber-400 font-mono">★ {item.rating}/5</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{item.clientReview}"</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditDelivered(item)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#e6ca85]"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({
                      type: 'delivered',
                      id: item.id,
                      title: `${item.brand} ${item.model}`
                    })}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB 4: SECURITY & BACKUP */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Change Passcode Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1017] p-6 space-y-5">
            <div className="space-y-1">
              <h2 className="text-white font-serif-luxury text-lg font-bold flex items-center gap-2">
                <Key className="w-4 h-4 text-[#c5a059]" />
                <span>Update Administrator Passcode</span>
              </h2>
              <p className="text-xs text-slate-400">
                Change the passcode required to unlock this admin panel.
              </p>
            </div>

            <form onSubmit={handleChangePasscode} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 block">Current Passcode</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter current passcode"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 block">New Passcode</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new security key"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 block">Confirm New Passcode</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new passcode"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {passChangeError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                  {passChangeError}
                </div>
              )}

              {passChangeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{passChangeSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-bold hover:brightness-110 transition-all"
              >
                Update Security Key
              </button>
            </form>
          </div>

          {/* Backup & Factory Reset Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1017] p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-white font-serif-luxury text-lg font-bold flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#c5a059]" />
                  <span>Data Backup & Export</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Export all catalog items, upcoming watches, and client testimonials as a portable JSON file.
                </p>
              </div>

              <button
                onClick={handleExportJSON}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#c5a059]" />
                <span>Export Full Catalog Backup (.JSON)</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-xl bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 text-[#e6ca85] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4 text-[#c5a059]" />
                <span>Import / Restore Catalog Backup (.JSON)</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="space-y-1">
                <h3 className="text-red-400 font-serif-luxury text-base font-bold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reset the website's catalog, upcoming watches, and reviews back to the original demo dataset. All custom changes in local storage will be cleared.
                </p>
              </div>

              <button
                onClick={() => setDeleteConfirm({
                  type: 'reset',
                  title: 'Entire Catalog Reset to Factory Default'
                })}
                className="py-2.5 px-4 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Data to Defaults</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB: HERO SLIDER MANAGEMENT */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'slider' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#c5a059]/30 bg-gradient-to-r from-[#141824] via-[#0d1017] to-[#141824] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6ca85]">
                <Sliders className="w-4 h-4 text-[#c5a059]" />
                <span>Storefront 5-Second Carousel Showcase</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                Homepage Hero Slider Controls
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Select which luxury timepieces appear in the rotating 5-second hero carousel on the public homepage. Toggle any watch on or off with a single click. If no watches are selected, the storefront will display the first 3 catalog items by default.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-center">
                <span className="block text-[11px] font-mono text-slate-400">Featured in Slider</span>
                <span className="text-xl font-bold font-mono text-[#e6ca85]">
                  {products.filter((p) => p.isFeaturedInHero).length} <span className="text-xs font-normal text-slate-400">pieces</span>
                </span>
              </div>
            </div>
          </div>

          {/* Currently Active in Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>Currently Active in Hero Carousel</span>
              </h3>
              <span className="text-xs text-slate-400">
                Rotates every 5 seconds on the public storefront
              </span>
            </div>

            {products.filter((p) => p.isFeaturedInHero).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-xs text-slate-400">
                No watches are currently marked for the Hero Slider. (The homepage is currently displaying the first 3 inventory items as fallback). Click <strong>"Add to Hero Slider"</strong> on any timepiece below to feature it.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.isFeaturedInHero)
                  .map((watch) => (
                    <div
                      key={watch.id}
                      className="rounded-2xl border border-[#c5a059]/40 bg-[#0d1017] p-4 flex flex-col justify-between space-y-3 shadow-lg relative group"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10">
                          <img
                            src={watch.images[0]}
                            alt={watch.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#c5a059] text-black font-bold font-mono text-[9px] uppercase tracking-wider shadow">
                            Active in Hero
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">
                            {watch.brandName}
                          </span>
                          <h4 className="text-xs font-bold text-white truncate">{watch.model}</h4>
                          <p className="text-[11px] font-mono text-slate-400 truncate">{watch.reference}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleHeroSlider(watch.id)}
                        className="w-full py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove from Slider</span>
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Catalog selector table */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Full Catalog Picker</h3>
                <p className="text-xs text-slate-400">Toggle any timepiece to include or exclude it from the Hero Slider.</p>
              </div>

              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c0f16] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-black/40 text-[11px] font-mono uppercase text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Watch</th>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Hero Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((p) => {
                      const isFeatured = !!p.isFeaturedInHero;
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover bg-black border border-white/10 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="font-mono text-[10px] text-[#c5a059] block uppercase">
                                  {p.brandName}
                                </span>
                                <span className="font-bold text-white text-xs">{p.model}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-400">{p.reference}</td>
                          <td className="py-3 px-4">
                            {isFeatured ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c5a059]/20 text-[#e6ca85] border border-[#c5a059]/40 font-mono text-[10px] font-bold">
                                <Check className="w-3 h-3 text-[#c5a059]" /> In Hero Slider
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono text-[10px]">
                                Not in Slider
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleToggleHeroSlider(p.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                isFeatured
                                  ? 'bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30'
                                  : 'bg-[#c5a059]/15 hover:bg-[#c5a059]/25 text-[#e6ca85] border border-[#c5a059]/40'
                              }`}
                            >
                              {isFeatured ? 'Remove' : '+ Add to Slider'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB: BRAND MARQUEE MANAGEMENT */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0d1017] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6ca85]">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>Homepage Section 2 Showcase</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                Authorized Luxury Brands Marquee
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Manage the luxury brand items that smoothly scroll across Section 2 of your storefront homepage. Brands can display an official transparent image logo URL or an elegant luxury typographic title.
              </p>
            </div>

            <button
              onClick={handleOpenAddBrand}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Brand</span>
            </button>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="rounded-2xl border border-white/10 bg-[#0c0f16] p-5 flex flex-col justify-between space-y-4 hover:border-[#c5a059]/40 transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  {/* Brand Display Preview Box */}
                  <div className="h-24 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center p-3 relative overflow-hidden">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-12 max-w-[130px] object-contain drop-shadow"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span
                        className={`${brand.font || 'font-serif'} text-lg font-bold tracking-widest text-center`}
                        style={{ color: brand.color || '#e6ca85' }}
                      >
                        {brand.name}
                      </span>
                    )}

                    <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400">
                      {brand.logo ? 'Logo Image' : 'Typography Text'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{brand.name}</h3>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {brand.logo ? `Image: ${brand.logo}` : `Font: ${brand.font || 'font-serif'} • Color: ${brand.color || '#e6ca85'}`}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditBrand(brand)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                    title="Edit Brand"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteConfirm({
                        type: 'brand',
                        id: brand.id,
                        title: brand.name
                      })
                    }
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-colors"
                    title="Delete Brand"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* TAB: CONTACT & CONCIERGE SETTINGS */}
      {/* ------------------------------------------------------ */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0d1017] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6ca85]">
                <Phone className="w-4 h-4 text-[#c5a059]" />
                <span>Omnichannel Business Directory & Number Management</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                Contact & Concierge Settings
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Manage all contact touchpoints across the platform. Top Header hotline and WhatsApp direct numbers are pinned at the top, followed by the floating WhatsApp desk and page-by-page number configurations.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveContact} className="space-y-8 text-xs">

            {/* 1. TOP HEADER CONTACT SETTINGS (PLACED AT THE VERY TOP) */}
            <div className="rounded-2xl border border-[#c5a059]/40 bg-gradient-to-b from-[#161209] to-[#0c0f16] p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="border-b border-[#c5a059]/20 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#e6ca85]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-white">
                      1. Top Header Bar (Announcement Strip)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Displayed prominently at the very top of every page in the header bar.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#c5a059]/20 text-[#e6ca85] border border-[#c5a059]/30">
                  Header Top
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Top Header Hotline Display */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Top Header Hotline (Display Text)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.topHeaderHotlineDisplay || contactForm.phoneDisplay || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        topHeaderHotlineDisplay: e.target.value,
                        phoneDisplay: e.target.value
                      })
                    }
                    placeholder="01327-426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[10px] text-slate-400">The visible phone number in the top header.</p>
                </div>

                {/* Top Header Hotline Dial Link */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Top Header Hotline (Dial Link / tel:)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.topHeaderHotlineDial || contactForm.phoneIntl || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        topHeaderHotlineDial: e.target.value,
                        phoneIntl: e.target.value
                      })
                    }
                    placeholder="+8801327426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[10px] text-slate-400">Exact international number dialed when clicking the phone link.</p>
                </div>

                {/* Top Header WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Top Header WhatsApp Direct Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.topHeaderWhatsappNumber || contactForm.whatsappNumber || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        topHeaderWhatsappNumber: e.target.value,
                        topHeaderWhatsappLink: `https://wa.me/${e.target.value}`
                      })
                    }
                    placeholder="8801327426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[10px] text-slate-400">Numbers only with country code (e.g. 8801327426905).</p>
                </div>

                {/* Top Header WhatsApp Custom Link */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Top Header WhatsApp Link (Auto-generated or Custom URL)</span>
                  </label>
                  <input
                    type="text"
                    value={
                      contactForm.topHeaderWhatsappLink ||
                      (contactForm.topHeaderWhatsappNumber
                        ? `https://wa.me/${contactForm.topHeaderWhatsappNumber}`
                        : contactForm.whatsappLink || '')
                    }
                    onChange={(e) =>
                      setContactForm({ ...contactForm, topHeaderWhatsappLink: e.target.value })
                    }
                    placeholder="https://wa.me/8801327426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[10px] text-slate-400">Target URL opened when clicking "WhatsApp Direct" in the top header.</p>
                </div>

                {/* Top Announcement Bar Message */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Top Header Announcement Message</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.announcement || ''}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, announcement: e.target.value })
                    }
                    placeholder="Complimentary Insured Delivery on Selected Orders across Bangladesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            {/* 2. FLOATING WHATSAPP DESK WIDGET SETTINGS */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0a1510] to-[#0c0f16] p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="border-b border-emerald-500/20 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-white">
                      2. Floating WhatsApp Desk Widget (Pinned Bottom-Right)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      The floating gold & emerald interactive button that stays pinned at the bottom-right corner of the screen.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  Floating Widget
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Floating Widget Display Text */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Floating Widget Display Text / Number</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.floatingWhatsappDisplay || contactForm.phoneDisplay || ''}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, floatingWhatsappDisplay: e.target.value })
                    }
                    placeholder="01327-426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400">Number shown beside the WhatsApp Desk icon when expanded or hovered.</p>
                </div>

                {/* Floating Widget WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Floating Widget Target WhatsApp Number</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.floatingWhatsappNumber || contactForm.whatsappNumber || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        floatingWhatsappNumber: e.target.value,
                        floatingWhatsappLink: `https://wa.me/${e.target.value}`
                      })
                    }
                    placeholder="8801327426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400">Target phone number used to open the instant WhatsApp chat.</p>
                </div>

                {/* Floating Widget Custom Link */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Floating Widget Custom Link (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={
                      contactForm.floatingWhatsappLink ||
                      (contactForm.floatingWhatsappNumber
                        ? `https://wa.me/${contactForm.floatingWhatsappNumber}`
                        : contactForm.whatsappLink || '')
                    }
                    onChange={(e) =>
                      setContactForm({ ...contactForm, floatingWhatsappLink: e.target.value })
                    }
                    placeholder="https://wa.me/8801327426905"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400">Leave blank to use https://wa.me/&lt;target-number&gt; automatically.</p>
                </div>
              </div>
            </div>

            {/* 3. INDIVIDUAL PAGE-SPECIFIC CONTACT NUMBERS */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0f16] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-white">
                      3. Individual Page Contact Numbers
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Individually customize numbers for specific storefront pages. Blank fields will use the main hotline.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                  Page Overrides
                </span>
              </div>

              <div className="space-y-5">
                {/* Sell & Exchange Page */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#e6ca85] uppercase tracking-wider block">
                    • Sell & Exchange Concierge Page
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">Display Phone Number</label>
                      <input
                        type="text"
                        value={contactForm.sellExchangePhone || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, sellExchangePhone: e.target.value })
                        }
                        placeholder={contactForm.phoneDisplay || '01327-426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">WhatsApp Target Number</label>
                      <input
                        type="text"
                        value={contactForm.sellExchangeWhatsapp || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, sellExchangeWhatsapp: e.target.value })
                        }
                        placeholder={contactForm.whatsappNumber || '8801327426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                {/* About Us Page */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#e6ca85] uppercase tracking-wider block">
                    • About Us Page
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">Helpline Display Phone</label>
                      <input
                        type="text"
                        value={contactForm.aboutPhone || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, aboutPhone: e.target.value })
                        }
                        placeholder={contactForm.phoneDisplay || '01327-426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">WhatsApp Target Number</label>
                      <input
                        type="text"
                        value={contactForm.aboutWhatsapp || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, aboutWhatsapp: e.target.value })
                        }
                        placeholder={contactForm.whatsappNumber || '8801327426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                {/* Successfully Delivered Page */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#e6ca85] uppercase tracking-wider block">
                    • Successfully Delivered Archive Page
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">Inquiry Desk Phone</label>
                      <input
                        type="text"
                        value={contactForm.deliveredPhone || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, deliveredPhone: e.target.value })
                        }
                        placeholder={contactForm.phoneDisplay || '01327-426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">WhatsApp Target Number</label>
                      <input
                        type="text"
                        value={contactForm.deliveredWhatsapp || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, deliveredWhatsapp: e.target.value })
                        }
                        placeholder={contactForm.whatsappNumber || '8801327426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#e6ca85] uppercase tracking-wider block">
                    • Footer Section Contact
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">Footer Helpline Phone</label>
                      <input
                        type="text"
                        value={contactForm.footerPhone || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, footerPhone: e.target.value })
                        }
                        placeholder={contactForm.phoneDisplay || '01327-426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-mono">Footer WhatsApp Number</label>
                      <input
                        type="text"
                        value={contactForm.footerWhatsapp || ''}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, footerWhatsapp: e.target.value })
                        }
                        placeholder={contactForm.whatsappNumber || '8801327426905'}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. GENERAL BOUTIQUE DIRECTORY, HOURS & SOCIALS */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0f16] p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-white">
                      4. Boutique Addresses, Concierge Email & Operating Hours
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Physical salon addresses, official email, opening hours, and verified social media accounts.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                  Locations & Social
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Official Concierge Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email || ''}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="concierge@goodtime-sg.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Opening Hours */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Operating & Appointment Hours</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.openingHours || ''}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, openingHours: e.target.value })
                    }
                    placeholder="Mon - Sun: 11:00 AM - 8:00 PM (By Appointment)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Primary Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Primary Boutique Location / Address (Singapore HQ)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.address || ''}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    placeholder="High Street Centre, 1 North Bridge Road, Singapore 179094"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Secondary Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-mono text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secondary Location / Regional Concierge Hub</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.secondaryAddress || ''}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, secondaryAddress: e.target.value })
                    }
                    placeholder="Gulshan-2, Dhaka, Bangladesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200">Instagram Handle / URL</label>
                  <input
                    type="text"
                    value={contactForm.instagram || ''}
                    onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/goodtime_watch_sg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Facebook */}
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-200">Facebook Page URL</label>
                  <input
                    type="text"
                    value={contactForm.facebook || ''}
                    onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                    placeholder="https://facebook.com/goodtimewatchsg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-4 z-20 pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#e6ca85] via-[#d4af37] to-[#c5a059] text-black text-xs font-bold hover:brightness-110 shadow-2xl flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save All Contact & Concierge Information</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ------------------------------------------------------ */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 py-12 md:py-4 overflow-y-auto" onClick={() => setIsProductModalOpen(false)}>
          <div className="max-w-2xl w-full rounded-3xl bg-[#0e111a] border border-white/15 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto m-auto" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-serif-luxury font-bold text-white">
                  {editingProduct ? 'Edit Watch Information' : 'Add New Watch to Inventory'}
                </h2>
                <p className="text-xs text-slate-400">
                  Note: As requested, no price field is used. The site displays "Price on Request".
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.brandName || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProductForm({
                        ...productForm,
                        brandName: val,
                        brand: val.toLowerCase().replace(/\s+/g, '-') as any
                      });
                    }}
                    placeholder="e.g. Rolex, OMEGA, Tudor"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Model Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.model || ''}
                    onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                    placeholder="e.g. Submariner Date, Speedmaster"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Full Display Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Rolex Submariner Date 41mm Oystersteel"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Reference Number</label>
                  <input
                    type="text"
                    required
                    value={productForm.reference || ''}
                    onChange={(e) => setProductForm({ ...productForm, reference: e.target.value })}
                    placeholder="e.g. 126610LN"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Movement</label>
                  <input
                    type="text"
                    value={productForm.movement || ''}
                    onChange={(e) => setProductForm({ ...productForm, movement: e.target.value })}
                    placeholder="e.g. Automatic Calibre 3235"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Case Diameter (mm)</label>
                  <input
                    type="number"
                    value={productForm.caseSizeMm || 40}
                    onChange={(e) => setProductForm({ ...productForm, caseSizeMm: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Dial Color</label>
                  <input
                    type="text"
                    value={productForm.dialColor || ''}
                    onChange={(e) => setProductForm({ ...productForm, dialColor: e.target.value })}
                    placeholder="e.g. Black, Sunray Blue"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Case Material</label>
                  <input
                    type="text"
                    value={productForm.caseMaterial || ''}
                    onChange={(e) => setProductForm({ ...productForm, caseMaterial: e.target.value })}
                    placeholder="e.g. Oystersteel 904L"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Water Resistance</label>
                  <input
                    type="text"
                    value={productForm.waterResistance || ''}
                    onChange={(e) => setProductForm({ ...productForm, waterResistance: e.target.value })}
                    placeholder="e.g. 300m / 1,000ft"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={productForm.images?.[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Detailed Horological Description</label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Describe the watch condition, papers, origin, and historical provenance..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Availability Status</label>
                  <select
                    value={productForm.availability || 'In Stock - Dhaka'}
                    onChange={(e) => setProductForm({ ...productForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="In Stock - Dhaka">In Stock - Dhaka</option>
                    <option value="Available on Request">Available on Request</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isNewCheck"
                    checked={!!productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="w-4 h-4 rounded text-[#c5a059] focus:ring-0 bg-black border-white/20"
                  />
                  <label htmlFor="isNewCheck" className="font-mono text-slate-300 cursor-pointer">
                    Mark as "New Arrival" Badge
                  </label>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeaturedInHeroCheck"
                  checked={!!productForm.isFeaturedInHero}
                  onChange={(e) => setProductForm({ ...productForm, isFeaturedInHero: e.target.checked })}
                  className="w-4 h-4 rounded text-[#c5a059] focus:ring-0 bg-black border-white/20"
                />
                <label htmlFor="isFeaturedInHeroCheck" className="font-mono text-slate-200 cursor-pointer text-xs">
                  Feature in Homepage Hero Slider (5-second auto-rotating showcase)
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-bold hover:brightness-110 shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Publish to Catalog'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* MODAL: ADD / EDIT UPCOMING */}
      {/* ------------------------------------------------------ */}
      {isUpcomingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 py-12 md:py-4 overflow-y-auto" onClick={() => setIsUpcomingModalOpen(false)}>
          <div className="max-w-xl w-full rounded-3xl bg-[#0e111a] border border-white/15 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto m-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif-luxury font-bold text-white">
                {editingUpcoming ? 'Edit Upcoming Watch' : 'Add Upcoming Watch to Transit'}
              </h2>
              <button
                onClick={() => setIsUpcomingModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpcoming} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={upcomingForm.brandName || upcomingForm.brand || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUpcomingForm({
                        ...upcomingForm,
                        brandName: val,
                        brandId: val.toLowerCase().replace(/\s+/g, '-'),
                        brand: val
                      });
                    }}
                    placeholder="e.g. Rolex, OMEGA"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Model Name</label>
                  <input
                    type="text"
                    required
                    value={upcomingForm.model || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, model: e.target.value })}
                    placeholder="e.g. GMT-Master II Pepsi"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Full Display Title</label>
                  <input
                    type="text"
                    required
                    value={upcomingForm.name || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, name: e.target.value })}
                    placeholder="e.g. Rolex GMT-Master II"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Reference Number</label>
                  <input
                    type="text"
                    value={upcomingForm.reference || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, reference: e.target.value })}
                    placeholder="e.g. 126710BLRO"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">ETA Date (Auto-Move)</label>
                  <input
                    type="date"
                    required
                    value={upcomingForm.expectedArrivalDate || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, expectedArrivalDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">ETA Display Text</label>
                  <input
                    type="text"
                    required
                    value={upcomingForm.expectedArrival || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, expectedArrival: e.target.value })}
                    placeholder="e.g. Next Week"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Status Badge</label>
                  <select
                    value={upcomingForm.statusBadge || 'In Transit'}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, statusBadge: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="In Transit">In Transit</option>
                    <option value="Arriving Soon">Arriving Soon</option>
                    <option value="Batch Allocation">Batch Allocation</option>
                    <option value="Pre-Booking Open">Pre-Booking Open</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Movement</label>
                  <input
                    type="text"
                    value={upcomingForm.movement || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, movement: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Case Size (mm)</label>
                  <input
                    type="number"
                    value={upcomingForm.caseSizeMm || parseInt(upcomingForm.caseSize || '40') || 40}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, caseSizeMm: Number(e.target.value), caseSize: `${e.target.value}mm` })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Dial Color</label>
                  <input
                    type="text"
                    value={upcomingForm.dialColor || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, dialColor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Case Material</label>
                  <input
                    type="text"
                    value={upcomingForm.caseMaterial || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, caseMaterial: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Strap Material</label>
                  <input
                    type="text"
                    value={upcomingForm.strapMaterial || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, strapMaterial: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Image URL</label>
                <input
                  type="url"
                  required
                  value={upcomingForm.image || (upcomingForm.images && upcomingForm.images[0]) || ''}
                  onChange={(e) => setUpcomingForm({ ...upcomingForm, image: e.target.value, images: [e.target.value] })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Description</label>
                <textarea
                  rows={2}
                  required
                  value={upcomingForm.description || ''}
                  onChange={(e) => setUpcomingForm({ ...upcomingForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Key Highlight</label>
                <input
                  type="text"
                  value={upcomingForm.keyFeature || ''}
                  onChange={(e) => setUpcomingForm({ ...upcomingForm, keyFeature: e.target.value })}
                  placeholder="e.g. Jubilee Bracelet, Complete Unworn Box & Papers"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUpcomingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-bold hover:brightness-110 shadow-md"
                >
                  Save Upcoming Watch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* MODAL: ADD / EDIT DELIVERED */}
      {/* ------------------------------------------------------ */}
      {isDeliveredModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 py-12 md:py-4 overflow-y-auto" onClick={() => setIsDeliveredModalOpen(false)}>
          <div className="max-w-xl w-full rounded-3xl bg-[#0e111a] border border-white/15 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto m-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif-luxury font-bold text-white">
                {editingDelivered ? 'Edit Delivered Review' : 'Add Delivered Watch Review'}
              </h2>
              <button
                onClick={() => setIsDeliveredModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDelivered} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Brand</label>
                  <input
                    type="text"
                    required
                    value={deliveredForm.brand || ''}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, brand: e.target.value })}
                    placeholder="e.g. Rolex"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Model</label>
                  <input
                    type="text"
                    required
                    value={deliveredForm.model || ''}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, model: e.target.value })}
                    placeholder="e.g. Daytona Cosmograph"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Delivery Location</label>
                  <input
                    type="text"
                    value={deliveredForm.deliveryLocation || ''}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, deliveryLocation: e.target.value })}
                    placeholder="e.g. Gulshan-2, Dhaka"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Delivered Date</label>
                  <input
                    type="text"
                    value={deliveredForm.deliveredDate || ''}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, deliveredDate: e.target.value })}
                    placeholder="e.g. March 2025"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Image URL</label>
                <input
                  type="url"
                  required
                  value={deliveredForm.image || ''}
                  onChange={(e) => setDeliveredForm({ ...deliveredForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Client Name</label>
                  <input
                    type="text"
                    value={deliveredForm.clientName || ''}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, clientName: e.target.value })}
                    placeholder="e.g. Dr. Asif R."
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Rating (1 to 5 Stars)</label>
                  <select
                    value={deliveredForm.rating || 5}
                    onChange={(e) => setDeliveredForm({ ...deliveredForm, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white focus:outline-none"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Client Review / Testimonial</label>
                <textarea
                  rows={3}
                  required
                  value={deliveredForm.clientReview || ''}
                  onChange={(e) => setDeliveredForm({ ...deliveredForm, clientReview: e.target.value })}
                  placeholder="What did the client say about the authentication, handover, and timepiece condition?"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeliveredModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-bold hover:brightness-110 shadow-md"
                >
                  Save Delivered Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* MODAL: ADD / EDIT AUTHORIZED BRAND */}
      {/* ------------------------------------------------------ */}
      {isBrandModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 py-12 md:py-4 overflow-y-auto"
          onClick={() => setIsBrandModalOpen(false)}
        >
          <div
            className="max-w-xl w-full rounded-3xl bg-[#0e111a] border border-white/15 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-serif-luxury font-bold text-white">
                  {editingBrand ? 'Edit Authorized Brand' : 'Add Brand to Marquee'}
                </h2>
                <p className="text-xs text-slate-400">
                  Provide an official image logo URL or choose luxury typography to display the brand name.
                </p>
              </div>
              <button
                onClick={() => setIsBrandModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400 block uppercase">
                Marquee Live Appearance Preview
              </label>
              <div className="h-24 rounded-2xl bg-black/60 border border-[#c5a059]/30 flex items-center justify-center p-4">
                {brandForm.logo ? (
                  <img
                    src={brandForm.logo}
                    alt={brandForm.name || 'Brand Logo'}
                    className="max-h-12 max-w-[160px] object-contain drop-shadow"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span
                    className={`${brandForm.font || 'font-serif'} text-2xl font-bold tracking-widest text-center`}
                    style={{ color: brandForm.color || '#e6ca85' }}
                  >
                    {brandForm.name || 'BRAND NAME'}
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-300">Brand Name</label>
                <input
                  type="text"
                  required
                  value={brandForm.name || ''}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  placeholder="e.g. Rolex, Patek Philippe, Audemars Piguet, Cartier"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 flex items-center justify-between">
                  <span>Image Logo URL (Optional)</span>
                  <span className="text-[10px] text-slate-400">Leave empty to use luxury typography text</span>
                </label>
                <input
                  type="url"
                  value={brandForm.logo || ''}
                  onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                  placeholder="https://... (SVG or PNG logo with transparent background)"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Typography options if no image logo is supplied */}
              {!brandForm.logo && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="space-y-1">
                    <label className="font-mono text-slate-300">Font Family Style</label>
                    <select
                      value={brandForm.font || 'font-serif'}
                      onChange={(e) => setBrandForm({ ...brandForm, font: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="font-serif">Serif Luxury (Classic Swiss)</option>
                      <option value="font-sans font-black tracking-widest uppercase">Sans-Serif Bold (Modern)</option>
                      <option value="font-mono uppercase tracking-widest">Monospace (Technical / Avant-Garde)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-slate-300">Brand Color Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandForm.color || '#e6ca85'}
                        onChange={(e) => setBrandForm({ ...brandForm, color: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={brandForm.color || '#e6ca85'}
                        onChange={(e) => setBrandForm({ ...brandForm, color: e.target.value })}
                        placeholder="#e6ca85"
                        className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-bold hover:brightness-110 shadow-md"
                >
                  {editingBrand ? 'Save Brand Changes' : 'Add to Marquee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* CONFIRMATION DIALOG FOR DELETE OR RESET */}
      {/* ------------------------------------------------------ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="max-w-md w-full rounded-2xl bg-[#141824] border border-red-500/30 p-6 space-y-4 m-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif-luxury text-base font-bold text-white">
                {deleteConfirm.type === 'reset' ? 'Confirm Factory Reset' : 'Confirm Permanent Deletion'}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to proceed with deleting <strong className="text-white">{deleteConfirm.title}</strong>? This action will immediately update your store catalog.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (deleteConfirm.type === 'product' && deleteConfirm.id) {
                    handleDeleteProduct(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'upcoming' && deleteConfirm.id) {
                    handleDeleteUpcoming(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'delivered' && deleteConfirm.id) {
                    handleDeleteDelivered(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'brand' && deleteConfirm.id) {
                    handleDeleteBrand(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'reset') {
                    handleResetCatalog();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
