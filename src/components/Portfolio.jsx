import { portfolio } from '../data/content.jsx';

export default function Portfolio() {
  return (
    <section id="work" className="portfolio">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Recent work</div>
            <h2 className="display">
              Pressed for<br />
              <em>brands we love.</em>
            </h2>
          </div>
          <p>
            A slice of what's come through the shop lately — real estate agents,
            local businesses, event producers, and everyone in between.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((tile) => (
            <div className="portfolio-tile" key={tile.title}>
              <img
                src={tile.image}
                alt={tile.title}
                className="portfolio-tile-img"
                loading="lazy"
              />
              <div className="portfolio-tile-content">
                <small>{tile.category}</small>
                <h4>{tile.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
