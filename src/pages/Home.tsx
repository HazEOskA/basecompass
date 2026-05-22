import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Map, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import TaggedVanPanel from '../components/TaggedVanPanel';
import CityDistrictGrid from '../components/CityDistrictGrid';
import StreetIntelCard from '../components/StreetIntelCard';
import SprayDivider from '../components/SprayDivider';
import { apps } from '../data/apps';

const FEATURED_IDS = [
  'coinbase-wallet',
  'farcaster',
  'mint-fun',
  'aerodrome',
  'revoke',
  'base-camp',
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a District',
    desc: 'Eight zones cover every corner of Base — DeFi, Social, NFT, Games, and more.',
    icon: Map,
    color: '#0052ff',
  },
  {
    step: '02',
    title: 'Check the Risk',
    desc: 'Every dApp has a beginner score and risk rating. Know before you connect.',
    icon: Shield,
    color: '#ff3366',
  },
  {
    step: '03',
    title: 'Try Small First',
    desc: 'Follow the mission instruction — one safe first action per dApp.',
    icon: Zap,
    color: '#00d4ff',
  },
  {
    step: '04',
    title: 'Build, Ship, Repeat',
    desc: 'Follow the 7-day roadmap. Apply for builder grants. Go onchain for real.',
    icon: ArrowRight,
    color: '#00ff88',
  },
];

const Home: React.FC = () => {
  const featured = FEATURED_IDS
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <Hero />

      {/* ── Van Panel ─────────────────────────────────── */}
      <div className="bg-grid" style={{ backgroundSize: '60px 60px' }}>
        <div className="max-w-5xl mx-auto">
          <TaggedVanPanel />
        </div>
      </div>

      {/* ── City District Grid ─────────────────────────── */}
      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,13,31,0) 0%, rgba(6,13,31,0.6) 20%, rgba(6,13,31,0.6) 80%, rgba(6,13,31,0) 100%)',
        }}
      >
        <CityDistrictGrid />
      </div>

      {/* ── Featured dApps ─────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SprayDivider label="featured intel" className="mb-8" />

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-xs text-txt-muted uppercase tracking-[0.3em] mb-1">
                // street intel
              </p>
              <h2 className="font-display text-5xl text-txt-primary">RECOMMENDED STARTS</h2>
            </div>
            <Link
              to="/apps"
              className="hidden md:flex items-center gap-2 font-mono text-xs text-base-blue-lt uppercase tracking-wider hover:text-neon-cyan transition-colors duration-150"
            >
              View all 56 <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((app, i) => (
              <StreetIntelCard key={app.id} app={app} index={i} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to="/apps" className="btn-ghost inline-flex items-center gap-2">
              View all dApps <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <SprayDivider label="the system" className="mb-10" />

          <div className="text-center mb-12">
            <p className="font-mono text-xs text-txt-muted uppercase tracking-[0.3em] mb-2">
              // how basecompass works
            </p>
            <h2 className="font-display text-5xl text-txt-primary">FOUR STEPS. ZERO NOISE.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon, color }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="neon-card rounded-xl p-5 relative overflow-hidden group"
              >
                {/* Step number bg */}
                <span
                  className="absolute top-3 right-4 font-display text-5xl leading-none select-none"
                  style={{ color, opacity: 0.08 }}
                >
                  {step}
                </span>

                <Icon size={20} className="mb-4" style={{ color }} />
                <h3 className="font-ui font-bold text-lg text-txt-primary mb-2">{title}</h3>
                <p className="font-ui text-txt-muted text-sm leading-snug">{desc}</p>

                {/* Corner */}
                <div
                  className="absolute top-3 left-3 w-3 h-3 border-t border-l opacity-30"
                  style={{ borderColor: color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neon-card rounded-xl p-10 text-center relative overflow-hidden"
            style={{ borderColor: 'rgba(0,82,255,0.4)' }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,82,255,0.1) 0%, transparent 70%)',
              }}
            />
            <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-3">
              // ready to explore?
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-txt-primary mb-3">
              YOUR BASE PATH IS READY.
            </h2>
            <p className="font-ui text-txt-secondary mb-8 max-w-md mx-auto">
              Start the 7-day beginner roadmap or jump straight into the dApp directory.
              No wallet required to explore.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/roadmap" className="btn-primary flex items-center gap-2">
                Start 7-Day Roadmap <ArrowRight size={14} />
              </Link>
              <Link to="/quiz" className="btn-ghost flex items-center gap-2">
                Take the Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
