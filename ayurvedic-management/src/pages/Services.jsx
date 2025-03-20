import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaLeaf, FaUserMd } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    title: 'Panchakarma Therapy',
    description: 'A comprehensive detoxification process that cleanses the body of toxins and restores balance to the doshas.',
    longDescription: 'Panchakarma is a Sanskrit term that means "five actions" or "five treatments". This is a process used to clean the body of toxic materials left by disease, poor nutrition, and environmental toxins. Ayurvedic literature suggests that Panchakarma treatments are needed on a seasonal basis to maintain good health and prevent disease.',
    duration: '5-21 days',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      'Deep detoxification of tissues',
      'Improved digestion and metabolism',
      'Enhanced immunity',
      'Reduced stress and anxiety',
      'Rejuvenation of mind and body'
    ],
    procedures: [
      'Initial consultation and dosha assessment',
      'Customized diet plan',
      'Abhyanga (oil massage)',
      'Swedana (herbal steam therapy)',
      'Specialized treatments based on your constitution'
    ]
  },
  {
    id: 2,
    title: 'Ayurvedic Consultation',
    description: 'Personalized assessment of your constitution (dosha) and health concerns with tailored recommendations.',
    longDescription: 'An Ayurvedic consultation involves a comprehensive assessment of your physical, mental, and emotional health through traditional diagnostic methods. Our practitioners will evaluate your constitution (Prakriti), current imbalances (Vikriti), digestive capacity (Agni), and tissue health to develop a personalized wellness plan.',
    duration: '60-90 minutes',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      'Understanding of your unique constitution',
      'Identification of root causes of health issues',
      'Personalized diet and lifestyle recommendations',
      'Herbal formulation suggestions',
      'Long-term wellness strategy'
    ],
    procedures: [
      'Detailed health history review',
      'Pulse diagnosis (Nadi Pariksha)',
      'Tongue, face, and nail examination',
      'Dosha assessment',
      'Personalized wellness plan development'
    ]
  },
  {
    id: 3,
    title: 'Herbal Treatments',
    description: 'Natural remedies and herbal formulations prepared according to ancient Ayurvedic texts for various health conditions.',
    longDescription: 'Ayurvedic herbs are powerful tools for balancing the body and mind. Our herbal treatments utilize traditional formulations that have been used for thousands of years to address various health concerns. We source high-quality organic herbs and prepare them according to authentic Ayurvedic methods.',
    duration: 'Varies based on condition',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      'Natural approach to health concerns',
      'Minimal side effects compared to conventional medications',
      'Address root causes rather than symptoms',
      'Support for overall wellness',
      'Customized to your constitution'
    ],
    procedures: [
      'Consultation and assessment',
      'Custom herbal formulation',
      'Guidance on proper usage and timing',
      'Follow-up monitoring and adjustments',
      'Integration with diet and lifestyle recommendations'
    ]
  },
  {
    id: 4,
    title: 'Ayurvedic Massage',
    description: 'Therapeutic massage techniques using medicated oils to improve circulation, reduce stress, and promote relaxation.',
    longDescription: 'Ayurvedic massage (Abhyanga) is not just a luxury but an important therapy that helps balance the doshas, improve circulation, and promote overall well-being. Our specialized massage techniques use warm herbal oils selected specifically for your constitution to nourish the tissues and calm the mind.',
    duration: '60-90 minutes',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      'Improved circulation and lymphatic drainage',
      'Reduction of muscle tension and pain',
      'Stress relief and relaxation',
      'Nourishment of tissues',
      'Better sleep quality'
    ],
    procedures: [
      'Dosha assessment',
      'Selection of appropriate herbal oils',
      'Full-body massage using traditional techniques',
      'Optional steam therapy (Swedana)',
      'Relaxation period with herbal tea'
    ]
  },
  {
    id: 5,
    title: 'Yoga & Meditation',
    description: 'Guided practices to harmonize mind and body, reduce stress, and enhance overall well-being.',
    longDescription: 'Yoga and meditation are integral parts of Ayurvedic practice, helping to balance the body and calm the mind. Our sessions are tailored to your constitution and current health status, incorporating asanas (postures), pranayama (breathing exercises), and meditation techniques most beneficial for your dosha type.',
    duration: '60 minutes',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      'Reduced stress and anxiety',
      'Improved flexibility and strength',
      'Enhanced mental clarity and focus',
      'Better emotional balance',
      'Support for other Ayurvedic treatments'
    ],
    procedures: [
      'Constitution assessment',
      'Personalized yoga sequence design',
      'Breathing exercises tailored to your needs',
      'Guided meditation practice',
      'Take-home routines for daily practice'
    ]
  },
  {
    id: 6,
    title: 'Dietary Counseling',
    description: 'Customized nutritional advice based on your dosha type and specific health needs.',
    longDescription: 'In Ayurveda, proper diet is considered one of the main pillars of health. Our dietary counseling service provides personalized nutritional guidance based on your constitution, current imbalances, digestive capacity, and specific health goals. We help you understand which foods will bring balance to your system and which may contribute to imbalance.',
    duration: '45-60 minutes',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1935&auto=format&fit=crop',
    benefits: [
      'Improved digestion and metabolism',
      'Weight management',
      'Increased energy levels',
      'Reduced food-related symptoms',
      'Long-term health maintenance'
    ],
    procedures: [
      'Assessment of current diet and eating habits',
      'Dosha-specific food recommendations',
      'Meal planning guidance',
      'Cooking methods and spice usage advice',
      'Seasonal adjustments for optimal health'
    ]
  }
];

const ServiceCard = ({ service }) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="h-56 overflow-hidden rounded-md mb-4">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4">
        {service.description}
      </p>
      <div className="flex items-center mb-4 text-gray-600">
        <FaClock className="mr-2 text-herb-green" />
        <span>Duration: {service.duration}</span>
      </div>
      <Link to={`/#`} className="btn-primary inline-block">
        Learn More
      </Link>
    </div>
  );
};

const ServiceDetail = ({ service }) => {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="h-96 relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-herb-green/50 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center px-4">
            {service.title}
          </h2>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center mb-6 text-gray-600">
          <FaClock className="mr-2 text-herb-green" />
          <span>Duration: {service.duration}</span>
        </div>

        <p className="text-gray-700 mb-8">
          {service.longDescription}
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-heading font-semibold text-herb-green mb-4 flex items-center">
            <FaLeaf className="mr-2" /> Benefits
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {service.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-heading font-semibold text-herb-green mb-4 flex items-center">
            <FaUserMd className="mr-2" /> What to Expect
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {service.procedures.map((procedure, index) => (
              <li key={index}>{procedure}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/book" className="btn-primary">
            Book This Service
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  // In a real app, you'd use React Router to determine which service to display
  // For this example, we'll just show the service list
  const showDetail = false;
  const selectedServiceId = 1;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-herb-green text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Ayurvedic Services</h1>
          <p className="text-xl max-w-3xl">
            Discover our comprehensive range of authentic Ayurvedic treatments and 
            wellness services designed to restore balance and promote holistic health.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="section bg-soft-green/10">
        <div className="container-custom">
          {showDetail ? (
            <ServiceDetail service={servicesData.find(s => s.id === selectedServiceId)} />
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold text-leaf-green mb-4">
                  Explore Our Services
                </h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Each of our services is rooted in authentic Ayurvedic principles and 
                  tailored to your individual constitution and health needs.
                </p>
                <div className="w-20 h-1 bg-turmeric mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services; 