import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Essentials = ({
  setGuestCount,
  guestCount,
  setBedroomCount,
  bedroomCount,
  setBedCount,
  bedCount,
  setBathCount,
  bathroomCount,
}) => {
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 mt-10">
      <h4 className="text-[16px] font-medium">
        Provide some essential details about your place
      </h4>
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Goust */}
        <div className="flexCenter gap-x-4 ring-1 rounded-2xl ring-slate-900/5 p-2">
          <h5>Guests</h5>
          <div className="flexCenter gap-x-2 bg-white">
            <FaMinus
              onClick={() =>
                guestCount > 1 && setGuestCount((prev) => prev - 1)
              }
              className="h-6 w-6 text-xl p-1 rounded cursor-pointer"
            />
            {guestCount}
            <FaPlus
              onClick={() => setGuestCount((prev) => prev + 1)}
              className="h-6 w-6 text-xl p-1 bg-primary text-white rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Bedroom */}
        <div className="flexCenter gap-x-4 ring-1 rounded-2xl ring-slate-900/5 p-2 ">
          <h5>Bedroom</h5>
          <div className="flexCenter gap-x-2 bg-white">
            <FaMinus
              onClick={() =>
                bedroomCount > 1 && setBedroomCount((prev) => prev - 1)
              }
              className="h-6 w-6 text-xl p-1 rounded cursor-pointer"
            />
            {bedroomCount}
            <FaPlus
              onClick={() => setBedroomCount((prev) => prev + 1)}
              className="h-6 w-6 text-xl p-1 bg-primary text-white rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Bed */}
        <div className="flexCenter gap-x-4 ring-1 rounded-2xl ring-slate-900/5 p-2">
          <h5>Bed</h5>
          <div className="flexCenter gap-x-2 bg-white">
            <FaMinus
              onClick={() => bedCount > 1 && setBedCount((prev) => prev - 1)}
              className="h-6 w-6 text-xl p-1 rounded cursor-pointer"
            />
            {bedCount}
            <FaPlus
              onClick={() => setBedCount((prev) => prev + 1)}
              className="h-6 w-6 text-xl p-1 bg-primary text-white rounded cursor-pointer"
            />
          </div>
        </div>

        {/* bathroom */}
        <div className="flexCenter gap-x-4 ring-1 rounded-2xl ring-slate-900/5 p-2">
          <h5>Bathroom</h5>
          <div className="flexCenter gap-x-2 bg-white">
            <FaMinus
              onClick={() =>
                bathroomCount > 1 && setBathCount((prev) => prev - 1)
              }
              className="h-6 w-6 text-xl p-1 rounded cursor-pointer"
            />
            {bathroomCount}
            <FaPlus
              onClick={() => setBathCount((prev) => prev + 1)}
              className="h-6 w-6 text-xl p-1 bg-primary text-white rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essentials;
