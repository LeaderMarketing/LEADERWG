// Endpoint & Mobile product configuration → SKU mapping
// Per-seat subscriptions with license tier pricing

export const endpointProductSkus = {
  // ─── Core Endpoint Protection ─────────────────────────
  'EPP': {
    '1-50':      { '1 Year': 'NWG-WGEPP30101', '3 Year': 'NWG-WGEPP30103' },
    '51-100':    { '1 Year': 'NWG-WGEPP30201', '3 Year': 'NWG-WGEPP30203' },
    '101-250':   { '1 Year': 'NWG-WGEPP30301', '3 Year': 'NWG-WGEPP30303' },
    '251-500':   { '1 Year': 'NWG-WGEPP30401', '3 Year': 'NWG-WGEPP30403' },
    '501-1000':  { '1 Year': 'NWG-WGEPP30501', '3 Year': 'NWG-WGEPP30503' },
    '1001-5000': { '1 Year': 'NWG-WGEPP30601', '3 Year': 'NWG-WGEPP30603' },
    '5001+':     { '1 Year': 'NWG-WGEPP30701', '3 Year': 'NWG-WGEPP30703' },
  },

  'EDR': {
    '1-50':      { '1 Year': 'NWG-WGEDR30101', '3 Year': 'NWG-WGEDR30103' },
    '51-100':    { '1 Year': 'NWG-WGEDR30201', '3 Year': 'NWG-WGEDR30203' },
    '101-250':   { '1 Year': 'NWG-WGEDR30301', '3 Year': 'NWG-WGEDR30303' },
    '251-500':   { '1 Year': 'NWG-WGEDR30401', '3 Year': 'NWG-WGEDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGEDR30501', '3 Year': 'NWG-WGEDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGEDR30601', '3 Year': 'NWG-WGEDR30603' },
    '5001+':     { '1 Year': 'NWG-WGEDR30701', '3 Year': 'NWG-WGEDR30703' },
  },

  'EPDR': {
    '1-50':      { '1 Year': 'NWG-WGEPDR30101', '3 Year': 'NWG-WGEPDR30103' },
    '51-100':    { '1 Year': 'NWG-WGEPDR30201', '3 Year': 'NWG-WGEPDR30203' },
    '101-250':   { '1 Year': 'NWG-WGEPDR30301', '3 Year': 'NWG-WGEPDR30303' },
    '251-500':   { '1 Year': 'NWG-WGEPDR30401', '3 Year': 'NWG-WGEPDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGEPDR30501', '3 Year': 'NWG-WGEPDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGEPDR30601', '3 Year': 'NWG-WGEPDR30603' },
    '5001+':     { '1 Year': 'NWG-WGEPDR30701', '3 Year': 'NWG-WGEPDR30703' },
  },

  'Advanced EPDR': {
    '1-50':      { '1 Year': 'NWG-WGAEPDR30101', '3 Year': 'NWG-WGAEPDR30103' },
    '51-100':    { '1 Year': 'NWG-WGAEPDR30201', '3 Year': 'NWG-WGAEPDR30203' },
    '101-250':   { '1 Year': 'NWG-WGAEPDR30301', '3 Year': 'NWG-WGAEPDR30303' },
    '251-500':   { '1 Year': 'NWG-WGAEPDR30401', '3 Year': 'NWG-WGAEPDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGAEPDR30501', '3 Year': 'NWG-WGAEPDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGAEPDR30601', '3 Year': 'NWG-WGAEPDR30603' },
    '5001+':     { '1 Year': 'NWG-WGAEPDR30701', '3 Year': 'NWG-WGAEPDR30703' },
  },

  // ─── Endpoint Add-On Modules ──────────────────────────
  'Full Encryption': {
    '1-50':      { '1 Year': 'NWG-WGENCR30101', '3 Year': 'NWG-WGENCR30103' },
    '51-100':    { '1 Year': 'NWG-WGENCR30201', '3 Year': 'NWG-WGENCR30203' },
    '101-250':   { '1 Year': 'NWG-WGENCR30301', '3 Year': 'NWG-WGENCR30303' },
    '251-500':   { '1 Year': 'NWG-WGENCR30401', '3 Year': 'NWG-WGENCR30403' },
    '501-1000':  { '1 Year': 'NWG-WGENCR30501', '3 Year': 'NWG-WGENCR30503' },
    '1001-5000': { '1 Year': 'NWG-WGENCR30601', '3 Year': 'NWG-WGENCR30603' },
    '5001+':     { '1 Year': 'NWG-WGENCR30701', '3 Year': 'NWG-WGENCR30703' },
  },

  'Patch Management': {
    '1-50':      { '1 Year': 'NWG-WGPTCH30101', '3 Year': 'NWG-WGPTCH30103' },
    '51-100':    { '1 Year': 'NWG-WGPTCH30201', '3 Year': 'NWG-WGPTCH30203' },
    '101-250':   { '1 Year': 'NWG-WGPTCH30301', '3 Year': 'NWG-WGPTCH30303' },
    '251-500':   { '1 Year': 'NWG-WGPTCH30401', '3 Year': 'NWG-WGPTCH30403' },
    '501-1000':  { '1 Year': 'NWG-WGPTCH30501', '3 Year': 'NWG-WGPTCH30503' },
    '1001-5000': { '1 Year': 'NWG-WGPTCH30601', '3 Year': 'NWG-WGPTCH30603' },
    '5001+':     { '1 Year': 'NWG-WGPTCH30701', '3 Year': 'NWG-WGPTCH30703' },
  },

  'Advanced Reporting Tool': {
    '1-50':      { '1 Year': 'NWG-WGINSG30101', '3 Year': 'NWG-WGINSG30103' },
    '51-100':    { '1 Year': 'NWG-WGINSG30201', '3 Year': 'NWG-WGINSG30203' },
    '101-250':   { '1 Year': 'NWG-WGINSG30301', '3 Year': 'NWG-WGINSG30303' },
    '251-500':   { '1 Year': 'NWG-WGINSG30401', '3 Year': 'NWG-WGINSG30403' },
    '501-1000':  { '1 Year': 'NWG-WGINSG30501', '3 Year': 'NWG-WGINSG30503' },
    '1001-5000': { '1 Year': 'NWG-WGINSG30601', '3 Year': 'NWG-WGINSG30603' },
    '5001+':     { '1 Year': 'NWG-WGINSG30701', '3 Year': 'NWG-WGINSG30703' },
  },

  // ─── DNS & Mobile Protection ──────────────────────────
  'DNSWatchGO': {
    '1-50':      { '1 Year': 'NWG-WGDNS30101', '3 Year': 'NWG-WGDNS30103' },
    '51-100':    { '1 Year': 'NWG-WGDNS30201', '3 Year': 'NWG-WGDNS30203' },
    '101-250':   { '1 Year': 'NWG-WGDNS30301', '3 Year': 'NWG-WGDNS30303' },
    '251-500':   { '1 Year': 'NWG-WGDNS30401', '3 Year': 'NWG-WGDNS30403' },
    '501-1000':  { '1 Year': 'NWG-WGDNS30501', '3 Year': 'NWG-WGDNS30503' },
    '1001-5000': { '1 Year': 'NWG-WGDNS30601', '3 Year': 'NWG-WGDNS30603' },
    '5001+':     { '1 Year': 'NWG-WGDNS30701', '3 Year': 'NWG-WGDNS30703' },
  },

  // ─── User Security Bundle ─────────────────────────────
  'Passport': {
    '1-50':      { '1 Year': 'NWG-WGPSP30101', '3 Year': 'NWG-WGPSP30103' },
    '51-100':    { '1 Year': 'NWG-WGPSP30201', '3 Year': 'NWG-WGPSP30203' },
    '101-250':   { '1 Year': 'NWG-WGPSP30301', '3 Year': 'NWG-WGPSP30303' },
    '251-500':   { '1 Year': 'NWG-WGPSP30401', '3 Year': 'NWG-WGPSP30403' },
    '501-1000':  { '1 Year': 'NWG-WGPSP30501', '3 Year': 'NWG-WGPSP30503' },
    '1001-5000': { '1 Year': 'NWG-WGPSP30601', '3 Year': 'NWG-WGPSP30603' },
    '5001+':     { '1 Year': 'NWG-WGPSP30701', '3 Year': 'NWG-WGPSP30703' },
  },

  // ─── Legacy Panda Products ────────────────────────────
  'Panda EPP+': {
    '1-10':      { '1 Year': 'NWG-WGEPL011', '3 Year': 'NWG-WGEPL013' },
    '11-25':     { '1 Year': 'NWG-WGEPL021', '3 Year': 'NWG-WGEPL023' },
    '26-50':     { '1 Year': 'NWG-WGEPL031', '3 Year': 'NWG-WGEPL033' },
    '51-100':    { '1 Year': 'NWG-WGEPL041', '3 Year': 'NWG-WGEPL043' },
    '101-250':   { '1 Year': 'NWG-WGEPL051', '3 Year': 'NWG-WGEPL053' },
    '251-500':   { '1 Year': 'NWG-WGEPL061', '3 Year': 'NWG-WGEPL063' },
    '501-1000':  { '1 Year': 'NWG-WGEPL071', '3 Year': 'NWG-WGEPL073' },
    '1001-3000': { '1 Year': 'NWG-WGEPL081', '3 Year': 'NWG-WGEPL083' },
    '3000+':     { '1 Year': 'NWG-WGEPL091', '3 Year': 'NWG-WGEPL093' },
  },

  'Panda AD360': {
    '1-50':      { '1 Year': 'NWG-WGAD3011', '3 Year': 'NWG-WGAD3013' },
    '51-100':    { '1 Year': 'NWG-WGAD3021', '3 Year': 'NWG-WGAD3023' },
  },

  'Panda Patch Management': {
    '1-10':      { '1 Year': 'NWG-WGPAT011', '3 Year': 'NWG-WGPAT013' },
    '11-25':     { '1 Year': 'NWG-WGPAT021', '3 Year': 'NWG-WGPAT023' },
    '26-50':     { '1 Year': 'NWG-WGPAT031', '3 Year': 'NWG-WGPAT033' },
    '51-100':    { '1 Year': 'NWG-WGPAT041', '3 Year': 'NWG-WGPAT043' },
    '101-250':   { '1 Year': 'NWG-WGPAT051', '3 Year': 'NWG-WGPAT053' },
    '251-500':   { '1 Year': 'NWG-WGPAT061', '3 Year': 'NWG-WGPAT063' },
    '501-1000':  { '1 Year': 'NWG-WGPAT071', '3 Year': 'NWG-WGPAT073' },
    '1001-3000': { '1 Year': 'NWG-WGPAT081', '3 Year': 'NWG-WGPAT083' },
    '3000+':     { '1 Year': 'NWG-WGPAT091', '3 Year': 'NWG-WGPAT093' },
  },
};
