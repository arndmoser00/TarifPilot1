import React from 'react';
import { FileText } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <div className="pb-20">
      <SEOHead
        title="AGB & Nutzungsbedingungen | TarifPilot"
        description="Allgemeine Nutzungsbedingungen für das kostenlose deutsche Telekommunikations-Vergleichsportal TarifPilot."
      />

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
            <FileText className="h-3.5 w-3.5" />
            <span>Nutzungsbedingungen • Stand November 2026</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Allgemeine Geschäfts- und Nutzungsbedingungen (AGB)
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Rechtlicher Rahmen für die Nutzung der Vergleichsrechner und Tarifinformationen von TarifPilot.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">§ 1 Geltungsbereich &amp; Leistungsbeschreibung</h2>
            <p>
              (1) Die TarifPilot Digital GmbH („TarifPilot“) stellt unter dieser Plattform unentgeltliche Vergleichs- und Informationsdienste rund um Mobilfunktarife, SIM-Only-Angebote, Internetanschlüsse (DSL, Kabel, Glasfaser) sowie Datentarife auf dem deutschen Markt bereit.
            </p>
            <p>
              (2) Die Nutzung sämtlicher Such-, Filter- und Vergleichsfunktionen ist für Verbraucherinnen und Verbraucher kostenlos und unverbindlich.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              § 2 Stellung von TarifPilot &amp; Vertragsschluss mit Anbietern
            </h2>
            <p>
              (1) TarifPilot ist selbst kein Telekommunikationsnetzbetreiber und erbringt keine eigenen Mobilfunk- oder Internetzugangsdienste im Sinne des Telekommunikationsgesetzes (TKG).
            </p>
            <p>
              (2) Ein Telekommunikationsvertrag kommt ausschließlich direkt zwischen Ihnen als Kundin bzw. Kunde und dem jeweils ausgewählten Telekommunikationsanbieter auf dessen Buchungsseite und zu dessen Allgemeinen Geschäftsbedingungen sowie Produktinformationsblättern zustande.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              § 3 Aktualität von Tarifdaten &amp; Effektivpreis-Berechnung
            </h2>
            <p>
              (1) Unsere Redaktion prüft und aktualisiert Preise, Aktionszeiträume, Wechselboni und Hardware-Zuzahlungen fortlaufend nach bestem Wissen. Da Telekommunikationsanbieter Aktionskonditionen jedoch kurzfristig anpassen können, sind stets die finalen Angaben und das gesetzliche Produktinformationsblatt auf der Webseite des jeweiligen Anbieters zum Zeitpunkt der Bestellung maßgeblich.
            </p>
            <p>
              (2) Die Darstellung des „Effektivpreises“ dient der rechnerischen Vergleichbarkeit über 24 Monate. Etwaige Rufnummernmitnahme-Boni oder Cashback-Gutschriften setzen voraus, dass die hierfür vom Anbieter genannten Bedingungen (z. B. erfolgreiche Portierung oder fristgerechte Einreichung der ersten Rechnung) erfüllt werden.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">§ 4 Urheberrecht &amp; zulässige Nutzung</h2>
            <p>
              Alle auf TarifPilot veröffentlichten Texte, Tarifanalysen, Berechnungsmodelle und Grafiken unterliegen dem deutschen Urheberrecht. Das automatisierte Auslesen (Scraping) von Tarifdaten zu kommerziellen Zwecken bedarf unserer vorherigen schriftlichen Zustimmung.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">§ 5 Haftungsbeschränkung &amp; Anwendbares Recht</h2>
            <p>
              TarifPilot haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung für unentgeltlich bereitgestellte Marktinformationen auf gesetzlich zwingende Fälle beschränkt. Es gilt das Recht der Bundesrepublik Deutschland.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
