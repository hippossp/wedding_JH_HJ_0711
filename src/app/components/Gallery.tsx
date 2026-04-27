import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, type CSSProperties, type TouchEvent, type WheelEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const galleryImages = [
  {
    id: 1,
    src: '/photos/wedding-1.jpg',
    alt: '웨딩 사진 1',
  },
  {
    id: 2,
    src: '/photos/wedding-2.jpg',
    alt: '웨딩 사진 2',
  },
  {
    id: 3,
    src: '/photos/wedding-3.jpg',
    alt: '웨딩 사진 3',
  },
  {
    id: 4,
    src: '/photos/wedding-4.jpg',
    alt: '웨딩 사진 4',
  },
  {
    id: 5,
    src: '/photos/wedding-5.jpg',
    alt: '웨딩 사진 5',
  },
  {
    id: 6,
    src: '/photos/wedding-6.jpg',
    alt: '웨딩 사진 6',
  },
  {
    id: 7,
    src: '/photos/wedding-7.jpg',
    alt: '웨딩 사진 7',
  },
  {
    id: 8,
    src: '/photos/wedding-8.jpg',
    alt: '웨딩 사진 8',
  },
  {
    id: 9,
    src: '/photos/wedding-9.jpg',
    alt: '웨딩 사진 9',
  },
  {
    id: 10,
    src: '/photos/wedding-10.jpg',
    alt: '웨딩 사진 10',
  },
  {
    id: 11,
    src: '/photos/wedding-11.jpg',
    alt: '웨딩 사진 11',
  },
  {
    id: 12,
    src: '/photos/wedding-12.jpg',
    alt: '웨딩 사진 12',
  },
  {
    id: 13,
    src: '/photos/wedding-13.jpg',
    alt: '웨딩 사진 13',
  },
  {
    id: 14,
    src: '/photos/wedding-14.jpg',
    alt: '웨딩 사진 14',
  },
  {
    id: 15,
    src: '/photos/wedding-15.jpg',
    alt: '웨딩 사진 15',
  },
  {
    id: 16,
    src: '/photos/wedding-16.jpg',
    alt: '웨딩 사진 16',
  },
];

const protectedImageStyle = {
  touchAction: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
} as CSSProperties;

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  const preventContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const preventPinchZoom = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  };

  const preventTrackpadZoom = (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.button
            key={image.id}
            type="button"
            className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedImage(image)}
            aria-label={`${image.alt} 크게 보기`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="pointer-events-none w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <span
              className="absolute inset-0 z-10"
              onContextMenu={preventContextMenu}
              aria-hidden="true"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/75 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage.alt} 확대 보기`}
            onContextMenu={preventContextMenu}
            onTouchMove={preventPinchZoom}
            onWheel={preventTrackpadZoom}
            style={protectedImageStyle}
          >
            <motion.div
              className="relative max-h-[88vh] w-full max-w-xl rounded-[2rem] border-[14px] border-white bg-white p-2 shadow-2xl ring-1 ring-rose-100"
              initial={{ opacity: 0, scale: 0.86, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
              onContextMenu={preventContextMenu}
              onTouchMove={preventPinchZoom}
              onWheel={preventTrackpadZoom}
              style={protectedImageStyle}
            >
              <div
                className="relative overflow-hidden rounded-[1.25rem] bg-neutral-100"
                onContextMenu={preventContextMenu}
                onTouchMove={preventPinchZoom}
                style={protectedImageStyle}
              >
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="pointer-events-none max-h-[74vh] w-full object-contain"
                  draggable={false}
                  onContextMenu={preventContextMenu}
                  onTouchMove={preventPinchZoom}
                  style={protectedImageStyle}
                />
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={preventContextMenu}
                  onTouchMove={preventPinchZoom}
                  style={protectedImageStyle}
                  aria-hidden="true"
                />
              </div>
              <button
                type="button"
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-neutral-700 shadow-lg ring-1 ring-neutral-200"
                onClick={() => setSelectedImage(null)}
                aria-label="확대 사진 닫기"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
