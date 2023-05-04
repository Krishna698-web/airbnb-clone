import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../Components/PlaceGallery";
import PlaceLink from "../Components/PlaceLink";
import PlaceStay from "../Components/PlaceStay";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    axios.get("/bookings").then((res) => {
      const foundBooking = res.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div>
      <div className="mt-4">
        <h1 className="text-2xl">{booking.place.title}</h1>
        <PlaceLink place={booking.place} />
      </div>
      <div className="flex justify-between items-center bg-gray-200 py-2 px-3 rounded-xl">
        <div>
          <h2 className="text-xl">Your Booking Information</h2>
          <div>
            <PlaceStay booking={booking} />
          </div>
        </div>
        <div className="bg-primary py-2 px-3 text-white rounded-xl mr-2">
          Total price: 
          <div className="text-xl text-center">
          ${booking.price}
          </div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <div className="mt-4">
        <h2 className="text-2xl">About place:</h2>
        <p>
        {booking.place.description}
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
