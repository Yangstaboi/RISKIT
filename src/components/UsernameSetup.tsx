// UsernameSetup.tsx
import React, { useState } from "react";
import { ref, update } from "firebase/database";
import { database } from "../firebase-config";

// Define an interface for the component's props
interface UsernameSetupProps {
  userId: string;
  onUsernameSet: () => void; // Assuming this is a callback with no parameters
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
    <div>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UsernameSetup;
