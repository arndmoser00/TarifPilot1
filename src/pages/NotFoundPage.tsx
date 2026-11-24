import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <SEOHead
        title="Seite nicht gefunden (404) | TarifPilot"
        description="Die angeforderte Seite konnte leider nicht gefunden werden. Starten Sie hier direkt in den aktuellen Tarifvergleich."
      />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        <Compass className="h-8 w-8" />
      </div>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-wider text-blue-600">
        Fehler 404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
        Diese Seite ist leider im Funkloch verschwunden.
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
        Die aufgerufene Adresse existiert nicht mehr oder wurde verschoben. Über unsere Startseite oder den Tarif-Rechner finden Sie sofort ans Ziel.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Zur Startseite</span>
        </Link>
        <Link
          to="/vergleich"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          <Search className="h-4 w-4 text-blue-600" />
          <span>Alle Tarife vergleichen</span>
        </Link>
      </div>
    </div>
  );
};
