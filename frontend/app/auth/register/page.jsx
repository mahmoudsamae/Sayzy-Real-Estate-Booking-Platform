"use client";

import Container from "@/app/helper/Container";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiUploadBold } from "react-icons/pi";
import Image from "next/image";
import axiosClient from "@/app/_utilte/axiosClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "profileImage" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.passwordConfirmation ||
        formData.passwordConfirmation === ""
    );
  }, [formData.password, formData.passwordConfirmation]);

  useEffect(() => {
    if (formData.profileImage) {
      const objectUrl = URL.createObjectURL(formData.profileImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.profileImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const register_form = new FormData();
      for (let key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await axiosClient.post("/auth/register", register_form);
      if (response.data.success) {
        router.push("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration failed.";
      toast.error(msg);
    }
  };

  return (
    <div className="pt-5">
      <Container>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-1 sm:gap-4 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700" htmlFor="firstname">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.firstname}
                  id="firstname"
                  name="firstname"
                  required
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.lastname}
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
                />
              </div>

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
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
                />
              </div>

              <div></div>

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
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <input
                  onChange={handleChange}
                  value={formData.passwordConfirmation}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md"
                />
                {!passwordMatch && (
                  <p className="text-sm text-red-600 mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>

              <div className="cursor-pointer mt-4">
                <label htmlFor="image" className="cursor-pointer block">
                  <div className="relative border-2 border-gray-300 flex items-center justify-center w-20 h-20">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="preview"
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <PiUploadBold className="text-xl" />
                    )}
                  </div>
                </label>
                <input
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  id="image"
                  name="profileImage"
                  hidden
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors bg-primary rounded-md"
              >
                Register
              </button>
            </div>

            <div className="text-center mt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="hover:text-primary">
                Login
              </Link>
            </div>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default Page;
