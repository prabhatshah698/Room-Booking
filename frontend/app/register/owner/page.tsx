"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import API from "@/lib/api";

import toast from "react-hot-toast";

import {
  Loader2,
  Building2,
  Mail,
  Phone,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

// const cities = [
//   "Kathmandu",
//   "Lalitpur",
//   "Bhaktapur",
//   "Pokhara",
//   "Biratnagar",
//   "Butwal",
//   "Dharan",
//   "Hetauda",
//   "Janakpur",
//   "Nepalgunj",
//   "Itahari",
//   "Chitwan",
// ];


export default function OwnerRegisterPage() {
  const router = useRouter();
  
  const [cities, setCities] =
    useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [citySearch, setCitySearch] =
  useState("");

const [
  showCityDropdown,
  setShowCityDropdown,
] = useState(false);

const cityRef =
  useRef<HTMLDivElement>(null);

const filteredCities = useMemo(() => {
  return cities.filter((city) =>
    city
      .toLowerCase()
      .includes(citySearch.toLowerCase())
  );
}, [cities, citySearch]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.city ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Enter a valid 10 digit phone number");
      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters"
      );
      return;
    }

    if (!acceptedTerms) {
      toast.error(
        "Please accept Terms & Conditions"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/owners/create",
        formData
      );

      localStorage.setItem(
        "ownerId",
        response.data.owner._id
      );

      toast.success(
        "Owner Registered Successfully"
      );

      router.push("/owner");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

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

useEffect(() => {
  const loadCities =
    async () => {
      try {
        const res =
          await API.get(
            "/filters"
          );

        setCities(
          res.data.cities ||
            []
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  loadCities();
}, []);

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-[32px] p-8">

          {/* Header */}
          <div className="text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Building2
                className="text-white"
                size={28}
              />
            </div>

            <h1 className="text-3xl font-black mt-5 text-gray-900">
              Create Owner Account
            </h1>

            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Create your owner account and start listing
              rooms, flats and rental properties
              across Nepal.
            </p>

          </div>

          {/* Form */}
          <div className="space-y-4 mt-8">

            <Input
              icon={<User size={18} />}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* City */}
            {/* Searchable City */}

<div
  className="relative"
  ref={cityRef}
>
  <div className="absolute left-4 top-4 text-gray-400 z-10">
    <Building2 size={18} />
  </div>

  <input
    type="text"
    value={citySearch}
placeholder="Search City..."
    onFocus={() =>
      setShowCityDropdown(true)
    }
    onChange={(e) => {
      setCitySearch(
        e.target.value
      );

      setShowCityDropdown(true);

      if (!e.target.value) {
        setFormData(
          (prev) => ({
            ...prev,
            city: "",
          })
        );
      }
    }}
    className="
      w-full
      pl-11
      pr-4
      py-4
      rounded-xl
      border
      border-gray-200
      bg-white
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-100
      outline-none
      transition
      text-sm
    "
  />

  {showCityDropdown && (
    <div
      className="
        absolute
        z-50
        mt-2
        w-full
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-xl
        overflow-hidden
      "
    >
      <div className="max-h-56 overflow-y-auto">

        {filteredCities.length > 0 ? (
  filteredCities.map((city) => (
    <button
      key={city}
      type="button"
      onClick={() => {
        setFormData((prev) => ({
          ...prev,
          city,
        }));

        setCitySearch(city);
        setShowCityDropdown(false);
      }}
      className={`
        w-full
        text-left
        px-4
        py-3
        hover:bg-blue-50
        transition
        ${
          formData.city === city
            ? "bg-blue-50 text-blue-600 font-semibold"
            : "text-gray-700"
        }
      `}
    >
      {city}
    </button>
  ))
) : (
  <div className="px-4 py-3 text-sm text-gray-500">
    No city found
  </div>
)}

      </div>
    </div>
  )}
</div>

            <Input
              icon={<Mail size={18} />}
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              icon={<Phone size={18} />}
              name="phone"
              placeholder="98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Password */}
            <div className="relative">

              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="
                  w-full
                  pl-11
                  pr-12
                  py-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  outline-none
                  transition
                  text-sm
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 text-sm">

              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) =>
                  setAcceptedTerms(
                    e.target.checked
                  )
                }
                className="mt-1"
              />

              <p className="text-gray-500">
                I agree to the Terms &
                Conditions and Privacy Policy.
              </p>

            </div>

            {/* Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="
                w-full
                py-4
                rounded-2xl
                font-bold
                text-white
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                hover:opacity-90
                transition
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Create Owner Account
                </>
              )}
            </button>

            {/* Login */}
            <div className="text-center mt-5">

              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login/owner"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

function Input({
  icon,
  name,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <div className="relative">

      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>

      <input
        type={
          name === "phone"
            ? "tel"
            : name === "email"
            ? "email"
            : "text"
        }
        autoComplete={
          name === "email"
            ? "email"
            : name === "phone"
            ? "tel"
            : name === "name"
            ? "name"
            : "off"
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          pl-11
          pr-4
          py-4
          rounded-xl
          border
          border-gray-200
          bg-white
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          outline-none
          transition
          text-sm
        "
      />

    </div>
  );
}