import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="pb-20">
      <SEOHead
        title="Über TarifPilot – Unsere Mission, Methodik & Impressum"
        description="Erfahren Sie, wie TarifPilot unabhängig Mobilfunk- und Internettarife in Deutschland prüft, wie der 100-Punkte TarifPilot-Index entsteht und wer hinter der Plattform steht."
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
            Über uns &amp; Redaktions-Kodex
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Wir machen den deutschen Tarifmarkt endlich fair und nachvollziehbar.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            TarifPilot wurde in Berlin gegründet, um Verbraucherinnen und Verbrauchern in Deutschland ein Werkzeug an die Hand zu geben, das Telekommunikationstarife nicht nach Werbeversprechen, sondern nach realen Gesamtkosten und echter Netzleistung bewertet.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8 space-y-12">
        {/* Core Principles */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">Mathematische Klarheit</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Jeder Tarif wird nach exakt derselben 24-Monats-Formel durchgerechnet – inklusive Anschlusspreis, Staffelmieten, Wechselbonus und Hardware-Wert.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">Redaktionelle Unabhängigkeit</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Kein Netzbetreiber kann sich bei TarifPilot eine bessere Bewertung oder eine höhere Platzierung im Preis-Ranking erkaufen.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">Verbraucherschutz im Fokus</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Wir weisen transparent auf Kündigungsfristen gemäß Telekommunikationsgesetz (TKG), Geschwindigkeitsgrenzen und Roaming-Details hin.
            </p>
          </div>
        </section>

        {/* How the TarifPilot Score works */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
            <Award className="h-4 w-4" />
            <span>Bewertungsmethodik</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            So berechnet sich der 100-Punkte TarifPilot-Qualitätsindex
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Neben dem reinen Effektivpreis vergeben unsere Tarif-Analysten für jedes Angebot einen Qualitäts-Score von 0 bis 100 Punkten anhand von vier gewichteten Säulen:
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                pct: '40 %',
                title: 'Effektivpreis-Leistungs-Verhältnis',
                desc: 'Wie günstig ist der rechnerische Monatspreis im Verhältnis zum gebotenen Datenvolumen bzw. zur Bandbreite?',
              },
              {
                pct: '25 %',
                title: 'Netzqualität & 5G / Glasfaser-Standard',
                desc: 'Grundlage sind aktuelle connect-Netztest-Ergebnisse, reale 5G-Abdeckung und Upload-/Ping-Stabilität.',
              },
              {
                pct: '20 %',
                title: 'Vertragsfairness & Flexibilität',
                desc: 'Punkte für monatliche Kündbarkeit, stabile Preise ab dem 25. Monat, Schweiz-Roaming und 0 € Anschlussgebühr.',
              },
              {
                pct: '15 %',
                title: 'Service, eSIM & Zusatzleistungen',
                desc: 'Sofortige eSIM-Bereitstellung, App-Bedienbarkeit, MultiSIM-Optionen und Erreichbarkeit des Kundenservice.',
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <span className="inline-block rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-extrabold text-white tabular-nums">
                  Gewichtung: {item.pct}
                </span>
                <h3 className="mt-3 font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impressum Block (German Legal Standard § 5 DDG) */}
        <section id="impressum" className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <Building2 className="h-4 w-4" />
            <span>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Impressum</h2>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
            <div className="space-y-2">
              <p className="font-extrabold text-slate-900">TarifPilot Digital GmbH</p>
              <p>
                Friedrichstraße 114a
                <br />
                10117 Berlin, Deutschland
              </p>
              <p>
                <strong>Vertreten durch die Geschäftsführung:</strong>
                <br />
                Dr. Lukas Bergmann, Miriam Hohenstein
              </p>
              <p>
                <strong>Kontakt:</strong>
                <br />
                Telefon: +49 (0) 30 555 789 10
                <br />
                E-Mail: redaktion@tarifpilot-vergleich.de
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Registereintrag:</strong>
                <br />
                Eintragung im Handelsregister
                <br />
                Registergericht: Amtsgericht Charlottenburg (Berlin)
                <br />
                Registernummer: HRB 248910 B
              </p>
              <p>
                <strong>Umsatzsteuer-ID:</strong>
                <br />
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE 358 412 907
              </p>
              <p>
                <strong>Inhaltlich verantwortlich gem. § 18 Abs. 2 MStV:</strong>
                <br />
                Miriam Hohenstein, Friedrichstraße 114a, 10117 Berlin
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Streitbeilegung: Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</span>
            </div>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              <span>Redaktion kontaktieren</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
