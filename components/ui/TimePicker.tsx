"use client";
import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

const generateOptions = (count: number, step: number = 1) =>
  Array.from({ length: count }, (_, i) => String(i * step).padStart(2, "0"));

const hours = generateOptions(24); // 00 - 23
const minutes = generateOptions(60); // 00, 15, 30, 45

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [selectedHour, setSelectedHour] = useState(
    value ? value.split(":")[0] : "00"
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? value.split(":")[1] : "00"
  );

  const handleTimeChange = (hour: string, minute: string) => {
    const newTime = `${hour}:${minute}`;
    setSelectedHour(hour);
    setSelectedMinute(minute);
    onChange(newTime);
  };

  return (
    <div className="flex space-x-2 items-center border p-2 rounded-md bg-white shadow-md">
      {/* Hour Selector */}
      <Menu as="div" className="relative">
        <Menu.Button className="border rounded-md p-1 h-12 w-16 text-lg bg-gray-100 hover:bg-gray-200">
          {selectedHour}
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="absolute left-0 mt-1 w-14 bg-white border rounded-md shadow-lg max-h-40 overflow-auto z-50"
            style={{ top: "100%" }} // Ensures it doesn't overlap with the next input
          >
            {hours.map((hour) => (
              <Menu.Item key={hour}>
                {({ active }) => (
                  <div
                    className={`cursor-pointer p-2 text-center ${
                      active ? "bg-blue-500 text-white" : "text-gray-800"
                    }`}
                    onClick={() => handleTimeChange(hour, selectedMinute)}
                  >
                    {hour}
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      <span className="text-gray-700">:</span>

      {/* Minute Selector */}
      <Menu as="div" className="relative">
        <Menu.Button className="border rounded-md p-1 h-12 w-16 text-lg bg-gray-100 hover:bg-gray-200">
          {selectedMinute}
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="absolute left-0 mt-1 w-14 bg-white border rounded-md shadow-lg max-h-40 overflow-auto z-50"
            style={{ top: "100%" }} // Ensures it doesn't overlap with the next input
          >
            {minutes.map((minute) => (
              <Menu.Item key={minute}>
                {({ active }) => (
                  <div
                    className={`cursor-pointer p-2 text-center ${
                      active ? "bg-blue-500 text-white" : "text-gray-800"
                    }`}
                    onClick={() => handleTimeChange(selectedHour, minute)}
                  >
                    {minute}
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default TimePicker;
