import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Signal } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ProviderLogo } from '../components/ProviderLogo';
import { PROVIDERS } from '../data/providers';
import { getOffersByProvider } from '../data/tariffs';
import { formatEuro } from '../utils/format';

export const ProvidersListPage: React.FC = () => {
  return (
    <div className="pb-20">
      <SEOHead
        title="Telekommunikationsanbieter & Netze in Deutschland im Vergleich | TarifPilot"
        description="Alle großen Mobilfunk- und Internetanbieter in Deutschland im Überblick: Telekom, Vodafone, o2, 1&1, congstar, fraenk, klarmobil & Deutsche Glasfaser inkl. Netztest-Noten."
      />

      {/* Header */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-3 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Anbieter &amp; Netze</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Telekommunikationsanbieter &amp; Netze in Deutschland
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Welcher Anbieter steckt hinter welchem Netz? Vergleichen Sie Netzabdeckung, unabhängige connect-Netztest-Bewertungen, Servicequalität und die günstigsten Einstiegstarife aller Top-Marken.
          </p>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROVIDERS.map((provider) => {
            const offers = getOffersByProvider(provider.slug);
            const minOfferPrice =
              offers.length > 0
                ? Math.min(...offers.map((o) => o.effectiveMonthlyPrice))
                : 0;

            return (
              <article
                key={provider.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs transition-all hover:border-blue-300 hover:shadow-elevated"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <ProviderLogo slug={provider.slug} size="md" />
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800 ring-1 ring-amber-200">
                        <span>★ {provider.rating.toLocaleString('de-DE')} / 5,0</span>
                        <span className="text-amber-600 font-medium">
                          ({provider.reviewCount.toLocaleString('de-DE')})
                        </span>
                      </div>
                      <div className="mt-1.5 text-[11px] font-bold text-blue-700 flex items-center justify-end gap-1">
                        <Award className="h-3.5 w-3.5" />
                        <span>{provider.connectTestGrade}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold text-slate-900">
                    <Link to={`/anbieter/${provider.slug}`} className="hover:text-blue-700">
                      {provider.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-blue-700">
                    {provider.networkSummary}
                  </p>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {provider.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                    {provider.highlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-900">{offers.length} geprüfte Tarife</span>{' '}
                    • ab{' '}
                    <span className="font-extrabold text-emerald-700 tabular-nums">
                      {formatEuro(minOfferPrice)} / M.
                    </span>
                  </div>
                  <Link
                    to={`/anbieter/${provider.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors"
                  >
                    <span>Anbieter-Profil &amp; Tarife</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* German Mobile Network Comparison Info Box */}
        <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
            <Signal className="h-4 w-4" />
            <span>Ratgeber Mobilfunknetze Deutschland</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            D1, D2, o2 oder 1&amp;1 – Welches Netz passt zu Ihrem Alltag?
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-extrabold uppercase text-slate-500">
                  <th className="py-3 pr-4">Mobilfunknetz</th>
                  <th className="py-3 px-4">5G-Bevölkerungsabdeckung</th>
                  <th className="py-3 px-4">Marken im Netz (Beispiele)</th>
                  <th className="py-3 pl-4">Ideal geeignet für</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 pr-4 font-extrabold text-slate-900">Telekom (D1-Netz)</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 tabular-nums">&gt; 97 % (Platz 1)</td>
                  <td className="py-3.5 px-4">Telekom, congstar, fraenk</td>
                  <td className="py-3.5 pl-4">Pendler, ländliche Regionen, Schweiz-Reisende</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-extrabold text-slate-900">Vodafone (D2-Netz)</td>
                  <td className="py-3.5 px-4 font-bold text-blue-700 tabular-nums">ca. 93–95 %</td>
                  <td className="py-3.5 px-4">Vodafone, klarmobil, SIMon mobile</td>
                  <td className="py-3.5 pl-4">Städte, Autobahnen, Kombi-Sparer mit Kabel-Internet</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-extrabold text-slate-900">o2 / Telefónica</td>
                  <td className="py-3.5 px-4 font-bold text-blue-700 tabular-nums">&gt; 96 %</td>
                  <td className="py-3.5 px-4">o2, ALDI TALK, Blau</td>
                  <td className="py-3.5 pl-4">Streaming, Power-User &amp; günstige Unlimited-Tarife</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-extrabold text-slate-900">1&amp;1 5G + Roaming</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 tabular-nums">ca. 93 % (inkl. D2-Roaming)</td>
                  <td className="py-3.5 px-4">1&amp;1, GMX, WEB.DE</td>
                  <td className="py-3.5 pl-4">Smartphone-Bundles &amp; Kunden mit Service-Fokus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
