"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Profile {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  sex: string;
  timestamp: string;
  status: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      router.push("/"); 
    }
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Birth Date:</strong> {profile.birthDate}</p>
      <p><strong>Sex:</strong> {profile.sex}</p>
      <p><strong>Status:</strong> {profile.status}</p>
      <p className="text-gray-500 text-sm">Last Login: {new Date(profile.timestamp).toLocaleString()}</p>
    </div>
  );
}
