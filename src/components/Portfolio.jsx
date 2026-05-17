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
            A small slice of what's come through the shop lately — from indie
            wineries to YC-funded startups to community nonprofits.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((tile) => (
            <div className="portfolio-tile" key={tile.title}>
              <div className={`portfolio-tile-bg ${tile.bg}`}></div>
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
