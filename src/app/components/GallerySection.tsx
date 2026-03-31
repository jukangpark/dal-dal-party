"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "/육각형파티_후기/육각형파티1.jpeg",
  "/육각형파티_후기/육각형파티2.jpeg",
  "/육각형파티_후기/육각형파티3.jpeg",
  "/육각형파티_후기/육각형파티4.jpeg",
];

const GallerySection = () => {
  return (
    <motion.section
      id="gallery"
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#0e6d62]">실제 파티 사진</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`육각형파티 후기 ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GallerySection;

