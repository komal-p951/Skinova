import React from 'react'
import styles from "./styles.module.css";
import { ArrowUp, Binoculars, Droplet, FlaskConical, Gem, Leaf, Search } from 'lucide-react';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';
import { BiUpArrow } from 'react-icons/bi';


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
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <i className="ti ti-brand-instagram" aria-hidden="true"><BsInstagram /></i>
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <i className="ti ti-brand-facebook" aria-hidden="true"><BsFacebook /></i>
              </a>
              <a href="#" aria-label="Linked in" className={styles.socialIcon}>
                <i className="ti ti-brand-tiktok" aria-hidden="true"><BsLinkedin/></i>
              </a>
              <a href="#" aria-label="YouTube" className={styles.socialIcon}>
                <i className="ti ti-brand-youtube" aria-hidden="true"><BsYoutube/></i>
              </a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><a href="/products" className={styles.link}>All Products</a></li>
              <li><a href="/skincare" className={styles.link}>Skincare</a></li>
              <li><a href="/makeup" className={styles.link}>Makeup</a></li>
              <li><a href="/haircare" className={styles.link}>Haircare</a></li>
              <li><a href="/bath-body" className={styles.link}>Bath &amp; Body</a></li>
              <li><a href="/fragrance" className={styles.link}>Fragrance</a></li>
              <li><a href="/tools-accessories" className={styles.link}>Tools &amp; Accessories</a></li>
              <li><a href="/supplements" className={styles.link}>Supplements</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Customer Care</h4>
            <ul className={styles.linkList}>
              <li><a href="/account" className={styles.link}>My Account</a></li>
              <li><a href="/orders-returns" className={styles.link}>Orders &amp; Returns</a></li>
              <li><a href="/shipping-policy" className={styles.link}>Shipping Policy</a></li>
              <li><a href="/return-policy" className={styles.link}>Return Policy</a></li>
              <li><a href="/payment-methods" className={styles.link}>Payment Methods</a></li>
              <li><a href="/faq" className={styles.link}>FAQ</a></li>
              <li><a href="/track-order" className={styles.link}>Track Your Order</a></li>
              <li><a href="/contact" className={styles.link}>Contact Us</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>About Us</h4>
            <ul className={styles.linkList}>
              <li><a href="/our-story" className={styles.link}>Our Story</a></li>
              <li><a href="/ingredients" className={styles.link}>Ingredients</a></li>
              <li><a href="/reviews" className={styles.link}>Reviews</a></li>
              <li><a href="/blog" className={styles.link}>Blog</a></li>
              <li><a href="/sustainability" className={styles.link}>Sustainability</a></li>
              <li><a href="/careers" className={styles.link}>Careers</a></li>
              <li><a href="/affiliate-program" className={styles.link}>Affiliate Program</a></li>
              <li><a href="/press" className={styles.link}>Press</a></li>
            </ul>
          </div>

          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton} aria-label="Subscribe">
                <i className="ti ti-mail" aria-hidden="true"><Search/></i>
              </button>
            </form>

            {/* <div className={styles.perksGrid}>
              <div className={styles.perkItem}>
                <span className={styles.perkIcon}>
                  <i className="ti ti-truck-delivery" aria-hidden="true"></i>
                </span>
                <div>
                  <p className={styles.perkTitle}>Free Shipping</p>
                  <p className={styles.perkSubtitle}>On orders over $50</p>
                </div>
              </div>
              <div className={styles.perkItem}>
                <span className={styles.perkIcon}>
                  <i className="ti ti-shield-check" aria-hidden="true"></i>
                </span>
                <div>
                  <p className={styles.perkTitle}>Secure Payment</p>
                  <p className={styles.perkSubtitle}>100% secure checkout</p>
                </div>
              </div>
              <div className={styles.perkItem}>
                <span className={styles.perkIcon}>
                  <i className="ti ti-refresh" aria-hidden="true"></i>
                </span>
                <div>
                  <p className={styles.perkTitle}>Easy Returns</p>
                  <p className={styles.perkSubtitle}>30-day return policy</p>
                </div>
              </div>
              <div className={styles.perkItem}>
                <span className={styles.perkIcon}>
                  <i className="ti ti-paw" aria-hidden="true"></i>
                </span>
                <div>
                  <p className={styles.perkTitle}>Cruelty Free</p>
                  <p className={styles.perkSubtitle}>Not tested on animals</p>
                </div>
              </div>
            </div> */}
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
            <li><a href="/privacy-policy" className={styles.bottomLink}>Privacy Policy</a></li>
            <li className={styles.divider}>|</li>
            <li><a href="/terms" className={styles.bottomLink}>Terms &amp; Conditions</a></li>
            <li className={styles.divider}>|</li>
            <li><a href="/sitemap" className={styles.bottomLink}>Sitemap</a></li>
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


