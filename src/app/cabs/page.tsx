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
    originalPrice: 15,
    includedKm: 400,
    extraFarePerKm: 9.0,
    fuelChargesIncluded: true,
    driverChargesIncluded: true,
    nightChargesIncluded: true
  },
  {
    type: "Sedan",
    name: "Honda City",
    image: "/api/placeholder/400/300",
    capacity: 4,
    luggage: 3,
    features: ["AC", "WiFi"],
    price: 16,
    originalPrice: 20,
    includedKm: 442,
    extraFarePerKm: 9.5,
    fuelChargesIncluded: true,
    driverChargesIncluded: true,
    nightChargesIncluded: true
  },
  {
    type: "SUV",
    name: "Toyota Innova",
    image: "/api/placeholder/400/300",
    capacity: 7,
    luggage: 4,
    features: ["AC", "WiFi"],
    price: 22,
    originalPrice: 25,
    includedKm: 500,
    extraFarePerKm: 12.0,
    fuelChargesIncluded: true,
    driverChargesIncluded: true,
    nightChargesIncluded: true
  },
  {
    type: "Tempo Traveller",
    name: "Force Traveller",
    image: "/api/placeholder/400/300",
    capacity: 12,
    luggage: 6,
    features: ["AC", "WiFi"],
    price: 28,
    originalPrice: 32,
    includedKm: 600,
    extraFarePerKm: 16.0,
    fuelChargesIncluded: true,
    driverChargesIncluded: true,
    nightChargesIncluded: true
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
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  // Multi-stop and trip type from URL
  const stopsParam = searchParams.get('stops') || '';
  const tripParam = (searchParams.get('trip') || 'oneway').toLowerCase();

  const handleRideUpdate = (updatedData: any) => {
    setRideDetails(updatedData);
  };

  // Fetch distance: use POST for multi-stop/round-trip, fallback to GET for simple two-city
  useEffect(() => {
    if (!rideDetails.pickup || !rideDetails.destination) return;
    const from = rideDetails.pickup.trim();
    const to = rideDetails.destination.trim();
    if (!from || !to || from.toLowerCase() === to.toLowerCase()) return;

    const stops = stopsParam
      ? stopsParam.split('|').map((s) => s.trim()).filter(Boolean)
      : [];

    // Use multi-stop POST when there are stops or trip is round
    if (stops.length > 0 || tripParam === 'round') {
      const cities = [from, ...stops, to];
      fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cities, tripType: tripParam }),
      })
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((data) => {
          setRouteDistance(typeof data.totalKm === 'number' ? data.totalKm : null);
        })
        .catch(() => {
          setRouteDistance(null);
        });
      return;
    }

    // Fallback: simple two-city GET
    fetch(`/api/distance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => {
        setRouteDistance(typeof data.distanceKm === 'number' ? data.distanceKm : null);
      })
      .catch(() => {
        setRouteDistance(null);
      });
  }, [rideDetails.pickup, rideDetails.destination, stopsParam, tripParam]);

  return (
    <div className="min-h-screen bg-light-gray">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-navy-blue to-blue-900 text-white py-16">
        <div className="max-w-[1200px] mx-auto">
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
        <div className="max-w-[1200px] mx-auto">
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
                includedKm={cab.includedKm}
                extraFarePerKm={cab.extraFarePerKm}
                fuelChargesIncluded={cab.fuelChargesIncluded}
                driverChargesIncluded={cab.driverChargesIncluded}
              nightChargesIncluded={cab.nightChargesIncluded}
              routeDistanceKm={routeDistance ?? undefined}
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