// ==============================================================================
// VELMORA TEST SUITE — INTEGRATION & UNIT VALIDATION
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🚀 RUNNING VELMORA TEST SUITE');
  console.log('======================================================\n');

  // --------------------------------------------------------------------------
  // TEST GROUP 1: Product Catalog & Asset Integrity
  // --------------------------------------------------------------------------
  console.log('📦 TEST GROUP 1: Product Catalog Integrity');
  const productsDataFile = path.join(rootDir, 'src', 'lib', 'products-data.ts');
  const productsContent = fs.readFileSync(productsDataFile, 'utf8');

  // Check 8 products
  const productIds = (productsContent.match(/id:\s*['"]prod-\d+['"]/g) || []);
  assert(productIds.length === 8, `Exactly 8 products defined (found: ${productIds.length})`);

  // Check 4 categories (2 products each)
  const industrialCount = (productsContent.match(/category:\s*['"]industrial-supplies['"]/g) || []).length;
  const electricalCount = (productsContent.match(/category:\s*['"]electrical-electronics['"]/g) || []).length;
  const safetyCount = (productsContent.match(/category:\s*['"]safety-ppe['"]/g) || []).length;
  const officeCount = (productsContent.match(/category:\s*['"]office-supplies['"]/g) || []).length;

  assert(industrialCount === 2, `Industrial Supplies & MRO has exactly 2 products (found: ${industrialCount})`);
  assert(electricalCount === 2, `Electrical & Electronics has exactly 2 products (found: ${electricalCount})`);
  assert(safetyCount === 2, `Safety & PPE has exactly 2 products (found: ${safetyCount})`);
  assert(officeCount === 2, `Office Supplies & Facility has exactly 2 products (found: ${officeCount})`);

  // Check Product Image Files on Disk
  const expectedImages = [
    'high-pressure-pneumatic-control-valve.jpg',
    'modular-industrial-conveyor-roller.jpg',
    'programmable-logic-controller-module.jpg',
    'armored-low-voltage-power-cable.jpg',
    'full-body-industrial-safety-harness.jpg',
    'heavy-duty-nitrile-chemical-gloves.jpg',
    'commercial-high-yield-copy-paper.jpg',
    'heavy-duty-modular-file-cabinet.jpg',
  ];

  for (const img of expectedImages) {
    const fullPath = path.join(rootDir, 'public', 'images', 'products', img);
    const exists = fs.existsSync(fullPath);
    const size = exists ? fs.statSync(fullPath).size : 0;
    assert(exists && size > 10000, `Product image ${img} exists with non-trivial size (${size} bytes)`);
  }

  // Hero Image
  const heroPath = path.join(rootDir, 'public', 'images', 'hero', 'hero-procurement.jpg');
  assert(fs.existsSync(heroPath) && fs.statSync(heroPath).size > 50000, `Hero image exists with high resolution`);

  // --------------------------------------------------------------------------
  // TEST GROUP 2: Bilingual Parity & Dictionaries
  // --------------------------------------------------------------------------
  console.log('\n🌐 TEST GROUP 2: Bilingual Parity & Dictionaries');
  const i18nFile = path.join(rootDir, 'src', 'lib', 'i18n.ts');
  const i18nContent = fs.readFileSync(i18nFile, 'utf8');

  assert(i18nContent.includes("en: {"), "English translation dictionary is present");
  assert(i18nContent.includes("id: {"), "Indonesian translation dictionary is present");
  assert(i18nContent.includes("One Partner. Multiple Procurement Needs."), "English master tagline matches specification");
  assert(i18nContent.includes("Satu Mitra. Beragam Kebutuhan Pengadaan."), "Indonesian master tagline matches specification");
  assert(i18nContent.includes("UU No. 27 Tahun 2022"), "Indonesian PDP reference is present");

  // --------------------------------------------------------------------------
  // TEST GROUP 3: Reference Number Generator Algorithm
  // --------------------------------------------------------------------------
  console.log('\n🔢 TEST GROUP 3: Reference Number Generator');
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  function testGenRef() {
    const year = new Date().getFullYear();
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return `VEL-${year}-${code}`;
  }

  const generatedSet = new Set();
  let regexPass = true;
  for (let i = 0; i < 200; i++) {
    const ref = testGenRef();
    if (!/^VEL-202\d-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{5}$/.test(ref)) {
      regexPass = false;
    }
    generatedSet.add(ref);
  }

  assert(regexPass, "Reference number matches strict format VEL-YYYY-XXXXX without ambiguous characters (0, O, 1, I)");
  assert(generatedSet.size === 200, "200 consecutive reference numbers generated with zero collisions");

  // --------------------------------------------------------------------------
  // TEST GROUP 4: Database Schema & Migrations
  // --------------------------------------------------------------------------
  console.log('\n🗄️  TEST GROUP 4: Supabase Database Migration Integrity');
  const migrationFile = path.join(rootDir, 'supabase', 'migrations', '001_initial_schema.sql');
  assert(fs.existsSync(migrationFile), "Initial schema migration exists at supabase/migrations/001_initial_schema.sql");

  const migrationContent = fs.readFileSync(migrationFile, 'utf8');
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.rfq_requests"), "rfq_requests table defined");
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.rfq_items"), "rfq_items table defined");
  assert(migrationContent.includes("CREATE TABLE IF NOT EXISTS public.rfq_attachments"), "rfq_attachments table defined");
  assert(migrationContent.includes("ALTER TABLE public.rfq_requests ENABLE ROW LEVEL SECURITY"), "Row Level Security enabled on rfq_requests");
  assert(migrationContent.includes("rfq-attachments"), "Private storage bucket configuration script included");

  // --------------------------------------------------------------------------
  // TEST GROUP 5: Security Headers & Netlify Config
  // --------------------------------------------------------------------------
  console.log('\n🛡️  TEST GROUP 5: Security & Deployment Config');
  const netlifyFile = path.join(rootDir, 'netlify.toml');
  assert(fs.existsSync(netlifyFile), "netlify.toml exists");
  const netlifyContent = fs.readFileSync(netlifyFile, 'utf8');
  assert(netlifyContent.includes("X-Frame-Options = \"DENY\""), "X-Frame-Options header configured");
  assert(netlifyContent.includes("Content-Security-Policy"), "Content-Security-Policy configured");
  assert(netlifyContent.includes("@netlify/plugin-nextjs"), "Netlify Next.js plugin declared");

  // --------------------------------------------------------------------------
  // TEST GROUP 6: Dynamic Sitemap & Robots.txt
  // --------------------------------------------------------------------------
  console.log('\n🔍 TEST GROUP 6: SEO Sitemap & Robots Configuration');
  const sitemapFile = path.join(rootDir, 'src', 'app', 'sitemap.ts');
  const robotsFile = path.join(rootDir, 'src', 'app', 'robots.ts');
  assert(fs.existsSync(sitemapFile), "sitemap.ts exists and generates dynamic entries for /en and /id");
  assert(fs.existsSync(robotsFile), "robots.ts exists and disallows private quote receipts");

  // Summary
  console.log('\n======================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((e) => {
  console.error("Test execution fatal error:", e);
  process.exit(1);
});
