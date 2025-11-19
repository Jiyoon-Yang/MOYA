'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, COLORS } from '../constants';

export function Header() {
  const router = useRouter();

  const checkLogin = () => {
    if (typeof window === 'undefined') return false;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      router.push(ROUTES.LOGIN);
      return false;
    }
    return true;
  };

  const handleProtectedNavigation = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    if (checkLogin()) {
      router.push(route);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Main Navigation */}
          <div className="flex items-center gap-8">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.apricotCoral }}
              >
                <span className="text-white">🐱</span>
              </div>
              <span 
                className="tracking-wide"
                style={{ color: COLORS.charcoalNavy }}
              >
                MOYA
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link 
                href={ROUTES.WRITE_LETTER}
                onClick={(e) => handleProtectedNavigation(e, ROUTES.WRITE_LETTER)}
                className="transition-colors hover:opacity-70"
                style={{ color: COLORS.charcoalNavy }}
              >
                편지 쓰기
              </Link>
              <Link 
                href={ROUTES.ARCHIVE_LIST}
                className="transition-colors hover:opacity-70"
                style={{ color: COLORS.charcoalNavy }}
              >
                공감 아카이브
              </Link>
              <Link 
                href={ROUTES.MY_PAGE}
                onClick={(e) => handleProtectedNavigation(e, ROUTES.MY_PAGE)}
                className="transition-colors hover:opacity-70"
                style={{ color: COLORS.charcoalNavy }}
              >
                마이 페이지
              </Link>
            </nav>
          </div>

          {/* Right: Login + Signup */}
          <div className="flex items-center gap-3">
            <Link 
              href={ROUTES.LOGIN}
              className="px-6 py-2 rounded-full transition-all hover:shadow-lg border-2"
              style={{ 
                backgroundColor: COLORS.white,
                borderColor: COLORS.apricotCoral,
                color: COLORS.apricotCoral
              }}
            >
              로그인
            </Link>
            <Link 
              href={ROUTES.SIGNUP}
              className="px-6 py-2 rounded-full transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: COLORS.apricotCoral,
                color: COLORS.white 
              }}
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}