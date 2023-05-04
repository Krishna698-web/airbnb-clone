import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/"+ place._id} key={place._id}>
            <div className="flex bg-gray-500 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <div className="mt-2 px-1">
              <h3 className="font-semibold">{place.address}</h3>
              <h2 className="text-gray-500 text-sm">{place.title}</h2>
              <div className="mt-1 text-gray-500">
                <span className="font-bold text-black">${place.price} </span>/night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
