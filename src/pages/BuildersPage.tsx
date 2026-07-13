import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Code2, Layers, GitBranch, Zap, Award } from 'lucide-react';
import SprayDivider from '../components/SprayDivider';

interface BuildStep {
  icon: React.ElementType;
  code: string;
  title: string;
  desc: string;
  link: string;
  linkLabel: string;
  accent: string;
}

const BUILD_STEPS: BuildStep[] = [
  {
    icon: Terminal,
    code: '// 01',
    title: 'Learn Base',
    desc: 'Start with the current Base documentation covering the chain, accounts, apps, payments, agents, and builder resources.',
    link: 'https://docs.base.org/get-started/base',
    linkLabel: 'Base Overview',
    accent: '#a855f7',
  },
  {
    icon: Code2,
    code: '// 02',
    title: 'Integrate Base Account',
    desc: 'Use the current Base Account SDK for smart-wallet connection, universal sign-on, identity, and low-friction payments.',
    link: 'https://docs.base.org/base-account/overview/what-is-base-account',
    linkLabel: 'Base Account Docs',
    accent: '#0052ff',
  },
  {
    icon: Layers,
    code: '// 03',
    title: 'Build a Base App',
    desc: 'Build a standard web app with wagmi, viem, Base Account, contract reads and writes, and smart-wallet capabilities.',
    link: 'https://docs.base.org/apps/quickstart/build-app',
    linkLabel: 'Build App Guide',
    accent: '#00d4ff',
  },
  {
    icon: Zap,
    code: '// 04',
    title: 'Deploy Contracts',
    desc: 'Use the maintained Base deployment guide with Foundry. Test on Base Sepolia before broadcasting anything to mainnet.',
    link: 'https://docs.base.org/get-started/deploy-smart-contracts',
    linkLabel: 'Deployment Guide',
    accent: '#00ff88',
  },
  {
    icon: GitBranch,
    code: '// 05',
    title: 'Prepare Your Repo',
    desc: 'Document your project clearly. Add a README with setup instructions, contract addresses, and a demo link. Public build logs build credibility.',
    link: 'https://github.com',
    linkLabel: 'GitHub',
    accent: '#ffaa00',
  },
  {
    icon: Award,
    code: '// 06',
    title: 'Get Funded',
    desc: 'Review current Base rewards, grants, retro funding, and founder programs. Ship evidence first, then apply through the official path.',
    link: 'https://docs.base.org/get-started/get-funded',
    linkLabel: 'Funding Paths',
    accent: '#ff3366',
  },
];

const TERMINAL_LINES = [
  { text: '$ npm install wagmi viem @tanstack/react-query', color: '#00d4ff' },
  { text: '  @base-org/account',                 color: '#00d4ff' },
  { text: '  ✓ installing dependencies...',      color: '#00ff88' },
  { text: '  ✓ setting up Base Account...',      color: '#00ff88' },
  { text: '  ✓ configuring Base mainnet...',     color: '#00ff88' },
  { text: '',                                     color: '' },
  { text: '$ forge init my-base-contract',       color: '#00d4ff' },
  { text: '  ✓ initializing Foundry project...', color: '#00ff88' },
  { text: '',                                     color: '' },
  { text: '$ forge test --fork-url $BASE_RPC',   color: '#00d4ff' },
  { text: '  Running 12 tests...',               color: '#8a96b0' },
  { text: '  [PASS] testDeposit() [gas: 24_811]',color: '#00ff88' },
  { text: '  [PASS] testWithdraw() [gas: 18_433]',color: '#00ff88' },
  { text: '  Test result: ok. 12 passed.',       color: '#00ff88' },
  { text: '',                                     color: '' },
  { text: '$ forge script Deploy --broadcast \\', color: '#00d4ff' },
  { text: '  --rpc-url base-sepolia',            color: '#00d4ff' },
  { text: '  ✓ deployed to 0x1a2b...3c4d',       color: '#00ff88' },
];

const BuildersPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-14 px-4 border-b overflow-hidden"
        style={{
          borderColor: 'rgba(0,82,255,0.15)',
          background: 'linear-gradient(180deg, rgba(0,255,136,0.05) 0%, transparent 100%)',
        }}
      >
        <div className="absolute inset-0 bg-grid pointer-events-none" style={{ backgroundSize: '60px 60px' }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-2">
            // builder lab
          </p>
          <h1 className="font-display text-6xl md:text-7xl text-txt-primary mb-3">
            BUILD ON BASE
          </h1>
          <p className="font-ui text-txt-secondary max-w-xl mb-0">
            Connect Base Account. Ship apps. Deploy contracts. Apply for funding.
            The full builder path — from first line of Solidity to mainnet.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Terminal code panel */}
        <section>
          <SprayDivider label="dev terminal" className="mb-6" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neon-card rounded-xl overflow-hidden"
            style={{ borderColor: 'rgba(0,255,136,0.25)' }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-3 border-b border-street-green/15">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-street-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-street-amber/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-street-green/60" />
              </div>
              <span className="font-mono text-[11px] text-txt-muted ml-2 tracking-wider">
                builder@base:~/my-project
              </span>
            </div>
            <div className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-7 bg-cyber-navy/70 overflow-x-auto overscroll-x-contain">
              {TERMINAL_LINES.map((line, i) =>
                line.text === '' ? (
                  <div key={i} className="h-3" />
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    style={{ color: line.color || '#8a96b0' }}
                  >
                    {line.text}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </section>

        {/* Build steps */}
        <section>
          <SprayDivider label="build path" className="mb-6" />
          <p className="font-mono text-xs text-txt-muted uppercase tracking-[0.3em] mb-8 text-center">
            // six steps from zero to shipped
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUILD_STEPS.map((step, i) => (
              <motion.div
                key={step.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="neon-card rounded-xl p-5 sm:p-6 relative overflow-hidden group"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ background: `radial-gradient(ellipse at 20% 20%, ${step.accent}10 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <step.icon size={20} style={{ color: step.accent }} />
                    <span className="font-mono text-[10px] text-txt-muted">{step.code}</span>
                  </div>
                  <h3 className="font-ui font-bold text-xl text-txt-primary mb-2">{step.title}</h3>
                  <p className="font-ui text-txt-secondary text-sm leading-relaxed mb-4">{step.desc}</p>
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150 touch-manipulation"
                    style={{ color: step.accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                  >
                    {step.linkLabel} <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Useful resources grid */}
        <section>
          <SprayDivider label="quick links" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Base Overview',    href: 'https://docs.base.org/get-started/base',                                  tag: 'Official' },
              { label: 'Build a Base App', href: 'https://docs.base.org/apps/quickstart/build-app',                        tag: 'App' },
              { label: 'Base Account',     href: 'https://docs.base.org/base-account/overview/what-is-base-account',        tag: 'Wallet' },
              { label: 'Network Faucets',  href: 'https://docs.base.org/base-chain/network-information/network-faucets',   tag: 'Testnet' },
              { label: 'Deploy Contracts', href: 'https://docs.base.org/get-started/deploy-smart-contracts',               tag: 'Deploy' },
              { label: 'Get Funded',       href: 'https://docs.base.org/get-started/get-funded',                           tag: 'Funding' },
              { label: 'Block Explorers',  href: 'https://docs.base.org/get-started/block-explorers',                      tag: 'Explorer' },
              { label: 'Node Providers',   href: 'https://docs.base.org/base-chain/node-operators/node-providers',          tag: 'Infra' },
              { label: 'Services Hub',     href: 'https://docs.base.org/get-started/base-services-hub',                    tag: 'Tools' },
            ].map(({ label, href, tag }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-h-14 flex items-center justify-between p-3 rounded-md border transition-all duration-150 touch-manipulation"
                style={{
                  background: 'rgba(10,22,40,0.6)',
                  borderColor: 'rgba(0,82,255,0.15)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(0,212,255,0.4)';
                  el.style.background = 'rgba(0,82,255,0.08)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(0,82,255,0.15)';
                  el.style.background = 'rgba(10,22,40,0.6)';
                }}
              >
                <span className="font-ui text-sm text-txt-secondary group-hover:text-txt-primary transition-colors duration-150">
                  {label}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-[9px] text-txt-muted border border-txt-muted/20 px-1.5 py-0.5 rounded-sm">
                    {tag}
                  </span>
                  <ExternalLink size={10} className="text-txt-muted group-hover:text-neon-cyan transition-colors duration-150" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuildersPage;
