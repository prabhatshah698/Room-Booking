"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import API from "@/lib/api"
import toast from "react-hot-toast"

import {
  ImagePlus,
  MapPin,
  IndianRupee,
  Loader2,
  X
} from "lucide-react"

interface Props {
  slug?: string
}

interface FormState {
  title: string
  description: string
  price: string
  electricity_charge: string
  location: string
  area_name: string
  latitude: string
  longitude: string
  room_type: string
}

const initialForm: FormState = {
  title: "",
  description: "",
  price: "",
  electricity_charge: "",
  location: "",
  area_name: "",
  latitude: "",
  longitude: "",
  room_type: ""
}

export default function RoomForm({ slug }: Props) {
  const router = useRouter()
  const isEditMode = Boolean(slug)

  const [formData, setFormData] = useState<FormState>(initialForm)
  const [amenities, setAmenities] = useState<string[]>([])
  const [nearbyPlaces, setNearbyPlaces] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const [amenityInput, setAmenityInput] = useState("")
  const [placeInput, setPlaceInput] = useState("")

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [uploading, setUploading] = useState(false)

  // -------------------------
  // Generic handlers
  // -------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // -------------------------
  // Add helpers
  // -------------------------
  const addItem = (
  value: string,
  list: string[],
  setter: (v: string[]) => void,
  errorMsg: string,
  clearInput?: () => void
) => {

  const v = value.trim()

  if (!v) {
    return
  }

  const exists = list.some(
    item =>
      item.toLowerCase() ===
      v.toLowerCase()
  )

  if (exists) {
    toast.error(errorMsg)
    return
  }

  setter([...list, v])

  clearInput?.()
}

  const removeItem = (index: number, list: string[], setter: (v: string[]) => void) => {
    setter(list.filter((_, i) => i !== index))
  }

  // -------------------------
  // Fetch room (edit mode)
  // -------------------------
  useEffect(() => {
    if (!slug) return

    const fetchRoom = async () => {
      try {
        setFetching(true)

        const { data } = await API.get(`/rooms/${slug}`)
        const room = data.room

        setFormData({
          title: room.title || "",
          description: room.description || "",
          price: room.price?.toString() || "",
          electricity_charge: room.electricity_charge?.toString() || "",
          location: room.location || "",
          area_name: room.area_name || "",
          latitude: room.latitude?.toString() || "",
          longitude: room.longitude?.toString() || "",
          room_type: room.room_type || ""
        })

        setAmenities(room.amenities || [])
        setNearbyPlaces(room.nearby_places || [])

        const validImages = (room.images || []).filter((i: string) => i?.trim())

        setImages(validImages.length ? validImages : room.image ? [room.image] : [])

      } catch (err) {
        console.log(err)
        toast.error("Failed to load room")
      } finally {
        setFetching(false)
      }
    }

    fetchRoom()
  }, [slug])

  // -------------------------
  // Upload images
  // -------------------------
  // const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
  //   const files = e.target.files
  //   if (!files) return

  //   try {
  //     setUploading(true)

  //     const uploaded: string[] = []

  //     for (const file of Array.from(files)) {
  //       const form = new FormData()
  //       form.append("file", file)

  //       const { data } = await API.post("/rooms/upload-image", form)

  //       if (data.image_url) uploaded.push(data.image_url)
  //     }

  //     setImages(prev => [...prev, ...uploaded])
  //     toast.success("Images uploaded")

  //   } catch {
  //     toast.error("Upload failed")
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  const uploadImages = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files

  if (!files) return

  // Maximum 10 images validation
  if (images.length + files.length > 10) {
    toast.error("Maximum 10 images are allowed")
    return
  }

  try {
    setUploading(true)

    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const form = new FormData()
      form.append("file", file)

      const { data } = await API.post(
        "/rooms/upload-image",
        form
      )

      if (data.image_url) {
        uploaded.push(data.image_url)
      }
    }

    setImages(prev => [...prev, ...uploaded])

    toast.success(
      `${uploaded.length} image${
        uploaded.length > 1 ? "s" : ""
      } uploaded`
    )
  } catch {
    toast.error("Upload failed")
  } finally {
    setUploading(false)
  }
}

  // -------------------------
  // Submit
  // -------------------------
  const handleSubmit = async () => {
    try {
      setLoading(true)

      // const cleanImages = images.filter(i => i?.trim())
      const cleanImages = images.filter(i => i?.trim())

if (cleanImages.length < 3) {
  toast.error("Please upload at least 3 images")
  return
}

if (cleanImages.length > 10) {
  toast.error("Maximum 10 images are allowed")
  return
}

      const payload = {
        owner_id: localStorage.getItem("ownerId"),
        ...formData,
        price: Number(formData.price),
        electricity_charge: Number(formData.electricity_charge),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        nearby_places: nearbyPlaces,
        amenities,
        image: cleanImages[0],
        images: cleanImages
      }

      if (isEditMode) {
        await API.put(`/rooms/update/${slug}`, payload)
        toast.success("Room updated")
      } else {
        await API.post("/rooms/add", payload)
        toast.success("Room added")
      }

      router.push("/owner/my-rooms")
      router.refresh()

    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border">

      <div className="grid xl:grid-cols-2 gap-6 lg:gap-8">

        {/* LEFT */}
        <div className="space-y-5">

          <input name="title" value={formData.title} onChange={handleChange}
            placeholder="Room Title" className="input" />

          <textarea name="description" value={formData.description} onChange={handleChange}
            placeholder="Description" rows={5} className="input" />

          <div className="flex items-center input">
            <IndianRupee />
            <input name="price" value={formData.price} onChange={handleChange}
              placeholder="Price" className="flex-1 outline-none bg-transparent ml-2" />
          </div>

          <input name="electricity_charge" value={formData.electricity_charge}
            onChange={handleChange} placeholder="Electricity Charge" className="input" />

          <div className="flex items-center input">
            <MapPin />
            <input name="location" value={formData.location}
              onChange={handleChange} placeholder="Location"
              className="flex-1 bg-transparent outline-none ml-2" />
          </div>

          <input name="area_name" value={formData.area_name}
            onChange={handleChange} placeholder="Area Name" className="input" />

          <input name="latitude" value={formData.latitude}
            onChange={handleChange} placeholder="Latitude" className="input" />

          <input name="longitude" value={formData.longitude}
            onChange={handleChange} placeholder="Longitude" className="input" />

          <button
            type="button"
            onClick={() =>
              navigator.geolocation.getCurrentPosition(
                pos => {
                  setFormData(prev => ({
                    ...prev,
                    latitude: String(pos.coords.latitude),
                    longitude: String(pos.coords.longitude)
                  }))
                  toast.success("Location captured")
                },
                () => toast.error("Permission denied")
              )
            }
            className="btn-green"
          >
            Use Current Location
          </button>

        </div>

        {/* RIGHT */}
        <div className="space-y-5">

          <select name="room_type" value={formData.room_type}
            onChange={handleChange} className="input">

            <option value="">Select Room Type</option>
            <option>Single Room</option>
            <option>Double Room</option>
            <option>Apartment</option>

          </select>

          {/* Amenities */}
          <div className="flex gap-2">
            <input value={amenityInput}
              onChange={e => setAmenityInput(e.target.value)}
              placeholder="Add amenity" className="input flex-1" />

            <button
  onClick={() =>
    addItem(
      amenityInput,
      amenities,
      setAmenities,
      "Already exists",
      () => setAmenityInput("")
    )
  }
  className="btn-blue"
>
  Add
</button>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.map((a, i) => (
              <span key={i} className="chip">
                {a}
                <button onClick={() => removeItem(i, amenities, setAmenities)}>✕</button>
              </span>
            ))}
          </div>

          {/* Nearby */}
          <div className="flex gap-2">
            <input value={placeInput}
              onChange={e => setPlaceInput(e.target.value)}
              placeholder="Nearby places" className="input flex-1" />

            <button
  onClick={() =>
    addItem(
      placeInput,
      nearbyPlaces,
      setNearbyPlaces,
      "Already exists",
      () => setPlaceInput("")
    )
  }
  className="btn-green"
>
  Add
</button>
          </div>

          <div className="flex flex-wrap gap-2">
            {nearbyPlaces.map((a, i) => (
              <span key={i} className="chip">
                {a}
                <button onClick={() => removeItem(i, nearbyPlaces, setNearbyPlaces)}>✕</button>
              </span>
            ))}
          </div>

          {/* Images */}
          <label className="border-dashed border-2 p-8 rounded-2xl text-center cursor-pointer block">
            <ImagePlus className="mx-auto" />
            {/* <p>{uploading ? "Uploading..." : "Upload Images"}</p> */}

            <p>
  {uploading
    ? "Uploading..."
    : `Upload Images (${images.length}/10)`}
</p>

<p className="text-xs text-gray-500 mt-1">
  Minimum 3 images • Maximum 10 images
</p>
            <input type="file" multiple hidden onChange={uploadImages} />
          </label>

          <div className="grid grid-cols-2 gap-3">
            {images.filter(Boolean).map((img, i) => (
              <div key={i} className="relative h-28 rounded-xl overflow-hidden">
                <Image src={img} alt="" fill className="object-cover" unoptimized />
                <button
                  onClick={() => removeItem(i, images, setImages)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-8">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="btn-primary"
        >
          {loading && <Loader2 className="animate-spin mr-2" />}
          {isEditMode ? "Update Room" : "Publish Room"}
        </button>
      </div>

      {/* styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          background: #f3f4f6;
          border-radius: 14px;
          outline: none;
        }
        .btn-green { background:#16a34a; color:#fff; padding:10px 16px; border-radius:12px }
        .btn-blue { background:#2563eb; color:#fff; padding:10px 16px; border-radius:12px }
        .btn-primary {
          background: linear-gradient(to right,#2563eb,#7c3aed);
          color:#fff;
          padding:12px 24px;
          border-radius:14px;
          font-weight:600;
        }
        .chip {
          background:#e0f2fe;
          padding:6px 10px;
          border-radius:10px;
          display:flex;
          gap:6px;
          align-items:center;
        }
      `}</style>

    </div>
  )
}