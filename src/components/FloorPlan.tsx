import React from 'react';
import { Eye } from 'lucide-react';

const FloorPlan = () => {
  const [selectedPlan, setSelectedPlan] = React.useState('master');

  // Different images for each plan type - all should be floor plan layouts
  const planImages = {
    master: '/img/gsmap.jpg', // Using floor plan image for master plan
    '2bhk': '/img/2bhk-768w.jpg',  // 2 BHK floor plan
    '3bhk': '/img/4efbfbd6-0194-4e92-b5f0-75aac1a66021.jpg'   // Using same style for consistency (update with 3BHK plan when available)
  };

  // Plan buttons configuration
   const planButtons = [
    { 
      key: 'master', 
      label: 'Master Plan',
      popupType: 'master_plan' 
    },
    { 
      key: '2bhk', 
      label: '2 BHK',
      popupType: 'unit_layout' 
    },
    { 
      key: '3bhk', 
      label: '3 BHK',
      popupType: 'unit_layout' 
    }
  ];

  const handlePlanChange = (planKey) => {
    setSelectedPlan(planKey);
  };

  const handleViewPlan = () => {
    const selectedButton = planButtons.find(btn => btn.key === selectedPlan);
    window.dispatchEvent(new CustomEvent('showEngagementPopup', { 
      detail: { 
        type: selectedButton?.popupType || 'unit_layout',
        planType: selectedPlan 
      } 
    }));
  };

  return (
    <section id="floor-plan" className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-black mb-8 lg:mb-10">Layouts</h1>
        
        <div className="max-w-md mx-auto lg:max-w-5xl">
          {/* Toggle Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 lg:mb-10">
            {planButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => handlePlanChange(button.key)}
                className={`px-6 py-3 lg:px-8 lg:py-3.5 rounded-full font-semibold transition-all duration-200 text-sm lg:text-base ${
                  selectedPlan === button.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
          
          {/* Blurred Image with View Plan Button */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 bg-white">
            <div className="relative">
              <img
                src={planImages[selectedPlan]}
                alt={`L&T West Square ${selectedPlan === 'master' ? 'Master Plan' : selectedPlan.toUpperCase()} Layout`}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover filter blur-[10px] scale-105"
                onContextMenu={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              />
              
              {/* Overlay with View Plan Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={handleViewPlan}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 lg:py-4 lg:px-10 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <Eye className="w-5 h-5 lg:w-6 lg:h-6" style={{ transform: 'scaleX(-1)' }} />
                  <span>View plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorPlan;