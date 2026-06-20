// "use client";

// import { useEffect, useState } from "react";
// import API from "@/lib/api";
// import toast from "react-hot-toast";
// import { Plus, X, MapPin, Wifi, BedDouble } from "lucide-react";

// export default function AdminFiltersPage() {
//   const [filters, setFilters] = useState<any>(null);

//   const [city, setCity] = useState("");
//   const [amenity, setAmenity] = useState("");
//   const [roomType, setRoomType] = useState("");

//   useEffect(() => {
//     loadFilters();
//   }, []);

//   const loadFilters = async () => {
//     try {
//       const res = await API.get("/filters");
//       setFilters(res.data);
//     } catch {
//       toast.error("Failed to load filters");
//     }
//   };

//   const addCity = async () => {
//     if (!city.trim()) return;

//     try {
//       await API.post("/filters/cities", { city });
//       setCity("");
//       loadFilters();
//       toast.success("City Added");
//     } catch {
//       toast.error("Failed to add city");
//     }
//   };

//   const deleteCity = async (city: string) => {
//     try {
//       await API.delete(`/filters/cities/${city}`);
//       loadFilters();
//       toast.success("City Deleted");
//     } catch {
//       toast.error("Failed to delete city");
//     }
//   };

//   const addAmenity = async () => {
//     if (!amenity.trim()) return;

//     try {
//       await API.post("/filters/amenities", { amenity });
//       setAmenity("");
//       loadFilters();
//       toast.success("Amenity Added");
//     } catch {
//       toast.error("Failed to add amenity");
//     }
//   };

//   const deleteAmenity = async (amenity: string) => {
//     try {
//       await API.delete(`/filters/amenities/${amenity}`);
//       loadFilters();
//       toast.success("Amenity Deleted");
//     } catch {
//       toast.error("Failed to delete amenity");
//     }
//   };

//   const addRoomType = async () => {
//     if (!roomType.trim()) return;

//     try {
//       await API.post("/filters/room-types", {
//         room_type: roomType,
//       });

//       setRoomType("");
//       loadFilters();
//       toast.success("Room Type Added");
//     } catch {
//       toast.error("Failed to add room type");
//     }
//   };

//   const deleteRoomType = async (roomType: string) => {
//     try {
//       await API.delete(`/filters/room-types/${roomType}`);
//       loadFilters();
//       toast.success("Room Type Deleted");
//     } catch {
//       toast.error("Failed to delete room type");
//     }
//   };

//   if (!filters) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-slate-500 text-lg">
//           Loading Filters...
//         </div>
//       </div>
//     );
//   }

//   const SectionCard = ({
//     title,
//     icon,
//     value,
//     setValue,
//     placeholder,
//     addAction,
//     items,
//     deleteAction,
//   }: any) => (
//     <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">
//       <div className="flex items-center gap-3 mb-5">
//         <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
//           {icon}
//         </div>

//         <h2 className="text-xl font-semibold text-slate-800">
//           {title}
//         </h2>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-3">
//         <input
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder={placeholder}
//           className="
//             w-full
//             sm:flex-1
//             px-4
//             py-3
//             border
//             border-slate-200
//             rounded-xl
//             outline-none
//             bg-white
//             focus:ring-2
//             focus:ring-blue-500
//             focus:border-blue-500
//             transition
//           "
//         />

//         <button
//           onClick={addAction}
//           className="
//             w-full
//             sm:w-auto
//             flex
//             items-center
//             justify-center
//             gap-2
//             px-6
//             py-3
//             bg-blue-600
//             hover:bg-blue-700
//             text-white
//             rounded-xl
//             font-medium
//             transition
//             whitespace-nowrap
//           "
//         >
//           <Plus size={18} />
//           Add
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-3 mt-5">
//         {items?.map((item: string) => (
//           <div
//             key={item}
//             className="
//               flex
//               items-center
//               gap-2
//               bg-slate-100
//               hover:bg-slate-200
//               px-4
//               py-2
//               rounded-xl
//               transition
//               max-w-full
//             "
//           >
//             <span className="break-all text-slate-700">
//               {item}
//             </span>

//             <button
//               onClick={() => deleteAction(item)}
//               className="
//                 text-red-500
//                 hover:text-red-600
//                 shrink-0
//               "
//             >
//               <X size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Manage Filters
//         </h1>

//         <p className="text-slate-500 mt-1">
//           Manage cities, amenities and room types.
//         </p>
//       </div>

//       <SectionCard
//         title="Cities"
//         icon={<MapPin size={20} />}
//         value={city}
//         setValue={setCity}
//         placeholder="Enter city name"
//         addAction={addCity}
//         items={filters.cities}
//         deleteAction={deleteCity}
//       />

