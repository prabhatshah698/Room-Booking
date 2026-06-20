"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface OwnerContextType {
  ownerName: string;
  setOwnerName: (name: string) => void;

  profileImage: string;
  setProfileImage: (image: string) => void;

  ownerCity: string;
  setOwnerCity: (city: string) => void;

  ownerPhone: string;
  setOwnerPhone: (phone: string) => void;
}

const OwnerContext = createContext<
  OwnerContextType | undefined
>(undefined);

export function OwnerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ownerName, setOwnerName] =
    useState("Owner");

  const [profileImage, setProfileImage] =
    useState("/avatar.png");

  const [ownerCity, setOwnerCity] =
    useState("");

  const [ownerPhone, setOwnerPhone] =
    useState("");

  return (
    <OwnerContext.Provider
      value={{
        ownerName,
        setOwnerName,

        profileImage,
        setProfileImage,

        ownerCity,
        setOwnerCity,

        ownerPhone,
        setOwnerPhone,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
}

export const useOwner = () => {
  const context =
    useContext(OwnerContext);

  if (!context) {
    throw new Error(
      "useOwner must be used inside OwnerProvider"
    );
  }

  return context;
};