import { benefits } from '../data/content.jsx';

export default function Benefits() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Why us</div>
            <h2 className="display">
              More than a<br />
              <em>print shop.</em>
            </h2>
          </div>
          <p>
            We've optimized every step — from prepress to fulfillment — so you
            spend less time managing print and more time on the work that
            matters.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`benefit fade-up${i > 0 ? ` delay-${i}` : ''}`}
            >
              <svg
                className="benefit-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {b.icon}
              </svg>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
