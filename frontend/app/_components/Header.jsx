"use client"
import React, { useState } from "react";
import Container from "../helper/Container";
import { BsSearchHeart } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setLogout } from "../_redux/state";
import { useRouter } from "next/navigation";

const Header = () => {
  const navigate = useRouter()
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-white py-2">
      <Container>
        <div className="flexBetween gap-2">
          {/* logo  */}
          <Link href={"/"} className="">
            <p className="text-[28px] tracking-wide">
              <span className="font-bold text-primary">S</span>ay
              <span className="font-bold text-primary">ZY</span>
            </p>
          </Link>
          {/* searchbar  */}
          <div className="border-1 border-gray-200 rounded-4xl relative py-1 px-2">
            <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
              type="text"
              placeholder="search..."
              className="w-full border-none outline-none text-[15px] sm:w-[300px] md:w-[400px]"
            />
            <button disabled={search === ""} onClick={() => navigate.push(`/search/${search}`)} className="absolute top-0 right-0 h-full w-8 text-white cursor-pointer flexCenter rounded-full bg-primary">
              <BsSearchHeart />
            </button>
          </div>
          {/* .drowpdown  */}
          <div className="relative">
            <div
              onClick={() => setDropdownMenu((prev) => !prev)}
              className="relative w-9 h-9 flexCenter rounded-full bg-primary overflow-hidden cursor-pointer"
            >
              {user ? (
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_DATABASE_URL
                  }/${user?.profileImagePath.replace("public", "")}`}
                  alt="profileImage"
                  fill
                />
              ) : (
                <FaUserLarge className="text-white" />
              )}
            </div>
            <div className="bg-white shadow-2xl text-center rounded-2xl absolute w-40 right-0 z-50 ">
              {dropdownMenu && !user && (
                <div className="flexCol gap-1 m-3">
                  <button
                    onClick={() => navigate.push("/auth/login")}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate.push("/auth/register")}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              {dropdownMenu && user && (
                <div className="flexCol gap-1 m-3">
                  <Link
                    onClick={() => setDropdownMenu(false)}
                    href={"/createlisting"}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Add a proprty
                  </Link>
                  <Link
                    onClick={() => setDropdownMenu(false)}
                    href={`/${user._id}/trips`}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Trip List
                  </Link>
                  <Link
                    onClick={() => setDropdownMenu(false)}
                    href={`/${user._id}/wishlist`}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Wish List
                  </Link>
                  <Link
                    onClick={() => setDropdownMenu(false)}
                    href={`/${user._id}/listing`}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Property List
                  </Link>
                  <Link
                    onClick={() => setDropdownMenu(false)}
                    href={`/${user._id}/reservation`}
                    className="text-[14px] text-gray-400 font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Reservation List
                  </Link>
                  <button
                    onClick={() => {dispatch(setLogout()); navigate.push("/auth/login")}}
                    className="text-[14px] text-white bg-primary cursor-pointer font-medium text-center hover:text-primary hover:bg-gray-100 rounded-4xl transition duration-300"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
