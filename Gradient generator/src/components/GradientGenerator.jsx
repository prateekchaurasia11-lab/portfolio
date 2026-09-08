import { useMemo, useState } from "react";

const DEFAULT_COLORS = {
  first: "#ff7a18",
  second: "#ffb347",
};

function createHexColor() {
  const chars = "0123456789abcdef";
  let color = "#";

  for (let index = 0; index < 6; index += 1) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }

  return color;
}

export default function GradientGenerator() {
  const [firstColor, setFirstColor] = useState(DEFAULT_COLORS.first);
  const [secondColor, setSecondColor] = useState(DEFAULT_COLORS.second);
  const [copyLabel, setCopyLabel] = useState("Copy CSS");

  const gradient = useMemo(
    () => `linear-gradient(to right, ${firstColor}, ${secondColor})`,
    [firstColor, secondColor],
  );

  const cssCode = `background: ${gradient};`;
  const previewStyle = { background: gradient };
  const pageStyle = {
    "--page-gradient": gradient,
    "--primary-color": firstColor,
    "--secondary-color": secondColor,
  };

  function changeFirstColor() {
    setFirstColor(createHexColor());
  }

  function changeSecondColor() {
    setSecondColor(createHexColor());
  }

  function randomizeGradient() {
    setFirstColor(createHexColor());
    setSecondColor(createHexColor());
  }

  async function copyCss() {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopyLabel("Copied!");
    } catch {
      setCopyLabel("Copy failed");
    }

    setTimeout(() => {
      setCopyLabel("Copy CSS");
    }, 1500);
  }

  return (
    <main className="gradient-page" style={pageStyle}>
      <div className="ambient-orb ambient-orb-left" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-right" aria-hidden="true" />

      <section className="generator-shell" aria-label="Gradient generator">
        <header className="hero-copy">
          <p className="eyebrow">Creative CSS Studio</p>
          <h1>Build gradients that feel alive.</h1>
          <p className="hero-text">
            Explore sharp color pairings, preview them instantly, and copy
            production-ready CSS without losing the mood of the composition.
          </p>

          <div className="hero-metrics" aria-label="Current gradient details">
            <div className="metric-card">
              <span>Primary tone</span>
              <strong>{firstColor}</strong>
            </div>

            <div className="metric-card">
              <span>Secondary tone</span>
              <strong>{secondColor}</strong>
            </div>
          </div>
        </header>

        <section className="generator-panel">
          <div className="panel-topline">
            <p>Live preview</p>
            <span>Linear blend</span>
          </div>

          <div className="gradient-preview" style={previewStyle} aria-label="Gradient preview">
            <div className="preview-overlay">
              <p>Canvas</p>
              <strong>{gradient}</strong>
            </div>
          </div>

          <div className="button-grid">
            <button type="button" className="tone-button" onClick={changeFirstColor}>
              Shuffle primary
            </button>

            <button type="button" className="tone-button" onClick={changeSecondColor}>
              Shuffle secondary
            </button>
          </div>

          <button type="button" className="full-button" onClick={randomizeGradient}>
            Generate fresh gradient
          </button>

          <div className="code-section">
            <div className="section-heading">
              <h2>CSS output</h2>
              <p>Ready for backgrounds, hero sections, or cards.</p>
            </div>

            <pre className="code-box">
              <code>{cssCode}</code>
            </pre>

            <button type="button" className="copy-button" onClick={copyCss}>
              {copyLabel}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
