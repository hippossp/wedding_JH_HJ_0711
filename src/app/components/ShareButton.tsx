import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ShareButton() {
  const [shared, setShared] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: '준형 ♥ 희진 결혼식 초대',
      text: '저희 두 사람의 결혼식에 초대합니다.\n\n2026년 7월 11일 토요일 오전 11시\n아모르웨딩 4층 (전라남도 순천시)\n\n따뜻한 마음으로 축복해 주시면 감사하겠습니다.',
      url: window.location.href,
    };

    try {
      // Web Share API 지원 여부 확인 (모바일에서 주로 지원)
      if (navigator.share) {
        await navigator.share(shareData);
        setShared(true);
        setShowMenu(false);
        setTimeout(() => setShared(false), 2000);
      } else {
        // 데스크톱에서는 메뉴 표시
        setShowMenu(!showMenu);
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우 등
      console.log('공유 취소:', error);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setShowMenu(false);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.log('복사 실패:', error);
    }
  };

  const shareToKakao = () => {
    // 카카오톡 공유를 위한 URL 스킴
    const text = encodeURIComponent('준형 ♥ 희진 결혼식에 초대합니다\n\n2026년 7월 11일 토요일 오전 11시\n아모르웨딩 4층');
    const url = encodeURIComponent(window.location.href);
    
    // 모바일 카카오톡 앱으로 공유 시도
    const kakaoScheme = `kakaotalk://send?text=${text}\n${url}`;
    
    // 카카오톡 앱이 없을 경우를 대비한 fallback
    window.location.href = kakaoScheme;
    
    setShowMenu(false);
  };

  return (
    <div
      className="fixed z-50"
      style={{
        right: '1.5rem',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden mb-2"
          >
            <button
              onClick={shareToKakao}
              className="flex items-center gap-3 px-6 py-3 hover:bg-rose-50 transition-colors w-full text-left border-b border-rose-50"
            >
              <MessageCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-neutral-700">카카오톡 공유</span>
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-3 px-6 py-3 hover:bg-rose-50 transition-colors w-full text-left"
            >
              <Copy className="w-5 h-5 text-rose-400" />
              <span className="text-sm text-neutral-700">링크 복사</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleShare}
        className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="청첩장 공유하기"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {shared ? (
          <Check className="w-6 h-6" />
        ) : (
          <Share2 className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}