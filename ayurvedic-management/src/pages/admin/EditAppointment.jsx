import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, getAppointmentById, updateAppointment, getDoctors, getServices } = useSupabase();
  
  const [appointment, setAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    doctor_name: '',
    doctor_specialty: '',
    service_type: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the appointment
        const { data: appointmentData, error: appointmentError } = await getAppointmentById(id);
        if (appointmentError) {
          throw new Error(appointmentError);
        }
        
        // Fetch doctors
        const { data: doctorsData } = await getDoctors();
        
        // Fetch services
        const { data: servicesData } = await getServices();
        
        if (appointmentData) {
          setAppointment(appointmentData);
          setFormData({
            user_name: appointmentData.user_name || '',
            user_email: appointmentData.user_email || '',
            user_phone: appointmentData.user_phone || '',
            doctor_name: appointmentData.doctor_name || '',
            doctor_specialty: appointmentData.doctor_specialty || '',
            service_type: appointmentData.service_type || '',
            appointment_date: appointmentData.appointment_date || '',
            appointment_time: appointmentData.appointment_time || '',
            notes: appointmentData.notes || '',
            status: appointmentData.status || 'scheduled'
          });
        }
        
        if (doctorsData) setDoctors(doctorsData);
        if (servicesData) setServices(servicesData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load appointment data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, getAppointmentById, getDoctors, getServices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // If doctor changed, update the specialty
    if (name === 'doctor_name') {
      const selectedDoctor = doctors.find(doctor => doctor.name === value);
      if (selectedDoctor) {
        setFormData(prev => ({ ...prev, doctor_specialty: selectedDoctor.specialty }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      const { success, error } = await updateAppointment(id, formData);
      
      if (error) throw new Error(error);
      
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/appointments');
        }, 1500);
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Failed to update appointment. Please try again.');
    } finally {
      setSaving(false);
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
          Edit Appointment
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-6">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => navigate('/admin/appointments')}
            className="mt-2 text-red-600 hover:text-red-800 font-medium"
          >
            Return to Appointments
          </button>
        </div>
      ) : success ? (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
          <p className="text-green-600">Appointment updated successfully!</p>
          <p className="text-green-600 mt-1">Redirecting to appointments list...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-herb-green mb-2">Patient Information</h2>
                
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="user_phone"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Appointment Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-herb-green mb-2">Appointment Details</h2>
                
                <div>
                  <label htmlFor="doctor_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <select
                    id="doctor_name"
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.specialty})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1">
                    Service
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                    required
                  >
                    <option value="">Select Service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                    required
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Date and Time */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id="appointment_time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* Notes */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              />
            </div>
            
            {/* Buttons */}
            <div className="mt-8 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/appointments')}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-4 py-2 bg-herb-green text-white rounded-md hover:bg-leaf-green transition-colors disabled:bg-gray-400"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAppointment; 