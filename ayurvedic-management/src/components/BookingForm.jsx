import { useState, useEffect } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';

// Helper functions for dates
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // 'yyyy-MM-dd' format
};

const formatReadableDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const BookingForm = ({ selectedDoctor }) => {
  const { user, bookAppointment } = useSupabase();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [serviceType, setServiceType] = useState('consultation');
  const [bookingStatus, setBookingStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Generate an array of next 14 dates for date picker
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: formatDate(date),
      label: formatReadableDate(date)
    };
  });

  // Service type options
  const serviceOptions = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'panchakarma', label: 'Panchakarma Therapy' },
    { value: 'nutrition', label: 'Nutrition Consultation' },
    { value: 'yoga', label: 'Yoga & Meditation Session' }
  ];

  // Generate time slots based on doctor and date
  useEffect(() => {
    if (!selectedDoctor) return;
    
    const generateTimeSlots = () => {
      setIsLoading(true);
      
      try {
        // Generate fixed time slots for the doctor
        const timeSlots = getTimeSlots(selectedDoctor.id);
        setAvailableTimeSlots(timeSlots);
        setSelectedTimeSlot(null); // Reset selected time slot when date changes
      } catch (error) {
        console.error('Error generating time slots:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateTimeSlots();
  }, [selectedDoctor, selectedDate]);

  // Generate fixed time slots for each doctor
  const getTimeSlots = (doctorId) => {
    // Different starting times based on doctor
    const baseHour = 9 + (doctorId % 4); 
    
    const timeSlots = [];
    
    // Generate 8 slots for the day
    for (let i = 0; i < 8; i++) {
      const hour = baseHour + Math.floor(i / 2);
      const minute = (i % 2) * 30;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hourDisplay = hour > 12 ? hour - 12 : hour;
      
      timeSlots.push({
        id: `slot-${i}`,
        time: `${hourDisplay}:${minute === 0 ? '00' : minute} ${ampm}`
      });
    }
    
    return timeSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTimeSlot) {
      setBookingStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please select a time slot'
      });
      return;
    }
    
    setBookingStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    try {
      // Create booking details
      const bookingDetails = {
        userName: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest',
        userEmail: user?.email || '',
        userPhone: userPhone,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTimeSlot.time,
        serviceType,
        notes
      };
      
      // Submit booking to Supabase
      const result = await bookAppointment(bookingDetails);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to book appointment');
      }
      
      setBookingStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset form
      setSelectedTimeSlot(null);
      setNotes('');
      setUserPhone('');
    } catch (error) {
      setBookingStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message || 'Failed to book appointment. Please try again.'
      });
    }
  };

  return (
    <div className="card shadow-subtle">
      <h3 className="text-xl font-heading font-semibold text-herb-green mb-6 border-b border-soft-green/20 pb-4">
        Schedule with {selectedDoctor.name}
      </h3>
      
      {bookingStatus.isSubmitted ? (
        <div className="bg-soft-green/20 text-leaf-green p-6 rounded-md text-center my-4 fade-in">
          <h4 className="text-xl font-heading font-semibold mb-4">Appointment Confirmed!</h4>
          <div className="bg-white p-6 rounded-md shadow-subtle mb-6">
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Practitioner:</span> {selectedDoctor.name}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Date:</span> {formatReadableDate(selectedDate)}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Time:</span> {selectedTimeSlot?.time}
            </p>
          </div>
          <p className="mb-6 text-gray-700 italic">
            We've sent a confirmation email with all the details. Please arrive 15 minutes before your appointment.
          </p>
          <button
            onClick={() => setBookingStatus({ isSubmitting: false, isSubmitted: false, error: null })}
            className="btn-primary px-6 py-2 w-auto"
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Select Date
            </label>
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
            >
              {dateOptions.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Phone Number */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="input-field"
              placeholder="Your contact number"
            />
          </div>
          
          {/* Time Slot Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Time
            </label>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-6 w-6 bg-herb-green/20 rounded-full"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-herb-green/20 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ) : availableTimeSlots.length === 0 ? (
              <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-md">
                No available time slots for the selected date. Please try another date.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-md border text-center transition-colors hover-scale ${
                      selectedTimeSlot?.id === slot.id
                        ? 'bg-herb-green text-white border-herb-green'
                        : 'border-gray-300 hover:border-herb-green'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Service Type Selection */}
          <div className="mb-6">
            <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">
              Service Type
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="input-field"
            >
              {serviceOptions.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Additional Notes */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="input-field"
              placeholder="Any specific concerns or questions for your practitioner?"
            ></textarea>
          </div>
          
          {/* Error Message */}
          {bookingStatus.error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 fade-in">
              <p className="font-medium">Error</p>
              <p>{bookingStatus.error}</p>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={bookingStatus.isSubmitting || !selectedTimeSlot}
              className={`btn-primary w-full ${
                !selectedTimeSlot && !bookingStatus.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {bookingStatus.isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingForm; 