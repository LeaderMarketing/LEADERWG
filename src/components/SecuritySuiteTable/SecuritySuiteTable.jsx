import React, { useState } from 'react';
import { CaretDown, CheckCircle, XCircle } from '@phosphor-icons/react';
import styles from './SecuritySuiteTable.module.css';

const BASE_URL = import.meta.env.BASE_URL;

function Check() {
  return <CheckCircle size={18} weight="fill" className={styles.checkIcon} />;
}
function NoCheck() {
  return <XCircle size={16} weight="regular" className={styles.noCheckIcon} />;
}

const FEATURES = [
  {
    name: 'Stateful Firewall',
    icon: 'stateful Firewall.png',
    desc: 'a stateful firewall tracks active connections to distinguish legitimate traffic from malicious attempts, providing enhanced security',
    standard: true, basic: true, total: true,
  },
  {
    name: 'VPN',
    icon: 'VPN.png',
    desc: 'a virtual private network (VPN) creates an encrypted, private connection over the public internet',
    standard: true, basic: true, total: true,
  },
  {
    name: 'SD-WAN',
    icon: 'SD-WAN.png',
    desc: 'software-defined WAN (SD-WAN) automatically manages network traffic across multiple WAN connections according to defined policies',
    standard: true, basic: true, total: true,
  },
  {
    name: 'Access Portal',
    icon: 'Access Portal.png',
    desc: 'a clientless VPN solution that enables safe remote access to essential web applications from anywhere',
    standard: true, basic: true, total: true,
  },
  {
    name: 'Intrusion Prevention Service (IPS)',
    icon: 'Intrusion Prevention Service.png',
    desc: 'IPS uses constantly updated signatures to monitor all major protocols, ensuring real-time protection against network threats',
    standard: false, basic: true, total: true,
  },
  {
    name: 'Application Control',
    icon: 'Application Control.png',
    desc: 'controls access to applications by granting, denying, or limiting permissions based on a user\'s department, role, and the time of day, enhancing security and operational efficiency',
    standard: false, basic: true, total: true,
  },
  {
    name: 'WebBlocker',
    icon: 'WebBlocker.png',
    desc: 'automatically blocks known malicious sites and uses detailed content and URL filtering tools to prevent inappropriate content, save bandwidth, and boost productivity',
    standard: false, basic: true, total: true,
  },
  {
    name: 'spamBlocker',
    icon: 'spamBlocker.png',
    desc: 'provides real-time, continuous, and highly reliable protection from spam and phishing attempts',
    standard: false, basic: true, total: true,
  },
  {
    name: 'Gateway AntiVirus',
    icon: 'Gateway AntiVirus.png',
    desc: 'detects and blocks spyware, viruses, trojans, worms, rogueware, and complex threats, including the latest variants of known viruses',
    standard: false, basic: true, total: true,
  },
  {
    name: 'Reputation Enabled Defense',
    icon: 'Reputation Enabled Defense.png',
    desc: 'cloud-based web reputation service that aggregates data from multiple feeds to provide real-time protection from malicious sites and botnets',
    standard: false, basic: true, total: true,
  },
  {
    name: 'Network Discovery',
    icon: 'Network Discovery.png',
    desc: 'generates a visual map of all nodes on your network, ensuring only authorized devices are connected while detecting all open ports and protocols',
    standard: false, basic: true, total: true,
  },
  {
    name: 'APT Blocker',
    icon: 'APT Blocker.png',
    desc: 'detects and stops the most sophisticated attacks, including ransomware, zero-day threats, and other advanced malware',
    standard: false, basic: false, total: true,
  },
  {
    name: 'DNSWatch',
    icon: 'DNSWatch.png',
    desc: 'blocks malicious DNS requests, redirects users to a secure, informative page, and promotes best security practices to prevent phishing attacks and reduce malware infections',
    standard: false, basic: false, total: true,
  },
  {
    name: 'IntelligentAV',
    icon: 'IntelligentAV.png',
    desc: 'automates malware discovery and classify current and future threats in mere seconds with AI-powered intelligence',
    standard: false, basic: false, total: true,
  },
  {
    name: 'ThreatSync (XDR)',
    icon: 'Threat Detection and Response.png',
    desc: 'AI-driven threat detection and response for advanced threats, including ransomware, supply chain, and vulnerability-based attacks',
    standard: false, basic: false, total: true,
  },
  {
    name: 'EDR Core',
    icon: 'Threat Detection and Response.png',
    desc: 'continuous AI-powered endpoint monitoring for suspicious activity that detects threats in real time, and enables rapid investigation and response',
    standard: false, basic: false, total: true,
  },
  {
    name: 'WatchGuard Cloud',
    icon: 'WatchGuard Cloud.png',
    desc: 'securely stores firewall logs and reports for easy access, analysis, and compliance',
    standard: false, basic: true, total: true,
    subRows: [
      { label: 'Log Data Retention:', standard: '', basic: '90 Days', total: '365 Days' },
      { label: 'Report Data Retention:', standard: '', basic: '1 Day', total: '30 Days' },
    ],
  },
  {
    name: 'Support',
    icon: 'Support.png',
    desc: 'Access to live personal support, video tutorials, training, and online tools to ensure continuous and dependable support for partners and customers',
    standard: 'Standard (24x7)', basic: 'Standard (24x7)', total: 'Gold (24x7)',
    isTextRow: true,
  },
];

function SecuritySuiteTable() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className={styles.section}>
      <button
        className={styles.toggle}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        Compare Security Suite Features
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>
          <CaretDown size={14} weight="bold" />
        </span>
      </button>

      <div className={`${styles.collapseWrapper} ${expanded ? styles.collapseOpen : ''}`}>
        <div className={styles.collapseInner}>
          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Standard Support</th>
                  <th>Basic Security</th>
                  <th>Total Security</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <React.Fragment key={f.name}>
                    <tr>
                      <td>
                        <div className={styles.featureCell}>
                          <img
                            src={`${BASE_URL}security feature icons/${f.icon}`}
                            alt=""
                            className={styles.featureIcon}
                          />
                          <div>
                            <strong>{f.name}</strong>
                            <br />
                            {f.desc}
                          </div>
                        </div>
                      </td>
                      {f.isTextRow ? (
                        <>
                          <td className={styles.textCell}>{f.standard}</td>
                          <td className={styles.textCell}>{f.basic}</td>
                          <td className={f.total === 'Gold (24x7)' ? styles.goldText : styles.textCell}>{f.total}</td>
                        </>
                      ) : (
                        <>
                          <td>{f.standard ? <Check /> : <NoCheck />}</td>
                          <td>{f.basic ? <Check /> : <NoCheck />}</td>
                          <td>{f.total ? <Check /> : <NoCheck />}</td>
                        </>
                      )}
                    </tr>
                    {f.subRows?.map((sub) => (
                      <tr key={sub.label} className={styles.subRow}>
                        <td className={styles.subLabel}>{sub.label}</td>
                        <td className={styles.textCell}>{sub.standard}</td>
                        <td className={styles.textCell}>{sub.basic}</td>
                        <td className={styles.textCell}>{sub.total}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySuiteTable;
