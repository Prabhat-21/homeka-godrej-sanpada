import React, { useState } from 'react';
import { ChevronDown, Signal, ShoppingCart, GraduationCap, Laptop, Guitar as Hospital, TreePine } from 'lucide-react';

const Location = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const locationData = {
    connectivity: [
      'Seawood Station - 2 Mins',
      'Palm Beach Road - 6 Mins',
      'Nerul Station - 7 Mins',
      'Mumbai Highway - 8 Mins',
      'Atal Setu - 16 Mins',
      'Proposed Navi Mumbai International Airport - 20 Mins',
      'Chhatrapati Shivaji Maharaj Airport - 35 Mins'
    ],
    shopping: [
      'Nexus Seawoods - 1 Mins',
      'Inorbit Mall Vashi - 10 Mins',
      'Little World Mall - 23 Mins'
    ],
    education: [
      'NCRDs Sterling Institutes - 4 Mins',
      'ORCHIDS The International School - 4 Mins',
      'S.K. College of Science and Commerce - 5 Mins',
      'Ryan International School - 6 Mins',
      'Podar International School - 6 Mins',
      'Don Bosco School - 7 Mins',
      'Apeejay School - 8 Mins',
      'St. Xaviers High School - 9 Mins',
      'DY Patil College of Engineering - 10 Mins',
      'SIES College of Arts, Science and Commerce - 20 Mins'
    ],
    techParks: [
      'International Technology Park - 9 Mins',
      'Plan I Business Park - 10 Mins',
      'VASHI InfoTech Park - 10 Mins',
      'Tech Hub IT Solutions - 12 Mins',
      'Global IT Park India Pvt Ltd - 16 Mins',
      'Sigma IT Park - 24 Mins',
      'Synergia IT Park - 24 Mins'
    ],
    hospitals: [
      'Terna Speciality Hospital & Research Centre - 6 Mins',
      'Maasaheb Meenatai Thackeray Hospital - 7 Mins',
      'Cloudnine Hospital - 8 Mins',
      'D Y Patil Hospital - 9 Mins',
      'Apollo Hospital, Navi Mumbai - 12 Mins',
      'MGM Hospital - 15 Mins',
      'Fortis Hospital - 20 Mins'
    ],
    recreation: [
      'Jewel of Navi Mumbai Garden - 3 Mins',
      'Nerul Lake - 5 Mins',
      'Karave Flamingo Point - 6 Mins',
      'Wonders Park - 7 Mins',
      'D Y Patil Sports Stadium - 9 Mins',
      'Kharghar Valley Golf Course - 18 Mins',
      'The Bombay Presidency Golf Club Ltd. - 24 Mins'
    ]
  };

  const accordionItems = [
    { key: 'connectivity', title: 'Connectivity', icon: Signal, data: locationData.connectivity },
    { key: 'shopping', title: 'Malls/Shopping centers', icon: ShoppingCart, data: locationData.shopping },
    { key: 'education', title: 'Education Hub', icon: GraduationCap, data: locationData.education },
    { key: 'techParks', title: 'Tech Parks', icon: Laptop, data: locationData.techParks },
    { key: 'hospitals', title: 'Hospitals', icon: Hospital, data: locationData.hospitals },
    { key: 'recreation', title: 'Recreation', icon: TreePine, data: locationData.recreation }
  ];

  return (
    <section id="connectivity" className="py-12 lg:py-20 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 lg:mb-8">L&T West Square Location Advantage</h2>
        <p className="text-base lg:text-lg text-gray-600 mb-12 lg:mb-16 max-w-4xl lg:max-w-6xl mx-auto leading-relaxed lg:leading-loose">
          LnT Seawoods, located in the heart of Navi Mumbai, is a prime location that offers a plethora of advantages to its residents. The area is well-connected to major highways and railway stations, making it easily accessible from all parts of Mumbai. It is also in close proximity to the upcoming Navi Mumbai International Airport, which is set to become a major transportation hub in the region. Seawoods is surrounded by lush greenery and boasts of a serene environment, making it an ideal place to live for those who seek a peaceful lifestyle.
        </p>

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