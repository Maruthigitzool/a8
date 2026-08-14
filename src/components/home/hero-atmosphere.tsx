export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-atmosphere-base" data-hero-layer="base" />
      <div className="hero-atmosphere-grid" data-hero-layer="grid" />
      <div className="hero-atmosphere-glow" data-hero-layer="glow" />
      <div className="hero-atmosphere-orb hero-atmosphere-orb-a" data-hero-layer="orb-a" />
      <div className="hero-atmosphere-orb hero-atmosphere-orb-b" data-hero-layer="orb-b" />
      <div className="hero-atmosphere-streak" data-hero-layer="streak" />
      <div className="hero-atmosphere-grain" data-hero-layer="grain" />
    </div>
  );
}
