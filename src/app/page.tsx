"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const FEATURES = [
  {
    icon: "🗡️",
    title: "Fast-Paced Combat",
    desc: "Slice through hordes of enemies with fluid, responsive controls and devastating combo attacks.",
  },
  {
    icon: "🌍",
    title: "Handcrafted Worlds",
    desc: "Explore beautifully designed levels, each with unique environments, secrets, and challenges.",
  },
  {
    icon: "🎭",
    title: "Epic Boss Fights",
    desc: "Face off against massive bosses that will test your skills and push you to the limit.",
  },
  {
    icon: "🧬",
    title: "Skill Evolution",
    desc: "Unlock and upgrade abilities to create your own unique playstyle and dominate the battlefield.",
  },
  {
    icon: "🎵",
    title: "Killer Soundtrack",
    desc: "An adrenaline-pumping original soundtrack that perfectly matches every moment of the action.",
  },
  {
    icon: "🏆",
    title: "Leaderboards",
    desc: "Compete globally with speedrun modes, score challenges, and weekly community events.",
  },
];

const GALLERY_ITEMS = [
  { color: "from-red-900/50 to-yellow-900/30", label: "Jungle Arena" },
  { color: "from-yellow-900/50 to-red-900/30", label: "Lava Depths" },
  { color: "from-red-800/50 to-pink-900/30", label: "Boss: King Peel" },
  { color: "from-pink-900/50 to-yellow-900/30", label: "Sky Temple" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-2xl font-black tracking-tight">
            <span className="text-neon-red">BLOODY</span>{" "}
            <span className="text-neon-yellow">BANANA</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/60 transition-colors hover:text-neon-yellow"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/5 bg-[#0a0a0a]/95 px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-white/60 transition-colors hover:text-neon-yellow"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ef444415_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-yellow/5 blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="animate-float mb-8 text-8xl md:text-9xl">🍌</div>
          <h1 className="mb-4 text-5xl font-black tracking-tighter md:text-8xl">
            <span className="glow-red text-neon-red">BLOODY</span>
            <br />
            <span className="glow-yellow text-neon-yellow">BANANA</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/50 md:text-xl">
            Chaos has never been this delicious. Slash, dash, and survive
            through an insane world of action and mayhem.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#about"
              className="gradient-border rounded-lg px-8 py-3 text-lg font-bold text-black transition-transform hover:scale-105"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/10 px-8 py-3 text-lg font-medium text-white/70 transition-all hover:border-neon-yellow/50 hover:text-neon-yellow"
            >
              Wishlist Now
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-white/20 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-sm font-bold tracking-widest text-neon-red uppercase">
            The Story
          </h2>
          <h3 className="glow-yellow mb-8 text-center text-3xl font-black text-neon-yellow md:text-5xl">
            What is Bloody Banana?
          </h3>
          <div className="rounded-2xl border border-white/5 bg-surface p-8 md:p-12">
            <p className="mb-6 text-lg leading-relaxed text-white/70">
              In a world where fruit has gone rogue, you play as the last
              standing Banana — mutated, angry, and armed to the peel. Fight
              your way through corrupted orchards, neon-lit cities, and volcanic
              wastelands in this fast-paced action platformer.
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              With tight controls, brutal combat, and a dark sense of humor,{" "}
              <span className="font-bold text-neon-yellow">Bloody Banana</span>{" "}
              delivers a gaming experience that&apos;s equal parts thrilling and
              absurd. Every run is different. Every death teaches you something.
              Every victory tastes sweet.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-sm font-bold tracking-widest text-neon-red uppercase">
            Why Play
          </h2>
          <h3 className="glow-yellow mb-16 text-center text-3xl font-black text-neon-yellow md:text-5xl">
            Game Features
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/5 bg-surface p-8 transition-all hover:border-neon-yellow/20 hover:bg-surface-light"
              >
                <div className="mb-4 text-4xl">{f.icon}</div>
                <h4 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-neon-yellow">
                  {f.title}
                </h4>
                <p className="text-sm leading-relaxed text-white/50">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section id="gallery" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-sm font-bold tracking-widest text-neon-red uppercase">
            Screenshots
          </h2>
          <h3 className="glow-yellow mb-16 text-center text-3xl font-black text-neon-yellow md:text-5xl">
            Gallery
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-white/5"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white/30 transition-colors group-hover:text-white/60">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-white/30">
            Screenshots are placeholders — replace with actual game visuals
          </p>
        </div>
      </section>

      {/* ── CTA / Contact Section ── */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-sm font-bold tracking-widest text-neon-red uppercase">
            Stay Updated
          </h2>
          <h3 className="glow-yellow mb-6 text-3xl font-black text-neon-yellow md:text-5xl">
            Join the Hype
          </h3>
          <p className="mb-10 text-lg text-white/50">
            Be the first to know when Bloody Banana drops. Sign up for updates,
            exclusive content, and early access.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-white/10 bg-surface px-5 py-3 text-white placeholder:text-white/30 focus:border-neon-yellow/50 focus:outline-none"
            />
            <button
              type="submit"
              className="gradient-border rounded-lg px-8 py-3 font-bold text-black transition-transform hover:scale-105"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm font-bold">
            <span className="text-neon-red">BLOODY</span>{" "}
            <span className="text-neon-yellow">BANANA</span>
          </div>
          <p className="text-sm text-white/30">
            &copy; 2026 Bloody Banana. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/30 hover:text-neon-yellow transition-colors">Twitter</a>
            <a href="#" className="text-sm text-white/30 hover:text-neon-yellow transition-colors">Discord</a>
            <a href="#" className="text-sm text-white/30 hover:text-neon-yellow transition-colors">Steam</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
