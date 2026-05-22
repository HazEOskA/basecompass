import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Link2, Wallet, Eye, XCircle, Gift, Clock,
  CheckCircle, ExternalLink,
} from 'lucide-react';
import SprayDivider from '../components/SprayDivider';

interface Rule {
  icon: React.ElementType;
  tag: string;
  title: string;
  body: string;
  severity: 'critical' | 'warning' | 'info';
}

const RULES: Rule[] = [
  {
    icon: Link2,
    tag: 'RULE 01',
    title: 'Verify official links — always.',
    body: 'Bookmark real sites. Use official Twitter/Farcaster to find links. Phishing sites look identical to the real thing. One wrong click can drain your wallet.',
    severity: 'critical',
  },
  {
    icon: Wallet,
    tag: 'RULE 02',
    title: 'Try small first.',
    body: 'First interaction with any new dApp? Use the smallest amount possible — $1–5. Learn the interface before committing real funds. Speed is how you get robbed.',
    severity: 'critical',
  },
  {
    icon: Eye,
    tag: 'RULE 03',
    title: "Don't sign blind.",
    body: 'Read every transaction before signing. If a wallet like Rabby shows a simulation — use it. "Approve unlimited" on an unknown contract is a trap.',
    severity: 'critical',
  },
  {
    icon: CheckCircle,
    tag: 'RULE 04',
    title: 'Understand approvals.',
    body: 'Token approvals give a contract permission to spend your tokens. Approve only what you need. Set spending limits where possible. Unlimited approvals are a permanent risk.',
    severity: 'warning',
  },
  {
    icon: XCircle,
    tag: 'RULE 05',
    title: 'Revoke permissions regularly.',
    body: 'Visit Revoke.cash every week. Remove every approval you no longer need. Old approvals from abandoned dApps are open doors into your wallet.',
    severity: 'warning',
  },
  {
    icon: Gift,
    tag: 'RULE 06',
    title: 'Fake airdrops are traps.',
    body: 'Unsolicited tokens in your wallet are bait. Interacting with them (sell, approve, transfer) can drain your wallet via malicious contract logic. Ignore unknown tokens.',
    severity: 'critical',
  },
  {
    icon: Clock,
    tag: 'RULE 07',
    title: 'If it feels urgent, slow down.',
    body: 'Scams create artificial urgency. "Limited time", "exclusive whitelist", "act now". Legitimate dApps never pressure you. Urgency is a red flag — always.',
    severity: 'warning',
  },
  {
    icon: ShieldAlert,
    tag: 'RULE 08',
    title: 'Your seed phrase is sacred.',
    body: 'No dApp, no support agent, no team member will ever need your seed phrase or private key. Anyone asking for it is trying to steal everything you own.',
    severity: 'critical',
  },
];

const severityStyle: Record<string, { border: string; bg: string; tag: string; icon: string }> = {
  critical: {
    border: 'rgba(255,51,102,0.35)',
    bg:     'rgba(255,51,102,0.06)',
    tag:    'text-street-red border-street-red/40 bg-street-red/10',
    icon:   'text-street-red',
  },
  warning: {
    border: 'rgba(255,170,0,0.35)',
    bg:     'rgba(255,170,0,0.05)',
    tag:    'text-street-amber border-street-amber/40 bg-street-amber/10',
    icon:   'text-street-amber',
  },
  info: {
    border: 'rgba(0,82,255,0.3)',
    bg:     'rgba(0,82,255,0.06)',
    tag:    'text-base-blue-lt border-base-blue/40 bg-base-blue/10',
    icon:   'text-base-blue-lt',
  },
};

const SafetyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-14 px-4 border-b overflow-hidden"
        style={{
          borderColor: 'rgba(255,51,102,0.2)',
          background: 'linear-gradient(180deg, rgba(255,51,102,0.06) 0%, transparent 100%)',
        }}
      >
        <div className="absolute inset-0 bg-grid pointer-events-none" style={{ backgroundSize: '60px 60px' }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="font-mono text-[11px] text-street-red/60 uppercase tracking-[0.3em] mb-2">
            // street safety protocol
          </p>
          <h1 className="font-display text-6xl md:text-7xl text-txt-primary mb-3">
            DON'T GET ROBBED.
          </h1>
          <p className="font-ui text-txt-secondary max-w-xl">
            Eight rules for surviving Base. Not optional. Not paranoia.
            This is how you stay safe in open financial systems.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* Rules */}
        <section>
          <SprayDivider label="the eight rules" className="mb-8" />
          <div className="space-y-4">
            {RULES.map((rule, i) => {
              const s = severityStyle[rule.severity];
              return (
                <motion.div
                  key={rule.tag}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="rounded-xl p-6 border flex items-start gap-4"
                  style={{ background: s.bg, borderColor: s.border }}
                >
                  <rule.icon size={22} className={`shrink-0 mt-0.5 ${s.icon}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border rounded-sm ${s.tag}`}>
                        {rule.tag}
                      </span>
                      {rule.severity === 'critical' && (
                        <span className="font-mono text-[9px] text-street-red/60 uppercase tracking-wider">
                          critical
                        </span>
                      )}
                    </div>
                    <h3 className="font-ui font-bold text-lg text-txt-primary mb-1">{rule.title}</h3>
                    <p className="font-ui text-txt-secondary text-sm leading-relaxed">{rule.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Essential safety tools */}
        <section>
          <SprayDivider label="essential tools" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: 'Revoke.cash',
                desc: 'View and revoke all token approvals. Use weekly.',
                href: 'https://revoke.cash',
                color: '#ff3366',
              },
              {
                name: 'Rabby Wallet',
                desc: 'Pre-sign transaction simulation. See what you sign.',
                href: 'https://rabby.io',
                color: '#00d4ff',
              },
              {
                name: 'BaseScan',
                desc: 'Verify contracts and track transactions on Base.',
                href: 'https://basescan.org',
                color: '#0052ff',
              },
            ].map(tool => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group neon-card rounded-xl p-5 flex flex-col gap-2"
              >
                <div
                  className="w-2 h-2 rounded-full mb-1"
                  style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}` }}
                />
                <h3 className="font-ui font-bold text-txt-primary group-hover:text-neon-cyan transition-colors duration-150">
                  {tool.name}
                </h3>
                <p className="font-ui text-txt-muted text-sm leading-snug flex-1">{tool.desc}</p>
                <span
                  className="font-mono text-[10px] uppercase tracking-wider inline-flex items-center gap-1"
                  style={{ color: tool.color }}
                >
                  Open <ExternalLink size={9} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div
            className="rounded-xl p-6 border text-center"
            style={{
              background: 'rgba(0,82,255,0.05)',
              borderColor: 'rgba(0,82,255,0.2)',
            }}
          >
            <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.2em] mb-2">
              // disclaimer
            </p>
            <p className="font-ui text-txt-secondary text-sm leading-relaxed max-w-2xl mx-auto">
              BaseCompass is an independent educational resource. Not financial advice.
              Not affiliated with Coinbase or Base. Always verify official links yourself.
              DeFi involves real risk of loss — never invest more than you can afford to lose.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyPage;
