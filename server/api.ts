import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { WatchProduct, UpcomingWatch, DeliveredWatch, AuthorizedBrand, SiteInfo } from '../src/types';
import { ALL_PRODUCTS, UPCOMING_WATCHES, DELIVERED_WATCHES, DEFAULT_BRANDS, SITE_INFO } from '../src/data/goodtime';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// Helper to check if Neon connection string is configured
export const isNeonConfigured = (): boolean => {
  return Boolean(connectionString && connectionString.startsWith('postgres'));
};

const getSql = () => {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(connectionString);
};

// =========================================================================
// PRODUCTS REPOSITORY
// =========================================================================
export const getProducts = async (): Promise<WatchProduct[]> => {
  if (!isNeonConfigured()) return ALL_PRODUCTS;
  const sql = getSql();
  const rows = await sql`SELECT * FROM products ORDER BY created_at DESC;`;
  return rows.map((r: any) => ({
    id: r.id,
    brandId: r.brand_id,
    brandName: r.brand_name,
    name: r.name,
    model: r.model,
    reference: r.reference,
    price: r.price ? Number(r.price) : undefined,
    compareAtPrice: r.compare_at_price ? Number(r.compare_at_price) : null,
    gender: r.gender,
    movement: r.movement,
    caseMaterial: r.case_material,
    strapMaterial: r.strap_material,
    dialColor: r.dial_color,
    caseSizeMm: Number(r.case_size_mm),
    waterResistance: r.water_resistance,
    images: Array.isArray(r.images) ? r.images : JSON.parse(r.images || '[]'),
    availability: r.availability,
    isNew: r.is_new,
    isBestSeller: r.is_best_seller,
    isLuxury: r.is_luxury,
    isFeaturedInHero: r.is_featured_in_hero,
    styles: Array.isArray(r.styles) ? r.styles : JSON.parse(r.styles || '[]'),
    tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags || '[]'),
    description: r.description,
    rating: Number(r.rating || 5),
    reviewsCount: Number(r.reviews_count || 0),
    dateAdded: r.date_added,
    video360: r.video_360
  }));
};

export const saveProduct = async (p: WatchProduct): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`
    INSERT INTO products (
      id, brand_id, brand_name, name, model, reference, price, compare_at_price,
      gender, movement, case_material, strap_material, dial_color, case_size_mm,
      water_resistance, images, availability, is_new, is_best_seller, is_luxury,
      is_featured_in_hero, styles, tags, description, rating, reviews_count, date_added, video_360
    ) VALUES (
      ${p.id}, ${p.brandId}, ${p.brandName}, ${p.name}, ${p.model}, ${p.reference},
      ${p.price || null}, ${p.compareAtPrice || null}, ${p.gender || 'unisex'},
      ${p.movement || ''}, ${p.caseMaterial || ''}, ${p.strapMaterial || ''},
      ${p.dialColor || ''}, ${p.caseSizeMm || 40}, ${p.waterResistance || ''},
      ${JSON.stringify(p.images || [])}::jsonb, ${p.availability || 'In Stock'},
      ${p.isNew ?? true}, ${p.isBestSeller ?? false}, ${p.isLuxury ?? true},
      ${p.isFeaturedInHero ?? false}, ${JSON.stringify(p.styles || [])}::jsonb,
      ${JSON.stringify(p.tags || [])}::jsonb, ${p.description || ''},
      ${p.rating || 5}, ${p.reviewsCount || 0}, ${p.dateAdded || new Date().toISOString().slice(0, 10)},
      ${p.video360 || null}
    )
    ON CONFLICT (id) DO UPDATE SET
      brand_id = EXCLUDED.brand_id,
      brand_name = EXCLUDED.brand_name,
      name = EXCLUDED.name,
      model = EXCLUDED.model,
      reference = EXCLUDED.reference,
      price = EXCLUDED.price,
      compare_at_price = EXCLUDED.compare_at_price,
      gender = EXCLUDED.gender,
      movement = EXCLUDED.movement,
      case_material = EXCLUDED.case_material,
      strap_material = EXCLUDED.strap_material,
      dial_color = EXCLUDED.dial_color,
      case_size_mm = EXCLUDED.case_size_mm,
      water_resistance = EXCLUDED.water_resistance,
      images = EXCLUDED.images,
      availability = EXCLUDED.availability,
      is_new = EXCLUDED.is_new,
      is_best_seller = EXCLUDED.is_best_seller,
      is_luxury = EXCLUDED.is_luxury,
      is_featured_in_hero = EXCLUDED.is_featured_in_hero,
      styles = EXCLUDED.styles,
      tags = EXCLUDED.tags,
      description = EXCLUDED.description,
      rating = EXCLUDED.rating,
      reviews_count = EXCLUDED.reviews_count,
      video_360 = EXCLUDED.video_360,
      updated_at = NOW();
  `;
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`DELETE FROM products WHERE id = ${id};`;
};

