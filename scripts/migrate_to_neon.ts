import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ALL_PRODUCTS, UPCOMING_WATCHES, DELIVERED_WATCHES, DEFAULT_BRANDS, SITE_INFO } from '../src/data/goodtime';

// Load environment variables
dotenv.config();

const connectionString = process.env.DATABASE_URL;

async function runMigration() {
  console.log('----------------------------------------------------');
  console.log('🚀 Goodtime Watch SG • Neon.tech Database Migration');
  console.log('----------------------------------------------------');

  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in environment or .env file.');
    console.log('👉 Please set DATABASE_URL in your .env file:');
    console.log('   DATABASE_URL="postgresql://user:password@ep-xyz.region.aws.neon.tech/neondb?sslmode=require"');
    process.exit(1);
  }

  const sql = neon(connectionString);

  try {
    const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('📦 Step 1: Applying Database Schema (DDL)...');
    // Remove SQL comments (both multi-line and single-line)
    const cleanSql = schemaSql
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/--.*$/gm, '');

    const statements = cleanSql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      await (sql as any).query(statement);
    }
    console.log('✅ Schema tables verified/created successfully.');

    // -----------------------------------------------------------------
    // Step 2: Seed Authorized Brands
    // -----------------------------------------------------------------
    console.log(`📦 Step 2: Migrating ${DEFAULT_BRANDS.length} Authorized Brands...`);
    for (const b of DEFAULT_BRANDS) {
      await sql`
        INSERT INTO authorized_brands (id, name, logo, font, color)
        VALUES (${b.id || `brand_${b.name.toLowerCase()}`}, ${b.name}, ${b.logo || null}, ${b.font || 'font-serif'}, ${b.color || '#e6ca85'})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          logo = EXCLUDED.logo,
          font = EXCLUDED.font,
          color = EXCLUDED.color,
          updated_at = NOW();
      `;
    }
    console.log('✅ Brands migrated.');

    // -----------------------------------------------------------------
    // Step 3: Seed Products (New Arrivals / Stock)
    // -----------------------------------------------------------------
    console.log(`📦 Step 3: Migrating ${ALL_PRODUCTS.length} Products / Watches...`);
    for (const p of ALL_PRODUCTS) {
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
          name = EXCLUDED.name,
          model = EXCLUDED.model,
          reference = EXCLUDED.reference,
          images = EXCLUDED.images,
          availability = EXCLUDED.availability,
          is_featured_in_hero = EXCLUDED.is_featured_in_hero,
          description = EXCLUDED.description,
          updated_at = NOW();
      `;
    }
    console.log('✅ Products migrated.');

    // -----------------------------------------------------------------
    // Step 4: Seed Upcoming Watches
    // -----------------------------------------------------------------
    console.log(`📦 Step 4: Migrating ${UPCOMING_WATCHES.length} Upcoming Watches...`);
    for (const u of UPCOMING_WATCHES) {
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
          status_badge = EXCLUDED.status_badge,
          expected_arrival = EXCLUDED.expected_arrival,
          expected_arrival_date = EXCLUDED.expected_arrival_date,
          updated_at = NOW();
      `;
    }
    console.log('✅ Upcoming watches migrated.');

    // -----------------------------------------------------------------
    // Step 5: Seed Delivered Watches
    // -----------------------------------------------------------------
    console.log(`📦 Step 5: Migrating ${DELIVERED_WATCHES.length} Delivered Watches...`);
    for (const d of DELIVERED_WATCHES) {
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
          client_review = EXCLUDED.client_review,
          delivery_location = EXCLUDED.delivery_location,
          delivered_date = EXCLUDED.delivered_date,
          updated_at = NOW();
      `;
    }
    console.log('✅ Delivered watches migrated.');

    // -----------------------------------------------------------------
    // Step 6: Seed Site Settings & Contact Numbers
    // -----------------------------------------------------------------
    console.log('📦 Step 6: Updating Site Settings and Contact Numbers...');
    await sql`
      INSERT INTO site_settings (
        id, name, domain, email, location, announcement, address, secondary_address,
        opening_hours, instagram, facebook, phone, phone_display, phone_intl,
        whatsapp_number, whatsapp_link, top_header_hotline_display, top_header_hotline_dial,
        top_header_whatsapp_number, top_header_whatsapp_link, floating_whatsapp_display,
        floating_whatsapp_number, floating_whatsapp_link, sell_exchange_phone,
        sell_exchange_whatsapp, about_phone, about_whatsapp, delivered_phone,
        delivered_whatsapp, footer_phone, footer_whatsapp
      ) VALUES (
        'current', ${SITE_INFO.name}, ${SITE_INFO.domain}, ${SITE_INFO.email},
        ${SITE_INFO.location}, ${SITE_INFO.announcement}, ${SITE_INFO.address || ''},
        ${SITE_INFO.secondaryAddress || ''}, ${SITE_INFO.openingHours || ''},
        ${SITE_INFO.instagram || ''}, ${SITE_INFO.facebook || ''},
        ${SITE_INFO.phone || '01327-426905'}, ${SITE_INFO.phoneDisplay}, ${SITE_INFO.phoneIntl},
        ${SITE_INFO.whatsappNumber}, ${SITE_INFO.whatsappLink},
        ${SITE_INFO.topHeaderHotlineDisplay || SITE_INFO.phoneDisplay},
        ${SITE_INFO.topHeaderHotlineDial || SITE_INFO.phoneIntl},
        ${SITE_INFO.topHeaderWhatsappNumber || SITE_INFO.whatsappNumber},
        ${SITE_INFO.topHeaderWhatsappLink || SITE_INFO.whatsappLink},
        ${SITE_INFO.floatingWhatsappDisplay || SITE_INFO.phoneDisplay},
        ${SITE_INFO.floatingWhatsappNumber || SITE_INFO.whatsappNumber},
        ${SITE_INFO.floatingWhatsappLink || SITE_INFO.whatsappLink},
        ${SITE_INFO.sellExchangePhone || SITE_INFO.phoneDisplay},
        ${SITE_INFO.sellExchangeWhatsapp || SITE_INFO.whatsappNumber},
        ${SITE_INFO.aboutPhone || SITE_INFO.phoneDisplay},
        ${SITE_INFO.aboutWhatsapp || SITE_INFO.whatsappNumber},
        ${SITE_INFO.deliveredPhone || SITE_INFO.phoneDisplay},
        ${SITE_INFO.deliveredWhatsapp || SITE_INFO.whatsappNumber},
        ${SITE_INFO.footerPhone || SITE_INFO.phoneDisplay},
        ${SITE_INFO.footerWhatsapp || SITE_INFO.whatsappNumber}
      )
      ON CONFLICT (id) DO UPDATE SET
        announcement = EXCLUDED.announcement,
        top_header_hotline_display = EXCLUDED.top_header_hotline_display,
        top_header_hotline_dial = EXCLUDED.top_header_hotline_dial,
        top_header_whatsapp_number = EXCLUDED.top_header_whatsapp_number,
        top_header_whatsapp_link = EXCLUDED.top_header_whatsapp_link,
        floating_whatsapp_display = EXCLUDED.floating_whatsapp_display,
        floating_whatsapp_number = EXCLUDED.floating_whatsapp_number,
        floating_whatsapp_link = EXCLUDED.floating_whatsapp_link,
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
    console.log('✅ Site settings and contact numbers migrated.');

    console.log('----------------------------------------------------');
    console.log('🎉 SUCCESS: All data migrated to Neon.tech database!');
    console.log('----------------------------------------------------');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
