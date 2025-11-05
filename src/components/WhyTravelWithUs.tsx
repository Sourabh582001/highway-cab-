import { FaShieldAlt, FaClock, FaMapMarkedAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    title: "Safe & Secure",
    description: "Verified drivers and well-maintained vehicles ensure your safety throughout the journey."
  },
  {
    icon: FaClock,
    title: "On-Time Service",
    description: "Punctual pickups and timely arrivals. We value your time and schedule."
  },
  {
    icon: FaMapMarkedAlt,
    title: "Wide Coverage",
    description: "Extensive network covering major cities and towns across the region."
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever needed."
  }
];

export default function WhyTravelWithUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-navy-blue mb-4">
            Why Travel With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide reliable, comfortable, and affordable intercity cab services with a focus on customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-light-gray">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-yellow rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy-blue mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}