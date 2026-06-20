import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"
import RoomForm from "@/components/owner/RoomForm"

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-[#f4f7fe]">
      <Navbar />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                Edit Room
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Update room details
              </p>
            </div>

            <RoomForm slug={slug} />

          </div>
        </main>
      </div>
    </div>
  )
}