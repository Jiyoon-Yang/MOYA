import { ReactNode } from 'react';
import { COLORS } from '../../constants';

interface LetterCardProps {
  to?: string;
  from?: string;
  children: ReactNode;
  className?: string;
}

export function LetterCard({ to, from, children, className = '' }: LetterCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 ${className}`}
      style={{
        backgroundColor: COLORS.sandBeige,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${COLORS.softTerra}30`,
      }}
    >
      {to && (
        <div className="mb-6 pb-4 border-b" style={{ borderColor: COLORS.softTerra + '30' }}>
          <p style={{ color: COLORS.charcoalNavy }}>
            받는 사람. <span className="ml-2">{to}</span>
          </p>
        </div>
      )}
      
      <div className="min-h-[200px] whitespace-pre-wrap" style={{ color: COLORS.charcoalNavy }}>
        {children}
      </div>

      {from && (
        <div className="mt-6 pt-4 border-t text-right" style={{ borderColor: COLORS.softTerra + '30' }}>
          <p style={{ color: COLORS.charcoalNavy }}>
            보낸 사람. <span className="ml-2">{from}</span>
          </p>
        </div>
      )}
    </div>
  );
}
