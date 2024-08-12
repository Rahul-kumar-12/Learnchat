import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser, "authuser");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
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
      <div className="flex h-screen items-center bg-slate-700  justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 bg-white border-black-500 px-6 py-2 rounded-md space-y-3  w-[40%] h-auto"
        >
          <h1 className="text-2xl text-center font-medium text-black">
            ChatApp
          </h1>
          <h2 className="text-xl text-black font-medium ">Signup</h2>
          <br />
          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2">

            <input
              type="text"
              className="grow"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">

            <input
              type="email"
              className="grow"
              placeholder="Email"
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
              className="grow"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/*Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">

            <input
              type="password"
              className="grow"
              placeholder="confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Text & Button */}
          <div className="flex justify-between items-center">
            <p>
              Have an account?
              <Link
                to="/login"
                className="text-blue-500 underline cursor-pointer ml-1"
              >
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className="text-white bg-green-500 mb-8 px-2 py-2 px-4 mt-4 cursor-pointer rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
