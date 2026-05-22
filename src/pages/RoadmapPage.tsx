import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import MetroRoadmap from '../components/MetroRoadmap';
import SprayDivider from '../components/SprayDivider';

const RoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-14 px-4 border-b overflow-hidden"
        style={{
          borderColor: 'rgba(0,82,255,0.15)',
          background:
            'linear-gradient(180deg, rgba(0,82,255,0.09) 0%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0 bg-grid pointer-events-none"
          style={{ backgroundSize: '60px 60px' }}
        />

        {/* Background route line decoration */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(0,82,255,0.2) 30%, rgba(0,212,255,0.2) 70%, transparent)',
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-2">
            // 7-day mission path
          </p>
          <h1 className="font-display text-6xl md:text-7xl text-txt-primary mb-3">
            BEGINNER ROADMAP
          </h1>
          <p className="font-ui text-txt-secondary max-w-xl mb-6">
            Seven missions. One week. Go from zero wallet to active Base explorer.
            Click a station to expand the mission brief.
          </p>

          {/* Safety notice */}
          <div
            className="inline-flex items-start gap-2.5 px-4 py-3 rounded-md border"
            style={{
              background: 'rgba(255,51,102,0.06)',
              borderColor: 'rgba(255,51,102,0.22)',
            }}
          >
            <AlertTriangle size={13} className="text-street-red shrink-0 mt-0.5" />
            <p className="font-ui text-sm text-street-red/80 leading-snug">
              This roadmap uses real funds on mainnet. Always start on testnet.
              Never risk more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Metro roadmap */}
      <div className="py-10">
        <SprayDivider label="route stations" className="max-w-4xl mx-auto px-4 mb-6" />
        <MetroRoadmap />
      </div>

      {/* CTA row */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neon-card rounded-xl p-8 text-center"
          style={{ borderColor: 'rgba(0,82,255,0.3)' }}
        >
          <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-2">
            // not sure where to start?
          </p>
          <h2 className="font-display text-4xl text-txt-primary mb-2">
            TAKE THE ROUTE QUIZ
          </h2>
          <p className="font-ui text-txt-secondary text-sm mb-6">
            Answer one question. Get a personalised path through Base.
          </p>
          <Link
            to="/quiz"
            className="btn-primary inline-flex items-center gap-2"
          >
            Choose Your Route <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapPage;
