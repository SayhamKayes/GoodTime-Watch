import { WatchProduct, UpcomingWatch, DeliveredWatch } from '../types';
import { ALL_PRODUCTS, UPCOMING_WATCHES, DELIVERED_WATCHES } from '../data/goodtime';

const PRODUCTS_KEY = 'goodtime_products_catalog';
const UPCOMING_KEY = 'goodtime_upcoming_catalog';
const DELIVERED_KEY = 'goodtime_delivered_catalog';
const ADMIN_AUTH_KEY = 'goodtime_admin_auth_token';

// Load stored products or fallback to default dataset
export const getStoredProducts = (): WatchProduct[] => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p) => {
          const base = ALL_PRODUCTS.find((item) => item.id === p.id);
          return {
            ...p,
            video360: base?.video360
          };
        });
      }
    }
  } catch (e) {
    console.error('Error loading stored products:', e);
  }
  return ALL_PRODUCTS;
};

export const saveStoredProducts = (products: WatchProduct[]): void => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products:', e);
  }
};

// Load upcoming watches or fallback
export const getStoredUpcoming = (): UpcomingWatch[] => {
  try {
    const data = localStorage.getItem(UPCOMING_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored upcoming watches:', e);
  }
  return UPCOMING_WATCHES;
};

export const saveStoredUpcoming = (upcoming: UpcomingWatch[]): void => {
  try {
    localStorage.setItem(UPCOMING_KEY, JSON.stringify(upcoming));
  } catch (e) {
    console.error('Error saving upcoming watches:', e);
  }
};

// Auto-migrate upcoming watches to main catalog if date has passed
export const autoMigrateUpcomingWatches = (): { products: WatchProduct[], upcoming: UpcomingWatch[] } => {
  let products = getStoredProducts();
  let upcoming = getStoredUpcoming();
  const today = new Date().toISOString().split('T')[0];
  let hasChanges = false;

  const remainingUpcoming: UpcomingWatch[] = [];

  upcoming.forEach(watch => {
    if (watch.expectedArrivalDate && watch.expectedArrivalDate <= today) {
      // Migrate to Main Catalog
      hasChanges = true;
      const newProduct: WatchProduct = {
        id: `migrated_${watch.id}_${Date.now()}`,
        brandId: watch.brandId || watch.brand.toLowerCase().replace(/\s+/g, '-'),
        brandName: watch.brandName || watch.brand,
        name: watch.name || `${watch.brand} ${watch.model}`,
        model: watch.model,
        reference: watch.reference,
        gender: watch.gender || 'men',
        movement: watch.movement,
        caseMaterial: watch.caseMaterial || 'Stainless Steel',
        strapMaterial: watch.strapMaterial || 'Stainless Steel',
        dialColor: watch.dialColor,
        caseSizeMm: watch.caseSizeMm || parseInt(watch.caseSize) || 40,
        waterResistance: watch.waterResistance || '100m',
        images: watch.images || [watch.image],
        availability: 'In Stock',
        isNew: true,
        isBestSeller: false,
        isLuxury: true,
        styles: watch.styles || [],
        tags: watch.tags || [],
        description: watch.description,
        rating: 5,
        reviewsCount: 1,
        dateAdded: watch.expectedArrivalDate // or today
      };
      products = [newProduct, ...products];
    } else {
      remainingUpcoming.push(watch);
    }
  });

  if (hasChanges) {
    saveStoredProducts(products);
    saveStoredUpcoming(remainingUpcoming);
  }

  return { products, upcoming: remainingUpcoming };
};

// Load delivered watches or fallback
export const getStoredDelivered = (): DeliveredWatch[] => {
  try {
    const data = localStorage.getItem(DELIVERED_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored delivered watches:', e);
  }
  return DELIVERED_WATCHES;
};

export const saveStoredDelivered = (delivered: DeliveredWatch[]): void => {
  try {
    localStorage.setItem(DELIVERED_KEY, JSON.stringify(delivered));
  } catch (e) {
    console.error('Error saving delivered watches:', e);
  }
};

// Reset all to defaults
export const resetAllCatalogData = (): void => {
  try {
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(UPCOMING_KEY);
    localStorage.removeItem(DELIVERED_KEY);
  } catch (e) {
    console.error('Error resetting catalog:', e);
  }
};

// Admin authentication state
const ADMIN_PASSWORD_KEY = 'goodtime_admin_passcode';
const DEFAULT_PASSCODE = 'admin123';

export const getAdminPasscode = (): string => {
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSCODE;
  } catch {
    return DEFAULT_PASSCODE;
  }
};

export const setAdminPasscode = (newPass: string): void => {
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
  } catch (e) {
    console.error('Error setting passcode:', e);
  }
};

export const validateAdminPassword = (inputPass: string): boolean => {
  return inputPass.trim() === getAdminPasscode();
};

export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (auth: boolean): void => {
  try {
    if (auth) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (e) {
    console.error('Error saving admin auth:', e);
  }
};
