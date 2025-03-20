import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define Supabase credentials directly
// You should normally use environment variables, but for now we'll hardcode them
const supabaseUrl = "https://lfgpebqleioufbiwsczj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3BlYnFsZWlvdWZiaXdzY3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MTE5MjMsImV4cCI6MjA1Nzk4NzkyM30.tc10nTKRpWPMobk8uozn4m5hWsRYlrdsY25dw4_pJZg";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create context
const SupabaseContext = createContext();

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the session from Supabase
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, metadata = {}) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Submit contact form to Supabase
  const submitContactForm = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('contact_form')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            status: 'unread'
          },
        ]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting form:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Book an appointment (simplified)
  const bookAppointment = async (bookingDetails) => {
    try {
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      // Check if the time slot is already booked
      const { data: existingAppointments, error: checkError } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_name', bookingDetails.doctorName)
        .eq('appointment_date', bookingDetails.date)
        .eq('appointment_time', bookingDetails.time);
      
      if (checkError) throw checkError;
      
      // If time slot is already booked, return error
      if (existingAppointments && existingAppointments.length > 0) {
        return { 
          success: false, 
          error: 'This time slot is already booked. Please select another time.' 
        };
      }
      
      // Insert new appointment
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          user_name: bookingDetails.userName,
          user_email: bookingDetails.userEmail,
          user_phone: bookingDetails.userPhone || '',
          doctor_name: bookingDetails.doctorName,
          doctor_specialty: bookingDetails.doctorSpecialty,
          appointment_date: bookingDetails.date,
          appointment_time: bookingDetails.time,
          service_type: bookingDetails.serviceType,
          notes: bookingDetails.notes || ''
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Get user's appointments
  const getUserAppointments = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting user appointments:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error cancelling appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Get all doctors (mock function since we don't have a doctors table)
  const getDoctors = async () => {
    // Mock doctors data
    const mockDoctors = [
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
    
    // Simulate API call
    return { success: true, data: mockDoctors };
  };

  const value = {
    supabase,
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    submitContactForm,
    bookAppointment,
    getUserAppointments,
    cancelAppointment,
    getDoctors,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseContext; 