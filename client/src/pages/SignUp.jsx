import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/plant.png";
import bg2 from "../assets/bg2.mp4";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [formData, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signIn");
    } catch (error) {
      loading(false);
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 flex justify-center items-center">
      <div className="max-w-screen-xl   m-0 sm:m-10 bg-white shadow  flex flex-col lg:flex-row rounded-bl-3xl rounded-tr-3xl h-[70vh] items-center">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
          <div className="w-20 mx-auto">
            <img src={logo} className="w-mx-auto" alt="Logo" />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full flex-1">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Create an Account!</h1>
              </div>
              <div className="mb-5 mt-3 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or{" "}
                  <NavLink to="/signIn">
                    <span className="text-blue-500">Sign In</span>
                  </NavLink>{" "}
                  with your Account
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="UserName"
                    id="userName"
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />

                  <button
                    disabled={loading}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-2">
                      {loading ? "Loading..." : "Sign Up"}
                    </span>
                  </button>
                </form>
                {error && (
                  <p className="mt-6 text-xs text-red-500 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1  hidden lg:flex">
            <video
              autoPlay
              loop
              muted
              className="w-full h-[70vh] object-cover rounded-tr-3xl"
            >
              <source src={bg2} type="video/mp4" />
            </video>
          </div>
        </div>
    </div>
  );
}
