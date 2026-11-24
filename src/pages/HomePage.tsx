import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Infinity as InfinityIcon,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  TrendingDown,
  Wifi,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ProviderLogo } from '../components/ProviderLogo';
import { TariffCard } from '../components/TariffCard';
import { PostalCodeChecker } from '../components/PostalCodeChecker';
import { PROVIDERS } from '../data/providers';
import { TARIFF_OFFERS } from '../data/tariffs';
import { TariffCategory } from '../types/tariff';
import { formatEuro } from '../utils/format';

const HOME_FAQS = [
  {
    q: 'Was genau bedeutet der „Effektivpreis pro Monat“ bei TarifPilot?',
    a: 'Viele Anbieter werben mit niedrigen Preisen in den ersten 6 Monaten, verlangen danach aber höhere Gebühren oder einmalige Anschlusskosten. Unser Effektivpreis summiert sämtliche Kosten über 24 Monate (Grundgebühren, Anschlusspreis, Versand, evtl. Gerätezuzahlung), zieht garantierte Wechselboni und Cashback ab und teilt das Ergebnis ehrlich durch 24 Monate.',
  },
  {
    q: 'Kann ich meine bisherige Handynummer kostenlos zum neuen Anbieter mitnehmen?',
    a: 'Ja! Seit der Novelle des Telekommunikationsgesetzes (TKG) ist die Rufnummernmitnahme (Portierung) in Deutschland komplett kostenlos. Noch besser: Viele Anbieter belohnen die Mitnahme Ihrer Nummer sogar mit 50 € bis 200 € Wechselbonus.',
  },
  {
    q: 'Verlängern sich 24-Monats-Verträge automatisch um ein weiteres Jahr?',
    a: 'Nein. Nach Ablauf der 24-monatigen Mindestvertragslaufzeit sind sämtliche Mobilfunk- und Internettarife in Deutschland gesetzlich jederzeit mit einer Frist von nur einem Monat kündbar. So bleiben Sie dauerhaft flexibel.',
  },
  {
    q: 'Welches Mobilfunknetz in Deutschland ist aktuell das beste?',
    a: 'Im unabhängigen connect-Mobilfunknetztest liegt die Deutsche Telekom (D1) auf Platz 1 („Überragend“), dicht gefolgt von Vodafone (D2) und o2 Telefónica (beide Note „Sehr gut“). Auch 1&1 bietet dank eigenem 5G-Netz und bundesweitem Vodafone-Roaming eine starke Abdeckung.',
  },
  {
    q: 'Ist die Nutzung von TarifPilot wirklich kostenlos?',
    a: 'Ja, zu 100 %. Sie zahlen über TarifPilot niemals mehr als direkt beim Anbieter – durch exklusive Online-Rabatte und Cashback-Aktionen sparen Sie in der Regel sogar spürbar.',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Quick Finder Hero Widget State
  const [quickCat, setQuickCat] = useState<TariffCategory>('sim-only');
  const [quickMaxBudget, setQuickMaxBudget] = useState<number>(35);
  const [quickFlexOnly, setQuickFlexOnly] = useState<boolean>(false);
  const [quickNetwork, setQuickNetwork] = useState<string>('all');

  // Instant Homepage Search
  const [homeSearch, setHomeSearch] = useState('');

  // Broadband section technology quick filter from PLZ checker
  const [broadbandTechFilter, setBroadbandTechFilter] = useState<string | null>(null);

  // Open FAQ item
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const heroMatches = useMemo(() => {
    return TARIFF_OFFERS.filter((o) => {
      if (o.category !== quickCat) return false;
      if (o.effectiveMonthlyPrice > quickMaxBudget) return false;
      if (quickFlexOnly && o.contractMonths !== 1) return false;
      if (quickNetwork !== 'all' && !o.network.toLowerCase().includes(quickNetwork.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => a.effectiveMonthlyPrice - b.effectiveMonthlyPrice);
  }, [quickCat, quickMaxBudget, quickFlexOnly, quickNetwork]);

  const handleQuickFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('kategorie', quickCat);
    params.set('maxPreis', String(quickMaxBudget));
    if (quickFlexOnly) params.set('laufzeit', '1');
    if (quickNetwork !== 'all') params.set('netz', quickNetwork);
    navigate(`/vergleich?${params.toString()}`);
  };

  const handleHomeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeSearch.trim()) {
      navigate('/vergleich');
      return;
    }
    navigate(`/vergleich?q=${encodeURIComponent(homeSearch.trim())}`);
  };

  const mobileDeals = useMemo(
    () =>
      TARIFF_OFFERS.filter((o) => o.category === 'mobile')
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    []
  );

  const simOnlyDeals = useMemo(
    () =>
      TARIFF_OFFERS.filter((o) => o.category === 'sim-only')
        .sort((a, b) => a.effectiveMonthlyPrice - b.effectiveMonthlyPrice)
        .slice(0, 3),
    []
  );

  const broadbandDeals = useMemo(() => {
    const base = TARIFF_OFFERS.filter((o) => o.category === 'broadband');
    const filtered = broadbandTechFilter
      ? base.filter((o) => o.network === broadbandTechFilter)
      : base;
    return (filtered.length > 0 ? filtered : base)
      .sort((a, b) => a.effectiveMonthlyPrice - b.effectiveMonthlyPrice)
      .slice(0, 3);
  }, [broadbandTechFilter]);

  const unlimitedDeals = useMemo(
    () =>
      TARIFF_OFFERS.filter((o) => o.category === 'unlimited')
        .sort((a, b) => a.effectiveMonthlyPrice - b.effectiveMonthlyPrice)
        .slice(0, 3),
    []
  );

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TarifPilot',
    url: 'https://tarifpilot.de',
    description:
      'Unabhängige deutsche Vergleichsplattform für Mobilfunktarife, SIM-Only-Deals, DSL, Kabel, Glasfaser und Unlimited-Datentarife.',
    inLanguage: 'de-DE',
  };

  return (
    <div>
      <SEOHead
        title="TarifPilot – Mobilfunk, SIM-Only, DSL & Glasfaser Vergleich in Deutschland"
        description="Vergleichen Sie aktuelle Handytarife mit Smartphone, SIM-Only Allnet-Flats, DSL-, Kabel- & Glasfaser-Internet sowie Unlimited-Datentarife mit ehrlichem 24-Monats-Effektivpreis."
        jsonLd={homeJsonLd}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Decorative Background Accents */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(37, 99, 235, 0.45), transparent 45%), radial-gradient(circle at 82% 18%, rgba(16, 185, 129, 0.28), transparent 40%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-blue-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Tarif-Vergleich 2026 • Mit echtem 24-Monats-Effektivpreis</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08]">
                Der kluge Weg zum besten{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                  Mobilfunk- &amp; Internettarif
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Schluss mit Tarif-Dschungel und versteckten Preissprüngen ab dem 7. Monat: TarifPilot berechnet für jedes Angebot transparent den echten Durchschnittspreis inklusive Wechselbonus, Cashback und Hardware-Wert.
              </p>

              {/* Direct Search Input */}
              <form
                onSubmit={handleHomeSearchSubmit}
                className="flex flex-col sm:flex-row gap-2.5 max-w-xl pt-1"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={homeSearch}
                    onChange={(e) => setHomeSearch(e.target.value)}
                    placeholder="Suche z. B. „iPhone 17“, „Telekom 5G“, „Glasfaser“ oder „fraenk“..."
                    aria-label="Tarife durchsuchen"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-colors shrink-0"
                >
                  <span>Tarife finden</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/90">
                <div>
                  <div className="text-2xl font-extrabold text-white tabular-nums">ab 10,00 €</div>
                  <div className="text-xs text-slate-400 mt-0.5">5G Allnet-Flats im D1-Netz</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400 tabular-nums">bis 480 €</div>
                  <div className="text-xs text-slate-400 mt-0.5">Ø Ersparnis in 24 Monaten</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tabular-nums">8 Top-Marken</div>
                  <div className="text-xs text-slate-400 mt-0.5">D1, D2, o2, 1&amp;1 &amp; FTTH</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tabular-nums">100 %</div>
                  <div className="text-xs text-slate-400 mt-0.5">Kostenlos &amp; TKG-konform</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick-Finder Card */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleQuickFinderSubmit}
                className="rounded-3xl border border-slate-800 bg-white text-slate-900 p-6 sm:p-7 shadow-2xl"
              >
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                      Interaktiver Tarif-Lotse
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                      Was möchten Sie vergleichen?
                    </h2>
                  </div>
                  <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                </div>

                {/* Category 2x2 Selector */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {[
                    {
                      id: 'mobile' as TariffCategory,
                      label: 'Handy + Tarif',
                      sub: 'Top-Smartphones',
                      icon: Smartphone,
                      defaultMax: 60,
                    },
                    {
                      id: 'sim-only' as TariffCategory,
                      label: 'SIM-Only',
                      sub: 'ab 10,00 € / M.',
                      icon: Cpu,
                      defaultMax: 25,
                    },
                    {
                      id: 'broadband' as TariffCategory,
                      label: 'DSL & Glasfaser',
                      sub: 'bis 1.000 Mbit/s',
                      icon: Wifi,
                      defaultMax: 45,
                    },
                    {
                      id: 'unlimited' as TariffCategory,
                      label: 'Unlimited 5G',
                      sub: 'Ohne GB-Limit',
                      icon: InfinityIcon,
                      defaultMax: 60,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = quickCat === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setQuickCat(tab.id);
                          setQuickMaxBudget(tab.defaultMax);
                          if (tab.id === 'broadband') {
                            setQuickFlexOnly(false);
                          }
                          setQuickNetwork('all');
                        }}
                        className={`flex items-start gap-2.5 rounded-2xl border p-3 text-left transition-all ${
                          active
                            ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/15'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                            active ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                            {tab.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{tab.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Max Budget Slider */}
                <div className="mb-5 rounded-2xl bg-slate-50 p-4 border border-slate-200/70">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label htmlFor="quick-budget" className="font-bold text-slate-700">
                      Max. Effektivpreis
                    </label>
                    <span className="font-extrabold text-blue-700 tabular-nums">
                      bis {formatEuro(quickMaxBudget)} / Monat
                    </span>
                  </div>
                  <input
                    id="quick-budget"
                    type="range"
                    min={10}
                    max={85}
                    step={5}
                    value={quickMaxBudget}
                    onChange={(e) => setQuickMaxBudget(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                    <span>10 €</span>
                    <span>35 €</span>
                    <span>60 €</span>
                    <span>85 €</span>
                  </div>
                </div>

                {/* Network & Flex Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div>
                    <label htmlFor="quick-net" className="block text-xs font-bold text-slate-600 mb-1">
                      Bevorzugtes Netz
                    </label>
                    <select
                      id="quick-net"
                      value={quickNetwork}
                      onChange={(e) => setQuickNetwork(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-none"
                    >
                      <option value="all">Alle Netze / Technologien</option>
                      {quickCat === 'broadband' ? (
                        <>
                          <option value="Glasfaser">Glasfaser (FTTH)</option>
                          <option value="Kabel">Kabel-Glasfaser</option>
                          <option value="DSL">DSL / VDSL</option>
                        </>
                      ) : (
                        <>
                          <option value="Telekom">Telekom (D1-Netz)</option>
                          <option value="Vodafone">Vodafone (D2-Netz)</option>
                          <option value="o2">o2 / Telefónica</option>
                          <option value="1&1">1&amp;1 5G-Netz</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={quickFlexOnly}
                        onChange={(e) => setQuickFlexOnly(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span>Nur monatlich kündbar</span>
                    </label>
                  </div>
                </div>

                {/* Live Result Preview Banner */}
                <div className="mb-4 flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-900 border border-emerald-200/70">
                  <span className="font-semibold">
                    {heroMatches.length > 0 ? (
                      <>
                        <strong>{heroMatches.length}</strong> passende Tarife ab{' '}
                        <strong className="tabular-nums">
                          {formatEuro(heroMatches[0].effectiveMonthlyPrice)}
                        </strong>
                      </>
                    ) : (
                      'Filter anpassen oder alle Tarife öffnen'
                    )}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-blue-700 transition-all"
                >
                  <span>Jetzt {heroMatches.length || 'alle'} Angebote vergleichen</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROVIDERS STRIP ================= */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Geprüfte Tarife führender Telekommunikationsanbieter in Deutschland
            </h2>
            <Link
              to="/anbieter"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              <span>Alle 8 Anbieter &amp; Netztest-Noten</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PROVIDERS.map((prov) => (
              <Link
                key={prov.id}
                to={`/anbieter/${prov.slug}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 transition-all hover:border-blue-300 hover:bg-white hover:shadow-sm"
              >
                <ProviderLogo slug={prov.slug} size="sm" />
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                  <span className="text-amber-500">★</span>
                  <span className="tabular-nums">{prov.rating.toLocaleString('de-DE')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: MOBILE PHONE PLANS ================= */}
      <section id="mobilfunk-sektion" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Kategorie 1 • Handy mit Vertrag</span>
            </div>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Beliebte Handytarife mit Top-Smartphone
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              Aktuelle Flaggschiff-Smartphones kombiniert mit starken 5G-Allnet-Flats – oft zahlen Sie über 24 Monate kaum mehr als den reinen Gerätepreis.
            </p>
          </div>
          <Link
            to="/mobilfunk"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-600 hover:text-blue-700 transition-colors self-start md:self-auto shrink-0"
          >
            <span>Alle Handy-Bundles vergleichen</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {mobileDeals.map((offer, i) => (
            <TariffCard key={offer.id} offer={offer} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: SIM-ONLY DEALS ================= */}
      <section id="sim-only-sektion" className="bg-white border-y border-slate-200/80 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <Cpu className="h-3.5 w-3.5" />
                <span>Kategorie 2 • SIM-Only Allnet-Flats</span>
              </div>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                SIM-Only Deals ab 10,00 € pro Monat
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
                Behalten Sie Ihr vorhandenes Smartphone und sichern Sie sich maximale Freiheit: wahlweise monatlich kündbar oder mit hohem Rufnummern-Bonus.
              </p>
            </div>
            <Link
              to="/sim-only"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-600 hover:bg-white hover:text-blue-700 transition-colors self-start md:self-auto shrink-0"
            >
              <span>Alle SIM-Only Deals ansehen</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {simOnlyDeals.map((offer, i) => (
              <TariffCard key={offer.id} offer={offer} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: INTERNET & BROADBAND ================= */}
      <section id="internet-sektion" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
              <Wifi className="h-3.5 w-3.5" />
              <span>Kategorie 3 • Festnetz, DSL, Kabel &amp; Glasfaser</span>
            </div>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Schnelles Internet für Zuhause vergleichen
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              Von zuverlässigem VDSL 100 bis hin zu 1.000 Mbit/s Gigabit-Kabel und echter FTTH-Glasfaser – inklusive Neukunden-Rabattmonaten &amp; Cashback.
            </p>
          </div>
          <Link
            to="/internet"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-600 hover:text-blue-700 transition-colors self-start md:self-auto shrink-0"
          >
            <span>Alle Internettarife öffnen</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Interactive PLZ Broadband Checker */}
        <div className="mb-6">
          <PostalCodeChecker onTechnologySelect={(tech) => setBroadbandTechFilter(tech)} />
        </div>

        {broadbandTechFilter && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-800">
            <span>Gefiltert nach Anschlussart: {broadbandTechFilter}</span>
            <button
              type="button"
              onClick={() => setBroadbandTechFilter(null)}
              className="underline hover:text-blue-950"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        <div className="space-y-4">
          {broadbandDeals.map((offer, i) => (
            <TariffCard key={offer.id} offer={offer} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: UNLIMITED DATA PLANS ================= */}
      <section id="unlimited-sektion" className="bg-white border-y border-slate-200/80 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
                <InfinityIcon className="h-3.5 w-3.5" />
                <span>Kategorie 4 • Unbegrenztes Datenvolumen</span>
              </div>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Unlimited 5G-Tarife ohne Datenlimit
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
                Unbegrenzt 4K-Videos streamen, unterwegs per Laptop-Hotspot arbeiten oder das Heim-WLAN ersetzen – schon ab 19,99 € im Monat.
              </p>
            </div>
            <Link
              to="/unlimited"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-600 hover:bg-white hover:text-blue-700 transition-colors self-start md:self-auto shrink-0"
            >
              <span>Alle Unlimited-Tarife vergleichen</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {unlimitedDeals.map((offer, i) => (
              <TariffCard key={offer.id} offer={offer} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCY / EFFEKTIVPREIS EXPLAINER ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-7 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                <Calculator className="h-3.5 w-3.5" />
                <span>Die TarifPilot-Effektivpreis-Formel</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Warum der reine Monatspreis oft täuscht – und wie wir Sie schützen.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Lockangebote mit „9,99 € in den ersten 6 Monaten“ wirken auf den ersten Blick unschlagbar, können aber durch hohe Anschlussgebühren und teure Folgemonate teurer sein als ein transparenter Aktionstarif mit Wechselbonus. Deshalb berechnet TarifPilot jeden Tarif centgenau auf 24 Monate um.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <TrendingDown className="h-5 w-5 text-emerald-400 mb-2" />
                  <div className="font-bold text-sm">Alle Boni eingerechnet</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Wechselbonus, Online-Gutschrift und Cashback senken Ihre realen Gesamtkosten.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <ShieldCheck className="h-5 w-5 text-blue-400 mb-2" />
                  <div className="font-bold text-sm">Keine Gebühren-Überraschung</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Bereitstellungspreis, Versand und Gerätezuzahlung sind vollständig enthalten.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <Award className="h-5 w-5 text-amber-400 mb-2" />
                  <div className="font-bold text-sm">Objektives Ranking</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Provisionen beeinflussen niemals unsere mathematische Effektivpreis-Sortierung.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Formula Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white text-slate-900 p-6 shadow-lg space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                  Rechenbeispiel: Glasfaser / Kabel 250
                </div>
                <div className="divide-y divide-slate-100 text-sm tabular-nums">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Monat 1–9 (9 × 19,99 €)</span>
                    <span className="font-semibold">179,91 €</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Monat 10–24 (15 × 44,99 €)</span>
                    <span className="font-semibold">674,85 €</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Einmaliger Anschlusspreis</span>
                    <span className="font-semibold">0,00 €</span>
                  </div>
                  <div className="flex justify-between py-2 text-emerald-700 font-bold">
                    <span>Online-Gutschrift &amp; Cashback</span>
                    <span>− 170,00 €</span>
                  </div>
                  <div className="flex justify-between pt-3 text-base font-extrabold text-slate-900">
                    <span>Echter Effektivpreis (÷ 24 M.)</span>
                    <span className="text-blue-700">28,53 € / M.</span>
                  </div>
                </div>
                <Link
                  to="/vergleich"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  <span>Jetzt im Tarif-Rechner selbst vergleichen</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Ratgeber &amp; Verbraucherwissen
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Häufig gestellte Fragen zum Tarifwechsel
            </h2>
          </div>

          <div className="space-y-3">
            {HOME_FAQS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-slate-900 hover:bg-slate-100/70"
                  >
                    <span className="text-sm sm:text-base">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
