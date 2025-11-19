'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ProblematicWord {
  word: string;
  position: number;
  suggestions: string[];
  originalWord: string;
}

interface ReplacedWord {
  originalWord: string;
  replacedWith: string;
  position: number;
}

export function FilteringPage() {
  const router = useRouter();
  
  // Get data from localStorage (set by WriteLetterPage)
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
      setEditedText(storedUserText);
    }
  }, []);
  
  const [editedText, setEditedText] = useState('');
  const [problematicWords, setProblematicWords] = useState<ProblematicWord[]>([]);
  const [replacedWords, setReplacedWords] = useState<ReplacedWord[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    analyzeText(editedText);
  }, [editedText]);

  const analyzeText = (text: string) => {
    // Mock AI filtering - detect problematic words (both English and Korean)
    const badWordsConfig: Record<string, string[]> = {
      'stupid': ['어리석은', '현명하지 못한'],
      'hate': ['싫어하다', '답답하다'],
      'idiot': ['사람', '그 사람'],
      'damn': ['매우', '정말'],
      'hell': ['어려운', '힘든'],
      '바보': ['배려가 부족한', '생각이 부족한'],
      '멍청': ['서툰', '미숙한'],
      '짜증': ['답답함', '당황스러움'],
      '미친': ['이해하기 어려운', '당황스러운'],
      '화나': ['속상한', '마음이 불편한'],
      '싫어': ['불편한', '어려운'],
      '죽겠': ['힘든', '어려운'],
      '죽을': ['매우 힘든', '고된'],
      '열받': ['속상한', '답답한'],
      '짜증나': ['답답한', '힘든'],
    };
    
    const found: ProblematicWord[] = [];
    
    Object.entries(badWordsConfig).forEach(([word, suggestions]) => {
      const regex = new RegExp(word, 'gi');
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        // Check if this position is already replaced
        const matchIndex = match.index;
        const isReplaced = replacedWords.some(rw => 
          rw.position <= matchIndex && 
          rw.position + rw.replacedWith.length > matchIndex
        );
        
        if (!isReplaced) {
          found.push({
            word: match[0],
            position: matchIndex,
            suggestions,
            originalWord: word,
          });
        }
      }
    });
    
    setProblematicWords(found);
  };

  const handleReplaceSuggestion = (problematicWord: ProblematicWord, suggestion: string) => {
    const { word, position } = problematicWord;
    
    // Replace the word in the text
    const before = editedText.substring(0, position);
    const after = editedText.substring(position + word.length);
    const newText = before + suggestion + after;
    
    // Track the replacement
    const newReplacement: ReplacedWord = {
      originalWord: word,
      replacedWith: suggestion,
      position: position,
    };
    
    setReplacedWords(prev => [...prev, newReplacement]);
    setEditedText(newText);
  };

  const renderHighlightedText = () => {
    if (problematicWords.length === 0 && replacedWords.length === 0) {
      return <span>{editedText}</span>;
    }

    const segments: Array<{ text: string; type: 'normal' | 'problematic' | 'replaced', word?: ProblematicWord }> = [];
    let lastIndex = 0;

    // Sort problematic words by position
    const sortedProblematic = [...problematicWords].sort((a, b) => a.position - b.position);
    const sortedReplaced = [...replacedWords].sort((a, b) => a.position - b.position);

    // Merge all positions
    const allMarkers = [
      ...sortedProblematic.map(pw => ({ type: 'problematic' as const, position: pw.position, length: pw.word.length, data: pw })),
      ...sortedReplaced.map(rw => ({ type: 'replaced' as const, position: rw.position, length: rw.replacedWith.length, data: rw }))
    ].sort((a, b) => a.position - b.position);

    allMarkers.forEach(marker => {
      // Add normal text before this marker
      if (lastIndex < marker.position) {
        segments.push({
          text: editedText.substring(lastIndex, marker.position),
          type: 'normal'
        });
      }

      // Add the marked text
      if (marker.type === 'problematic') {
        segments.push({
          text: editedText.substring(marker.position, marker.position + marker.length),
          type: 'problematic',
          word: marker.data as ProblematicWord
        });
      } else {
        segments.push({
          text: editedText.substring(marker.position, marker.position + marker.length),
          type: 'replaced'
        });
      }

      lastIndex = marker.position + marker.length;
    });

    // Add remaining text
    if (lastIndex < editedText.length) {
      segments.push({
        text: editedText.substring(lastIndex),
        type: 'normal'
      });
    }

    return (
      <>
        {segments.map((segment, index) => {
          if (segment.type === 'problematic') {
            return (
              <mark
                key={index}
                className="px-1 rounded"
                style={{
                  backgroundColor: COLORS.coralRed + '30',
                  color: COLORS.coralRed,
                }}
              >
                {segment.text}
              </mark>
            );
          } else if (segment.type === 'replaced') {
            return (
              <mark
                key={index}
                className="px-1 rounded"
                style={{
                  backgroundColor: COLORS.sageGreen + '30',
                  color: COLORS.sageGreen,
                }}
              >
                {segment.text}
              </mark>
            );
          } else {
            return <span key={index}>{segment.text}</span>;
          }
        })}
      </>
    );
  };

  const handleProceed = () => {
    // Store data in localStorage for UploadPage
    if (typeof window !== 'undefined') {
      localStorage.setItem('writeLetter_userText', editedText);
      localStorage.setItem('writeLetter_aiSummary', aiSummary);
      localStorage.setItem('writeLetter_myaoLetter', myaoLetter);
    }
    router.push(ROUTES.UPLOAD);
  };

  const isClean = problematicWords.length === 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-4xl mb-3" style={{ color: COLORS.charcoalNavy }}>
              내용 검토
            </h1>
            <p style={{ color: COLORS.darkGray }}>
              메시지가 존중적이고 건설적인지 확인해볼게요
            </p>
          </div>

          {/* Text Display with Highlights */}
          <div className="mb-6">
            <div
              className="p-6 rounded-2xl border-2 min-h-[300px] whitespace-pre-wrap leading-relaxed"
              style={{
                backgroundColor: COLORS.white,
                borderColor: isClean ? COLORS.sageGreen : COLORS.coralRed,
                color: COLORS.charcoalNavy,
              }}
            >
              {renderHighlightedText()}
            </div>
          </div>

          {/* Status Banner - Moved below text */}
          <div
            className="mb-8 p-5 rounded-2xl flex items-start gap-4"
            style={{
              backgroundColor: isClean ? COLORS.sageGreen + '20' : COLORS.coralRed + '20',
            }}
          >
            {isClean ? (
              <>
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.sageGreen }} />
                <div>
                  <h3 className="mb-1 text-sm" style={{ color: COLORS.charcoalNavy }}>
                    모두 좋아요!
                  </h3>
                  <p className="text-xs" style={{ color: COLORS.darkGray }}>
                    메시지가 좋아 보여요. 업로드를 진행할 수 있어요.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.coralRed }} />
                <div>
                  <h3 className="mb-1 text-sm" style={{ color: COLORS.charcoalNavy }}>
                    {problematicWords.length}개의 문제가 발견되었어요
                  </h3>
                  <p className="text-xs" style={{ color: COLORS.darkGray }}>
                    아래 추천 대체 표현을 클릭하면 자동으로 변환됩니다.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Suggestions */}
          {!isClean && (
            <div
              className="mb-8 p-6 rounded-2xl"
              style={{
                backgroundColor: COLORS.sandBeige,
              }}
            >
              <h3 className="mb-4" style={{ color: COLORS.charcoalNavy }}>
                ✨ 추천 대체 표현 (클릭하면 자동 변환돼요):
              </h3>
              <div className="space-y-3">
                {problematicWords.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span 
                      className="px-3 py-1 rounded-full text-sm flex-shrink-0"
                      style={{ 
                        backgroundColor: COLORS.coralRed + '30',
                        color: COLORS.coralRed,
                      }}
                    >
                      {item.word}
                    </span>
                    <span style={{ color: COLORS.darkGray, marginTop: '2px' }}>→</span>
                    <div className="flex flex-wrap gap-2">
                      {item.suggestions.map((suggestion, sIndex) => (
                        <button
                          key={sIndex}
                          onClick={() => handleReplaceSuggestion(item, suggestion)}
                          className="px-3 py-1 rounded-full text-sm transition-all hover:shadow-md cursor-pointer"
                          style={{
                            backgroundColor: COLORS.white,
                            color: COLORS.charcoalNavy,
                            border: `2px solid ${COLORS.apricotCoral}`,
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Replaced Words Info */}
          {replacedWords.length > 0 && (
            <div
              className="mb-8 p-4 rounded-2xl"
              style={{
                backgroundColor: COLORS.sageGreen + '20',
                border: `1px solid ${COLORS.sageGreen}`,
              }}
            >
              <p className="text-sm" style={{ color: COLORS.sageGreen }}>
                ✓ {replacedWords.length}개의 단어가 변경되었습니다 (녹색으로 표시됨)
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.WRITE_LETTER)}
            >
              돌아가기
            </Button>
            <Button
              onClick={handleProceed}
              disabled={!isClean}
            >
              {isClean ? '업로드 진행하기' : '문제를 해결하고 계속하기'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
