'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button, Card } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';
import { FlipVertical } from 'lucide-react';

export function UploadPage() {
  const router = useRouter();
  
  // Get data from localStorage (set by FilteringPage)
  const [userText, setUserTextState] = useState('');
  const [aiSummary, setAiSummaryState] = useState('');
  const [myaoLetter, setMyaoLetterState] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserText = localStorage.getItem('writeLetter_userText') || '';
      const storedAiSummary = localStorage.getItem('writeLetter_aiSummary') || '';
      const storedMyaoLetter = localStorage.getItem('writeLetter_myaoLetter') || '';
      setUserTextState(storedUserText);
      setAiSummaryState(storedAiSummary);
      setMyaoLetterState(storedMyaoLetter);
    }
  }, []);
  
  const [title, setTitle] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [showFlipped, setShowFlipped] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpload = () => {
    // Mock upload functionality
    alert('공감 아카이브에 편지가 업로드되었습니다!');
    router.push(ROUTES.ARCHIVE_LIST);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">📮</div>
            <h1 className="text-4xl mb-3" style={{ color: COLORS.charcoalNavy }}>
              커뮤니티와 공유하기
            </h1>
            <p style={{ color: COLORS.darkGray }}>
              당신의 이야기가 다른 사람들이 자신의 갈등을 이해하는 데 도움이 될 수 있어요
            </p>
          </div>

          {/* Original Text with Flip Card */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ color: COLORS.charcoalNavy }}>
                당신의 이야기
              </h3>
              <button
                onClick={() => setShowFlipped(!showFlipped)}
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                style={{ color: COLORS.apricotCoral }}
              >
                <FlipVertical className="w-4 h-4" />
                {showFlipped ? 'Show Original' : 'Show Summary'}
              </button>
            </div>

            <div className="relative" style={{ minHeight: '200px' }}>
              <motion.div
                animate={{ rotateY: showFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card style={{ backfaceVisibility: 'hidden' }}>
                  <p className="whitespace-pre-wrap" style={{ color: COLORS.charcoalNavy }}>
                    {userText}
                  </p>
                </Card>

                <Card 
                  style={{ 
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: 'rotateY(180deg)',
                    backgroundColor: COLORS.sandBeige,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">✨</span>
                    <span style={{ color: COLORS.charcoalNavy }}>AI 요약</span>
                  </div>
                  <p style={{ color: COLORS.charcoalNavy }}>
                    {aiSummary}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="space-y-6 mb-8">
            <div>
              <label 
                className="block mb-2"
                style={{ color: COLORS.charcoalNavy }}
              >
                게시글 제목 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="이야기에 제목을 붙여주세요..."
                className="w-full p-4 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.sandBeige,
                  backgroundColor: COLORS.white,
                  color: COLORS.charcoalNavy,
                }}
              />
            </div>

            <div>
              <label 
                className="block mb-2"
                style={{ color: COLORS.charcoalNavy }}
              >
                추가 메모 (선택사항)
              </label>
              <textarea
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
                placeholder="추가하고 싶은 내용이 있나요?"
                className="w-full min-h-[150px] p-4 rounded-2xl border-2 resize-none focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.sandBeige,
                  backgroundColor: COLORS.white,
                  color: COLORS.charcoalNavy,
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.FILTERING)}
            >
              돌아가기
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!title.trim()}
            >
              공감 아카이브에 업로드
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
