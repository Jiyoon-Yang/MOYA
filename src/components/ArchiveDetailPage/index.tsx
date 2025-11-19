'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { LetterCard, Button } from '../../commons/components';
import { COLORS } from '../../commons/constants';
import { Heart, Copy, ChevronLeft, ChevronRight, Share2, Bookmark, RotateCcw } from 'lucide-react';

const MOCK_POST = {
  id: 1,
  title: '통금이 전쟁터가 되었을 때',
  userText: `어젯밤, 딸이 통금 시간보다 2시간이나 늦게 들어왔어요. 저는 너무 걱정이 되어서 미칠 것 같았고, 딸이 들어오자마자 완전히 화를 냈어요. 하지 말았어야 할 말들을 했죠.

딸은 친구가 도움이 필요해서 시간 가는 줄 몰랐다고 설명하려 했지만, 저는 너무 화가 나서 들을 수가 없었어요. 한 달 동안 외출 금지를 시켰어요.

이제 마음이 너무 안 좋아요. 과하게 반응한 걸 알아요. 하지만 딸에게 무슨 일이 생긴 건 아닐까 너무 무서웠어요.`,
  aiSummary: `이 상황은 부모의 걱정과 자녀의 자율성 사이의 갈등을 보여줍니다. 부모는 자녀의 안전에 대한 깊은 우려로 인해 강하게 반응했으며, 자녀는 친구를 돕기 위한 선의의 행동이 오해받았다고 느낍니다. 양측 모두 상대방을 배려하지만 의사소통 방식에서 어려움을 겪고 있습니다.`,
  author: 'parent',
  likes: 89,
  isLiked: false,
  userAge: '40대',
  userGender: '여성',
};

const MOCK_MYAO_LETTER = `딸이 정해진 시간에 집에 오지 않았을 때 얼마나 무섭고 걱정되었을지 알 수 있어요. 자녀의 안전에 대한 두려움은 부모가 느낄 수 있는 가장 강력한 감정 중 하나예요.

아름다운 건, 당신이 자신의 반응이 사랑과 걱정에서 비롯되었다는 걸 인식하고 있다는 거예요. 딸은 그 순간에는 그렇게 생각하지 못했을 수도 있지만, 마음 깊은 곳에서는 당신이 아낀다는 걸 알고 있을 거예요.

도움이 될 만한 방법: 둘 다 준비가 되었을 때 차분하게 대화를 나눠보세요. 특정 경계선은 유지하면서도, 딸의 관점을 들을 의향이 있다는 걸 알려주세요. 때로는 10대들도 단지 우리가 그들의 이야기를 들어줄 준비가 되어 있다는 걸 알아야 해요.

당신은 최선을 다하려는 배려 깊은 부모예요. 우리 모두가 할 수 있는 건 그게 전부예요. 🧡`;

const MOCK_COMMUNITY_LETTERS = [
  {
    id: 1,
    author: '김수진',
    authorType: 'parent',
    age: '40대',
    gender: '여성',
    letter: `저도 아들과 비슷한 경험을 했어요. 우리에게 도움이 된 건 계획이 바뀔 때 문자를 보낼 수 있는 시스템을 만든 거예요. 아들에게는 어느 정도 자유를 주면서 제 걱정도 덜 수 있었죠. 한번 시도해보시는 건 어떨까요?`,
    likes: 45,
    isLiked: false,
  },
  {
    id: 2,
    author: '이지수',
    authorType: 'child',
    age: '17세',
    gender: '여성',
    letter: `10대로서 말씀드리고 싶은 건, 저희도 걱정 끼치려는 의도는 없어요. 때로는 시간이 얼마나 지났는지 정말 모를 때가 있어요. 따님도 걱정 끼친 것에 대해 정말 미안해하고 있을 거예요. 차분하게 대화하시면, 다음번엔 연락을 더 잘 할 거예요.`,
    likes: 78,
    isLiked: false,
  },
  {
    id: 3,
    author: '박민호',
    authorType: 'parent',
    age: '50대',
    gender: '남성',
    letter: `이런 걸 되돌아본다는 것 자체가 좋은 부모라는 증거예요. 저는 때로는 우리의 가장 강한 반응이 가장 깊은 사랑에서 나온다는 걸 배웠어요. 함께 앉아서 둘 다 동의할 수 있는 통금 규칙을 만들어보는 건 어떨까요?`,
    likes: 92,
    isLiked: false,
  },
];

