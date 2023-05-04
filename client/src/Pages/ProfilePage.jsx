import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../Components/user-context";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

const ProfilePage = () => {
  let { subpage } = useParams();
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    await axios.post("/logout");
    // for Redirection
    setRedirect("/");

    // to set back the user to null when loggedout
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }
  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center mt-5">
          I'm {user.name} with the mail id: ({user.email}) <br />
          <button
            onClick={logout}
            className="bg-primary py-1 px-5 mt-3 rounded-full text-white ">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
