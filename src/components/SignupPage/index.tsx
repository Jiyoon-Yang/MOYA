'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button, Card } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';

export function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSendVerification = () => {
    // Mock phone verification
    alert('인증번호가 전송되었습니다!');
  };

  const handleVerify = () => {
    // Mock verification
    setIsVerified(true);
    alert('본인인증이 완료되었습니다!');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert('본인인증을 완료해주세요.');
      return;
    }
    // Mock signup
    localStorage.setItem('isLoggedIn', 'true');
    alert('회원가입이 완료되었습니다!');
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
            MOYA에 가입하기
          </h1>
          <p style={{ color: COLORS.darkGray }}>
            우리 가족이 되어서 더 많은 이야기를 나눠봐요
          </p>
        </div>

        <Card>
          <form onSubmit={handleSignup} className="space-y-6">
            <h2 className="text-2xl text-center mb-6" style={{ color: COLORS.charcoalNavy }}>
              계정 만들기
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  생년월일
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: COLORS.sandBeige,
                    backgroundColor: COLORS.white,
                    color: COLORS.charcoalNavy,
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                휴대전화번호
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="010-0000-0000"
                  className="flex-1 p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: COLORS.sandBeige,
                    backgroundColor: COLORS.white,
                    color: COLORS.charcoalNavy,
                  }}
                />
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={!phone || isVerified}
                  className="px-4 py-3 rounded-xl transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: isVerified ? COLORS.sageGreen : COLORS.apricotCoral,
                    color: COLORS.white,
                  }}
                >
                  {isVerified ? '인증완료' : '인증'}
                </button>
              </div>
            </div>

            {phone && !isVerified && (
              <div>
                <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                  인증번호
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증번호 6자리"
                    className="flex-1 p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                    style={{
                      borderColor: COLORS.sandBeige,
                      backgroundColor: COLORS.white,
                      color: COLORS.charcoalNavy,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={!verificationCode}
                    className="px-4 py-3 rounded-xl transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: COLORS.apricotCoral,
                      color: COLORS.white,
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>
            )}

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
              계정 만들기
            </Button>

            <p className="text-center text-sm" style={{ color: COLORS.darkGray }}>
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => router.push(ROUTES.LOGIN)}
                className="transition-colors hover:opacity-70"
                style={{ color: COLORS.apricotCoral }}
              >
                로그인
              </button>
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}