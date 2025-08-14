import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const galleryImages = [
    '/img/gallery1.webp',
    '/img/gallery2.webp',
    '/img/gallery3.webp',
    '/img/gallery4.webp',
    '/img/gallery5.webp'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <section id="gallery" className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-black mb-8 lg:mb-12">Project Gallery</h1>
        
        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Images Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-64 md:h-80 lg:h-[500px] object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter Overlay */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentSlide + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6 lg:mt-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    goToSlide(index);
                  }
                }}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  index === currentSlide 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Thumbnails */}
          <div className="grid grid-cols-5 gap-2 lg:gap-4 mt-6 lg:mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    goToSlide(index);
                  }
                }}
                disabled={isTransitioning}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                  index === currentSlide 
                    ? 'ring-2 ring-blue-600 ring-offset-2' 
                    : 'hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-16 lg:h-24 object-cover"
                />
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-20"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'gallery' } }))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 lg:py-5 lg:px-16 rounded-lg transition-colors text-lg lg:text-xl"
          >
            Download Complete Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;