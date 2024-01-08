// UsernameSetup.tsx
import React, { useState } from "react";
import { ref, update } from "firebase/database";
import { database } from "../firebase-config";
import "../CssStyling/LoginForm.css";

// Define an interface for the component's props
interface UsernameSetupProps {
  userId: string;
  onUsernameSet: () => void;
}

// Use the interface with your component
const UsernameSetup: React.FC<UsernameSetupProps> = ({
  userId,
  onUsernameSet,
}) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    const userRef = ref(database, `users/${userId}`);
    update(userRef, { username }).then(() => {
      onUsernameSet(); // Call the callback function to signal that the username has been set
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
      <button className="Sign-up-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UsernameSetup;
