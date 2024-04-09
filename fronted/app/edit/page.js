"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("id :", id);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`http://localhost:3005/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to update your task");
        }
        const data = await response.json();
        const userId = data.userId;
        console.log("0000000000000000000000000", data);
        console.log("----------------", userId);

        alert("Your Task is updated successfully", userId);
        router.push(`/todos?userId=${userId}`);
      } catch (err) {
        alert("Failed to update your task: " + err.message);
        console.error("Failed to update your task:", err.message);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      errors.description = "description is required";
    }
    if (!formData.status.trim()) {
      errors.status = "status is required";
    }
    if (!formData.time.trim()) {
      errors.time = "time is required";
    }
    return errors;
  };

  return (
    <div>
      <form className="max-w-sm mx-auto mt-5 boundary">
        <div className="underline mb-3">
          <h1>Write details to edit the card</h1>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name && "border-red-500"
            }`}
            onChange={handleChange}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description && "border-red-500"
            }`}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.status && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.status && (
            <p className="text-red-500 text-xs italic">{errors.status}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="time"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Time (estimated)
          </label>
          <input
            type="text"
            id="time"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.time && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.time && (
            <p className="text-red-500 text-xs italic">{errors.time}</p>
          )}
        </div>
        <button
          className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-5 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-5 rounded ml-2"
          onClick={() => router.push("/login")}
        >
          LOGOUT
        </button>
      </form>
      {/* <button onClick={() => router.push(`/todos?userId=${user}`)}>
        go back to main page
      </button> */}
    </div>
  );
};

export default page;
