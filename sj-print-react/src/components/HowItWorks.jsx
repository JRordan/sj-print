import { howSteps } from '../data/content.jsx';

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="display">
              From file<br />
              <em>to finished.</em>
            </h2>
          </div>
          <p>
            Three steps, Two hours, No surprises. Upload your art, approve a
            digital proof, and have your order in hand. We handle the rest.
          </p>
        </div>

        <div className="how-grid">
          {howSteps.map((step, i) => (
            <div
              key={step.num}
              className={`how-step fade-up${i > 0 ? ` delay-${i}` : ''}`}
            >
              <svg
                className="step-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                {step.icon}
              </svg>
              <span className="step-num">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
