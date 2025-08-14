import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft, Phone, MessageCircle } from 'lucide-react';

const ThankYou = () => {
  const [redirectCancelled, setRedirectCancelled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(10);

  useEffect(() => {
    // Auto redirect after 10 seconds unless cancelled
    const timer = setTimeout(() => {
      if (!redirectCancelled) {
        window.location.href = '/';
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [redirectCancelled]);

  useEffect(() => {
    // Countdown timer
    if (!redirectCancelled && countdown > 0) {
      const countdownTimer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(countdownTimer);
    }
  }, [countdown, redirectCancelled]);

  const handleCTAClick = () => {
    setRedirectCancelled(true);
  };

  const handleWhatsAppClick = () => {
    setRedirectCancelled(true);
    const whatsappUrl = 'https://wa.me/919702978506?text=I%20am%20interested%20in%20L%26T%20WestSquare%20at%20seawoods%2C%20please%20share%20all%20the%20details';
    
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      if (whatsappWindow && whatsappWindow.location.href === 'about:blank') {
        whatsappWindow.close();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thanks for the enquiry, our team will contact you soon.
          </p>
          <p className="text-sm text-gray-500">
            We appreciate your interest in L&T West Square Seawoods.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Our expert will call you within 24 hours</li>
            <li>• Get personalized project information</li>
            <li>• Schedule your site visit</li>
            <li>• Receive exclusive pricing details</li>
          </ul>
        </div>

        <div className="flex space-x-3 mb-6">
          <button 
            onClick={() => {
              handleCTAClick();
              window.open('tel:+919702978506', '_self');
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </button>
          <button 
            onClick={handleWhatsAppClick}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {!redirectCancelled && (
          <p className="text-xs text-gray-400 mt-4">
            Redirecting to home page in {countdown} seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default ThankYou;