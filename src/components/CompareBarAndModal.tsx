import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Scale, Trash2, Trophy, X } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { ProviderLogo } from './ProviderLogo';
import { formatDataVolume, formatEuro, formatSpeedCompact } from '../utils/format';
import { getProviderBySlug } from '../data/providers';

export const CompareBarAndModal: React.FC = () => {
  const {
    compareOffers,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
  } = useComparison();

  if (compareOffers.length === 0) {
    return null;
  }

  const lowestEffective = Math.min(...compareOffers.map((o) => o.effectiveMonthlyPrice));
  const highestSpeed = Math.max(...compareOffers.map((o) => o.downloadSpeedMbps));
  const highestScore = Math.max(...compareOffers.map((o) => o.score));

  return (
    <>
      {/* Sticky Bottom Compare Tray */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl animate-slide-up">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Scale className="h-4 w-4" />
              </span>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 block">
                  Tarif-Direktvergleich ({compareOffers.length}/3)
                </span>
                <span className="text-slate-500 hidden md:inline">
                  Bis zu 3 Angebote nebeneinander prüfen
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {compareOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 pl-2.5 pr-1.5 py-1 text-xs shrink-0"
                >
                  <span className="font-bold text-slate-800 max-w-[140px] truncate">
                    {offer.title}
                  </span>
                  <span className="font-extrabold text-blue-700 tabular-nums">
                    {formatEuro(offer.effectiveMonthlyPrice)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(offer.id)}
                    aria-label={`${offer.title} entfernen`}
                    className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Leeren</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span>Jetzt {compareOffers.length} Tarife vergleichen</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
        >
          <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div>
                <h2 id="compare-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Direktvergleich Ihrer ausgewählten Tarife
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Grün markierte Werte kennzeichnen den jeweiligen Bestwert in Ihrer Auswahl.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                aria-label="Vergleich schließen"
                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Matrix */}
            <div className="overflow-auto p-4 sm:p-6">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="w-44 pb-4 pr-4 align-bottom text-xs font-bold uppercase tracking-wider text-slate-400">
                      Kriterium
                    </th>
                    {compareOffers.map((offer) => {
                      const prov = getProviderBySlug(offer.providerSlug);
                      return (
                        <th
                          key={offer.id}
                          className="pb-4 px-3 align-top border-l border-slate-100"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <ProviderLogo slug={offer.providerSlug} size="sm" />
                            <button
                              type="button"
                              onClick={() => removeFromCompare(offer.id)}
                              className="text-xs text-slate-400 hover:text-rose-600"
                              title="Aus Vergleich entfernen"
                            >
                              Entfernen
                            </button>
                          </div>
                          <div className="mt-2 font-extrabold text-slate-900 leading-snug">
                            {offer.title}
                          </div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5">
                            {prov?.name}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">
                      Effektivpreis / Monat
                    </td>
                    {compareOffers.map((offer) => {
                      const isBest = offer.effectiveMonthlyPrice === lowestEffective;
                      return (
                        <td
                          key={offer.id}
                          className={`py-3.5 px-3 border-l border-slate-100 tabular-nums ${
                            isBest ? 'bg-emerald-50/70' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-extrabold ${
                                isBest ? 'text-emerald-700' : 'text-slate-900'
                              }`}
                            >
                              {formatEuro(offer.effectiveMonthlyPrice)}
                            </span>
                            {isBest && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                                <Trophy className="h-3 w-3" /> Günstigster
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            Regulär: {formatEuro(offer.monthlyPrice)} / Monat
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">TarifPilot-Index</td>
                    {compareOffers.map((offer) => {
                      const isBest = offer.score === highestScore;
                      return (
                        <td
                          key={offer.id}
                          className={`py-3.5 px-3 border-l border-slate-100 tabular-nums ${
                            isBest ? 'bg-blue-50/50 font-extrabold text-blue-700' : 'font-bold text-slate-800'
                          }`}
                        >
                          {offer.score} / 100 Punkte {isBest ? '★' : ''}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Netz &amp; Technologie</td>
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="py-3.5 px-3 border-l border-slate-100">
                        <span className="font-semibold text-slate-800 block">{offer.network}</span>
                        <span className="text-xs text-slate-500">{offer.technology}</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Datenvolumen</td>
                    {compareOffers.map((offer) => (
                      <td
                        key={offer.id}
                        className="py-3.5 px-3 border-l border-slate-100 font-bold text-slate-900 tabular-nums"
                      >
                        {formatDataVolume(offer.dataVolumeGb, offer.category)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Max. Download-Speed</td>
                    {compareOffers.map((offer) => {
                      const isBest = offer.downloadSpeedMbps === highestSpeed;
                      return (
                        <td
                          key={offer.id}
                          className={`py-3.5 px-3 border-l border-slate-100 font-bold tabular-nums ${
                            isBest ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-800'
                          }`}
                        >
                          {formatSpeedCompact(offer.downloadSpeedMbps)}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Hardware / Smartphone</td>
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="py-3.5 px-3 border-l border-slate-100 text-xs">
                        {offer.hardwareName ? (
                          <div>
                            <span className="font-bold text-slate-900 block">{offer.hardwareName}</span>
                            <span className="text-slate-500">
                              Zuzahlung: {formatEuro(offer.hardwareOneTimePrice ?? 0)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">Kein Gerät (SIM-Only / Anschluss)</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Anschlusspreis &amp; Bonus</td>
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="py-3.5 px-3 border-l border-slate-100 text-xs tabular-nums">
                        <div>Anschluss: {formatEuro(offer.oneTimeSetupFee)}</div>
                        <div className="font-semibold text-emerald-700 mt-0.5">
                          Bonus/Cashback: {formatEuro(offer.switchingBonus + offer.cashback)}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Mindestlaufzeit</td>
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="py-3.5 px-3 border-l border-slate-100">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            offer.contractMonths === 1
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {offer.contractMonths === 1 ? 'Monatlich kündbar' : '24 Monate'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-slate-600">Top-Vorteile</td>
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="py-3.5 px-3 border-l border-slate-100">
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {offer.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="pt-4 pr-4" />
                    {compareOffers.map((offer) => (
                      <td key={offer.id} className="pt-4 px-3 border-l border-slate-100">
                        <Link
                          to={`/tarif/${offer.slug}`}
                          onClick={() => setIsCompareModalOpen(false)}
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                        >
                          <span>Details &amp; Abschluss</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
