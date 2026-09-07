const RAW_API_URL = 'https://jsonhosting.com/api/json/c08ac095/raw';

/**
 * Backup dataset — used when the API is unreachable.
 * Each product carries its own `variants` object so the details screen
 * shows contextual options (color + spec) instead of hardcoded storage.
 */
const BACKUP_BIG_DEALS = [
  {
    id: '1',
    name: 'Apple MacBook Air M3 (16GB, 512GB)',
    brand: 'Apple',
    category: 'laptops',
    price: 114900,
    tag: 'Bestseller',
    variant: '(Midnight Black)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: 'Next-generation M3 chip with up to 18 hours battery life. Backed by your mutual fund portfolio.',
    variants: {
      colors: [
        { id: 'midnight', name: 'Midnight Black', hex: '#1E293B' },
        { id: 'starlight', name: 'Starlight Gold', hex: '#CBD5E1' },
        { id: 'silver', name: 'Silver', hex: '#94A3B8' },
        { id: 'spacegray', name: 'Space Gray', hex: '#64748B' },
      ],
      specs: [
        { id: '256gb', name: '256 GB / 8 GB RAM', priceAdd: 0 },
        { id: '512gb', name: '512 GB / 16 GB RAM', priceAdd: 20000 },
        { id: '1tb', name: '1 TB / 24 GB RAM', priceAdd: 50000 },
      ],
      specLabel: 'Storage',
    },
  },
  {
    id: '2',
    name: 'Ola S1 Pro Gen 2 Electric Scooter',
    brand: 'Ola Electric',
    category: 'vehicles',
    price: 129999,
    tag: 'Trending',
    variant: '(195 km Range / 11 kW Peak)',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    description: 'Zero-emission electric scooter with hyperdrive motor and touchscreen console.',
    variants: {
      colors: [
        { id: 'porcelain', name: 'Porcelain White', hex: '#F1F5F9' },
        { id: 'coral', name: 'Coral Glam', hex: '#F97316' },
        { id: 'midnight', name: 'Midnight Blue', hex: '#1E3A5F' },
        { id: 'matte', name: 'Matt Black', hex: '#1E293B' },
      ],
      specs: [
        { id: '3kw', name: '3 kW Mid-Range', priceAdd: 0 },
        { id: '6kw', name: '6 kW S1 Pro', priceAdd: 15000 },
        { id: '11kw', name: '11 kW Hyper', priceAdd: 30000 },
      ],
      specLabel: 'Motor',
    },
  },
  {
    id: '3',
    name: 'MakeMyTrip Europe Holiday Package',
    brand: 'MakeMyTrip',
    category: 'travel',
    price: 185000,
    tag: 'Exclusive',
    variant: '(7 Nights / 8 Days - Paris & Swiss)',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    description: 'Flights, 5-star hotel accommodation, and city excursions.',
    variants: {
      colors: [
        { id: 'economy', name: 'Economy Flight', hex: '#3B82F6' },
        { id: 'premium', name: 'Premium Economy', hex: '#8B5CF6' },
        { id: 'business', name: 'Business Class', hex: '#1E293B' },
      ],
      specs: [
        { id: '5n', name: '5 Nights / 6 Days', priceAdd: 0 },
        { id: '7n', name: '7 Nights / 8 Days', priceAdd: 35000 },
        { id: '10n', name: '10 Nights / 11 Days', priceAdd: 75000 },
      ],
      specLabel: 'Duration',
    },
  },
  {
    id: '4',
    name: 'Royal Enfield Hunter 350',
    brand: 'Royal Enfield',
    category: 'vehicles',
    price: 149900,
    tag: 'Popular',
    variant: '(Dapper Grey / Dual Channel ABS)',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    description: 'Modern retro roadster motorcycle powered by the J-series 349cc engine.',
    variants: {
      colors: [
        { id: 'grey', name: 'Dapper Grey', hex: '#94A3B8' },
        { id: 'ash', name: 'Dapper Ash', hex: '#78716C' },
        { id: 'white', name: 'Rebel White', hex: '#F1F5F9' },
        { id: 'red', name: 'Rebel Red', hex: '#EF4444' },
      ],
      specs: [
        { id: 'single', name: 'Single Channel ABS', priceAdd: 0 },
        { id: 'dual', name: 'Dual Channel ABS', priceAdd: 12000 },
      ],
      specLabel: 'Variant',
    },
  },
  {
    id: '5',
    name: 'Taj Hotels Luxury Staycation Voucher',
    brand: 'Taj Hotels',
    category: 'hotels',
    price: 45000,
    tag: 'Premium',
    variant: '(3 Nights Deluxe Ocean Suite)',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    description: 'Redeemable across 200+ IHCL Taj Palaces and Resorts.',
    variants: {
      colors: [
        { id: 'deluxe', name: 'Deluxe Room', hex: '#3B82F6' },
        { id: 'suite', name: 'Ocean Suite', hex: '#6D28D9' },
        { id: 'palace', name: 'Palace Suite', hex: '#1E293B' },
      ],
      specs: [
        { id: '1n', name: '1 Night Stay', priceAdd: 0 },
        { id: '3n', name: '3 Nights Stay', priceAdd: 22000 },
        { id: '5n', name: '5 Nights Stay', priceAdd: 50000 },
      ],
      specLabel: 'Stay Duration',
    },
  },
  {
    id: '6',
    name: 'Sony Bravia XR 65" OLED 4K TV',
    brand: 'Sony Croma',
    category: 'appliances',
    price: 169990,
    tag: 'Bestseller',
    variant: '(A80L Series)',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
    description: 'Cognitive Processor XR with Acoustic Surface Audio+.',
    variants: {
      colors: [
        { id: 'black', name: 'Carbon Black', hex: '#1E293B' },
        { id: 'silver', name: 'Silver Titanium', hex: '#CBD5E1' },
      ],
      specs: [
        { id: '55in', name: '55 inch Panel', priceAdd: 0 },
        { id: '65in', name: '65 inch Panel', priceAdd: 30000 },
        { id: '75in', name: '75 inch Panel', priceAdd: 80000 },
      ],
      specLabel: 'Screen Size',
    },
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra (512GB)',
    brand: 'Samsung',
    category: 'smartphones',
    price: 129999,
    tag: 'New',
    variant: '(Titanium Gray)',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    description: 'Galaxy AI, 200MP camera, built-in S-Pen, and Snapdragon 8 Gen 3.',
    variants: {
      colors: [
        { id: 'gray', name: 'Titanium Gray', hex: '#64748B' },
        { id: 'violet', name: 'Titanium Violet', hex: '#8B5CF6' },
        { id: 'yellow', name: 'Titanium Yellow', hex: '#EAB308' },
        { id: 'black', name: 'Titanium Black', hex: '#1E293B' },
      ],
      specs: [
        { id: '256gb', name: '256 GB', priceAdd: 0 },
        { id: '512gb', name: '512 GB', priceAdd: 10000 },
        { id: '1tb', name: '1 TB', priceAdd: 30000 },
      ],
      specLabel: 'Storage',
    },
  },
  {
    id: '8',
    name: 'Hyundai Creta Down Payment EMI Pass',
    brand: 'Hyundai',
    category: 'vehicles',
    price: 250000,
    tag: 'High-Value',
    variant: '(Booking & Initial Down Payment)',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    description: 'Cover your on-road vehicle down payment instantly by pledging mutual funds.',
    variants: {
      colors: [
        { id: 'white', name: 'Atlas White', hex: '#F1F5F9' },
        { id: 'gray', name: 'Titan Grey', hex: '#64748B' },
        { id: 'red', name: 'Fiery Red', hex: '#EF4444' },
        { id: 'blue', name: 'Abyss Blue', hex: '#1E3A5F' },
      ],
      specs: [
        { id: 'e', name: 'E Base (1.5L)', priceAdd: 0 },
        { id: 'sx', name: 'SX (1.5L Turbo)', priceAdd: 80000 },
        { id: 'sxo', name: 'SX(O) Turbo DCT', priceAdd: 150000 },
      ],
      specLabel: 'Trim Level',
    },
  },
];

