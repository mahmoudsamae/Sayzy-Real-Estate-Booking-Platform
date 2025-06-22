"use client";
import React from "react";
import Container from "../helper/Container";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user);

  return (
    <footer className="bg-white mt-10 pt-3">
      <Container>
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              {/* Logo */}
              <Link href="/">
                <p className="text-[28px] tracking-wide">
                  <span className="font-bold text-primary">S</span>ay
                  <span className="font-bold text-primary">ZY</span>
                </p>
              </Link>

              <p className="max-w-sm mt-2 text-gray-500">
                Find your next home with confidence and ease.
              </p>

              <div className="flex mt-6 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-primary border border-primary rounded-full p-1"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-primary border border-primary rounded-full p-1"
                  aria-label="Github"
                >
                  <BsGithub />
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-primary border border-primary rounded-full p-1"
                  aria-label="Linkedin"
                >
                  <BsLinkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-gray-700 uppercase">Explore</h3>
                <Link
                  href="/"
                  className="block mt-2 text-sm text-gray-600 hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/createlisting"
                  className="block mt-2 text-sm text-gray-600 hover:underline"
                >
                  Add a Property
                </Link>
                <span className="block mt-2 text-sm text-gray-600">
                  Listings
                </span>
              </div>

              {user && (
                <div>
                  <h3 className="text-gray-700 uppercase">My Account</h3>
                  <Link
                    href="/wishlist"
                    className="block mt-2 text-sm text-gray-600 hover:underline"
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/triplist"
                    className="block mt-2 text-sm text-gray-600 hover:underline"
                  >
                    Trips
                  </Link>
                  <Link
                    href="/reservationlist"
                    className="block mt-2 text-sm text-gray-600 hover:underline"
                  >
                    Reservations
                  </Link>
                  <Link
                    href="/propertylist"
                    className="block mt-2 text-sm text-gray-600 hover:underline"
                  >
                    My Properties
                  </Link>
                </div>
              )}

              <div>
                <h3 className="text-gray-700 uppercase">Contact</h3>
                <span className="block mt-2 text-sm text-gray-600">
                  +1 526 654 8965
                </span>
                <span className="block mt-2 text-sm text-gray-600">
                  example@email.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none" />

        <div>
          <p className="text-center text-gray-500 mb-2">
            © SayZY {new Date().getFullYear()} – All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
