import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section bg-herb-pattern py-24 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Have questions or want to schedule a consultation? Our team is here to help you on your journey to wellness.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 bg-soft-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center p-6 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Our Location</h3>
              <p>
                Senapati Bapat Marg,<br />
                Mahim-West, Mumbai,<br />
                Maharashtra 400016
              </p>
            </div>

            <div className="card text-center p-6 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhoneAlt className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Phone Number</h3>
              <p>+91 123 456 7890</p>
              <p className="mt-1">+91 098 765 4321</p>
            </div>

            <div className="card text-center p-6 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Email Address</h3>
              <p>info@ayurvedic-management.com</p>
              <p className="mt-1">support@ayurvedic-management.com</p>
            </div>

            <div className="card text-center p-6 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Working Hours</h3>
              <p>Monday - Friday: 9am - 7pm</p>
              <p className="mt-1">Saturday: 9am - 5pm</p>
              <p className="mt-1">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Get In Touch</h2>
            <p className="max-w-2xl mx-auto text-lg">
              Send us a message and our team will get back to you as soon as possible. We look forward to hearing from you!
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center bg-soft-green/20">
          <p className="text-gray-600">
            Interactive map would be displayed here
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default Contact; 