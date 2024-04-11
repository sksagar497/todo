"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateForm } from "../validateForm";
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    gender: "",
    hobbies: "",
    country: "",
    mobile: "",
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
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3005/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        alert("Registered Successfully... !!");
        router.push(`/login`);
      } catch (err) {
        console.error("Error creating user:", err.message);
      }
    } else {
      
      console.log("error in validation")
      setErrors(formErrors);
    }
  };

  // const validateForm = () => {
  //   let errors = {};
  //   if (!formData.name.trim()) {
  //     errors.name = "Name is required";
  //   }
  //   if (!formData.gender.trim()) {
  //     errors.gender = "Gender is required";
  //   }
  //   if (!formData.hobbies.trim()) {
  //     errors.hobbies = "hobbies is required";
  //   }
  //   if (!formData.country.trim()) {
  //     errors.country = "country is required";
  //   }
  //   if (!formData.email.trim()) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     errors.email = "Email is invalid";
  //   }
  //   if (!formData.password.trim()) {
  //     errors.password = "Password is required";
  //   } else if (formData.password.trim().length < 8) {
  //     errors.password = "Password should be at least 8 characters long";
  //   }
  //   if (!formData.mobile.trim()) {
  //     errors.mobile = "Mobile No. is required";
  //   } else if (!/^\d{10}$/.test(formData.mobile)) {
  //     errors.mobile = "Mobile No. is invalid";
  //   }
  //   return errors;
  // };

  return (
    <div
      className="flex flex-col justify-center bg-orange-400 m-auto"
      style={{ width: "60%" }}
    >
      <div className="mb-4 mt-10">
        <h1 className="text-center text-2xl font-bold underline">
          Register yourself to save your task..!!
        </h1>
      </div>

      <form className="bg-orange-200 shadow-md rounded px-8 pt-6 p-8 m-40 mt-10 flex flex-col justify-center">
        <div className="mb-6">
          <label
            htmlFor="Name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="mobileNo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile No.
          </label>
          <input
            id="mobile"
            type="text"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mobile && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs italic">{errors.mobile}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.gender && "border-red-500"
            }`}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">{errors.gender}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Country
          </label>
          <select
            id="country"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.country && "border-red-500"
            }`}
            onChange={handleChange}
            defaultValue=""
          >
            <option value="india">India</option>
            <option value="srilanka">Sri Lanka</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="china">China</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-xs italic">{errors.country}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="hobbies"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Hobby
          </label>
          <select
            id="hobbies"
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mobile && "border-red-500"
            }`}
            onChange={handleChange}
            defaultValue=""
          >
            <option value="painting">Painting</option>
            <option value="sport">Sport</option>
            <option value="music">Music</option>
            <option value="reading">Reading</option>
          </select>
          {errors.hobbies && (
            <p className="text-red-500 text-xs italic">{errors.hobbies}</p>
          )}
        </div>
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
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.hobbies && "border-red-500"
            }`}
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
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password && "border-red-500"
            }`}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="mb-6">
          <p>
            Registered already ? <Link href="/login">Click here to Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Page;
