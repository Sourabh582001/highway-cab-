"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface EditRideFormProps {
  initialData: {
    pickup: string;
    destination: string;
    pickupDate: string;
    pickupTime: string;
    carType: string;
  };
  onUpdate: (data: any) => void;
}

export default function EditRideForm({ initialData, onUpdate }: EditRideFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span><strong>From:</strong> {initialData.pickup}</span>
            <span><strong>To:</strong> {initialData.destination}</span>
            <span><strong>Date:</strong> {initialData.pickupDate}</span>
            <span><strong>Time:</strong> {initialData.pickupTime}</span>
            <span><strong>Car:</strong> {initialData.carType}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-golden-yellow text-navy-blue px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <FaEdit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-poppins font-semibold text-navy-blue mb-4">Edit Ride Details</h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            id="pickup"
            name="pickup"
            value={formData.pickup}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="pickupDate"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-transparent outline-none"
          >
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="tempo-traveller">Tempo Traveller</option>
          </select>
        </div>
      </form>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-golden-yellow text-navy-blue rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}