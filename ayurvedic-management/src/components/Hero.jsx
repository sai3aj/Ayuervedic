import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] bg-soft-green/10 overflow-hidden">
      {/* Background Image - Using a CSS variable for the image URL 
         In a real app, you would use an actual image path or URL */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1611072172377-0cabc3addb26?q=80&w=1831&auto=format&fit=crop')", 
          backgroundPositionY: "35%" 
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-leaf-green leading-tight mb-4">
            Discover the Ancient Wisdom of Ayurveda for Modern Living
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            Balance your mind, body, and spirit with our personalized Ayurvedic treatments 
            and wellness programs designed for your unique constitution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book" className="btn-primary text-center">
              Book a Consultation
            </Link>
            <Link to="/services" className="btn-secondary text-center">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero; 