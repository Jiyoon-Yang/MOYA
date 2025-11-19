'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button, Card } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';
import { ChevronLeft, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const CAROUSEL_ITEMS = [
  {
    title: '청소년 감정 이해하기',
    description: '우리 아이와 연결되는 방법',
    image: 'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB3b3Jrc2hvcCUyMHNlbWluYXJ8ZW58MXx8fHwxNzYzMTIwMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: '적극적 경청 워크샵',
    description: '진심으로 서로의 이야기를 듣는 법',
    image: 'https://images.unsplash.com/photo-1755718669933-47d644395aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXN0ZW5pbmclMjBjb21tdW5pY2F0aW9uJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzMTIwMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: '가족 소통 팁',
    description: '집에서 더 단단한 관계 만들기',
    image: 'https://images.unsplash.com/photo-1758612897909-7b4c8e3297e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjb252ZXJzYXRpb24lMjBzdXBwb3J0fGVufDF8fHx8MTc2MzEyMDIzOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const HALL_OF_FAME = [
  {
    rank: 2,
    title: '늦게 들어온 딸에게',
    preview: "소리지른 건 미안해. 그냥 너무 걱정됐어...",
    likes: 234,
  },
  {
    rank: 1,
    title: '엄마, 이제 이해했어요',
    preview: "먀오의 편지를 읽고 나니, 엄마가 얼마나 저를 아끼는지 알게 됐어요...",
    likes: 456,
  },
  {
    rank: 3,
    title: "아들의 선택을 이해하며",
    preview: '그의 입장에서 생각해본 적이 없었어요...',
    likes: 189,
  },
];

const ARCHIVE_PREVIEW = [
  { 
    id: 1,
    title: '통금 전쟁터가 되었을 때', 
    author: '김민수',
    preview: '어젯밤, 딸이 통금 시간보다 2시간이나 늦게 들어왔어요. 저는 너무 걱정이 되어서 미칠 것 같았고, 딸이 들어오자마자 완전히 화를 냈어요. 하지 말았어야 할 말들을 했죠. 딸은 친구가 도움이 필요해서 시간 가는 줄 몰랐다고 설명하려 했지만, 저는 너무 화가 나서 들을 수가 없었어요.',
    hearts: 89,
  },
  { 
    id: 2,
    title: '우리를 변화시킨 휴대폰 논쟁', 
    author: '이지수 (17)',
    preview: '엄마가 제 휴대폰을 일주일 동안 빼앗아 갔어요. 처음엔 정 화가 났는데, 그런데 뭔가 변했어요. 휴대폰이 없으니 저녁 식사 시간에 가족들과 실제로 대화를 나누기 시작했어요. 몇 달 만에 처음으로 함께 웃었어요.',
    hearts: 156,
  },
  { 
    id: 3,
    title: '상처 주는 말을 한 이유', 
    author: '박철호',
    preview: '감정이 격해진 순간, 아들에게 깊이 후회되는 말을 했어요. 아들의 그 표정이 아직도 저를 괴롭혀요. 사과해야 한다는 건 아는데, 어떻게 대화를 시작해야 할지 모르겠어요.',
    hearts: 203,
  },
  { 
    id: 4,
    title: '부모님의 엄격함을 이해하며', 
    author: '최서연',
    preview: '먀오가 부모님의 관점을 보여주기 전까지는 왜 그렇게 엄격한지 이해하지 못했어요. 부모님은 저를 통제하려던 게 아니라, 저를 사랑하기 때문에 보호하려고 했던 거예요.',
    hearts: 134,
  },
  { 
    id: 5,
    title: '식탁 위의 침묵', 
    author: '정우진',
    preview: '몇 주 동안 우리는 침묵 속에서 식사를 했어요. 둘 다 그 침묵을 깨는 방법을 몰랐죠. 긴장감이 칼로 자를 수 있을 정도로 짙었어요. 딸의 웃음소리가 그리웠어요.',
    hearts: 98,
  },
  { 
    id: 6,
    title: '충분하지 않은 성적', 
    author: '한지민',
    preview: '우리 부모님은 완���을 대하세요. B+를 받았을 때, 실망하셨어요. 아무리 열심히 해도 절대 충분하지 않은 것 같아요.',
    hearts: 167,
  },
  { 
    id: 7,
    title: '대학 진로 갈등', 
    author: '송민호',
    preview: '아들은 미술을 공부하고 싶어 하는데, 저는 안정적인 직업을 가졌으면 해요. 며칠째 대화를 안 하고 있어요. 제가 너무한 건가요, 아니면 그냥 도우려는 건가요?',
    hearts: 145,
  },
];

export function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [archiveIndex, setArchiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const handleWriteLetter = () => {
    if (checkLogin()) {
      router.push(ROUTES.WRITE_LETTER);
    }
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          size: 'scale-110',
          medal: '🥇',
          bgColor: COLORS.apricotCoral,
        };
      case 2:
        return {
          size: 'scale-100',
          medal: '🥈',
          bgColor: COLORS.sageGreen,
        };
      case 3:
        return {
          size: 'scale-100',
          medal: '🥉',
          bgColor: COLORS.softTerra,
        };
      default:
        return {
          size: 'scale-100',
          medal: '',
          bgColor: COLORS.gray,
        };
    }
  };

  const handlePrevArchive = () => {
    setArchiveIndex((prev) => (prev - 1 + ARCHIVE_PREVIEW.length) % ARCHIVE_PREVIEW.length);
  };

  const handleNextArchive = () => {
    setArchiveIndex((prev) => (prev + 1) % ARCHIVE_PREVIEW.length);
  };

  const getCardPosition = (index: number) => {
    const diff = (index - archiveIndex + ARCHIVE_PREVIEW.length) % ARCHIVE_PREVIEW.length;
    if (diff > ARCHIVE_PREVIEW.length / 2) {
      return diff - ARCHIVE_PREVIEW.length;
    }
    return diff;
  };

  const getArchiveCardStyle = (index: number, isMobile: boolean, isTablet: boolean) => {
    const position = getCardPosition(index);
    
    // Desktop: show positions -2 to 2 (5 cards)
    // Tablet: show positions -1 to 1 (3 cards)
    // Mobile: show positions 0 to 1 (2 cards)
    
    if (isMobile && (position < 0 || position > 1)) {
      return { opacity: 0, blur: 8, translateY: 0, scale: 1, display: 'none' };
    }
    
    if (isTablet && !isMobile && (position < -1 || position > 1)) {
      return { opacity: 0, blur: 8, translateY: 0, scale: 1, display: 'none' };
    }
    
    if (!isTablet && !isMobile && (position < -2 || position > 2)) {
      return { opacity: 0, blur: 8, translateY: 0, scale: 1, display: 'none' };
    }
    
    // Center card (position 0)
    if (position === 0) {
      return { opacity: 1, blur: 0, translateY: 0, scale: 1.05, display: 'block' };
    }
    
    // Zigzag pattern: even positions go up, odd positions go down
    const translateY = position % 2 === 0 ? -20 : 20;
    
    // Opacity and blur based on distance from center
    const absPosition = Math.abs(position);
    if (absPosition === 1) {
      return { opacity: 0.6, blur: 2, translateY, scale: 1, display: 'block' };
    }
    if (absPosition === 2) {
      return { opacity: 0.3, blur: 3, translateY, scale: 1, display: 'block' };
    }
    
    return { opacity: 0, blur: 8, translateY: 0, scale: 1, display: 'none' };
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-10 relative"
      >
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(180deg, ${COLORS.sandBeige} 0%, ${COLORS.white} 100%)` 
        }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl mb-6">🐱✨</div>
            <h1 
              className="text-4xl mb-4"
              style={{ color: COLORS.charcoalNavy }}
            >
              갈등을 이해로 바꾸는 AI 편지
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: COLORS.darkGray }}
            >
              부모와 자녀가 서로를 이해할 수 있도록 돕는 AI 편지 서비스
            </p>
            <Button 
              size="lg"
              onClick={handleWriteLetter}
            >
              편지 쓰기 시작하기
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section - Moved before Hall of Fame */}
      <section className="py-6 overflow-hidden relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative h-[420px] flex items-center justify-center gap-6">
            {/* Left Slide - Fixed Position */}
            <div className="relative" style={{ width: '220px', height: '340px', flexShrink: 0 }}>
              {CAROUSEL_ITEMS.map((item, index) => {
                const prevIndex = (currentSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
                const isVisible = index === prevIndex;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    animate={{
                      opacity: isVisible ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      pointerEvents: isVisible ? 'auto' : 'none',
                    }}
                  >
                    <div 
                      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => setCurrentSlide(prevIndex)}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <h3 className="text-xl mb-1">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Center Slide - Main/Active */}
            <div className="relative" style={{ width: '1000px', height: '400px', flexShrink: 0 }}>
              {CAROUSEL_ITEMS.map((item, index) => {
                const isVisible = index === currentSlide;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    animate={{
                      opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-10">
                        <div className="text-white">
                          <h3 className="text-4xl mb-3">{item.title}</h3>
                          <p className="text-xl opacity-90">{item.description}</p>
                        </div>
                      </div>
                      
                      {/* Navigation Arrows - Overlapping at edges */}
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)}
                        className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                          zIndex: 9999,
                        }}
                      >
                        <ChevronLeft className="w-6 h-6" style={{ color: COLORS.white, strokeWidth: 2.5 }} />
                      </button>

                      <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length)}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                          zIndex: 9999,
                        }}
                      >
                        <ChevronRight className="w-6 h-6" style={{ color: COLORS.white, strokeWidth: 2.5 }} />
                      </button>
                      
                      {/* Dots Indicator - Inside Image */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
                        {CAROUSEL_ITEMS.map((_, idx) => (
                          <button
                            key={idx}
                            className="h-2 rounded-full transition-all"
                            style={{
                              backgroundColor: currentSlide === idx ? COLORS.white : 'rgba(255, 255, 255, 0.5)',
                              width: currentSlide === idx ? '24px' : '8px',
                            }}
                            onClick={() => setCurrentSlide(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Slide - Fixed Position */}
            <div className="relative" style={{ width: '220px', height: '340px', flexShrink: 0 }}>
              {CAROUSEL_ITEMS.map((item, index) => {
                const nextIndex = (currentSlide + 1) % CAROUSEL_ITEMS.length;
                const isVisible = index === nextIndex;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    animate={{
                      opacity: isVisible ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      pointerEvents: isVisible ? 'auto' : 'none',
                    }}
                  >
                    <div 
                      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => setCurrentSlide(nextIndex)}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <h3 className="text-xl mb-1">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section 
        className="py-16 relative"
        style={{ backgroundColor: COLORS.sandBeige }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 
            className="text-3xl text-center mb-12"
            style={{ color: COLORS.charcoalNavy }}
          >
            명예의 전당 - 최고의 공감 편지
          </h2>
          
          <div className="flex items-end justify-center gap-8">
            {HALL_OF_FAME.sort((a, b) => a.rank - b.rank).map((item) => {
              const styles = getRankStyles(item.rank);
              
              // Calculate card dimensions based on rank
              let cardWidth, cardHeight, medalSize, medalMargin;
              if (item.rank === 1) {
                cardWidth = '384px'; // 192px * 2
                cardHeight = '336px'; // Base 240px * 1.4
                medalSize = 'text-7xl';
                medalMargin = '-mb-8';
              } else if (item.rank === 2) {
                cardWidth = '264px'; // Base 240px * 1.1
                cardHeight = '230px'; // 288px * 4/5
                medalSize = 'text-6xl';
                medalMargin = '-mb-6';
              } else {
                cardWidth = '192px'; // 240px * 4/5
                cardHeight = '211px'; // 264px * 4/5
                medalSize = 'text-5xl';
                medalMargin = '-mb-4';
              }
              
              return (
                <motion.div
                  key={item.rank}
                  className={`${item.rank === 1 ? 'order-2' : item.rank === 2 ? 'order-1' : 'order-3'} relative`}
                  whileHover={{ y: -10 }}
                  style={{
                    width: cardWidth,
                  }}
                >
                  {/* Medal overlapping card */}
                  <div className={`${medalSize} ${medalMargin} text-center relative z-20`}>
                    {styles.medal}
                  </div>
                  
                  <div 
                    className="rounded-2xl p-6 text-center transition-all hover:shadow-2xl cursor-pointer" 
                    style={{ 
                      backgroundColor: COLORS.white,
                      height: cardHeight,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <h3 className="mb-3" style={{ color: COLORS.charcoalNavy }}>
                      {item.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: COLORS.darkGray }}>
                      {item.preview}
                    </p>
                    <div className="flex items-center justify-center gap-1" style={{ color: COLORS.coralRed }}>
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Empathy Archive Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 
                  className="text-3xl mb-2"
                  style={{ color: COLORS.charcoalNavy }}
                >
                  공감 아카이브
                </h2>
                <p style={{ color: COLORS.darkGray }}>
                  우리 커뮤니티의 이해와 성장 이야기
                </p>
              </div>
              
              {/* More Button Only */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => router.push(ROUTES.ARCHIVE_LIST)}
                  className="text-sm px-3 py-1 transition-all hover:opacity-70"
                  style={{ 
                    color: COLORS.darkGray,
                    backgroundColor: 'transparent',
                  }}
                >
                  더보기 →
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center h-[400px] lg:h-[360px]">
              {ARCHIVE_PREVIEW.map((item, index) => {
                const isMobile = false; // Will use CSS to hide/show
                const isTablet = false;
                const position = getCardPosition(index);
                const style = getArchiveCardStyle(index, isMobile, isTablet);
                
                // Calculate offset for positioning
                const cardWidth = 240;
                const gap = 32;
                const offsetX = position * (cardWidth + gap);
                
                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    animate={{
                      opacity: style.opacity,
                      filter: `blur(${style.blur}px)`,
                      y: style.translateY,
                      scale: style.scale,
                      x: offsetX,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      display: style.display,
                      width: '240px',
                    }}
                  >
                    <div
                      className="rounded-2xl p-6 cursor-pointer transition-shadow hover:shadow-2xl"
                      style={{
                        backgroundColor: `${COLORS.sandBeige}40`,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      onClick={() => router.push(`/archive/${item.id}`)}
                    >
                      {/* Content */}
                      <div className="flex-1 overflow-hidden">
                        <h4 
                          className="mb-3 line-clamp-2"
                          style={{ color: COLORS.charcoalNavy }}
                        >
                          {item.title}
                        </h4>
                        <p 
                          className="text-sm line-clamp-5"
                          style={{ color: COLORS.darkGray }}
                        >
                          {item.preview}
                        </p>
                      </div>
                      
                      {/* Footer */}
                      <div className="pt-4 mt-auto border-t" style={{ borderColor: COLORS.sandBeige }}>
                        <div className="flex items-center justify-between text-sm">
                          <span style={{ color: COLORS.darkGray }}>{item.author}</span>
                          <div className="flex items-center gap-1" style={{ color: COLORS.coralRed }}>
                            <Heart className="w-4 h-4 fill-current" />
                            <span>{item.hearts}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all border hover:bg-gray-100"
                style={{ 
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.sandBeige,
                }}
                onClick={handlePrevArchive}
              >
                <ChevronLeft className="w-4 h-4" style={{ color: COLORS.charcoalNavy }} />
              </button>

              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all border hover:bg-gray-100"
                style={{ 
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.sandBeige,
                }}
                onClick={handleNextArchive}
              >
                <ChevronRight className="w-4 h-4" style={{ color: COLORS.charcoalNavy }} />
              </button>
            </div>
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-8 lg:hidden">
            <Button onClick={() => router.push(ROUTES.ARCHIVE_LIST)}>
              모든 편지 보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}