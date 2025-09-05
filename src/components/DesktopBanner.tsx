import React, { useState, useEffect } from 'react';

const DesktopBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      src: '/img/banner/banner1.webp',
      alt: 'Godrej Sanpada - Luxury Residential Project'
    },
    {
      src: '/img/banner/banner2.webp',
      alt: 'Godrej Sanpada - Premium Amenities'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div id="home" className="relative h-[calc(100vh-80px)]">
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

      {/* Left Content Card */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md">
            <div className="text-center">
              <p className="text-blue-600 font-semibold text-sm mb-2">New Launch</p>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">Godrej Sanpada</h1>
              <p className="text-sm text-gray-600 mb-1">At Sanpada, Navi Mumbai</p>
              <p className="text-sm text-gray-600 mb-4">By Godrej Properties</p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">🏗️ 2 Towers • G+35 Storeys</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">🏡 Spacious Deck Homes</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">🌿 70% Open Green Spaces</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">🏖️ Palm Beach Road Location</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-2">Luxurious 2 & 3 BHK Starting At</p>
              <div className="text-3xl font-bold mb-4 text-gray-800">
                <span className="text-blue-600">Rs. 3.5 Cr*</span>
                <span className="text-xl ml-2">Onwards</span>
              </div>
              
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'costing' } }))}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
              >
                Check Full Price Break Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopBanner;