// =========================================================================
// UPCOMING WATCHES REPOSITORY
// =========================================================================
export const getUpcoming = async (): Promise<UpcomingWatch[]> => {
  if (!isNeonConfigured()) return UPCOMING_WATCHES;
  const sql = getSql();
  const rows = await sql`SELECT * FROM upcoming_watches ORDER BY created_at DESC;`;
  return rows.map((r: any) => ({
    id: r.id,
    brand: r.brand,
    model: r.model,
    reference: r.reference,
    expectedArrival: r.expected_arrival,
    expectedArrivalDate: r.expected_arrival_date,
    statusBadge: r.status_badge,
    estimatedPriceBDT: r.estimated_price_bdt ? Number(r.estimated_price_bdt) : undefined,
    movement: r.movement,
    caseSize: r.case_size,
    dialColor: r.dial_color,
    description: r.description,
    image: r.image,
    images: Array.isArray(r.images) ? r.images : JSON.parse(r.images || '[]'),
    keyFeature: r.key_feature,
    brandId: r.brand_id,
    brandName: r.brand_name,
    name: r.name,
    gender: r.gender,
    caseMaterial: r.case_material,
    strapMaterial: r.strap_material,
    caseSizeMm: r.case_size_mm ? Number(r.case_size_mm) : undefined,
    waterResistance: r.water_resistance,
    styles: Array.isArray(r.styles) ? r.styles : JSON.parse(r.styles || '[]'),
    tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags || '[]')
  }));
};

export const saveUpcoming = async (u: UpcomingWatch): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`
    INSERT INTO upcoming_watches (
      id, brand, model, reference, expected_arrival, expected_arrival_date,
      status_badge, estimated_price_bdt, movement, case_size, dial_color,
      description, image, images, key_feature, brand_id, brand_name, name,
      gender, case_material, strap_material, case_size_mm, water_resistance, styles, tags
    ) VALUES (
      ${u.id}, ${u.brand}, ${u.model}, ${u.reference}, ${u.expectedArrival},
      ${u.expectedArrivalDate || null}, ${u.statusBadge || 'In Transit'},
      ${u.estimatedPriceBDT || null}, ${u.movement || ''}, ${u.caseSize || ''},
      ${u.dialColor || ''}, ${u.description || ''}, ${u.image},
      ${JSON.stringify(u.images || [u.image])}::jsonb, ${u.keyFeature || ''},
      ${u.brandId || null}, ${u.brandName || null}, ${u.name || null},
      ${u.gender || 'men'}, ${u.caseMaterial || null}, ${u.strapMaterial || null},
      ${u.caseSizeMm || null}, ${u.waterResistance || null},
      ${JSON.stringify(u.styles || [])}::jsonb, ${JSON.stringify(u.tags || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      brand = EXCLUDED.brand,
      model = EXCLUDED.model,
      reference = EXCLUDED.reference,
      expected_arrival = EXCLUDED.expected_arrival,
      expected_arrival_date = EXCLUDED.expected_arrival_date,
      status_badge = EXCLUDED.status_badge,
      estimated_price_bdt = EXCLUDED.estimated_price_bdt,
      movement = EXCLUDED.movement,
      case_size = EXCLUDED.case_size,
      dial_color = EXCLUDED.dial_color,
      description = EXCLUDED.description,
      image = EXCLUDED.image,
      images = EXCLUDED.images,
      key_feature = EXCLUDED.key_feature,
      updated_at = NOW();
  `;
};

