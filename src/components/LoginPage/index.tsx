'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button, Card } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem('isLoggedIn', 'true');
    alert('로그인 성공!');
    router.push(ROUTES.HOME);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12"
      style={{ 
        backgroundColor: COLORS.sandBeige
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6"
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-3xl mb-2" style={{ color: COLORS.charcoalNavy }}>
            다시 오신 것을 환영해요
          </h1>
          <p style={{ color: COLORS.darkGray }}>
            로그인하고 이야기를 계속하세요
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl text-center mb-6" style={{ color: COLORS.charcoalNavy }}>
              로그인
            </h2>

            <div>
              <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: COLORS.sandBeige,
                  backgroundColor: COLORS.white,
                  color: COLORS.charcoalNavy,
                }}
              />
            </div>

            <div>
              <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: COLORS.sandBeige,
                  backgroundColor: COLORS.white,
                  color: COLORS.charcoalNavy,
                }}
              />
            </div>

            <Button type="submit" className="w-full">
              로그인
            </Button>

            <p className="text-center text-sm" style={{ color: COLORS.darkGray }}>
              계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => router.push(ROUTES.SIGNUP)}
                className="transition-colors hover:opacity-70"
                style={{ color: COLORS.apricotCoral }}
              >
                회원가입
              </button>
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}