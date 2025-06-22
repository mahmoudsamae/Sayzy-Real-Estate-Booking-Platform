"use client";
import React from "react";
import Container from "../helper/Container";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const Hero = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="my-5 sm:my-10">
      <Container>
        <div className="flex flex-col sm:flex-row gap-5">
          {/* leftSide  */}
          <div className="flex-1 flex flex-col gap-5 sm:gap-8">
            <h1 className="text-[40px] font-bold">
              Invest in <span className="text-primary">Your Future</span> With
              confidence
            </h1>
            <p className="text-gray-400 font-medium text-[14px] pr-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              cumque modi, tempore explicabo aspernatur, perferendis dolores
              necessitatibus magni excepturi illum unde a nobis porro illo,
              error architecto iusto fugiat omnis.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={"/search/all"}
                className="bg-gray-800 text-white px-3 py-2 rounded-md text-[13px] font-medium"
              >
                Explore Listings
              </Link>
              <Link
                href={user ? "/createlisting" : "/auth/login"}
                className="flexCenter gap-1 bg-primary px-3 py-2 text-white rounded-md text-[13px] font-medium"
              >
                <span>+</span>
                <p>Add Property</p>
              </Link>
            </div>
            <div className="flex relative">
              <div className="relative w-16 h-16 rounded-full z-30">
                <Image
                  src={"/assets/circle.png"}
                  alt="Decorative circle"
                  fill
                  className="rounded-full object-fill"
                />
              </div>
              <div className="absolute left-[40px] z-20">
                <div className="relative w-[52px] h-[52px] rounded-full">
                  <Image
                    src={"/assets/person-1.jpg"}
                    alt="Person 1"
                    fill
                    className="rounded-full object-fill"
                  />
                </div>
              </div>
              <div className="absolute left-[80px] z-10">
                <div className="relative w-[52px] h-[52px] rounded-full">
                  <Image
                    src={"/assets/person-2.jpg"}
                    alt="Person 2"
                    fill
                    className="rounded-full object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className="flex-1 flexCol gap-2">
            <div className="relative w-full h-[200px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/sideImg.png"
                alt="Side image main"
                fill
                priority
                placeholder="blur"
                blurDataURL="/blur-placeholder.jpg" // صورة صغيرة مبسطة
                className="rounded-2xl"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative w-full h-[200px] rounded-2xl overflow-hidden">
                <Image
                  src={"/assets/sideImg1.png"}
                  fill
                  alt="Side image 1"
                  priority
                />
              </div>
              <div className="flex-1 relative w-full h-[200px] rounded-2xl overflow-hidden">
                <Image
                  src={"/assets/sideImg2.png"}
                  fill
                  alt="Side image 2"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
