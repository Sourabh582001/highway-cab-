import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import WhyTravelWithUs from "@/components/WhyTravelWithUs";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-light-gray">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-blue to-blue-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-poppins font-bold leading-tight">
                Travel Between Cities with{" "}
                <span className="text-golden-yellow">Comfort & Safety</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
                Experience hassle-free intercity travel with our reliable cab service. 
                Professional drivers, comfortable rides, and competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-golden-yellow text-navy-blue font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200 shadow-lg">
                  Book Now
                </button>
                <button className="border-2 border-white text-white font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-navy-blue transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="flex justify-center lg:justify-end">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Travel With Us Section */}
      <WhyTravelWithUs />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
