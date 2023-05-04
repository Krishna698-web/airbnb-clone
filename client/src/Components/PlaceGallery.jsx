import React from "react";

const PlaceGallery = ({ place }) => {
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-4 rounded-2xl overflow-hidden shadow shadow-gray-500">
        <div>
          {place.photos?.[0] && (
            <img
              className="aspect-square object-cover cursor-pointer"
              src={`http://localhost:4000/uploads/${place.photos[0]}`}
              alt=""
            />
          )}
        </div>
        <div className="grid">
          <div className="rounded-tr-xl">
            {place.photos?.[1] && (
              <img
                  className="aspect-square object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
                alt=""
              />
            )}
          </div>
          <div className="overflow-hidden rounded-br-xl">
            {place.photos?.[2] && (
              <img
                  className="aspect-square object-cover cursor-pointer relative top-2"
                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceGallery;
