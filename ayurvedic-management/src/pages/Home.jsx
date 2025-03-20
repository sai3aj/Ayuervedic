import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaUserMd, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import BookingSection from '../components/BookingSection';
import Testimonials from '../components/Testimonials';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-herb-pattern opacity-20 z-0"></div>
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-herb-green mb-6 leading-tight">
                Discover Authentic Ayurvedic Wellness
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
                Balance your body, mind, and spirit with personalized Ayurvedic treatments and consultations from our experienced practitioners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/book" className="btn-primary">
                  Book Appointment
                </Link>
                <Link to="/services" className="btn-secondary">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop"
                alt="Ayurvedic treatment"
                className="rounded-lg shadow-subtle hover-scale transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-soft-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Ayurveda?
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Experience the benefits of this ancient healing system that treats the root cause, not just the symptoms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Natural Healing</h3>
              <p>
                Our treatments use pure herbs and oils to stimulate your body's natural healing mechanisms without harmful side effects.
              </p>
            </div>

            <div className="card p-8 text-center hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserMd className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Personalized Care</h3>
              <p>
                Every treatment plan is tailored to your unique constitution (dosha) and specific health concerns for optimal results.
              </p>
            </div>

            <div className="card p-8 text-center hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarCheck className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Holistic Approach</h3>
              <p>
                We address your physical, mental, and spiritual well-being to create long-lasting health and harmony in your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Ayurvedic Services
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Discover our range of traditional treatments designed to restore balance and promote wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop"
                  alt="Ayurvedic Consultation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Ayurvedic Consultation</h3>
                <p className="mb-4">
                  Our experienced practitioners will assess your constitution and create a personalized wellness plan.
                </p>
                <Link to="/services" className="text-herb-green font-medium hover:text-turmeric flex items-center transition-colors">
                  Learn more <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop"
                  alt="Panchakarma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Panchakarma Therapy</h3>
                <p className="mb-4">
                  Experience our signature detoxification treatment to cleanse your system and rejuvenate your body.
                </p>
                <Link to="/services" className="text-herb-green font-medium hover:text-turmeric flex items-center transition-colors">
                  Learn more <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
                  alt="Ayurvedic Massage" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Ayurvedic Massage</h3>
                <p className="mb-4">
                  Our therapeutic massages use herbal oils to reduce stress, improve circulation, and promote healing.
                </p>
                <Link to="/services" className="text-herb-green font-medium hover:text-turmeric flex items-center transition-colors">
                  Learn more <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-herb-green text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Read about the experiences of people who have transformed their health with our Ayurvedic treatments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-turmeric">★</span>
                ))}
              </div>
              <p className="mb-6 italic">
                "After years of struggling with digestive issues, the personalized Ayurvedic treatment plan provided by Dr. Sharma has completely transformed my health. I feel better than I have in decades!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                    alt="Priya M." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Priya M.</h4>
                  <p className="text-soft-green">Mumbai</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-turmeric">★</span>
                ))}
              </div>
              <p className="mb-6 italic">
                "The Panchakarma treatment was a life-changing experience. Not only did it help with my chronic back pain, but I also noticed improvements in my sleep, energy levels, and overall mental clarity."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                    alt="Rahul K." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Rahul K.</h4>
                  <p className="text-soft-green">Pune</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-turmeric">★</span>
                ))}
              </div>
              <p className="mb-6 italic">
                "I was skeptical at first, but the herbal remedies and lifestyle changes recommended by the Ayurvedic team have helped me manage my anxiety better than any medication I've tried before. Truly grateful!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                    alt="Anita S." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Anita S.</h4>
                  <p className="text-soft-green">Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <div className="bg-herb-pattern rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Begin Your Wellness Journey Today
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Take the first step toward balanced health and wellness with a personalized Ayurvedic consultation.
            </p>
            <Link to="/book" className="btn-primary inline-flex items-center">
              Book Your Appointment <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 