"use client";

import React, { useState } from "react";
import Image from "next/image";
import homeImg from "@/public/carpool-concept-illustration_114360-9238.jpg";
const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const features = [
    {
      title: "🚗 Priority-Based Parking Allocation",
      description: `ParkPoolX uses a smart algorithm to allocate parking slots fairly. 
      - Users with fewer past allocations get higher priority.
      - The system ensures an unbiased and optimized distribution.
      - Uses a mix of probability-based selection and historical data analysis.
      - Helps prevent monopolization of parking spaces by frequent users.`,
    },
    {
      title: "🛠️ Smart Carpooling",
      description: `Carpooling management helps employees share rides efficiently.
      - Matches users based on their routes, timing, and parking slot proximity.
      - Uses a Nearest Ride Finding Algorithm to minimize detours.
      - Reduces commuting costs, lowers congestion, and promotes eco-friendly travel.
      - Users can offer or join carpools after the parking allocation process.`,
    },
    {
      title: "🔐 Secure Authentication",
      description: `ParkPoolX ensures security with multiple authentication layers.
      - OTP-based authentication for secure login.
      - Clerk authentication for seamless Google login integration.
      - bcrypt encryption to protect sensitive user data.
      - Role-based access control to separate employee and admin privileges.`,
    },
  ];

  const openModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setModalOpen(true);
  };

  return (
    <div className="relative flex items-center justify-between min-h-screen bg-gray-100 p-6">
      {/* Left Content Section */}
      <div className="w-1/2 p-6">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to ParkPoolX: Smart Parking and Carpool Solutions
        </h1>
        <p className="mb-6 text-lg">
          ParkPoolX optimizes parking allocation and promotes ride-sharing to
          reduce congestion and enhance commuting efficiency.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow cursor-pointer bg-white hover:bg-gray-200 transition"
              onClick={() => openModal(feature.title, feature.description)}
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p>{feature.description.split(".")[0]}...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Curved Image */}
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src={homeImg}
          alt="Carpool Concept"
          className="w-3/4 rounded-l-full shadow-lg"
          width={400}
          height={400}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-2">{modalContent.title}</h2>
            <p className="mb-4 whitespace-pre-line">
              {modalContent.description}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
