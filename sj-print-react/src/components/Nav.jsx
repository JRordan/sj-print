import Logo from './Logo.jsx';
import { navLinks } from '../data/content.jsx';

export default function Nav() {
  return (
    <nav className="top">
      <div className="nav-inner">
        <a href="#" style={{ textDecoration: 'none' }}>
          <Logo tagline="Printing Local" clipId="navOverlap" />
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary">
            Get a Quote →
          </a>
        </div>
      </div>
    </nav>
  );
}
