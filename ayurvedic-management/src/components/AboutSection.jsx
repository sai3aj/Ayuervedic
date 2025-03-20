import { Link } from 'react-router-dom';
import { FaLeaf, FaMedkit, FaPrayingHands } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-leaf-green mb-4">
            About Our Ayurvedic Centre
          </h2>
          <div className="w-20 h-1 bg-turmeric mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
              alt="Ayurvedic treatment" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Column */}
          <div>
            <h3 className="text-2xl font-heading font-semibold text-herb-green mb-4">
              Healing Through Ancient Wisdom
            </h3>
            <p className="text-gray-700 mb-6">
              At our Ayurvedic Management Centre, we are committed to providing holistic healthcare 
              based on the ancient principles of Ayurveda. Our approach focuses on treating the root 
              cause of ailments rather than just the symptoms, promoting long-term health and wellness.
            </p>
            <p className="text-gray-700 mb-6">
              Founded by experienced Ayurvedic practitioners with a passion for natural healing, 
              our centre combines traditional Ayurvedic practices with modern wellness techniques 
              to offer personalized treatment plans tailored to your unique constitution (dosha).
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="p-2 bg-soft-green/20 rounded-full mr-4">
                  <FaLeaf className="text-herb-green text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Personalized Care</h4>
                  <p className="text-gray-600">Treatments based on your unique dosha and health needs</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-soft-green/20 rounded-full mr-4">
                  <FaMedkit className="text-herb-green text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Holistic Approach</h4>
                  <p className="text-gray-600">Addressing mind, body, and spirit for complete wellness</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-soft-green/20 rounded-full mr-4">
                  <FaPrayingHands className="text-herb-green text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Authentic Practices</h4>
                  <p className="text-gray-600">Traditional methods by certified Ayurvedic practitioners</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-primary inline-block">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 