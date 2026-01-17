import React, { useEffect, useState } from "react";
import "./Body.css";
import coinGif from "../icons/icons8-coin.gif";

const Body = () => {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [url, setUrl] = useState(""); // For URL input inside popup

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-data");
      const json = await res.json();
      setData(json.user_data);
      setPrediction(json.predicted_points);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ===== IMPACT CALCULATIONS =====
  const totalPlastic = data.reduce((sum, d) => sum + Number(d.weight || 0), 0);
  const totalCarbonSaved = totalPlastic * 1.5;
  const totalTreesSaved = totalCarbonSaved * 2;
  const totalWaterSaved = (totalPlastic / 1000) * 20000;

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submitted URL (e.g., fetch data from it)
    console.log("Submitted URL:", url);
    setUrl(""); // Reset input
  };

  return (
    <div className="body-container">
      {/* ===== IMPACT SUMMARY ===== */}
      <div className="impact-grid">
        <div className="impact-card">
          <span className="impact-icon">🌍</span>
          <h3>{totalCarbonSaved.toFixed(2)} g</h3>
          <p>Carbon Saved</p>
        </div>

        <div className="impact-card">
          <span className="impact-icon">🌳</span>
          <h3>{totalTreesSaved.toFixed(1)}</h3>
          <p>Trees Saved</p>
        </div>

        <div className="impact-card">
          <span className="impact-icon">♻️</span>
          <h3>{totalPlastic} g</h3>
          <p>Plastic Collected</p>
        </div>

        <div className="impact-card water-card">
          <span className="impact-icon">💧</span>
          <h3>{totalWaterSaved.toLocaleString()} L</h3>
          <p>Water Saved</p>
        </div>
      </div>

      {/* ===== TODAY'S DATA ===== */}
      <div className="todays-data-box">
        <h2>Today's Data</h2>

        <div className="header-row data-row">
          <span>ID</span>
          <span>Weight (g)</span>
          <span>Volume</span>
          <span>Time</span>
        </div>

        {data.length === 0 && <p>No data submitted yet.</p>}

        {data.map((d, idx) => {
          const carbonSaved = d.weight * 1.5;
          const treesSaved = carbonSaved * 2;
          const waterSaved = (d.weight / 1000) * 20000;

          return (
            <div className="data-row tooltip-container" key={idx}>
              <span>{d.collector_id}</span>
              <span>{d.weight}</span>
              <span>{d.volume}</span>
              <span>{formatTime()}</span>

              <div className="tooltip-card">
                <div className="tooltip-row">
                  <span>🌍 Carbon</span>
                  <span>{carbonSaved.toFixed(2)} g</span>
                </div>
                <div className="tooltip-row">
                  <span>🌳 Trees</span>
                  <span>{treesSaved.toFixed(1)}</span>
                </div>
                <div className="tooltip-row">
                  <span>💧 Water</span>
                  <span>{waterSaved.toLocaleString()} L</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BADGE */}
      {prediction >= 1000 && <div className="badge">🏅 Eco Hero</div>}

      {/* COIN */}
      <img src={coinGif} alt="coin" className="coin-icon" />

      {/* POINTS BUTTON */}
      <button className="points-btn" onClick={() => setShowPoints(true)}>
        POINTS
      </button>

      <br />

      <div className="popup-actions">
        <button
          className="redeem-btn"
          onClick={() => {
            setShowPoints(false);
            setShowRedeem(true);
          }}
        >
          REDEEM NOW
        </button>
      </div>

      {/* ===== POINTS POPUP ===== */}
      {showPoints && (
        <div className="popup-overlay" onClick={() => setShowPoints(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Total Points</h2>
            <div className="data-row">
              <span>Points</span>
              <span>{prediction}</span>
            </div>
            <button className="close-btn" onClick={() => setShowPoints(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== REDEEM POPUP WITH URL FORM ===== */}
      {showRedeem && (
        <div className="popup-overlay" onClick={() => setShowRedeem(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Redeem Now</h2>

            {/* Points and Price */}
            <div className="data-row">
              <span>{prediction} Points</span>
              <span>₹ {(prediction * 0.07).toFixed(2)}</span>
              <br></br>
            </div>

            {/* Optional message */}
         <br></br>

            {/* ===== URL Input Form ===== */}
            {/* ===== URL Input Form ===== */}
<form onSubmit={handleUrlSubmit} className="url-form" style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
  <input
    type="text"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    placeholder="Enter UPI ID (ex:-abc@ybl)"
    className="url-input"
    style={{ flex: 1, padding: "8px" }}
  />
  <button type="submit" className="next-btn" style={{ padding: "8px 16px" }}>
    Submit URL
  </button>
</form>

            <br></br>

            {/* Close button */}
            <button className="close-btn" onClick={() => setShowRedeem(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
