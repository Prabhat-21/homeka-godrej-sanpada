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
              Introducing L&T West Square, the 5th and newest tower at Seawoods Residences by L&T Realty. Set in Navi Mumbai's most premium address, this low-density development offers exclusive 2 & 3 BHK homes with scenic views, smart layouts, and unmatched privacy. Crafted with L&T's hallmark construction quality, West Square blends elegance, comfort, and exclusivity in every detail.
            </p>
            <p className="mb-6">
              Part of a grand 40-acre Transit-Oriented Development, West Square places you at the center of it all - next to Seawoods Mall, Seawoods Station, and Palm Beach Road. From serene gardens to premium amenities like a pool, gym, and jacuzzi, every moment here is thoughtfully designed for effortless, elevated living.
            </p>
            <p className="mb-6">
              Experience luxury living with spacious 2 & 3 BHK apartments ranging from 1480 to 1640 sq. ft., and opulent 4 BHKs starting at 2900 sq. ft. Enjoy a vibrant lifestyle with a magnificent 2-floor clubhouse packed with leisure amenities for all ages. Embrace a holistic living experience in a thriving community that elevates your quality of life and investment potential.
            </p>
            <p className="mb-6">
              The project features world-class amenities including a swimming pool, state-of-the-art gymnasium, children's play area, landscaped gardens, jogging track, and much more. With its strategic location and premium offerings, L&T West Square represents the perfect blend of luxury, convenience, and long-term value appreciation.
            </p>
            <p>
              Discover a lifestyle that combines the tranquility of suburban living with the convenience of urban connectivity. L&T West Square is not just a home; it's a gateway to a premium lifestyle in one of Navi Mumbai's most sought-after locations.
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