export function ArchiveDetailPage({ id }: { id: string }) {
  const [currentPage, setCurrentPage] = useState(0); // 0 = Myao's letter, 1+ = community letters
  const [isLiked, setIsLiked] = useState(MOCK_POST.isLiked);
  const [likes, setLikes] = useState(MOCK_POST.likes);
  const [isWritingReply, setIsWritingReply] = useState(false);
  const [supportLetter, setSupportLetter] = useState('');
  const [replyAuthorType, setReplyAuthorType] = useState<'parent' | 'child'>('parent');
  const [showAISummary, setShowAISummary] = useState(false);
  const [communityLikes, setCommunityLikes] = useState(
    MOCK_COMMUNITY_LETTERS.map(l => ({ id: l.id, likes: l.likes, isLiked: l.isLiked }))
  );

  const totalPages = 1 + MOCK_COMMUNITY_LETTERS.length;
  const currentLetter = currentPage === 0 
    ? { content: MOCK_MYAO_LETTER, from: 'Myao', type: 'ai' }
    : { 
        content: MOCK_COMMUNITY_LETTERS[currentPage - 1].letter, 
        from: MOCK_COMMUNITY_LETTERS[currentPage - 1].author,
        type: MOCK_COMMUNITY_LETTERS[currentPage - 1].authorType,
        letterId: MOCK_COMMUNITY_LETTERS[currentPage - 1].id,
        age: MOCK_COMMUNITY_LETTERS[currentPage - 1].age,
        gender: MOCK_COMMUNITY_LETTERS[currentPage - 1].gender,
      };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCommunityLike = (letterId: number) => {
    setCommunityLikes(prev => prev.map(item => 
      item.id === letterId 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLetter.content);
    alert('편지가 클립보드에 복사되었습니다!');
  };

  const handleSubmitLetter = () => {
    // Mock submit
    alert('공감 편지가 전송되었습니다!');
    setIsWritingReply(false);
    setSupportLetter('');
  };

  const getCurrentLetterLikes = () => {
    if (currentPage === 0) return null;
    const letterData = communityLikes.find(l => l.id === currentLetter.letterId);
    return letterData;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span 
              className="inline-block text-sm px-4 py-2 rounded-full mb-4"
              style={{
                backgroundColor: MOCK_POST.author === 'parent' ? COLORS.softTerra + '30' : COLORS.sageGreen + '30',
                color: MOCK_POST.author === 'parent' ? COLORS.softTerra : COLORS.sageGreen,
              }}
            >
              {MOCK_POST.author === 'parent' ? '👨‍👩‍👧 From a Parent' : '👦 From a Child'}
            </span>
            <h1 className="text-4xl mb-4" style={{ color: COLORS.charcoalNavy }}>
              {MOCK_POST.title}
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
                          {MOCK_POST.aiSummary}
                        </div>
                      ) : (
                        MOCK_POST.userText
                      )}
                    </LetterCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Support Letters (with pagination) */}
            <div className="flex flex-col" style={{ minHeight: '600px' }}>
              <h3 className="mb-4" style={{ color: COLORS.charcoalNavy }}>
                우리 생각은 모야
              </h3>

              {!isWritingReply ? (
                <div className="flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 relative"
                    >
                      {/* Letter Card with special styling */}
                      <div
                        className="p-6 rounded-2xl h-full relative overflow-hidden"
                        style={{
                          backgroundColor: COLORS.white,
                          border: currentPage === 0 
                            ? `2px solid ${COLORS.apricotCoral}` 
                            : `2px solid ${COLORS.sandBeige}`,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        {/* Background Pattern for Myao's Letter (cat theme) */}
                        {currentPage === 0 && (
                          <div 
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20 Q25 15 20 20 Q15 25 20 30 Q25 35 30 30 Q35 35 40 30 Q45 25 40 20 Q35 15 30 20' fill='%23FF9B7D' opacity='0.3'/%3E%3C/svg%3E")`,
                              backgroundSize: '40px 40px',
                            }}
                          />
                        )}

                        {/* Background Pattern for Community Letters (simple lines) */}
                        {currentPage > 0 && (
                          <div 
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{
                              backgroundImage: `repeating-linear-gradient(
                                transparent,
                                transparent 31px,
                                ${COLORS.apricotCoral} 31px,
                                ${COLORS.apricotCoral} 32px
                              )`,
                            }}
                          />
                        )}

                        <div className="relative z-10 flex flex-col h-full">
                          {currentPage === 0 && (
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: COLORS.softTerra + '30' }}>
                              <span className="text-2xl">🐱</span>
                              <span style={{ color: COLORS.apricotCoral }}>
                                묘가 쓴 편지
                              </span>
                            </div>
                          )}
                          
                          {currentPage > 0 && (
                            <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: COLORS.softTerra + '30' }}>
                              <div className="flex items-center gap-2">
                                <span className="text-xl">
                                  {currentLetter.type === 'parent' ? '👨‍👩‍👧' : '👦'}
                                </span>
                                <div>
                                  <p style={{ color: COLORS.charcoalNavy }}>
                                    {currentLetter.from}
                                  </p>
                                  <p className="text-xs" style={{ color: COLORS.darkGray }}>
                                    {currentLetter.age} · {currentLetter.gender} · {currentLetter.type === 'parent' ? '부모' : '자녀'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleCommunityLike(currentLetter.letterId!)}
                                  className="flex items-center gap-1 transition-all hover:scale-110"
                                  style={{ 
                                    color: getCurrentLetterLikes()?.isLiked ? COLORS.coralRed : COLORS.darkGray 
                                  }}
                                >
                                  <Heart className={`w-4 h-4 ${getCurrentLetterLikes()?.isLiked ? 'fill-current' : ''}`} />
                                  <span className="text-sm">{getCurrentLetterLikes()?.likes}</span>
                                </button>
                                <button className="transition-all hover:scale-110" style={{ color: COLORS.darkGray }}>
                                  <Share2 className="w-4 h-4" />
                                </button>
                                <button className="transition-all hover:scale-110" style={{ color: COLORS.darkGray }}>
                                  <Bookmark className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 relative">
                            <div className="whitespace-pre-wrap leading-relaxed" style={{ color: COLORS.charcoalNavy }}>
                              {currentLetter.content}
                            </div>
                            
                            {currentPage === 0 && (
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
                            )}
                          </div>

                          {/* Page indicator at bottom center */}
                          <div className="text-center pt-4 mt-auto border-t" style={{ borderColor: COLORS.sandBeige }}>
                            <span className="text-xs" style={{ color: COLORS.darkGray }}>
                              {currentPage + 1} / {totalPages}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                // Reply Input Form
                <div className="flex-1 flex flex-col">
                  <div 
                    className="flex-1 p-6 rounded-2xl border-2 flex flex-col"
                    style={{ 
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.apricotCoral,
                    }}
                  >
                    {/* Author Type Selection */}
                    <div className="mb-4">
                      <label className="block text-sm mb-2" style={{ color: COLORS.charcoalNavy }}>
                        나는
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setReplyAuthorType('parent')}
                          className="px-4 py-2 rounded-lg transition-all"
                          style={{
                            backgroundColor: replyAuthorType === 'parent' ? COLORS.sageGreen : COLORS.sandBeige,
                            color: replyAuthorType === 'parent' ? COLORS.white : COLORS.charcoalNavy,
                          }}
                        >
                          👨‍👩‍👧 부모
                        </button>
                        <button
                          onClick={() => setReplyAuthorType('child')}
                          className="px-4 py-2 rounded-lg transition-all"
                          style={{
                            backgroundColor: replyAuthorType === 'child' ? COLORS.sageGreen : COLORS.sandBeige,
                            color: replyAuthorType === 'child' ? COLORS.white : COLORS.charcoalNavy,
                          }}
                        >
                          👦 자녀
                        </button>
                      </div>
                    </div>

                    {/* Letter Content */}
                    <div className="flex-1 mb-4">
                      <label className="block text-sm mb-2" style={{ color: COLORS.charcoalNavy }}>
                        답장 내용
                      </label>
                      <textarea
                        value={supportLetter}
                        onChange={(e) => setSupportLetter(e.target.value)}
                        placeholder="당신의 생각, 경험, 또는 격려의 말을 나눠주세요..."
                        className="w-full h-full min-h-[200px] p-4 rounded-xl border resize-none focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: COLORS.sandBeige,
                          backgroundColor: COLORS.sandBeige + '20',
                          color: COLORS.charcoalNavy,
                        }}
                      />
                    </div>

                    {/* User Info Display (auto-filled) */}
                    <div className="pt-4" style={{ borderColor: COLORS.sandBeige }}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs" style={{ color: COLORS.darkGray }}>
                          프로필 정보 (회원가입 시 등록된 정보)
                        </p>
                        <div className="flex items-center gap-3 text-xs" style={{ color: COLORS.charcoalNavy }}>
                          <span className="px-2 py-1 rounded" style={{ backgroundColor: COLORS.sandBeige }}>
                            {MOCK_POST.userAge}
                          </span>
                          <span className="px-2 py-1 rounded" style={{ backgroundColor: COLORS.sandBeige }}>
                            {MOCK_POST.userGender}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsWritingReply(false);
                            setSupportLetter('');
                          }}
                        >
                          취소
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSubmitLetter}
                          disabled={!supportLetter.trim()}
                        >
                          답장 보내기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: COLORS.sandBeige,
                border: `2px solid ${COLORS.apricotCoral}`,
              }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: COLORS.charcoalNavy }} />
            </button>

            <Button
              size="lg"
              onClick={() => setIsWritingReply(!isWritingReply)}
            >
              {isWritingReply ? '답장 취소' : '나도 답장쓰기'}
            </Button>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: COLORS.sandBeige,
                border: `2px solid ${COLORS.apricotCoral}`,
              }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: COLORS.charcoalNavy }} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
