import React from "react";

const PlaceImg = ({ place, index=0 }) => {
  if (!place.photos.length) {
    return "";
  }

  return (
    <div className="h-40 w-40">
      <img
        className="h-full w-full object-cover"
        src={"http://localhost:4000/uploads/" + place.photos[index]}
        alt=""
      />
    </div>
  );
};

export default PlaceImg;
