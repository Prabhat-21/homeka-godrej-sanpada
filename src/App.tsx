import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
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
              {/* Desktop Layout with Integrated Header and Form */}
              <div className="hidden lg:block">
                {/* Integrated Header with Form */}
                <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-[1000]">
                  {/* Top CTAs Bar */}
                  <div className="bg-gray-50 border-b border-gray-200 py-2">
                    <div className="container mx-auto px-4 flex justify-end space-x-4">
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'site_visit' } }))}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-medium"
                      >
                        Organize Site Visit
                      </button>
                      <a 
                        href="tel:+919916831630" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-medium flex items-center"
                      >
                        📞 +91 9916831630
                      </a>
                    </div>
                  </div>

                  {/* Main Header */}
                  <div className="flex h-16">
                    {/* Left Logo Section */}
                    <div className="flex items-center px-4 border-r border-gray-200">
                      <img src="/img/comman/logo.webp" alt="Godrej Properties" className="h-8 w-auto" />
                    </div>

                    {/* Center Navigation */}
                    <div className="flex-1 flex items-center justify-center">
                      <nav className="flex items-center space-x-6">
                        <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Home</button>
                        <button onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Overview</button>
                        <button onClick={() => document.getElementById('floor-plan')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Layout</button>
                        <button onClick={() => document.getElementById('sc-price')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Pricing</button>
                        <button onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Amenities</button>
                        <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Gallery</button>
                        <button onClick={() => document.getElementById('connectivity')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Location</button>
                      </nav>
                    </div>

                    {/* Right Partner Branding */}
                    <div className="flex items-center px-4 bg-gray-50 border-l border-gray-200">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">BY PROPERTYPISTOL</p>
                        <p className="text-xs text-gray-600 font-medium">AUTHORIZED CHANNEL PARTNER</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area with Sticky Form */}
                <div className="flex pt-24">
                  {/* Main Content */}
                  <div className="flex-1 pr-[350px]">
                    {/* Larger Banner */}
                    <div id="home" className="h-[600px]">
                      <BannerCarousel />
                    </div>
                    
                    {/* Content sections with reduced padding */}
                    <div className="space-y-0">
                      <About />
                      <FloorPlan />
                      <Pricing />
                      <Amenities />
                      <Gallery />
                      <Location />
                      <Contact />
                      <Footer />
                    </div>
                  </div>
                  
                  {/* Sticky Enquiry Form */}
                  <div className="w-[350px] fixed right-0 top-24 bottom-0 z-[999]">
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
