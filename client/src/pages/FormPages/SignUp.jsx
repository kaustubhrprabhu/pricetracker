import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SignUpForm from "../../components/Form/SignUpForm";
import { UserContext } from "../../contexts/userContext";
import "./FormPages.css";

function SignUp() {
  const { user } = useContext(UserContext);

  return user ? (
    <Navigate to="/" />
  ) : (
    <main>
      <div className="signup-container">
        <SignUpForm />
      </div>
    </main>
  );
}

export default SignUp;
