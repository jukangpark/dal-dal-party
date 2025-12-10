"use client";

import { motion } from "framer-motion";

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
              <span className="text-4xl">📸</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">실제 파티 사진으로 교체 예정</p>
      </div>
    </motion.section>
  );
};

export default GallerySection;

