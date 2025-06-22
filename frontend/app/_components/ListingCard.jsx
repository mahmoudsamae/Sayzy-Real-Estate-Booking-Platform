import Image from "next/image";
import React, { memo, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";
import axiosClient from "../_utilte/axiosClient";
import { setWishList } from "../_redux/state";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { toast } from "react-toastify";

const ListingCard = memo(({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  type,
  province,
  country,
  category,
  price,
  title,
  description,
  booking,
  startDate,
  endDate,
  totalPrice,
  firstListingId, // ⬅️ تأكد من تمريره من المكون الأب
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
  };

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await axiosClient.patch(
        `/users/${user?._id}/${listingId}`
      );
      if (response.data.success) {
        dispatch(setWishList(response.data.wishList));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.info("This listing is your property");
    }
  };

  return (
    <Link
      href={`/listing/${listingId}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center ring-1 ring-slate-900/5 bg-white cursor-pointer px-2.5 pt-2.5 pb-4.5 lg:pb-2.5 rounded-[2.5rem] relative group"
    >
      {/* Images */}
      <div className="overflow-hidden relative w-full">
        <div
          className="flex w-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, i) => (
            <div
              className="relative w-full h-[286px] lg:h-[255px] items-center shrink-0"
              key={i}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/${photo.replace(
                  "public",
                  ""
                )}`}
                alt="listingImg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={listingId === firstListingId}
                className="rounded-[2rem] object-cover"
                placeholder="blur"
                blurDataURL="/blur-placeholder.jpg"
              />

              {/* Arrows */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <BsArrowLeft
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPrevSlide();
                  }}
                  className="absolute top-1/2 left-2.5 translate-y-1/2 p-1.5 text-2xl rounded-full border-none cursor-pointer flexCenter bg-white/30 text-white z-50"
                />
                <BsArrowRight
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToNextSlide();
                  }}
                  className="absolute top-1/2 right-2.5 translate-y-1/2 p-1.5 text-2xl rounded-full border-none cursor-pointer flexCenter bg-white/30 text-white z-50"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            patchWishList();
          }}
          disabled={!user}
          className="absolute top-3 right-5 border border-white h-7 w-7 rounded-full flexCenter cursor-pointer"
        >
          {isLiked ? (
            <GoHeartFill className="text-white text-lg" />
          ) : (
            <GoHeart className="text-lg text-white" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="max-sm:px-2">
        <h4 className="text-[17px] font-bold">{title}</h4>
        <div className="text-[15px] font-medium text-gray-400 pb-2">
          {category}
        </div>
        <h5 className="flex items-center gap-x-2 capitalize">
          <HiOutlineLocationMarker /> {city}, {province}, {country}
        </h5>

        <div className="mt-1">
          {!booking ? (
            <>
              <div>
                <span className="text-primary text-[22px] font-bold">
                  ${price}
                </span>
                <span className="text-[14px] font-medium">/ night</span>
              </div>
              <div className="text-[15px] font-medium capitalize pt-1">
                {type}
              </div>
            </>
          ) : (
            <div className="py-1">
              <p className="text-[14px] text-gray-400 font-medium">
                {new Date(startDate).toDateString()} -{" "}
                {new Date(endDate).toDateString()}
              </p>
              <p>
                <span className="text-primary text-[20px] font-bold">
                  ${totalPrice}
                </span>
              </p>
            </div>
          )}
        </div>

        <p className="line-clamp-4 text-[13px] font-medium text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
});

export default ListingCard;
