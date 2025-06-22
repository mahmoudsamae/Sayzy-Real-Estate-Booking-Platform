"use client";
import React, { useEffect, useState } from "react";
import Container from "../helper/Container";
import Title from "../helper/Title";
import { categories } from "@/public/assets/data";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../_utilte/axiosClient";
import { setListings } from "../_redux/state";
import Loading from "../helper/Loading";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const listings = useSelector((state) => state.listings);
  const firstListingId = listings.length > 0 ? listings[0]._id : null;


  // get listings
  const getQueryListings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        selectedCategory !== "All"
        ? `/listing?category=${selectedCategory}`
        : "/listing"
      );
      if (response.data.success) {
        dispatch(setListings({ listings: response.data.listings }));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);

  return (
    <div className="my-5 sm:my-10 md:my-15">
      <Container>
        <div className="flexCol gap-4">
          <div className="">
            <Title
              title1={"From Concept To Reality"}
              title2={"Discover Our Newest Listings"}
            />
          </div>
          <div className="flex items-center no-scrollbar gap-x-2 overflow-x-auto bg-white rounded-full px-4 py-3">
            {categories?.map((category) => (
              <div
                onClick={() => !loading && setSelectedCategory(category.label)}
                key={category.label}
                className={`flexCol items-center cursor-pointer min-w-24 gap-1 ${
                  selectedCategory === category.label ? "text-primary" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flexCenter`}
                  style={{ background: category.color }}
                >
                  {category.icon}
                </div>
                <p className="text-[14px]">{category.label}</p>
              </div>
            ))}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings?.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  province,
                  country,
                  category,
                  price,
                  type,
                  title,
                  description,
                  booking = false,
                }) => (
                  <ListingCard
                    key={_id}
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    type={type}
                    province={province}
                    country={country}
                    category={category}
                    price={price}
                    title={title}
                    description={description}
                    booking={booking}
                    firstListingId={firstListingId}
                  />
                )
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Listings;
