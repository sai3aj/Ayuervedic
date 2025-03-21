import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import { FaCalendarAlt, FaUserPlus, FaClipboardList, FaUserMd, FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
  const { isAdmin, getAllAppointments, getAllUsers, getDoctors } = useSupabase();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalUsers: 0,
    totalDoctors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get appointments data
        const { data: appointments } = await getAllAppointments();
        const pendingAppointments = appointments?.filter(app => app.status === 'scheduled') || [];
        
        // Get users data
        const { data: users } = await getAllUsers();
        
        // Get doctors data (using mock data for now)
        const { data: doctors } = await getDoctors();
        
        setStats({
          totalAppointments: appointments?.length || 0,
          pendingAppointments: pendingAppointments.length,
          totalUsers: users?.length || 0,
          totalDoctors: doctors?.length || 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [getAllAppointments, getAllUsers, getDoctors]);

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
          Admin Dashboard
        </h1>
        <div className="flex space-x-4">
          <Link 
            to="/admin/create-appointment" 
            className="btn-primary flex items-center"
          >
            <FaCalendarAlt className="mr-2" /> New Appointment
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Appointments" 
              value={stats.totalAppointments} 
              icon={<FaCalendarAlt className="text-herb-green text-2xl" />}
              linkTo="/admin/appointments"
            />
            <StatCard 
              title="Pending Appointments" 
              value={stats.pendingAppointments} 
              icon={<FaClipboardList className="text-turmeric text-2xl" />}
              linkTo="/admin/appointments"
            />
            <StatCard 
              title="Doctors" 
              value={stats.totalDoctors} 
              icon={<FaUserMd className="text-indigo-500 text-2xl" />}
              linkTo="#"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-herb-green mb-4 flex items-center">
                <FaCalendarAlt className="mr-2" /> Recent Appointments
              </h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                </table>
                <Link 
                  to="/admin/appointments"
                  className="block text-center py-3 text-leaf-green hover:text-herb-green font-medium"
                >
                  View All Appointments
                </Link>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-herb-green mb-4 flex items-center">
                <FaClipboardList className="mr-2" /> Quick Actions
              </h2>
              <div className="space-y-4">
                <Link 
                  to="/admin/create-appointment"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaCalendarAlt className="text-leaf-green mr-3" />
                  <div>
                    <h3 className="font-medium">Create New Appointment</h3>
                    <p className="text-sm text-gray-500">Schedule an appointment for a patient</p>
                  </div>
                </Link>
                <Link 
                  to="/admin/appointments"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaClipboardList className="text-leaf-green mr-3" />
                  <div>
                    <h3 className="font-medium">Manage Appointments</h3>
                    <p className="text-sm text-gray-500">View, edit or cancel existing appointments</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, linkTo }) => (
  <Link to={linkTo} className="card hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
      </div>
      <div className="p-2 rounded-full bg-gray-50">{icon}</div>
    </div>
  </Link>
);

export default AdminDashboard; 