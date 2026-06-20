"use client";

import API from "@/lib/api";
// const res = await API.get("/filters");

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

import {
  SlidersHorizontal,
  MapPin,
  Home,
  IndianRupee,
  Zap,
  Check,
  Building2,
  Landmark,
  Hotel,
} from "lucide-react";

interface SidebarFilterProps {
  filters: any;
  setFilters: React.Dispatch<
    React.SetStateAction<any>
  >;
}

export default function SidebarFilter({
  filters,
  setFilters,
}: SidebarFilterProps) {

  const [cities, setCities] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<string[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<string[]>([]);

  const toggleAmenity = (
    item: string
  ) => {
    setFilters((prev: any) => ({
      ...prev,
      amenities:
        prev.amenities.includes(item)
          ? prev.amenities.filter(
            (a: string) =>
              a !== item
          )
          : [
            ...prev.amenities,
            item,
          ],
    }));
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const res = await API.get("/filters");

      setCities(res.data.cities || []);
      setRoomTypes(res.data.room_types || []);
      setAmenitiesList(
        res.data.amenities || []
      );
      setNearbyPlaces(
        res.data.nearby_places || []
      );
    } catch (error) {
      console.error(
        "Failed to load filters",
        error
      );
    }
  };

  const toggleNearby = (
    item: string
  ) => {
    setFilters((prev: any) => ({
      ...prev,
      nearby:
        prev.nearby.includes(item)
          ? prev.nearby.filter(
            (n: string) =>
              n !== item
          )
          : [
            ...prev.nearby,
            item,
          ],
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      area_name: "",
      room_type: "",
      maxPrice: 30000,
      maxElectricity: "",
      nearby: [],
      amenities: [],
      sort: "latest",
    });
  };

  const [citySearch, setCitySearch] = useState(
    filters.city || ""
  );

  const [showCityDropdown, setShowCityDropdown] =
    useState(false);

  const cityRef =
    useRef<HTMLDivElement>(null);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(
        citySearch.toLowerCase()
      )
    );
  }, [cities, citySearch]);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        cityRef.current &&
        !cityRef.current.contains(
          event.target as Node
        )
      ) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <aside className="w-full">
      <div
  className="
    sticky
    top-24
    max-h-[calc(100vh-120px)]
    overflow-y-auto
    pr-1
  "
>

        <div
          className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
        >
          {/* Header */}

          <div
            className="
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            p-5
            text-white
          "
          >
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/20">
                  <SlidersHorizontal size={20} />
                </div>

                <div>
                  {/* <h2 className="font-bold text-lg"> */}
                  <h2 className="font-bold text-xl tracking-tight">
                    Filters
                  </h2>

                  <p className="text-xs text-white/80">
                    Refine your search
                  </p>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="
                bg-white/15
hover:bg-white/25
backdrop-blur-md
                px-3
                py-2
                rounded-xl
                text-xs
                transition
              "
              >
                Reset
              </button>

            </div>
          </div>

          <div className="p-5 space-y-6">

            {/* Sort */}

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Sort By
              </label>

              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters(
                    (prev: any) => ({
                      ...prev,
                      sort:
                        e.target.value,
                    })
                  )
                }
                className="
w-full
rounded-2xl
border
border-slate-300
px-4
py-3
bg-white
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition-all
"
              >
                <option value="latest">
                  Latest First
                </option>

                <option value="low_to_high">
                  Price: Low → High
                </option>

                <option value="high_to_low">
                  Price: High → Low
                </option>
              </select>
            </div>

            {/* Searchable City */}

            <div
              className="relative"
              ref={cityRef}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Building2 size={16} />
                City
              </label>

              <input
                type="text"
                value={citySearch}
                placeholder="Search city..."
                onFocus={() =>
                  setShowCityDropdown(true)
                }
                onChange={(e) => {
                  setCitySearch(e.target.value);

                  setShowCityDropdown(true);

                  if (!e.target.value) {
                    setFilters((prev: any) => ({
                      ...prev,
                      city: "",
                    }));
                  }
                }}
                className="
