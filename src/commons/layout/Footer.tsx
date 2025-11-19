import { COLORS } from '../constants';

export function Footer() {
  return (
    <footer 
      className="mt-24 py-12 border-t"
      style={{ 
        backgroundColor: COLORS.sandBeige,
        borderColor: COLORS.softTerra + '20'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.apricotCoral }}
              >
                <span className="text-white text-sm">🐱</span>
              </div>
              <span 
                className="tracking-wide"
                style={{ color: COLORS.charcoalNavy }}
              >
                MOYA
              </span>
            </div>
            <p className="text-sm" style={{ color: COLORS.darkGray }}>
              갈등을 이해로 바꾸는 AI 편지 서비스
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              소개
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              개인정보처리방침
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              이용약관
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              문의하기
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t" style={{ borderColor: COLORS.softTerra + '20' }}>
          <p className="text-xs text-center" style={{ color: COLORS.gray }}>
            © 2025 MOYA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}