// ─── Categories ────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'all', name: 'All Deals', icon: 'view-grid-outline', type: 'material' },
  { id: 'vehicles', name: 'Bikes & Cars', icon: 'motorbike', type: 'material' },
  { id: 'travel', name: 'Flights & Trips', icon: 'airplane', type: 'material' },
  { id: 'laptops', name: 'MacBooks', icon: 'laptop', type: 'material' },
  { id: 'smartphones', name: 'Smartphones', icon: 'cellphone', type: 'material' },
  { id: 'appliances', name: 'Croma Tech', icon: 'television', type: 'material' },
  { id: 'hotels', name: 'Taj Stays', icon: 'office-building', type: 'material' },
];

export const getLiveCategories = async () => CATEGORIES;

// ─── Products ──────────────────────────────────────────────────────────

/**
 * Generate category-aware fallback variants for API products
 * that don't include their own `variants` object.
 */
const generateVariantsForCategory = (category) => {
  switch (category) {
    case 'smartphones':
      return {
        colors: [
          { id: 'black', name: 'Midnight Black', hex: '#1E293B' },
          { id: 'silver', name: 'Silver', hex: '#CBD5E1' },
          { id: 'blue', name: 'Ocean Blue', hex: '#3B82F6' },
        ],
        specs: [
          { id: '128gb', name: '128 GB', priceAdd: 0 },
          { id: '256gb', name: '256 GB', priceAdd: 5000 },
          { id: '512gb', name: '512 GB', priceAdd: 15000 },
        ],
        specLabel: 'Storage',
      };
    case 'laptops':
      return {
        colors: [
          { id: 'silver', name: 'Silver', hex: '#CBD5E1' },
          { id: 'spacegray', name: 'Space Gray', hex: '#64748B' },
          { id: 'midnight', name: 'Midnight', hex: '#1E293B' },
        ],
        specs: [
          { id: '256gb', name: '256 GB / 8 GB RAM', priceAdd: 0 },
          { id: '512gb', name: '512 GB / 16 GB RAM', priceAdd: 20000 },
          { id: '1tb', name: '1 TB / 24 GB RAM', priceAdd: 50000 },
        ],
        specLabel: 'Storage',
      };
    case 'vehicles':
      return {
        colors: [
          { id: 'white', name: 'Pearl White', hex: '#F1F5F9' },
          { id: 'black', name: 'Glossy Black', hex: '#1E293B' },
          { id: 'red', name: 'Racing Red', hex: '#EF4444' },
        ],
        specs: [
          { id: 'base', name: 'Base Variant', priceAdd: 0 },
          { id: 'mid', name: 'Mid Variant', priceAdd: 25000 },
          { id: 'top', name: 'Top Variant', priceAdd: 60000 },
        ],
        specLabel: 'Variant',
      };
    case 'appliances':
      return {
        colors: [
          { id: 'black', name: 'Carbon Black', hex: '#1E293B' },
          { id: 'silver', name: 'Silver', hex: '#CBD5E1' },
        ],
        specs: [
          { id: 'base', name: 'Standard Model', priceAdd: 0 },
          { id: 'pro', name: 'Pro Model', priceAdd: 20000 },
        ],
        specLabel: 'Model',
      };
    case 'travel':
      return {
        colors: [
          { id: 'economy', name: 'Economy', hex: '#3B82F6' },
          { id: 'business', name: 'Business Class', hex: '#1E293B' },
        ],
        specs: [
          { id: 'short', name: '5 Nights', priceAdd: 0 },
          { id: 'long', name: '7 Nights', priceAdd: 35000 },
        ],
        specLabel: 'Duration',
      };
    case 'hotels':
      return {
        colors: [
          { id: 'deluxe', name: 'Deluxe Room', hex: '#3B82F6' },
          { id: 'suite', name: 'Executive Suite', hex: '#6D28D9' },
        ],
        specs: [
          { id: '1n', name: '1 Night', priceAdd: 0 },
          { id: '3n', name: '3 Nights', priceAdd: 22000 },
        ],
        specLabel: 'Stay Duration',
      };
    default:
      return {
        colors: [
          { id: 'default', name: 'Standard', hex: '#3B82F6' },
        ],
        specs: [
          { id: 'base', name: 'Base', priceAdd: 0 },
        ],
        specLabel: 'Option',
      };
  }
};

