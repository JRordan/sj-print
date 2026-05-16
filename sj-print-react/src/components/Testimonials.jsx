import { testimonials } from '../data/content.jsx';

export default function Testimonials() {
  return (
    <section id="reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              ★★★★★ &nbsp; 4.9 / 5 across 380+ reviews
            </div>
            <h2 className="display">
              Trusted by Bay<br />
              <em>Area builders.</em>
            </h2>
          </div>
          <p>
            From founders to wedding planners to gallery curators — what people
            say after their first order.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="quote" key={t.name}>
              <p className="quote-text">{t.text}</p>
              <div className="quote-author">
                <div className="quote-avatar">{t.initials}</div>
                <div>
                  <div className="quote-name">{t.name}</div>
                  <div className="quote-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
