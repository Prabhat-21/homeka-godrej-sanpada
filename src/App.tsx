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
              <Header />
              
              {/* Desktop Layout with Sticky Form */}
              <div className="hidden lg:flex">
                {/* Main Content Area - Adjusted padding for narrower form */}
                <div className="flex-1 pr-[350px]">
                  <BannerCarousel />
                  <About />
                  <FloorPlan />
                  <Pricing />
                  <Amenities />
                  <Gallery />
                  <Location />
                  {/* Removed Contact form for desktop as requested */}
                  <Contact />
                  <Footer />
                </div>
                
                {/* Sticky Enquiry Form - Starts below header */}
                <div className="w-[350px] fixed right-0 top-16 bottom-0 z-[999]">
                  <StickyEnquiryForm />
                </div>
              </div>
              
              {/* Mobile Layout - Normal stacked layout (unchanged) */}
              <div className="lg:hidden">
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
