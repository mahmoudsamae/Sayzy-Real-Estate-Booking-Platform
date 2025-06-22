import React from 'react'
import { DateRange } from 'react-date-range'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
const BookingCalendar = ({dateRange, setDateRange, listing, dayCount}) => {


  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div className="">
      <div>
        <h4 className="text-[20px] font-bold mt-3">How long do you want to stay?</h4>
        <DateRange ranges={dateRange} onChange={handleSelect} />
      </div>
      <div className="flex justify-start gap-4 flex-wrap py-7">
        <div className="">
          {dayCount > 1 ? (
            <div className="flex items-center justify-start gap-x-2 pt-2">
              <h5 className="text-[15px] font-bold">Total Stay :</h5>
              <p className='text-[14px] text-gray-400 font-medium'>
                ${listing.price} x {dayCount} nights
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-x-2 pt-2">
              <h5 className="text-[15px] font-bold">Total Stay :</h5>
              <p className='text-[14px] text-gray-400 font-medium'>
                ${listing.price} x {dayCount} night
              </p>
            </div>
          )}
          <div className="flex items-center justify-start gap-x-2 pt-2">
            <h5 className="text-[15px] font-bold">Total Price :</h5>
            <p className='text-[14px] text-gray-400 font-medium'>${listing.price * dayCount}</p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-x-3 pt-2">
            <span className="text-[15px] font-bold">Start Date:</span>
            <p className='text-[14px] text-gray-400 font-medium'>{dateRange[0].startDate.toDateString()}</p>
          </div>
          <div className="flex items-center gap-x-3 pt-2">
            <span className='text-[15px] font-bold'>End Date:</span>
            <p className='text-[14px] text-gray-400 font-medium'>{dateRange[0].endDate.toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;