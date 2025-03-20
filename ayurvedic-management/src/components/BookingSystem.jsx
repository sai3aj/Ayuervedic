import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';
import BookingForm from './BookingForm';
import { FaUser } from 'react-icons/fa';

// Mock doctors data (in a real app, this would come from Supabase)
const doctors = [
  {
    id: 1,
    name: 'Dr. Arjun Sharma',
    specialty: 'Ayurvedic Physician',
    experience: '15+ years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. Priya Patel',
    specialty: 'Panchakarma Specialist',
    experience: '12+ years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Vikram Mehta',
    specialty: 'Ayurvedic Nutrition',
    experience: '10+ years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Anjali Desai',
    specialty: 'Yoga & Meditation',
    experience: '8+ years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop'
  }
];

const BookingSystem = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const { user, getDoctors } = useSupabase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch doctors when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const result = await getDoctors();
        if (result.success && result.data.length > 0) {
          setDoctors(result.data);
          setSelectedDoctor(result.data[0]);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDoctors();
  }, [getDoctors]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingClick = () => {
    // If user is not authenticated, redirect to login
    if (!user) {
      // Save selected doctor and redirect info
      if (selectedDoctor) {
        sessionStorage.setItem('selectedDoctorId', selectedDoctor.id);
      }
      sessionStorage.setItem('redirectAfterLogin', '/book');
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-leaf-green mb-4">
            Book Your Consultation
          </h2>
          <div className="w-24 h-1 bg-turmeric mx-auto mt-4"></div>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col space-y-8 w-full max-w-3xl">
            <div className="h-8 bg-herb-green/20 rounded-full w-2/3 mx-auto"></div>
            <div className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 bg-herb-green/10 rounded-lg"></div>
                <div className="h-40 bg-herb-green/10 rounded-lg"></div>
                <div className="h-40 bg-herb-green/10 rounded-lg"></div>
              </div>
              <div className="h-64 bg-herb-green/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
          Book Your Consultation
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          Select a practitioner and schedule your appointment using our convenient online booking system.
        </p>
        <div className="w-24 h-1 bg-turmeric mx-auto"></div>
      </div>

      {selectedDoctor && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in">
          {/* Doctor Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-heading font-semibold text-herb-green mb-6 border-b border-soft-green/20 pb-3">
              Choose a Practitioner
            </h3>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                  className={`card cursor-pointer transition-all duration-300 hover-scale p-4 ${
                    selectedDoctor.id === doctor.id 
                      ? 'border-herb-green border-2 shadow-md bg-soft-green/5' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-soft-green/30"
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

          {/* Booking Form or Login Prompt */}
          <div className="lg:col-span-2">
            {user ? (
              <BookingForm selectedDoctor={selectedDoctor} />
            ) : (
              <div className="card shadow-subtle min-h-[600px] flex flex-col justify-center items-center">
                <div className="text-center max-w-md mx-auto">
                  <div className="bg-soft-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUser className="text-herb-green text-3xl" />
                  </div>
                  <h4 className="text-xl font-heading font-semibold text-herb-green mb-4">Login Required</h4>
                  <p className="text-gray-700 mb-8">
                    Please log in or create an account to book an appointment with {selectedDoctor.name}.
                  </p>
                  <button
                    onClick={handleBookingClick}
                    className="btn-primary px-8 py-3 w-full md:w-auto"
                  >
                    Login to Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSystem; 