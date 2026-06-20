"use client";

import { useState, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Phone,
  X,
} from "lucide-react";

const images = [
  "https://nestaway-houses-assets.nestaway.com/uploads/images/thumb_large_c98d85e0-63d1-4ebe-bc6c-2d6f13a81e16.jpeg",

  "https://images.nobroker.in/images/8aa9d61c9dc8b93b019dc8d08c260a8a/8aa9d61c9dc8b93b019dc8d08c260a8a_37898_370954_medium.jpg",

  "https://images.nobroker.in/images/8aa9beec9d41f3f0019d420e75820726/8aa9beec9d41f3f0019d420e75820726_84573_916690_medium.jpg",

  "https://images.nobroker.in/images/8aa9cd3a9d9bec07019d9c30b8691189/8aa9cd3a9d9bec07019d9c30b8691189_90010_435977_medium.jpg",

  "https://housing-is-01.s3.amazonaws.com/hsshorts/93337298e3aaabd9d0314378ff060887/original.jpg",

  "https://sankalpbuilders.com/wp-content/uploads/2026/02/3-BHK-Flat-for-Rent-in-Jaipur.jpeg",

  "https://flatsdekho.in/assets/uploads/1753937777r-rent.jpg",
];

export default function PropertyDetailsPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [openViewer, setOpenViewer] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (openViewer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openViewer]);

  return (
    <main className="min-h-screen bg-[#f2f4f5]">
      <section className="max-w-7xl mx-auto px-3 py-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              3 BHK Apartment in Paschim Vihar
            </h1>

            <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
              <MapPin size={16} />
              <span>Paschim Vihar, Delhi</span>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button
              aria-label="Add to wishlist"
              className="bg-white border p-2 rounded-md"
            >
              <Heart size={20} />
            </button>

            <button
              aria-label="Share property"
              className="bg-white border p-2 rounded-md"
            >
              <Share2 size={20} />
            </button>

          </div>

        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* LEFT IMAGE SECTION */}
          <div className="lg:col-span-2 bg-white border rounded-md overflow-hidden">

            {/* Main Image */}
            <div className="relative bg-black h-[520px]">

              {/* Left Arrow */}
              <button
                aria-label="Previous image"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white"
              >
                <ChevronLeft size={40} />
              </button>

              {/* Right Arrow */}
              <button
                aria-label="Next image"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white"
              >
                <ChevronRight size={40} />
              </button>

              {/* Image */}
              <div
                onClick={() => setOpenViewer(true)}
                className="w-full h-full cursor-pointer"
              >
                <img
                  src={images[currentImage]}
                  alt="Property"
                  className="w-full h-full object-contain"
                />
              </div>

            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto p-3 bg-white">

              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`min-w-[90px] h-[70px] border-2 rounded-md overflow-hidden ${
                    currentImage === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">

            {/* Price Card */}
            <div className="bg-white border rounded-md p-5">

              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-4xl font-bold">
                    ₹25,000
                  </h2>

                  <p className="text-gray-700 mt-2">
                    3 BHK • 2 Bathroom • 1350 sqft
                  </p>

                  <p className="text-gray-500 mt-2">
                    Semi-Furnished Apartment
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between mt-5 text-sm text-gray-500">

                <p>Paschim Vihar, Delhi</p>

                <p>Today</p>

              </div>

            </div>

            {/* Seller Card */}
            <div className="bg-white border rounded-md p-5">

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  R
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Rahul Sharma
                  </h3>

                  <p className="text-sm text-gray-500">
                    Member since Apr 2025
                  </p>
                </div>

              </div>

              <button className="w-full mt-5 border-2 border-blue-600 text-blue-600 py-3 rounded-md font-semibold hover:bg-blue-50 transition">
                Chat with Seller
              </button>

              <button className="w-full mt-3 bg-black text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2">
                <Phone size={17} />
                Show Number
              </button>

            </div>

            {/* Map */}
            <div className="bg-white border rounded-md p-5">

              <h2 className="text-2xl font-bold mb-3">
                Posted in
              </h2>

              <p className="text-gray-600 mb-4">
                Paschim Vihar, Delhi
              </p>

              <div className="overflow-hidden rounded-md border">

                <iframe
                  title="Property Location"
                  src="https://www.google.com/maps?q=Paschim%20Vihar%20Delhi&output=embed"
                  width="100%"
                  height="250"
                  loading="lazy"
                  className="w-full"
                ></iframe>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM CONTENT */}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">

            {/* Details */}
            <div className="bg-white border rounded-md p-5">

              <h2 className="text-2xl font-bold mb-5">
                Details
              </h2>

              <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-sm">

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium">
                    Flats / Apartments
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Bedrooms
                  </span>
                  <span className="font-medium">3</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Bathrooms
                  </span>
                  <span className="font-medium">2</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Furnishing
                  </span>
                  <span className="font-medium">
                    Semi-Furnished
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Super Built-up Area
                  </span>
                  <span className="font-medium">
                    1350 sqft
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Car Parking
                  </span>
                  <span className="font-medium">1</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Floor No
                  </span>
                  <span className="font-medium">2</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">
                    Facing
                  </span>
                  <span className="font-medium">
                    North-East
                  </span>
                </div>

              </div>

            </div>

            {/* Description */}
            <div className="bg-white border rounded-md p-5">

              <h2 className="text-2xl font-bold mb-4">
                Description
              </h2>

              <p className="text-gray-700 leading-7 text-sm">
                Premium apartment with spacious bedrooms,
                attached bathrooms, balcony, modular
                kitchen, lift access, parking facility and
                nearby metro connectivity. Perfect for
                family living.
              </p>

            </div>

            {/* Amenities */}
            <div className="bg-white border rounded-md p-5">

              <h2 className="text-2xl font-bold mb-4">
                Amenities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">

                {[
                  "WiFi",
                  "Lift",
                  "Gym",
                  "CCTV",
                  "Power Backup",
                  "Security",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border rounded-md px-3 py-2"
                  >
                    ✅ {item}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FULLSCREEN VIEWER */}
      {openViewer && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">

          {/* Close */}
          <button
            aria-label="Close viewer"
            onClick={() => setOpenViewer(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={40} />
          </button>

          {/* Left */}
          <button
            aria-label="Previous fullscreen image"
            onClick={prevImage}
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={45} />
          </button>

          {/* Image */}
          <div className="relative w-[95%] max-w-5xl h-[90vh]">

            <img
              src={images[currentImage]}
              alt="fullscreen"
              className="w-full h-full object-contain"
            />

          </div>

          {/* Right */}
          <button
            aria-label="Next fullscreen image"
            onClick={nextImage}
            className="absolute right-5 text-white"
          >
            <ChevronRight size={45} />
          </button>

          {/* Bottom Thumbnails */}
          <div className="absolute bottom-5 flex gap-3 overflow-x-auto bg-black/50 p-3 rounded-xl max-w-[90%]">

            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`min-w-[90px] h-[70px] rounded-md overflow-hidden border-2 ${
                  currentImage === index
                    ? "border-white"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

          </div>

        </div>
      )}

    </main>
  );
}