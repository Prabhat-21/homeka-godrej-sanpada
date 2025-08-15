import React, { useState, useEffect } from 'react';
import { ChevronDown, Signal, ShoppingCart, GraduationCap, Building2 } from 'lucide-react';

const Location = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const locationData = {
    connectivity: [
      'Sanpada Railway Station - 2 mins drive',
      'Vashi Railway Station - 5 mins drive',
      'Palm Beach Road - 1 min drive',
      'Sion-Panvel Highway - 8 mins drive',
      'Mumbai Trans Harbour Link (MTHL / Atal Setu) - 20 mins drive',
      'Navi Mumbai International Airport (Upcoming) - 25 mins drive'
    ],
    shopping: [
      'Inorbit Mall Vashi - 6 mins drive',
      'Raghuleela Mall - 5 mins drive',
      'Sagar Vihar - 7 mins drive',
      'Rock Garden Nerul - 10 mins drive'
    ],
    education: [
      'St. Mary\'s Multipurpose High School - 3 mins drive',
      'Fr. Agnel School & Junior College - 5 mins drive',
      'Ryan International School, Sanpada - 7 mins drive',
      'IES Navi Mumbai High School - 8 mins drive',
      'Karmaveer Bhaurao Patil College - 6 mins drive'
    ],
    hospitals: [
      'MGM Hospital Vashi - 7 mins drive',
      'Fortis Hiranandani Hospital - 10 mins drive',
      'Dr. D Y Patil Hospital Nerul - 15 mins drive',
      'Advanced Eye Hospital & Institute - 5 mins drive'
    ]
  };

  const accordionItems = [
    { key: 'connectivity', title: 'Connectivity', icon: Signal, data: locationData.connectivity },
    { key: 'shopping', title: 'Malls & Landmarks', icon: ShoppingCart, data: locationData.shopping },
    { key: 'education', title: 'Schools & Colleges', icon: GraduationCap, data: locationData.education },
    { key: 'hospitals', title: 'Hospitals', icon: Building2, data: locationData.hospitals }
  ];

  useEffect(() => {
    // Auto-open connectivity on desktop
    if (window?.innerWidth > 1080) {
      setActiveAccordion("connectivity");
    }
  }, []);

  return (
    <section id="connectivity" className="py-12 lg:py-20 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 lg:mb-8">Godrej Sanpada Location Advantage</h2>

        <div className="max-w-4xl lg:max-w-6xl mx-auto">
          <div className="space-y-4 lg:space-y-6">
            {accordionItems.map((item) => (
              <div key={item.key} className="bg-white rounded-xl shadow-lg overflow-hidden lg:shadow-xl">
                <button
                  className="w-full px-6 lg:px-8 py-4 lg:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveAccordion(activeAccordion === item.key ? null : item.key)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    <span className="font-semibold text-gray-800 lg:text-lg">{item.title}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 lg:w-6 lg:h-6 text-gray-500 transition-transform ${
                      activeAccordion === item.key ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {activeAccordion === item.key && (
                  <div className="px-6 lg:px-8 pb-4 lg:pb-6">
                    <ul className="space-y-2 lg:space-y-3">
                      {item.data.map((location, index) => (
                        <li key={index} className="text-gray-600 lg:text-lg flex items-start text-left">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0 min-w-[8px]"></span>
                          <span className="text-left leading-normal">{location}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
