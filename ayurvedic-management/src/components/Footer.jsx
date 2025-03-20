import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-leaf-green text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-b border-soft-green/30 pb-2">
              Ayurvedic Management
            </h3>
            <p className="mb-6">
              Embracing the ancient wisdom of Ayurveda to provide holistic health solutions for modern life.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-turmeric transition-colors duration-300" aria-label="Facebook">
                <FaFacebookSquare size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-turmeric transition-colors duration-300" aria-label="Twitter">
                <FaTwitterSquare size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-turmeric transition-colors duration-300" aria-label="Instagram">
                <FaInstagramSquare size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-turmeric transition-colors duration-300" aria-label="Youtube">
                <FaYoutubeSquare size={24} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-b border-soft-green/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-turmeric transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-turmeric transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-turmeric transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-turmeric transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-turmeric transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-b border-soft-green/30 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-turmeric transition-colors duration-300 flex items-center">
                <span className="mr-2">›</span> Ayurvedic Consultation
              </li>
              <li className="hover:text-turmeric transition-colors duration-300 flex items-center">
                <span className="mr-2">›</span> Panchakarma Therapy
              </li>
              <li className="hover:text-turmeric transition-colors duration-300 flex items-center">
                <span className="mr-2">›</span> Ayurvedic Massage
              </li>
              <li className="hover:text-turmeric transition-colors duration-300 flex items-center">
                <span className="mr-2">›</span> Herbal Remedies
              </li>
              <li className="hover:text-turmeric transition-colors duration-300 flex items-center">
                <span className="mr-2">›</span> Yoga & Meditation
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-b border-soft-green/30 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <FaMapMarkerAlt className="mt-1 mr-3 text-turmeric" />
                <span>
                  Senapati Bapat Marg, <br />
                  Mahim-West, Mumbai, <br />
                  Maharashtra 400016
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-turmeric" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-turmeric" />
                <span>info@ayurvedic-management.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-soft-green/20 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-soft-green">
          <p>© {currentYear} Ayurvedic Management. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link to="/privacy" className="hover:text-turmeric transition-colors duration-300">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-turmeric transition-colors duration-300 ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 