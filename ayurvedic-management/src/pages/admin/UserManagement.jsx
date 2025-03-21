import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import { FaArrowLeft, FaUserShield } from 'react-icons/fa';

const UserManagement = () => {
  const { isAdmin, getAllUsers, setUserAsAdmin } = useSupabase();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailToPromote, setEmailToPromote] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error, success } = await getAllUsers();
      
      if (error) {
        setMessage({ type: 'error', text: error });
        return;
      }
      
      if (success && data) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (e) => {
    e.preventDefault();
    if (!emailToPromote) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    try {
      setLoading(true);
      const { success, error, message } = await setUserAsAdmin(emailToPromote);
      
      if (error) {
        setMessage({ type: 'error', text: error });
        return;
      }
      
      if (success) {
        setMessage({ type: 'success', text: message });
        setEmailToPromote('');
        // Refresh the user list
        fetchUsers();
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
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
        <Link to="/admin" className="text-leaf-green hover:text-herb-green mr-4">
          <FaArrowLeft /> 
        </Link>
        <h1 className="text-3xl font-heading font-bold text-leaf-green">
          User Management
        </h1>
      </div>

      {/* Promote User Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-herb-green mb-4">Promote User to Admin</h2>
        
        {message.text && (
          <div className={`p-4 mb-4 rounded-md ${
            message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : 
            'bg-green-50 border border-green-200 text-green-800'
          }`}>
            <p>{message.text}</p>
          </div>
        )}
        
        <form onSubmit={handlePromoteUser} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="email"
              value={emailToPromote}
              onChange={(e) => setEmailToPromote(e.target.value)}
              placeholder="Enter user email to promote"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-herb-green transition-colors focus:outline-none focus:ring-4 focus:ring-leaf-green focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Make Admin'}
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h2 className="text-xl font-semibold text-herb-green p-6 border-b">Registered Users</h2>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.user_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 'admin' ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 flex items-center w-fit">
                            <FaUserShield className="mr-1" /> Admin
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 w-fit block">
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.user_id}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement; 