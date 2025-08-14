import React from 'react';

const About = () => {
  return (
    <section id="overview" className="py-12 lg:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-black mb-8 lg:mb-8 text-center">Overview of the project</h1>
        
        {/* Scrollable content container */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg mb-6 lg:mb-6 text-center max-w-6xl mx-auto">
          <div className="max-h-64 lg:max-h-72 overflow-y-auto pr-4 lg:pr-0 text-gray-700 leading-relaxed lg:leading-loose text-base lg:text-lg">
            <p className="mb-6">
              Godrej Sanpada is the latest ultra-premium offering by Godrej Properties, located in the heart of Sanpada, Navi Mumbai. Spread across 4.5 acres with 3 luxurious residential towers, this under-construction development offers a fine blend of location, connectivity, and lifestyle.

            </p>
            <p className="mb-6">
              Each home comes with a private deck and elegant finishes, designed for families who value both space and comfort. With limited-period launch offers and a 25:75 payment plan, this is the ideal time to invest in Sanpada’s most awaited landmark.
            </p>
          </div>
        </div>
        
        {/* Download Brochure CTA */}
        <div className="text-center">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'brochure' } }))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 lg:py-3 lg:px-12 rounded-lg transition-colors text-lg lg:text-xl"
          >
            Download brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;