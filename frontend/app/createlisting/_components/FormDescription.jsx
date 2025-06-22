import React from 'react'

const FormDescription = ({ handleFormDescription, formDescription }) => {
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 mt-10">
      <h4 className="text-[16px] font-medium">
        How would your characterize the charm and excitement of your property?
      </h4>
      <div className="flexCol gap-3">
        <div className="flexCol gap-1">
          <label className="text-[14px]" htmlFor="title">
            Title:
          </label>
          <input
            onChange={handleFormDescription}
            value={formDescription.title}
            type="text"
            required
            id="title"
            name="title"
            placeholder="title"
            className="bg-white px-2 py-1 tesxt-[14px] rounded-lg outline-none border-none"
          />
        </div>
        <div className="flexCol gap-1">
          <label className="text-[14px]" htmlFor="title">
            Description:
          </label>
          <textarea
            onChange={handleFormDescription}
            value={formDescription.description}
            type="text"
            id="titel"
            name="description"
            required
            rows={10}
            placeholder="Description"
            className="bg-white px-2 py-1 tesxt-[14px] rounded-lg outline-none border-none"
          />
        </div>
        <div className="flexCol gap-1">
          <label className="text-[14px]" htmlFor="title">
            Price:
          </label>
          <input
            onChange={handleFormDescription}
            value={formDescription.price}
            type="number"
            id="price"
            name="price"
            required
            placeholder="Price"
            className="bg-white px-2 py-1 tesxt-[14px] rounded-lg w-[300px] outline-none border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FormDescription