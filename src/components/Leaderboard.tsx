// Leaderboard.tsx
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "../CssStyling/Leaderboard.css";

interface LeaderboardEntry {
  uid: string;
  email: string;
  money: number;
}

const Leaderboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "users");

    // Subscribe to user updates
    const unsubscribe = onValue(userRef, (snapshot) => {
      const usersSnapshot = snapshot.val();
      const leaderboard = Object.keys(usersSnapshot || {})
        .map((key) => ({
          uid: key,
          email: usersSnapshot[key].email,
          money: Number(usersSnapshot[key].money),
        }))
        .sort((a, b) => b.money - a.money);

      setLeaderboardData(leaderboard);
    });

    // Cleanup function to unsubscribe
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const leaderboardListItems = leaderboardData.map((user) => {
    // Make sure email exists before calling split
    const emailName = user.email ? user.email.split("@")[0] : "Unknown";
    return (
      <li key={user.uid}>
        {emailName}: ${user.money.toFixed(2)}
      </li>
    );
  });

  const toggleLeaderboard = () => {
    setIsOpen(!isOpen);
  };

  const panelClass = isOpen ? "leaderboard open" : "leaderboard";
  const buttonClass = isOpen ? "leaderboard-button open" : "leaderboard-button";

  return (
    <>
      <button className={buttonClass} onClick={toggleLeaderboard}>
        <span className="arrow">➤</span>
        Leaderboard
      </button>
      <div className={panelClass}>
        <div className="leaderboard-title">Leaderboard</div>
        <ul>{leaderboardListItems}</ul>
      </div>
    </>
  );
};

export default Leaderboard;
