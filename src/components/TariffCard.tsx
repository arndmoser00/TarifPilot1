import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bookmark,
  Check,
  CheckCircle2,
  Flame,
  Info,
  Scale,
  Smartphone,
  Sparkles,
  Wifi,
  Zap,
} from 'lucide-react';
import { TariffOffer } from '../types/tariff';
import { getProviderBySlug } from '../data/providers';
import { ProviderLogo } from './ProviderLogo';
import {
  calculate24MonthBreakdown,
  formatDataVolume,
  formatEuro,
  formatSpeedCompact,
  splitEuroParts,
} from '../utils/format';
import { useComparison } from '../context/ComparisonContext';

interface TariffCardProps {
  offer: TariffOffer;
  rank?: number;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Testsieger: {
    bg: 'bg-blue-600 text-white',
    text: 'Testsieger',
    icon: <Award className="h-3.5 w-3.5" />,
  },
  'Preis-Tipp': {
    bg: 'bg-emerald-600 text-white',
    text: 'Preis-Leistungs-Tipp',
    icon: <Sparkles className="h-3.5 w-3.5" />,
  },
  'Effektiv-Kracher': {
    bg: 'bg-amber-500 text-slate-950',
    text: 'Effektiv-Kracher',
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  Bestseller: {
    bg: 'bg-indigo-600 text-white',
    text: 'Bestseller',
    icon: <Zap className="h-3.5 w-3.5" />,
  },
  'Top-Deal': {
    bg: 'bg-rose-600 text-white',
    text: 'Top-Deal',
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  'Flex-Tipp': {
    bg: 'bg-teal-600 text-white',
    text: 'Monatlich kündbar',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
};

export const TariffCard: React.FC<TariffCardProps> = ({ offer, rank }) => {
  const provider = getProviderBySlug(offer.providerSlug);
  const { isCompared, toggleCompare, isSaved, toggleSaved, priceMode } = useComparison();
  const [limitNotice, setLimitNotice] = useState(false);
  const [showCalcTooltip, setShowCalcTooltip] = useState(false);

  const compared = isCompared(offer.id);
  const saved = isSaved(offer.id);

  const displayedPrice =
    priceMode === 'effective' ? offer.effectiveMonthlyPrice : offer.monthlyPrice;
  const priceParts = splitEuroParts(displayedPrice);
  const calc = calculate24MonthBreakdown(offer);
  const totalBonus = offer.switchingBonus + offer.cashback;

  const badgeConfig = offer.badge ? BADGE_STYLES[offer.badge] : null;

  const handleCompareClick = () => {
    const res = toggleCompare(offer.id);
    if (res.limitReached) {
      setLimitNotice(true);
      setTimeout(() => setLimitNotice(false), 3000);
    }
  };

  // Speed visual progress (relative to 500 Mbit/s mobile or 1000 Mbit/s broadband)
  const maxRefSpeed = offer.category === 'broadband' ? 1000 : 500;
  const speedPercentage = Math.min(100, Math.max(18, Math.round((offer.downloadSpeedMbps / maxRefSpeed) * 100)));

  return (
    <article
      className={`group relative rounded-2xl border bg-white transition-all duration-200 hover:shadow-elevated ${
        compared
          ? 'border-blue-600 ring-2 ring-blue-600/15 shadow-soft'
          : offer.badge === 'Testsieger' || offer.badge === 'Preis-Tipp'
          ? 'border-blue-200/90 shadow-soft'
          : 'border-slate-200/90 shadow-sm hover:border-slate-300'
      }`}
    >
      {/* Top Banner Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 sm:px-6 rounded-t-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {typeof rank === 'number' && (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white tabular-nums">
              #{rank}
            </span>
          )}
          {badgeConfig && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold tracking-wide ${badgeConfig.bg}`}
            >
              {badgeConfig.icon}
              {badgeConfig.text}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {offer.category === 'broadband' ? (
              <Wifi className="h-3.5 w-3.5 text-blue-600" />
            ) : (
              <Zap className="h-3.5 w-3.5 text-blue-600" />
            )}
            {offer.network}
          </span>
          {offer.contractMonths === 1 && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Monatlich kündbar
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"
            title="Unabhängiger TarifPilot-Qualitätsindex aus Effektivpreis, Netz & Konditionen"
          >
            <span className="text-slate-400 hidden sm:inline">TarifPilot-Score:</span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 font-extrabold text-blue-700 ring-1 ring-inset ring-blue-700/15 tabular-nums">
              {offer.score}/100
            </span>
          </div>
          <button
            type="button"
            onClick={() => toggleSaved(offer.id)}
            aria-label={saved ? 'Aus Merkliste entfernen' : 'Tarif merken'}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
              saved
                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-300'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span className="hidden md:inline">{saved ? 'Gemerkt' : 'Merken'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12 lg:items-center">
        {/* Col 1: Provider & Title (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Link
              to={`/anbieter/${offer.providerSlug}`}
              className="shrink-0 transition-transform hover:scale-[1.02]"
              title={`Alle Tarife von ${provider?.name ?? offer.providerSlug}`}
            >
              <ProviderLogo slug={offer.providerSlug} size="md" />
            </Link>
            <div className="min-w-0">
              <Link
                to={`/anbieter/${offer.providerSlug}`}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
              >
                {provider?.name}
              </Link>
              {provider && (
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                  <span className="text-amber-500 font-bold">★</span>
                  <span className="font-bold tabular-nums">{provider.rating.toLocaleString('de-DE')}</span>
                  <span className="text-slate-400">({provider.reviewCount.toLocaleString('de-DE')})</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Link
              to={`/tarif/${offer.slug}`}
              className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug block"
            >
              {offer.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed line-clamp-2">
              {offer.subtitle}
            </p>
          </div>

          {offer.hardwareName && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-xs font-semibold text-indigo-950">
              <Smartphone className="h-4 w-4 shrink-0 text-indigo-600" />
              <div>
                <span className="block font-bold">{offer.hardwareName}</span>
                <span className="text-[11px] text-indigo-700">
                  Einmalig {formatEuro(offer.hardwareOneTimePrice ?? 0)} • Gerätewert ca.{' '}
                  {formatEuro(offer.hardwareRetailValue ?? 0)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Col 2: Data / Speed & Key Features (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          {/* Data & Speed Box */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {offer.category === 'broadband' ? 'Highspeed-Leitung' : 'Datenvolumen'}
              </span>
              <div className="mt-0.5 text-2xl font-extrabold text-slate-900 tabular-nums tracking-tight">
                {offer.category === 'broadband'
                  ? formatSpeedCompact(offer.downloadSpeedMbps)
                  : formatDataVolume(offer.dataVolumeGb, offer.category)}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <span>
                  {offer.category === 'broadband'
                    ? `Upload bis ${formatSpeedCompact(offer.uploadSpeedMbps)}`
                    : `Max. ${formatSpeedCompact(offer.downloadSpeedMbps)} (${
                        offer.fiveGIncluded ? '5G' : 'LTE'
                      })`}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"
                  style={{ width: `${speedPercentage}%` }}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
                <span>{offer.contractMonths === 1 ? '1 Monat Laufzeit' : '24 Monate Laufzeit'}</span>
                <span>•</span>
                <span>{offer.eSimReady ? 'eSIM bereit' : offer.technology}</span>
              </div>
            </div>
          </div>

          {/* Feature Checklist */}
          <ul className="space-y-2 text-xs text-slate-700 flex flex-col justify-center">
            {offer.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-snug">
                <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5 stroke-[2.5]" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Price & CTA (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between border-t border-slate-100 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <div className="flex flex-row items-end justify-between lg:flex-col lg:items-end lg:text-right">
            <div>
              <div className="flex items-center lg:justify-end gap-1 text-xs font-semibold text-slate-500">
                <span>
                  {priceMode === 'effective' ? 'Effektivpreis / Monat' : 'Grundgebühr / Monat'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCalcTooltip((v) => !v)}
                  aria-label="Preisberechnung anzeigen"
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-0.5 flex items-baseline lg:justify-end gap-0.5 text-slate-900 tabular-nums">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {priceParts.whole}
                </span>
                <span className="text-lg font-extrabold">,{priceParts.cents} €</span>
              </div>

              {priceMode === 'effective' && offer.effectiveMonthlyPrice < offer.monthlyPrice && (
                <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                  Regulär {formatEuro(offer.monthlyPrice)} / M.
                </div>
              )}
              {offer.promoMonthlyPrice !== undefined && offer.promoMonths && (
                <div className="text-xs font-semibold text-emerald-700 mt-0.5 tabular-nums">
                  Monat 1–{offer.promoMonths}: nur {formatEuro(offer.promoMonthlyPrice)}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              {totalBonus > 0 && (
                <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 tabular-nums">
                  {formatEuro(totalBonus)} Bonus inkl.
                </span>
              )}
              {offer.hardwareRetailValue && calc.effectiveMonthlyWithHardware < 15 && (
                <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 tabular-nums">
                  {calc.effectiveMonthlyWithHardware <= 0
                    ? `Tarif rechnerisch gratis (${formatEuro(calc.effectiveMonthlyWithHardware)})`
                    : `Tarif rechnerisch ${formatEuro(calc.effectiveMonthlyWithHardware)}/M.`}
                </span>
              )}
            </div>
          </div>

          {/* Expandable Mini Calculation Info */}
          {showCalcTooltip && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 space-y-1 animate-fade-in">
              <div className="font-bold text-slate-900 mb-1">24-Monats-Effektivrechnung</div>
              <div className="flex justify-between tabular-nums">
                <span>Gesamtkosten (24 M. inkl. Einmalig):</span>
                <span>{formatEuro(calc.grossTotal24M)}</span>
              </div>
              {calc.bonusTotal > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold tabular-nums">
                  <span>Abzgl. Wechselbonus/Cashback:</span>
                  <span>− {formatEuro(calc.bonusTotal)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-slate-900 tabular-nums">
                <span>Effektiv pro Monat:</span>
                <span>{formatEuro(offer.effectiveMonthlyPrice)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to={`/tarif/${offer.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
            >
              <span>Zum Angebot</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={handleCompareClick}
              className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
                compared
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>{compared ? 'Im Vergleich ausgewählt ✓' : 'Zum Direktvergleich'}</span>
            </button>

            {limitNotice && (
              <p className="text-[11px] font-semibold text-amber-700 text-center animate-fade-in">
                Maximal 3 Tarife gleichzeitig vergleichbar.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
