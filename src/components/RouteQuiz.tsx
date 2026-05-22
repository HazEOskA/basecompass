import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, TrendingUp, MessageSquare, Image, Code2, Gift,
  ArrowRight, AlertTriangle, RotateCcw, Navigation,
} from 'lucide-react';
import { apps } from '../data/apps';

interface Route {
  id: string;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
  accent: string;
  border: string;
  desc: string;
  appIds: string[];
  path: string;
  safetyNote: string;
  nextAction: string;
}

const ROUTES: Route[] = [
  {
    id: 'learn',
    label: 'Learn the Basics',
    sublabel: '→ Beginner Circuit',
    Icon: BookOpen,
    accent: '#a855f7',
    border: 'rgba(168,85,247,0.4)',
    desc: 'Start from zero. Wallets, gas, and how Base works.',
    appIds: ['base-camp', 'odyssey', 'useweb3'],
    path: 'BEGINNER CIRCUIT',
    safetyNote: 'Always practice on testnet before using real funds.',
    nextAction: 'Start Base Camp Module 1 — free and official.',
  },
  {
    id: 'defi',
    label: 'Try DeFi',
    sublabel: '→ DeFi District',
    Icon: TrendingUp,
    accent: '#0052ff',
    border: 'rgba(0,82,255,0.4)',
    desc: 'Swaps, lending, and yield strategies on Base.',
    appIds: ['aerodrome', 'moonwell', 'aave-base'],
    path: 'DEFI DISTRICT',
    safetyNote: 'Use tiny amounts first. DeFi risk is real — liquidations happen.',
    nextAction: 'Swap $5 USDC → ETH on Aerodrome to understand fees.',
  },
  {
    id: 'social',
    label: 'Explore Social Apps',
    sublabel: '→ Social Alley',
    Icon: MessageSquare,
    accent: '#00d4ff',
    border: 'rgba(0,212,255,0.4)',
    desc: 'Onchain communities, Frames, and social protocols.',
    appIds: ['farcaster', 'paragraph', 'hey'],
    path: 'SOCIAL ALLEY',
    safetyNote: 'Never share your seed phrase in social channels. DMs offering whitelists are scams.',
    nextAction: 'Create a Farcaster account and join /base channel.',
  },
  {
    id: 'nft',
    label: 'Mint NFTs',
    sublabel: '→ NFT Yard',
    Icon: Image,
    accent: '#ec4899',
    border: 'rgba(236,72,153,0.4)',
    desc: 'Mint, collect, and discover creator work on Base.',
    appIds: ['mint-fun', 'zora', 'base-paints'],
    path: 'NFT YARD',
    safetyNote: 'Verify the contract on BaseScan before paying for any mint.',
    nextAction: 'Mint one free piece on Mint.fun to feel the flow.',
  },
  {
    id: 'build',
    label: 'Build Something',
    sublabel: '→ Builder Lab',
    Icon: Code2,
    accent: '#00ff88',
    border: 'rgba(0,255,136,0.4)',
    desc: 'Deploy contracts, build dApps, ship on Base.',
    appIds: ['onchainkit', 'remix-ide', 'base-camp'],
    path: 'BUILDER LAB',
    safetyNote: 'Always test on Base Sepolia testnet before deploying to mainnet.',
    nextAction: 'Open Remix IDE and deploy your first contract to Sepolia.',
  },
  {
    id: 'rewards',
    label: 'Find Rewards / Grants',
    sublabel: '→ Rewards Terminal',
    Icon: Gift,
    accent: '#ffaa00',
    border: 'rgba(255,170,0,0.4)',
    desc: 'Missions, attestations, and builder grants on Base.',
    appIds: ['odyssey', 'base-grants', 'base-camp'],
    path: 'REWARDS TERMINAL',
    safetyNote: 'Real Base grants never charge upfront fees. Verify all grant programs.',
    nextAction: 'Complete your first Odyssey mission to earn a Base attestation.',
  },
];

