import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import DesktopBanner from './components/DesktopBanner';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import FloorPlan from './components/FloorPlan';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import CustomerDashboard from './components/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import EngagementPopups from './components/EngagementPopups';
import StickyFooter from './components/StickyFooter';
import ThankYou from './components/ThankYou';
import StickyEnquiryForm from './components/StickyEnquiryForm';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Router>
      <div className="min-h-screen">
        <EngagementPopups />
        <StickyFooter />
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/customers" element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <>
              {/* Desktop Layout with Integrated Design */}
              <div className="hidden lg:block">
                {/* Fixed Header with Form CTAs */}
                <div className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg">
                  <div className="flex h-20">
                    {/* Main Header Content - Full Width */}
                    <div className="flex-1 flex items-center px-6">
                      {/* Logo */}
                      <div className="mr-8">
                        <img src="/img/comman/logo.webp" alt="Godrej Properties" className="h-10 w-auto" />
                        <span className="text-xs text-gray-600">ETERNAL PALMS</span>
                      </div>
                      
                      {/* Navigation */}
                      <nav className="flex items-center space-x-6">
                        <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Home</button>
                        <button onClick={() => scrollToSection('overview')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Overview</button>
                        <button onClick={() => scrollToSection('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Layout</button>
                        <button onClick={() => scrollToSection('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Pricing</button>
                        <button onClick={() => scrollToSection('amenities')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Amenities</button>
                        <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Gallery</button>
                        <button onClick={() => scrollToSection('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Location</button>
                      </nav>
                      
                      {/* Partner Branding - Moved to left of CTAs */}
                      <div className="ml-auto mr-6 text-right">
                        <p className="text-xs text-gray-500">BY HOMEKA</p>
                        <p className="text-xs text-gray-600 font-medium">AUTHORIZED CHANNEL PARTNER</p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'site_visit' } }))}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm font-medium"
                        >
                          Organize Site Visit
                        </button>
                        <a 
                          href="tel:+919702978506" 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium flex items-center"
                        >
                          📞 +91 97029 78506
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content with Sidebar Layout */}
                <div className="flex pt-20">
                  {/* Main Content Area - Takes up space minus sidebar */}
                  <div className="flex-1 mr-[400px]">
                    {/* Desktop Banner with Overlay */}
                    <DesktopBanner />
                    
                    {/* Content Sections */}
                    <About />
                    <FloorPlan />
                    <Pricing />
                    <Amenities />
                    <Gallery />
                    <Location />
                    <Contact />
                    <Footer />
                  </div>
                  
                  {/* Sticky Form Sidebar - Fixed width */}
                  <div className="w-[400px] fixed right-0 top-20 bottom-0 z-[999]">
                    <StickyEnquiryForm />
                  </div>
                </div>
              </div>
              
              {/* Mobile Layout - Normal stacked layout (unchanged) */}
              <div className="lg:hidden">
                <Header />
                <BannerCarousel />
                <Hero />
                <About />
                <FloorPlan />
                <Pricing />
                <Amenities />
                <Gallery />
                <Location />
                <Contact />
                <Footer />
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
