"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { validateForm } from "../validateForm";
import CreateEdit from "../createEditTodo/page";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    time: "",
  });

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/todos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("data:====> ", data);
      setFormData(data);
      console.log("form data", data.name);
    } catch (err) {
      console.error("Failed to fetch data:", err.message);
    }
  };

  useEffect(() => {
    console.log("id===>", id);
    fetchData(id);
  }, [searchParams]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // e.preventDefault();
    const { id, value } = e.target;
    console.log("handleChange called with id:", id, "and value:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("->>>>>>>>> handleEdit");
    
      try {
        console.log("in the try block of handleEdit");
        const response = await fetch(`http://localhost:3005/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          console.log("failed to update your task");
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
    
  };

  return (
    <div>
      <CreateEdit
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleEdit}
        edit={true}
        formData={formData}
      />
      {/* <form className="max-w-sm mx-auto mt-5 boundary">
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
            value={formData.name} // Display previous value
            className={`shadow appearance-none border bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
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
            value={formData.description} // Display previous value
            className={`shadow appearance-none border bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description && "border-red-500"
            }`}
            onChange={handleChange}
            
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
          <select
            id="status"
            value={formData.status}
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.status && "border-red-500"
            }`}
            onChange={handleChange}
          >
            <option value="Complete">Complete</option>
            <option value="pending">pending</option>
          </select>
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
            value={formData.time} // Display previous value
            className={`shadow appearance-none border bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
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
      </form> */}
      
    </div>
  );
};

export default Page;
