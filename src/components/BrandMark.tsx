import React from 'react';

interface BrandMarkProps {
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ compact = false }) => {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width={compact ? 22 : 26}
        height={compact ? 22 : 26}
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="7" y="4" width="14" height="20" rx="7" fill="#F5EFE6" stroke="#111111" strokeWidth="1.5" />
        <line x1="8.5" y1="10.5" x2="19.5" y2="6.5" stroke="#111111" strokeWidth="1.6" />
        <line x1="7.5" y1="15.5" x2="20.5" y2="11" stroke="#9E825C" strokeWidth="1.7" />
        <line x1="8.5" y1="20.5" x2="19.5" y2="16.5" stroke="#111111" strokeWidth="1.6" />
        <rect x="9.5" y="1.5" width="9" height="2.2" rx="1" fill="#111111" />
        <rect x="9.5" y="24.3" width="9" height="2.2" rx="1" fill="#111111" />
      </svg>
      <span className="font-display text-sm sm:text-base font-semibold tracking-[0.06em] text-[#111111]">
        NOTORIOUS BARBER ACADEMY
      </span>
    </span>
  );
};
