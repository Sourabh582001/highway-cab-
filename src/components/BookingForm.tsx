"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes, FaArrowRight, FaPlusCircle } from "react-icons/fa";

// Small reusable autocomplete hook for GeoDB Cities API
function useCityAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | undefined>();
  const abortRef = useRef<AbortController | null>(null);
  const rapidKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  const useRapid = Boolean(rapidKey && rapidKey.length > 0);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      // Abort any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        if (useRapid) {
          const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(q)}&sort=-population`;
          const res = await fetch(url, {
            headers: {
              // RapidAPI key: provide via NEXT_PUBLIC_RAPIDAPI_KEY env (do not hardcode)
              "X-RapidAPI-Key": rapidKey ?? "",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
            signal: controller.signal,
          });
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Invalid or missing RapidAPI key");
            }
            throw new Error(`HTTP ${res.status}`);
          }
          const data = await res.json();
          const items = Array.isArray(data?.data) ? data.data : [];
          const top5 = items.slice(0, 5).map((c: any) => {
            const city = c.city ?? "";
            const region = c.region ?? c.regionCode ?? "";
            const country = c.country ?? c.countryCode ?? "";
            return [city, region, country].filter(Boolean).join(", ");
          });
          setSuggestions(top5);
          setError(null);
        } else {
          // Fallback: use backend proxy to Nominatim
          const url = `/api/cities?namePrefix=${encodeURIComponent(q)}`;
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          const data = await res.json();
          const items = Array.isArray(data?.data) ? data.data : [];
          const top5 = items.slice(0, 5);
          setSuggestions(top5);
          setError(null);
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return; // ignore aborted
        setSuggestions([]);
        setError(useRapid ? "Failed to fetch city suggestions" : "Failed to fetch city suggestions");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [query]);

  return { suggestions, loading, error };
}

export default function BookingForm() {
  const router = useRouter();

  // Top tabs and trip type
  const [serviceType, setServiceType] = useState<"outstation" | "local-airport">("outstation");
  const [tripType, setTripType] = useState<"round" | "oneway">("oneway");

  // Itinerary state: first item is pickup, rest are stops (final is destination)
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [pickupInput, setPickupInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [showPickupInput, setShowPickupInput] = useState(true);
  const [showDestinationInput, setShowDestinationInput] = useState(true);

  // Dropdown visibility controls
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  // Additional destination inputs user can add dynamically
  const [extraDestInputs, setExtraDestInputs] = useState<string[]>([]);

  // Autocomplete hooks
  const {
    suggestions: pickupSuggestions,
    loading: pickupLoading,
    error: pickupError,
  } = useCityAutocomplete(pickupInput);
  const {
    suggestions: destinationSuggestions,
    loading: destinationLoading,
    error: destinationError,
  } = useCityAutocomplete(destinationInput);

  // Other fields
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [carType, setCarType] = useState("hatchback");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [countryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState<string | null>(null);

  // Build 15-minute interval time options like 6:30 AM
  const timeOptions = useMemo(() => {
    const options: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m of [0, 15, 30, 45]) {
        const hour12 = ((h + 11) % 12) + 1; // 0->12, 13->1
        const ampm = h < 12 ? "AM" : "PM";
        const mm = m.toString().padStart(2, "0");
        options.push(`${hour12}:${mm} ${ampm}`);
      }
    }
    return options;
  }, []);

  // Derived state: Add More enabled only when pickup & destination exist
  // and there are no pending inputs (main destination visible or extra inputs open)
  const hasPickup = itinerary.length >= 1;
  const hasDestination = itinerary.length >= 2;
  const pendingExtraInputs = extraDestInputs.length > 0;
  const pendingMainDestinationInput = showDestinationInput;
  const canAddMore = hasPickup && hasDestination && !pendingExtraInputs && !pendingMainDestinationInput;

  const addPickup = (cityOverride?: string) => {
    const city = (cityOverride ?? pickupInput).trim();
    if (!city) return;
    setItinerary([city, ...itinerary.filter((_, i) => i !== 0)]);
    setShowPickupInput(false);
    setShowDestinationInput(true);
    setShowPickupDropdown(false);
  };

  const addDestination = (cityOverride?: string) => {
    const city = (cityOverride ?? destinationInput).trim();
    if (!city) return;
    setShowDestinationDropdown(false);
    setDestinationInput("");
    setItinerary(prev => {
      if (prev.length === 0) {
        // No pickup yet: treat first destination as pickup and keep destination input visible
        setShowPickupInput(false);
        setShowDestinationInput(true);
        return [city];
      }
      // We already have pickup; add as destination and hide destination input
      setShowDestinationInput(false);
      return [...prev, city];
    });
  };

  const removeItineraryItem = (index: number) => {
    const removed = itinerary[index];
    const next = itinerary.filter((_, i) => i !== index);
    setItinerary(next);
    if (index === 0) {
      // Restores pickup field
      setPickupInput(removed);
      setShowPickupInput(true);
      // If there are no other cities, also allow destination input
      setShowDestinationInput(next.length > 0 ? false : true);
    } else {
      // Restore destination field with removed city
      setDestinationInput(removed);
      setShowDestinationInput(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pickup = itinerary[0] || pickupInput;
    const destination = itinerary[itinerary.length - 1] || destinationInput;
    const stops = itinerary.slice(1, -1);

    // Validate mobile number: require 10 digits for IN (+91)
    if (mobile.replace(/\D/g, "").length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    } else {
      setMobileError(null);
    }

    const params = new URLSearchParams({
      pickup: pickup || "",
      destination: destination || "",
      date: pickupDate,
      time: pickupTime,
      mobile: `${countryCode}${mobile.replace(/\D/g, "")}`,
    });
    if (stops.length) params.append("stops", stops.join("|"));
    params.append("service", serviceType);
    params.append("trip", tripType);
    router.push(`/cabs?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      {/* Service type tabs */}
      <div className="flex gap-2 mb-4">
        {[("outstation" as const), ("local-airport" as const)].map(key => (
          <button
            key={key}
            type="button"
            onClick={() => setServiceType(key)}
            className={`${serviceType === key ? "bg-golden-yellow text-navy-blue" : "bg-light-gray text-gray-700"} px-4 py-2 rounded-2xl cursor-pointer text-[24px] w-[48%] font-semibold`}
          >
            {key === "outstation" ? "Outstation" : "Local / Airport"}
          </button>
        ))}
      </div>

      {/* Trip type toggles */}
      <div className="flex gap-3 mb-4">
        {[("round" as const), ("oneway" as const)].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={`flex items-center gap-2 px-3 py-2 w-[48%] cursor-pointer rounded-xl ${tripType === t ? "bg-golden-yellow text-navy-blue" : "bg-light-gray text-gray-700"}`}
          >
            <span className={`w-3 h-3 rounded-full ${tripType === t ? "bg-navy-blue" : "bg-gray-400"}`}></span>
            {t === "round" ? "Round Trip" : "One Way Trip"}
          </button>
        ))}
      </div>

      {/* Itinerary inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {showPickupInput && (
          <div>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pickupInput}
                  onFocus={() => setShowPickupDropdown(true)}
                  onChange={e => {
                    setPickupInput(e.target.value);
                    if (e.target.value.trim().length >= 2) setShowPickupDropdown(true);
                  }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addPickup())}
                  placeholder="Enter pickup city"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
                />
                {/* <button type="button" onClick={addPickup} className="px-4 py-3 rounded-lg bg-golden-yellow text-navy-blue font-semibold">Add</button> */}
              </div>

              {showPickupDropdown && (
                <div>
                  {pickupLoading && (
                    <div className="text-gray-500 text-sm p-2 italic">Loading…</div>
                  )}
                  {pickupError && (
                    <div className="text-gray-500 text-sm p-2 italic">{pickupError}</div>
                  )}
                  {!pickupLoading && !pickupError && pickupInput.trim().length >= 2 && pickupSuggestions.length === 0 && (
                    <div className="text-gray-500 text-sm p-2 italic">No matching cities found</div>
                  )}
                  {pickupSuggestions.map((s) => (
                    <div
                      key={s}
                      className="px-4 py-2 hover:bg-[#FFF5CC] cursor-pointer text-gray-800"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        // Directly add to itinerary on selection
                        addPickup(s);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showDestinationInput && (
          <div>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={destinationInput}
                  onFocus={() => setShowDestinationDropdown(true)}
                  onChange={e => {
                    setDestinationInput(e.target.value);
                    if (e.target.value.trim().length >= 2) setShowDestinationDropdown(true);
                  }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addDestination())}
                  placeholder="Enter destination / city"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
                />
              </div>

              {showDestinationDropdown && (
                <div>
                  {destinationLoading && (
                    <div className="text-gray-500 text-sm p-2 italic">Loading…</div>
                  )}
                  {destinationError && (
                    <div className="text-gray-500 text-sm p-2 italic">{destinationError}</div>
                  )}
                  {!destinationLoading && !destinationError && destinationInput.trim().length >= 2 && destinationSuggestions.length === 0 && (
                    <div className="text-gray-500 text-sm p-2 italic">No matching cities found</div>
                  )}
                  {destinationSuggestions.map((s) => (
                    <div
                      key={s}
                      className="px-4 py-2 hover:bg-[#FFF5CC] cursor-pointer text-gray-800"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        // Directly add to itinerary on selection
                        addDestination(s);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add more city trigger */}
        <button
          type="button"
          disabled={!canAddMore}
          onClick={() => canAddMore && setExtraDestInputs(prev => [...prev, ""])}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl ${canAddMore ? "bg-golden-yellow text-navy-blue" : "bg-light-gray text-gray-500 cursor-not-allowed opacity-60"}`}
          title={
            !hasPickup || !hasDestination
              ? "Add pickup and destination first"
              : (pendingExtraInputs || pendingMainDestinationInput)
              ? "Complete current city input before adding more"
              : "Add another city stop"
          }
        >
          <span>+ Add More City</span>
          <FaPlusCircle />
        </button>

        {/* Dynamically added destination inputs */}
        {extraDestInputs.map((val, idx) => {
          function DestinationInputRow() {
            const [localValue, setLocalValue] = useState<string>(val);
            const [showDropdown, setShowDropdown] = useState<boolean>(false);
            const { suggestions, loading, error } = useCityAutocomplete(localValue);

            const addCity = (city: string) => {
              addDestination(city);
              // remove this extra input row
              setExtraDestInputs(prev => prev.filter((_, i) => i !== idx));
            };

            return (
              <div className="relative">
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={localValue}
                    onFocus={() => setShowDropdown(true)}
                    onChange={e => {
                      setLocalValue(e.target.value);
                      if (e.target.value.trim().length >= 2) setShowDropdown(true);
                    }}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCity(localValue))}
                    placeholder="Enter destination / city"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
                  />
                </div>
                {showDropdown && (
                  <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
                    {loading && (<div className="text-gray-500 text-sm p-2 italic">Loading…</div>)}
                    {error && (<div className="text-gray-500 text-sm p-2 italic">{error}</div>)}
                    {!loading && !error && localValue.trim().length >= 2 && suggestions.length === 0 && (
                      <div className="text-gray-500 text-sm p-2 italic">No matching cities found</div>
                    )}
                    {suggestions.map(s => (
                      <div
                        key={s}
                        className="px-4 py-2 hover:bg-[#FFF5CC] cursor-pointer text-gray-800"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addCity(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return <DestinationInputRow key={`extra-dest-${idx}`} />;
        })}

        {/* Itinerary pills */}
        {itinerary.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-700 font-medium">Your Itinerary</p>
            <div className="flex flex-wrap items-center gap-2">
              {itinerary.map((city, idx) => (
                <div key={`${city}-${idx}`} className="flex items-center gap-2">
                  <span className="bg-golden-yellow text-navy-blue px-4 py-2 rounded-full inline-flex items-center gap-2">
                    {city}
                    <button type="button" onClick={() => removeItineraryItem(idx)} className="ml-2 text-navy-blue hover:text-black">
                      <FaTimes />
                    </button>
                  </span>
                  {idx < itinerary.length - 1 && (
                    <FaArrowRight className="text-navy-blue" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date / Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTimeDropdown(v => !v)}
                className="cursor-pointer w-full text-left px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none bg-white"
              >
                {pickupTime ? pickupTime : "Select time"}
              </button>
              {showTimeDropdown && (
                <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
                  {timeOptions.map((t) => (
                    <div
                      key={t}
                      className={`px-4 py-2 hover:bg-[#FFF5CC] cursor-pointer text-gray-800 ${pickupTime === t ? "bg-gray-100" : ""}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setPickupTime(t);
                        setShowTimeDropdown(false);
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile number */}
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-3 bg-light-gray text-gray-700 rounded-lg select-none">IN {countryCode}</span>
            <input
              type="tel"
              inputMode="numeric"
              value={mobile}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, "");
                setMobile(digits);
                if (digits.length === 10) setMobileError(null);
              }}
              onBlur={() => {
                if (mobile.replace(/\D/g, "").length !== 10) {
                  setMobileError("Please enter a valid 10-digit mobile number");
                } else {
                  setMobileError(null);
                }
              }}
              placeholder="Enter mobile number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
            />
          </div>
          {mobileError && (
            <p className="text-red-600 text-sm mt-1">{mobileError}</p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-golden-yellow text-navy-blue font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 shadow-md"
        >
          Check Price & Book Cab
        </button>
      </form>
    </div>
  );
}