import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  const { user } = useSupabase();
  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);

  // Handle redirect logic on component mount and when user changes
  useEffect(() => {
    // Check if there's a saved redirect path in sessionStorage
    const savedRedirect = sessionStorage.getItem('redirectAfterLogin');
    
    if (savedRedirect) {
      setRedirectTo(savedRedirect);
    }

    // Redirect if user is logged in
    if (user) {
      if (redirectTo) {
        // Clear the stored redirect path
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectTo);
      } else {
        // Default redirect to home page
        navigate('/');
      }
    }
  }, [user, navigate, redirectTo]);

  const handleSuccess = () => {
    // This will be called after successful signup from AuthForm
    // The useEffect above will handle the redirect
  };

  return (
    <div className="min-h-screen bg-soft-green/10 py-16">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-herb-green mb-2">Create an Account</h1>
            <p className="text-gray-600">Join us to access all our services</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <AuthForm activeTabDefault="signup" onSuccess={handleSuccess} />
            
            <div className="mt-6 text-center text-gray-600">
              <p>Already have an account? <Link to="/login" className="text-herb-green hover:underline">Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 