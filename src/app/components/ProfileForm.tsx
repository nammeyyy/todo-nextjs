"use client";
import { useState, useEffect } from "react";

const fields = [
  { name: "firstName", type: "text", placeholder: "First Name" },
  { name: "lastName", type: "text", placeholder: "Last Name" },
  { name: "age", type: "number", placeholder: "Age" },
  { name: "birthDate", type: "date", placeholder: "Birth Date" },
];

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    birthDate: "",
    sex: "",
    timestamp: new Date().toISOString(),
    status: "Active",
  });

  const [formattedTimestamp, setFormattedTimestamp] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setFormattedTimestamp(new Date(parsedProfile.timestamp).toLocaleString());
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setFormattedTimestamp(new Date(updatedProfile.timestamp).toLocaleString());
    alert("Profile saved!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-2xl border border-purple-300">
      <h2 className="text-2xl font-semibold text-purple-600 text-center mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={profile[field.name as keyof typeof profile]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-3 border rounded-lg text-gray-700 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        ))}
        
        {/* Gender Selection */}
        <select
          name="sex"
          value={profile.sex}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-gray-700 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="" disabled>
            Please select your sex
          </option>
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Status Selection */}
        <select
          name="status"
          value={profile.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-gray-700 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {["Active", "Inactive"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Timestamp Display (Client-Side Rendered) */}
        {formattedTimestamp && (
          <p className="text-gray-500 text-sm text-center">
            Last Updated: {formattedTimestamp}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg font-semibold transition duration-200"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
