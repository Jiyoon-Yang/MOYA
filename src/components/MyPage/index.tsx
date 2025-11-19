'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, LetterCard } from '../../commons/components';
import { COLORS } from '../../commons/constants';
import { Heart, FileText, MessageCircle, Settings, TrendingUp, Mail, Bookmark, ArrowLeft, Copy, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type Tab = 'written' | 'myReplies' | 'likedReplies' | 'stored';

const MOCK_STORED_LETTERS = [
  {
    id: 1,
    title: '통금에 대한 묘의 편지',
    date: '2025-11-10',
    preview: '얼마나 무섭고 걱정되었을지 알 수 있어요...',
  },
  {
    id: 2,
    title: '내 분노를 이해하며',
    date: '2025-11-08',
    preview: '때로는 우리의 가장 강한 반응이 가장 깊은 감정에서 나와요...',
  },
];

const MOCK_WRITTEN_POSTS = [
  {
    id: 1,
    title: '통금이 전쟁터가 되었을 때',
    date: '2025-11-10',
    likes: 89,
    comments: 23,
    userText: `어젯밤, 딸이 통금 시간보다 2시간이나 늦게 들어왔어요. 저는 너무 걱정이 되어서 미칠 것 같았고, 딸이 들어오자마자 완전히 화를 냈어요. 하지 말았어야 할 말들을 했죠.

딸은 친구가 도움이 필요해서 시간 가는 줄 몰랐다고 설명하려 했지만, 저는 너무 화가 나서 들을 수가 없었어요. 한 달 동안 외출 금지를 시켰어요.

이제 마음이 너무 안 좋아요. 과하게 반응한 걸 알아요. 하지만 딸에게 무슨 일이 생긴 건 아닐까 너무 무서웠어요.`,
    aiSummary: `이 상황은 부모의 걱정과 자녀의 자율성 사이의 갈등을 보여줍니다. 부모는 자녀의 안전에 대한 깊은 우려로 인해 강하게 반응했으며, 자녀는 친구를 돕기 위한 선의의 행동이 오해받았다고 느낍니다.`,
    myaoLetter: `딸이 정해진 시간에 집에 오지 않았을 때 얼마나 무섭고 걱정되었을지 알 수 있어요. 자녀의 안전에 대한 두려움은 부모가 느낄 수 있는 가장 강력한 감정 중 하나예요.

아름다운 건, 당신이 자신의 반응이 사랑과 걱정에서 비롯되었다는 걸 인식하고 있다는 거예요. 딸은 그 순간에는 그렇게 생각하지 못했을 수도 있지만, 마음 깊은 곳에서는 당신이 아낀다는 걸 알고 있을 거예요.

도움이 될 만한 방법: 둘 다 준비가 되었을 때 차분하게 대화를 나눠보세요. 특정 경계선은 유지하면서도, 딸의 관점을 들을 의향이 있다는 걸 알려주세요. 때로는 10대들도 단지 우리가 그들의 이야기를 들어줄 준비가 되어 있다는 걸 알아야 해요.

당신은 최선을 다하려는 배려 깊은 부모예요. 우리 모두가 할 수 있는 건 그게 전부예요. 🧡`,
    author: 'parent',
  },
];

const MOCK_MY_REPLIES = [
  {
    id: 1,
    postTitle: '우리를 변화시킨 휴대폰 논쟁',
    date: '2025-11-12',
    preview: '저도 아이와 비슷한 경험을 했어요...',
    likes: 45,
  },
  {
    id: 2,
    postTitle: '상처 주는 말을 한 이유',
    date: '2025-11-11',
    preview: '이런 걸 되돌아본다는 것 자체가 좋은 부모라는 증거예요...',
    likes: 67,
  },
];

const MOCK_LIKED_REPLIES = [
  {
    id: 1,
    postTitle: '부모님의 엄격함을 이해하며',
    date: '2025-11-13',
    preview: '10대로서 말씀드리고 싶은 건, 저희도 걱정 끼치려는 의도는 없어요...',
    author: '이지수 (17)',
  },
  {
    id: 2,
    postTitle: '식탁 위의 침묵',
    date: '2025-11-09',
    preview: '함께 앉아서 둘 다 동의할 수 있는 규칙을 만들어보는 건 어떨까요?',
    author: '박민호',
  },
];

export function MyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('written');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof MOCK_WRITTEN_POSTS[0] | null>(null);
  const [showAISummary, setShowAISummary] = useState(false);
  const [showReconciliationLoading, setShowReconciliationLoading] = useState(false);
  const [reconciliationLetter, setReconciliationLetter] = useState('');
  const [showReconciliationLetter, setShowReconciliationLetter] = useState(false);
  const [isEditingReconciliation, setIsEditingReconciliation] = useState(false);

  const tabs = [
    { key: 'written' as Tab, label: '내 편지', icon: Mail },
    { key: 'myReplies' as Tab, label: '내가 쓴 답장', icon: MessageCircle },
    { key: 'likedReplies' as Tab, label: '내가 공감한 댓글', icon: Heart },
    { key: 'stored' as Tab, label: '저장한 편지', icon: Bookmark },
  ];

  const handleRequestReconciliationLetter = () => {
    setShowReconciliationLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const letter = `사랑하는 우리 딸에게,

먼저 내 마음을 전하고 싶어요. 최근 우리 사이에 있었던 일들로 서로 마음이 많이 상했을 거라 생각해요.

부모로서 너를 걱정하는 마음이 때로는 너무 강하게 표현되어서 네가 숨막힐 수도 있었겠다는 생각이 들어. 내 의도는 항상 너를 보호하고 사랑하는 거였지만, 그 방법이 너에게 상처가 되었다면 정말 미안해.

우리 다시 대화할 수 있을까? 서로의 입장에서 생각해보고, 더 나은 방법을 함께 찾아가고 싶어요.

당신을 사랑하고 존중해요.

사랑하는 부모가`;

      setReconciliationLetter(letter);
      setShowReconciliationLoading(false);
      setShowReconciliationLetter(true);
    }, 3000);
  };

  const handleCopyReconciliationLetter = () => {
    navigator.clipboard.writeText(reconciliationLetter);
    alert('편지가 클립보드에 복사되었습니다!');
  };

  const handleCopy = () => {
    if (selectedPost) {
      navigator.clipboard.writeText(selectedPost.myaoLetter);
      alert('편지가 클립보드에 복사되었습니다!');
    }
  };

  // If showing reconciliation letter
  if (showReconciliationLetter && selectedPost) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: COLORS.sandBeige }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setShowReconciliationLetter(false)}
              className="flex items-center gap-2 mb-6 transition-all hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              <ArrowLeft className="w-5 h-5" />
              돌아가기
            </button>

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
        </div>
      </div>
    );
  }

  // If viewing a specific post detail
  if (selectedPost) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: COLORS.sandBeige }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setSelectedPost(null);
                setShowAISummary(false);
              }}
              className="flex items-center gap-2 mb-6 transition-all hover:opacity-70"
              style={{ color: COLORS.charcoalNavy }}
            >
              <ArrowLeft className="w-5 h-5" />
              내 편지 목록으로
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <span 
                className="inline-block text-sm px-4 py-2 rounded-full mb-4"
                style={{
                  backgroundColor: selectedPost.author === 'parent' ? COLORS.softTerra + '30' : COLORS.sageGreen + '30',
                  color: selectedPost.author === 'parent' ? COLORS.softTerra : COLORS.sageGreen,
                }}
              >
                {selectedPost.author === 'parent' ? '👨‍👩‍👧 From a Parent' : '👦 From a Child'}
              </span>
              <h1 className="text-4xl mb-4" style={{ color: COLORS.charcoalNavy }}>
                {selectedPost.title}
              </h1>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left: Original Story */}
              <div className="flex flex-col" style={{ minHeight: '600px' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: COLORS.charcoalNavy }}>
                    너의 생각은 모야
                  </h3>
                  <button
                    onClick={() => setShowAISummary(!showAISummary)}
                    className="text-xs flex items-center gap-1 transition-all hover:opacity-70"
                    style={{ color: COLORS.apricotCoral }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    AI 요약보기
                  </button>
                </div>
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showAISummary ? 'summary' : 'original'}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <LetterCard>
                        {showAISummary ? (
                          <div>
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: COLORS.softTerra + '30' }}>
                              <span className="text-xl">🤖</span>
                              <span style={{ color: COLORS.apricotCoral }}>
                                AI 요약
                              </span>
                            </div>
                            {selectedPost.aiSummary}
                          </div>
                        ) : (
                          selectedPost.userText
                        )}
                      </LetterCard>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Myao's Letter */}
              <div className="flex flex-col" style={{ minHeight: '600px' }}>
                <h3 className="mb-4" style={{ color: COLORS.charcoalNavy }}>
                  묘가 쓴 편지
                </h3>

                <div className="flex-1">
                  <div
                    className="p-6 rounded-2xl h-full relative overflow-hidden"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `2px solid ${COLORS.apricotCoral}`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {/* Background Pattern for Myao's Letter (cat theme) */}
                    <div 
                      className="absolute inset-0 opacity-5 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20 Q25 15 20 20 Q15 25 20 30 Q25 35 30 30 Q35 35 40 30 Q45 25 40 20 Q35 15 30 20' fill='%23FF9B7D' opacity='0.3'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px',
                      }}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: COLORS.softTerra + '30' }}>
                        <span className="text-2xl">🐱</span>
                        <span style={{ color: COLORS.apricotCoral }}>
                          묘가 쓴 편지
                        </span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 relative">
                        <div className="whitespace-pre-wrap leading-relaxed" style={{ color: COLORS.charcoalNavy }}>
                          {selectedPost.myaoLetter}
                        </div>
                        
                        <button
                          onClick={handleCopy}
                          className="absolute bottom-2 right-2 p-2 transition-all hover:scale-110 rounded-lg"
                          style={{ 
                            color: COLORS.darkGray,
                            backgroundColor: COLORS.sandBeige + '50',
                          }}
                          title="Copy Letter"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button - Different from Archive */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleRequestReconciliationLetter}
              >
                '묘'한테 상대한테 내 마음을 담은 편지 써달라고 하기
              </Button>
            </div>
          </motion.div>
        </div>

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
      </div>
    );
  }

  // Default MyPage view with tabs
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: COLORS.sandBeige }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Card */}
          <Card className="mb-6">
            <div className="flex items-start gap-6">
              {/* Stats - Now on Left */}
              <div className="flex-1">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: COLORS.apricotCoral }} />
                    <div>
                      <p className="text-sm" style={{ color: COLORS.apricotCoral }}>1250</p>
                      <p className="text-xs" style={{ color: COLORS.darkGray }}>포인트</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: COLORS.darkGray }} />
                    <div>
                      <p className="text-sm" style={{ color: COLORS.charcoalNavy }}>2</p>
                      <p className="text-xs" style={{ color: COLORS.darkGray }}>작성한 편지</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" style={{ color: COLORS.coralRed }} />
                    <div>
                      <p className="text-sm" style={{ color: COLORS.charcoalNavy }}>243</p>
                      <p className="text-xs" style={{ color: COLORS.darkGray }}>받은 공감</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info - Now on Right */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: COLORS.apricotCoral, color: COLORS.white }}
                >
                  포
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl" style={{ color: COLORS.charcoalNavy }}>
                      포비귀여워
                    </h1>
                    <span 
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: COLORS.sageGreen + '40',
                        color: COLORS.sageGreen 
                      }}
                    >
                      40대
                    </span>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-5 h-5" style={{ color: COLORS.darkGray }} />
                    </button>
                  </div>

                  <p className="text-sm" style={{ color: COLORS.darkGray }}>
                    user@example.com
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card>
                <h2 className="text-xl mb-6" style={{ color: COLORS.charcoalNavy }}>
                  계정 설정
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2" style={{ color: COLORS.charcoalNavy }}>
                      표시 이름
                    </label>
                    <input
                      type="text"
                      defaultValue="포비귀여워"
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
                      이메일
                    </label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
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
                      나는...
                    </label>
                    <select
                      className="w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2"
                      style={{
                        borderColor: COLORS.sandBeige,
                        backgroundColor: COLORS.white,
                        color: COLORS.charcoalNavy,
                      }}
                    >
                      <option>부모</option>
                      <option>자녀</option>
                      <option>밝히고 싶지 않음</option>
                    </select>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex flex-row items-center justify-center gap-2 p-4 rounded-2xl transition-all text-sm"
                  style={{
                    backgroundColor: activeTab === tab.key ? COLORS.white : 'transparent',
                    color: activeTab === tab.key ? COLORS.charcoalNavy : COLORS.darkGray,
                    boxShadow: activeTab === tab.key ? '0 4px 16px rgba(0, 0, 0, 0.08)' : 'none',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'written' && (
              <div className="space-y-4">
                {MOCK_WRITTEN_POSTS.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover onClick={() => setSelectedPost(post)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2" style={{ color: COLORS.charcoalNavy }}>
                            {post.title}
                          </h3>
                          <div className="flex gap-6 text-sm" style={{ color: COLORS.darkGray }}>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <span className="text-xs" style={{ color: COLORS.gray }}>
                              {post.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'myReplies' && (
              <div className="space-y-4">
                {MOCK_MY_REPLIES.map((letter, index) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <div>
                        <p className="text-sm mb-2" style={{ color: COLORS.darkGray }}>
                          게시글: <span style={{ color: COLORS.charcoalNavy }}>{letter.postTitle}</span>
                        </p>
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: COLORS.darkGray }}>
                          {letter.preview}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: COLORS.gray }}>
                            {letter.date}
                          </span>
                          <div className="flex items-center gap-1" style={{ color: COLORS.coralRed }}>
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="text-sm">{letter.likes} 좋아요</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'likedReplies' && (
              <div className="space-y-4">
                {MOCK_LIKED_REPLIES.map((letter, index) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <div>
                        <p className="text-sm mb-2" style={{ color: COLORS.darkGray }}>
                          게시글: <span style={{ color: COLORS.charcoalNavy }}>{letter.postTitle}</span>
                        </p>
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: COLORS.darkGray }}>
                          {letter.preview}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: COLORS.gray }}>
                            {letter.date}
                          </span>
                          <span className="text-sm" style={{ color: COLORS.darkGray }}>
                            작성자: {letter.author}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'stored' && (
              <div className="space-y-4">
                {MOCK_STORED_LETTERS.map((letter, index) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2" style={{ color: COLORS.charcoalNavy }}>
                            {letter.title}
                          </h3>
                          <p className="text-sm mb-2 line-clamp-2" style={{ color: COLORS.darkGray }}>
                            {letter.preview}
                          </p>
                          <span className="text-xs" style={{ color: COLORS.gray }}>
                            {letter.date}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
