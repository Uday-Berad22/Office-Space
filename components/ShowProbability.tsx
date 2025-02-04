"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export function ShowProbability() {
  const [probability, setProbability] = useState<number | null>(null);
  const [waitlist, setWaitlist] = useState<number | null>(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/probability", {
          method: "GET",
        });
        const data = await response.json();

        setProbability(data.probability);
        setWaitlist(data.waitlist);
      } catch (error) {
        console.error("Error fetching current user data:", error);
        toast.error(
          "Failed to load current user data. Please try again later."
        );
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <>
      <Toaster />

      <>
        {probability !== null && waitlist != null && (
          <p>
            Probability of getting a parking spot: {probability * 100} % Waiting
            number : {waitlist}
          </p>
        )}
      </>
    </>
  );
}
