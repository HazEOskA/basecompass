import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: 'rgba(0,82,255,0.15)', background: 'rgba(6,13,31,0.95)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo + description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={18} className="text-base-blue" />
              <span className="font-display text-2xl">
                <span className="text-base-blue">BASE</span>
                <span className="text-txt-primary">COMPASS</span>
              </span>
            </div>
            <p className="font-ui text-txt-secondary text-sm leading-relaxed max-w-xs">
              A cyber street map for exploring the Base ecosystem. Beginner-friendly, safety-first,
              no corporate noise.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['ONCHAIN', 'BUILD', 'EXPLORE', 'STAY SAFE'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border rounded-sm text-base-blue/50 border-base-blue/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.25em] mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {[
                { to: '/',         label: 'Home' },
                { to: '/apps',     label: 'dApps' },
                { to: '/roadmap',  label: 'Roadmap' },
                { to: '/quiz',     label: 'Quiz' },
                { to: '/builders', label: 'Builders' },
                { to: '/safety',   label: 'Safety' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-ui text-sm text-txt-muted hover:text-neon-cyan transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.25em] mb-4">Ecosystem</p>
            <ul className="space-y-2.5">
              {[
                { href: 'https://base.org',           label: 'Base.org' },
                { href: 'https://docs.base.org',      label: 'Base Docs' },
                { href: 'https://basescan.org',       label: 'BaseScan' },
                { href: 'https://bridge.base.org',    label: 'Base Bridge' },
                { href: 'https://warpcast.com/~/channel/base', label: '/base Channel' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-sm text-txt-muted hover:text-neon-cyan transition-colors duration-150 inline-flex items-center gap-1.5"
                  >
                    {label}
                    <ExternalLink size={10} className="opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between pt-6 border-t gap-4"
          style={{ borderColor: 'rgba(0,82,255,0.12)' }}
        >
          <p className="font-mono text-[10px] text-txt-muted text-center md:text-left">
            © {year} BaseCompass · Not affiliated with Coinbase or Base ·{' '}
            <span className="text-street-red/60">Not financial advice</span>
          </p>
          <p className="font-mono text-[10px] text-txt-muted text-center md:text-right">
            Built on Base · Chain 8453 · Always verify official links
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
