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
                {/* Fixed Header */}
                <div className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg">
                  <div className="h-20 px-6 flex items-center">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 mr-8">
                      <img src="/img/comman/logo.webp" alt="Godrej Properties" className="h-10 w-auto" />
                    </div>
                    
                    {/* Navigation */}
                    <nav className="flex items-center space-x-6 flex-1">
                      <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Home</button>
                      <button onClick={() => scrollToSection('overview')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Overview</button>
                      <button onClick={() => scrollToSection('floor-plan')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Layout</button>
                      <button onClick={() => scrollToSection('sc-price')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Pricing</button>
                      <button onClick={() => scrollToSection('amenities')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Amenities</button>
                      <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Gallery</button>
                      <button onClick={() => scrollToSection('connectivity')} className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">Location</button>
                    </nav>
                    
                    {/* Right Section with Branding and CTAs */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      {/* Partner Branding */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500 leading-tight">BY HOMEKA</p>
                        <p className="text-xs text-gray-600 font-medium leading-tight">AUTHORIZED CHANNEL PARTNER</p>
                      </div>

                      {/* CTA Buttons */}
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'site_visit' } }))}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        Organize Site Visit
                      </button>
                      <a 
                        href="tel:+919702978506" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center"
                      >
                        <span>📞 +91 97029 78506</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Main Content with Sidebar Layout */}
                <div className="flex pt-20">
                  {/* Main Content Area */}
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
                  
                  {/* Sticky Form Sidebar */}
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
