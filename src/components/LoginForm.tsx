import "../CssStyling/LoginForm.css";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface LoginProps {
  userName: string;
  userMoney: number;
  onFormSubmit: (userName: string, userId: string, userMoney: number) => void;
}

export default function LoginForm({ onFormSubmit }: LoginProps) {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Provide a fallback value for displayName, e.g., 'Anonymous' or an empty string
        const displayName = user.displayName || "Anonymous";
        onFormSubmit(displayName, user.uid, 1000); // Assuming 1000 is the default money
      })
      .catch((error) => {
        console.error(error);
        // Handle Errors here.
      });
  };

  return (
    <div className="login-form">
      <h2>Login with Google</h2>
      <button onClick={googleSignIn}>Sign in with Google</button>
    </div>
  );
}
