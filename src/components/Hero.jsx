import { Fragment } from 'react';
import { heroStats, marqueeItems } from '../data/content.jsx';

export default function Hero() {
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <header className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-meta">
              Two Hours · Free Delivery · San Jose
            </div>
            <h1 className="display fade-up">
              Print that<br />
              <em>holds weight.</em>
            </h1>
            <p className="lead fade-up delay-1">
              A family-run print shop in the heart of San Jose. We print premium
              business cards, brochures, large-format signage, real estate
              marketing, and more — delivered across the Bay in hours, not weeks.
            </p>
            <div className="hero-ctas fade-up delay-2">
              <a href="#contact" className="btn btn-primary">
                Start a Project →
              </a>
              <a href="#services" className="btn btn-outline-light">
                Browse Services
              </a>
            </div>
          </div>

          <aside className="hero-photo-wrap fade-up delay-3">
            <img
              src="/images/portfolio/product3.jpeg"
              alt="Premium real estate flyer printed by SJPrint"
              className="hero-photo"
            />
            <div className="hero-stats-bar">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <div className="stat-num">
                    {stat.num}<sup>{stat.sup}</sup>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {marqueeLoop.map((item, i) => (
            <Fragment key={`${item}-${i}`}>
              <span>{item}</span>
              <span className="dot">●</span>
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
