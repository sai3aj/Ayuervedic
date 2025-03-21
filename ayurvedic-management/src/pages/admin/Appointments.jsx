import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import { FaCalendarPlus, FaEye, FaCheck, FaTimes, FaClock, FaSearch, FaTimes as FaTimesCircle, FaEdit } from 'react-icons/fa';

const AdminAppointments = () => {
  const { isAdmin, getAllAppointments, updateAppointmentStatus, cancelAppointment } = useSupabase();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add a debounce effect for search
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAllAppointments();
      
      if (error) throw error;
      
      if (data) {
        // Sort appointments by date and time, most recent first
        const sortedAppointments = data.sort((a, b) => {
          const dateA = new Date(`${a.appointment_date} ${a.appointment_time}`);
          const dateB = new Date(`${b.appointment_date} ${b.appointment_time}`);
          return dateB - dateA;
        });
        
        setAppointments(sortedAppointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const { success, error } = await updateAppointmentStatus(appointmentId, newStatus);
      
      if (error) throw error;
      
      if (success) {
        // Update the appointment status in the UI
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: newStatus } 
              : appointment
          )
        );
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      const { success, error } = await cancelAppointment(appointmentId);
      
      if (error) throw error;
      
      if (success) {
        // Update the appointment status in the UI
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: 'cancelled' } 
              : appointment
          )
        );
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  // Filter appointments based on status and search term
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    if (debouncedSearchTerm === '') {
      return matchesStatus;
    }
    
    const search = debouncedSearchTerm.toLowerCase().trim();
    
    // Check various fields for matches
    const matchesName = appointment.user_name?.toLowerCase().includes(search);
    const matchesEmail = appointment.user_email?.toLowerCase().includes(search);
    const matchesPhone = appointment.user_phone?.toLowerCase().includes(search);
    const matchesDoctor = appointment.doctor_name?.toLowerCase().includes(search);
    const matchesSpecialty = appointment.doctor_specialty?.toLowerCase().includes(search);
    const matchesService = appointment.service_type?.toLowerCase().includes(search);
    const matchesDate = appointment.appointment_date?.toLowerCase().includes(search);
    const matchesNotes = appointment.notes?.toLowerCase().includes(search);
    
    return matchesStatus && (
      matchesName || 
      matchesEmail || 
      matchesPhone || 
      matchesDoctor || 
      matchesSpecialty || 
      matchesService || 
      matchesDate ||
      matchesNotes
    );
  });

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            <FaClock className="mr-1" /> Scheduled
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <FaCheck className="mr-1" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
            <FaTimes className="mr-1" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-leaf-green mb-4 md:mb-0">
          Manage Appointments
        </h1>
        <Link 
          to="/admin/create-appointment" 
          className="btn-primary flex items-center"
        >
          <FaCalendarPlus className="mr-2" /> Create New Appointment
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Appointments
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              placeholder="Name, email, doctor, service, date..."
              className="w-full border rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600"
                  title="Clear search"
                >
                  <FaTimesCircle />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="status"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="w-full md:w-1/3 md:self-end">
          <button
            onClick={fetchAppointments}
            className="w-full py-2 px-4 border border-leaf-green text-leaf-green rounded-md hover:bg-leaf-green hover:text-white transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Appointments list */}
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {debouncedSearchTerm && (
            <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                Found {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} 
                {statusFilter !== 'all' ? ` with status "${statusFilter}"` : ''} 
                matching "{debouncedSearchTerm}"
              </p>
            </div>
          )}
          
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No appointments found matching your criteria.</p>
              {(debouncedSearchTerm || statusFilter !== 'all') && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="mt-4 text-leaf-green hover:text-herb-green font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{appointment.user_name}</div>
                          <div className="text-sm text-gray-500">{appointment.user_email}</div>
                          {appointment.user_phone && (
                            <div className="text-sm text-gray-500">{appointment.user_phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.doctor_name}</div>
                        <div className="text-sm text-gray-500">{appointment.doctor_specialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.service_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.appointment_date}</div>
                        <div className="text-sm text-gray-500">{appointment.appointment_time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/admin/edit-appointment/${appointment.id}`}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                            title="Edit Appointment"
                          >
                            <FaEdit size={14} />
                          </Link>
                          
                          {appointment.status === 'scheduled' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(appointment.id, 'completed')}
                                className="p-1.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                                title="Mark as Completed"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="p-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                                title="Cancel Appointment"
                              >
                                <FaTimes size={14} />
                              </button>
                            </>
                          )}
                          {appointment.status === 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'scheduled')}
                              className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                              title="Reschedule"
                            >
                              <FaClock size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAppointments; 