export const deleteUpcoming = async (id: string): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`DELETE FROM upcoming_watches WHERE id = ${id};`;
};

// =========================================================================
// DELIVERED WATCHES REPOSITORY
// =========================================================================
export const getDelivered = async (): Promise<DeliveredWatch[]> => {
  if (!isNeonConfigured()) return DELIVERED_WATCHES;
  const sql = getSql();
  const rows = await sql`SELECT * FROM delivered_watches ORDER BY created_at DESC;`;
  return rows.map((r: any) => ({
    id: r.id,
    brand: r.brand,
    model: r.model,
    reference: r.reference,
    soldPriceBDT: r.sold_price_bdt ? Number(r.sold_price_bdt) : undefined,
    deliveryLocation: r.delivery_location,
    deliveredDate: r.delivered_date,
    image: r.image,
    clientName: r.client_name,
    clientReview: r.client_review,
    rating: Number(r.rating || 5),
    verifiedPurchase: r.verified_purchase
  }));
};

export const saveDelivered = async (d: DeliveredWatch): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`
    INSERT INTO delivered_watches (
      id, brand, model, reference, sold_price_bdt, delivery_location,
      delivered_date, image, client_name, client_review, rating, verified_purchase
    ) VALUES (
      ${d.id}, ${d.brand}, ${d.model}, ${d.reference}, ${d.soldPriceBDT || null},
      ${d.deliveryLocation}, ${d.deliveredDate}, ${d.image},
      ${d.clientName}, ${d.clientReview}, ${d.rating || 5}, ${d.verifiedPurchase ?? true}
    )
    ON CONFLICT (id) DO UPDATE SET
      brand = EXCLUDED.brand,
      model = EXCLUDED.model,
      reference = EXCLUDED.reference,
      sold_price_bdt = EXCLUDED.sold_price_bdt,
      delivery_location = EXCLUDED.delivery_location,
      delivered_date = EXCLUDED.delivered_date,
      image = EXCLUDED.image,
      client_name = EXCLUDED.client_name,
      client_review = EXCLUDED.client_review,
      rating = EXCLUDED.rating,
      verified_purchase = EXCLUDED.verified_purchase,
      updated_at = NOW();
  `;
};

export const deleteDelivered = async (id: string): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`DELETE FROM delivered_watches WHERE id = ${id};`;
};

// =========================================================================
// AUTHORIZED BRANDS REPOSITORY
// =========================================================================
export const getBrands = async (): Promise<AuthorizedBrand[]> => {
  if (!isNeonConfigured()) return DEFAULT_BRANDS;
  const sql = getSql();
  const rows = await sql`SELECT * FROM authorized_brands ORDER BY sort_order ASC, name ASC;`;
  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    logo: r.logo || undefined,
    font: r.font || undefined,
    color: r.color || undefined
  }));
};

export const saveBrands = async (brands: AuthorizedBrand[]): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  for (let i = 0; i < brands.length; i++) {
    const b = brands[i];
    await sql`
      INSERT INTO authorized_brands (id, name, logo, font, color, sort_order)
      VALUES (
        ${b.id || `brand_${Date.now()}_${i}`}, ${b.name}, ${b.logo || null},
        ${b.font || 'font-serif'}, ${b.color || '#e6ca85'}, ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        logo = EXCLUDED.logo,
        font = EXCLUDED.font,
        color = EXCLUDED.color,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW();
    `;
  }
};

