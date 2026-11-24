import React from 'react';

interface LogoProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TarifPilotLogo: React.FC<{ className?: string; darkText?: boolean }> = ({
  className = '',
  darkText = true,
}) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 shadow-sm ring-1 ring-blue-500/20">
      <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          d="M9 15C15 9 25 9 31 15"
          stroke="#93C5FD"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M13.5 19.8C17.2 16.2 22.8 16.2 26.5 19.8"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path d="M20 22.5L27.5 31L20 28.5L12.5 31L20 22.5Z" fill="#34D399" />
        <circle cx="20" cy="23.5" r="2" fill="#FFFFFF" />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span
        className={`text-xl font-extrabold tracking-tight ${
          darkText ? 'text-slate-900' : 'text-white'
        }`}
      >
        Tarif<span className="text-blue-600">Pilot</span>
      </span>
      <span
        className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${
          darkText ? 'text-slate-500' : 'text-slate-400'
        }`}
      >
        Deutschland
      </span>
    </div>
  </div>
);

export const ProviderLogo: React.FC<LogoProps> = ({ slug, size = 'md', className = '' }) => {
  const dimensions =
    size === 'sm'
      ? 'h-9 w-24 text-xs'
      : size === 'lg'
      ? 'h-16 w-40 text-base'
      : 'h-12 w-32 text-sm';

  switch (slug) {
    case 'telekom':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-pink-200/80 bg-[#FDF2F8] px-3 font-extrabold text-[#E20074] ${dimensions} ${className}`}
          aria-label="Telekom"
        >
          <svg viewBox="0 0 28 28" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
            <path d="M5 5h18v5h-3V7.5h-4.2V21h3.2v2.5H9V21h3.2V7.5H8V10H5V5z" />
            <rect x="4.5" y="13" width="3.2" height="3.2" />
            <rect x="20.3" y="13" width="3.2" height="3.2" />
          </svg>
          <span className="tracking-tight">Telekom</span>
        </div>
      );

    case 'vodafone':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200/80 bg-[#FEF2F2] px-3 font-extrabold text-[#E60000] ${dimensions} ${className}`}
          aria-label="Vodafone"
        >
          <svg viewBox="0 0 28 28" className="h-5 w-5 shrink-0" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="#E60000" />
            <path
              d="M15.8 7.2c-3.9.6-6.8 3.9-6.8 7.9 0 3.3 2.3 5.7 5.3 5.7 2.8 0 4.9-2 4.9-4.7 0-2.4-1.8-4.2-4.1-4.2-.8 0-1.5.2-2 .6.5-2.2 2.2-3.9 4.5-4.4-.6-.5-1.1-.8-1.8-.9z"
              fill="#FFFFFF"
            />
          </svg>
          <span className="tracking-tight">Vodafone</span>
        </div>
      );

    case 'o2':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200/90 bg-[#EFF6FF] px-3 font-extrabold text-[#0019A5] ${dimensions} ${className}`}
          aria-label="o2 Telefónica"
        >
          <span className="text-xl font-black leading-none tracking-tighter">
            O<sub className="text-xs font-extrabold">2</sub>
          </span>
          <span className="text-xs font-bold text-blue-800/80">Telefónica</span>
        </div>
      );

    case '1und1':
      return (
        <div
          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-blue-300/80 bg-[#003D8F] px-3 font-black text-white shadow-xs ${dimensions} ${className}`}
          aria-label="1&1"
        >
          <span className="tracking-tight text-base">1&amp;1</span>
          <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-slate-950 leading-none">
            5G
          </span>
        </div>
      );

    case 'congstar':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 font-extrabold text-white ${dimensions} ${className}`}
          aria-label="congstar"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-400 fill-current" aria-hidden="true">
            <polygon points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6" />
          </svg>
          <span className="tracking-tight lowercase">congstar</span>
        </div>
      );

    case 'fraenk':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300/80 bg-emerald-950 px-3 font-black text-emerald-300 ${dimensions} ${className}`}
          aria-label="fraenk"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="tracking-tight lowercase text-white">fraenk</span>
        </div>
      );

    case 'klarmobil':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1 rounded-xl border border-orange-200 bg-[#FFF7ED] px-3 font-extrabold text-[#EA580C] ${dimensions} ${className}`}
          aria-label="klarmobil"
        >
          <span className="tracking-tight text-slate-900">klar</span>
          <span className="tracking-tight text-[#EA580C]">mobil</span>
        </div>
      );

    case 'deutsche-glasfaser':
      return (
        <div
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-[#F0F9FF] px-2.5 font-extrabold text-[#0284C7] ${dimensions} ${className}`}
          aria-label="Deutsche Glasfaser"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
            <circle cx="6" cy="18" r="2.5" fill="#0284C7" />
            <circle cx="18" cy="6" r="2.5" fill="#0EA5E9" />
            <circle cx="18" cy="18" r="2.5" fill="#38BDF8" />
            <path d="M6 18C6 10 11 6 18 6M6 18H18" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="leading-tight text-[11px] font-extrabold text-slate-900">
            Deutsche
            <br />
            <span className="text-[#0284C7]">Glasfaser</span>
          </span>
        </div>
      );

    default:
      return (
        <div
          className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-800 ${dimensions} ${className}`}
        >
          {slug}
        </div>
      );
  }
};