export const getLiveProducts = async (category = 'all', searchQuery = '') => {
  let list = [];

  try {
    const res = await fetch(RAW_API_URL);
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const rawData = await res.json();
    console.log('[API] Response received');

    if (Array.isArray(rawData))            list = rawData;
    else if (Array.isArray(rawData.data))   list = rawData.data;
    else if (Array.isArray(rawData.json))   list = rawData.json;
    else if (Array.isArray(rawData.record)) list = rawData.record;
    else                                    list = BACKUP_BIG_DEALS;
  } catch (error) {
    console.warn('[API] Fetch error, using fallback:', error.message);
    list = BACKUP_BIG_DEALS;
  }

  // 1. Filter by category
  if (category && category !== 'all') {
    list = list.filter(
      (item) => String(item.category).toLowerCase() === category.toLowerCase()
    );
  }

  // 2. Filter by search text
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }

  // 3. Enrich each product with EMI calculations & per-product variants
  return list.map((item) => {
    const price = Number(item.price) || 50000;
    const monthlyCost = Math.round(price / 12);

    // Use the product's own variants if provided, otherwise generate from category
    const variants = item.variants || generateVariantsForCategory(item.category);

    return {
      ...item,
      id: String(item.id),
      price,
      monthlyCost,
      variants,
      emiPlans: [
        { id: '6m',  months: 6,  perMonth: Math.round(price / 6),  label: '6 Months (0% Interest)' },
        { id: '12m', months: 12, perMonth: monthlyCost,             label: '12 Months (Recommended)' },
        { id: '24m', months: 24, perMonth: Math.round(price / 24),  label: '24 Months (Low EMI)' },
      ],
    };
  });
};
