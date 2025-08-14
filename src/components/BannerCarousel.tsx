import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner images
  const bannerImages = [
    {
      src: '/img/banner1_11zon.webp',
      alt: 'L&T West Square Seawoods - Luxury Residential Project'
    },
    {
      src: '/img/banner2_11zon.webp',
      alt: 'L&T West Square Seawoods - Premium Amenities'
    },
    {
      src: '/img/banner3_11zon.webp',
      alt: 'L&T West Square Seawoods - Modern Architecture'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-[450px] overflow-hidden bg-gray-200 z-30">
      {/* Banner Images */}
      <div className="relative w-full h-full">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Desktop Overlay - Updated to match mobile content */}
      <div className="hidden lg:block absolute inset-0 z-20">
        <div className="container mx-auto px-4 h-full flex items-center">
          {/* Left Content Card - Updated with mobile-like content */}
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-xs">
            <div className="text-center">
              <p className="text-blue-600 font-semibold text-xs mb-1">New Launch</p>
              <h1 className="text-xl font-bold mb-1 text-gray-800">
                L&T WEST SQUARE<br />
                SEAWOODS
              </h1>
              <p className="text-xs text-gray-600 mb-1">At Sector 40, Seawoods, Navi Mumbai</p>
              <p className="text-xs text-gray-600 mb-3">By L&T Realty</p>
              
              {/* EOI Benefits Box with Animation - Same as mobile */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-2 mb-3 animate-glow-pulse">
                <div className="space-y-1">
                  <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.2s' }}>
                    <span className="text-blue-600 font-semibold text-xs">✨ EOI Amount 50,000</span>
                  </div>
                  <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.4s' }}>
                    <span className="text-blue-600 font-semibold text-xs">🏠 Vaastu Compliant Homes</span>
                  </div>
                  <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.6s' }}>
                    <span className="text-blue-600 font-semibold text-xs">⚡ Last Tower. Last Chance.</span>
                  </div>
                  <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.8s' }}>
                    <span className="text-blue-600 font-semibold text-xs">🌟 Larger Balconies</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-xs mb-1 opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
                Luxurious 2 & 3 BHK Starting At
              </p>
              <div className="text-xl font-bold mb-3 text-gray-800 opacity-0 animate-fade-up" style={{ animationDelay: '1.2s' }}>
                <span className="text-blue-600">Rs. 2.17 Cr*</span>
                <span className="text-sm ml-1">Onwards</span>
              </div>
              
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'costing' } }))}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-xs transform hover:scale-105 hover:shadow-lg opacity-0 animate-fade-up"
                style={{ animationDelay: '1.4s' }}
              >
                Check Full Price Break Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* No overlay for mobile - Clean carousel view */}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 lg:w-2 lg:h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            } z-30 relative`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
