import Logo from './Logo.jsx';
import { navLinks } from '../data/content.jsx';

export default function Nav() {
  return (
    <nav className="top">
      <div className="nav-inner">
        <a href="#">
          <Logo />
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#order" className="btn btn-primary">
            Get a Quote →
          </a>
        </div>
      </div>
    </nav>
  );
}
