import { useContext } from "react";
import { Navigate } from "react-router-dom";
import SignInForm from "../../components/Form/SignInForm";
import { UserContext } from "../../contexts/userContext";
import "./FormPages.css";

function SignIn() {
  const { user } = useContext(UserContext);

  return user ? (
    <Navigate to="/" />
  ) : (
    <main>
      <div className="login-container">
        <SignInForm />
      </div>
    </main>
  );
}

export default SignIn;
