import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Trash2, X } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { TARIFF_OFFERS } from '../data/tariffs';
import { ProviderLogo } from './ProviderLogo';
import { formatEuro } from '../utils/format';

interface SavedDealsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const SavedDealsDrawer: React.FC<SavedDealsDrawerProps> = ({ open, onClose }) => {
  const { savedIds, toggleSaved } = useComparison();

  if (!open) return null;

  const savedOffers = savedIds
    .map((id) => TARIFF_OFFERS.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
    >
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 id="saved-drawer-title" className="text-lg font-extrabold text-slate-900">
              Meine Merkliste ({savedOffers.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Merkliste schließen"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedOffers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
              <Bookmark className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-800">Noch keine Tarife gemerkt</p>
              <p className="mt-1 text-xs text-slate-500">
                Klicken Sie bei interessanten Angeboten auf „Merken“, um diese hier schnell wiederzufinden.
              </p>
              <Link
                to="/vergleich"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                <span>Tarife entdecken</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            savedOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-blue-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <ProviderLogo slug={offer.providerSlug} size="sm" />
                  <button
                    type="button"
                    onClick={() => toggleSaved(offer.id)}
                    aria-label="Entfernen"
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  to={`/tarif/${offer.slug}`}
                  onClick={onClose}
                  className="mt-2.5 block font-extrabold text-slate-900 hover:text-blue-700 text-sm"
                >
                  {offer.title}
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-600">
                    Effektiv:{' '}
                    <span className="font-extrabold text-slate-900 tabular-nums">
                      {formatEuro(offer.effectiveMonthlyPrice)} / M.
                    </span>
                  </div>
                  <Link
                    to={`/tarif/${offer.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>Zum Tarif</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