// =========================================================================
// SITE SETTINGS & CONTACT NUMBERS REPOSITORY
// =========================================================================
export const getSiteSettings = async (): Promise<SiteInfo> => {
  if (!isNeonConfigured()) return SITE_INFO;
  const sql = getSql();
  const rows = await sql`SELECT * FROM site_settings WHERE id = 'current' LIMIT 1;`;
  if (!rows || rows.length === 0) return SITE_INFO;
  const r = rows[0];
  return {
    name: r.name || SITE_INFO.name,
    domain: r.domain || SITE_INFO.domain,
    email: r.email || SITE_INFO.email,
    location: r.location || SITE_INFO.location,
    announcement: r.announcement || SITE_INFO.announcement,
    address: r.address || SITE_INFO.address,
    secondaryAddress: r.secondary_address || SITE_INFO.secondaryAddress,
    openingHours: r.opening_hours || SITE_INFO.openingHours,
    instagram: r.instagram || SITE_INFO.instagram,
    facebook: r.facebook || SITE_INFO.facebook,
    phone: r.phone || SITE_INFO.phone,
    phoneDisplay: r.phone_display || SITE_INFO.phoneDisplay,
    phoneIntl: r.phone_intl || SITE_INFO.phoneIntl,
    whatsappNumber: r.whatsapp_number || SITE_INFO.whatsappNumber,
    whatsappLink: r.whatsapp_link || SITE_INFO.whatsappLink,
    topHeaderHotlineDisplay: r.top_header_hotline_display || SITE_INFO.topHeaderHotlineDisplay,
    topHeaderHotlineDial: r.top_header_hotline_dial || SITE_INFO.topHeaderHotlineDial,
    topHeaderWhatsappNumber: r.top_header_whatsapp_number || SITE_INFO.topHeaderWhatsappNumber,
    topHeaderWhatsappLink: r.top_header_whatsapp_link || SITE_INFO.topHeaderWhatsappLink,
    floatingWhatsappDisplay: r.floating_whatsapp_display || SITE_INFO.floatingWhatsappDisplay,
    floatingWhatsappNumber: r.floating_whatsapp_number || SITE_INFO.floatingWhatsappNumber,
    floatingWhatsappLink: r.floating_whatsapp_link || SITE_INFO.floatingWhatsappLink,
    productInquiryPhone: r.product_inquiry_phone || SITE_INFO.productInquiryPhone,
    productInquiryWhatsapp: r.product_inquiry_whatsapp || SITE_INFO.productInquiryWhatsapp,
    productInquiryDisplay: r.product_inquiry_display || SITE_INFO.productInquiryDisplay,
    prebookPhone: r.prebook_phone || SITE_INFO.prebookPhone,
    prebookWhatsapp: r.prebook_whatsapp || SITE_INFO.prebookWhatsapp,
    prebookDisplay: r.prebook_display || SITE_INFO.prebookDisplay,
    sellExchangePhone: r.sell_exchange_phone || SITE_INFO.sellExchangePhone,
    sellExchangeWhatsapp: r.sell_exchange_whatsapp || SITE_INFO.sellExchangeWhatsapp,
    aboutPhone: r.about_phone || SITE_INFO.aboutPhone,
    aboutWhatsapp: r.about_whatsapp || SITE_INFO.aboutWhatsapp,
    deliveredPhone: r.delivered_phone || SITE_INFO.deliveredPhone,
    deliveredWhatsapp: r.delivered_whatsapp || SITE_INFO.deliveredWhatsapp,
    footerPhone: r.footer_phone || SITE_INFO.footerPhone,
    footerWhatsapp: r.footer_whatsapp || SITE_INFO.footerWhatsapp
  };
};

