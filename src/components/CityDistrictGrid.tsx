import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, MessageSquare, Image, Gamepad2, Wallet, Wrench, BookOpen, Code2 } from 'lucide-react';
import { apps } from '../data/apps';

interface District {
  id: string;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
  desc: string;
  neonColor: string;
  borderColor: string;
  bgGlow: string;
  textColor: string;
}

const DISTRICTS: District[] = [
  {
    id: 'DeFi',
    label: 'DeFi District',
    sublabel: 'DISTRICT 01',
    Icon: Zap,
    desc: 'Swaps, lending, and yield. The financial backbone of Base.',
    neonColor: '#0052ff',
    borderColor: 'rgba(0,82,255,0.4)',
    bgGlow: 'rgba(0,82,255,0.08)',
    textColor: '#3374ff',
  },
  {
    id: 'Social',
    label: 'Social Alley',
    sublabel: 'DISTRICT 02',
    Icon: MessageSquare,
    desc: 'Onchain communities, publishing, and social protocols.',
    neonColor: '#00d4ff',
    borderColor: 'rgba(0,212,255,0.4)',
    bgGlow: 'rgba(0,212,255,0.07)',
    textColor: '#00d4ff',
  },
  {
    id: 'NFT / Creator',
    label: 'NFT Yard',
    sublabel: 'DISTRICT 03',
    Icon: Image,
    desc: 'Minting, marketplaces, and creator tools for artists.',
    neonColor: '#ec4899',
    borderColor: 'rgba(236,72,153,0.4)',
    bgGlow: 'rgba(236,72,153,0.07)',
    textColor: '#ec4899',
  },
  {
    id: 'Games',
    label: 'Games Block',
    sublabel: 'DISTRICT 04',
    Icon: Gamepad2,
    desc: 'Onchain games, competitions, and interactive worlds.',
    neonColor: '#00ff88',
    borderColor: 'rgba(0,255,136,0.4)',
    bgGlow: 'rgba(0,255,136,0.07)',
    textColor: '#00ff88',
  },
  {
    id: 'Wallets',
    label: 'Wallet Garage',
    sublabel: 'DISTRICT 05',
    Icon: Wallet,
    desc: 'Self-custody wallets, signers, and smart accounts.',
    neonColor: '#ffaa00',
    borderColor: 'rgba(255,170,0,0.4)',
    bgGlow: 'rgba(255,170,0,0.07)',
    textColor: '#ffaa00',
  },
  {
    id: 'Tools',
    label: 'Tools Station',
    sublabel: 'DISTRICT 06',
    Icon: Wrench,
    desc: 'Explorers, analytics, portfolio trackers, and safety tools.',
    neonColor: '#8a96b0',
    borderColor: 'rgba(138,150,176,0.4)',
    bgGlow: 'rgba(138,150,176,0.07)',
    textColor: '#8a96b0',
  },
  {
    id: 'Learn',
    label: 'Learn Zone',
    sublabel: 'DISTRICT 07',
    Icon: BookOpen,
    desc: 'Courses, guides, and interactive paths into Base.',
    neonColor: '#a855f7',
    borderColor: 'rgba(168,85,247,0.4)',
    bgGlow: 'rgba(168,85,247,0.07)',
    textColor: '#a855f7',
  },
  {
    id: 'Builders',
    label: 'Builder Lab',
    sublabel: 'DISTRICT 08',
    Icon: Code2,
    desc: 'SDKs, dev frameworks, and builder grant programs.',
    neonColor: '#3374ff',
    borderColor: 'rgba(51,116,255,0.4)',
    bgGlow: 'rgba(51,116,255,0.07)',
    textColor: '#3374ff',
  },
];

const CityDistrictGrid: React.FC = () => {
  const navigate = useNavigate();
  const appCount = (districtId: string) =>
    apps.filter(a => a.category === districtId).length;

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-txt-muted uppercase tracking-[0.3em] mb-2">
            // pick a district
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-txt-primary">
            CYBERPUNK CITY MAP
          </h2>
          <p className="font-ui text-txt-secondary mt-3 max-w-lg mx-auto">
            Eight zones. Every corner of the Base ecosystem. Pick your district and explore.
          </p>
        </div>

        {/* District grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRICTS.map((d, i) => {
            const count = appCount(d.id);
            return (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => navigate(`/apps?category=${encodeURIComponent(d.id)}`)}
                className="group relative rounded-xl p-5 text-left overflow-hidden transition-all duration-250 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${d.bgGlow} 0%, rgba(6,13,31,0.95) 100%)`,
                  border: `1px solid ${d.borderColor}`,
                  boxShadow: `0 0 0 0 ${d.neonColor}`,
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 30px ${d.bgGlow}`,
                    background: `radial-gradient(ellipse at 30% 30%, ${d.bgGlow} 0%, transparent 70%)`,
                  }}
                />

                {/* District ID */}
                <div
                  className="font-mono text-[10px] tracking-[0.2em] mb-3 uppercase"
                  style={{ color: d.textColor, opacity: 0.6 }}
                >
                  {d.sublabel}
                </div>

                {/* Icon */}
                <d.Icon
                  size={22}
                  className="mb-3 transition-transform duration-250 group-hover:scale-110"
                  style={{ color: d.textColor }}
                />

                {/* Label */}
                <h3
                  className="font-display text-2xl mb-1 transition-colors duration-200"
                  style={{ color: d.textColor }}
                >
                  {d.label}
                </h3>

                {/* Description */}
                <p className="font-ui text-txt-muted text-sm leading-snug mb-4">
                  {d.desc}
                </p>

                {/* App count */}
                <div
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border"
                  style={{
                    color: d.textColor,
                    borderColor: d.borderColor,
                    background: d.bgGlow,
                  }}
                >
                  <span className="font-bold">{count}</span>
                  <span className="opacity-60">apps mapped</span>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-40"
                  style={{ borderColor: d.textColor }}
                />
                <div
                  className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-40"
                  style={{ borderColor: d.textColor }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CityDistrictGrid;
