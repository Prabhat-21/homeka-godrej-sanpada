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
                {/* Fixed Header - Reduced height and logo size */}
                <div className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg">
                  <div className="h-16 px-6 flex items-center">
                    {/* Logo Section with Project Name */}
                    <div className="flex-shrink-0 flex items-center space-x-3">
                      <img src="/img/comman/godrej_logo.png" alt="Godrej Logo" className="h-8 w-auto" />
                      <span className="text-gray-800 font-semibold text-sm tracking-wider">ETERNAL PALMS</span>
                    </div>
                    
                    {/* Navigation - Moved to right */}
                    <nav className="flex items-center space-x-6 ml-auto mr-6">
                      <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Home</button>
                      <button onClick={() => scrollToSection('overview')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Overview</button>
                      <button onClick={() => scrollToSection('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Layout</button>
                      <button onClick={() => scrollToSection('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Pricing</button>
                      <button onClick={() => scrollToSection('amenities')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Amenities</button>
                      <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Gallery</button>
                      <button onClick={() => scrollToSection('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Location</button>
                    </nav>
                    
                    {/* Right Section with CTAs */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      {/* CTA Buttons */}
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'site_visit' } }))}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        Organize Site Visit
                      </button>
                      <a 
                        href="tel:+919702978506" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center"
                      >
                        <span>📞 +91 97029 78506</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Main Content with Sidebar Layout - Adjusted for smaller header */}
                <div className="flex pt-16">
                  {/* Main Content Area */}
                  <div className="flex-1 mr-[420px]">
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
                  
                  {/* Sticky Form Sidebar - Full edge alignment */}
                  <div className="w-[400px] fixed right-0 top-16 bottom-0 z-[999]">
                    <div className="h-full bg-white shadow-2xl">
                      <StickyEnquiryForm />
                    </div>
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
