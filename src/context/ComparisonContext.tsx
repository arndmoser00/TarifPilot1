import React, { createContext, useContext, useEffect, useState } from 'react';
import { TariffOffer } from '../types/tariff';
import { TARIFF_OFFERS } from '../data/tariffs';

export type PriceDisplayMode = 'effective' | 'monthly';

interface ComparisonContextValue {
  compareIds: string[];
  compareOffers: TariffOffer[];
  toggleCompare: (offerId: string) => { added: boolean; limitReached?: boolean };
  removeFromCompare: (offerId: string) => void;
  clearCompare: () => void;
  isCompared: (offerId: string) => boolean;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  savedIds: string[];
  toggleSaved: (offerId: string) => void;
  isSaved: (offerId: string) => boolean;
  priceMode: PriceDisplayMode;
  setPriceMode: (mode: PriceDisplayMode) => void;
}

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined);

const COMPARE_STORAGE_KEY = 'tarifpilot_compare_ids_v1';
const SAVED_STORAGE_KEY = 'tarifpilot_saved_ids_v1';

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]).slice(0, 3) : [];
    } catch {
      return [];
    }
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [priceMode, setPriceMode] = useState<PriceDisplayMode>('effective');

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [compareIds]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  const toggleCompare = (offerId: string) => {
    if (compareIds.includes(offerId)) {
      setCompareIds((prev) => prev.filter((id) => id !== offerId));
      return { added: false };
    }
    if (compareIds.length >= 3) {
      return { added: false, limitReached: true };
    }
    setCompareIds((prev) => [...prev, offerId]);
    return { added: true };
  };

  const removeFromCompare = (offerId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== offerId));
  };

  const clearCompare = () => {
    setCompareIds([]);
    setIsCompareModalOpen(false);
  };

  const isCompared = (offerId: string) => compareIds.includes(offerId);

  const toggleSaved = (offerId: string) => {
    setSavedIds((prev) =>
      prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]
    );
  };

  const isSaved = (offerId: string) => savedIds.includes(offerId);

  const compareOffers = compareIds
    .map((id) => TARIFF_OFFERS.find((o) => o.id === id))
    .filter((o): o is TariffOffer => Boolean(o));

  return (
    <ComparisonContext.Provider
      value={{
        compareIds,
        compareOffers,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        isCompareModalOpen,
        setIsCompareModalOpen,
        savedIds,
        toggleSaved,
        isSaved,
        priceMode,
        setPriceMode,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export function useComparison(): ComparisonContextValue {
  const ctx = useContext(ComparisonContext);
  if (!ctx) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return ctx;
}
