import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bookmark,
  Cpu,
  Infinity as InfinityIcon,
  Menu,
  Scale,
  ShieldCheck,
  Smartphone,
  Wifi,
  X,
} from 'lucide-react';
import { TarifPilotLogo } from './ProviderLogo';
import { useComparison } from '../context/ComparisonContext';
import { SavedDealsDrawer } from './SavedDealsDrawer';

const NAV_ITEMS = [
  { to: '/mobilfunk', label: 'Handy + Tarif', icon: Smartphone },
  { to: '/sim-only', label: 'SIM-Only', icon: Cpu },
  { to: '/internet', label: 'DSL & Glasfaser', icon: Wifi },
  { to: '/unlimited', label: 'Unlimited 5G', icon: InfinityIcon },
  { to: '/anbieter', label: 'Anbieter', icon: null },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const {
    savedIds,
    compareOffers,
    setIsCompareModalOpen,
    priceMode,
    setPriceMode,
  } = useComparison();

  return (
    <>
      {/* Top Transparency & Consumer Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Unabhängiger Effektivpreis-Vergleich</span>
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline">Täglich geprüfte Konditionen deutscher Netzanbieter</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-slate-800 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setPriceMode('effective')}
                className={`rounded-md px-2 py-0.5 font-semibold transition-colors ${
                  priceMode === 'effective'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Effektivpreis
              </button>
              <button
                type="button"
                onClick={() => setPriceMode('monthly')}
                className={`rounded-md px-2 py-0.5 font-semibold transition-colors ${
                  priceMode === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Monatspreis
              </button>
            </div>
            <Link
              to="/affiliate-hinweis"
              className="text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
            >
              Transparenz &amp; Finanzierung
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" onClick={() => setMobileOpen(false)} aria-label="TarifPilot Startseite">
            <TarifPilotLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                >
                  {Icon && <Icon className="h-4 w-4 opacity-80" />}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {compareOffers.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Scale className="h-4 w-4" />
                <span className="tabular-nums">Vergleich ({compareOffers.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSavedDrawerOpen(true)}
              aria-label="Merkliste öffnen"
              className="relative inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Bookmark
                className={`h-4 w-4 ${
                  savedIds.length > 0 ? 'fill-amber-500 text-amber-500' : 'text-slate-500'
                }`}
              />
              <span className="hidden sm:inline">Merkliste</span>
              {savedIds.length > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-extrabold text-slate-950 tabular-nums">
                  {savedIds.length}
                </span>
              )}
            </button>

            <Link
              to="/vergleich"
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              Tarif-Finder
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileOpen}
              className="inline-flex lg:hidden items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-fade-in">
            <div className="grid grid-cols-1 gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`
                    }
                  >
                    {Icon && <Icon className="h-4 w-4 text-blue-600" />}
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
              <NavLink
                to="/ueber-uns"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Über TarifPilot
              </NavLink>
              <NavLink
                to="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Kontakt &amp; Beratung
              </NavLink>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPriceMode('effective')}
                  className={`rounded-md px-2.5 py-1 font-bold ${
                    priceMode === 'effective' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Effektivpreis
                </button>
                <button
                  type="button"
                  onClick={() => setPriceMode('monthly')}
                  className={`rounded-md px-2.5 py-1 font-bold ${
                    priceMode === 'monthly' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Monatspreis
                </button>
              </div>

              <Link
                to="/vergleich"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"
              >
                Alle Tarife filtern
              </Link>
            </div>
          </div>
        )}
      </header>

      <SavedDealsDrawer open={savedDrawerOpen} onClose={() => setSavedDrawerOpen(false)} />
    </>
  );
};
