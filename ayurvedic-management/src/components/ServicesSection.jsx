import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'Panchakarma Therapy',
    description: 'A comprehensive detoxification process that cleanses the body of toxins and restores balance to the doshas.',
    image: 'https://images.unsplash.com/photo-1537346439163-9067311755fb?q=80&w=1974&auto=format&fit=crop',
    link: '/services/panchakarma'
  },
  {
    id: 2,
    title: 'Ayurvedic Consultation',
    description: 'Personalized assessment of your constitution (dosha) and health concerns with tailored recommendations.',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop',
    link: '/services/consultation'
  },
  {
    id: 3,
    title: 'Herbal Treatments',
    description: 'Natural remedies and herbal formulations prepared according to ancient Ayurvedic texts for various health conditions.',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=2070&auto=format&fit=crop',
    link: '/services/herbal-treatments'
  },
  {
    id: 4,
    title: 'Ayurvedic Massage',
    description: 'Therapeutic massage techniques using medicated oils to improve circulation, reduce stress, and promote relaxation.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
    link: '/services/massage'
  },
  {
    id: 5,
    title: 'Yoga & Meditation',
    description: 'Guided practices to harmonize mind and body, reduce stress, and enhance overall well-being.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop',
    link: '/services/yoga-meditation'
  },
  {
    id: 6,
    title: 'Dietary Counseling',
    description: 'Customized nutritional advice based on your dosha type and specific health needs.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1935&auto=format&fit=crop',
    link: '/services/dietary-counseling'
  }
];

const ServicesSection = () => {
  return (
    <section className="section bg-soft-green/10">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-leaf-green mb-4">
            Our Ayurvedic Services
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Discover our range of authentic Ayurvedic treatments and services designed to restore
            balance and promote holistic wellness for mind, body, and spirit.
          </p>
          <div className="w-20 h-1 bg-turmeric mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card group hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden rounded-md mb-4">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Link 
                to={service.link} 
                className="inline-flex items-center text-leaf-green hover:text-herb-green font-medium"
              >
                Learn More <FaArrowRight className="ml-2 text-sm" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 