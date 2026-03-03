/**
 * Product Pricing Data
 * 
 * Prices sourced from: leader_dbp_prices_2026-03-03.csv (DBP ex GST column)
 * Last updated: 2026-03-03
 * 
 * Structure:
 * - productPrices[productName][serviceType][term] = price (in AUD, ex GST)
 * - For appliance-only: productPrices[productName]['Appliance Only'] = price
 * 
 * Note: Set price to 0 or null if price is TBC (To Be Confirmed)
 */

// Tabletop Firebox prices (updated from leader_dbp_prices_2026-03-03.csv, DBP ex GST)
const tabletopPrices = {
  'Firebox T115-W': {
    'Appliance Only': 271,
    'Standard Support': {
      '1 Year': 467,
      '3 Year': 836,
      '5 Year': 1205,
    },
    'Basic Security': {
      '1 Year': 627,
      '3 Year': 1144,
      '5 Year': 2066,
    },
    'Total Security': {
      '1 Year': 1021,
      '3 Year': 1919,
      '5 Year': 3456,
    },
  },
  'Firebox T125': {
    'Appliance Only': 320,
    'Standard Support': {
      '1 Year': 467,
      '3 Year': 873,
      '5 Year': 1279,
    },
    'Basic Security': {
      '1 Year': 646,
      '3 Year': 1211,
      '5 Year': 2202,
    },
    'Total Security': {
      '1 Year': 1076,
      '3 Year': 2048,
      '5 Year': 3714,
    },
  },
  'Firebox T125-W': {
    'Appliance Only': 369,
    'Standard Support': {
      '1 Year': 578,
      '3 Year': 1070,
      '5 Year': 1562,
    },
    'Basic Security': {
      '1 Year': 799,
      '3 Year': 1476,
      '5 Year': 2669,
    },
    'Total Security': {
      '1 Year': 1316,
      '3 Year': 2472,
      '5 Year': 4477,
    },
  },
  'Firebox T145': {
    'Appliance Only': 486,
    'Standard Support': {
      '1 Year': 830,
      '3 Year': 1476,
      '5 Year': 2208,
    },
    'Basic Security': {
      '1 Year': 1113,
      '3 Year': 2060,
      '5 Year': 3727,
    },
    'Total Security': {
      '1 Year': 1747,
      '3 Year': 3481,
      '5 Year': 6334,
    },
  },
  'Firebox T185': {
    'Appliance Only': 959,
    'Standard Support': {
      '1 Year': 1679,
      '3 Year': 3001,
      '5 Year': 5375,
    },
    'Basic Security': {
      '1 Year': 2239,
      '3 Year': 4157,
      '5 Year': 7515,
    },
    'Total Security': {
      '1 Year': 3751,
      '3 Year': 7023,
      '5 Year': 12761,
    },
  },
  'Firebox T185 (High Availability)': {
    'Appliance Only': 959,
    'Standard Support': {
      '1 Year': 627,
      '3 Year': 1421,
      '5 Year': 2853,
    },
  },
};

// M-Series Firebox prices (updated from leader_dbp_prices_2026-03-03.csv, DBP ex GST)
// Note: M-Series only has 1-Year and 3-Year terms in this price list
const mSeriesPrices = {
  'Firebox M295': {
    'Appliance Only': 1280,
    'Standard Support': {
      '1 Year': 2202,
      '3 Year': 3862,
    },
    'Basic Security': {
      '1 Year': 2940,
      '3 Year': 5461,
    },
    'Total Security': {
      '1 Year': 4637,
      '3 Year': 9458,
    },
  },
  'Firebox M395': {
    'Appliance Only': 1968,
    'Standard Support': {
      '1 Year': 3874,
      '3 Year': 6642,
    },
    'Basic Security': {
      '1 Year': 5129,
      '3 Year': 9397,
    },
    'Total Security': {
      '1 Year': 7995,
      '3 Year': 16211,
    },
  },
  'Firebox M495': {
    'Appliance Only': 2952,
    'Standard Support': {
      '1 Year': 7294,
      '3 Year': 12017,
    },
    'Basic Security': {
      '1 Year': 9532,
      '3 Year': 17035,
    },
    'Total Security': {
      '1 Year': 14563,
      '3 Year': 29014,
    },
  },
  'Firebox M595': {
    'Appliance Only': 3936,
    'Standard Support': {
      '1 Year': 10307,
      '3 Year': 16789,
    },
    'Basic Security': {
      '1 Year': 13370,
      '3 Year': 23787,
    },
    'Total Security': {
      '1 Year': 20380,
      '3 Year': 40428,
    },
  },
  'Firebox M695': {
    'Appliance Only': 5412,
    'Standard Support': {
      '1 Year': 13148,
      '3 Year': 21696,
    },
    'Basic Security': {
      '1 Year': 17158,
      '3 Year': 30761,
    },
    'Total Security': {
      '1 Year': 26296,
      '3 Year': 58199,
    },
  },
  'Firebox M4800': {
    'Appliance Only': 8671,
    'Standard Support': {
      '1 Year': 11334,
      '3 Year': 16678,
    },
    'Basic Security': {
      '1 Year': 15663,
      '3 Year': 30330,
    },
    'Total Security': {
      '1 Year': 25528,
      '3 Year': 65140,
    },
  },
  'Firebox M5800': {
    'Appliance Only': 11561,
    'Standard Support': {
      '1 Year': 34894,
      '3 Year': 47310,
    },
    'Basic Security': {
      '1 Year': 44961,
      '3 Year': 94503,
    },
    'Total Security': {
      '1 Year': 82872,
      '3 Year': 151127,
    },
  },
};

