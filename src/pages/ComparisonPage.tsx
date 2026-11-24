import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Cpu,
  Filter,
  Infinity as InfinityIcon,
  RotateCcw,
  Search,
  Smartphone,
  Wifi,
  X,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { TariffCard } from '../components/TariffCard';
import { PostalCodeChecker } from '../components/PostalCodeChecker';
import { CATEGORY_META, TARIFF_OFFERS } from '../data/tariffs';
import { PROVIDERS } from '../data/providers';
import { TariffCategory } from '../types/tariff';
import { formatEuro } from '../utils/format';

interface ComparisonPageProps {
  presetCategory?: TariffCategory;
}

type SortOption = 'score' | 'effective-asc' | 'monthly-asc' | 'speed-desc';

export const ComparisonPage: React.FC<ComparisonPageProps> = ({ presetCategory }) => {
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<TariffCategory | 'all'>(
    presetCategory ?? ((searchParams.get('kategorie') as TariffCategory) || 'all')
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const p = Number(searchParams.get('maxPreis'));
    return p >= 10 && p <= 90 ? p : 90;
  });
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedNetwork, setSelectedNetwork] = useState<string>(searchParams.get('netz') ?? 'all');
  const [contractFilter, setContractFilter] = useState<'all' | '1' | '24'>(
    (searchParams.get('laufzeit') as '1' | '24') || 'all'
  );
  const [minDataGb, setMinDataGb] = useState<number>(0);
  const [minSpeedMbps, setMinSpeedMbps] = useState<number>(0);
  const [onlyZeroSetup, setOnlyZeroSetup] = useState<boolean>(false);
  const [onlyWithBonus, setOnlyWithBonus] = useState<boolean>(false);
  const [onlyESim, setOnlyESim] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('effective-asc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync when navigating between top-level category routes (/mobilfunk, /sim-only, /internet, /unlimited, /vergleich)
  useEffect(() => {
    if (presetCategory) {
      setSelectedCategory(presetCategory);
      setSelectedNetwork('all');
      setMinDataGb(0);
      setMinSpeedMbps(0);
    } else {
      const catParam = searchParams.get('kategorie') as TariffCategory | null;
      if (catParam && CATEGORY_META[catParam]) {
        setSelectedCategory(catParam);
      } else {
        setSelectedCategory('all');
      }
      const qParam = searchParams.get('q');
      if (qParam !== null) setSearchQuery(qParam);
      const maxParam = Number(searchParams.get('maxPreis'));
      if (maxParam >= 10 && maxParam <= 90) setMaxPrice(maxParam);
      const laufzeitParam = searchParams.get('laufzeit');
      if (laufzeitParam === '1' || laufzeitParam === '24') setContractFilter(laufzeitParam);
      const netzParam = searchParams.get('netz');
      if (netzParam) setSelectedNetwork(netzParam);
    }
  }, [presetCategory, searchParams]);

  const resetFilters = () => {
    if (!presetCategory) setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(90);
    setSelectedProvider('all');
    setSelectedNetwork('all');
    setContractFilter('all');
    setMinDataGb(0);
    setMinSpeedMbps(0);
    setOnlyZeroSetup(false);
    setOnlyWithBonus(false);
    setOnlyESim(false);
  };

  const filteredOffers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return TARIFF_OFFERS.filter((offer) => {
      if (selectedCategory !== 'all' && offer.category !== selectedCategory) {
        return false;
      }
      if (offer.effectiveMonthlyPrice > maxPrice) {
        return false;
      }
      if (selectedProvider !== 'all' && offer.providerSlug !== selectedProvider) {
        return false;
      }
      if (
        selectedNetwork !== 'all' &&
        !offer.network.toLowerCase().includes(selectedNetwork.toLowerCase())
      ) {
        return false;
      }
      if (contractFilter === '1' && offer.contractMonths !== 1) {
        return false;
      }
      if (contractFilter === '24' && offer.contractMonths !== 24) {
        return false;
      }
      if (minDataGb > 0 && offer.category !== 'broadband') {
        if (offer.dataVolumeGb !== 'unlimited' && offer.dataVolumeGb < minDataGb) {
          return false;
        }
      }
      if (minSpeedMbps > 0 && offer.downloadSpeedMbps < minSpeedMbps) {
        return false;
      }
      if (onlyZeroSetup && offer.oneTimeSetupFee > 0) {
        return false;
      }
      if (onlyWithBonus && offer.switchingBonus + offer.cashback <= 0) {
        return false;
      }
      if (onlyESim && !offer.eSimReady) {
        return false;
      }
      if (q) {
        const haystack = [
          offer.title,
          offer.subtitle,
          offer.providerSlug,
          offer.network,
          offer.technology,
          offer.hardwareName ?? '',
          ...offer.features,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'effective-asc':
          return a.effectiveMonthlyPrice - b.effectiveMonthlyPrice;
        case 'monthly-asc':
          return a.monthlyPrice - b.monthlyPrice;
        case 'speed-desc':
          return b.downloadSpeedMbps - a.downloadSpeedMbps;
        case 'score':
        default:
          return b.score - a.score;
      }
    });
  }, [
    selectedCategory,
    searchQuery,
    maxPrice,
    selectedProvider,
    selectedNetwork,
    contractFilter,
    minDataGb,
    minSpeedMbps,
    onlyZeroSetup,
    onlyWithBonus,
    onlyESim,
    sortBy,
  ]);

  const activeMeta = selectedCategory !== 'all' ? CATEGORY_META[selectedCategory] : null;

  const pageTitle = activeMeta
    ? activeMeta.seoTitle
    : 'Alle Mobilfunk- & Internettarife im Vergleich 2026 | TarifPilot';
  const pageDesc = activeMeta
    ? activeMeta.seoDescription
    : 'Durchsuchen und filtern Sie Handytarife, SIM-Only-Deals, DSL/Glasfaser und Unlimited-Tarife führender deutscher Telekommunikationsanbieter.';

  const activeFilterCount = [
    searchQuery.trim() !== '',
    maxPrice < 90,
    selectedProvider !== 'all',
    selectedNetwork !== 'all',
    contractFilter !== 'all',
    minDataGb > 0,
    minSpeedMbps > 0,
    onlyZeroSetup,
    onlyWithBonus,
    onlyESim,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pb-20">
      <SEOHead title={pageTitle} description={pageDesc} />

      {/* Category Hero Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-3 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-semibold">
              {activeMeta ? activeMeta.label : 'Tarif-Vergleichsrechner'}
            </span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {activeMeta
              ? activeMeta.headline
              : 'Alle Mobilfunk-, SIM-Only- & Internettarife vergleichen'}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {activeMeta
              ? activeMeta.subheadline
              : 'Nutzen Sie unsere Echtzeit-Filter für Netzqualität, Datenvolumen, Vertragslaufzeit und Effektivpreis, um in Sekunden Ihr optimales Angebot zu finden.'}
          </p>

          {/* Category Switcher Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { id: 'all', label: `Alle Kategorien (${TARIFF_OFFERS.length})`, to: '/vergleich', icon: null },
              { id: 'mobile', label: 'Handy + Tarif', to: '/mobilfunk', icon: Smartphone },
              { id: 'sim-only', label: 'SIM-Only Deals', to: '/sim-only', icon: Cpu },
              { id: 'broadband', label: 'DSL & Glasfaser', to: '/internet', icon: Wifi },
              { id: 'unlimited', label: 'Unlimited 5G', to: '/unlimited', icon: InfinityIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              const isCurrent = selectedCategory === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.to}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Show PLZ Checker when in Broadband category */}
        {selectedCategory === 'broadband' && (
          <div className="mb-8">
            <PostalCodeChecker
              onTechnologySelect={(tech) => setSelectedNetwork(tech ?? 'all')}
            />
          </div>
        )}

        {/* Mobile Filter Toggle Button */}
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-xs"
          >
            <Filter className="h-4 w-4 text-blue-600" />
            <span>
              Filter anpassen {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </span>
          </button>

          <span className="text-xs font-bold text-slate-600 tabular-nums">
            {filteredOffers.length} Angebote gefunden
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ================= FILTER SIDEBAR (3 cols) ================= */}
          <aside
            className={`lg:col-span-3 space-y-5 ${
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-6 lg:sticky lg:top-22">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <span>Tarif-Filter</span>
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Zurücksetzen</span>
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div>
                <label htmlFor="filter-search" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Stichwortsuche
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="filter-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="z.B. iPhone, 5G, Glasfaser..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="filter-maxprice" className="font-bold text-slate-700">
                    Max. Effektivpreis
                  </label>
                  <span className="font-extrabold text-blue-700 tabular-nums">
                    {maxPrice >= 90 ? 'Unbegrenzt' : `bis ${formatEuro(maxPrice)}`}
                  </span>
                </div>
                <input
                  id="filter-maxprice"
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 tabular-nums">
                  <span>10 €</span>
                  <span>30 €</span>
                  <span>60 €</span>
                  <span>Alle</span>
                </div>
              </div>

              {/* Network Selector */}
              <div>
                <label htmlFor="filter-network" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Netz / Anschlussart
                </label>
                <select
                  id="filter-network"
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="all">Alle Netze &amp; Anschlüsse</option>
                  {selectedCategory === 'broadband' ? (
                    <>
                      <option value="Glasfaser (FTTH)">Glasfaser (FTTH)</option>
                      <option value="Kabel-Glasfaser">Kabel-Glasfaser</option>
                      <option value="DSL / VDSL">DSL / VDSL</option>
                    </>
                  ) : (
                    <>
                      <option value="Telekom">Telekom (D1-Netz)</option>
                      <option value="Vodafone">Vodafone (D2-Netz)</option>
                      <option value="o2">o2 / Telefónica</option>
                      <option value="1&1">1&amp;1 5G-Netz</option>
                      <option value="Glasfaser">Glasfaser / Kabel / DSL</option>
                    </>
                  )}
                </select>
              </div>

              {/* Provider Selector */}
              <div>
                <label htmlFor="filter-provider" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Anbieter
                </label>
                <select
                  id="filter-provider"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="all">Alle 8 Anbieter</option>
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contract Length */}
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-1.5">
                  Vertragslaufzeit
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { val: 'all' as const, label: 'Alle' },
                    { val: '1' as const, label: '1 Monat' },
                    { val: '24' as const, label: '24 Mon.' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setContractFilter(opt.val)}
                      className={`rounded-xl border py-2 text-xs font-bold transition-colors ${
                        contractFilter === opt.val
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Volume or Speed Filter */}
              {selectedCategory !== 'broadband' ? (
                <div>
                  <span className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mindest-Datenvolumen
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { val: 0, label: 'Beliebig' },
                      { val: 25, label: 'ab 25 GB' },
                      { val: 50, label: 'ab 50 GB' },
                      { val: 100, label: 'ab 100 GB' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setMinDataGb(opt.val)}
                        className={`rounded-xl border py-2 text-xs font-bold transition-colors ${
                          minDataGb === opt.val
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mindest-Geschwindigkeit
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { val: 0, label: 'Alle' },
                      { val: 100, label: 'ab 100 Mbit/s' },
                      { val: 250, label: 'ab 250 Mbit/s' },
                      { val: 1000, label: '1.000 Mbit/s' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setMinSpeedMbps(opt.val)}
                        className={`rounded-xl border py-2 text-xs font-bold transition-colors ${
                          minSpeedMbps === opt.val
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-700">Extras &amp; Vorteile</span>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyZeroSetup}
                    onChange={(e) => setOnlyZeroSetup(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <span>0,00 € Anschlusspreis</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyWithBonus}
                    onChange={(e) => setOnlyWithBonus(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <span>Mit Wechselbonus / Cashback</span>
                </label>

                {selectedCategory !== 'broadband' && (
                  <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={onlyESim}
                      onChange={(e) => setOnlyESim(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span>Sofortige eSIM-Unterstützung</span>
                  </label>
                )}
              </div>
            </div>
          </aside>

          {/* ================= RESULTS COLUMN (9 cols) ================= */}
          <div className="lg:col-span-9 space-y-5">
            {/* Sorting & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-xs">
              <div className="text-sm font-bold text-slate-800">
                <span className="text-blue-700 font-extrabold tabular-nums">
                  {filteredOffers.length}
                </span>{' '}
                {filteredOffers.length === 1 ? 'geprüfter Tarif' : 'geprüfte Tarife'} im Vergleich
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 shrink-0">
                  Sortieren nach:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-none"
                >
                  <option value="effective-asc">Effektivpreis (günstigste zuerst)</option>
                  <option value="score">TarifPilot-Empfehlung (Score)</option>
                  <option value="monthly-asc">Grundgebühr aufsteigend</option>
                  <option value="speed-desc">Geschwindigkeit absteigend</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    <span>Suche: „{searchQuery}“</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {selectedNetwork !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedNetwork('all')}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    <span>Netz: {selectedNetwork}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {selectedProvider !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('all')}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    <span>Anbieter: {selectedProvider}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {contractFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setContractFilter('all')}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    <span>{contractFilter === '1' ? 'Monatlich kündbar' : '24 Monate'}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {maxPrice < 90 && (
                  <button
                    type="button"
                    onClick={() => setMaxPrice(90)}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 tabular-nums"
                  >
                    <span>Max. {formatEuro(maxPrice)}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Offers List */}
            {filteredOffers.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                <Search className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  Keine Tarife mit genau diesen Filterkriterien gefunden
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
                  Lockern Sie beispielsweise die Preisgrenze oder setzen Sie die Filter zurück, um alle aktuellen Angebote zu sehen.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Alle Filter zurücksetzen</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOffers.map((offer, index) => (
                  <TariffCard key={offer.id} offer={offer} rank={index + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
