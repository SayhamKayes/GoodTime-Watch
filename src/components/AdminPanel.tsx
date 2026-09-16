import React, { useState } from 'react';
import { WatchProduct, UpcomingWatch, DeliveredWatch, NavigationTab } from '../types';
import {
  getAdminPasscode,
  setAdminPasscode,
  validateAdminPassword,
  setAdminAuthenticated,
  saveStoredProducts,
  saveStoredUpcoming,
  saveStoredDelivered,
  resetAllCatalogData
} from '../utils/storage';
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
  Tag
} from 'lucide-react';

interface AdminPanelProps {
  products: WatchProduct[];
  upcomingWatches: UpcomingWatch[];
  deliveredWatches: DeliveredWatch[];
  onUpdateProducts: (products: WatchProduct[]) => void;
  onUpdateUpcoming: (upcoming: UpcomingWatch[]) => void;
  onUpdateDelivered: (delivered: DeliveredWatch[]) => void;
  onExitAdmin: () => void;
}

type AdminTab = 'products' | 'upcoming' | 'delivered' | 'security';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  upcomingWatches,
  deliveredWatches,
  onUpdateProducts,
  onUpdateUpcoming,
  onUpdateDelivered,
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

  // Passcode Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');
  const [passChangeError, setPassChangeError] = useState('');

  // Confirmation modal for deleting or resetting
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'product' | 'upcoming' | 'delivered' | 'reset';
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
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({ ...p, ...productForm } as WatchProduct)
          : p
      );
      onUpdateProducts(updated);
      saveStoredProducts(updated);
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
      showToast(`Added ${newProd.brandName} ${newProd.model}`);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    onUpdateProducts(updated);
    saveStoredProducts(updated);
    showToast('Watch deleted from inventory');
    setDeleteConfirm(null);
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
      const updated = upcomingWatches.map((w) =>
        w.id === editingUpcoming.id ? ({ ...w, ...upcomingForm } as UpcomingWatch) : w
      );
      onUpdateUpcoming(updated);
      saveStoredUpcoming(updated);
      showToast(`Updated upcoming watch ${upcomingForm.model}`);
    } else {
      const newWatch: UpcomingWatch = {
        id: `upc_${Date.now()}`,
        brand: upcomingForm.brand || '',
        model: upcomingForm.model || '',
        reference: upcomingForm.reference || 'Ref. N/A',
        expectedArrival: upcomingForm.expectedArrival || 'Next Week',
        statusBadge: upcomingForm.statusBadge || 'In Transit',
        caseSize: upcomingForm.caseSize || '40mm',
        dialColor: upcomingForm.dialColor || 'Black',
        movement: upcomingForm.movement || 'Automatic',
        image: upcomingForm.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
        description: upcomingForm.description || '',
        keyFeature: upcomingForm.keyFeature || 'Original Factory Box & Warranty'
      };
      const updated = [newWatch, ...upcomingWatches];
      onUpdateUpcoming(updated);
      saveStoredUpcoming(updated);
      showToast(`Added upcoming watch ${newWatch.model}`);
    }
    setIsUpcomingModalOpen(false);
  };

  const handleDeleteUpcoming = (id: string) => {
    const updated = upcomingWatches.filter((w) => w.id !== id);
    onUpdateUpcoming(updated);
    saveStoredUpcoming(updated);
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
      const updated = deliveredWatches.map((d) =>
        d.id === editingDelivered.id ? ({ ...d, ...deliveredForm } as DeliveredWatch) : d
      );
      onUpdateDelivered(updated);
      saveStoredDelivered(updated);
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
      showToast(`Added delivered watch entry for ${newDel.model}`);
    }
    setIsDeliveredModalOpen(false);
  };

  const handleDeleteDelivered = (id: string) => {
    const updated = deliveredWatches.filter((d) => d.id !== id);
    onUpdateDelivered(updated);
    saveStoredDelivered(updated);
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

  // Export & Import Catalog
  const handleExportJSON = () => {
    const data = {
      products,
      upcomingWatches,
      deliveredWatches,
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
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'products'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
            }`}
        >
          <Package className="w-4 h-4" />
          <span>New Arrivals ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'upcoming'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
            }`}
        >
          <Plane className="w-4 h-4" />
          <span>Upcoming Watches ({upcomingWatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'delivered'
              ? 'bg-[#c5a059] text-black shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
            }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Delivered Archive ({deliveredWatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'security'
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
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#e6ca85] border border-white/10">
                      ETA: {w.expectedArrival}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Brand</label>
                  <input
                    type="text"
                    required
                    value={upcomingForm.brand || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, brand: e.target.value })}
                    placeholder="e.g. Rolex"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Model</label>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Reference</label>
                  <input
                    type="text"
                    value={upcomingForm.reference || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, reference: e.target.value })}
                    placeholder="e.g. 126710BLRO"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300">Expected Arrival (ETA)</label>
                  <input
                    type="text"
                    value={upcomingForm.expectedArrival || ''}
                    onChange={(e) => setUpcomingForm({ ...upcomingForm, expectedArrival: e.target.value })}
                    placeholder="e.g. End of March 2025"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Status Badge</label>
                <input
                  type="text"
                  value={upcomingForm.statusBadge || ''}
                  onChange={(e) => setUpcomingForm({ ...upcomingForm, statusBadge: e.target.value })}
                  placeholder="e.g. In Transit, Geneva Customs, Partner Vault"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300">Image URL</label>
                <input
                  type="url"
                  required
                  value={upcomingForm.image || ''}
                  onChange={(e) => setUpcomingForm({ ...upcomingForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none"
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
