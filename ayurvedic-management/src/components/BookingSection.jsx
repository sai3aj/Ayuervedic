import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaClock } from 'react-icons/fa';

const BookingSection = () => {
  return (
    <section className="py-16 bg-herb-green text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Book Your Ayurvedic Consultation Today
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Take the first step towards holistic wellness by scheduling a consultation with our 
              experienced Ayurvedic practitioners. Discover your unique constitution and receive 
              personalized treatment recommendations.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-full mr-4">
                  <FaUserMd className="text-sand text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Expert Practitioners</h4>
                  <p className="text-white/80">Consultations with certified Ayurvedic doctors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-full mr-4">
                  <FaCalendarAlt className="text-sand text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Convenient Scheduling</h4>
                  <p className="text-white/80">Choose appointment times that work for you</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-full mr-4">
                  <FaClock className="text-sand text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Thorough Assessment</h4>
                  <p className="text-white/80">In-depth 45-minute initial consultations</p>
                </div>
              </div>
            </div>
            
            <Link to="/book" className="bg-white text-herb-green px-6 py-3 rounded-md font-medium hover:bg-sand transition-all duration-300 inline-block">
              Schedule an Appointment
            </Link>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" 
                alt="Ayurvedic consultation" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-turmeric/20 rounded-full -z-10"></div>
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-sand/30 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection; 