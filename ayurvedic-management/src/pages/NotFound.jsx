import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-soft-green/10">
      <div className="container-custom text-center py-20">
        <h1 className="text-7xl md:text-9xl font-heading font-bold text-herb-green mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <FaHome className="mr-2" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 