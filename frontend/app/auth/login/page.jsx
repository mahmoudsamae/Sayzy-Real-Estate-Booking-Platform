"use client";

import { setLogin } from "@/app/_redux/state";
import axiosClient from "@/app/_utilte/axiosClient";
import Container from "@/app/helper/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(
        "/auth/login",
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
        router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed. Try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="pt-5">
      <Container>
        <section className="max-w-4xl w-[300px] mt-10  p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="">
              <div>
                <label className="text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full px-4 py-1 sm:py-2 mt-0.5 sm:mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={formData.password}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full px-4 py-1 sm:py-2 mt-0.5 sm:mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md focus:outline-none"
              >
                Login
              </button>
            </div>

            <div className="text-center mt-1.5">
              Create an account?{" "}
              <Link href={"/auth/register"} className="hover:text-primary">
                Register
              </Link>
            </div>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default Page;
