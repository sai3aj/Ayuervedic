import { InlineWidget } from 'react-calendly';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';

const doctors = [
  {
    id: 1,
    name: 'Dr. Arjun Sharma',
    specialty: 'Ayurvedic Physician',
    experience: '15+ years',
    calendlyUrl: 'https://calendly.com/arjunsharma/ayurvedic-consultation',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. Priya Patel',
    specialty: 'Panchakarma Specialist',
    experience: '12+ years',
    calendlyUrl: 'https://calendly.com/priyapatel/panchakarma-consultation',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Vikram Mehta',
    specialty: 'Ayurvedic Nutrition',
    experience: '10+ years',
    calendlyUrl: 'https://calendly.com/vikrammehta/nutrition-consultation',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Anjali Desai',
    specialty: 'Yoga & Meditation',
    experience: '8+ years',
    calendlyUrl: 'https://calendly.com/anjalidesai/yoga-consultation',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop'
  }
];

const BookingCalendly = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const { user } = useSupabase();
  const navigate = useNavigate();

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingClick = () => {
    // If user is not authenticated, redirect to login
    if (!user) {
      // Save selected doctor and redirect info
      sessionStorage.setItem('selectedDoctorId', selectedDoctor.id);
      sessionStorage.setItem('redirectAfterLogin', '/book');
      navigate('/login');
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-leaf-green mb-4">
          Book Your Consultation
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Select a practitioner and schedule your appointment using our convenient online booking system.
        </p>
        <div className="w-20 h-1 bg-turmeric mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor Selection */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-heading font-semibold text-herb-green mb-4">
            Choose a Practitioner
          </h3>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                onClick={() => handleDoctorSelect(doctor)}
                className={`card cursor-pointer transition-all duration-300 ${
                  selectedDoctor.id === doctor.id 
                    ? 'border-herb-green border-2 shadow-md' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                    <p className="text-herb-green text-sm">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendly Widget or Login Prompt */}
        <div className="lg:col-span-2 card min-h-[600px]">
          <h3 className="text-xl font-heading font-semibold text-herb-green mb-4">
            Schedule with {selectedDoctor.name}
          </h3>
          
          {user ? (
            <InlineWidget 
              url={selectedDoctor.calendlyUrl} 
              styles={{ height: '650px' }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[650px] bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <h4 className="text-xl font-heading font-semibold text-herb-green mb-2">Login Required</h4>
                <p className="text-gray-600 mb-6">
                  Please log in or create an account to book an appointment with {selectedDoctor.name}.
                </p>
                <button
                  onClick={handleBookingClick}
                  className="btn-primary px-8 py-3"
                >
                  Login to Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendly; 