import React, { useState } from 'react';
import { CheckCircle2, MapPin, Search, Sparkles } from 'lucide-react';

interface PostalCodeCheckerProps {
  onTechnologySelect?: (tech: string | null) => void;
}

interface AvailabilityResult {
  plz: string;
  regionLabel: string;
  vdslMax: number;
  cableAvailable: boolean;
  fiberAvailable: boolean;
}

const CITY_LOOKUP: Record<string, string> = {
  '10': 'Berlin',
  '12': 'Berlin-Süd',
  '20': 'Hamburg-Mitte',
  '22': 'Hamburg-Nord',
  '30': 'Hannover',
  '40': 'Düsseldorf',
  '44': 'Dortmund',
  '45': 'Essen',
  '50': 'Köln',
  '53': 'Bonn',
  '60': 'Frankfurt am Main',
  '70': 'Stuttgart',
  '80': 'München',
  '81': 'München-Ost',
  '90': 'Nürnberg',
  '01': 'Dresden',
  '04': 'Leipzig',
};

export const PostalCodeChecker: React.FC<PostalCodeCheckerProps> = ({ onTechnologySelect }) => {
  const [plz, setPlz] = useState('');
  const [street, setStreet] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<AvailabilityResult | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = plz.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setError('Bitte geben Sie eine gültige 5-stellige deutsche Postleitzahl ein (z. B. 10115 oder 80331).');
      return;
    }
    const num = Number(trimmed);
    if (num < 1001 || num > 99998) {
      setError('Diese Postleitzahl konnte keinem deutschen Anschlussgebiet zugeordnet werden.');
      return;
    }
    setError('');
    const prefix = trimmed.slice(0, 2);
    const regionLabel = CITY_LOOKUP[prefix] ?? `Anschlussgebiet ${trimmed}`;

    // Deterministic, realistic simulation based on PLZ digits
    const lastDigit = Number(trimmed[4]);
    const fiberAvailable = lastDigit % 2 === 0 || prefix === '10' || prefix === '80' || prefix === '20';
    const cableAvailable = lastDigit !== 9;

    setResult({
      plz: trimmed,
      regionLabel,
      vdslMax: 250,
      cableAvailable,
      fiberAvailable,
    });
  };

  return (
    <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-emerald-50/40 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
            <MapPin className="h-3.5 w-3.5" />
            <span>Kostenloser Verfügbarkeits-Vorcheck</span>
          </div>
          <h3 className="mt-2 text-lg sm:text-xl font-extrabold text-slate-900">
            Welche Internet-Technologie liegt an Ihrer Adresse an?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Prüfen Sie unverbindlich per Postleitzahl, ob VDSL 250, Gigabit-Kabel oder Glasfaser (FTTH) in Ihrem Ausbaugebiet verfügbar ist.
          </p>
        </div>

        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto">
          <div className="relative sm:w-36">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={plz}
              onChange={(e) => setPlz(e.target.value.replace(/\D/g, ''))}
              placeholder="PLZ (z.B. 10115)"
              aria-label="Postleitzahl"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 tabular-nums"
            />
          </div>
          <div className="relative sm:w-52">
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Straße & Nr. (optional)"
              aria-label="Straße und Hausnummer"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shrink-0"
          >
            <Search className="h-4 w-4" />
            <span>Prüfen</span>
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 border-t border-blue-100 pt-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>
                Ergebnis für {result.plz} ({result.regionLabel}
                {street ? `, ${street}` : ''}):
              </span>
            </div>
            {onTechnologySelect && (
              <button
                type="button"
                onClick={() => onTechnologySelect(null)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Alle Anschlussarten anzeigen
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onTechnologySelect?.('DSL / VDSL')}
              className="flex items-center justify-between rounded-xl border border-emerald-200 bg-white p-3 text-left hover:border-blue-500 transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verfügbar
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  DSL / VDSL Supervectoring
                </span>
                <span className="text-xs text-slate-500">Bis zu {result.vdslMax} Mbit/s</span>
              </div>
            </button>

            <button
              type="button"
              disabled={!result.cableAvailable}
              onClick={() => result.cableAvailable && onTechnologySelect?.('Kabel-Glasfaser')}
              className={`flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                result.cableAvailable
                  ? 'border-emerald-200 bg-white hover:border-blue-500'
                  : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold flex items-center gap-1 ${
                    result.cableAvailable ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {result.cableAvailable ? 'Gigabit verfügbar' : 'Eingeschränkt'}
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  Kabel-Glasfaser (DOCSIS 3.1)
                </span>
                <span className="text-xs text-slate-500">
                  {result.cableAvailable ? 'Bis zu 1.000 Mbit/s' : 'Regional prüfen'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onTechnologySelect?.('Glasfaser (FTTH)')}
              className="flex items-center justify-between rounded-xl border border-sky-200 bg-white p-3 text-left hover:border-blue-500 transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {result.fiberAvailable ? 'FTTH-Ausbau aktiv' : 'Vorvermarktung / Ausbau'}
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  Echte Glasfaser (FTTH)
                </span>
                <span className="text-xs text-slate-500">Bis zu 1.000 Mbit/s bis in die Wohnung</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
