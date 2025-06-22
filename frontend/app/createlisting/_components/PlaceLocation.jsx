import React from 'react'

const PlaceLocation = ({ handleFormLocation, formLocation }) => {
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 my-10">
      <h4 className="text-[16px] font-medium">
        What is the address of your place
      </h4>
      <div className="">
        <div className="">
          <h5 className="text-[13px]">Street Address: </h5>
          <input
            onChange={handleFormLocation}
            value={formLocation.streetAddress}
            type="text"
            name="streetAddress"
            placeholder="Street"
            className="bg-white shadow p-1.5 outline-none border-none text-[13px] rounded"
          />
        </div>
      </div>
      <div className="flex  gap-4">
        <div className="">
          <h5 className="text-[13px] mb-0.5">Apartment, Suite (opt): </h5>
          <input
            onChange={handleFormLocation}
            value={formLocation.aptSuite}
            type="text"
            name="aptSuite"
            placeholder="Apt, Suite (opt)"
            className="bg-white shadow p-1.5 outline-none border-none text-[13px] rounded"
          />
        </div>
        <div className="">
          <h5 className="text-[13px] mb-0.5">City: </h5>
          <input
            onChange={handleFormLocation}
            value={formLocation.city}
            type="text"
            name="city"
            placeholder="City"
            className="bg-white shadow p-1.5 outline-none border-none text-[13px] rounded"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="">
          <h5 className="text-[13px] mb-0.5">Province: </h5>
          <input
            onChange={handleFormLocation}
            value={formLocation.province}
            type="text"
            name="province"
            placeholder="Province"
            className="bg-white shadow p-1.5 outline-none border-none text-[13px] rounded"
          />
        </div>
        <div className="">
          <h5 className="text-[13px] mb-0.5">Country: </h5>
          <input
            onChange={handleFormLocation}
            value={formLocation.country}
            type="text"
            name="country"
            placeholder="Country"
            className="bg-white shadow p-1.5 outline-none border-none text-[13px] rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceLocation