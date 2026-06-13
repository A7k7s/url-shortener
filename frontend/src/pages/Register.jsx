import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import api from "../api/axios";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Create Account
        </h1>

        <p className="text-slate-500 mt-2">
          Start shortening and tracking your links
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Create Account
        </button>

      </form>

      <p className="text-center mt-6 text-slate-600">

        Already have an account?

        <Link
          to="/login"
          className="ml-2 text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>

      </p>

    </div>

  </div>
);
}

export default Register;