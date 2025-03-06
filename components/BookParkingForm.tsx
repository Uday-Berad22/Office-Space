// "use client";
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { bookParking } from "../actions/bookParking";
// import { Toaster, toast } from "react-hot-toast";
// import Image from "next/image";

// // Import Time Picker
// import { TimePicker } from "@/components/ui/time-picker";

// // Form Validation Schema
// const formSchema = z.object({
//   arrivalTime: z.string(),
//   departureTime: z.string(),
//   wantToCarPool: z.boolean().default(false),
//   availableSeats: z.number().min(0).max(4).optional(),
// });

// type FormValues = z.infer<typeof formSchema>;

// export function BookParkingForm() {
//   const [isFormAvailable, setIsFormAvailable] = useState(false);
//   const [hasActiveBooking, setHasActiveBooking] = useState(false);
//   const [bookingMessage, setBookingMessage] = useState("");

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       arrivalTime: "",
//       departureTime: "",
//       wantToCarPool: false,
//       availableSeats: 0,
//     },
//   });

//   useEffect(() => {
//     const checkFormAvailability = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       setIsFormAvailable(hours >= 18 && hours < 24); // Booking available from 6 PM to 11:59 PM
//     };

//     const checkExistingBooking = async () => {
//       try {
//         const response = await fetch("/api/book-parking", { method: "GET" });
//         const data = await response.json();
//         setHasActiveBooking(data.hasActiveBooking);
//         if (data.hasActiveBooking) setBookingMessage(data.message);
//       } catch (error) {
//         toast.error("🚨 Failed to check booking status. Please try again.");
//       }
//     };

//     checkFormAvailability();
//     checkExistingBooking();
//     const interval = setInterval(checkFormAvailability, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, []);

//   const onSubmit = async (values: FormValues) => {
//     if (hasActiveBooking) {
//       toast.error("🚗 You already have an active booking. Cannot submit a new one!");
//       return;
//     }

//     const formData = new FormData();
//     Object.entries(values).forEach(([key, value]) => formData.append(key, value.toString()));

//     const result = await bookParking(formData);

//     if (result.error) {
//       toast.error(`❌ ${result.error}`);
//     } else if (result.success) {
//       toast.success("✅ Booking successful! Check your dashboard.");
//       setHasActiveBooking(true);
//       setBookingMessage("🎉 You have successfully booked a slot!");
//       form.reset();
//     } else {
//       toast.error("⚠️ Unexpected error occurred. Try again!");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gray-100 p-6 mt-2">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* LEFT - Booking Form */}
//       <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">🅿️ Book Your Parking Slot</h1>
//         <p className="text-gray-600 mb-4">
//           Secure your parking spot and carpool with colleagues easily.
//         </p>

//         {/* Show Alert for Booking Availability */}
//         {!isFormAvailable && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertTitle>⏳ Booking is only available between 6 PM and 11:59 PM.</AlertTitle>
//           </Alert>
//         )}
//         {hasActiveBooking && (
//           <Alert variant="default" className="mb-4">
//             <AlertTitle>✅ {bookingMessage}</AlertTitle>
//           </Alert>
//         )}

//         {/* FORM START */}
//         {!hasActiveBooking && isFormAvailable && (
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               {/* Arrival Time */}
//               <FormField
//                 control={form.control}
//                 name="arrivalTime"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>⏰ Arrival Time</FormLabel>
//                     <FormControl>
//                       <TimePicker
//                         value={field.value}
//                         onChange={field.onChange}
//                         format="HH:mm"
//                         placeholder="Select Arrival Time"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Departure Time */}
//               <FormField
//                 control={form.control}
//                 name="departureTime"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>🚗 Departure Time</FormLabel>
//                     <FormControl>
//                       <TimePicker
//                         value={field.value}
//                         onChange={field.onChange}
//                         format="HH:mm"
//                         placeholder="Select Departure Time"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Carpool Checkbox */}
//               <FormField
//                 control={form.control}
//                 name="wantToCarPool"
//                 render={({ field }) => (
//                   <FormItem className="flex items-center space-x-3">
//                     <FormControl>
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                     <FormLabel>Would you like to offer a carpool ride?</FormLabel>
//                   </FormItem>
//                 )}
//               />

//               {/* Available Seats (Only Show if Carpooling is Selected) */}
//               {form.watch("wantToCarPool") && (
//                 <FormField
//                   control={form.control}
//                   name="availableSeats"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>🚘 Available Seats</FormLabel>
//                       <FormControl>
//                         <input
//                           type="number"
//                           className="w-full border rounded-md p-2"
//                           min="0"
//                           max="4"
//                           {...field}
//                           onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}

