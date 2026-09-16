export type NavigationTab = 
  | 'home'
  | 'about' 
  | 'new-arrival' 
  | 'upcoming' 
  | 'sell-exchange' 
  | 'delivered'
  | 'admin';

export interface WatchProduct {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  model: string;
  reference: string;
  price?: number;
  compareAtPrice?: number | null;
  gender: 'men' | 'women' | 'unisex';
  movement: string;
  caseMaterial: string;
  strapMaterial: string;
  dialColor: string;
  caseSizeMm: number;
  waterResistance: string;
  images: string[];
  availability: 'In Stock' | 'Enquire' | 'Low Stock' | 'Sold Out';
  isNew: boolean;
  isBestSeller: boolean;
  isLuxury: boolean;
  styles: string[];
  tags: string[];
  description: string;
  rating: number;
  reviewsCount: number;
}

export interface UpcomingWatch {
  id: string;
  brand: string;
  model: string;
  reference: string;
  expectedArrival: string;
  statusBadge: 'In Transit' | 'Arriving Soon' | 'Batch Allocation' | 'Pre-Booking Open';
  estimatedPriceBDT?: number;
  movement: string;
  caseSize: string;
  dialColor: string;
  description: string;
  image: string;
  keyFeature: string;
}

export interface DeliveredWatch {
  id: string;
  brand: string;
  model: string;
  reference: string;
  soldPriceBDT?: number;
  deliveryLocation: string;
  deliveredDate: string;
  image: string;
  clientName: string;
  clientReview: string;
  rating: number;
  verifiedPurchase: boolean;
}

export interface SiteInfo {
  name: string;
  domain: string;
  email: string;
  phoneDisplay: string;
  phoneIntl: string;
  whatsappNumber: string;
  whatsappLink: string;
  location: string;
  announcement: string;
}
