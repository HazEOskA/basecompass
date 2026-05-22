import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';

const NAV_LINKS = [
  { to: '/apps',     label: 'dApps' },
  { to: '/roadmap',  label: 'Roadmap' },
  { to: '/quiz',     label: 'Quiz' },
  { to: '/builders', label: 'Builders' },
  { to: '/safety',   label: 'Safety' },
];

const Navbar: React.FC = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative font-mono text-[11px] uppercase tracking-[0.2em] px-1 py-1 transition-colors duration-150 ${
      isActive ? 'text-neon-cyan' : 'text-txt-muted hover:text-txt-secondary'
    }`;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(6,13,31,0.92)'
            : 'rgba(6,13,31,0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: scrolled
            ? '1px solid rgba(0,82,255,0.2)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.3)'
            : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Compass
                size={20}
                className="text-base-blue group-hover:text-neon-cyan transition-colors duration-200"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,82,255,0.5))' }}
              />
            </div>
            <span className="font-display text-xl tracking-wider">
              <span className="text-base-blue">BASE</span>
              <span className="text-txt-primary">COMPASS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                        style={{
                          background: 'linear-gradient(90deg, #0052ff, #00d4ff)',
                          boxShadow: '0 0 8px rgba(0,212,255,0.5)',
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <WalletConnectButton />
            <Link
              to="/apps"
              className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded text-txt-primary transition-all duration-150"
              style={{
                background: 'rgba(0,82,255,0.18)',
                border: '1px solid rgba(0,82,255,0.35)',
              }}
            >
              Enter Map
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden text-txt-secondary hover:text-txt-primary transition-colors duration-150 p-1"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 border-b md:hidden"
            style={{
              background: 'rgba(6,13,31,0.97)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(0,82,255,0.2)',
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              <div className="py-3 border-b border-base-blue/10">
                <WalletConnectButton />
              </div>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-txt-muted py-3 border-b border-base-blue/10 hover:text-neon-cyan transition-colors duration-150"
              >
                Home
              </Link>
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `font-mono text-[11px] uppercase tracking-[0.2em] py-3 border-b border-base-blue/10 transition-colors duration-150 ${
                      isActive ? 'text-neon-cyan' : 'text-txt-muted hover:text-txt-secondary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  );
};

export default Navbar;
