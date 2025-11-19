'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Card } from '../../commons/components';
import { COLORS, ROUTES } from '../../commons/constants';
import { Heart, MessageCircle, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';

type SortOption = 'latest' | 'likes' | 'comments';
type FilterOption = 'all' | 'parent' | 'child';

const MOCK_POSTS = [
  {
    id: 1,
    title: '통금이 전쟁터가 되었을 때',
    preview: '딸이 2시간이나 늦게 들어왔고, 저는 화를 냈어요...',
    author: 'parent',
    likes: 89,
    comments: 23,
    views: 456,
    date: '2025-11-10',
  },
  {
    id: 2,
    title: '우리를 변화시킨 휴대폰 논쟁',
    preview: '엄마가 제 휴대폰을 일주일 동안 빼앗아 갔어요. 너무 화가 났는데...',
    author: 'child',
    likes: 156,
    comments: 45,
    views: 892,
    date: '2025-11-12',
  },
  {
    id: 3,
    title: '상처 주는 말을 한 이유',
    preview: '감정이 격해진 순간, 아들에게 깊이 후회되는 말을 했어요...',
    author: 'parent',
    likes: 203,
    comments: 67,
    views: 1024,
    date: '2025-11-13',
  },
  {
    id: 4,
    title: '부모님의 엄격함을 이해하며',
    preview: '묘가 도와주기 전까지는 왜 그렇게 엄격한지 이해하지 못했어요...',
    author: 'child',
    likes: 134,
    comments: 38,
    views: 678,
    date: '2025-11-11',
  },
  {
    id: 5,
    title: '식탁 위의 침묵',
    preview: '몇 주 동안 우리는 침묵 속에서 식사를 했어요. 둘 다 침묵을 깨는 방법을 몰랐죠...',
    author: 'parent',
    likes: 98,
    comments: 21,
    views: 432,
    date: '2025-11-09',
  },
];

export function ArchiveListPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const getSortedPosts = () => {
    let filtered = MOCK_POSTS;

    // Apply filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(post => post.author === filterBy);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        case 'latest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  const sortedPosts = getSortedPosts();

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">💌</div>
            <h1 className="text-4xl mb-3" style={{ color: COLORS.charcoalNavy }}>
              공감 아카이브
            </h1>
            <p style={{ color: COLORS.darkGray }}>
              우리 커뮤니티의 이해와 성장 이야기
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: COLORS.darkGray }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이야기 검색..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-sm"
                style={{
                  borderColor: COLORS.sandBeige,
                  backgroundColor: COLORS.white,
                  color: COLORS.charcoalNavy,
                }}
              />
            </div>

            {/* Sort and Filter Options */}
            <div className="flex gap-3 flex-wrap items-center p-4 rounded-xl" style={{ backgroundColor: COLORS.sandBeige + '40' }}>
              <div className="flex gap-2 items-center">
                <span className="text-sm" style={{ color: COLORS.charcoalNavy }}>
                  정렬:
                </span>
                {(['latest', 'likes', 'comments'] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: sortBy === option ? COLORS.apricotCoral : COLORS.white,
                      color: sortBy === option ? COLORS.white : COLORS.charcoalNavy,
                      border: sortBy === option ? 'none' : `1px solid ${COLORS.sandBeige}`,
                    }}
                  >
                    {option === 'latest' ? '최신순' : option === 'likes' ? '좋아요순' : '공감순'}
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-gray-300" />

              <div className="flex gap-2 items-center">
                <span className="text-sm" style={{ color: COLORS.charcoalNavy }}>
                  필터:
                </span>
                {(['all', 'parent', 'child'] as FilterOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterBy(option)}
                    className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: filterBy === option ? COLORS.sageGreen : COLORS.white,
                      color: filterBy === option ? COLORS.white : COLORS.charcoalNavy,
                      border: filterBy === option ? 'none' : `1px solid ${COLORS.sandBeige}`,
                    }}
                  >
                    {option === 'all' ? '전체' : option === 'parent' ? '부모' : '자녀'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  hover
                  onClick={() => router.push(`/archive/${post.id}`)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: post.author === 'parent' ? COLORS.softTerra + '30' : COLORS.sageGreen + '30',
                            color: post.author === 'parent' ? COLORS.softTerra : COLORS.sageGreen,
                          }}
                        >
                          {post.author === 'parent' ? '👨‍👩‍👧 부모' : '👦 자녀'}
                        </span>
                      </div>
                      <h3 className="mb-2" style={{ color: COLORS.charcoalNavy }}>
                        {post.title}
                      </h3>
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: COLORS.darkGray }}>
                        {post.preview}
                      </p>
                      <div className="flex gap-6 text-sm" style={{ color: COLORS.darkGray }}>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                style={{ 
                  border: `1px solid ${COLORS.sandBeige}`,
                  backgroundColor: COLORS.white,
                }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: COLORS.charcoalNavy }} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10 h-10 rounded-lg transition-all hover:scale-105"
                    style={{
                      backgroundColor: currentPage === i + 1 ? COLORS.apricotCoral : COLORS.white,
                      color: currentPage === i + 1 ? COLORS.white : COLORS.charcoalNavy,
                      border: currentPage === i + 1 ? 'none' : `1px solid ${COLORS.sandBeige}`,
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                style={{ 
                  border: `1px solid ${COLORS.sandBeige}`,
                  backgroundColor: COLORS.white,
                }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: COLORS.charcoalNavy }} />
              </button>
            </div>
          )}

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: COLORS.darkGray }}>
                이야기를 찾을 수 없어요. 필터를 조정해보세요.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}