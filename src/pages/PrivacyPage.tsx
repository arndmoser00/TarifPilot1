import React from 'react';
import { Lock } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pb-20">
      <SEOHead
        title="Datenschutzerklärung (DSGVO) | TarifPilot"
        description="Informationen zum Datenschutz gemäß DSGVO und TDDDG bei der Nutzung der Telekommunikations-Vergleichsplattform TarifPilot."
      />

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
            <Lock className="h-3.5 w-3.5" />
            <span>Stand: November 2026 • DSGVO-konform</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Datenschutzerklärung
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Der Schutz Ihrer personenbezogenen Daten hat für die TarifPilot Digital GmbH höchste Priorität.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              1. Verantwortlicher im Sinne der DSGVO
            </h2>
            <p>
              Verantwortlicher für die Datenverarbeitung auf dieser Website ist die:
              <br />
              <strong>TarifPilot Digital GmbH</strong>, Friedrichstraße 114a, 10117 Berlin, Deutschland
              <br />
              E-Mail: datenschutz@tarifpilot-vergleich.de • Telefon: +49 (0) 30 555 789 10
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              2. Grundsätze der Datensparsamkeit beim Tarifvergleich
            </h2>
            <p>
              Sie können sämtliche Tarifvergleiche, Effektivpreis-Rechner und Filterfunktionen auf TarifPilot vollständig anonym nutzen, ohne Name, Anschrift oder E-Mail-Adresse eingeben zu müssen. Bei Nutzung unseres optionalen Postleitzahlen-Verfügbarkeitschecks wird die eingegebene 5-stellige PLZ ausschließlich lokal in Ihrem Browser ausgewertet, um passende Anschlusstechnologien anzuzeigen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              3. Server-Log-Dateien &amp; Bereitstellung der Website
            </h2>
            <p>
              Beim Aufruf unserer Webseite übermittelt Ihr Endgerät technisch notwendige Verbindungsdaten (IP-Adresse in gekürzter/anonymisierter Form, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und stabilen Auslieferung des Online-Angebots).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              4. Lokale Speicherung (Merkliste &amp; Direktvergleich)
            </h2>
            <p>
              Damit Ihre persönliche Tarif-Merkliste sowie ausgewählte Tarife im Direktvergleich beim Seitenwechsel erhalten bleiben, nutzt TarifPilot den lokalen Browser-Speicher (<code>localStorage</code>) Ihres Endgeräts. Hierbei werden lediglich unpersönliche Tarif-Kennungen (z. B. <code>sim-1</code>) gespeichert; eine Übermittlung an Dritte oder Werbenetzwerke findet nicht statt (technisch erforderlich gemäß § 25 Abs. 2 Nr. 2 TDDDG).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              5. Weiterleitung zu Telekommunikationsanbietern (Partnerlinks)
            </h2>
            <p>
              Entscheiden Sie sich aktiv durch Klick auf „Zum Anbieter“ für die Weiterleitung auf die Antragsstrecke eines Telekommunikationsunternehmens (z. B. Telekom, Vodafone, o2, 1&amp;1, congstar, fraenk, klarmobil oder Deutsche Glasfaser), wird eine pseudonymisierte Partner-Kennung übergeben, um eine korrekte Zuordnung eventueller Cashback-Vorteile oder Vermittlungsprovisionen zu ermöglichen (Art. 6 Abs. 1 lit. b und f DSGVO). Für die anschließende Vertragsabwicklung gilt die Datenschutzerklärung des jeweiligen Netzanbieters.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              6. Kontaktformular &amp; E-Mail-Anfragen
            </h2>
            <p>
              Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben ausschließlich zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO). Nach abschließender Klärung werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              7. Ihre Rechte als betroffene Person
            </h2>
            <p>
              Ihnen stehen gegenüber uns jederzeit folgende gesetzliche Rechte zu: Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde (z. B. Berliner Beauftragte für Datenschutz und Informationsfreiheit).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
