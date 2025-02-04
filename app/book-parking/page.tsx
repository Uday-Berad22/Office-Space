import React from "react";
import { BookParkingForm } from "@/components/BookParkingForm";
import { ShowProbability } from "@/components/ShowProbability";

export default function BookParking() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Book Parking</h1>
      <ShowProbability />
      <BookParkingForm />
    </div>
  );
}