const RouteQuiz: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const route = ROUTES.find(r => r.id === selected);
  const recApps = route
    ? route.appIds.map(id => apps.find(a => a.id === id)).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-xs text-txt-muted uppercase tracking-[0.3em] text-center mb-2">
              // choose your route
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-txt-primary text-center mb-2">
              WHAT DO YOU WANT TO DO ON BASE?
            </h2>
            <p className="font-ui text-txt-secondary text-center mb-8">
              Pick a path. We'll generate your route.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROUTES.map((r, i) => (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelected(r.id)}
                  className="group relative rounded-xl p-5 text-left border overflow-hidden transition-all duration-200"
                  style={{
                    background: 'rgba(10,22,40,0.85)',
                    borderColor: 'rgba(0,82,255,0.18)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = r.border;
                    el.style.boxShadow = `0 0 30px rgba(0,82,255,0.12), 0 0 0 0 ${r.accent}`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(0,82,255,0.18)';
                    el.style.boxShadow = '';
                  }}
                >
                  {/* Street sign corner */}
                  <div
                    className="absolute top-3 right-3 w-3 h-3 border-t border-r opacity-30"
                    style={{ borderColor: r.accent }}
                  />

                  <r.Icon size={20} className="mb-3" style={{ color: r.accent }} />

                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: r.accent, opacity: 0.7 }}
                  >
                    {r.sublabel}
                  </div>

                  <h3 className="font-ui font-bold text-lg text-txt-primary mb-1">{r.label}</h3>
                  <p className="font-ui text-txt-muted text-sm leading-snug">{r.desc}</p>

                  <div
                    className="mt-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200"
                    style={{ color: r.accent }}
                  >
                    Select route
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {route && (
              <div className="max-w-2xl mx-auto">
                {/* Route generated header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border mb-4"
                    style={{
                      background: `rgba(${route.accent === '#0052ff' ? '0,82,255' : '0,212,255'},0.1)`,
                      borderColor: route.border,
                      color: route.accent,
                    }}
                  >
                    <Navigation size={12} />
                    <span className="font-mono text-xs uppercase tracking-[0.25em]">Route Generated</span>
                  </motion.div>
                  <h2 className="font-display text-5xl text-txt-primary">{route.path}</h2>
                  <p className="font-ui text-txt-secondary mt-2">
                    Your Base path is ready.
                  </p>
                </div>

                {/* Recommended apps */}
                <div
                  className="neon-card rounded-xl p-6 mb-5"
                  style={{ borderColor: route.border }}
                >
                  <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.2em] mb-4">
                    Recommended Tools
                  </p>
                  <div className="space-y-3">
                    {recApps.map((app, i) => app && (
                      <div
                        key={app.id}
                        className="flex items-start gap-3 p-3 rounded-md border"
                        style={{
                          background: 'rgba(0,82,255,0.05)',
                          borderColor: 'rgba(0,82,255,0.15)',
                        }}
                      >
                        <span
                          className="font-mono text-xs font-bold mt-0.5 shrink-0"
                          style={{ color: route.accent }}
                        >
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <div>
                          <span className="font-ui font-bold text-txt-primary text-sm">{app.name}</span>
                          <p className="font-ui text-txt-muted text-xs mt-0.5 leading-snug">{app.firstAction}</p>
                        </div>
                        <a
                          href={app.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto shrink-0"
                          style={{ color: route.accent }}
                        >
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety note */}
                <div
                  className="rounded-md p-4 border mb-5 flex items-start gap-2.5"
                  style={{
                    background: 'rgba(255,51,102,0.06)',
                    borderColor: 'rgba(255,51,102,0.25)',
                  }}
                >
                  <AlertTriangle size={13} className="text-street-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-street-red/60 uppercase tracking-wider mb-0.5">Safety Check</p>
                    <p className="font-ui text-sm text-street-red/80">{route.safetyNote}</p>
                  </div>
                </div>

                {/* Next action */}
                <div
                  className="rounded-md p-4 border mb-6"
                  style={{
                    background: `rgba(0,82,255,0.08)`,
                    borderColor: route.border,
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: route.accent, opacity: 0.7 }}>
                    Next Action
                  </p>
                  <p className="font-ui font-bold text-txt-primary">{route.nextAction}</p>
                </div>

                {/* Reset */}
                <div className="text-center">
                  <button
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 font-mono text-xs text-txt-muted uppercase tracking-wider hover:text-txt-secondary transition-colors duration-150"
                  >
                    <RotateCcw size={12} />
                    Choose different route
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RouteQuiz;