//       <SectionCard
//         title="Amenities"
//         icon={<Wifi size={20} />}
//         value={amenity}
//         setValue={setAmenity}
//         placeholder="Enter amenity name"
//         addAction={addAmenity}
//         items={filters.amenities}
//         deleteAction={deleteAmenity}
//       />

//       <SectionCard
//         title="Room Types"
//         icon={<BedDouble size={20} />}
//         value={roomType}
//         setValue={setRoomType}
//         placeholder="Enter room type"
//         addAction={addRoomType}
//         items={filters.room_types}
//         deleteAction={deleteRoomType}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState, memo } from "react";
import API from "@/lib/api";
import toast from "react-hot-toast";
import {
  Plus,
  X,
  MapPin,
  Wifi,
  BedDouble,
} from "lucide-react";

const SectionCard = memo(function SectionCard({
  title,
  icon,
  value,
  setValue,
  placeholder,
  addAction,
  items,
  deleteAction,
}: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <h2 className="text-xl font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            sm:flex-1
            px-4
            py-3
            border
            border-slate-200
            rounded-xl
            bg-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
          "
        />

        <button
          onClick={addAction}
          className="
            w-full
            sm:w-auto
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-xl
            font-medium
            transition
            whitespace-nowrap
          "
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        {items?.map((item: string) => (
          <div
            key={item}
            className="
              flex
              items-center
              gap-2
              bg-slate-100
              hover:bg-slate-200
              px-4
              py-2
              rounded-xl
              transition
              max-w-full
            "
          >
            <span className="break-all text-slate-700">
              {item}
            </span>

            <button
              onClick={() => deleteAction(item)}
              className="
                text-red-500
                hover:text-red-600
                shrink-0
              "
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function AdminFiltersPage() {
  const [filters, setFilters] = useState<any>(null);

  const [city, setCity] = useState("");
  const [amenity, setAmenity] = useState("");
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const res = await API.get("/filters");
      setFilters(res.data);
    } catch {
      toast.error("Failed to load filters");
    }
  };

  const addCity = async () => {
    if (!city.trim()) return;

    try {
      await API.post("/filters/cities", {
        city: city.trim(),
      });

      setCity("");
      await loadFilters();

      toast.success("City Added");
    } catch {
      toast.error("Failed to add city");
    }
  };

  const deleteCity = async (city: string) => {
    try {
      await API.delete(
        `/filters/cities/${encodeURIComponent(city)}`
      );

      await loadFilters();

      toast.success("City Deleted");
    } catch {
      toast.error("Failed to delete city");
    }
  };

  const addAmenity = async () => {
    if (!amenity.trim()) return;

    try {
      await API.post("/filters/amenities", {
        amenity: amenity.trim(),
      });

      setAmenity("");
      await loadFilters();

      toast.success("Amenity Added");
    } catch {
      toast.error("Failed to add amenity");
    }
  };

  const deleteAmenity = async (amenity: string) => {
    try {
      await API.delete(
        `/filters/amenities/${encodeURIComponent(
          amenity
        )}`
      );

      await loadFilters();

      toast.success("Amenity Deleted");
    } catch {
      toast.error("Failed to delete amenity");
    }
  };

  const addRoomType = async () => {
    if (!roomType.trim()) return;

    try {
      await API.post("/filters/room-types", {
        room_type: roomType.trim(),
      });

      setRoomType("");
      await loadFilters();

      toast.success("Room Type Added");
    } catch {
      toast.error("Failed to add room type");
    }
  };

  const deleteRoomType = async (
    roomType: string
  ) => {
    try {
      await API.delete(
        `/filters/room-types/${encodeURIComponent(
          roomType
        )}`
      );

      await loadFilters();

      toast.success("Room Type Deleted");
    } catch {
      toast.error("Failed to delete room type");
    }
  };

  if (!filters) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-500 text-lg">
          Loading Filters...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Filters
        </h1>

        <p className="text-slate-500 mt-1">
          Manage cities, amenities and room
          types.
        </p>
      </div>

      <SectionCard
        title="Cities"
        icon={<MapPin size={20} />}
        value={city}
        setValue={setCity}
        placeholder="Enter city name"
        addAction={addCity}
        items={filters.cities}
        deleteAction={deleteCity}
      />

      <SectionCard
        title="Amenities"
        icon={<Wifi size={20} />}
        value={amenity}
        setValue={setAmenity}
        placeholder="Enter amenity name"
        addAction={addAmenity}
        items={filters.amenities}
        deleteAction={deleteAmenity}
      />

      <SectionCard
        title="Room Types"
        icon={<BedDouble size={20} />}
        value={roomType}
        setValue={setRoomType}
        placeholder="Enter room type"
        addAction={addRoomType}
        items={filters.room_types}
        deleteAction={deleteRoomType}
      />
    </div>
  );
}