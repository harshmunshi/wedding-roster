"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    arrivalDateTime: "",
    departureDateTime: "",
    arrivalCity: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);
    await fetch("/api/roster", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSubmitted(true);
    setFormData({
      name: "",
      arrivalDateTime: "",
      departureDateTime: "",
      arrivalCity: "",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-2xl md:grid md:grid-cols-2">
        <div className="hidden items-center justify-center rounded-l-lg bg-rose-900 p-8 md:flex">
          <div className="text-center text-white">
            <h1 className="font-tiro text-5xl font-bold">Welcome</h1>
            <p className="mt-4 font-poppins text-lg">
              Please let us know your travel plans.
            </p>
          </div>
        </div>
        <div className="p-8">
          <h2 className="mb-6 font-poppins text-3xl font-bold text-rose-900">
            Guest Roster
          </h2>
          {isSubmitted && (
            <div className="mb-4 rounded-md bg-green-100 p-4 text-green-800">
              Thank you! Your information has been submitted.
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block font-poppins text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="arrivalDateTime"
                className="block font-poppins text-sm font-medium text-gray-700"
              >
                Arrival Date & Time
              </label>
              <input
                type="datetime-local"
                id="arrivalDateTime"
                name="arrivalDateTime"
                value={formData.arrivalDateTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="departureDateTime"
                className="block font-poppins text-sm font-medium text-gray-700"
              >
                Departure Date & Time
              </label>
              <input
                type="datetime-local"
                id="departureDateTime"
                name="departureDateTime"
                value={formData.departureDateTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="arrivalCity"
                className="block font-poppins text-sm font-medium text-gray-700"
              >
                Arrival Location (City)
              </label>
              <input
                type="text"
                id="arrivalCity"
                name="arrivalCity"
                value={formData.arrivalCity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                placeholder="e.g., Delhi"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-rose-800 px-4 py-2 font-poppins text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
