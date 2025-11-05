import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Excellent service! The driver was professional and the car was very clean. Highly recommended for intercity travel.",
    location: "Delhi to Jaipur"
  },
  {
    name: "Priya Sharma",
    rating: 5,
    comment: "Punctual and reliable service. The booking process was smooth and the journey was comfortable. Will definitely use again!",
    location: "Mumbai to Pune"
  },
  {
    name: "Amit Patel",
    rating: 4,
    comment: "Good experience overall. Driver was knowledgeable about the route and we reached on time. Fair pricing too.",
    location: "Ahmedabad to Vadodara"
  },
  {
    name: "Sneha Singh",
    rating: 5,
    comment: "Outstanding service! The cab arrived on time and the driver was very courteous. Made our journey pleasant.",
    location: "Bangalore to Mysore"
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-navy-blue mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative">
              <div className="absolute top-4 left-4 text-golden-yellow opacity-20">
                <FaQuoteLeft className="w-8 h-8" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-golden-yellow' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-poppins font-semibold text-navy-blue">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}