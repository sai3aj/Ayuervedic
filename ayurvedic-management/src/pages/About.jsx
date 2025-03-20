import { useEffect } from "react";
import { FaUserMd, FaHeart, FaHistory, FaLeaf } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section bg-herb-pattern py-24 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            About Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover our story, our mission, and our commitment to authentic Ayurvedic wellness.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-herb-green">
                Our Story
              </h2>
              <div className="space-y-4">
                <p>
                  Ayurvedic Management was founded in 2005 with a vision to bring authentic Ayurvedic treatments and wellness solutions to the modern world. Our journey began when our founder, Dr. Arjun Sharma, recognized the need for holistic healthcare approaches that address the root causes of ailments rather than just treating symptoms.
                </p>
                <p>
                  After years of studying traditional Ayurvedic texts and practices in Kerala, India – the birthplace of Ayurveda – Dr. Sharma established our center with a team of dedicated practitioners who share his passion for holistic healing.
                </p>
                <p>
                  Today, we are proud to be one of the leading Ayurvedic wellness centers, having helped thousands of people achieve balance in their health and life through personalized Ayurvedic treatments, consultations, and lifestyle guidance.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-subtle">
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
                alt="Ayurvedic herbs and treatments" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 px-4 bg-soft-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Mission & Values
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              We are guided by ancient wisdom and modern science to provide the best holistic care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Our Mission</h3>
              <p>
                To restore balance in people's lives through authentic Ayurvedic practices, empowering them with the knowledge and tools to maintain optimal health naturally. We aim to bridge the gap between ancient wisdom and modern lifestyles, making Ayurveda accessible and relevant for contemporary health challenges.
              </p>
            </div>

            <div className="card p-8 hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-herb-green/10 rounded-full flex items-center justify-center mb-6">
                <FaLeaf className="text-herb-green text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Our Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-herb-green mr-2">•</span> 
                  <span><strong>Authenticity:</strong> We stay true to traditional Ayurvedic principles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-herb-green mr-2">•</span> 
                  <span><strong>Holistic Approach:</strong> We treat the whole person, not just symptoms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-herb-green mr-2">•</span> 
                  <span><strong>Personalization:</strong> We recognize each individual's unique constitution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-herb-green mr-2">•</span> 
                  <span><strong>Education:</strong> We empower through knowledge sharing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-herb-green mr-2">•</span> 
                  <span><strong>Harmony:</strong> We believe in balance between traditional wisdom and modern science</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Meet Our Practitioners
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              Our team of certified Ayurvedic doctors brings years of experience and deep knowledge to help you achieve wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Doctor 1 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Arjun Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Dr. Arjun Sharma</h3>
                <p className="text-herb-green mb-4">Founder & Chief Ayurvedic Physician</p>
                <p>
                  With over 25 years of experience in Ayurvedic medicine, Dr. Sharma specializes in chronic disease management and Panchakarma detoxification therapies.
                </p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Priya Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Dr. Priya Patel</h3>
                <p className="text-herb-green mb-4">Senior Ayurvedic Consultant</p>
                <p>
                  Dr. Patel specializes in women's health, fertility, and prenatal care using Ayurvedic principles and natural remedies.
                </p>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="card overflow-hidden hover-scale transition-transform duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dr. Vikram Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Dr. Vikram Singh</h3>
                <p className="text-herb-green mb-4">Ayurvedic Practitioner</p>
                <p>
                  Dr. Singh focuses on stress management, mental health, and lifestyle disorders through Ayurveda and integrated wellness approaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-herb-green text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              We blend tradition with modern science to deliver effective and personalized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-center">Certified Experts</h3>
              <p className="text-center">
                All our practitioners are certified with extensive training in traditional Ayurvedic medicine.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-center">Personalized Care</h3>
              <p className="text-center">
                We customize treatments based on your unique constitution (dosha) and specific health needs.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-center">Ancient Wisdom</h3>
              <p className="text-center">
                Our practices are rooted in authentic Ayurvedic traditions passed down through generations.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg hover-scale transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-center">Holistic Approach</h3>
              <p className="text-center">
                We address the root cause of health issues, not just the symptoms, for lasting wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 