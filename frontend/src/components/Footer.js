import React from "react";
import { GitHub, Linkedin } from "react-feather";

// Re-using the standard SVG path for Instagram
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" role="img" aria-hidden="true">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5z"/>
  </svg>
);

export default function Footer() {
  const socials = [
    { icon: <GitHub size={24} />, label: "GitHub", href: "https://github.com/mrankush079" },
    { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mrankush079/" },
    { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/mr_ankush_079/" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand-group">
            <img
              src="/tab.png"
              alt="WeatherFlow logo"
              className="brand-logo-img footer-logo" // Using existing class and new footer-specific class
            />
            <div>
              <div className="footer-brand">
                WeatherFlow <span className="muted">— Weather-App</span>
              </div>
              <div className="footer-small footer-copyright-row">
                <span className="footer-copyright">© {year} Ankush Choudhary</span>
                <span className="muted">All rights reserved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-socials-group">
            <h4 className="footer-follow-heading">Follow Me</h4>
            <div className="footer-social-links">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}