import { WatchProduct } from '../types';

export const isProductNewArrival = (product: WatchProduct): boolean => {
  if (!product.isNew) return false;
  
  if (product.dateAdded) {
    const timeDiff = new Date().getTime() - new Date(product.dateAdded).getTime();
    const daysSinceAdded = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysSinceAdded <= 30;
  }
  
  // Backward compatibility: if it's marked as new but has no dateAdded, we keep the badge
  return true;
};
