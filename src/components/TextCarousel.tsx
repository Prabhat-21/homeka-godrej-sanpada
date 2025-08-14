import React from 'react';

const TextCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const messages = [
    "An investment with perfect blend of luxury, location, and long-term value in Seawoods",
    "A grand clubhouse (25,000 sqft) for social events and leisure activities", 
    "100 steps from Nexus Mall, Seawoods Station & Palm Beach Rd",
    "20 mins from upcoming Navi Mumbai International Airport"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % messages.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="mb-4 md:mb-6">
      {/* Message Display */}
      <div className="text-center mb-3 md:mb-4 min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center">
        <p className="text-white text-xs md:text-base transition-opacity duration-500 px-2">
          {messages[currentSlide]}
        </p>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2">
        {messages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-400' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;