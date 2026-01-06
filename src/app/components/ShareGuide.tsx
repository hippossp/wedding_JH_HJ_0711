import { motion } from 'motion/react';
import { MessageCircle, Share2, Link } from 'lucide-react';

export function ShareGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100"
    >
      <h3 className="text-xl text-center mb-6 text-neutral-900">청첩장 공유하기</h3>
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100/50">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 mb-1">카카오톡으로 공유</p>
              <p className="text-xs text-neutral-600">
                오른쪽 하단의 공유 버튼을 눌러 카카오톡으로 친구들에게 청첩장을 전송하세요
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100/50">
          <div className="flex items-start gap-3">
            <Link className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 mb-1">링크 복사하기</p>
              <p className="text-xs text-neutral-600">
                공유 버튼을 눌러 링크를 복사한 후 원하는 곳에 붙여넣으세요
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100/50">
          <div className="flex items-start gap-3">
            <Share2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900 mb-1">SNS로 공유</p>
              <p className="text-xs text-neutral-600">
                공유 버튼을 눌러 인스타그램, 페이스북 등 다양한 채널로 공유할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-rose-200">
        <p className="text-xs text-center text-neutral-500">
          💌 모바일에서 가장 예쁘게 보입니다
        </p>
      </div>
    </motion.div>
  );
}
