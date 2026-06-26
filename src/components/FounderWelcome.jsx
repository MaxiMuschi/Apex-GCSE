// Founder welcome band — portrait on the left, message on the right, set on a
// deep royal-navy surface with champagne-gold accents. Part of the marketing
// landing page only.
export default function FounderWelcome({
  name = 'Maxwell Muhanji',
  title = 'Founder & Director, Apex Academy',
  photo = '/founder.jpg',
}) {
  return (
    <section className="mkt-founder" aria-labelledby="founder-heading">
      <div className="mkt-wrap mkt-founder-grid">
        <figure className="mkt-founder-photo tilt">
          <img src={photo} alt={`${name}, ${title}`} loading="lazy" width="640" height="800" />
          <figcaption className="mkt-founder-badge">
            <span className="mkt-founder-name">{name}</span>
            <span className="mkt-founder-role">{title}</span>
          </figcaption>
          <span className="mkt-founder-glow" aria-hidden="true" />
        </figure>

        <div className="mkt-founder-copy">
          <span className="mkt-eyebrow mkt-eyebrow-gold">A word from our founder</span>
          <h2 id="founder-heading" className="mkt-h2 on-dark">
            Built for the student who refuses to settle for second place.
          </h2>
          <p className="mkt-founder-lead">
            “I started Apex Academy with one conviction: a child in Nairobi deserves the
            same world-class preparation as a child anywhere on earth. Every lesson,
            every question and every line of feedback here is engineered to turn effort
            into the grade — and the confidence that outlasts the exam.”
          </p>
          <p className="mkt-founder-lead">
            We pair a rigorous KS3 foundation with exam-sharp GCSE practice, so the climb
            from Year 7 to the top grade feels like one continuous, deliberate path.
          </p>
          <div className="mkt-founder-sign">
            <span className="mkt-founder-signature">{name}</span>
            <span className="mkt-founder-role">{title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
