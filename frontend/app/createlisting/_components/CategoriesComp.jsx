import { categories } from "@/public/assets/data";
import React from "react";

const CategoriesComp = ({ setCategory, category }) => {
  return (
    <div className="overflow-x-auto no-scrollbar px-4 py-3 bg-white rounded-full">
      <div className="flex items-center gap-x-4 min-w-max">
        {categories?.map((item) => (
          <div
            key={item.label}
            onClick={() => setCategory(item.label)}
            className="flex flex-col items-center cursor-pointer min-w-[96px] shrink-0"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>
            <p
              className={`text-[14px] ${
                category === item.label ? "text-primary font-medium" : ""
              }`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComp;
