'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Button, LetterCard, LoadingModal } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';
import { Sparkles, User, Users, Copy, Edit } from 'lucide-react';

export function WriteLetterPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [writerType, setWriterType] = useState<'parent' | 'child' | null>(null);
  const [userText, setUserText] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [showMyaoLetterLoading, setShowMyaoLetterLoading] = useState(false);
  const [showCommunityLoading, setShowCommunityLoading] = useState(false);
  const [myaoLetter, setMyaoLetter] = useState('');
  const [showMyaoLetter, setShowMyaoLetter] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showReconciliationLoading, setShowReconciliationLoading] = useState(false);
  const [reconciliationLetter, setReconciliationLetter] = useState('');
  const [showReconciliationLetter, setShowReconciliationLetter] = useState(false);
  const [isEditingReconciliation, setIsEditingReconciliation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerateSummary = () => {
    // Mock AI summary generation
    const summary = `이 상황은 의사소통과 경계에 관한 갈등으로 보입니다. 당사자는 좌절감을 느끼거나 오해받는다고 느끼는 것 같으며, 신뢰와 안전에 대한 근본적인 우려가 있을 수 있습니다.`;
    setAiSummary(summary);
    setShowSummary(true);
    setIsEditingText(false);
  };

  const handleEditOriginal = () => {
    setIsEditingText(true);
    // Focus on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Scroll to textarea
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleGenerateMyaoLetter = () => {
    setShowMyaoLetter(true);
    setShowMyaoLetterLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const letter = `그 순간 얼마나 상처받고 좌절했을지 충분히 이해할 수 있어요. 그렇게 느끼는 게 완전히 당연해요.

내가 알려주고 싶은 건, 상대방 - 부모님이든 자녀든 - 도 아마 두렵고 걱정스러웠을 거예요. 때로는 누군가를 깊이 아낄 때, 그 두려움이 화나 엄격한 규칙으로 표현되기도 해요.

이게 당사의 감정이 중요하지 않다는 뜻은 아니에요. 두 분 모두 타당한 감정과 관점을 가지고 계세요. 중요한 건 서로를 이해할 수 있도록 돕는 방법을 찾는 거예요.

둘 다 침착할 때 이 편지를 공유하거나 대화를 시도해보는 건 어떨까요? 기억하세요, 이해한다는 건 모든 것에 동의한다는 뜻이 아니에요 - 다른 관점에서 볼 의향이 있다는 뜻이에요.

이해하려고 노력하는 용기를 내셨네요. 정말 아름다워요. 🧡`;

      setMyaoLetter(letter);
      setShowMyaoLetterLoading(false);
    }, 3000);
  };

  const handleSaveToStorage = () => {
    // Show save modal
    setShowSaveModal(true);
  };

  const handleSaveAndGoToMyPage = () => {
    // Mock save functionality
    setShowSaveModal(false);
    router.push(ROUTES.MY_PAGE);
  };

  const handleGenerateReconciliationLetter = () => {
    setShowSaveModal(false);
    setShowReconciliationLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const letter = `사랑하는 ${writerType === 'parent' ? '우리 자녀' : '부모님'}에게,

먼저 내 마음을 전하고 싶어요. 최근 우리 사이에 있었던 일들로 서로 마음이 많이 상했을 거라 생각해요.

${writerType === 'parent' 
  ? '부모로서 너를 걱정하는 마음이 때로는 너무 강하게 표현되���서 네가 숨막힐 수도 있었겠다는 생각이 들어. 내 의도는 항상 너를 보호하고 사랑하는 거였지만, 그 방법이 너에게 상처가 되었다면 정말 미안해.' 
  : '제가 때로는 이해받지 못한다고 느껴서 강하게 반응했을 수 있어요. 하지만 부모님의 걱정과 사랑을 이제는 조금 더 이해하게 되었어요. 저도 많이 미안해요.'}

우리 다시 대화할 수 있을까요? 서로의 입장에서 생각해보고, 더 나은 방법을 함께 찾아가고 싶어요.

당신을 사랑하고 존중해요.

${writerType === 'parent' ? '사랑하는 부모가' : '당신의 자녀가'}`;

      setReconciliationLetter(letter);
      setShowReconciliationLoading(false);
      setShowReconciliationLetter(true);
    }, 3000);
  };

  const handleCopyReconciliationLetter = () => {
    navigator.clipboard.writeText(reconciliationLetter);
    alert('편지가 클립보드에 복사되었습니다!');
  };

  const handleAskCommunity = () => {
    // Show loading with review message
    setShowCommunityLoading(true);
    
    // Simulate review process
    setTimeout(() => {
      setShowCommunityLoading(false);
      // Navigate to filtering page with data
      // Store data in localStorage for FilteringPage
      if (typeof window !== 'undefined') {
        localStorage.setItem('writeLetter_userText', userText);
        localStorage.setItem('writeLetter_aiSummary', aiSummary);
        localStorage.setItem('writeLetter_myaoLetter', myaoLetter);
      }
      router.push(ROUTES.FILTERING);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 relative" style={{
      backgroundColor: COLORS.sandBeige
    }}>
      {/* Decorative floating elements - increased opacity from 30% to 50% */}
      <div className="absolute top-20 left-10 text-6xl opacity-50 pointer-events-none">✉️</div>
      <div className="absolute top-40 right-20 text-5xl opacity-50 pointer-events-none">💌</div>
      <div className="absolute bottom-32 left-20 text-7xl opacity-50 pointer-events-none">🐱</div>
      <div className="absolute bottom-20 right-32 text-5xl opacity-50 pointer-events-none">✨</div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">✍️</div>
            <h1 className="text-4xl mb-3" style={{ color: COLORS.charcoalNavy }}>
              오늘 있었던 일을 적어주세요
            </h1>
            <p style={{ color: COLORS.darkGray }}>
              당신의 이야기를 들려주세요. 먀오가 서로를 이해할 수 있도록 도와드릴게요
            </p>
          </div>

          {/* Writer Type Selection */}
          {!writerType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-2xl text-center mb-8" style={{ color: COLORS.charcoalNavy }}>
                누가 편지를 쓰시나요?
              </h2>
              
              {/* Test Data Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => {
                    setWriterType('child');
                    handleLoadTestData();
                  }}
                  className="px-4 py-2 rounded-full text-sm transition-all hover:shadow-md"
                  style={{
                    backgroundColor: COLORS.sandBeige,
                    color: COLORS.charcoalNavy,
                    border: `1px solid ${COLORS.apricotCoral}`,
                  }}
                >
                  🧪 비속어 필터링 테스트 데이터 불러오기
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Parent Card */}
                <motion.button
                  onClick={() => setWriterType('parent')}
                  className="p-8 rounded-2xl border-2 transition-all hover:shadow-lg text-center"
                  style={{
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.sandBeige,
                  }}
                  whileHover={{ scale: 1.03, borderColor: COLORS.apricotCoral }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                  <h3 className="text-2xl mb-2" style={{ color: COLORS.charcoalNavy }}>
                    부모
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.darkGray }}>
                    자녀와의 갈등에 대해 이야기하고 싶어요
                  </p>
                </motion.button>

                {/* Child Card */}
                <motion.button
                  onClick={() => setWriterType('child')}
                  className="p-8 rounded-2xl border-2 transition-all hover:shadow-lg text-center"
                  style={{
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.sandBeige,
                  }}
                  whileHover={{ scale: 1.03, borderColor: COLORS.apricotCoral }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-6xl mb-4">🧑‍🎓</div>
                  <h3 className="text-2xl mb-2" style={{ color: COLORS.charcoalNavy }}>
                    자녀
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.darkGray }}>
                    부모님과의 갈등에 대해 이야기하고 싶어요
                  </p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Writing Section - Only show after writer type is selected */}
          {writerType && !showReconciliationLetter && (
            <div className={`grid gap-8 ${showMyaoLetter ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
              {/* Left Column: User Input + AI Summary */}
              <div className="flex flex-col" style={{ minHeight: showMyaoLetter ? '600px' : 'auto' }}>
                {/* Title for left section */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  <h3 style={{ color: COLORS.charcoalNavy }}>
                    당신의 이야기 ({writerType === 'parent' ? '부모' : '자녀'})
                  </h3>
                </div>

                <div 
                  className="flex-1 flex flex-col overflow-y-auto scrollbar-thin"
                  style={{
                    maxHeight: showMyaoLetter ? '600px' : 'none',
                  }}
                >
                  {/* User Text Input */}
                  <div className="mb-6">
                    <div className="relative">
                      <motion.textarea
                        ref={textareaRef}
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        onFocus={() => setIsEditingText(true)}
                        onBlur={() => setIsEditingText(false)}
                        placeholder="오늘, 이런 일이 있었는데 기분이..."
                        className="w-full min-h-[280px] p-6 pb-16 rounded-2xl border-2 resize-none focus:outline-none transition-all"
                        style={{
                          borderColor: isEditingText ? COLORS.apricotCoral : COLORS.sandBeige,
                          backgroundColor: COLORS.white,
                          color: COLORS.charcoalNavy,
                          boxShadow: isEditingText ? `0 0 0 3px ${COLORS.apricotCoral}20` : 'none',
                        }}
                        animate={{
                          borderColor: isEditingText ? COLORS.apricotCoral : COLORS.sandBeige,
                        }}
                      />
                      
                      {/* AI Summary Button Inside Textarea */}
                      {!showMyaoLetter && (
                        <button
                          onClick={handleGenerateSummary}
                          disabled={!userText.trim()}
                          className="absolute bottom-4 right-4 px-4 py-2 rounded-full flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md"
                          style={{
                            backgroundColor: userText.trim() ? COLORS.apricotCoral : COLORS.gray,
                            color: COLORS.white,
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {showSummary ? '다시 요약하기' : 'AI 요약하기'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* AI Summary Section */}
                  <AnimatePresence>
                    {showSummary && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div 
                          className="p-6 rounded-2xl border"
                          style={{
                            backgroundColor: 'rgba(255, 245, 238, 0.5)',
                            borderColor: COLORS.sandBeige,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5" style={{ color: COLORS.apricotCoral }} />
                            <h3 style={{ color: COLORS.charcoalNavy }}>AI 요약</h3>
                          </div>
                          <p className="mb-4" style={{ color: COLORS.charcoalNavy }}>
                            {aiSummary}
                          </p>
                          {!showMyaoLetter && (
                            <div className="flex gap-3 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleEditOriginal}
                              >
                                원문 수정하기
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleGenerateMyaoLetter}
                              >
                                먀오의 편지 받기
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Myao's Letter (appears when generated) */}
              <AnimatePresence>
                {showMyaoLetter && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl">🐱</span>
                      <h3 style={{ color: COLORS.charcoalNavy }}>
                        묘가 당신에게 편지를 썼어요
                      </h3>
                    </div>

                    <div
                      className="flex-1 overflow-y-auto scrollbar-thin rounded-2xl"
                      style={{
                        backgroundColor: COLORS.white,
                        border: `2px solid ${COLORS.sandBeige}`,
                        maxHeight: '600px',
                        minHeight: '600px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {showMyaoLetterLoading ? (
                        // Loading State
                        <div className="p-8 flex flex-col items-center justify-center h-full">
                          <motion.div
                            animate={{ 
                              rotate: [0, 10, -10, 10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-8xl mb-6"
                          >
                            🐱✍️
                          </motion.div>
                          
                          <p className="text-lg text-center mb-4" style={{ color: COLORS.charcoalNavy }}>
                            묘가 당신을 위해
                          </p>
                          <p className="text-lg text-center mb-6" style={{ color: COLORS.charcoalNavy }}>
                            편지를 쓰고 있어요
                          </p>
                          <p className="text-sm text-center" style={{ color: COLORS.darkGray }}>
                            잠시만 기다려주세요...
                          </p>
                          
                          <div className="flex gap-2 justify-center mt-6">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS.apricotCoral }}
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Myao's Letter - Letter Paper Style
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          className="h-full flex flex-col relative"
                          style={{
                            background: `
                              linear-gradient(to right, ${COLORS.sandBeige}40 1px, transparent 1px),
                              linear-gradient(${COLORS.white} 0%, ${COLORS.sandBeige}10 100%)
                            `,
                            backgroundSize: '100% 100%, 100% 100%',
                            backgroundPosition: '0 0, 0 0',
                          }}
                        >
                          {/* Letter Paper Lines */}
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: `repeating-linear-gradient(
                                transparent,
                                transparent 31px,
                                ${COLORS.sandBeige}40 31px,
                                ${COLORS.sandBeige}40 32px
                              )`,
                              backgroundPosition: '0 48px',
                            }}
                          />
                          
                          {/* Decorative Corner */}
                          <div 
                            className="absolute top-4 right-4 w-12 h-12 opacity-20"
                            style={{
                              background: `radial-gradient(circle, ${COLORS.apricotCoral} 0%, transparent 70%)`,
                            }}
                          />
                          
                          <div className="p-8 h-full flex flex-col relative z-10">
                            <div 
                              className="flex-1 overflow-y-auto scrollbar-thin pr-2"
                              style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: `${COLORS.sandBeige} transparent`,
                              }}
                            >
                              {/* Letter Header */}
                              <div className="mb-6 pb-4 border-b-2" style={{ borderColor: COLORS.sandBeige }}>
                                <p className="text-sm text-center" style={{ color: COLORS.darkGray }}>
                                  To. 당신에게
                                </p>
                              </div>
                              
                              {/* Letter Content */}
                              <div 
                                className="whitespace-pre-wrap leading-8"
                                style={{ 
                                  color: COLORS.charcoalNavy,
                                  fontFamily: 'inherit',
                                  letterSpacing: '0.01em',
                                }}
                              >
                                {myaoLetter}
                              </div>
                              
                              {/* Letter Footer */}
                              <div className="mt-8 pt-4 border-t-2" style={{ borderColor: COLORS.sandBeige }}>
                                <div className="flex items-center justify-end gap-2">
                                  <p className="text-sm" style={{ color: COLORS.darkGray }}>From. 묘</p>
                                  <span className="text-xl">🐱</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Reconciliation Letter Section */}
          {showReconciliationLetter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-6 text-center">
                <div className="text-5xl mb-4">💌</div>
                <h2 className="text-3xl mb-3" style={{ color: COLORS.charcoalNavy }}>
                  묘가 화해 편지를 작성했어요
                </h2>
                <p style={{ color: COLORS.darkGray }}>
                  상대방에게 전할 마음을 담았습니다
                </p>
              </div>

              <div
                className="p-8 rounded-2xl border-2 mb-6"
                style={{
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.apricotCoral,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                {isEditingReconciliation ? (
                  <textarea
                    value={reconciliationLetter}
                    onChange={(e) => setReconciliationLetter(e.target.value)}
                    className="w-full min-h-[400px] p-4 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: COLORS.sandBeige,
                      backgroundColor: COLORS.sandBeige + '20',
                      color: COLORS.charcoalNavy,
                    }}
                  />
                ) : (
                  <div 
                    className="whitespace-pre-wrap leading-8"
                    style={{ 
                      color: COLORS.charcoalNavy,
                      minHeight: '400px',
                    }}
                  >
                    {reconciliationLetter}
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setIsEditingReconciliation(!isEditingReconciliation)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditingReconciliation ? '수정 완료' : '수정하기'}
                </Button>
                <Button
                  onClick={handleCopyReconciliationLetter}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  복사하기
                </Button>
              </div>
            </motion.div>
          )}

          {/* Bottom Action Buttons */}
          <AnimatePresence>
            {showMyaoLetter && !showMyaoLetterLoading && !showReconciliationLetter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex gap-4 justify-center"
              >
                <Button
                  variant="secondary"
                  onClick={handleSaveToStorage}
                >
                  내 보관함에 저장
                </Button>
                <Button
                  onClick={handleAskCommunity}
                >
                  커뮤니티에 물어보기
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-md w-full p-8 rounded-3xl"
              style={{
                backgroundColor: COLORS.white,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💾</div>
                <p className="leading-relaxed" style={{ color: COLORS.charcoalNavy }}>
                  오늘의 당신 이야기가 <span style={{ color: COLORS.apricotCoral }}>'내 보관함'</span>에 저장되었습니다!
                  <br />
                  원하신다면 당신의 마음을 제가 상대방한테 전해드릴까용?
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSaveAndGoToMyPage}
                  className="w-full p-4 rounded-2xl transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: COLORS.sandBeige,
                    border: `2px solid ${COLORS.apricotCoral}`,
                  }}
                >
                  <p className="mb-1" style={{ color: COLORS.charcoalNavy }}>
                    아니 괜찮아!
                  </p>
                  <p className="text-xs" style={{ color: COLORS.darkGray }}>
                    내 보관함으로 이동
                  </p>
                </button>

                <button
                  onClick={handleGenerateReconciliationLetter}
                  className="w-full p-4 rounded-2xl transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: COLORS.apricotCoral,
                    color: COLORS.white,
                  }}
                >
                  <p className="mb-1">
                    응 작성해줘!
                  </p>
                  <p className="text-xs opacity-90">
                    내 마음 전하러 가기
                  </p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reconciliation Loading Modal */}
      <AnimatePresence>
        {showReconciliationLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full p-12 rounded-3xl text-center"
              style={{
                backgroundColor: COLORS.white,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-6"
              >
                🐱✍️
              </motion.div>
              
              <p className="text-lg mb-6 leading-relaxed" style={{ color: COLORS.charcoalNavy }}>
                '묘'가 상대에게 전할 마음을<br />당신의 마음을 대신해서 작성하고 있어요.
              </p>
              
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.apricotCoral }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community Review Loading */}
      <AnimatePresence>
        {showCommunityLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full p-12 rounded-3xl text-center"
              style={{
                backgroundColor: COLORS.white,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="text-6xl mb-6"
              >
                🔍
              </motion.div>
              
              <p className="text-lg mb-4 leading-relaxed" style={{ color: COLORS.charcoalNavy }}>
                커뮤니티에 올리기 전 '묘'가<br />올리기 적절한지 내용을 검토하고 있어요.
              </p>
              
              <p className="text-sm mb-6" style={{ color: COLORS.darkGray }}>
                커뮤니티에 업로드한 글은<br />내 보관함에도 자동 저장돼요.
              </p>
              
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.apricotCoral }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Test data function
  function handleLoadTestData() {
    const testText = `오늘 정말 짜증나는 일이 있었어요. 엄마가 제 방을 허락도 없이 들어와서 짜증났어요. 

제가 친구들이랑 약속이 있다고 말했는데도 "넌 바보처럼 항상 친구들한테만 신경 쓴다"고 하셨어요. 정말 화나고 속상했어요. 

저는 엄마를 싫어하는 게 아니라 제 프라이버시를 존중해달라는 거예요. 왜 이해를 못 하시는지 답답해서 죽겠어요.

제 말을 들어주시지 않고 항상 엄마 마음대로만 하시니까 열받아요.`;
    
    setUserText(testText);
    setIsEditingText(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }
}