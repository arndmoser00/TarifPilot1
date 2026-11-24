import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  MinusCircle,
  Phone,
  Signal,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ProviderLogo } from '../components/ProviderLogo';
import { TariffCard } from '../components/TariffCard';
import { getProviderBySlug, PROVIDERS } from '../data/providers';
import { CATEGORY_META, getOffersByProvider } from '../data/tariffs';
import { TariffCategory } from '../types/tariff';

export const ProviderDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const provider = slug ? getProviderBySlug(slug) : undefined;
  const [catFilter, setCatFilter] = useState<TariffCategory | 'all'>('all');

  useEffect(() => {
    setCatFilter('all');
  }, [slug]);

  const allProviderOffers = useMemo(
    () => (provider ? getOffersByProvider(provider.slug) : []),
    [provider]
  );

  const filteredOffers = useMemo(
    () =>
      catFilter === 'all'
        ? allProviderOffers
        : allProviderOffers.filter((o) => o.category === catFilter),
    [allProviderOffers, catFilter]
  );

  if (!provider) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Anbieter nicht gefunden</h1>
        <p className="mt-2 text-sm text-slate-600">
          Der gesuchte Telekommunikationsanbieter ist nicht in unserem Verzeichnis hinterlegt.
        </p>
        <Link
          to="/anbieter"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Zur Anbieter-Übersicht</span>
        </Link>
      </div>
    );
  }

  const otherProviders = PROVIDERS.filter((p) => p.slug !== provider.slug).slice(0, 4);

  return (
    <div className="pb-20">
      <SEOHead
        title={`${provider.name} Tarife, Erfahrungen & Netzqualität 2026 | TarifPilot`}
        description={`Alle aktuellen ${provider.name} Tarife im Effektivpreis-Vergleich: Netzabdeckung (${provider.connectTestGrade}), Stärken, Schwächen & Top-Deals.`}
      />

      {/* Hero Profile Header */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Startseite
            </Link>
            <span>/</span>
            <Link to="/anbieter" className="hover:text-white">
              Anbieter
            </Link>
            <span>/</span>
            <span className="text-blue-400 font-semibold">{provider.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <ProviderLogo slug={provider.slug} size="lg" className="bg-white" />
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-400/30">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Netztest: {provider.connectTestGrade}</span>
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {provider.name} Tarife &amp; Erfahrungen
                </h1>
                <p className="mt-1.5 text-sm sm:text-base text-slate-300 max-w-2xl">
                  {provider.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 self-start lg:self-auto">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Kundenbewertung</div>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-amber-400 tabular-nums">
                    ★ {provider.rating.toLocaleString('de-DE')}
                  </span>
                  <span className="text-xs text-slate-400">/ 5,0</span>
                </div>
                <div className="text-[11px] text-slate-500 tabular-nums">
                  Basierend auf {provider.reviewCount.toLocaleString('de-DE')} Bewertungen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 space-y-12">
        {/* Provider Overview + Pros/Cons + Facts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900">
                Redaktionelle Einschätzung zu {provider.name}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {provider.longDescription}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-5">
                  <h3 className="text-sm font-extrabold text-emerald-950 mb-3">
                    Vorteile &amp; Stärken
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                    {provider.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-5">
                  <h3 className="text-sm font-extrabold text-amber-950 mb-3">
                    Darauf sollten Sie achten
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
                    {provider.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <MinusCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Fact Card */}
          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">
                Anbieter-Steckbrief
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Signal className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Genutztes Netz</span>
                    <span className="text-slate-600">{provider.networkSummary}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Unternehmenssitz</span>
                    <span className="text-slate-600">
                      {provider.headquarters} (seit {provider.founded})
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Kundenservice / Hotline</span>
                    <span className="text-slate-600">{provider.hotline}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Servicezeiten</span>
                    <span className="text-slate-600">{provider.customerServiceHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Active Tariffs of Provider */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Aktuelle {provider.shortName} Tarife im Vergleich ({filteredOffers.length})
            </h2>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCatFilter('all')}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                  catFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Alle ({allProviderOffers.length})
              </button>
              {provider.categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCatFilter(cat)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                    catFilter === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {CATEGORY_META[cat].shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOffers.map((offer, i) => (
              <TariffCard key={offer.id} offer={offer} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Provider FAQs */}
        {provider.faqs.length > 0 && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">
              Häufige Fragen zu {provider.name}
            </h2>
            <div className="space-y-4">
              {provider.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Further Providers */}
        <section>
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">
            Weitere Anbieter im Direktvergleich
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherProviders.map((p) => (
              <Link
                key={p.id}
                to={`/anbieter/${p.slug}`}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-400 transition-colors"
              >
                <ProviderLogo slug={p.slug} size="sm" />
                <span className="mt-2 text-xs font-bold text-slate-800">{p.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
