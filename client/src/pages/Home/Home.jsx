import { useContext } from "react";
import SignUpForm from "../../components/Form/SignUpForm";
import { UserContext } from "../../contexts/userContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Home.css";

function Home() {
  const { user } = useContext(UserContext);

  return user ? (
    <Dashboard />
  ) : (
    <main>
      <div className="home-content">
        <div className="left-div">
          <h2>
            Keep track of your favorite products and receive real-time alerts
            when prices drop. Never again miss a deal!
          </h2>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}

export default Home;
