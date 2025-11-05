import Image from "next/image";
import { FaUsers, FaSuitcase, FaSnowflake, FaWifi } from "react-icons/fa";

interface CabCardProps {
  type: string;
  name: string;
  image: string;
  capacity: number;
  luggage: number;
  features: string[];
  price: number;
  originalPrice?: number;
}

export default function CabCard({ type, name, image, capacity, luggage, features, price, originalPrice }: CabCardProps) {
  const getIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'ac':
        return <FaSnowflake className="w-4 h-4" />;
      case 'wifi':
        return <FaWifi className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-golden-yellow text-navy-blue px-3 py-1 rounded-full text-sm font-semibold">
          {type}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-poppins font-semibold text-navy-blue mb-2">
          {name}
        </h3>

        {/* Specifications */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <FaUsers className="w-4 h-4" />
            <span>{capacity} Seats</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaSuitcase className="w-4 h-4" />
            <span>{luggage} Bags</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-1 bg-light-gray text-gray-700 px-3 py-1 rounded-full text-sm">
              {getIcon(feature)}
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-navy-blue">₹{price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">per km</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-lg font-semibold text-navy-blue">₹{price * 50}</p>
          </div>
        </div>

        {/* Book Button */}
        <button className="w-full bg-golden-yellow text-navy-blue font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
          Book Now
        </button>
      </div>
    </div>
  );
}