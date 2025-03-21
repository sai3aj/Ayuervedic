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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get the session from Supabase
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(session);
      setUser(session?.user || null);
      
      // Check if user is an admin
      if (session?.user) {
        // First check if they're already marked as admin in a custom claim
        if (session.user.user_metadata?.role === 'admin') {
          setIsAdmin(true);
        } else {
          // Otherwise check the admin_requests table
          const { data, error } = await supabase
            .from('admin_requests')
            .select('*')
            .eq('email', session.user.email)
            .eq('status', 'approved')
            .single();
          
          setIsAdmin(data ? true : false);
        }
      }
      
      setLoading(false);
    };

    getSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        // Check if user is an admin
        if (session?.user) {
          // First check if they're already marked as admin in a custom claim
          if (session.user.user_metadata?.role === 'admin') {
            setIsAdmin(true);
          } else {
            // Otherwise check the admin_requests table
            const { data, error } = await supabase
              .from('admin_requests')
              .select('*')
              .eq('email', session.user.email)
              .eq('status', 'approved')
              .single();
            
            setIsAdmin(data ? true : false);
          }
        } else {
          setIsAdmin(false);
        }
        
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
          data: {
            ...metadata,
            role: 'user' // Default role
          },
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

  // Admin: Promote a user to admin role
  const setUserAsAdmin = async (userEmail) => {
    if (!isAdmin) {
      return { success: false, error: 'Not authorized. Admin access required.' };
    }
    
    try {
      // Client-side approach: We'll handle this by creating a special table
      // Create a promotion request that admins can approve
      const { error } = await supabase
        .from('admin_requests')
        .insert([
          { 
            requested_by: user.id, 
            email: userEmail, 
            status: 'approved', // Auto-approved since coming from an admin
            created_at: new Date().toISOString() 
          }
        ]);
      
      if (error) throw error;
      
      return { 
        success: true, 
        message: `User ${userEmail} has been marked as admin. They will need to log out and log back in for changes to take effect.` 
      };
    } catch (error) {
      console.error('Error setting user as admin:', error.message);
      return { success: false, error: error.message };
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
          user_id: user.id,
          user_name: bookingDetails.userName,
          user_email: bookingDetails.userEmail,
          user_phone: bookingDetails.userPhone || '',
          doctor_name: bookingDetails.doctorName,
          doctor_specialty: bookingDetails.doctorSpecialty,
          appointment_date: bookingDetails.date,
          appointment_time: bookingDetails.time,
          service_type: bookingDetails.serviceType,
          notes: bookingDetails.notes || '',
          status: 'scheduled'
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Admin: Book an appointment for a user
  const adminBookAppointment = async (bookingDetails) => {
    try {
      if (!isAdmin) {
        return { success: false, error: 'Not authorized. Admin access required.' };
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
      
      // For user ID lookup, search profiles by email
      let userId = null;
      if (bookingDetails.userEmail) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', bookingDetails.userEmail)
          .single();
        
        if (!error && data) {
          userId = data.id;
        }
      }
      
      // Insert new appointment
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          user_id: userId,
          user_name: bookingDetails.userName,
          user_email: bookingDetails.userEmail,
          user_phone: bookingDetails.userPhone || '',
          doctor_name: bookingDetails.doctorName,
          doctor_specialty: bookingDetails.doctorSpecialty,
          appointment_date: bookingDetails.date,
          appointment_time: bookingDetails.time,
          service_type: bookingDetails.serviceType,
          notes: bookingDetails.notes || '',
          status: 'scheduled',
          booked_by_admin: true
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error booking appointment by admin:', error.message);
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

  // Admin: Get all appointments
  const getAllAppointments = async () => {
    if (!isAdmin) {
      return { success: false, error: 'Not authorized. Admin access required.' };
    }
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting all appointments:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      // For normal users, check if appointment belongs to them
      if (!isAdmin) {
        const { data: appointmentData, error: findError } = await supabase
          .from('appointments')
          .select('user_id')
          .eq('id', appointmentId)
          .single();
          
        if (findError) throw findError;
        
        if (appointmentData.user_id !== user.id) {
          return { success: false, error: 'Not authorized to cancel this appointment.' };
        }
      }
      
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error cancelling appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Admin: Update appointment status
  const updateAppointmentStatus = async (appointmentId, status) => {
    if (!isAdmin) {
      return { success: false, error: 'Not authorized. Admin access required.' };
    }
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Admin: Get all users
  const getAllUsers = async () => {
    if (!isAdmin) {
      return { success: false, error: 'Not authorized. Admin access required.' };
    }
    
    try {
      // Get all users from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      
      // Get all admin requests to determine who's an admin
      const { data: adminRequests, error: adminError } = await supabase
        .from('admin_requests')
        .select('*')
        .eq('status', 'approved');
        
      if (adminError) throw adminError;
      
      // Map the data to match our expected format
      const users = data.map(profile => {
        // Check if user is an admin from approved requests
        const isUserAdmin = adminRequests.some(request => 
          request.email === profile.email && request.status === 'approved'
        );
        
        return {
          user_id: profile.id,
          email: profile.email,
          role: isUserAdmin ? 'admin' : 'user'
        };
      });
      
      // Also mark current user as admin if they are
      if (isAdmin) {
        const currentUserIndex = users.findIndex(u => u.user_id === user.id);
        if (currentUserIndex >= 0) {
          users[currentUserIndex].role = 'admin';
        }
      }
      
      return { success: true, data: users };
    } catch (error) {
      console.error('Error getting all users:', error.message);
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

  // Get all services
  const getServices = async () => {
    // Mock services data based on the ServicesData in Services.jsx
    const mockServices = [
      {
        id: 1,
        name: 'Panchakarma Therapy',
        description: 'A comprehensive detoxification process',
      },
      {
        id: 2,
        name: 'Ayurvedic Consultation',
        description: 'Personalized health assessment',
      },
      {
        id: 3,
        name: 'Abhyanga Massage',
        description: 'Traditional Ayurvedic oil massage',
      },
      {
        id: 4,
        name: 'Shirodhara',
        description: 'Healing oil flow therapy',
      },
      {
        id: 5,
        name: 'Udvartana',
        description: 'Herbal powder massage',
      },
      {
        id: 6,
        name: 'Yoga & Meditation',
        description: 'Mind-body practices',
      }
    ];
    
    // Simulate API call
    return { success: true, data: mockServices };
  };

  // Get appointment by ID
  const getAppointmentById = async (appointmentId) => {
    try {
      // For normal users, check if appointment belongs to them
      if (!isAdmin && user) {
        const { data: appointmentData, error: findError } = await supabase
          .from('appointments')
          .select('*')
          .eq('id', appointmentId)
          .eq('user_id', user.id)
          .single();
          
        if (findError) {
          if (findError.code === 'PGRST116') {
            return { success: false, error: 'Appointment not found or you do not have permission to view it.' };
          }
          throw findError;
        }
        
        return { success: true, data: appointmentData };
      }
      
      // For admins, get any appointment
      if (isAdmin) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('id', appointmentId)
          .single();
  
        if (error) throw error;
        return { success: true, data };
      }
      
      return { success: false, error: 'Not authorized to view this appointment.' };
    } catch (error) {
      console.error('Error getting appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Update an appointment
  const updateAppointment = async (appointmentId, appointmentDetails) => {
    try {
      // For normal users, check if appointment belongs to them
      if (!isAdmin) {
        const { data: appointmentData, error: findError } = await supabase
          .from('appointments')
          .select('user_id')
          .eq('id', appointmentId)
          .single();
          
        if (findError) throw findError;
        
        if (appointmentData.user_id !== user.id) {
          return { success: false, error: 'Not authorized to update this appointment.' };
        }
      }
      
      // Check if the new time slot is already booked (if changing date/time)
      if (appointmentDetails.appointment_date && appointmentDetails.appointment_time) {
        const { data: existingAppointments, error: checkError } = await supabase
          .from('appointments')
          .select('*')
          .eq('doctor_name', appointmentDetails.doctor_name)
          .eq('appointment_date', appointmentDetails.appointment_date)
          .eq('appointment_time', appointmentDetails.appointment_time)
          .neq('id', appointmentId); // Exclude the current appointment
        
        if (checkError) throw checkError;
        
        // If time slot is already booked, return error
        if (existingAppointments && existingAppointments.length > 0) {
          return { 
            success: false, 
            error: 'This time slot is already booked. Please select another time.' 
          };
        }
      }
      
      const { data, error } = await supabase
        .from('appointments')
        .update(appointmentDetails)
        .eq('id', appointmentId);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating appointment:', error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    supabase,
    session,
    user,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    submitContactForm,
    bookAppointment,
    adminBookAppointment,
    getUserAppointments,
    getAllAppointments,
    cancelAppointment,
    updateAppointmentStatus,
    getAllUsers,
    getDoctors,
    setUserAsAdmin,
    updateAppointment,
    getAppointmentById,
    getServices,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseContext; 