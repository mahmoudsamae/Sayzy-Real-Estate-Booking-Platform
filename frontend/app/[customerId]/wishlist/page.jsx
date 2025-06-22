"use client"
import Header from "@/app/_components/Header";
import ListingCard from "@/app/_components/ListingCard";

import Container from "@/app/helper/Container";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const wishList = useSelector((state) => state?.user?.wishList);
  return (
    <div>
      <Header />
      <Container>
        <section className="mt-4">
          <h3 className="text-[20px] font-bold mb-2">Your Wish List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishList?.map(
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
