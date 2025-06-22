"use client";
import Header from "@/app/_components/Header";
import ListingCard from "@/app/_components/ListingCard";
import { setPropertyList, setReservationList } from "@/app/_redux/state";
import axiosClient from "@/app/_utilte/axiosClient";

import Container from "@/app/helper/Container";
import Loading from "@/app/helper/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state?.user?._id);
  const reservationList = useSelector((state) => state?.user?.reservationList);
  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await axiosClient.get(`/users/${userId}/reservations`);

      if (response.data.success) {
        dispatch(setReservationList(response.data.reservations));
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <Container>
        <section className="mt-4">
          <h3 className="text-[20px] font-bold mb-2">Your Reservation List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservationList?.map(({ listingId, customerId }) => (
              <ListingCard
                key={listingId?._id}
                listingId={listingId._id}
                creator={customerId}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                type={listingId.type}
                price={listingId.price}
                country={listingId.country}
                category={listingId.category}
                title={listingId.title}
                description={listingId.description}
                booking={listingId.booking}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default page;
