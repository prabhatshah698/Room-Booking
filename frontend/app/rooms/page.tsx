"use client";

import { useEffect, useState } from "react";

import API from "@/lib/api";

import Navbar from "@/components/Navbar";
import RoomCard from "@/components/RoomCard";
import SidebarFilter from "@/components/SidebarFilter";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Shimmer({
  className = "",
}: {
  className?: string
}) {
  return (
    <div
      className={`
        relative overflow-hidden bg-gray-200
        before:absolute before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/60
        before:to-transparent
        ${className}
      `}
    />
  )
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f7fe]">

      {/* Navbar */}
      <div className="h-16 bg-white border-b" />

      <div className="flex flex-col md:flex-row">

        {/* Sidebar */}
        <div className="hidden md:block w-64 min-h-screen bg-white border-r p-6">

          <div className="space-y-5">
            <Shimmer className="h-10 rounded-xl" />
            <Shimmer className="h-10 rounded-xl" />
            <Shimmer className="h-10 rounded-xl" />
            <Shimmer className="h-10 rounded-xl" />
            <Shimmer className="h-10 rounded-xl" />
          </div>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10">

          {/* Header */}
          <div className="mb-10">
            <Shimmer className="h-12 w-64 rounded-xl" />
            <Shimmer className="h-5 w-96 rounded-lg mt-4" />
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-8 lg:p-10">

            {/* Top */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">

              <Shimmer className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full mx-auto sm:mx-0" />

              <div className="flex-1">

                <Shimmer className="h-10 w-56 rounded-xl mx-auto sm:mx-0" />

                <Shimmer className="h-5 w-32 rounded-lg mt-4 mx-auto sm:mx-0" />

              </div>

              <Shimmer className="h-12 w-full sm:w-40 rounded-2xl" />

            </div>

            {/* Fields */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">

              {[1, 2, 3, 4].map((item) => (
                <div key={item}>

                  <Shimmer className="h-5 w-24 rounded mb-3" />

                  <div className="bg-gray-50 rounded-2xl px-5 py-4">
                    <Shimmer className="h-6 rounded-lg" />
                  </div>

                </div>
              ))}

            </div>

            {/* Bio */}
            <div className="mt-10">

              <Shimmer className="h-5 w-16 rounded mb-4" />

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">

                <Shimmer className="h-4 rounded" />
                <Shimmer className="h-4 rounded" />
                <Shimmer className="h-4 rounded w-5/6" />
                <Shimmer className="h-4 rounded w-4/6" />

              </div>

            </div>

            {/* Button */}
            <div className="flex justify-end mt-10">

              <Shimmer className="h-14 w-full sm:w-48 rounded-2xl" />

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filters, setFilters] =
    useState({
      city: "",
      area_name: "",
      room_type: "",
      maxPrice: 30000,
      maxElectricity: "",
      nearby: [] as string[],
      amenities: [] as string[],
      sort: "latest",
    });

  const fetchRooms = async () => {
    try {
      const response =
        await API.get("/rooms");

      const data =
        response.data.rooms || [];

      setRooms(data);
      setFilteredRooms(data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    let result = [...rooms];

    if (filters.city) {
      result = result.filter(
        (room: any) =>
          room.location
            ?.toLowerCase()
            .includes(
              filters.city.toLowerCase()
            )
      );
    }

    if (filters.area_name) {
      result = result.filter(
        (room: any) =>
          room.area_name
            ?.toLowerCase()
            .includes(
              filters.area_name.toLowerCase()
            )
      );
    }

    if (filters.room_type) {
      result = result.filter(
        (room: any) =>
          room.room_type ===
          filters.room_type
      );
    }

    result = result.filter(
      (room: any) =>
        Number(room.price) <=
        filters.maxPrice
    );

    if (filters.maxElectricity) {
      result = result.filter(
        (room: any) =>
          Number(
            room.electricity_charge
          ) <=
          Number(
            filters.maxElectricity
          )
      );
    }

    if (filters.amenities.length) {
      result = result.filter(
        (room: any) =>
          filters.amenities.every(
            (amenity: string) =>
              room.amenities?.includes(
                amenity
              )
          )
      );
    }

    if (filters.nearby.length) {
      result = result.filter(
        (room: any) =>
          room.nearby_places?.some(
            (place: string) =>
              filters.nearby.some(
                (near: string) =>
                  place
                    .toLowerCase()
                    .includes(
                      near.toLowerCase()
                    )
              )
          )
      );
    }

    if (
      filters.sort ===
      "low_to_high"
    ) {
      result.sort(
        (a: any, b: any) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (
      filters.sort ===
      "high_to_low"
    ) {
      result.sort(
        (a: any, b: any) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    setFilteredRooms(result);
  }, [rooms, filters]);

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-slate-50
        via-white
        to-slate-100
      "
    >
      <Navbar />

      {/* HERO */}
      <div
        className="
          max-w-[1600px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-8
        "
      >
        <div
          className="
            rounded-3xl
            overflow-hidden
            bg-gradient-to-r
            from-indigo-600
            via-blue-600
            to-cyan-500
            p-8
            lg:p-12
            text-white
            shadow-2xl
          "
        >
          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
            "
          >
            Find Your Perfect Room
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-blue-100
              max-w-2xl
            "
          >
            Explore verified rooms,
            apartments and rental
            spaces from trusted owners
            across Nepal.
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-10
              mt-10
            "
          >
            <div>
              <div className="text-3xl font-bold">
                {rooms.length}+
              </div>

              <div className="text-blue-100">
                Active Listings
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">
                100%
              </div>

              <div className="text-blue-100">
                Verified Owners
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">
                24/7
              </div>

              <div className="text-blue-100">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div
        className="
          max-w-[1600px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-8
        "
      >
        {loading ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              py-32
            "
          >
            <Loader2
              size={50}
              className="
                animate-spin
                text-blue-600
              "
            />

            <p className="mt-4 text-gray-500">
              Loading available
              rooms...
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-[320px_1fr]
              gap-8
              items-start
            "
          >
            {/* SIDEBAR */}

            <div
              className="
                xl:sticky
                xl:top-24
                h-fit
                bg-white
                rounded-3xl
                shadow-xl
                border
                border-slate-200
                overflow-hidden
              "
            >
              <SidebarFilter
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            {/* CONTENT */}

            <div>
              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  p-5
                  mb-8
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
              >
                <div>
                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {
                      filteredRooms.length
                    }{" "}
                    Rooms Available
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-1
                    "
                  >
                    Browse verified
                    rental listings
                  </p>
                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-50
                    text-blue-700
                    font-medium
                    w-fit
                  "
                >
                  Updated Daily
                </div>
              </div>

              {filteredRooms.length ===
              0 ? (
                <div
                  className="
                    bg-white
                    rounded-3xl
                    p-20
                    shadow-lg
                    text-center
                  "
                >
                  <div className="text-7xl mb-5">
                    🔍
                  </div>

                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    No Rooms Found
                  </h2>

                  <p
                    className="
                      mt-3
                      text-gray-500
                    "
                  >
                    Try adjusting your
                    filters.
                  </p>
                </div>
              ) : (
                <div
  className="
    grid
    grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
    gap-6
  "
>
  {filteredRooms.map((room) => (
    <RoomCard
      key={room._id}
      room={room}
      isOwner={false}
    />
  ))}
</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// "use client";
// import { useEffect, useState } from "react";

// import API from "@/lib/api";

// import Navbar from "@/components/Navbar";
// import RoomCard from "@/components/RoomCard";
// import SidebarFilter from "@/components/SidebarFilter";

// import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";

// function Shimmer({
//   className = "",
// }: {
//   className?: string
// }) {
//   return (
//     <div
//       className={`
//         relative overflow-hidden bg-gray-200
//         before:absolute before:inset-0
//         before:-translate-x-full
//         before:animate-[shimmer_2s_infinite]
//         before:bg-gradient-to-r
//         before:from-transparent
//         before:via-white/60
//         before:to-transparent
//         ${className}
//       `}
//     />
//   )
// }

// function ProfileSkeleton() {
//   return (
//     <div className="min-h-screen bg-[#f4f7fe]">

//       {/* Navbar */}
//       <div className="h-16 bg-white border-b" />

//       <div className="flex flex-col md:flex-row">

//         {/* Sidebar */}
//         <div className="hidden md:block w-64 min-h-screen bg-white border-r p-6">

//           <div className="space-y-5">
//             <Shimmer className="h-10 rounded-xl" />
//             <Shimmer className="h-10 rounded-xl" />
//             <Shimmer className="h-10 rounded-xl" />
//             <Shimmer className="h-10 rounded-xl" />
//             <Shimmer className="h-10 rounded-xl" />
//           </div>

//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-4 sm:p-6 lg:p-10">

//           {/* Header */}
//           <div className="mb-10">
//             <Shimmer className="h-12 w-64 rounded-xl" />
//             <Shimmer className="h-5 w-96 rounded-lg mt-4" />
//           </div>

//           {/* Profile Card */}
//           <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-8 lg:p-10">

//             {/* Top */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-8">

//               <Shimmer className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full mx-auto sm:mx-0" />

//               <div className="flex-1">

//                 <Shimmer className="h-10 w-56 rounded-xl mx-auto sm:mx-0" />

//                 <Shimmer className="h-5 w-32 rounded-lg mt-4 mx-auto sm:mx-0" />

//               </div>

//               <Shimmer className="h-12 w-full sm:w-40 rounded-2xl" />

//             </div>

//             {/* Fields */}
//             <div className="grid md:grid-cols-2 gap-8 mt-10">

//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item}>

//                   <Shimmer className="h-5 w-24 rounded mb-3" />

//                   <div className="bg-gray-50 rounded-2xl px-5 py-4">
//                     <Shimmer className="h-6 rounded-lg" />
//                   </div>

//                 </div>
//               ))}

//             </div>

//             {/* Bio */}
//             <div className="mt-10">

//               <Shimmer className="h-5 w-16 rounded mb-4" />

//               <div className="bg-gray-50 rounded-2xl p-6 space-y-4">

//                 <Shimmer className="h-4 rounded" />
//                 <Shimmer className="h-4 rounded" />
//                 <Shimmer className="h-4 rounded w-5/6" />
//                 <Shimmer className="h-4 rounded w-4/6" />

//               </div>

//             </div>

//             {/* Button */}
//             <div className="flex justify-end mt-10">

//               <Shimmer className="h-14 w-full sm:w-48 rounded-2xl" />

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default function RoomsPage() {
//   const [rooms, setRooms] = useState<any[]>([]);
//   const [filteredRooms, setFilteredRooms] = useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [filters, setFilters] =
//     useState({
//       city: "",
//       area_name: "",
//       room_type: "",
//       maxPrice: 30000,
//       maxElectricity: "",
//       nearby: [] as string[],
//       amenities: [] as string[],
//       sort: "latest",
//     });

//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const roomsPerPage = 15;

//   const fetchRooms = async () => {
//     try {
//       const response =
//         await API.get("/rooms");

//       const data =
//         response.data.rooms || [];

//       setRooms(data);
//       setFilteredRooms(data);
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         "Failed to fetch rooms"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     let result = [...rooms];

//     if (filters.city) {
//       result = result.filter(
//         (room: any) =>
//           room.location
//             ?.toLowerCase()
//             .includes(
//               filters.city.toLowerCase()
//             )
//       );
//     }

//     if (filters.area_name) {
//       result = result.filter(
//         (room: any) =>
//           room.area_name
//             ?.toLowerCase()
//             .includes(
//               filters.area_name.toLowerCase()
//             )
//       );
//     }

//     if (filters.room_type) {
//       result = result.filter(
//         (room: any) =>
//           room.room_type ===
//           filters.room_type
//       );
//     }

//     result = result.filter(
//       (room: any) =>
//         Number(room.price) <=
//         filters.maxPrice
//     );

//     if (filters.maxElectricity) {
//       result = result.filter(
//         (room: any) =>
//           Number(
//             room.electricity_charge
//           ) <=
//           Number(
//             filters.maxElectricity
//           )
//       );
//     }

//     if (filters.amenities.length) {
//       result = result.filter(
//         (room: any) =>
//           filters.amenities.every(
//             (amenity: string) =>
//               room.amenities?.includes(
//                 amenity
//               )
//           )
//       );
//     }

//     if (filters.nearby.length) {
//       result = result.filter(
//         (room: any) =>
//           room.nearby_places?.some(
//             (place: string) =>
//               filters.nearby.some(
//                 (near: string) =>
//                   place
//                     .toLowerCase()
//                     .includes(
//                       near.toLowerCase()
//                     )
//               )
//           )
//       );
//     }

//     if (
//       filters.sort ===
//       "low_to_high"
//     ) {
//       result.sort(
//         (a: any, b: any) =>
//           Number(a.price) -
//           Number(b.price)
//       );
//     }

//     if (
//       filters.sort ===
//       "high_to_low"
//     ) {
//       result.sort(
//         (a: any, b: any) =>
//           Number(b.price) -
//           Number(a.price)
//       );
//     }

//     // setFilteredRooms(result);
//     setFilteredRooms(result);
//     setCurrentPage(1);
//   }, [rooms, filters]);


//   const totalPages = Math.ceil(
//     filteredRooms.length / roomsPerPage
//   );

//   const startIndex =
//     (currentPage - 1) * roomsPerPage;

//   const currentRooms =
//     filteredRooms.slice(
//       startIndex,
//       startIndex + roomsPerPage
//     );

//   const changePage = (page: number) => {
//     setCurrentPage(page);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-gradient-to-b
//         from-slate-50
//         via-white
//         to-slate-100
//       "
//     >
//       <Navbar />

//       {/* HERO */}
//       <div
//         className="
//           max-w-[1600px]
//           mx-auto
//           px-4
//           sm:px-6
//           lg:px-8
//           pt-8
//         "
//       >
//         <div
//           className="
//             rounded-3xl
//             overflow-hidden
//             bg-gradient-to-r
//             from-indigo-600
//             via-blue-600
//             to-cyan-500
//             p-8
//             lg:p-12
//             text-white
//             shadow-2xl
//           "
//         >
//           <h1
//             className="
//               text-4xl
//               md:text-5xl
//               lg:text-6xl
//               font-bold
//             "
//           >
//             Find Your Perfect Room
//           </h1>

//           <p
//             className="
//               mt-4
//               text-lg
//               text-blue-100
//               max-w-2xl
//             "
//           >
//             Explore verified rooms,
//             apartments and rental
//             spaces from trusted owners
//             across Nepal.
//           </p>

//           <div
//             className="
//               flex
//               flex-wrap
//               gap-10
//               mt-10
//             "
//           >
//             {/* <div>
//               <div className="text-3xl font-bold">
//                 {rooms.length}+
//               </div>

//               <div className="text-blue-100">
//                 Active Listings
//               </div>
//             </div> */}

//             <div>
//               <div className="text-3xl font-bold">
//                 100%
//               </div>

//               <div className="text-blue-100">
//                 Verified Owners
//               </div>
//             </div>

//             <div>
//               <div className="text-3xl font-bold">
//                 24/7
//               </div>

//               <div className="text-blue-100">
//                 Customer Support
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div
//         className="
//           max-w-[1600px]
//           mx-auto
//           px-4
//           sm:px-6
//           lg:px-8
//           py-8
//         "
//       >
//         {loading ? (
//           <div
//             className="
//               flex
//               flex-col
//               items-center
//               justify-center
//               py-32
//             "
//           >
//             <Loader2
//               size={50}
//               className="
//                 animate-spin
//                 text-blue-600
//               "
//             />

//             <p className="mt-4 text-gray-500">
//               Loading available
//               rooms...
//             </p>
//           </div>
//         ) : (
//           <div
//             className="
//               grid
//               grid-cols-1
//               xl:grid-cols-[320px_1fr]
//               gap-8
//               items-start
//             "
//           >
//             {/* SIDEBAR */}

//             <div
//               className="
//                 xl:sticky
//                 xl:top-24
//                 h-fit
//                 bg-white
//                 rounded-3xl
//                 shadow-xl
//                 border
//                 border-slate-200
//                 overflow-hidden
//               "
//             >
//               <SidebarFilter
//                 filters={filters}
//                 setFilters={setFilters}
//               />
//             </div>

//             {/* CONTENT */}

//             <div>
//               <div
//                 className="
//                   bg-white
//                   rounded-2xl
//                   border
//                   border-slate-200
//                   shadow-sm
//                   p-5
//                   mb-8
//                   flex
//                   flex-col
//                   md:flex-row
//                   md:items-center
//                   md:justify-between
//                   gap-4
//                 "
//               >
//                 <div>
//                   <h2
//                     className="
//                       text-2xl
//                       font-bold
//                       text-slate-900
//                     "
//                   >
//                     {
//                       filteredRooms.length
//                     }{" "}
//                     Rooms Available
//                   </h2>

//                   <p
//                     className="
//                       text-slate-500
//                       mt-1
//                     "
//                   >
//                     Browse verified
//                     rental listings
//                   </p>
//                 </div>

//                 <div
//                   className="
//                     px-4
//                     py-2
//                     rounded-xl
//                     bg-blue-50
//                     text-blue-700
//                     font-medium
//                     w-fit
//                   "
//                 >
//                   Updated Daily
//                 </div>
//               </div>

//               {filteredRooms.length ===
//                 0 ? (
//                 <div
//                   className="
//                     bg-white
//                     rounded-3xl
//                     p-20
//                     shadow-lg
//                     text-center
//                   "
//                 >
//                   <div className="text-7xl mb-5">
//                     🔍
//                   </div>

//                   <h2
//                     className="
//                       text-3xl
//                       font-bold
//                     "
//                   >
//                     No Rooms Found
//                   </h2>

//                   <p
//                     className="
//                       mt-3
//                       text-gray-500
//                     "
//                   >
//                     Try adjusting your
//                     filters.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <div
//                     className="
//       grid
//       grid-cols-2
//       md:grid-cols-3
//       lg:grid-cols-4
//       xl:grid-cols-5
//       gap-4
//     "
//                   >
//                     {currentRooms.map((room) => (
//                       <RoomCard
//                         key={room._id}
//                         room={room}
//                         isOwner={false}
//                       />
//                     ))}
//                   </div>

//                   {totalPages > 1 && (
//                     <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
//                       <button
//                         onClick={() =>
//                           changePage(
//                             Math.max(
//                               currentPage - 1,
//                               1
//                             )
//                           )
//                         }
//                         disabled={currentPage === 1}
//                         className="
//           px-4
//           py-2
//           rounded-xl
//           border
//           bg-white
//           hover:bg-slate-100
//           disabled:opacity-50
//           disabled:cursor-not-allowed
//         "
//                       >
//                         Previous
//                       </button>

//                       {Array.from(
//                         { length: totalPages },
//                         (_, i) => i + 1
//                       ).map((page) => (
//                         <button
//                           key={page}
//                           onClick={() =>
//                             changePage(page)
//                           }
//                           className={`
//             w-10
//             h-10
//             rounded-xl
//             font-medium
//             transition
//             ${currentPage === page
//                               ? "bg-blue-600 text-white"
//                               : "bg-white border hover:bg-slate-100"
//                             }
//           `}
//                         >
//                           {page}
//                         </button>
//                       ))}

//                       <button
//                         onClick={() =>
//                           changePage(
//                             Math.min(
//                               currentPage + 1,
//                               totalPages
//                             )
//                           )
//                         }
//                         disabled={
//                           currentPage === totalPages
//                         }
//                         className="
//           px-4
//           py-2
//           rounded-xl
//           border
//           bg-white
//           hover:bg-slate-100
//           disabled:opacity-50
//           disabled:cursor-not-allowed
//         "
//                       >
//                         Next
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }