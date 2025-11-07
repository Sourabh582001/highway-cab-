"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import EditRideForm from "@/components/EditRideForm";
import CabCard from "@/components/CabCard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const cabData = [
  {
    type: "Hatchback",
    name: "Maruti Swift",
    image: "https://via.placeholder.com/400x300.png/F2B203/000000?text=Sedan",
    capacity: 4,
    luggage: 2,
    features: ["AC", "WiFi"],
    price: 12,
    originalPrice: 15
  },
  {
    type: "Sedan",
    name: "Honda City",
    image: "/api/placeholder/400/300",
    capacity: 4,
    luggage: 3,
    features: ["AC", "WiFi"],
    price: 16,
    originalPrice: 20
  },
  {
    type: "SUV",
    name: "Toyota Innova",
    image: "/api/placeholder/400/300",
    capacity: 7,
    luggage: 4,
    features: ["AC", "WiFi"],
    price: 22,
    originalPrice: 25
  },
  {
    type: "Tempo Traveller",
    name: "Force Traveller",
    image: "/api/placeholder/400/300",
    capacity: 12,
    luggage: 6,
    features: ["AC", "WiFi"],
    price: 28,
    originalPrice: 32
  }
];

export default function CabListingPage() {
  const searchParams = useSearchParams();
  const [rideDetails, setRideDetails] = useState({
    pickup: searchParams.get('pickup') || '',
    destination: searchParams.get('destination') || '',
    pickupDate: searchParams.get('date') || '',
    pickupTime: searchParams.get('time') || '',
    carType: searchParams.get('carType') || 'hatchback'
  });

  const handleRideUpdate = (updatedData: any) => {
    setRideDetails(updatedData);
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-navy-blue to-blue-900 text-white py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-poppins font-bold mb-4">
            Available Cabs
          </h1>
          <p className="text-lg text-gray-200">
            Choose from our wide range of vehicles for your journey from {rideDetails.pickup} to {rideDetails.destination}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Edit Ride Section */}
          <EditRideForm initialData={rideDetails} onUpdate={handleRideUpdate} />

          {/* Cab Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {cabData.map((cab, index) => (
              <CabCard
                key={index}
                type={cab.type}
                name={cab.name}
                image={cab.image}
                capacity={cab.capacity}
                luggage={cab.luggage}
                features={cab.features}
                price={cab.price}
                originalPrice={cab.originalPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}