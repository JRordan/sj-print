import { services } from '../data/content.jsx';

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Services</div>
            <h2 className="display">
              Everything we<br />
              <em>put to press.</em>
            </h2>
          </div>
          <p>
            Eight core service lines, dozens of finishes, and the flexibility to
            take on whatever your brand needs — from a 100-card run to a
            50,000-piece direct mail campaign.
          </p>
        </div>

        <div className="service-list">
          {services.map((s) => (
            <div className="service-row" key={s.num}>
              <span className="service-num">{s.num}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
