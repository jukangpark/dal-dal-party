"use client";

import Banner from "./components/Banner";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import StatusSection from "./components/StatusSection";
import CostSection from "./components/CostSection";
import ReviewsSection from "./components/ReviewsSection";
import GallerySection from "./components/GallerySection";
import ApplySection from "./components/ApplySection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <Header />
      
      {/* 배너 - 헤더가 fixed이므로 그대로 배치 */}
      <Banner />

      {/* 섹션들 */}
      <IntroSection />
      <StatusSection />
      <CostSection />
      <ReviewsSection />
      <GallerySection />
      <ApplySection />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
