import { MapPin, Navigation } from 'lucide-react';

interface MapSectionProps {
  placeName: string;
  address: string;
  kakaoMapUrl?: string;
  naverMapUrl?: string;
  googleMapUrl?: string;
}

export function MapSection({ placeName, address, kakaoMapUrl, naverMapUrl, googleMapUrl }: MapSectionProps) {
  // 카카오맵 열기
  const openKakaoMap = () => {
    if (kakaoMapUrl) {
      window.open(kakaoMapUrl, '_blank');
    }
  };

  // 네이버 지도 열기
  const openNaverMap = () => {
    if (naverMapUrl) {
      window.open(naverMapUrl, '_blank');
    }
  };

  // 구글 지도 열기
  const openGoogleMap = () => {
    if (googleMapUrl) {
      window.open(googleMapUrl, '_blank');
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-rose-100/60 shadow-sm">
      {/* 지도 영역 */}
      <div className="aspect-video bg-gradient-to-b from-rose-50/60 to-white flex items-center justify-center">
        <div className="text-center text-neutral-500 px-6">
          <MapPin className="w-12 h-12 mx-auto mb-4" />
          <p className="text-sm font-medium text-neutral-800">{placeName}</p>
          <p className="text-xs mt-2">
            아래 버튼을 눌러 카카오맵, 네이버지도, 구글맵에서 위치를 확인하세요
          </p>
        </div>
      </div>

      {/* 지도 앱 버튼 */}
      <div className="p-4 grid grid-cols-3 gap-2 bg-white/80 border-b border-rose-100/60">
        <button
          onClick={openKakaoMap}
          className="py-2.5 px-3 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-sm font-medium transition-colors"
        >
          카카오맵
        </button>
        <button
          onClick={openNaverMap}
          className="py-2.5 px-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
        >
          네이버지도
        </button>
        <button
          onClick={openGoogleMap}
          className="py-2.5 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors"
        >
          구글맵
        </button>
      </div>

      {/* 상세 정보 */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="mt-0.5 text-rose-400">
            <Navigation className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-neutral-900">{placeName}</p>
            <p className="text-sm text-neutral-600">{address}</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-neutral-700">
          <div>
            <p className="font-medium mb-1">기차</p>
            <p className="text-neutral-600">순천역에서 택시 이용 약 10분 소요</p>
          </div>
          <div>
            <p className="font-medium mb-1">버스</p>
            <p className="text-neutral-600">시내버스 이용 가능</p>
          </div>
          <div>
            <p className="font-medium mb-1">주차</p>
            <p className="text-neutral-600">건물 주차장 이용 가능</p>
          </div>
        </div>
      </div>
    </div>
  );
}