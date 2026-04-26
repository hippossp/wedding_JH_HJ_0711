import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

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
];

export function Gallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {galleryImages.map((image, index) => (
        <motion.div
          key={image.id}
          className="aspect-square overflow-hidden rounded-lg bg-neutral-100"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}