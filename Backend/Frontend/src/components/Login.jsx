import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    axios.post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen bg-slate-700 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 bg-white border-black-500 shadow  px-6 py-2 rounded-lg space-y-3 w-[40%] h-auto"
        >
          <h1 className="text-2xl text-center text-black font-medium py-2">
            ChatApp
          </h1>
          <h2 className="text-xl text-black font-medium">Login</h2>
          <br />

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">

            <input
              type="text"
              className="grow bg-transparent"


              placeholder="Email..."
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">

            <input
              type="password"
              // className="grow"
              placeholder="password..."
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Text & Button */}
          <div className="flex justify-between items-center">
            <p>
              New user?
              <Link
                to="/signup"
                className="text-blue-500 underline cursor-pointer ml-1"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="text-white bg-green-500 mb-8 px-4 py-2 mt-4 px-2 py-1 cursor-pointer rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
