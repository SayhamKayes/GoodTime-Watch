import { WatchProduct, UpcomingWatch, DeliveredWatch, AuthorizedBrand, SiteInfo } from '../types';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredUpcoming,
  saveStoredUpcoming,
  getStoredDelivered,
  saveStoredDelivered,
  getStoredBrands,
  saveStoredBrands,
  getStoredSiteInfo,
  saveStoredSiteInfo
} from '../utils/storage';

const API_TIMEOUT_MS = 3000;

const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
};

// -----------------------------------------------------------------
// Check API / Database Connectivity
// -----------------------------------------------------------------
export const checkApiHealth = async (): Promise<{ status: string; neonConnected: boolean }> => {
  try {
    const res = await fetchWithTimeout('/api/health');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // API not running, client is in local storage mode
  }
  return { status: 'offline', neonConnected: false };
};

// -----------------------------------------------------------------
// Products API
// -----------------------------------------------------------------
export const fetchProducts = async (): Promise<WatchProduct[]> => {
  try {
    const res = await fetchWithTimeout('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredProducts(data);
        return data;
      }
    }
  } catch {
    // fallback
  }
  return getStoredProducts();
};

export const syncSaveProduct = async (product: WatchProduct): Promise<void> => {
  try {
    await fetchWithTimeout('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch {
    // offline or direct storage mode
  }
};

export const syncDeleteProduct = async (id: string): Promise<void> => {
  try {
    await fetchWithTimeout(`/api/products/${id}`, { method: 'DELETE' });
  } catch {
    // offline
  }
};

// -----------------------------------------------------------------
// Upcoming Watches API
// -----------------------------------------------------------------
export const fetchUpcoming = async (): Promise<UpcomingWatch[]> => {
  try {
    const res = await fetchWithTimeout('/api/upcoming');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredUpcoming(data);
        return data;
      }
    }
  } catch {
    // fallback
  }
  return getStoredUpcoming();
};

export const syncSaveUpcoming = async (upcoming: UpcomingWatch): Promise<void> => {
  try {
    await fetchWithTimeout('/api/upcoming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(upcoming)
    });
  } catch {
    // offline
  }
};

export const syncDeleteUpcoming = async (id: string): Promise<void> => {
  try {
    await fetchWithTimeout(`/api/upcoming/${id}`, { method: 'DELETE' });
  } catch {
    // offline
  }
};

// -----------------------------------------------------------------
// Delivered Watches API
// -----------------------------------------------------------------
export const fetchDelivered = async (): Promise<DeliveredWatch[]> => {
  try {
    const res = await fetchWithTimeout('/api/delivered');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredDelivered(data);
        return data;
      }
    }
  } catch {
    // fallback
  }
  return getStoredDelivered();
};

export const syncSaveDelivered = async (delivered: DeliveredWatch): Promise<void> => {
  try {
    await fetchWithTimeout('/api/delivered', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(delivered)
    });
  } catch {
    // offline
  }
};

export const syncDeleteDelivered = async (id: string): Promise<void> => {
  try {
    await fetchWithTimeout(`/api/delivered/${id}`, { method: 'DELETE' });
  } catch {
    // offline
  }
};

// -----------------------------------------------------------------
// Authorized Brands API
// -----------------------------------------------------------------
export const fetchBrands = async (): Promise<AuthorizedBrand[]> => {
  try {
    const res = await fetchWithTimeout('/api/brands');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredBrands(data);
        return data;
      }
    }
  } catch {
    // fallback
  }
  return getStoredBrands();
};

export const syncSaveBrands = async (brands: AuthorizedBrand[]): Promise<void> => {
  try {
    await fetchWithTimeout('/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brands)
    });
  } catch {
    // offline
  }
};

// -----------------------------------------------------------------
// Site Settings / Contact Info API
// -----------------------------------------------------------------
export const fetchSiteSettings = async (): Promise<SiteInfo> => {
  try {
    const res = await fetchWithTimeout('/api/site-info');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        saveStoredSiteInfo(data);
        return data;
      }
    }
  } catch {
    // fallback
  }
  return getStoredSiteInfo();
};

export const syncSaveSiteSettings = async (siteInfo: SiteInfo): Promise<void> => {
  try {
    await fetchWithTimeout('/api/site-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(siteInfo)
    });
  } catch {
    // offline
  }
};
