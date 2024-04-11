"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateForm } from "../validateForm";

const Page = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loggedIn: "false", // New state variable to track login status
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Clear error for the specific field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3005/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        alert("Login successful");

        const data = await response.json();

        if (data && data.length > 0) {
          const userId = data[0].id; // Access the id property of the first user object
          console.log("User data:", data);
          console.log("User ID:", userId);
          router.push(`/todos?userId=${userId}`);
        } else {
          throw new Error("User data not found or empty");
        }
      } catch (err) {
        alert("Error in login: " + err.message);
        console.error("Error in login:", err.message);
      }
    } else {
      alert("Enter correct credential to login")
      setErrors(formErrors);
    }
  };

  return (
    <div
      className="flex flex-col justify-center bg-orange-400 item-center m-auto"
      style={{ width: "60%" }}
    >
      <div className=" mt-9">
        <h1 className="text-center text-2xl font-bold">
          Enter your details to get your list
        </h1>
      </div>
      <form className="bg-orange-200  shadow-md rounded px-8 pt-6 p-8 m-40 mt-10 flex flex-col  justify-center ">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            className={`shadow appearance-none border ${
              errors.email ? "border-red-500" : "border-orange-200"
            } bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`shadow appearance-none border ${
              errors.password ? "border-red-500" : "border-orange-200"
            } bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="flex justify-center items-center pt-2">
        <p>
           Not Registered ? <Link href="/register">Click here to Register first</Link>
          </p>
      </div>
      </form>
      
    </div>
  );
};

export default Page;
