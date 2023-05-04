import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./user-context";

const PlaceWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user) {
      setName(user.name);
    }
  }, [user])
  

  let numberOfNightss = 0;
  if (checkIn && checkOut) {
    numberOfNightss = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function newBookings(e) {
    e.preventDefault();
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price: numberOfNightss * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  // let extraChargesForExtraGuests = 0;
  // if(numberOfGuests > place.maxGuests){
  //     extraChargesForExtraGuests = place.price / 12;
  // }
  return (
    <div className="bg-white py-2 px-4 rounded-2xl shadow">
      <div>
        <div className="flex text-gray-500 items-center justify-center py-2">
          <p className="text-black text-2xl">${place.price}</p>
          /per night
        </div>
        <div className="border border-gray-400 rounded-xl">
          <div className="flex items-center">
            <div className="border-r border-gray-400 p-2">
              <label className="text-sm text-gray-500">CHECK-IN</label>
              <input
                type="date"
                onChange={(e) => setCheckIn(e.target.value)}
                value={checkIn}
              />
            </div>
            <div className="p-2">
              <label className="text-sm text-gray-500">CHECK-OUT</label>
              <input
                type="date"
                onChange={(e) => setCheckOut(e.target.value)}
                value={checkOut}
              />
            </div>
          </div>
          <div className="border-t border-gray-400 p-2">
            <label className="text-sm text-gray-600">GUESTS</label>
            <input
              type="number"
              onChange={(e) => setNumberOfGuests(e.target.value)}
              value={numberOfGuests}
            />
          </div>
          {numberOfNightss > 0 && (
            <div className="p-2">
              <label className="text-sm text-gray-600">YOUR FULL NAME: </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label className="text-sm text-gray-600">Mobile: </label>
              <input
                type="tel"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
            </div>
          )}
        </div>
        <button
          onClick={newBookings}
          className="w-full mt-4 mb-2 bg-primary px-3 py-1 rounded-full text-white">
          Book
          {numberOfNightss > 0 && (
            <span> &nbsp;${numberOfNightss * place.price}</span>
          )}
        </button>
      </div>
      {/* {numberOfGuests > place.maxGuests && <div>Extra charges: {extraChargesForExtraGuests.toFixed(2)}/per person</div>} */}
    </div>
  );
};

export default PlaceWidget;
