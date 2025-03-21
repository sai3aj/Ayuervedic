import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import { FaArrowLeft, FaCalendarAlt, FaUserAlt, FaPhone, FaEnvelope, FaClock, FaUserMd, FaNotesMedical } from 'react-icons/fa';

const AdminCreateAppointment = () => {
  const { isAdmin, adminBookAppointment, getDoctors, getAllUsers } = useSupabase();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    doctorId: '',
    doctorName: '',
    doctorSpecialty: '',
    date: '',
    time: '',
    serviceType: '',
    notes: ''
  });
  
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const amPm = hour < 12 ? 'AM' : 'PM';
      slots.push(`${hourFormatted}:00 ${amPm}`);
      if (hour < 17) {
        slots.push(`${hourFormatted}:30 ${amPm}`);
      }
    }
    setTimeSlots(slots);
  };
  
  // Available service types
  const serviceTypes = [
    'Panchakarma Therapy',
    'Ayurvedic Consultation',
    'Herbal Treatments',
    'Ayurvedic Massage',
    'Yoga & Meditation',
    'Dietary Counseling'
  ];
  
  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchData = async () => {
      try {
        // Fetch doctors
        const { data: doctorsData } = await getDoctors();
        if (doctorsData) {
          setDoctors(doctorsData);
        }
        
        // Fetch users
        const { data: usersData } = await getAllUsers();
        if (usersData) {
          setUsers(usersData);
        }
        
        // Generate time slots
        generateTimeSlots();
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, date: formattedDate }));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [getDoctors, getAllUsers, isAdmin]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle special case for doctor selection
    if (name === 'doctorId' && value) {
      const selectedDoctor = doctors.find(doc => doc.id.toString() === value);
      if (selectedDoctor) {
        setFormData({
          ...formData,
          doctorId: value,
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty
        });
        return;
      }
    }
    
    // Handle special case for user selection
    if (name === 'userEmail' && value) {
      const selectedUser = users.find(user => user.email === value);
      if (selectedUser) {
        setFormData({
          ...formData,
          userEmail: value,
          userName: selectedUser.email.split('@')[0] // Use email prefix as name if not available
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.userName.trim()) errors.userName = 'Patient name is required';
    if (!formData.userEmail.trim()) errors.userEmail = 'Email is required';
    if (!formData.doctorId) errors.doctorId = 'Please select a doctor';
    if (!formData.date) errors.date = 'Please select a date';
    if (!formData.time) errors.time = 'Please select a time slot';
    if (!formData.serviceType) errors.serviceType = 'Please select a service type';
    
    // Email validation
    if (formData.userEmail && !/\S+@\S+\.\S+/.test(formData.userEmail)) {
      errors.userEmail = 'Please enter a valid email address';
    }
    
    // Phone validation (optional)
    if (formData.userPhone && !/^\d{10}$/.test(formData.userPhone.replace(/\D/g, ''))) {
      errors.userPhone = 'Please enter a valid 10-digit phone number';
    }
    
    // Date validation (must be today or in the future)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Please select today or a future date';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { success, error } = await adminBookAppointment({
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone,
        doctorName: formData.doctorName,
        doctorSpecialty: formData.doctorSpecialty,
        date: formData.date,
        time: formData.time,
        serviceType: formData.serviceType,
        notes: formData.notes
      });
      
      if (error) throw new Error(error);
      
      if (success) {
        setSuccessMessage('Appointment successfully booked!');
        
        // Reset form
        setFormData({
          userName: '',
          userEmail: '',
          userPhone: '',
          doctorId: '',
          doctorName: '',
          doctorSpecialty: '',
          date: formData.date, // Keep the date
          time: '',
          serviceType: '',
          notes: ''
        });
        
        // Redirect to appointments page after a delay
        setTimeout(() => {
          navigate('/admin/appointments');
        }, 2000);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage(error.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <h2 className="text-red-800 text-xl font-semibold">Access Denied</h2>
          <p className="text-red-600 mt-2">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/admin/appointments" className="text-leaf-green hover:text-herb-green mr-4">
          <FaArrowLeft /> 
        </Link>
        <h1 className="text-3xl font-heading font-bold text-leaf-green">
          Create New Appointment
        </h1>
      </div>
      
      {successMessage && (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-6">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-herb-green mb-4">Patient Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaUserAlt className="inline mr-2" /> Patient Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.userName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Full Name"
                />
                {formErrors.userName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.userName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaEnvelope className="inline mr-2" /> Email
                </label>
                <select
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.userEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select existing user or type new email</option>
                  {users.map(user => (
                    <option key={user.user_id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
                {/* Allow manual entry if user not in system */}
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className={`w-full mt-2 border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.userEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Or enter new email"
                />
                {formErrors.userEmail && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.userEmail}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaPhone className="inline mr-2" /> Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  placeholder="(123) 456-7890"
                />
                {formErrors.userPhone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.userPhone}</p>
                )}
              </div>
            </div>
            
            {/* Appointment Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-herb-green mb-4">Appointment Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaUserMd className="inline mr-2" /> Select Doctor
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.doctorId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
                {formErrors.doctorId && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.doctorId}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCalendarAlt className="inline mr-2" /> Appointment Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {formErrors.date && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaClock className="inline mr-2" /> Appointment Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {formErrors.time && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent ${
                    formErrors.serviceType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {formErrors.serviceType && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.serviceType}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaNotesMedical className="inline mr-2" /> Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              placeholder="Add any special instructions or notes about this appointment..."
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-leaf-green text-white rounded-md hover:bg-herb-green transition-colors focus:outline-none focus:ring-4 focus:ring-leaf-green focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAppointment; 