// Wi-Fi 6 Access Point prices (updated from leader_dbp_prices_2026-03-03.csv, DBP ex GST)
const wifiPrices = {
  // Indoor Access Points
  'AP130': {
    'Appliance Only': 428,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
  'AP230W': {
    'Appliance Only': 623,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
  'AP330': {
    'Appliance Only': 754,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
  'AP432': {
    'Appliance Only': 923,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
  // Outdoor Access Points
  'AP332CR': {
    'Appliance Only': 900,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
  'AP430CR': {
    'Appliance Only': 1674,
    'Standard Wi-Fi': {
      '1 Year': 92,
      '3 Year': 183,
      '5 Year': 275,
    },
    'USP Wi-Fi': {
      '1 Year': 153,
      '3 Year': 306,
      '5 Year': 458,
    },
  },
};

// Combined prices object
export const productPrices = {
  ...tabletopPrices,
  ...mSeriesPrices,
  ...wifiPrices,
};

/**
 * Get price for a specific product configuration
 * @param {string} productName - The product name
 * @param {string} serviceType - The service/license type (e.g., 'Basic Security', 'Standard Wi-Fi')
 * @param {string|null} term - The license term (e.g., '1 Year', '3 Year', '5 Year')
 * @returns {number|null} - The price in AUD ex GST, or null if not found
 */
export function getProductPrice(productName, serviceType, term = null) {
  const productData = productPrices[productName];
  if (!productData) return null;

  // Appliance only - no term needed
  if (serviceType === 'Appliance Only') {
    return productData['Appliance Only'] || null;
  }

  // Service with term
  const serviceData = productData[serviceType];
  if (!serviceData || !term) return null;

  return serviceData[term] || null;
}

/**
 * Get appliance-only price for a product
 * @param {string} productName - The product name
 * @returns {number|null} - The appliance-only price in AUD ex GST, or null if not found
 */
export function getAppliancePrice(productName) {
  return productPrices[productName]?.['Appliance Only'] || null;
}

/**
 * Get subscription price (without appliance) for a product configuration
 * @param {string} productName - The product name
 * @param {string} serviceType - The service/license type
 * @param {string} term - The license term
 * @returns {number|null} - The subscription price, or null if not found
 */
export function getSubscriptionPrice(productName, serviceType, term) {
  const fullPrice = getProductPrice(productName, serviceType, term);
  const appliancePrice = getAppliancePrice(productName);
  
  if (fullPrice === null) return null;
  if (appliancePrice === null) return fullPrice;
  
  // Return the difference (subscription portion only)
  return Math.max(0, fullPrice - appliancePrice);
}

/**
 * Format price for display
 * @param {number|null} price - The price to format
 * @returns {string} - Formatted price string (e.g., "$1,250" or "TBC")
 */
export function formatPrice(price) {
  if (price === null || price === undefined || price === 0) {
    return 'TBC';
  }
  return `$${price.toLocaleString('en-AU')}`;
}

/**
 * Get the base/starting price for a product (lowest subscription tier, 1 year)
 * Useful for comparison table display
 * @param {string} productName - The product name
 * @param {boolean} isWifi - Whether this is a Wi-Fi product
 * @returns {number|null} - The starting price, or null if not found
 */
export function getStartingPrice(productName, isWifi = false) {
  const productData = productPrices[productName];
  if (!productData) return null;

  // For display, show the most basic subscription price at 1 year
  const basicTier = isWifi ? 'Standard Wi-Fi' : 'Standard Support';
  return productData[basicTier]?.['1 Year'] || productData['Appliance Only'] || null;
}

export default productPrices;
