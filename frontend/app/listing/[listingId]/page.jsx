"use client";
import axiosClient from "@/app/_utilte/axiosClient";
import Header from "@/app/_components/Header";
import Container from "@/app/helper/Container";
import Loading from "@/app/helper/Loading";
import { facilities } from "@/public/assets/data";
import Image from "next/image";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { BiBed } from "react-icons/bi";
import { FaPersonShelter } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineBathroom, MdOutlineBedroomChild } from "react-icons/md";
import { useSelector } from "react-redux";
import {useParams, useRouter } from "next/navigation";
import Footer from "@/app/_components/Footer";
import { toast } from "react-toastify";
import InfoComp from "./_components/InfoComp";


const BookingCalendar = lazy(() => import("./_components/BookingCalendar"));

const page = () => {
  const params = useParams();
  const listingId = params?.listingId;
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const navigate = useRouter();

  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.max(
    1,
    Math.round((end - start) / (1000 * 60 * 60 * 24))
  );

  const customerId = useSelector((state) => state?.user?._id);
  // check if the current user is the owner
  const isOwner = listing?.creator?._id == customerId;

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing?.creator._id,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        totalPrice: listing?.price * dayCount,
        title: listing?.title,
        description: listing?.description
      };

      const response = await axiosClient.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/bookings/create`,
        bookingForm
      );
      if (response.data.success) {
        navigate.push(`/${customerId}/trips`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get selected listing
  const getListing = async () => {
    try {
      const response = await axiosClient.get(`/listing/${listingId}`);
      if (response.data.success) {
        setListing(response.data.listing);
        setLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (listingId) {
      getListing();
    }
  }, [listingId]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <Container>
        <section className=" flex gap-12 flex-col-reverse lg:flex-row py-10">
          {/* left  */}
          <div className="flex-1">
            <div className="">
              <h3 className="text-[16px] font-bold">{listing?.title}</h3>
              <div className="flex items-center px-1 pb-1 gap-1.5">
                <span>
                  <HiOutlineLocationMarker className="text-primary" />
                </span>
                <p className="text-[14px] text-gray-400 font-medium mt-1">
                  {listing?.type} in {listing?.city}, {listing?.province},{" "}
                  {listing?.country}
                </p>
              </div>
              <div className="flex items-center flex-wrap gap-4 capitalize pt-5">
                <InfoComp
                  value={listing?.guestCount}
                  text={"Guest"}
                  icon={<FaPersonShelter className="text-xl text-primary" />}
                />

                <InfoComp
                  value={listing?.bedroomCount}
                  text={"Bedroom"}
                  icon={
                    <MdOutlineBedroomChild className="text-xl text-primary" />
                  }
                />
                <InfoComp
                  value={listing?.bedCount}
                  text={"Bed"}
                  icon={<BiBed className="text-xl text-primary" />}
                />
                <InfoComp
                  value={listing?.bathroomCount}
                  text={"Bathroom"}
                  icon={<MdOutlineBathroom className="text-xl text-primary" />}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-3 py-6">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_DATABASE_URL
                }/${listing?.creator?.profileImagePath?.replace("public", "")}`}
                alt="creatorImage"
                width={45}
                height={45}
                className="rounded-full"
              />
              <h5 className="text-[14px] font-medium capitalize">
                Hosted by {listing?.creator?.firstname}{" "}
                {listing?.creator?.lastname}
              </h5>
            </div>
            <p className="pb-3 text-[15px] font-medium text-gray-400">
              {listing?.description}
            </p>
            {/* Animations/facilities */}
            <div className="">
              <h4 className="text-[18px] font-bold mb-3">
                What this place offers ?
              </h4>
              <ul className="flex items-center flex-wrap gap-3">
                {Array.isArray(listing?.amenities) &&
                  listing?.amenities.length > 0 &&
                  listing?.amenities[0]?.split(",").map((item, i) => {
                    const matchedFacility = facilities.find(
                      (f) => f.name === item.trim()
                    );
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-2 bg-white ring-1 ring-slate-900/5 p-4 rounded"
                      >
                        <div className="">{matchedFacility?.icon}</div>
                        <p>{item.trim()}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* Booking Calender  */}
            <Suspense fallback={<div>Loading...</div>}>
              <BookingCalendar
                dateRange={dateRange}
                setDateRange={setDateRange}
                listing={listing}
                dayCount={dayCount}
              />
            </Suspense>

            {/* Booking Button  */}
            <button
              onClick={handleSubmit}
              disabled={isOwner}
              className={`${
                isOwner ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              } text-white px-3 py-2 rounded-4xl my-10`}
            >
              {isOwner ? "You can't book your own property" : "Book the visit"}
            </button>
          </div>

          {/* right Image Gallery */}
          <div className="flex-1">
            <div className="flex flex-wrap">
              {listing?.listingPhotoPaths?.map((item, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "w-full" : "w-1/2"} p-2`}
                >
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_DATABASE_URL
                    }/${item.replace("public", "")}`}
                    alt="ListingImage"
                    className={`max-w-full ${
                      index === 0 ? "object-contain rounded-3xl" : "rounded-2xl"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
};



export default page;
