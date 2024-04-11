"use client";
import React, { useState } from "react";
import List from "../list/page";
import { useRouter } from "next/navigation";
import CreateEdit from "../createEditTodo/page"
import { useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const UserId = searchParams.get("userId");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if(Object.keys(formErrors).length === 0) {
      try {
        console.log("router----", router);
  
        console.log("userId", UserId);
        const response = await fetch("http://localhost:3005/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userId: UserId,
          }),
        });
  
        if (!response.ok) {
          throw new Error("failed to create todos");
        }
        alert("Todos created successfully...");
      } catch (err) {
        alert("Error in login: " + err.message);
      }
    }
    else {
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
    if (!formData.time.trim()) {
      errors.time = "time is required";
    }
    return errors;
  }

  return (
    <div className="flex flex-row space-between">
      <div
        className="flex flex-col  bg-orange-400 m-auto "
        style={{ width: "50%", top:"15%"}}
      >
        <CreateEdit errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} edit={false} />
        {/* <form className="bg-orange-200  shadow-md rounded px-8 pt-6 p-8 mt-10 flex flex-col  justify-center ">
          <div className="mb-4 mt-10r">
            <h1 className="text-center text-2xl font-bold">
              Enter the details to create Todo
            </h1>
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.name && "border-red-500"}`}
              onChange={handleChange} required
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.description && "border-red-500"}`}
              onChange={handleChange}
              required
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Time (estimated)
            </label>
            <input
              id="time"
              type="text"
              className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.time && "border-red-500"}`}
              onChange={handleChange} required
            />
            {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Create Todo
            </button>
          </div>
        </form> */}
        <div className="mt-3">
          <button
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            style={{}}
            onClick={() => {
              
              router.push("/login");
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
      <div className="mt-5 " style={{ width: "40%", right: "60%" }}>
        <div className="pt-6">
          <p className="text-center text-2xl font-bold ">See your list here</p>
        </div>
        <div>
          <List userId={UserId} />
        </div>
      </div>
    </div>
  );
};

export default page;
