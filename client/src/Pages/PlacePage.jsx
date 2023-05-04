import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceWidget from "../Components/PlaceWidget";
import PlaceGallery from "../Components/PlaceGallery";
import PlaceLink from "../Components/PlaceLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      //   console.log(res.data);
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  if (showAllPhotos) {
    return (
      <div className="grid absolute inset-0 min-h-screen">
        <div className="p-8 grid gap-4  lg:justify-items-center bg-black">
          <h2 className="text-white text-3xl w-3/4">Photos of {place.title}</h2>
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-10 top-9 flex items-center gap-1 bg-white px-3 py-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
          <div className="grid gap-4 lg:w-6/12">
            {place.photos.length > 0 &&
              place.photos.map((photo) => (
                <div key={Math.random()} className="">
                  <img
                    className="w-full aspect-video object-cover rounded-md"
                    src={"http://localhost:4000/uploads/" + photo}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t-2 -mx-8 px-8 py-6 bg-gray-100">
      <div className="lg:w-6/12  m-auto">
        <div>
          <h1 className="text-3xl">{place.title}</h1>
          <PlaceLink place={place} />
          <div className="relative">
            <PlaceGallery place={place} showAllPhotos={setShowAllPhotos} />
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-2 right-2 flex items-center gap-2 p-1 px-2 rounded-xl bg-white shadow shadow-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
              Show all photos
            </button>
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-8 mb-8">
          <div>
            <div>
              <h2 className="text-3xl">Description</h2>
              <div className="text-gray-700 text-sm py-1 leading-5">
                {place.description}
              </div>
            </div>
            Check in time: {place.checkIn} <br />
            Check out time: {place.checkOut} <br />
            Max Guests: {place.maxGuests} <br />
          </div>
          <PlaceWidget place={place} />
        </div>
        <div className="-mx-8 px-8 py-4">
          <h2 className="text-2xl mt-2">Extra Info</h2>
          <div className="text-gray-700 text-sm leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
