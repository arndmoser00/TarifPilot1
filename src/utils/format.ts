/**
 * Formats a number as German Euro currency (e.g. 19,99 €)
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Splits a Euro amount into integer and decimal parts for editorial price typography
 * e.g. 19.99 -> { whole: "19", cents: "99" }
 */
export function splitEuroParts(amount: number): { whole: string; cents: string; isNegative: boolean } {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const fixed = abs.toFixed(2);
  const [whole, cents] = fixed.split('.');
  const formattedWhole = Number(whole).toLocaleString('de-DE');
  return {
    whole: formattedWhole,
    cents,
    isNegative,
  };
}

/**
 * Formats speed in Mbit/s or Gbit/s cleanly for German telco standards
 */
export function formatSpeed(mbps: number): string {
  if (mbps >= 1000) {
    return `${(mbps / 1000).toLocaleString('de-DE')} Gbit/s (${mbps.toLocaleString('de-DE')} Mbit/s)`;
  }
  return `${mbps.toLocaleString('de-DE')} Mbit/s`;
}

export function formatSpeedCompact(mbps: number): string {
  return `${mbps.toLocaleString('de-DE')} Mbit/s`;
}

export function formatDataVolume(data: number | 'unlimited', category?: string): string {
  if (category === 'broadband') {
    return 'Internet-Flatrate';
  }
  if (data === 'unlimited') {
    return 'Unbegrenzt';
  }
  return `${data.toLocaleString('de-DE')} GB`;
}

/**
 * Calculates total 24-month cost (or 24-month equivalent for 1-month plans) for full transparency
 */
export function calculate24MonthBreakdown(offer: {
  monthlyPrice: number;
  promoMonthlyPrice?: number;
  promoMonths?: number;
  oneTimeSetupFee: number;
  shippingFee: number;
  hardwareOneTimePrice?: number;
  hardwareRetailValue?: number;
  switchingBonus: number;
  cashback: number;
}) {
  const promoMonths = offer.promoMonths ?? 0;
  const promoRate = offer.promoMonthlyPrice ?? offer.monthlyPrice;
  const regularMonths = 24 - promoMonths;

  const promoTotal = promoMonths * promoRate;
  const regularTotal = regularMonths * offer.monthlyPrice;
  const oneTimeTotal =
    offer.oneTimeSetupFee + offer.shippingFee + (offer.hardwareOneTimePrice ?? 0);
  const bonusTotal = offer.switchingBonus + offer.cashback;

  const grossTotal24M = promoTotal + regularTotal + oneTimeTotal;
  const netTotal24M = grossTotal24M - bonusTotal;
  const avgMonthlyWithoutHardwareCredit = netTotal24M / 24;
  const netAfterHardwareValue = netTotal24M - (offer.hardwareRetailValue ?? 0);
  const effectiveMonthlyWithHardware = netAfterHardwareValue / 24;

  return {
    promoMonths,
    promoRate,
    promoTotal,
    regularMonths,
    regularTotal,
    oneTimeTotal,
    bonusTotal,
    grossTotal24M,
    netTotal24M,
    avgMonthlyWithoutHardwareCredit,
    netAfterHardwareValue,
    effectiveMonthlyWithHardware,
  };
}
