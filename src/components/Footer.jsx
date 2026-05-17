import Logo from './Logo.jsx';
import { footerColumns } from '../data/content.jsx';

export default function Footer() {
  return (
    <footer id="about">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo tagline="Print" clipId="footOverlap" />
            <p>
              Local print shop in San Jose, California. Founded by two real
              estate partners who print daily, we serve Bay Area businesses,
              creators, and event producers with an obsessive eye for quality.
              G7-calibrated and proudly carbon-neutral.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((link, i) => (
                  <li key={`${col.heading}-${i}`}>
                    {link.href ? <a href={link.href}>{link.label}</a> : link.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bar">
          <span>© 2026 San Jose Print. All rights reserved.</span>
          <span>Carbon Neutral · G7 Master</span>
        </div>
      </div>
    </footer>
  );
}
