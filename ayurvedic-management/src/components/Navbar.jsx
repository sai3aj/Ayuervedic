import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaUserPlus, FaUserCog } from 'react-icons/fa';
import { useSupabase } from '../contexts/SupabaseContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useSupabase();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-herb-green font-medium' : 'text-gray-700';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover-scale">
            <span className="text-2xl font-heading font-bold text-gradient">
              Ayurvedic Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`hover:text-herb-green transition-colors duration-300 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/about" className={`hover:text-herb-green transition-colors duration-300 ${isActive('/about')}`}>
              About Us
            </Link>
            <Link to="/services" className={`hover:text-herb-green transition-colors duration-300 ${isActive('/services')}`}>
              Services
            </Link>
            <Link to="/contact" className={`hover:text-herb-green transition-colors duration-300 ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center text-gray-700 hover:text-herb-green transition-colors duration-300 px-3 py-2"
                  >
                    <FaUserCog className="mr-2" /> Admin
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-herb-green transition-colors duration-300 px-3 py-2"
                >
                  Logout
                </button>
                <Link to="/book" className="btn-primary">
                  Book Now
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-gray-700 hover:text-herb-green transition-colors duration-300 px-3 py-2">
                  <FaUser className="mr-2" /> Login
                </Link>
                <Link to="/signup" className="flex items-center text-gray-700 hover:text-herb-green transition-colors duration-300 px-3 py-2">
                  <FaUserPlus className="mr-2" /> Sign Up
                </Link>
                <Link to="/book" className="btn-primary">
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 mt-4 border-t border-gray-100 fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`hover:text-herb-green transition-colors duration-300 py-2 ${isActive('/')}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`hover:text-herb-green transition-colors duration-300 py-2 ${isActive('/about')}`}
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                to="/services"
                className={`hover:text-herb-green transition-colors duration-300 py-2 ${isActive('/services')}`}
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className={`hover:text-herb-green transition-colors duration-300 py-2 ${isActive('/contact')}`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-herb-green transition-colors duration-300 flex items-center py-2"
                      onClick={toggleMenu}
                    >
                      <FaUserCog className="mr-2" /> Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-gray-700 hover:text-herb-green transition-colors duration-300 text-left py-2"
                  >
                    Logout
                  </button>
                  <Link
                    to="/book"
                    className="btn-primary inline-block w-full text-center mt-2"
                    onClick={toggleMenu}
                  >
                    Book Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-herb-green transition-colors duration-300 flex items-center py-2"
                    onClick={toggleMenu}
                  >
                    <FaUser className="mr-2" /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-herb-green transition-colors duration-300 flex items-center py-2"
                    onClick={toggleMenu}
                  >
                    <FaUserPlus className="mr-2" /> Sign Up
                  </Link>
                  <Link
                    to="/book"
                    className="btn-primary inline-block w-full text-center mt-2"
                    onClick={toggleMenu}
                  >
                    Book Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 