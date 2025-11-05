"use client";

import { useSearchParams, useRouter } from "next/navigation";

type Car = {
  id: string;
  name: string;
  type: "Sedan" | "SUV";
  price: number; // base price example
  image: string;
};

const cars: Car[] = [
  {
    id: "dzire",
    name: "Maruti Dzire",
    type: "Sedan",
    price: 3499,
    image: "/car-sedan.svg",
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    type: "SUV",
    price: 4499,
    image: "/car-suv.svg",
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    type: "SUV",
    price: 5999,
    image: "/car-innova.svg",
  },
];

export default function CabListingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const pickup = params.get("pickup") || "Pickup";
  const destination = params.get("destination") || "Destination";
  const trip = params.get("trip") || "oneway";
  const service = params.get("service") || "outstation";

  const subtitle = `${service === "local" ? "Local / Airport" : "Outstation"} • ${
    trip === "round" ? "Round Trip" : "One Way"
  }`;

  return (
    <main className="min-h-screen bg-white dark:bg-navy-blue">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy-blue dark:text-white">
            Cabs from {pickup} to {destination}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-navy-blue dark:text-white">
                    {car.name}
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    {car.type}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Comfortable, well-maintained vehicles for your journey.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-navy-blue dark:text-white">
                    ₹{car.price}
                  </span>
                  <button
                    className="bg-golden-yellow text-black font-semibold px-4 py-2 rounded-md hover:bg-opacity-90"
                    onClick={() => router.push(`/book/${car.id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}