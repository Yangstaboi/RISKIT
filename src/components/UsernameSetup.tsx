// UsernameSetup.tsx
import React, { useState } from "react";
import {
  ref,
  update,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database } from "../firebase-config";
import "../CssStyling/LoginForm.css";

interface UsernameSetupProps {
  userId: string;
  onUsernameSet: () => void;
}

const UsernameSetup: React.FC<UsernameSetupProps> = ({
  userId,
  onUsernameSet,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    // Reset error message
    setError("");

    // Query to check if username already exists
    const usernamesRef = query(
      ref(database, "users"),
      orderByChild("username"),
      equalTo(username)
    );
    get(usernamesRef)
      .then((snapshot) => {
        // Check if any existing usernames match the provided username
        let usernameTaken = false;
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().username === username) {
            usernameTaken = true;
          }
        });

        if (usernameTaken) {
          // Username is taken by another user
          setError("Username is already taken, please choose a different one.");
        } else {
          // Username is available
          const userRef = ref(database, `users/${userId}`);
          update(userRef, { username }).then(() => {
            onUsernameSet(); // Signal that the username has been set
          });
        }
      })
      .catch((error) => {
        console.error("Query error", error);
        setError(`An error occurred: ${error.message}`);
      });
  };

  return (
    <div className="login-form">
      <h2>Set Your Username</h2>
      <input
        className="username-input"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="Sign-up-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UsernameSetup;
