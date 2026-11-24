import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Coins, Scale, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <div className="pb-20">
      <SEOHead
        title="Affiliate-Hinweis & Transparenz-Erklärung | TarifPilot"
        description="Volle Transparenz: So finanziert sich TarifPilot über Partnerprovisionen, ohne dass Ihnen Mehrkosten entstehen oder unsere objektiven Rankings beeinflusst werden."
      />

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100 % Transparenz für Verbraucher</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Affiliate-Hinweis &amp; Finanzierung von TarifPilot
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Offenheit schafft Vertrauen: Hier erklären wir klar und verständlich, wie unser Vergleichsportal Geld verdient – und warum Sie dabei keinen einzigen Cent draufzahlen.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8 space-y-8">
        {/* Highlight Promise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6">
            <Coins className="h-6 w-6 text-emerald-700 mb-3" />
            <h2 className="font-extrabold text-slate-900">0,00 € Mehrkosten</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Über unsere Partnerlinks zahlen Sie niemals mehr als beim Direktbesuch des Anbieters – oft sogar weniger dank Sonderaktionen.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50/60 p-6">
            <Scale className="h-6 w-6 text-blue-700 mb-3" />
            <h2 className="font-extrabold text-slate-900">Ehrliche Sortierung</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Sortieren Sie nach „Effektivpreis“, entscheidet allein die Mathematik – völlig unabhängig von einer Provisionshöhe.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <CheckCircle2 className="h-6 w-6 text-slate-800 mb-3" />
            <h2 className="font-extrabold text-slate-900">Werbefreies Erlebnis</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Dank Vermittlungsprovisionen verzichten wir auf blinkende Werbebanner, Pop-ups und den Verkauf von Nutzerdaten.
            </p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Wie funktionieren Affiliate-Links auf TarifPilot?
          </h2>
          <p>
            Die Pflege einer tagesaktuellen Tarifdatenbank, die Prüfung von Kleingedrucktem und der Betrieb eines kostenfreien Kundenservice erfordern kontinuierliche redaktionelle und technische Arbeit. Um TarifPilot dauerhaft kostenlos und ohne Registrierungszwang anbieten zu können, arbeiten wir mit großen Telekommunikationsanbietern und Partnernetzwerken im sogenannten Affiliate-Modell zusammen.
          </p>
          <p>
            Wenn Sie auf TarifPilot einen passenden Mobilfunk-, SIM-Only- oder Internettarif finden, auf <strong>„Zum Angebot“</strong> klicken und anschließend beim jeweiligen Anbieter einen wirksamen Vertrag abschließen, zahlt uns der Anbieter unter Umständen eine Vermittlungsvergütung aus seinem regulären Online-Marketingbudget.
          </p>

          <h3 className="text-xl font-extrabold text-slate-900 pt-2">
            Unsere 3 verbindlichen Redaktions-Garantien
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>
                <strong>Auch provisionsfreie Top-Deals werden gelistet:</strong> Wenn ein Tarif (etwa bestimmte App-Discounter-Angebote) für Verbraucher herausragend günstig ist, nehmen wir ihn unabhängig von einer Vergütung in unseren Vergleich auf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>
                <strong>Weitergabe von Vorteilen durch Cashback:</strong> Bei vielen Festnetz- und Smartphone-Tarifen geben wir einen erheblichen Teil der Vermittlungsprämie direkt als Cashback-Auszahlung oder exklusiven Online-Rabatt an Sie weiter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>
                <strong>Strikte Trennung von Redaktion &amp; Partnermanagement:</strong> Unser TarifPilot-Qualitätsindex bewertet Stärken UND Schwächen jedes Anbieters schonungslos offen.
              </span>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Haben Sie Fragen zu unserer Arbeitsweise? Wir stehen Ihnen jederzeit Rede und Antwort.
            </span>
            <Link
              to="/vergleich"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              <span>Zum unabhängigen Tarifvergleich</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
