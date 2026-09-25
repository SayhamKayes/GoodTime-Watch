-- =========================================================================
-- GOODTIME WATCH SG • NEON.TECH POSTGRESQL PRODUCTION DATABASE SCHEMA
-- =========================================================================

-- Enable uuid generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. PRODUCTS TABLE (Watch Inventory & Catalog)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    brand_id TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    reference TEXT NOT NULL,
    price NUMERIC,
    compare_at_price NUMERIC,
    gender VARCHAR(20) NOT NULL DEFAULT 'unisex',
    movement TEXT,
    case_material TEXT,
    strap_material TEXT,
    dial_color TEXT,
    case_size_mm NUMERIC,
    water_resistance TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    availability VARCHAR(50) NOT NULL DEFAULT 'In Stock',
    is_new BOOLEAN NOT NULL DEFAULT true,
    is_best_seller BOOLEAN NOT NULL DEFAULT false,
    is_luxury BOOLEAN NOT NULL DEFAULT true,
    is_featured_in_hero BOOLEAN NOT NULL DEFAULT false,
    styles JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    rating NUMERIC NOT NULL DEFAULT 5,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    date_added DATE DEFAULT CURRENT_DATE,
    video_360 TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_availability ON products(availability);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured_in_hero);

-- -------------------------------------------------------------------------
-- 2. UPCOMING WATCHES TABLE (Upcoming Shipments & Batch Allocations)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS upcoming_watches (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    reference TEXT NOT NULL,
    expected_arrival TEXT NOT NULL,
    expected_arrival_date DATE,
    status_badge VARCHAR(50) NOT NULL DEFAULT 'In Transit',
    estimated_price_bdt NUMERIC,
    movement TEXT,
    case_size TEXT,
    dial_color TEXT,
    description TEXT,
    image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    key_feature TEXT,
    brand_id TEXT,
    brand_name TEXT,
    name TEXT,
    gender VARCHAR(20) DEFAULT 'men',
    case_material TEXT,
    strap_material TEXT,
    case_size_mm NUMERIC,
    water_resistance TEXT,
    styles JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_upcoming_arrival_date ON upcoming_watches(expected_arrival_date);
CREATE INDEX IF NOT EXISTS idx_upcoming_brand ON upcoming_watches(brand);

-- -------------------------------------------------------------------------
-- 3. DELIVERED WATCHES TABLE (Successfully Delivered Archives & Reviews)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS delivered_watches (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    reference TEXT NOT NULL,
    sold_price_bdt NUMERIC,
    delivery_location TEXT NOT NULL,
    delivered_date TEXT NOT NULL,
    image TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_review TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    verified_purchase BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_delivered_brand ON delivered_watches(brand);

-- -------------------------------------------------------------------------
-- 4. AUTHORIZED BRANDS TABLE (Brand Marquee & Identity)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS authorized_brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    font TEXT DEFAULT 'font-serif',
    color TEXT DEFAULT '#e6ca85',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. SITE SETTINGS TABLE (Contact Numbers, Top Header, Floating Widget & Pages)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
    name TEXT NOT NULL DEFAULT 'Goodtime Watch SG',
    domain TEXT NOT NULL DEFAULT 'https://goodtimewatchsg.com/',
    email TEXT NOT NULL DEFAULT 'goodtimewatchsg@gmail.com',
    location TEXT DEFAULT 'Dhaka, Bangladesh',
    announcement TEXT DEFAULT 'Complimentary Insured Delivery on Selected Orders across Bangladesh',
    address TEXT DEFAULT 'High Street Centre, 1 North Bridge Road, Singapore 179094',
    secondary_address TEXT DEFAULT 'Gulshan-2, Dhaka, Bangladesh',
    opening_hours TEXT DEFAULT 'Mon - Sun: 11:00 AM - 8:00 PM (By Appointment)',
    instagram TEXT DEFAULT 'https://instagram.com/goodtime_watch_sg',
    facebook TEXT DEFAULT 'https://facebook.com/goodtimewatchsg',
    
    -- Main / Fallback Helpline & WhatsApp
    phone TEXT DEFAULT '01327-426905',
    phone_display TEXT DEFAULT '01327-426905',
    phone_intl TEXT DEFAULT '+8801327426905',
    whatsapp_number TEXT DEFAULT '8801327426905',
    whatsapp_link TEXT DEFAULT 'https://wa.me/8801327426905',

    -- Top Header Numbers (Shown at top of header announcement)
    top_header_hotline_display TEXT DEFAULT '01327-426905',
    top_header_hotline_dial TEXT DEFAULT '+8801327426905',
    top_header_whatsapp_number TEXT DEFAULT '8801327426905',
    top_header_whatsapp_link TEXT DEFAULT 'https://wa.me/8801327426905',

    -- Floating WhatsApp Desk Widget
    floating_whatsapp_display TEXT DEFAULT '01327-426905',
    floating_whatsapp_number TEXT DEFAULT '8801327426905',
    floating_whatsapp_link TEXT DEFAULT 'https://wa.me/8801327426905',

    -- Dedicated Product Inquiry & Pre-Book WhatsApp
    product_inquiry_phone TEXT DEFAULT '01327-426905',
    product_inquiry_whatsapp TEXT DEFAULT '8801327426905',
    product_inquiry_display TEXT DEFAULT '01327-426905',
    prebook_phone TEXT DEFAULT '01327-426905',
    prebook_whatsapp TEXT DEFAULT '8801327426905',
    prebook_display TEXT DEFAULT '01327-426905',

    -- Individual Page Numbers
    sell_exchange_phone TEXT DEFAULT '01327-426905',
    sell_exchange_whatsapp TEXT DEFAULT '8801327426905',
    about_phone TEXT DEFAULT '01327-426905',
    about_whatsapp TEXT DEFAULT '8801327426905',
    delivered_phone TEXT DEFAULT '01327-426905',
    delivered_whatsapp TEXT DEFAULT '8801327426905',
    footer_phone TEXT DEFAULT '01327-426905',
    footer_whatsapp TEXT DEFAULT '8801327426905',

    -- Admin Portal Passcode
    admin_passcode_hash TEXT DEFAULT 'admin123',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Initialize default site settings if empty
INSERT INTO site_settings (id)
VALUES ('current')
ON CONFLICT (id) DO NOTHING;
