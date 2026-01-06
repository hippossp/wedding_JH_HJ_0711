import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1765350226723-a96ab0705403?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjU5NzY4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: '웨딩 사진 1',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHdoaXRlfGVufDF8fHx8MTc2NTk3Njg0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: '웨딩 사진 2',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1696204868903-91d809b4df09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjB2ZW51ZXxlbnwxfHx8fDE3NjU5NDA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: '웨딩 사진 3',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1737498205245-dbb396c262ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBsb3ZlfGVufDF8fHx8MTc2NTk3Njg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: '웨딩 사진 4',
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
          />
        </motion.div>
      ))}
    </div>
  );
}