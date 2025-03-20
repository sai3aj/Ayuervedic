import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { FaArrowRight, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ContactForm = () => {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact_form')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
            status: 'unread'
          }
        ]);
      
      if (error) throw error;
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-subtle max-w-2xl w-full mx-auto">
      {success ? (
        <div className="p-8 text-center fade-in">
          <FaCheckCircle className="text-herb-green text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-heading font-bold text-herb-green mb-4">Thank You!</h3>
          <p className="text-herb-green/90 mb-6">
            Your message has been successfully sent. We will contact you very soon!
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="btn-primary inline-flex items-center"
          >
            Send Another Message <FaArrowRight className="ml-2" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h3 className="text-2xl font-heading font-bold text-center text-herb-green border-b border-herb-green/20 pb-4 mb-6">
            Get in Touch
          </h3>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 fade-in">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 fade-in">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="Your phone number (optional)"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`input-field ${errors.message ? 'border-red-500' : ''}`}
              placeholder="How can we help you?"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1 fade-in">{errors.message}</p>}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md fade-in">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full md:w-auto inline-flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Sending...
                </>
              ) : (
                <>
                  Send Message <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 