export const saveSiteSettings = async (s: SiteInfo): Promise<void> => {
  if (!isNeonConfigured()) return;
  const sql = getSql();
  await sql`
    INSERT INTO site_settings (
      id, name, domain, email, location, announcement, address, secondary_address,
      opening_hours, instagram, facebook, phone, phone_display, phone_intl,
      whatsapp_number, whatsapp_link, top_header_hotline_display, top_header_hotline_dial,
      top_header_whatsapp_number, top_header_whatsapp_link, floating_whatsapp_display,
      floating_whatsapp_number, floating_whatsapp_link, product_inquiry_phone,
      product_inquiry_whatsapp, product_inquiry_display, prebook_phone,
      prebook_whatsapp, prebook_display, sell_exchange_phone,
      sell_exchange_whatsapp, about_phone, about_whatsapp, delivered_phone,
      delivered_whatsapp, footer_phone, footer_whatsapp
    ) VALUES (
      'current', ${s.name}, ${s.domain}, ${s.email}, ${s.location}, ${s.announcement},
      ${s.address || ''}, ${s.secondaryAddress || ''}, ${s.openingHours || ''},
      ${s.instagram || ''}, ${s.facebook || ''}, ${s.phone || '01327-426905'},
      ${s.phoneDisplay}, ${s.phoneIntl}, ${s.whatsappNumber}, ${s.whatsappLink},
      ${s.topHeaderHotlineDisplay || s.phoneDisplay},
      ${s.topHeaderHotlineDial || s.phoneIntl},
      ${s.topHeaderWhatsappNumber || s.whatsappNumber},
      ${s.topHeaderWhatsappLink || s.whatsappLink},
      ${s.floatingWhatsappDisplay || s.phoneDisplay},
      ${s.floatingWhatsappNumber || s.whatsappNumber},
      ${s.floatingWhatsappLink || s.whatsappLink},
      ${s.productInquiryPhone || s.phoneDisplay},
      ${s.productInquiryWhatsapp || s.whatsappNumber},
      ${s.productInquiryDisplay || s.phoneDisplay},
      ${s.prebookPhone || s.phoneDisplay},
      ${s.prebookWhatsapp || s.whatsappNumber},
      ${s.prebookDisplay || s.phoneDisplay},
      ${s.sellExchangePhone || s.phoneDisplay},
      ${s.sellExchangeWhatsapp || s.whatsappNumber},
      ${s.aboutPhone || s.phoneDisplay},
      ${s.aboutWhatsapp || s.whatsappNumber},
      ${s.deliveredPhone || s.phoneDisplay},
      ${s.deliveredWhatsapp || s.whatsappNumber},
      ${s.footerPhone || s.phoneDisplay},
      ${s.footerWhatsapp || s.whatsappNumber}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      domain = EXCLUDED.domain,
      email = EXCLUDED.email,
      location = EXCLUDED.location,
      announcement = EXCLUDED.announcement,
      address = EXCLUDED.address,
      secondary_address = EXCLUDED.secondary_address,
      opening_hours = EXCLUDED.opening_hours,
      instagram = EXCLUDED.instagram,
      facebook = EXCLUDED.facebook,
      phone = EXCLUDED.phone,
      phone_display = EXCLUDED.phone_display,
      phone_intl = EXCLUDED.phone_intl,
      whatsapp_number = EXCLUDED.whatsapp_number,
      whatsapp_link = EXCLUDED.whatsapp_link,
      top_header_hotline_display = EXCLUDED.top_header_hotline_display,
      top_header_hotline_dial = EXCLUDED.top_header_hotline_dial,
      top_header_whatsapp_number = EXCLUDED.top_header_whatsapp_number,
      top_header_whatsapp_link = EXCLUDED.top_header_whatsapp_link,
      floating_whatsapp_display = EXCLUDED.floating_whatsapp_display,
      floating_whatsapp_number = EXCLUDED.floating_whatsapp_number,
      floating_whatsapp_link = EXCLUDED.floating_whatsapp_link,
      product_inquiry_phone = EXCLUDED.product_inquiry_phone,
      product_inquiry_whatsapp = EXCLUDED.product_inquiry_whatsapp,
      product_inquiry_display = EXCLUDED.product_inquiry_display,
      prebook_phone = EXCLUDED.prebook_phone,
      prebook_whatsapp = EXCLUDED.prebook_whatsapp,
      prebook_display = EXCLUDED.prebook_display,
      sell_exchange_phone = EXCLUDED.sell_exchange_phone,
      sell_exchange_whatsapp = EXCLUDED.sell_exchange_whatsapp,
      about_phone = EXCLUDED.about_phone,
      about_whatsapp = EXCLUDED.about_whatsapp,
      delivered_phone = EXCLUDED.delivered_phone,
      delivered_whatsapp = EXCLUDED.delivered_whatsapp,
      footer_phone = EXCLUDED.footer_phone,
      footer_whatsapp = EXCLUDED.footer_whatsapp,
      updated_at = NOW();
  `;
};
