import "../CssStyling/LoginForm.css";
import { auth } from "../firebase-config";
import { database } from "../firebase-config";
import { ref, set, get } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface LoginProps {
  userName: string;
  userMoney: number;
  isNewUser: boolean;
  onFormSubmit: (
    userName: string,
    userId: string,
    userMoney: number,
    isNewUser: boolean
  ) => void;
}

export default function LoginForm({ onFormSubmit }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = ref(database, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          const isNewUser = !snapshot.exists();
          if (snapshot.exists()) {
            const userData = snapshot.val();
            onFormSubmit(
              user.displayName || "Anonymous",
              user.uid,
              userData.money || 1000,
              isNewUser
            );
          } else {
            // Set default money for new Google sign-in users
            set(userRef, { money: 1000, email: user.email });

            onFormSubmit(
              user.displayName || "Anonymous",
              user.uid,
              1000,
              isNewUser
            );
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = () => {
    if (!isValidEmail(email)) {
      setError("Email is not valid");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Remove the duplicate createUserWithEmailAndPassword call
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        const userRef = ref(database, `users/${user.uid}`);
        set(userRef, { money: 1000, email: user.email });
        // Set default money for new users
        onFormSubmit(
          user.email || "defaultEmail@example.com",
          user.uid,
          1000,
          true
        );
        setError("");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("The email address is already in use by another account.");
        } else {
          setError(error.message);
        }
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = ref(database, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          const isNewUser = !snapshot.exists(); // Determine if it's a new user
          if (snapshot.exists()) {
            const userData = snapshot.val();
            onFormSubmit(
              user.email || "Anonymous",
              user.uid,
              userData.money,
              isNewUser
            );
          } else {
            // This else clause should not happen for email/password sign-in, as the user is already registered
          }
        });
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-form">
      {isRegistering ? (
        <>
          <h2>Register</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="Sign-up-button" onClick={handleRegister}>
            Sign Up
          </button>
          <button onClick={() => setIsRegistering(false)}>
            Already have an account? Login
          </button>
        </>
      ) : (
        <>
          <button
            className="Sign-up-button"
            onClick={() => setIsRegistering(true)}
          >
            Need an account? Register
          </button>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="Sign-up-button" onClick={handleLogin}>
            Login
          </button>
          <button onClick={googleSignIn}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}
