import React from 'react';
import BookingSystem from '../components/BookingSystem';

const Booking = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-herb-green text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Book Your Appointment</h1>
          <p className="text-xl max-w-3xl">
            Take the first step towards holistic wellness by scheduling a consultation 
            with our experienced Ayurvedic practitioners.
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <section className="section bg-white">
        <BookingSystem />

        {/* Additional Information */}
        <div className="container-custom mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-4">Preparing for Your Visit</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Please arrive 15 minutes before your scheduled appointment</li>
                <li>• Wear comfortable, loose-fitting clothing</li>
                <li>• Avoid heavy meals 2 hours prior to treatment</li>
                <li>• Bring any recent medical reports if available</li>
                <li>• Note any allergies or health concerns to discuss</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-4">Cancellation Policy</h3>
              <p className="text-gray-700 mb-4">
                We understand that unforeseen circumstances may arise. Please provide at least 24 hours' 
                notice for cancellations or rescheduling to avoid any cancellation fees.
              </p>
              <p className="text-gray-700">
                For same-day cancellations or no-shows, a 50% fee may be applied to your account.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-4">Payment Information</h3>
              <p className="text-gray-700 mb-4">
                We accept cash, major credit/debit cards, and digital payment methods. Full payment is 
                expected at the time of service unless otherwise arranged.
              </p>
              <p className="text-gray-700">
                For Panchakarma packages, a 30% deposit is required at the time of booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-soft-green/10">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-leaf-green mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-turmeric mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
                How long is a typical consultation?
              </h3>
              <p className="text-gray-700">
                Initial consultations typically last 60-90 minutes to allow for a comprehensive 
                assessment of your health and constitution. Follow-up appointments are usually 
                30-45 minutes.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
                Do I need to bring anything to my appointment?
              </h3>
              <p className="text-gray-700">
                We recommend bringing any recent medical reports, a list of current medications 
                or supplements, and notes about your health concerns. Wearing comfortable clothing 
                is advised, especially for treatments.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
                How should I prepare for Panchakarma therapy?
              </h3>
              <p className="text-gray-700">
                For Panchakarma, specific preparation (Purvakarma) is required, which will be 
                explained during your consultation. This may include dietary adjustments, herbal 
                preparations, and lifestyle modifications for 3-7 days before treatment begins.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-herb-green mb-2">
                Are these treatments covered by insurance?
              </h3>
              <p className="text-gray-700">
                Coverage varies by insurance provider. Some plans offer partial coverage for 
                complementary treatments. We provide detailed receipts that you can submit to 
                your insurance company for potential reimbursement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking; 