w-full
rounded-2xl
border
border-slate-300
px-4
py-3
bg-white
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition-all
"
              />

              {showCityDropdown && (
                <div
                  className="
        absolute
        z-50
        mt-2
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-xl
      "
                >
                  <div className="max-h-56 overflow-y-auto">

                    <button
                      type="button"
                      onClick={() => {
                        setFilters((prev: any) => ({
                          ...prev,
                          city: "",
                        }));

                        setCitySearch("");

                        setShowCityDropdown(
                          false
                        );
                      }}
                      className="
            w-full
            text-left
            px-4
            py-3
            hover:bg-slate-50
            border-b
            text-slate-600
          "
                    >
                      All Cities
                    </button>

                    {filteredCities.length >
                      0 ? (
                      filteredCities.map(
                        (city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => {
                              setFilters(
                                (
                                  prev: any
                                ) => ({
                                  ...prev,
                                  city,
                                })
                              );

                              setCitySearch(
                                city
                              );

                              setShowCityDropdown(
                                false
                              );
                            }}
                            className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  transition
                  hover:bg-blue-50
                  ${filters.city ===
                                city
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-slate-700"
                              }
                `}
                          >
                            {city}
                          </button>
                        )
                      )
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        No city found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Area */}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <MapPin size={16} />
                Area
              </label>

              <input
                type="text"
                value={
                  filters.area_name
                }
                placeholder="Area Name"
                onChange={(e) =>
                  setFilters(
                    (prev: any) => ({
                      ...prev,
                      area_name:
                        e.target.value,
                    })
                  )
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
              "
              />
            </div>

            {/* Room Type */}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Home size={16} />
                Room Type
              </label>

              <select
                value={
                  filters.room_type
                }
                onChange={(e) =>
                  setFilters(
                    (prev: any) => ({
                      ...prev,
                      room_type:
                        e.target.value,
                    })
                  )
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
              "
              >
                <option value="">
                  All Room Types
                </option>

                {roomTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Price */}

            <div>
              <div className="flex items-center gap-2 mb-3">
                <IndianRupee size={16} />

                <span className="text-sm font-semibold text-slate-700">
                  Maximum Price
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border">

                <div className="flex justify-between text-sm mb-3">
                  <span>
                    ₹1000
                  </span>

                  <span className="font-bold text-blue-600">
                    ₹
                    {
                      filters.maxPrice
                    }
                  </span>
                </div>

                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={
                    filters.maxPrice
                  }
                  onChange={(e) =>
                    setFilters(
                      (
                        prev: any
                      ) => ({
                        ...prev,
                        maxPrice:
                          Number(
                            e.target
                              .value
                          ),
                      })
                    )
                  }
                  className="
                  w-full
                  accent-blue-600
                "
                />
              </div>
            </div>

            {/* Electricity */}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Zap size={16} />
                Max Electricity
                Charge
              </label>

              <input
                type="number"
                value={
                  filters.maxElectricity
                }
                placeholder="50"
                onChange={(e) =>
                  setFilters(
                    (prev: any) => ({
                      ...prev,
                      maxElectricity:
                        e.target.value,
                    })
                  )
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
              "
              />
            </div>

            {/* Nearby */}

            <div>
              {/* <div className="flex items-center gap-2 mb-3">
                <Landmark size={16} />

                <span className="text-sm font-semibold text-slate-700">
                  Room Near By
                </span>
              </div> */}

              <div className="flex flex-wrap gap-2">

                {nearbyPlaces.map(
                  (item) => {
                    const active =
                      filters.nearby.includes(
                        item
                      );

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          toggleNearby(
                            item
                          )
                        }
                        className={`
                          px-3 py-2
                          rounded-xl
                          text-sm
                          border
                          transition-all duration-200 hover:scale-105
                          ${active
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white border-slate-200 text-slate-700"
                          }
                        `}
                      >
                        {item}
                      </button>
                    );
                  }
                )}

              </div>
            </div>

            {/* Amenities */}

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Hotel size={16} />

                <span className="text-sm font-semibold text-slate-700">
                  Amenities
                </span>
              </div>

              <div className="flex flex-wrap gap-2">

                {amenitiesList.map(
                  (item) => {
                    const active =
                      filters.amenities.includes(
                        item
                      );

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          toggleAmenity(
                            item
                          )
                        }
                        className={`
                          px-3 py-2
                          rounded-xl
                          text-sm
                          border
                          flex
                          items-center
                          gap-1
                          transition-all duration-200 hover:scale-105
                          ${active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white border-slate-200 text-slate-700"
                          }
                        `}
                      >
                        {active && (
                          <Check size={14} />
                        )}

                        {item}
                      </button>
                    );
                  }
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </aside>
  );
}