"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    pickupDate: "",
    pickupTime: "",
    carType: "hatchback",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to cab listing page with query parameters
    const params = new URLSearchParams({
      pickup: formData.pickup,
      destination: formData.destination,
      date: formData.pickupDate,
      time: formData.pickupTime,
      carType: formData.carType,
    });
    router.push(`/cabs?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h3 className="text-xl font-poppins font-semibold text-navy-blue mb-6 text-center">
        Book Your Ride
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            id="pickup"
            name="pickup"
            value={formData.pickup}
            onChange={handleInputChange}
            placeholder="Enter pickup location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter destination"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none transition-all"
          >
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="tempo-traveller">Tempo Traveller</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-golden-yellow text-navy-blue font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 shadow-md"
        >
          Search Cabs
        </button>
      </form>
    </div>
  );
}