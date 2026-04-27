import { MapPin, Calendar, Heart } from 'lucide-react';
import { Gallery } from './components/Gallery';
import { GuestBook } from './components/GuestBook';
import { AccountInfo } from './components/AccountInfo';
import { ShareButton } from './components/ShareButton';
import { ShareGuide } from './components/ShareGuide';
import { MapSection } from './components/MapSection';
import { FlowerPetal } from './components/FlowerPetal';
import { BgmPlayer } from './components/BgmPlayer';
import { motion } from 'motion/react';

export default function App() {
  const weddingDate = new Date('2026-07-11T11:00:00');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 max-w-2xl mx-auto pb-28 md:my-8 md:rounded-3xl md:border md:border-rose-100/60 md:shadow-xl overflow-hidden">
      {/* Flower Petal Animation */}
      <FlowerPetal />
      <BgmPlayer />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-rose-50/20 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-rose-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-100/20 rounded-full blur-3xl" />
        </div>
        <motion.div 
          className="relative text-center px-6 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-12 h-12 mx-auto text-rose-300 mb-8 fill-rose-200" />
          </motion.div>
          <motion.p 
            className="text-neutral-500 mb-4 tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            WEDDING INVITATION
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-6xl mb-6 text-neutral-900 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            준형 <span className="text-rose-300">&</span> 희진
          </motion.h1>
          <motion.div 
            className="w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9 }}
          />
          <motion.div 
            className="text-neutral-600 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xl">{weddingDate.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}</p>
            <p>오전 11시</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Invitation Message */}
      <section className="py-20 px-6 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-rose-200" />
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-8" />
          <p className="text-neutral-700 leading-relaxed text-lg">
            평생을 함께할 사람을 만났습니다.<br />
            저희 두 사람이 사랑과 믿음으로<br />
            한 가정을 이루게 되었습니다.<br />
            <br />
            귀한 걸음 하시어<br />
            저희의 새로운 시작을 축복해 주시면<br />
            큰 기쁨으로 간직하겠습니다.
          </p>
        </motion.div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-transparent to-rose-200" />
      </section>

      {/* Parents Info */}
      <section className="py-12 px-6 bg-gradient-to-b from-white to-rose-50/10">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-auto mb-12" />
          <div className="grid md:grid-cols-2 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-rose-400 mb-3 tracking-wider">GROOM</p>
              <p className="text-xl mb-6 text-neutral-900">준형</p>
              <div className="text-sm text-neutral-600 space-y-2">
                <p>우재태 · 김현숙 <span className="text-neutral-400">의 아들</span></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-rose-400 mb-3 tracking-wider">BRIDE</p>
              <p className="text-xl mb-6 text-neutral-900">희진</p>
              <div className="text-sm text-neutral-600 space-y-2">
                <p>故 송원섭 · 김영희 <span className="text-neutral-400">의 딸</span></p>
              </div>
            </motion.div>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-4" />
          <h2 className="text-center text-3xl mb-4 text-neutral-900">Gallery</h2>
          <p className="text-center text-sm text-neutral-500 mb-12">저희의 소중한 순간들</p>
          <Gallery />
        </div>
      </section>

      {/* Wedding Info */}
      <section className="py-20 px-6 bg-gradient-to-b from-rose-50/10 to-white">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-4" />
          <h2 className="text-center text-3xl mb-12 text-neutral-900">예식 정보</h2>
          <div className="space-y-6 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-rose-100/20">
            <div className="flex gap-4">
              <Calendar className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-neutral-900 mb-1">2026년 7월 11일 토요일</p>
                <p className="text-neutral-600 text-sm">오전 11시</p>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-neutral-900 mb-1">순천 아모르웨딩컨벤션</p>
                <p className="text-neutral-600 text-sm">그랜드블룸홀(4층)</p>
                <p className="text-neutral-600 text-sm">전라남도 순천시 서면 압곡길 94</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-4" />
          <h2 className="text-center text-3xl mb-12 text-neutral-900">오시는 길</h2>
          <MapSection 
            placeName="순천 아모르웨딩컨벤션 그랜드블룸홀(4층)"
            address="전라남도 순천시 서면 압곡길 94"
            kakaoMapUrl="https://kko.to/YmVHV70OVg"
            naverMapUrl="https://naver.me/F2ZbqQ2N"
            googleMapUrl="https://maps.app.goo.gl/4EdkLPf5TfrjS6eN7"
          />
        </div>
      </section>

      {/* Account Info */}
      <section className="py-20 px-6 bg-gradient-to-b from-rose-50/10 to-white">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-4" />
          <h2 className="text-center text-3xl mb-4 text-neutral-900">마음 전하실 곳</h2>
          <p className="text-center text-sm text-neutral-500 mb-12">
            참석이 어려우신 분들을 위해 계좌번호를 안내드립니다
          </p>
          <AccountInfo />
        </div>
      </section>

      {/* Guest Book */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-6 h-6 mx-auto text-rose-200 mb-4" />
          <h2 className="text-center text-3xl mb-4 text-neutral-900">방명록</h2>
          <p className="text-center text-sm text-neutral-500 mb-12">
            축하의 메시지를 남겨주세요
          </p>
          <GuestBook />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-b from-white to-rose-50/20 border-t border-rose-100/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Heart className="w-8 h-8 mx-auto text-rose-200 fill-rose-100 mb-4" />
            <p className="text-neutral-900 mb-2">준형 & 희진</p>
            <p className="text-sm text-neutral-500 mb-6">
              2026년 7월 11일 토요일 오전 11시
            </p>
          </div>
          <ShareGuide />
          <ShareButton />
        </div>
      </footer>
    </div>
  );
}