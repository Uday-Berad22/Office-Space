"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertTriangle, MapPin } from "lucide-react"; // Icons for better UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Card wrapper for layout

interface Booking {
  email: string;
  arrivalTime: string;
  departureTime: string;
  wantToCarPool: boolean;
  availableSeats: number;
  name: string;
}

const spotLocations = [
  "P1 - Left of Lift - 3rd Slot",
  "P1 - Near Exit - 5th Slot",
  "P2 - Right of Lift - 2nd Slot",
  "P2 - Middle Row - 8th Slot",
  "P3 - Near Entrance - 1st Slot",
  "P3 - Left Side - 4th Slot",
];

export function ParkingAllottedList() {
  const [approvedBookings, setApprovedBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/parking-allotted", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setApprovedBookings(data.approvedBookings || []);
        } else {
          throw new Error("Failed to fetch approved bookings");
        }
      } catch (error) {
        console.error("Error fetching approved bookings:", error);
        setError("❌ Failed to load approved bookings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedBookings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🚗 Parking Allotted List
      </h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center text-gray-700">
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
          <span>Loading approved bookings...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center text-red-600 bg-red-100 p-3 rounded-lg">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* If No Approved Bookings Found */}
      {!isLoading && approvedBookings.length === 0 && (
        <p className="text-center text-gray-500">No approved bookings found.</p>
      )}

      {/* Table Wrapper for Responsiveness */}
      {!isLoading && approvedBookings.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <Card className="p-4 bg-white">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-gray-800 text-white">
                <TableRow>
                  <TableHead className="px-4 py-3">Name</TableHead>
                  <TableHead className="px-4 py-3">Email</TableHead>
                  <TableHead className="px-4 py-3">Arrival Time</TableHead>
                  <TableHead className="px-4 py-3">Departure Time</TableHead>
                  <TableHead className="px-4 py-3">Carpool</TableHead>
                  <TableHead className="px-4 py-3">Seats</TableHead>
                  <TableHead className="px-4 py-3">Spot #</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedBookings.map((booking, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <TableCell className="px-4 py-3">{booking.name}</TableCell>
                    <TableCell className="px-4 py-3">{booking.email}</TableCell>
                    <TableCell className="px-4 py-3">
                      {booking.arrivalTime}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {booking.departureTime}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {booking.wantToCarPool ? "✅ Yes" : "❌ No"}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {booking.availableSeats}
                    </TableCell>
                    {/* Spot Number - Click to Show Dialog */}
                    <TableCell
                      className="px-4 py-3 font-semibold text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() =>
                        setSelectedSpot(
                          spotLocations[index % spotLocations.length]
                        )
                      }
                    >
                      {index + 1}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* Spot Details Dialog */}
      {selectedSpot && (
        <Dialog open={true} onOpenChange={() => setSelectedSpot(null)}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                Parking Spot Details
              </DialogTitle>
            </DialogHeader>
            <p className="text-lg text-gray-700 mt-2">📍 {selectedSpot}</p>
            <Button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setSelectedSpot(null)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
