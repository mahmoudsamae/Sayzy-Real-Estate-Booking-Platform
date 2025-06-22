"use client";
import Header from "@/app/_components/Header";
import ListingCard from "@/app/_components/ListingCard";
import { setTripList } from "@/app/_redux/state";
import axiosClient from "@/app/_utilte/axiosClient";
import Container from "@/app/helper/Container";
import Loading from "@/app/helper/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state?.user?._id);
  const tripList = useSelector((state) => state?.user?.tripList);
  const dispatch = useDispatch();
  const firstListingId = tripList.length > 0 ? tripList[0].listingId._id : null;


  const getListTrips = async () => {
    try {
      const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${userId}/trips`
      );
      if (response.data.success) {
        dispatch(setTripList(response.data.tripList));
        setLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTrips();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <Container>
        <section className="mt-4">
          <h3 className="text-[20px] font-bold mb-2">Your Trip List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripList.map(
              ({
                _id,
                listingId,
                hostId,
                startDate,
                endDate,
                totalPrice,
                booking = true,
              }) => (
                <ListingCard
                  key={_id}
                  listingId={listingId._id}
                  creator={hostId._id}
                  listingPhotoPaths={listingId.listingPhotoPaths}
                  city={listingId.city}
                  province={listingId.province}
                  country={listingId.country}
                  category={listingId.category}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
                  title={listingId.title}
                  description={listingId.description}
                  booking={booking}
                  firstListingId={firstListingId}
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
