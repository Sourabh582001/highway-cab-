'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div className="bg-white dark:bg-navy-blue">
      <Navbar />
      <main>
        <Hero />

        <section id="why-us" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-10">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card 
                title="Verified Drivers"
                description="Professionally vetted drivers with strong safety records and customer ratings."
              />
              <Card 
                title="Transparent Pricing"
                description="Clear fares without hidden charges. Pay what you see."
              />
              <Card 
                title="24/7 Support"
                description="Dedicated support for your trips, any time, anywhere."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card 
                title="Book Easily"
                description="Find and book your intercity ride in just a few clicks. Our user-friendly platform makes booking a breeze."
              />
              <Card 
                title="Verified Drivers"
                description="Travel with confidence. All our drivers are thoroughly vetted to ensure your safety and comfort."
              />
              <Card 
                title="Safe Intercity Travel"
                description="We prioritize your well-being with regular vehicle checks and 24/7 customer support."
              />
            </div>
          </div>
        </section>

        <section id="top-routes" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-10">Top Routes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card title="Delhi → Jaipur" description="Comfortable one-way or round trips starting at ₹3499." />
              <Card title="Mumbai → Pune" description="Premium sedans and SUVs, fares from ₹2999." />
              <Card title="Bangalore → Mysore" description="On-time pickups with verified local drivers." />
            </div>
          </div>
        </section>

        <section id="vendor" className="bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-4">Grow with Highway Cab</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Join our network of trusted vendors and expand your business. We provide the platform, you provide the service.</p>
            <button className="bg-golden-yellow text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90">Join as a Vendor</button>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-12">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card 
                title="'A Great Experience'"
                description="The booking was seamless and the driver was very professional. I felt safe throughout my journey. Highly recommended! - Priya S."
              />
              <Card 
                title="'Reliable and Punctual'"
                description="I use Highway Cab for all my intercity travel needs. They are always on time and the cars are clean and comfortable. - Rajesh K."
              />
              <Card 
                title="'Excellent Service'"
                description="The customer support team was very helpful in resolving my query. The overall service is top-notch. - Anjali M."
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
