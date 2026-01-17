import React from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  // Sample random data
  const players = [
    { id: 1, name: "Alice", points: 2980 },
    { id: 2, name: "Bob", points: 2721 },
    { id: 3, name: "Charlie", points: 2579 },
    { id: 4, name: "David", points: 1874 },
    { id: 5, name: "Eve", points: 1756 },
  ];

  // Sort descending by points
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">LEADERBOARD</h2>
      <div className="leaderboard-box">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`leaderboard-row ${index < 3 ? "top-rank" : ""}`}
          >
            <div className="rank">
              {index + 1 <= 3 ? (
                <span className={`medal medal-${index + 1}`}></span>
              ) : (
                index + 1
              )}
            </div>
            <div className="avatar">👤</div>
            <div className="player-name">{player.name}</div>
            <div className="player-points">{player.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
