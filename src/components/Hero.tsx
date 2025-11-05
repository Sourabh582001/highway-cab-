"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Hero = () => {
  const router = useRouter();

  const [serviceType, setServiceType] = useState<'outstation' | 'local'>('outstation');
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [pickupCity, setPickupCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [viaCities, setViaCities] = useState<string[]>([]);
  const [phone, setPhone] = useState('');

  const addViaCity = () => setViaCities((v) => [...v, '']);
  const updateViaCity = (index: number, value: string) => {
    setViaCities((v) => v.map((c, i) => (i === index ? value : c)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      service: serviceType,
      trip: tripType,
      pickup: pickupCity,
      destination: destinationCity,
      phone,
      ...(viaCities.length ? { via: viaCities.join('|') } : {}),
    });
    router.push(`/cabs?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-navy-blue dark:to-gray-900 py-14 md:py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue dark:text-white leading-tight">
            HighwayCab — Premium Intercity Cab Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4">
            Safe, reliable rides across cities. Verified drivers, transparent pricing, and 24/7 support.
          </p>
          <a href="#booking" className="inline-block mt-6 bg-golden-yellow text-black px-6 py-3 rounded-md font-semibold hover:bg-opacity-90">
            Book Your Ride
          </a>
        </div>

        {/* Booking Form */}
        <div id="booking" className="w-full">
          <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800">
            {/* Form Header */}
            <div className="bg-golden-yellow text-center py-3">
              <p className="font-semibold text-black">All India Cab Service</p>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('outstation')}
                  className={`rounded-xl py-4 font-semibold ${
                    serviceType === 'outstation'
                      ? 'bg-golden-yellow text-black'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Outstation
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('local')}
                  className={`rounded-xl py-4 font-semibold ${
                    serviceType === 'local'
                      ? 'bg-golden-yellow text-black'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Local / Airport
                </button>
              </div>

              {/* Trip type */}
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 rounded-xl py-3 px-4 ${tripType === 'round' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}`}>
                  <input
                    type="radio"
                    name="tripType"
                    className="accent-golden-yellow"
                    checked={tripType === 'round'}
                    onChange={() => setTripType('round')}
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">Round Trip</span>
                </label>
                <label className={`flex items-center gap-3 rounded-xl py-3 px-4 ${tripType === 'oneway' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}`}>
                  <input
                    type="radio"
                    name="tripType"
                    className="accent-golden-yellow"
                    checked={tripType === 'oneway'}
                    onChange={() => setTripType('oneway')}
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">One Way Trip</span>
                </label>
              </div>

              {/* Cities */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter pickup city"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter destination city"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none"
                  required
                />

                {/* Add More City */}
                <div className="rounded-xl bg-yellow-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between">
                  <button type="button" onClick={addViaCity} className="text-navy-blue dark:text-white font-medium">
                    + Add More City
                  </button>
                </div>

                {viaCities.map((c, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Via city ${i + 1}`}
                    value={c}
                    onChange={(e) => updateViaCity(i, e.target.value)}
                    className="w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none"
                  />
                ))}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">IN +91</span>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-golden-yellow text-black font-semibold text-lg py-3 rounded-xl hover:bg-opacity-90"
              >
                Check Price & Book Cab
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;