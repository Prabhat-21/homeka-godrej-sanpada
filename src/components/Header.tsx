import React, { useState, useEffect } from 'react';
import { Menu, X, Home, DollarSign, Layout, Wifi, MapPin, Download } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();

    const handleCloseMobileMenu = () => {
      setIsMenuOpen(false);
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handlePopupOpen = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      checkMobile();
    };

    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('showEngagementPopup', handlePopupOpen);
    window.addEventListener('closeMobileMenu', handleCloseMobileMenu);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('showEngagementPopup', handlePopupOpen);
      window.removeEventListener('closeMobileMenu', handleCloseMobileMenu);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const smoothScrollTo = (elementId: string) => {
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        const headerHeight = 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'sc-price', label: 'Proposed Price', icon: DollarSign },
    { id: 'floor-plan', label: 'Site Plan', icon: Layout },
    { id: 'amenities', label: 'Amenities', icon: Wifi },
    { id: 'connectivity', label: 'Location', icon: MapPin },
    { id: 'gallery', label: 'Gallery', icon: Home },
    { id: 'contact', label: 'Contact', icon: Home },
    { id: 'brochure', label: 'Brochure', icon: Download, action: 'popup' }
  ];

  const handleMobileMenuClick = (item: any) => {
    if (item.action === 'popup') {
      window.dispatchEvent(new CustomEvent('showEngagementPopup', { 
        detail: { type: 'brochure' } 
      }));
      setIsMenuOpen(false);
    } else {
      smoothScrollTo(item.id);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-[10001] h-16 lg:h-20">
      <div className="container mx-auto px-3 py-2 lg:py-2 max-w-7xl relative z-[10002] h-full">
        <div className="flex items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src="/img/comman/logo.webp" alt="Godrej Properties Logo" className="h-6 lg:h-8 w-auto" />
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 mx-auto">
            <button onClick={() => smoothScrollTo('home')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Home</button>
            <button onClick={() => smoothScrollTo('overview')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Overview</button>
            <button onClick={() => smoothScrollTo('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Layout</button>
            <button onClick={() => smoothScrollTo('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Pricing</button>
            <button onClick={() => smoothScrollTo('amenities')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Amenities</button>
            <button onClick={() => smoothScrollTo('gallery')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Gallery</button>
            <button onClick={() => smoothScrollTo('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Location</button>
            <button onClick={() => smoothScrollTo('contact')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Contact</button>
          </nav>

          {/* Mobile menu button */}
          {isMobile && (
            <button
              className="relative z-[10002] p-3 -m-3 touch-manipulation ml-auto"
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
          )}
        </div>

        {/* Mobile Navigation - Simplified dropdown style */}
        {isMobile && isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-[10001]">
            <div className="py-2">
              {mobileMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileMenuClick(item)}
                  className="w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Bottom branding with larger logo */}
              <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/img/comman/homeka_logo.jpg" alt="Homeka Logo" className="h-6 w-auto" />
                    <span className="text-xs text-gray-500">HOMEKA CLUB PVT LTD</span>
                  </div>
                  <span className="text-xs text-gray-500">AUTHORIZED PARTNER</span>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