//               <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                 🚀 Submit Booking
//               </Button>
//             </form>
//           </Form>
//         )}
//       </div>

//       {/* RIGHT - Curved Image */}
//       <div className="w-full md:w-1/2 flex justify-center items-center">
//         <Image
//           src="/carpool-concept-illustration_114360-9238.avif"
//           alt="Carpool Concept"
//           width={500}
//           height={500}
//           className="rounded-l-full shadow-xl"
//         />
//       </div>
//     </div>
//   );
// }

// export default BookParkingForm;

"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { bookParking } from "../actions/bookParking";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

// Import Time Picker
import TimePicker from "@/components/ui/TimePicker";

// Form Validation Schema
const formSchema = z.object({
  arrivalTime: z.string(),
  departureTime: z.string(),
  wantToCarPool: z.boolean().default(false),
  availableSeats: z.number().min(0).max(4).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BookParkingForm() {
  const [isFormAvailable, setIsFormAvailable] = useState(false);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arrivalTime: "",
      departureTime: "",
      wantToCarPool: false,
      availableSeats: 0,
    },
  });

  useEffect(() => {
    const checkFormAvailability = () => {
      const now = new Date();
      const hours = now.getHours();
      setIsFormAvailable(hours >= 18 && hours < 24); // Booking available from 6 PM to 11:59 PM
    };

    const checkExistingBooking = async () => {
      try {
        const response = await fetch("/api/book-parking", { method: "GET" });
        const data = await response.json();
        setHasActiveBooking(data.hasActiveBooking);
        if (data.hasActiveBooking) setBookingMessage(data.message);
      } catch (error) {
        console.log(error);
        toast.error("🚨 Failed to check booking status. Please try again.");
      }
    };

    checkFormAvailability();
    checkExistingBooking();
    const interval = setInterval(checkFormAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (values: FormValues) => {
    if (hasActiveBooking) {
      toast.error(
        "🚗 You already have an active booking. Cannot submit a new one!"
      );
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value.toString())
    );

    const result = await bookParking(formData);

    if (result.error) {
      toast.error(`❌ ${result.error}`);
    } else if (result.success) {
      toast.success("✅ Booking successful! Check your dashboard.");
      setHasActiveBooking(true);
      setBookingMessage("🎉 You have successfully booked a slot!");
      form.reset();
    } else {
      toast.error("⚠️ Unexpected error occurred. Try again!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gray-100 p-6 mt-2">
      <Toaster position="top-center" reverseOrder={false} />

      {/* LEFT - Booking Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🅿️ Book Your Parking Slot
        </h1>
        <p className="text-gray-600 mb-4">
          Secure your parking spot and carpool with colleagues easily.
        </p>

        {/* Show Alert for Booking Availability */}
        {!isFormAvailable && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>
              ⏳ Booking is only available between 6 PM and 11:59 PM.
            </AlertTitle>
          </Alert>
        )}
        {hasActiveBooking && (
          <Alert variant="default" className="mb-4">
            <AlertTitle>✅ {bookingMessage}</AlertTitle>
          </Alert>
        )}

        {/* FORM START */}
        {!hasActiveBooking && isFormAvailable && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Arrival Time */}
              <FormField
                control={form.control}
                name="arrivalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>⏰ Arrival Time</FormLabel>
                    <FormControl>
                      <TimePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Departure Time */}
              <FormField
                control={form.control}
                name="departureTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>🚗 Departure Time</FormLabel>
                    <FormControl>
                      <TimePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Carpool Checkbox */}
              <FormField
                control={form.control}
                name="wantToCarPool"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      Would you like to offer a carpool ride?
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Available Seats (Only Show if Carpooling is Selected) */}
              {form.watch("wantToCarPool") && (
                <FormField
                  control={form.control}
                  name="availableSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>🚘 Available Seats</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="w-full border rounded-md p-2"
                          min="0"
                          max="4"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                🚀 Submit Booking
              </Button>
            </form>
          </Form>
        )}
      </div>

      {/* RIGHT - Curved Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/free-car-parking-illustration-ql7jz.jpg"
          alt="Carpool Concept"
          width={500}
          height={500}
          className="rounded-l-full shadow-xl"
        />
      </div>
    </div>
  );
}

export default BookParkingForm;
