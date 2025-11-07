import Navbar from "@/components/Navbar";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import WhyTravelWithUs from "@/components/WhyTravelWithUs";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-light-gray">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-[60px] bg-gradient-to-b from-[#d3ecfd] to-[#FFFFFF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Headline */}
            <div className="space-y-6">
              <h1 className="text-[60px] font-semibold leading-[70px]">
                Book Intercity Cabs. Travel with Comfort & Trust.
              </h1>
              <p className="mt-4 text-[18px] md:text-[20px] text-[#334155] leading-[30px] font-normal max-w-2xl">
                Book reliable cabs for your intercity journeys. Professional drivers, comfortable rides, and transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-1">
                <button className="bg-golden-yellow text-navy-blue font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
                  Book Now
                </button>
                <button className="border-2 border-golden-yellow text-golden-yellow font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-golden-yellow hover:text-navy-blue transition-colors">
                  Learn More
                </button>
              </div>
              <div className="flex justify-end">
                <Image
                  src="/cab-vector.svg"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="w-[300px] object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
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
