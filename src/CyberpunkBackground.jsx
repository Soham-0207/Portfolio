import './CyberpunkBackground.css';

export default function CyberpunkBackground() {
  return (
    <div className="cyberpunk-bg-container">
      <div className="cyberpunk-grid"></div>
      
      {/* Glitch layers */}
      <div className="glitch-layer glitch-red"></div>
      <div className="glitch-layer glitch-blue"></div>
      
      {/* Retro overlays */}
      <div className="cyberpunk-scanlines"></div>
      <div className="cyberpunk-vignette"></div>
    </div>
  );
}
