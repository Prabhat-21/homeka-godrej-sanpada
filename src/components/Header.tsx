import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleCloseMobileMenu = () => {
      setIsMenuOpen(false);
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handlePopupOpen = () => {
      // Close mobile menu when popup opens
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll listener when menu is open
    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    // Listen for popup events
    window.addEventListener('showEngagementPopup', handlePopupOpen);
    window.addEventListener('closeMobileMenu', handleCloseMobileMenu);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('showEngagementPopup', handlePopupOpen);
      window.removeEventListener('closeMobileMenu', handleCloseMobileMenu);
    };
  }, [isMenuOpen]);

  const smoothScrollTo = (elementId: string) => {
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        const headerHeight = 60; // Reduced header height for desktop
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({ 
          top: elementPosition, 
          behavior: 'smooth' 
        });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-[10001] h-20 lg:h-16">
      <div className="container mx-auto px-3 py-3 lg:py-2 max-w-7xl relative z-[10002] h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section - Larger and moved to left for desktop */}
          <div className="flex items-center">
            <img src="/img/comman/logo.svg" alt="L&T Realty Logo" className="h-12 lg:h-14 w-auto" />
          </div>

          {/* Desktop Navigation - Shows on large screens and up */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button onClick={() => smoothScrollTo('home')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Home</button>
            <button onClick={() => smoothScrollTo('overview')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Overview</button>
            <button onClick={() => smoothScrollTo('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Layout</button>
            <button onClick={() => smoothScrollTo('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Pricing</button>
            <button onClick={() => smoothScrollTo('amenities')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Amenities</button>
            <button onClick={() => smoothScrollTo('gallery')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Gallery</button>
            <button onClick={() => smoothScrollTo('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Location</button>
            <button onClick={() => smoothScrollTo('contact')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Contact</button>
          </nav>

          {/* Mobile menu button - only shows below lg breakpoint */}
          <button
            className="lg:hidden relative z-[10002] p-3 -m-3 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              minWidth: '44px', 
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - only shows below lg breakpoint */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4 relative z-[10001] bg-white shadow-lg">
            <div className="flex flex-col space-y-2">
              <button onClick={() => smoothScrollTo('home')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Home</button>
              <button onClick={() => smoothScrollTo('overview')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Overview</button>
              <button onClick={() => smoothScrollTo('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Layout</button>
              <button onClick={() => smoothScrollTo('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Pricing</button>
              <button onClick={() => smoothScrollTo('amenities')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Amenities</button>
              <button onClick={() => smoothScrollTo('gallery')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Gallery</button>
              <button onClick={() => smoothScrollTo('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Location</button>
              <button onClick={() => smoothScrollTo('contact')} className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors">Contact Us</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
