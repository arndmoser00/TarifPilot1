import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, Mail, Phone, ShieldCheck } from 'lucide-react';
import { TarifPilotLogo } from './ProviderLogo';
import { PROVIDERS } from '../data/providers';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Trust Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Echte Effektivpreis-Transparenz</div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Wir rechnen Anschlussgebühren, Aktionsmonate, Wechselboni und Cashback ehrlich auf 24 Monate um.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">100 % kostenlos für Verbraucher</div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Kein Aufpreis gegenüber den Netzbetreibern – häufig profitieren Sie von exklusiven Online-Rabatten.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">DSGVO-konform &amp; unabhängig</div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Entwickelt für den deutschen Telekommunikationsmarkt nach aktuellen TKG-Verbraucherstandards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" aria-label="TarifPilot Startseite">
              <TarifPilotLogo darkText={false} />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              TarifPilot ist Ihre unabhängige Vergleichsplattform für Handytarife, SIM-Only-Deals, Glasfaser-, Kabel- und DSL-Anschlüsse sowie Unlimited-Datentarife in Deutschland.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>Kostenfreie Tarif-Info: 030 555 789 10 (Mo–Fr 09–18 Uhr)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>redaktion@tarifpilot-vergleich.de</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tarife vergleichen */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Tarif-Vergleiche
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/mobilfunk" className="text-slate-400 hover:text-white transition-colors">
                  Handytarife mit Smartphone
                </Link>
              </li>
              <li>
                <Link to="/sim-only" className="text-slate-400 hover:text-white transition-colors">
                  SIM-Only Allnet-Flats
                </Link>
              </li>
              <li>
                <Link to="/internet" className="text-slate-400 hover:text-white transition-colors">
                  DSL, Kabel &amp; Glasfaser
                </Link>
              </li>
              <li>
                <Link to="/unlimited" className="text-slate-400 hover:text-white transition-colors">
                  Unlimited Datentarife
                </Link>
              </li>
              <li>
                <Link to="/vergleich" className="text-slate-400 hover:text-white transition-colors">
                  Alle Tarife im Filter-Rechner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Anbieter */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Top-Anbieter
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PROVIDERS.map((prov) => (
                <li key={prov.id}>
                  <Link
                    to={`/anbieter/${prov.slug}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {prov.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Unternehmen & Rechtliches */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Service &amp; Rechtliches
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/ueber-uns" className="text-slate-400 hover:text-white transition-colors">
                  Über uns &amp; Impressum
                </Link>
              </li>
              <li>
                <Link to="/anbieter" className="text-slate-400 hover:text-white transition-colors">
                  Anbieter-Übersicht &amp; Netze
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-slate-400 hover:text-white transition-colors">
                  Kontakt &amp; Hilfe
                </Link>
              </li>
              <li>
                <Link to="/affiliate-hinweis" className="text-slate-400 hover:text-white transition-colors">
                  Affiliate-Hinweis
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-slate-400 hover:text-white transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-slate-400 hover:text-white transition-colors">
                  AGB &amp; Nutzungsbedingungen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} TarifPilot Digital GmbH, Berlin. Alle Preise in Euro inkl. gesetzlicher MwSt.
          </p>
          <p className="max-w-xl sm:text-right">
            * Hinweis: Bei Abschluss über gekennzeichnete Partnerlinks erhalten wir ggf. eine Vermittlungsprovision. Für Sie entstehen dadurch keinerlei Mehrkosten (
            <Link to="/affiliate-hinweis" className="text-slate-400 underline hover:text-white">
              Mehr erfahren
            </Link>
            ).
          </p>
        </div>
      </div>
    </footer>
  );
};
