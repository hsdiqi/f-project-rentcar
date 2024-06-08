import React from 'react';
import '../index.css';

function Footer() {
  return (
    <nav className="footer">
      <section className="section-container">
        <section className="content-wrapper">
          <div className="image-group">
            <img loading="lazy" src="/assets/suzuki.png" className="image" alt="Suzuki" />
            <img loading="lazy" src="/assets/toyota-logo.png" className="image-2" alt="Toyota" />
            <img loading="lazy" src="/assets/nissan-logo.png" className="image-3" alt="Nissan" />
            <img loading="lazy" src="/assets/mitsubisi-logo.png" className="image-4" alt="Mitsubishi" />
            <img loading="lazy" src="/assets/daihatsu-logo.png" className="image-5" alt="Daihatsu" />
          </div>
          <section className="address-container">
            <img loading="lazy" src="/assets/logo-car.png" className="decorative-image" alt="Logo" />
            <div className="contact-info-wrapper">
              <address className="contact-details">
                Contact Info<br /><br />
                <a href="https://www.google.com/maps/search/?api=1&query=Jl.Trosobo+Utama+Blok+D%2F14" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/location.png" className="contact-icon" alt="Location" /> Jl.Trosobo Utama Blok D/14
                </a><br /><br />
                <a href="https://wa.me/628969701669" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/phone-icon.png" className="contact-icon" alt="Phone" /> 08969701669
                </a><br /><br />
                <a href="mailto:rusdany33@gmail.com" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/mail-icon.png" className="contact-icon" alt="Email" /> rusdany33@gmail.com
                </a>
              </address>
            </div>
          </section>
          <p className="description">
            Dafasan Rentcar Jasa Layanan yang mementingkan kenyamanan customer, keamanan dan kepuasan. Terimakasih sudah mempercayakan layanan kami dengan sepenuh hati kami akan memberikan pelayanan terbaik kami.
          </p>
        </section>
      </section>
    </nav>
  );
}

export default Footer;
