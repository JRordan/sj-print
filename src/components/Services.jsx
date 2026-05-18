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

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.num}>
              <div className="service-card-img">
                <img src={s.image} alt={s.name} loading="lazy" />
              </div>
              <div className="service-card-body">
                <div className="service-card-num">{s.num}</div>
                <h3 className="service-card-name">{s.name}</h3>
                <p className="service-card-desc">{s.desc}</p>
                <span className="service-card-link">Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
