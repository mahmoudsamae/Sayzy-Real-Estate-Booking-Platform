"use client";
import Header from "@/app/_components/Header";
import ListingCard from "@/app/_components/ListingCard";
import { setListings } from "@/app/_redux/state";
import axiosClient from "@/app/_utilte/axiosClient";

import Container from "@/app/helper/Container";
import Loading from "@/app/helper/Loading";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(true)
  const {searchValue} = useParams();

  const listings = useSelector((state) => state?.listings);
  const dispatch = useDispatch()

  const getSearchListing = async () => {
    try {
      const response = await axiosClient.get(`listing/search/${searchValue}`);
      if (response.data.success) {
        
        dispatch(setListings({listings : response.data.listings}));
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  useEffect(() => {
    getSearchListing();
  }, [searchValue])

  return loading ? <Loading /> : (
    <div>
      <Header />
      <Container>
        <section className="mt-4">
          <h3 className="text-[20px] font-bold mb-2 capitalize">{searchValue}</h3>
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
                type,
                price,
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
                  province={province}
                  type={type}
                  price={price}
                  country={country}
                  category={category}
                  title={title}
                  description={description}
                  booking={booking}
                />
              )
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default page;
