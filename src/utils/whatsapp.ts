import { WatchProduct, UpcomingWatch } from '../types';
import { SITE_INFO } from '../data/goodtime';
import { getStoredSiteInfo } from './storage';

const getActiveWhatsAppNumber = (): string => {
  return getStoredSiteInfo().whatsappNumber || SITE_INFO.whatsappNumber;
};

export const generateProductWhatsAppLink = (product: WatchProduct): string => {
  const number = getActiveWhatsAppNumber();
  
  const text = `Hello Goodtime Watch SG,\n\nI am interested in enquiring about this timepiece from your collection:\n\n` +
    `• Brand: ${product.brandName}\n` +
    `• Model: ${product.name} ${product.model}\n` +
    `• Reference: ${product.reference}\n` +
    `• Movement: ${product.movement}\n` +
    `• Case: ${product.caseSizeMm}mm (${product.caseMaterial})\n` +
    `• Availability: ${product.availability}\n\n` +
    `Please share the latest price, availability, and delivery details for Bangladesh. Thank you.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const generateUpcomingWhatsAppLink = (upcoming: UpcomingWatch): string => {
  const number = getActiveWhatsAppNumber();

  const text = `Hello Goodtime Watch SG,\n\nI would like to pre-book / enquire about this Upcoming timepiece:\n\n` +
    `• Brand: ${upcoming.brand}\n` +
    `• Model: ${upcoming.model}\n` +
    `• Reference: ${upcoming.reference}\n` +
    `• Expected Arrival: ${upcoming.expectedArrival}\n\n` +
    `Please keep me updated on allocation price and availability when the batch arrives. Thank you.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const generateSellExchangeWhatsAppLink = (details?: {
  brand?: string;
  model?: string;
  condition?: string;
  hasBoxPapers?: string;
  inquiryType?: 'Sell' | 'Exchange';
  overrideNumber?: string;
}): string => {
  const stored = getStoredSiteInfo();
  const number = details?.overrideNumber || stored.sellExchangeWhatsapp || getActiveWhatsAppNumber();

  let text = `Hello Goodtime Watch SG,\n\nI would like to enquire about your ${details?.inquiryType || 'Sell & Exchange'} service.\n\n`;
  if (details?.brand || details?.model) {
    text += `• Watch Brand: ${details.brand || 'Not specified'}\n`;
    text += `• Model / Reference: ${details.model || 'Not specified'}\n`;
    text += `• Condition: ${details.condition || 'Pre-owned'}\n`;
    text += `• Box & Papers: ${details.hasBoxPapers || 'Yes'}\n\n`;
  }
  text += `I am attaching clear photos (dial, caseback, bracelet, papers) for your preliminary valuation. Please guide me through the next steps. Thank you.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const generateGeneralWhatsAppLink = (): string => {
  const number = getActiveWhatsAppNumber();
  const text = `Hello Goodtime Watch SG,\n\nI would like to enquire about your timepiece collection and services in Bangladesh.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
