// Firebox Appliance renewal/support/subscription SKU mapping
// Categories: Security Suite Renewal, Support Renewal, Trade Up,
//             Individual Subscriptions, Cloud Data Retention
// Source: WGdata_20260325_101329.csv
//
// Structure: fireboxApplianceSkus[modelKey][serviceType][term] = stockCode

export const fireboxApplianceSkus = {
  'M270': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM27331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM27351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM27201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM27261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGM27101' },
    'spamBlocker': { '1 Year': 'NWG-WGM27111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGM27121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGM27131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGM27141' },
    'APT Blocker': { '1 Year': 'NWG-WGM27171' },
    'Network Discovery': { '1 Year': 'NWG-WGM27181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM27521' },
  },

  'M290': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM29040201', '3 Year': 'NWG-WGM29040203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM29040301', '3 Year': 'NWG-WGM29040303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM29040101', '3 Year': 'NWG-WGM29040103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM29040701', '3 Year': 'NWG-WGM29040703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM2900203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM2900211', '3 Year': 'NWG-WGM2900213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM29020801', '3 Year': 'NWG-WGM29020803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM29021801', '3 Year': 'NWG-WGM29021803' },
  },

  'M295': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM29540201', '3 Year': 'NWG-WGM29540203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM29540301', '3 Year': 'NWG-WGM29540303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM29540101', '3 Year': 'NWG-WGM29540103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM29540701', '3 Year': 'NWG-WGM29540703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM2950203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM2950211', '3 Year': 'NWG-WGM2950213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM29520801', '3 Year': 'NWG-WGM29520803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM29521801', '3 Year': 'NWG-WGM29521803' },
  },

  'M370': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM37331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM37351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM37201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM37261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGM37101' },
    'spamBlocker': { '1 Year': 'NWG-WGM37111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGM37121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGM37131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGM37141' },
    'Application Control': { '1 Year': 'NWG-WGM37151' },
    'APT Blocker': { '1 Year': 'NWG-WGM37171' },
    'Network Discovery': { '1 Year': 'NWG-WGM37181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM37521' },
  },

  'M390': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM39040201', '3 Year': 'NWG-WGM39040203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM39040301', '3 Year': 'NWG-WGM39040303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM39040101', '3 Year': 'NWG-WGM39040103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM39040701', '3 Year': 'NWG-WGM39040703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM3900203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM3900211', '3 Year': 'NWG-WGM3900213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM39020801', '3 Year': 'NWG-WGM39020803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM39021801', '3 Year': 'NWG-WGM39021803' },
  },

  'M395': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM39540201', '3 Year': 'NWG-WGM39540203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM39540301', '3 Year': 'NWG-WGM39540303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM39540101', '3 Year': 'NWG-WGM39540103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM39540701', '3 Year': 'NWG-WGM39540703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM3950203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM3950211', '3 Year': 'NWG-WGM3950213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM39520801', '3 Year': 'NWG-WGM39520803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM39521801', '3 Year': 'NWG-WGM39521803' },
  },

  'M440': {
    // Individual subscriptions
    'Network Discovery': { '1 Year': 'NWG-WGM44181' },
  },

  'M4600': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WG460331' },
    'Total Security Renewal': { '1 Year': 'NWG-WG460351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WG460201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WG460261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WG460101' },
    'spamBlocker': { '1 Year': 'NWG-WG460111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WG460121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WG460131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WG460141' },
    'Application Control': { '1 Year': 'NWG-WG460151' },
    'APT Blocker': { '1 Year': 'NWG-WG460171' },
    'Network Discovery': { '1 Year': 'NWG-WG460181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WG460521' },
  },

  'M470': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM47331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM47351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM47201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM47261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGM47101' },
    'spamBlocker': { '1 Year': 'NWG-WGM47111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGM47121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGM47131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGM47141' },
    'Application Control': { '1 Year': 'NWG-WGM47151' },
    'APT Blocker': { '1 Year': 'NWG-WGM47171' },
    'Network Discovery': { '1 Year': 'NWG-WGM47181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM47521' },
  },

  'M4800': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM48331', '3 Year': 'NWG-WGM48333' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM48351', '3 Year': 'NWG-WGM48353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM48201', '3 Year': 'NWG-WGM48203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM48221', '3 Year': 'NWG-WGM48223' },
    // Trade-ups
    'Trade Up Basic Security': { '1 Year': 'NWG-WGM48000201', '3 Year': 'NWG-WGM48000203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM48000211', '3 Year': 'NWG-WGM48000213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM48171', '3 Year': 'NWG-WGM48173' },
  },

  'M495': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM49540201', '3 Year': 'NWG-WGM49540203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM49540301', '3 Year': 'NWG-WGM49540303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM49540101', '3 Year': 'NWG-WGM49540103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM49540701', '3 Year': 'NWG-WGM49540703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM4950203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM4950211', '3 Year': 'NWG-WGM4950213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM49520801', '3 Year': 'NWG-WGM49520803' },
  },

  'M5600': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WG561331' },
    'Total Security Renewal': { '1 Year': 'NWG-WG561351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WG561201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WG561261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WG561101' },
    'spamBlocker': { '1 Year': 'NWG-WG561111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WG561121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WG561131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WG561141' },
    'Application Control': { '1 Year': 'NWG-WG561151' },
    'APT Blocker': { '1 Year': 'NWG-WG561171' },
    'Network Discovery': { '1 Year': 'NWG-WG560181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WG561521' },
  },

  'M570': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM57331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM57351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM57201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM57261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGM57101' },
    'spamBlocker': { '1 Year': 'NWG-WGM57111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGM57121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGM57131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGM57141' },
    'Application Control': { '1 Year': 'NWG-WGM57151' },
    'APT Blocker': { '1 Year': 'NWG-WGM57171' },
    'Network Discovery': { '1 Year': 'NWG-WGM57181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM57521' },
  },

  'M5800': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM58331', '3 Year': 'NWG-WGM58333' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM58351', '3 Year': 'NWG-WGM58353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM58201', '3 Year': 'NWG-WGM58203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM58221', '3 Year': 'NWG-WGM58223' },
    // Trade-ups
    'Trade Up Basic Security': { '1 Year': 'NWG-WGM58000201', '3 Year': 'NWG-WGM58000203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM58000211', '3 Year': 'NWG-WGM58000213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM58171', '3 Year': 'NWG-WGM58173' },
  },

  'M590': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM59040201', '3 Year': 'NWG-WGM59040203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM59040301', '3 Year': 'NWG-WGM59040303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM59040101', '3 Year': 'NWG-WGM59040103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM59040701', '3 Year': 'NWG-WGM59040703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM5900203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM5900211', '3 Year': 'NWG-WGM5900213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM59020801', '3 Year': 'NWG-WGM59020803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM59021801', '3 Year': 'NWG-WGM59021803' },
  },

  'M595': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM59540201', '3 Year': 'NWG-WGM59540203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM59540301', '3 Year': 'NWG-WGM59540303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM59540101', '3 Year': 'NWG-WGM59540103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM59540701', '3 Year': 'NWG-WGM59540703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM5950203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM5950211', '3 Year': 'NWG-WGM5950213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM59520801', '3 Year': 'NWG-WGM59520803' },
  },

  'M670': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM67331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM67351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM67201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM67261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGM67101' },
    'spamBlocker': { '1 Year': 'NWG-WGM67111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGM67121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGM67131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGM67141' },
    'Application Control': { '1 Year': 'NWG-WGM67151' },
    'APT Blocker': { '1 Year': 'NWG-WGM67171' },
    'Network Discovery': { '1 Year': 'NWG-WGM67181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM67521' },
  },

  'M690': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM69040201', '3 Year': 'NWG-WGM69040203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM69040301', '3 Year': 'NWG-WGM69040303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM69040101', '3 Year': 'NWG-WGM69040103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM69040701', '3 Year': 'NWG-WGM69040703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM6900203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM6900211', '3 Year': 'NWG-WGM6900213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM69020801', '3 Year': 'NWG-WGM69020803' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGM69021801', '3 Year': 'NWG-WGM69021803' },
  },

  'M695': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGM69540201', '3 Year': 'NWG-WGM69540203' },
    'Total Security Renewal': { '1 Year': 'NWG-WGM69540301', '3 Year': 'NWG-WGM69540303' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGM69540101', '3 Year': 'NWG-WGM69540103' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGM69540701', '3 Year': 'NWG-WGM69540703' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGM6950203' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGM6950211', '3 Year': 'NWG-WGM6950213' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGM69520801', '3 Year': 'NWG-WGM69520803' },
  },

  'T115-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT116341', '3 Year': 'NWG-WGT116343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT116351', '3 Year': 'NWG-WGT116353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT116201', '3 Year': 'NWG-WGT116203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT116261', '3 Year': 'NWG-WGT116263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1160203', '5 Year': 'NWG-WGT1160205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1160211', '3 Year': 'NWG-WGT1160213', '5 Year': 'NWG-WGT1160215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT116171', '3 Year': 'NWG-WGT116173', '5 Year': 'NWG-WGT116175' },
  },

  'T125': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT125341.', '3 Year': 'NWG-WGT125343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT125351', '3 Year': 'NWG-WGT125353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT125201', '3 Year': 'NWG-WGT125203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT125261', '3 Year': 'NWG-WGT125263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1250203', '5 Year': 'NWG-WGT1250205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1250211', '3 Year': 'NWG-WGT1250213', '5 Year': 'NWG-WGT1250215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT125171', '3 Year': 'NWG-WGT125173', '5 Year': 'NWG-WGT125175' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT12521801', '3 Year': 'NWG-WGT12521803' },
  },

  'T125-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT126341', '3 Year': 'NWG-WGT126343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT126351', '3 Year': 'NWG-WGT126353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT126201', '3 Year': 'NWG-WGT126203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT126261', '3 Year': 'NWG-WGT126263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1260203', '5 Year': 'NWG-WGT1260205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1260211', '3 Year': 'NWG-WGT1260213', '5 Year': 'NWG-WGT1260215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT126171', '3 Year': 'NWG-WGT126173', '5 Year': 'NWG-WGT126175' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT12621801', '3 Year': 'NWG-WGT12621803' },
  },

  'T145': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT145341', '3 Year': 'NWG-WGT145343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT145351', '3 Year': 'NWG-WGT145353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT145201', '3 Year': 'NWG-WGT145203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT145261', '3 Year': 'NWG-WGT145263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1450203', '5 Year': 'NWG-WGT1450205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1450211', '3 Year': 'NWG-WGT1450213', '5 Year': 'NWG-WGT1450215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT145171', '3 Year': 'NWG-WGT145173', '5 Year': 'NWG-WGT145175' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT14521801', '3 Year': 'NWG-WGT14521803' },
  },

  'T145-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT146341', '3 Year': 'NWG-WGT146343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT146351', '3 Year': 'NWG-WGT146353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT146201', '3 Year': 'NWG-WGT146203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT146261', '3 Year': 'NWG-WGT146263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1460203', '5 Year': 'NWG-WGT1460205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1460211', '3 Year': 'NWG-WGT1460213', '5 Year': 'NWG-WGT1460215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT146171', '3 Year': 'NWG-WGT146173', '5 Year': 'NWG-WGT146175' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT14621801', '3 Year': 'NWG-WGT14621803' },
  },

  'T15': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT15331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT15351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT15201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT15261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGT15101' },
    'spamBlocker': { '1 Year': 'NWG-WGT15111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGT15121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGT15131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGT15141' },
    'Application Control': { '1 Year': 'NWG-WGT15151' },
    'APT Blocker': { '1 Year': 'NWG-WGT15171' },
    'Network Discovery': { '1 Year': 'NWG-WGT15181' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT15521' },
  },

  'T15-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT16331' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT16351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT16201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT16261' },
    // Individual subscriptions
    'WebBlocker': { '1 Year': 'NWG-WGT16101' },
    'spamBlocker': { '1 Year': 'NWG-WGT16111' },
    'Gateway AntiVirus': { '1 Year': 'NWG-WGT16121' },
    'Intrusion Prevention Service': { '1 Year': 'NWG-WGT16131' },
    'Reputation Enabled Defense': { '1 Year': 'NWG-WGT16141' },
    'Application Control': { '1 Year': 'NWG-WGT16151' },
    'APT Blocker': { '1 Year': 'NWG-WGT16171' },
    'Network Discovery': { '1 Year': 'NWG-WGT16181' },
  },

  'T185': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT185341', '3 Year': 'NWG-WGT185343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT185351', '3 Year': 'NWG-WGT185353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT185201', '3 Year': 'NWG-WGT185203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT185261', '3 Year': 'NWG-WGT185263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT1850203', '5 Year': 'NWG-WGT1850205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT1850211', '3 Year': 'NWG-WGT1850213', '5 Year': 'NWG-WGT1850215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT185171', '3 Year': 'NWG-WGT185173', '5 Year': 'NWG-WGT185175' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT18521801', '3 Year': 'NWG-WGT18521803' },
  },

  'T20': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT20341' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT20351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT20201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT20261' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT20171' },
  },

  'T20-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT21341' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT21351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT21201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT21261' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT21171' },
  },

  'T25': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT25341', '3 Year': 'NWG-WGT25343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT25351', '3 Year': 'NWG-WGT25353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT25201', '3 Year': 'NWG-WGT25203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT25261', '3 Year': 'NWG-WGT25263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT250203', '5 Year': 'NWG-WGT250205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT250211', '3 Year': 'NWG-WGT250213', '5 Year': 'NWG-WGT250215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT25171', '3 Year': 'NWG-WGT25173', '5 Year': 'NWG-WGT25175' },
  },

  'T25-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT26341', '3 Year': 'NWG-WGT26343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT26351', '3 Year': 'NWG-WGT26353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT26201', '3 Year': 'NWG-WGT26203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT26261' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT260203', '5 Year': 'NWG-WGT260205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT260211', '3 Year': 'NWG-WGT260213', '5 Year': 'NWG-WGT260215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT26171', '3 Year': 'NWG-WGT26173', '5 Year': 'NWG-WGT26175' },
  },

  'T35': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WG35R331' },
    'Total Security Renewal': { '1 Year': 'NWG-WG35R351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WG35R201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WG35R261' },
  },

  'T40': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT40341' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT40351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT40201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT40261' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT40171' },
  },

  'T40-W': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT41341' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT41351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT41201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT41261' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT41171' },
  },

  'T45': {
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT45201', '3 Year': 'NWG-WGT45203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT45261', '3 Year': 'NWG-WGT45263' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT45171', '3 Year': 'NWG-WGT45173', '5 Year': 'NWG-WGT45175' },
  },

  'T45-CW': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT49341', '3 Year': 'NWG-WGT49343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT49351', '3 Year': 'NWG-WGT49353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT49201', '3 Year': 'NWG-WGT49203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT49261', '3 Year': 'NWG-WGT49263' },
    // Trade-ups
    'Trade Up Basic Security': { '1 Year': 'NWG-WGT490201', '3 Year': 'NWG-WGT490203', '5 Year': 'NWG-WGT490205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT490211', '3 Year': 'NWG-WGT490213', '5 Year': 'NWG-WGT490215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT49171', '3 Year': 'NWG-WGT49173', '5 Year': 'NWG-WGT49175' },
  },

  'T45-PoE': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT47341', '3 Year': 'NWG-WGT47343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT47351', '3 Year': 'NWG-WGT47353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT47201', '3 Year': 'NWG-WGT47203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT47261', '3 Year': 'NWG-WGT47263' },
    // Trade-ups
    'Trade Up Basic Security': { '3 Year': 'NWG-WGT470203', '5 Year': 'NWG-WGT470205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT470211', '3 Year': 'NWG-WGT470213', '5 Year': 'NWG-WGT470215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT47171', '3 Year': 'NWG-WGT47173', '5 Year': 'NWG-WGT47175' },
  },

  'T45-W-PoE': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT48341', '3 Year': 'NWG-WGT48343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT48351', '3 Year': 'NWG-WGT48353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT48201', '3 Year': 'NWG-WGT48203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT48261', '3 Year': 'NWG-WGT48263' },
    // Trade-ups
    'Trade Up Basic Security': { '1 Year': 'NWG-WGT480201', '3 Year': 'NWG-WGT480203', '5 Year': 'NWG-WGT480205' },
    'Trade Up Total Security': { '1 Year': 'NWG-WGT480211', '3 Year': 'NWG-WGT480213', '5 Year': 'NWG-WGT480215' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT48171', '3 Year': 'NWG-WGT48173', '5 Year': 'NWG-WGT48175' },
  },

  'T80': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT80341' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT80351' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT80201' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT80261' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT80171' },
    // Cloud data retention
    'Cloud 1-Month Data Retention': { '1 Year': 'NWG-WGT8021801' },
  },

  'T85-PoE': {
    // Suite renewals
    'Basic Security Renewal': { '1 Year': 'NWG-WGT85341', '3 Year': 'NWG-WGT85343' },
    'Total Security Renewal': { '1 Year': 'NWG-WGT85351', '3 Year': 'NWG-WGT85353' },
    // Support renewals
    'Standard Support Renewal': { '1 Year': 'NWG-WGT85201', '3 Year': 'NWG-WGT85203' },
    'Gold Support Renewal': { '1 Year': 'NWG-WGT85261', '3 Year': 'NWG-WGT85263' },
    // Individual subscriptions
    'APT Blocker': { '1 Year': 'NWG-WGT85171', '3 Year': 'NWG-WGT85173', '5 Year': 'NWG-WGT85175' },
  },
};
