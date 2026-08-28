import React from 'react'
import styles from "./styles.module.css";
import { ArrowUp, Droplet, FlaskConical, Gem, Leaf } from 'lucide-react';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';


export default function Footer() {
  return (
     <footer className={styles.footer}>
      <div className={styles.mainSection}>
        <div className={styles.footerContainer}>

          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <span className={styles.logoIcon}>S</span>
              <div className={styles.logoText}>
                <h2 className={styles.logoName}>SKINOVA</h2>
                <p className={styles.logoTagline}>REVEAL YOUR RADIANCE</p>
              </div>
            </div>
            <p className={styles.brandDescription}>
              Premium skincare crafted with science and nature for healthy,
              glowing skin. Reveal your natural radiance with Skinova.
            </p>
            <div className={styles.socialIcons}>
              <p  aria-label="Instagram" className={styles.socialIcon}>
                <i className="ti ti-brand-instagram" aria-hidden="true"><BsInstagram /></i>
              </p>
              <p aria-label="Facebook" className={styles.socialIcon}>
                <i className="ti ti-brand-facebook" aria-hidden="true"><BsFacebook /></i>
              </p>
              <p aria-label="Linked in" className={styles.socialIcon}>
                <i className="ti ti-brand-tiktok" aria-hidden="true"><BsLinkedin/></i>
              </p>
              <p aria-label="YouTube" className={styles.socialIcon}>
                <i className="ti ti-brand-youtube" aria-hidden="true"><BsYoutube/></i>
              </p>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li  className={styles.link}>All Products</li>
              <li  className={styles.link}>kincare</li>
              <li  className={styles.link}>Makeup</li>
              <li  className={styles.link}>Haircare</li>
              <li  className={styles.link}>Bath &amp; Body</li>
              <li  className={styles.link}>Fragrance</li>
              <li  className={styles.link}>Tools &amp; Accessories</li>
              <li  className={styles.link}>Supplements</li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Customer Care</h4>
            <ul className={styles.linkList}>
              <li  className={styles.link}>My Account </li>
              <li  className={styles.link}>Orders &amp; Returns </li>
              <li  className={styles.link}>Shipping Policy </li>
              <li  className={styles.link}>Return Policy </li>
              <li  className={styles.link}>Payment Methods </li>
              <li  className={styles.link}>FAQ </li>
              <li  className={styles.link}>Track Your Order </li>
              <li  className={styles.link}>Contact Us </li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>About Us</h4>
            <ul className={styles.linkList}>
              <li className={styles.link}>Our Story</li>
              <li className={styles.link}>Ingredients</li>
              <li className={styles.link}>Blog</li>
              <li className={styles.link}>Reviews</li>
              <li className={styles.link}>Sustainability</li>
              <li className={styles.link}>Careers</li>
              <li className={styles.link}>Affiliate Program</li>
              <li className={styles.link}>Press</li>
            </ul>
          </div>

          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
          </div>

        </div>
      </div>

      <div className={styles.trustBar}>
        <div className={styles.trustContainer}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <i className="ti ti-leaf" aria-hidden="true"><Leaf /></i>
            </span>
            <div>
              <p className={styles.trustTitle}>Clean Ingredients</p>
              <p className={styles.trustSubtitle}>Safe &amp; gentle on skin</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <i className="ti ti-flask" aria-hidden="true"><FlaskConical /></i>
            </span>
            <div>
              <p className={styles.trustTitle}>Dermatologically Tested</p>
              <p className={styles.trustSubtitle}>Approved for all skin types</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <i className="ti ti-droplet" aria-hidden="true"><Droplet /></i>
            </span>
            <div>
              <p className={styles.trustTitle}>Clinically Proven</p>
              <p className={styles.trustSubtitle}>Real results, real confidence</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <i className="ti ti-diamond" aria-hidden="true"><Gem /></i>
            </span>
            <div>
              <p className={styles.trustTitle}>Premium Quality</p>
              <p className={styles.trustSubtitle}>Crafted with care</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>&copy; 2024 Skinova. All rights reserved.</p>

          <ul className={styles.bottomLinks}>
            <li className={styles.bottomLink}>Privacy Policy</li>
            <li className={styles.divider}>|</li>
            <li className={styles.bottomLink}>Terms &amp; Conditions</li>
            <li className={styles.divider}>|</li>
            <li className={styles.bottomLink}>Sitemap</li>
          </ul>

          <div className={styles.bottomRight}>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentBadge}>VISA</span>
              <span className={styles.paymentBadge}>Mastercard</span>
              <span className={styles.paymentBadge}>AMEX</span>
              <span className={styles.paymentBadge}>PayPal</span>
              <span className={styles.paymentBadge}>Apple Pay</span>
            </div>
            <button
              className={styles.scrollTopButton}
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="ti ti-arrow-up" aria-hidden="true"><ArrowUp/></i>
            </button>
          </div>
        </div>
      </div>
    </footer> 
  )
}


