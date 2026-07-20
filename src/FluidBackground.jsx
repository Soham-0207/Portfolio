import './FluidBackground.css';

export default function FluidBackground() {
  return (
    <div className="fluid-bg-container">
      <div className="fluid-blob blob-1"></div>
      <div className="fluid-blob blob-2"></div>
      <div className="fluid-blob blob-3"></div>
      
      {/* Optional subtle noise overlay to add texture and prevent banding */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        opacity: 0.03,
        pointerEvents: 'none',
        mixBlendMode: 'overlay'
      }}></div>
    </div>
  );
}
