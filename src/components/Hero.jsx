import { Fragment } from 'react';
import { heroStats, marqueeItems } from '../data/content.jsx';

export default function Hero() {
  // Duplicate the marquee items so the CSS keyframe (translateX -50%) loops seamlessly.
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
              business cards, brochures, large-format signage, custom apparel,
              and packaging on responsibly sourced stock — and deliver across
              the Bay in days, not weeks.
            </p>
            <div className="hero-ctas fade-up delay-2">
              <a href="#contact" className="btn btn-primary">
                Start a Project →
              </a>
              <a href="#services" className="btn btn-secondary">
                Browse Services
              </a>
            </div>
          </div>
          <aside className="hero-side fade-up delay-3">
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="stat-num">
                    {stat.num}
                    <sup>{stat.sup}</sup>
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
