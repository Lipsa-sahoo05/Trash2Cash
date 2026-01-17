import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is login
  const isLoginPage = location.pathname === "/";

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsOpen(false);
  };

  const confirmLogout = (choice) => {
    if (choice === "yes") navigate("/");
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-spacer" />

          {/* Logo always visible */}
          <div className="logo">Trash2Cash</div>

          {/* Hide buttons ONLY on login page */}
          {!isLoginPage && (
            <div className="right-section">
              <div
                className="menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
              >
                ☰
              </div>

              <div className={`nav-links ${isOpen ? "show" : ""}`}>
                <button
                  className="profile-btn"
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                >
                  Profile
                </button>

                <button
                  className="profile-btn"
                  onClick={() => {
                    navigate("/leaderboard");
                    setIsOpen(false);
                  }}
                >
                  Leaderboard
                </button>

                <button className="profile-btn" onClick={handleLogout}>
                  Log-out
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {!isLoginPage && showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button onClick={() => confirmLogout("yes")}>Yes</button>
              <button onClick={() => confirmLogout("no")}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
