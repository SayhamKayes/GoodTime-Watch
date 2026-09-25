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
  availability: 'In Stock' | 'Enquire' | 'Low Stock' | 'Sold Out' | 'Available on Request';
  isNew: boolean;
  isBestSeller: boolean;
  isLuxury: boolean;
  isFeaturedInHero?: boolean;
  styles: string[];
  tags: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  dateAdded?: string; // Format YYYY-MM-DD
  video360?: string; // Path or URL to 360 degree motion video (e.g. /360_motion_1.mp4)
}

export interface AuthorizedBrand {
  id?: string;
  name: string;
  logo?: string;
  font?: string;
  color?: string;
}

export interface UpcomingWatch {
  id: string;
  brand: string;
  model: string;
  reference: string;
  expectedArrival: string; // Display text
  expectedArrivalDate?: string; // Logic date YYYY-MM-DD
  statusBadge: 'In Transit' | 'Arriving Soon' | 'Batch Allocation' | 'Pre-Booking Open';
  estimatedPriceBDT?: number;
  movement: string;
  caseSize: string;
  dialColor: string;
  description: string;
  image: string;
  keyFeature: string;
  
  // Fields needed to seamlessly migrate to WatchProduct (optional for backward compatibility with mock data)
  brandId?: string;
  brandName?: string;
  name?: string;
  gender?: 'men' | 'women' | 'unisex';
  caseMaterial?: string;
  strapMaterial?: string;
  caseSizeMm?: number;
  waterResistance?: string;
  images?: string[];
  styles?: string[];
  tags?: string[];
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
  phone?: string;
  address?: string;
  secondaryAddress?: string;
  openingHours?: string;
  instagram?: string;
  facebook?: string;

  // Top Header Contact Numbers (Placed at top of Admin Contact & Concierge)
  topHeaderHotlineDisplay?: string;
  topHeaderHotlineDial?: string;
  topHeaderWhatsappNumber?: string;
  topHeaderWhatsappLink?: string;

  // Floating WhatsApp Desk Widget Contact Number
  floatingWhatsappDisplay?: string;
  floatingWhatsappNumber?: string;
  floatingWhatsappLink?: string;

  // Individual Page Contact Numbers
  sellExchangePhone?: string;
  sellExchangeWhatsapp?: string;
  aboutPhone?: string;
  aboutWhatsapp?: string;
  deliveredPhone?: string;
  deliveredWhatsapp?: string;
  footerPhone?: string;
  footerWhatsapp?: string;
}

