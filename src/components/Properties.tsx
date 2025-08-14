import React from 'react';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

const Properties = () => {
  const properties = [
    {
      id: 1,
      title: '2 BHK Apartment',
      price: '₹1.20 Cr onwards',
      area: '650-750 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      image: '/screenshot-2025-07-27-5-39-37-PM.png',
      features: ['Ready to Move', 'Modular Kitchen', 'Premium Flooring', 'Covered Parking']
    },
    {
      id: 2,
      title: '2 BHK Premium',
      price: '₹1.35 Cr onwards',
      area: '750-850 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      image: '/screenshot-2025-07-27-5-39-43-PM.png',
      features: ['Ready to Move', 'Spacious Layout', 'Modern Fixtures', 'Premium Amenities']
    },
    {
      id: 3,
      title: '3 BHK Apartment',
      price: '₹1.75 Cr onwards',
      area: '950-1100 sq ft',
      bedrooms: 3,
      bathrooms: 3,
      image: '/screenshot-2025-07-27-5-46-40-PM.png',
      features: ['Ready to Move', 'Master Bedroom', 'Spacious Rooms', 'Premium Location']
    }
  ];

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Available Properties</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully designed 2 & 3 BHK apartments with modern amenities and premium finishes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Available
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Godrej Sanpada</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">{property.price}</div>
                  <div className="text-gray-600">{property.area}</div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'costing' } }))}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'site_visit' } }))}
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'general' } }))}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-colors"
          >
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default Properties;