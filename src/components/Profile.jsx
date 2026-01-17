import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const userData = {
    name: "Satendra Mahanta",
    email: "satendramahanta@gmail.com",
    phone: "+44 123 456 7890",
    address: "IRC village",
    city: "Bhubaneswar",
    pincode: "751015",
    country: "India",
    joined: "2023-01-15",
  };

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate("/body")}>
        ← Back
      </button>

      <h1>My Profile</h1>

      <div className="profile-card">
        {Object.entries(userData).map(([key, value]) => (
          <div className="profile-item" key={key}>
            <span className="label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span className="value">{value}</span>
          </div>
        ))}

        <div className="profile-action">
          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
