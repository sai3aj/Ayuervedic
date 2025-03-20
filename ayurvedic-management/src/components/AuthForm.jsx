import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';

const AuthForm = ({ onSuccess, activeTabDefault = 'login' }) => {
  const [activeTab, setActiveTab] = useState(activeTabDefault);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useSupabase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Sign up
        await signUp(formData.email, formData.password, {
          full_name: formData.name,
        });

        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        });

      } else {
        // Login
        await signIn(formData.email, formData.password);
      }

      // Callback on success
      if (onSuccess) onSuccess();

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`flex-1 py-3 font-medium ${
            activeTab === 'login'
              ? 'text-herb-green border-b-2 border-herb-green'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 font-medium ${
            activeTab === 'signup'
              ? 'text-herb-green border-b-2 border-herb-green'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Field (Sign Up Only) */}
        {activeTab === 'signup' && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green focus:border-transparent"
            placeholder={activeTab === 'signup' ? 'Create a password' : 'Enter your password'}
          />
        </div>

        {/* Confirm Password Field (Sign Up Only) */}
        {activeTab === 'signup' && (
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3"
        >
          {loading
            ? 'Processing...'
            : activeTab === 'login'
            ? 'Login'
            : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm; 