"use client";
import React, { useState } from "react";
import Header from "../_components/Header";
import Container from "../helper/Container";

import CategoriesComp from "./_components/CategoriesComp";
import Type from "./_components/Type";
import PlaceLocation from "./_components/PlaceLocation";
import Essentials from "./_components/Essentials";
import Describe from "./_components/Describe";
import UploadImage from "./_components/UploadImage";
import FormDescription from "./_components/FormDescription";
import { useSelector } from "react-redux";
import axios from "axios";
import axiosClient from "../_utilte/axiosClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const creatorId = useSelector((state) => state.user._id);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  // counts
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathCount] = useState(1);

  // form location
  const [formLocation, setformLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleFormLocation = (e) => {
    const { name, value } = e.target;
    setformLocation({
      ...formLocation,
      [name]: value,
    });
  };

  // form description
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleFormDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  // Amenities fanction
  const handleSelectedAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prev) => prev.filter((ele) => ele !== facility));
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type),
        listingForm.append("streetAddress", formLocation.streetAddress),
        listingForm.append("aptSuite", formLocation.aptSuite),
        listingForm.append("city", formLocation.city),
        listingForm.append("province", formLocation.province),
        listingForm.append("country", formLocation.country),
        listingForm.append("guestCount", guestCount),
        listingForm.append("bedroomCount", bedroomCount),
        listingForm.append("bedCount", bedCount),
        listingForm.append("bathroomCount", bathroomCount),
        listingForm.append("amenities", amenities),
        listingForm.append("title", formDescription.title),
        listingForm.append("description", formDescription.description),
        listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo.file);
      });

      const response = await axiosClient.post("/listing/create", listingForm);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="">
        <Container>
          <form className="mt-6" onSubmit={handlePost}>
            <h3 className="text-[20px] font-medium mb-3">Add a Property</h3>

            <CategoriesComp setCategory={setCategory} category={category} />

            {/* type */}
            <div className="flex flex-col md:flex-row md:gap-5">
              <div className="flex-1">
                <Type setType={setType} type={type} />
              </div>

              <div className="flex-1 md:px-10">
                {/* place location */}
                <PlaceLocation
                  handleFormLocation={handleFormLocation}
                  formLocation={formLocation}
                />
              </div>
            </div>

            {/* Essentials */}
            <Essentials
              setGuestCount={setGuestCount}
              guestCount={guestCount}
              setBedroomCount={setBedroomCount}
              bedroomCount={bedroomCount}
              setBedCount={setBedCount}
              bedCount={bedCount}
              setBathCount={setBathCount}
              bathroomCount={bathroomCount}
            />

            {/* Describe  */}
            <Describe
              handleSelectedAmenities={handleSelectedAmenities}
              amenities={amenities}
            />

            {/* Upload Images */}
            <UploadImage setPhotos={setPhotos} photos={photos} />

            {/* form Description  */}
            <FormDescription
              handleFormDescription={handleFormDescription}
              formDescription={formDescription}
            />

            {/* Add Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-3 py-2 rounded-4xl cursor-pointer my-10"
            >
              Create Property
            </button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default page;
