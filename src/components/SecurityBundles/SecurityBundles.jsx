import React from 'react';
import styles from './SecurityBundles.module.css';

function SecurityBundles() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What Are the WatchGuard Security Service Bundles</h2>
      <p className={styles.intro}>
        Find out what fits your network&apos;s needs. Designed for maximum protection against
        sophisticated threats, our Firebox security services are packaged to remove the guesswork
        from network security.
      </p>

      <div className={styles.bundlesGrid}>
        <div className={styles.bundleCard}>
          <img src={`${import.meta.env.BASE_URL}licence sku images/standard_support.webp`} alt="Standard Support" className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3>Standard Support</h3>
            <p>
              In addition to stateful firewalling, the <strong>Standard Support</strong> license
              includes centralized management, full VPN capabilities, 24x7 support that shows up, and
              built-in SD-WAN.
            </p>
            <span className={styles.includedBadge}>Included with all appliances</span>
          </div>
        </div>

        <div className={styles.bundleCard}>
          <img src={`${import.meta.env.BASE_URL}licence sku images/basic_security_suite.webp`} alt="Basic Security Suite" className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3>Basic Security Suite</h3>
            <p>
              The <strong>Basic Security Suite</strong> offers essential network security features
              you&apos;d expect from a UTM device, such as intrusion prevention, antivirus, URL
              filtering, application control, spam blocking, and reputation checks. Plus, it provides
              centralized management, network visibility, and round-the-clock support.
            </p>
          </div>
        </div>

        <div className={styles.bundleCard}>
          <img src={`${import.meta.env.BASE_URL}licence sku images/total_security_suite.webp`} alt="Total Security Suite" className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3>Total Security Suite</h3>
            <p>
              The <strong>Total Security Suite</strong> offers all the features of the Basic Security
              Suite, plus advanced protections such as advanced malware detection, ThreatSync (XDR),
              improved network visibility, endpoint security, cloud sandboxing, DNS filtering, and
              real-time threat response directly from WatchGuard Cloud, our centralized management
              hub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecurityBundles;
