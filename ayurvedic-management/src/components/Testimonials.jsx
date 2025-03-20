import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Kapoor',
    location: 'Mumbai',
    rating: 5,
    testimonial: 'The Panchakarma therapy at this Ayurvedic center completely transformed my health. After years of digestive issues, I finally found relief through their personalized treatment plan. The practitioners are incredibly knowledgeable and caring.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Ananya Singh',
    location: 'Delhi',
    rating: 5,
    testimonial: 'I was skeptical about Ayurveda at first, but the results speak for themselves. The dietary recommendations and herbal supplements prescribed by Dr. Patel have significantly improved my energy levels and helped manage my chronic stress.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    location: 'Pune',
    rating: 4,
    testimonial: 'The Ayurvedic massage treatment was incredibly relaxing and therapeutic. I have been dealing with back pain for years, and after just three sessions, I noticed a remarkable improvement. The staff is professional and the atmosphere is calming.',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Meera Joshi',
    location: 'Bangalore',
    rating: 5,
    testimonial: 'I have been following the Ayurvedic lifestyle recommendations for six months now, and my chronic skin condition has improved significantly. The holistic approach to health really works, and I appreciate the ongoing support from the practitioners.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section bg-soft-green/10">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-leaf-green mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Read about the experiences of those who have benefited from our Ayurvedic treatments and services.
          </p>
          <div className="w-20 h-1 bg-turmeric mx-auto mt-4"></div>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="card relative">
            <div className="text-sand opacity-30 absolute top-6 left-6">
              <FaQuoteLeft size={40} />
            </div>
            
            <div className="text-sand opacity-30 absolute bottom-6 right-6">
              <FaQuoteRight size={40} />
            </div>
            
            <div className="px-12 py-8 relative z-10">
              {/* Testimonial Content */}
              <div className="flex flex-col items-center">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-sand"
                />
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < testimonials[activeIndex].rating ? "text-turmeric" : "text-gray-300"} 
                      size={20} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 text-center italic mb-6">
                  "{testimonials[activeIndex].testimonial}"
                </p>
                
                <div className="text-center">
                  <p className="font-heading font-semibold text-herb-green text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[activeIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-herb-green scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 