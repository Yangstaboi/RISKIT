import React, { useState } from "react";
import "../CssStyling/LoginForm.css";

interface LoginProps {
  userName: string;
  userPassword: string;
  onFormSubmit: (
    userName: string,
    userPassword: string,
    userMoney: number
  ) => void;
}

export default function LoginForm({ onFormSubmit }: LoginProps) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedName: string = name;
    const submittedPassword: string = password;
    // Set the default money value to 1000
    const defaultMoney: number = 1000;
    onFormSubmit(submittedName, submittedPassword, defaultMoney);

    setName("");
    setPassword("");
  };

  return (
    <div className="login-form">
      <h2>Enter Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter Username Here"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password" // Changed to type "password" for better security
            id="password"
            value={password}
            placeholder="Enter Password Here"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="submit-container">
          <button type="submit">Enter RISKIT</button>
        </div>
      </form>
    </div>
  );
}
