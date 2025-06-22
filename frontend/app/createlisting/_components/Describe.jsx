import { facilities } from '@/public/assets/data';
import React from 'react'

const Describe = ({ handleSelectedAmenities, amenities }) => {
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 mt-6">
      <h4 className="text-[16px] font-medium">
        Describe about the features of your location?
      </h4>
      <ul className="flex items-center flex-wrap gap-3 mb-10">
        {facilities?.map((card) => (
          <li
            key={card.name}
            onClick={() => handleSelectedAmenities(card.name)}
            className={`${
              amenities.includes(card.name)
                ? "ring-1 ring-primary"
                : "ring-1 ring-slate-50"
            } flex items-center gap-3 bg-white p-4 rounded cursor-default`}
          >
            <div className="">{card.icon}</div>
            <p className="text-[14px]">{card.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Describe