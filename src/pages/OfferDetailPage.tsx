import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  ExternalLink,
  Scale,
  ShieldCheck,
  Smartphone,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ProviderLogo } from '../components/ProviderLogo';
import { TariffCard } from '../components/TariffCard';
import { CATEGORY_META, getOfferBySlug, getOffersByCategory } from '../data/tariffs';
import { getProviderBySlug } from '../data/providers';
import {
  calculate24MonthBreakdown,
  formatDataVolume,
  formatEuro,
  formatSpeedCompact,
  splitEuroParts,
} from '../utils/format';
import { useComparison } from '../context/ComparisonContext';

export const OfferDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const offer = slug ? getOfferBySlug(slug) : undefined;
  const { isCompared, toggleCompare, isSaved, toggleSaved } = useComparison();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [portNumberWanted, setPortNumberWanted] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!offer) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Tarifangebot nicht gefunden</h1>
        <p className="mt-2 text-sm text-slate-600">
          Dieses Angebot ist eventuell abgelaufen oder die Adresse wurde geändert.
        </p>
        <Link
          to="/vergleich"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Alle aktuellen Tarife anzeigen</span>
        </Link>
      </div>
    );
  }

  const provider = getProviderBySlug(offer.providerSlug);
  const catMeta = CATEGORY_META[offer.category];
  const calc = calculate24MonthBreakdown(offer);
  const effParts = splitEuroParts(offer.effectiveMonthlyPrice);
  const compared = isCompared(offer.id);
  const saved = isSaved(offer.id);

  const similarOffers = getOffersByCategory(offer.category)
    .filter((o) => o.id !== offer.id)
    .sort((a, b) => a.effectiveMonthlyPrice - b.effectiveMonthlyPrice)
    .slice(0, 2);

  const offerJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: offer.title,
    description: offer.subtitle,
    brand: {
      '@type': 'Brand',
      name: provider?.name ?? offer.providerSlug,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: offer.effectiveMonthlyPrice.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="pb-20">
      <SEOHead
        title={`${offer.title} ab ${formatEuro(offer.effectiveMonthlyPrice)} Effektivpreis | TarifPilot`}
        description={`${offer.title} bei ${provider?.name ?? ''}: ${offer.subtitle}. Alle Kosten über 24 Monate transparent berechnet.`}
        jsonLd={offerJsonLd}
      />

      {/* Breadcrumb & Hero Summary */}
      <section className="bg-slate-900 text-white py-10 sm:py-12 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-white">
              Startseite
            </Link>
            <span>/</span>
            <Link to={`/${catMeta.slug}`} className="hover:text-white">
              {catMeta.label}
            </Link>
            <span>/</span>
            {provider && (
              <>
                <Link to={`/anbieter/${provider.slug}`} className="hover:text-white">
                  {provider.shortName}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-blue-400 font-semibold">{offer.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {offer.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-extrabold text-slate-950">
                    <Award className="h-3.5 w-3.5" />
                    {offer.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-400/30">
                  TarifPilot-Score: {offer.score}/100
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  Aktionskonditionen gültig bis {offer.validUntil}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {offer.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {offer.subtitle}
              </p>

              {/* Key Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    {offer.category === 'broadband' ? 'Leitung' : 'Datenvolumen'}
                  </span>
                  <span className="text-lg font-extrabold text-white mt-0.5 block tabular-nums">
                    {formatDataVolume(offer.dataVolumeGb, offer.category)}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Max. Speed</span>
                  <span className="text-lg font-extrabold text-emerald-400 mt-0.5 block tabular-nums">
                    {formatSpeedCompact(offer.downloadSpeedMbps)}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Netz / Technik</span>
                  <span className="text-sm font-extrabold text-white mt-1 block truncate">
                    {offer.network}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Mindestlaufzeit</span>
                  <span className="text-lg font-extrabold text-white mt-0.5 block">
                    {offer.contractMonths === 1 ? '1 Monat' : '24 Monate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Sticky Price Summary Box */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-white text-slate-900 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <Link to={`/anbieter/${offer.providerSlug}`}>
                    <ProviderLogo slug={offer.providerSlug} size="sm" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSaved(offer.id)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold ${
                      saved ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{saved ? 'Gemerkt' : 'Merken'}</span>
                  </button>
                </div>

                <div className="border-y border-slate-100 py-4">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rechnerischer Effektivpreis
                  </div>
                  <div className="mt-1 flex items-baseline gap-1 text-slate-900 tabular-nums">
                    <span className="text-4xl font-extrabold tracking-tight">{effParts.whole}</span>
                    <span className="text-xl font-extrabold">,{effParts.cents} €</span>
                    <span className="text-xs font-semibold text-slate-500 ml-1">/ Monat</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 tabular-nums">
                    Reguläre Grundgebühr: <strong>{formatEuro(offer.monthlyPrice)}</strong> / Monat
                  </div>
                  {offer.switchingBonus + offer.cashback > 0 && (
                    <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 tabular-nums">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>
                        Inkl. {formatEuro(offer.switchingBonus + offer.cashback)} Gesamtbonus
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOrderConfirmed(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all"
                >
                  <span>Zum Anbieter &amp; Deal sichern</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleCompare(offer.id)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors ${
                    compared
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="h-4 w-4" />
                  <span>{compared ? 'Im Tarifvergleich ausgewählt ✓' : 'Zum Direktvergleich hinzufügen'}</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-snug">
                  Unverbindliche Weiterleitung zu {provider?.name}. 14 Tage gesetzliches Widerrufsrecht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown & Specs */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Highlights + Technical Table */}
          <div className="lg:col-span-7 space-y-8">
            {offer.hardwareName && (
              <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                      Enthaltenes Top-Smartphone
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                      {offer.hardwareName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Einmalige Gerätezuzahlung beim Anbieter:{' '}
                      <strong className="text-slate-900 tabular-nums">
                        {formatEuro(offer.hardwareOneTimePrice ?? 0)}
                      </strong>{' '}
                      (Aktueller Vergleichspreis ohne Vertrag: ca.{' '}
                      <strong className="tabular-nums">
                        {formatEuro(offer.hardwareRetailValue ?? 0)}
                      </strong>
                      ).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                Alle Vorteile dieses Angebots im Überblick
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-700">
                {offer.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5 border border-slate-100"
                  >
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5 stroke-[2.5]" />
                    <span className="font-medium leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Details Table */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                {offer.category === 'broadband' ? (
                  <Wifi className="h-5 w-5 text-blue-600" />
                ) : (
                  <Zap className="h-5 w-5 text-blue-600" />
                )}
                <span>Technische Tarifdetails &amp; Vertragsbedingungen</span>
              </h2>
              <dl className="divide-y divide-slate-100 text-sm">
                {offer.tarifDetails.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-3.5">
                    <dt className="font-bold text-slate-600">{item.label}</dt>
                    <dd className="sm:col-span-2 font-semibold text-slate-900">{item.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-3.5">
                  <dt className="font-bold text-slate-600">Kündigungsfrist (TKG)</dt>
                  <dd className="sm:col-span-2 font-semibold text-slate-900">{offer.noticePeriod}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right 5 Cols: Full 24-Month Cost Calculator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-blue-200 bg-white p-6 sm:p-7 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                <Calculator className="h-4 w-4" />
                <span>Transparente Gesamtkosten-Rechnung</span>
              </div>
              <h2 className="mt-1.5 text-xl font-extrabold text-slate-900">
                Kostenübersicht auf 24 Monate
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {offer.contractMonths === 1
                  ? 'Hinweis: Dieser Tarif ist monatlich kündbar. Zur besseren Vergleichbarkeit zeigen wir die Hochrechnung auf 24 Monate.'
                  : 'Vollständige Aufschlüsselung über die 24-monatige Mindestvertragslaufzeit.'}
              </p>

              <div className="mt-5 divide-y divide-slate-100 text-sm tabular-nums">
                {calc.promoMonths > 0 ? (
                  <>
                    <div className="flex justify-between py-2.5">
                      <span className="text-slate-600">
                        Monat 1–{calc.promoMonths} ({calc.promoMonths} × {formatEuro(calc.promoRate)})
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatEuro(calc.promoTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-slate-600">
                        Monat {calc.promoMonths + 1}–24 ({calc.regularMonths} ×{' '}
                        {formatEuro(offer.monthlyPrice)})
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatEuro(calc.regularTotal)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-600">
                      24 × Monatliche Grundgebühr ({formatEuro(offer.monthlyPrice)})
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatEuro(calc.regularTotal)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-2.5">
                  <span className="text-slate-600">Einmaliger Anschlusspreis</span>
                  <span className="font-semibold text-slate-900">
                    {formatEuro(offer.oneTimeSetupFee)}
                  </span>
                </div>

                {offer.hardwareName && (
                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-600">Einmalige Gerätezuzahlung</span>
                    <span className="font-semibold text-slate-900">
                      {formatEuro(offer.hardwareOneTimePrice ?? 0)}
                    </span>
                  </div>
                )}

                {offer.shippingFee > 0 && (
                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-600">Versandkosten Hardware</span>
                    <span className="font-semibold text-slate-900">
                      {formatEuro(offer.shippingFee)}
                    </span>
                  </div>
                )}

                {offer.switchingBonus > 0 && (
                  <div className="flex justify-between py-2.5 text-emerald-700 font-semibold">
                    <span>Wechsel- / Online-Bonus</span>
                    <span>− {formatEuro(offer.switchingBonus)}</span>
                  </div>
                )}

                {offer.cashback > 0 && (
                  <div className="flex justify-between py-2.5 text-emerald-700 font-semibold">
                    <span>TarifPilot Cashback-Auszahlung</span>
                    <span>− {formatEuro(offer.cashback)}</span>
                  </div>
                )}

                <div className="flex justify-between py-3 font-bold text-slate-900 bg-slate-50 px-3 rounded-xl my-2">
                  <span>Gesamtkosten in 24 Monaten</span>
                  <span>{formatEuro(calc.netTotal24M)}</span>
                </div>

                <div className="flex justify-between pt-3 text-base font-extrabold text-blue-700">
                  <span>Effektivpreis pro Monat (÷ 24)</span>
                  <span>{formatEuro(offer.effectiveMonthlyPrice)}</span>
                </div>

                {offer.hardwareRetailValue && (
                  <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-950">
                    <div className="font-extrabold mb-1">
                      Hardware-Vorteilsrechnung (inkl. {offer.hardwareName}):
                    </div>
                    <p className="leading-relaxed">{offer.costSummaryNote}</p>
                  </div>
                )}

                {!offer.hardwareRetailValue && (
                  <div className="mt-4 rounded-2xl bg-blue-50/70 border border-blue-100 p-3.5 text-xs text-slate-700">
                    {offer.costSummaryNote}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Offers */}
        {similarOffers.length > 0 && (
          <section className="pt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Passende Alternativen in der Kategorie {catMeta.shortLabel}
              </h2>
              <Link
                to={`/${catMeta.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Alle anzeigen</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {similarOffers.map((alt) => (
                <TariffCard key={alt.id} offer={alt} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Partner Checkout / Offer Redirect Modal */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <ProviderLogo slug={offer.providerSlug} size="sm" />
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                aria-label="Fenster schließen"
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!orderConfirmed ? (
              <div className="mt-4 space-y-4">
                <h2 id="checkout-modal-title" className="text-xl font-extrabold text-slate-900">
                  {offer.title} zum Aktionspreis sichern
                </h2>
                <p className="text-sm text-slate-600">
                  Sie wechseln zum offiziellen Antragsformular von <strong>{provider?.name}</strong>. Ihre TarifPilot-Vorteile (Effektivpreis{' '}
                  <strong className="tabular-nums">{formatEuro(offer.effectiveMonthlyPrice)} / Monat</strong>) sind automatisch hinterlegt.
                </p>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                  <div className="font-extrabold text-slate-900">
                    Checkliste für den schnellen Online-Abschluss (ca. 3 Min.):
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Personalausweis oder Reisepass zur Legitimation bereithalten</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Deutsche IBAN für das SEPA-Lastschriftmandat</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 pt-1 font-semibold text-slate-900">
                    <input
                      type="checkbox"
                      checked={portNumberWanted}
                      onChange={(e) => setPortNumberWanted(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                    <span>
                      Bisherige Rufnummer kostenlos mitnehmen{' '}
                      {offer.switchingBonus > 0
                        ? `(+${formatEuro(offer.switchingBonus)} Bonus sichern)`
                        : ''}
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 p-3 text-[11px] text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Transparenz-Hinweis: Für die Vermittlung erhält TarifPilot ggf. eine Partner-Provision vom Anbieter. Ihr Tarifpreis bleibt garantiert unverändert günstig.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setOrderConfirmed(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-blue-700"
                  >
                    <span>Weiter zu {provider?.shortName}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-3.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 text-center space-y-4 py-4 animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Aktions-Konfiguration gespeichert!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Ihre Tarifauswahl <strong>{offer.title}</strong>{' '}
                  {portNumberWanted ? 'inklusive Rufnummernmitnahme-Vormerkung ' : ''}
                  wurde für <strong>{provider?.officialDomain}</strong> vorbereitet. In einer Live-Produktionsumgebung öffnet sich nun der verschlüsselte Bestellprozess von {provider?.name}.
                </p>
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 tabular-nums">
                  Vorgangs-Referenz: <strong>TP-2026-{offer.id.toUpperCase()}</strong> • Effektivpreis:{' '}
                  <strong>{formatEuro(offer.effectiveMonthlyPrice)} / Monat</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-blue-600"
                >
                  Zurück zur Tarifseite
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
