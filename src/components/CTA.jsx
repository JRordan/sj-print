export default function CTA() {
  return (
    <section id="contact" className="cta">
      <div className="container">
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 24 }}>
          Get started
        </div>
        <h2 className="display">
          Let's print<br />
          <em>something good.</em>
        </h2>
        <p>
          Tell us about your project. We'll get back within 30 minutes with a
          quote, timeline, and any questions about your files.
        </p>
        <div className="cta-buttons">
          <a href="mailto:wecare@sjprint.us" className="btn btn-primary">
            Start a Project →
          </a>
          <a href="tel:4086939146" className="btn btn-outline-light">
            (408) 693-9146
          </a>
        </div>
      </div>
    </section>
  );
}
