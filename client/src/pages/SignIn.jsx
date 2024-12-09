import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.mp4";
import logo from "../assets/growth.png";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  SignInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormdata] = useState({});
  const{loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/creptoDashboard");
    } catch (error) {
      dispatch(SignInFailure(data.message));
    }
  };

  return (
    <div className="min-h-screen text-gray-900 flex justify-center items-center">
      <div className="max-w-screen-xl   m-0 sm:m-10 bg-white shadow  flex flex-col lg:flex-row rounded-bl-3xl rounded-tr-3xl">
        <div className="flex-1 hidden lg:flex ">
          <video
            autoPlay
            loop
            muted
            className="w-full h-[70vh] object-cover rounded-bl-3xl"
          >
            <source src={bg1} type="video/mp4" />
          </video>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1">
              <div className="flex flex-row items-center font-bold font-serif text-3xl">
                <img src={logo} className="w-16 mr-3" alt="Logo" />
                <h1 className="font-bold">Crypto App</h1>
              </div>
              <div className="mb-5 mt-3 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Sign in to access your account
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    id="email"
                    type="text"
                    placeholder="Email-Id"
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <button
                    disabled={loading}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-5 h-5 -ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-2">Sign In</span>
                  </button>
                </form>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  Don't have an account yet?{" "}
                  <NavLink to="/signUp">
                    <span className="text-blue-500">Sign Up</span>
                  </NavLink>
                </p>{" "}
                {error && (
                  <p className="mt-6 text-xs text-red-500 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
