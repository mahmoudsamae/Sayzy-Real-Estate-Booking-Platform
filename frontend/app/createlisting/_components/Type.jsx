import { types } from '@/public/assets/data'
import React from 'react'

const Type = ({ setType, type }) => {
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 my-10">
      <h4 className="text-[16px] font-medium">
        What is the type of your place
      </h4>
      <div className="flexCol gap-3 mb-6">
        {types.map((item) => (
          <div
            key={item.name}
            onClick={() => setType(item.name)}
            className={`${
              type === item.name
                ? "ring-1 ring-slate-900/50"
                : "ring-1 ring-slate-900/5"
            } flexBetween p-4 rounded-xl py-1`}
          >
            <div className="">
              <h5 className="text-[15px] font-medium">{item.name}</h5>
              <p className="text-[14px] text-gray-400 font-medium">
                {item.description}
              </p>
            </div>
            <div className="">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Type