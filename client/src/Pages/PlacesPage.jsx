import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";
import PlaceImg from "../Components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-5">
        <Link
          className="bg-primary text-white py-1 px-6 rounded-full"
          to={"/account/places/new"}>
          &#43;Add new place{" "}
        </Link>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="flex gap-2 bg-gray-300 rounded-xl p-3">
              <div className="">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
