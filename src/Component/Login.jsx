import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Style/Login.css"; 
import AuthContext from "./Context/AuthContext.jsx";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      return toast.error("Invalid email format.");
    }
    if (userData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    setIsLoading(true); // Disable button
    try {
      const response = await axios.post("http://localhost:8000/auth/login", { userData });
      if (response.data.success) {
        dispatch({
          type: "LOGIN",
          payload: response.data.user,
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setUserData({ email: "", password: "" });
        router("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div className="container">
  <div className="logscreen">
    <div className="logbody">
      <div className="header">
        <p>Log In to view your profile</p>
      </div>
      <div className="logform">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your Email ID:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            aria-label="Enter your email"
          />
          <label htmlFor="password">Enter your Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            aria-label="Enter your password"
          />
          <button disabled={isLoading}>
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
      <div className="footer">
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
        <p >
          By continuing, you agree to our <a href="#">Terms and Conditions</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</div>

    // <div id="logscreen">
    //   <div id="logbody">
    //     <div>
    //     </div>
    //     <div>
    //       <p>Log In to view your profile</p>
    //     </div>
    //     <div id="logform">
    //       <form onSubmit={handleSubmit}>
    //         <label>Enter your Email ID :</label>
    //         <br />
    //         <input
    //           type="email"
    //           name="email"
    //           value={userData.email}
    //           onChange={handleChange}
    //           aria-label="Enter your email"
    //         />
    //         <br />
    //         <label>Enter your Password :</label>
    //         <br />
    //         <input
    //           type="password"
    //           name="password"
    //           value={userData.password}
    //           onChange={handleChange}
    //           aria-label="Enter your password"
    //         />
    //         <br />
    //         <button disabled={isLoading}>{isLoading ? "Logging in..." : "LOGIN"}</button>
    //       </form>
    //     </div>
    //     <div>
    //       <span>Do not have an Account? <Link to="/register">Register</Link></span>
    //     </div>
    //     <div>
    //       <p>By continuing, you agree to</p>
    //       <span>Terms and Conditions</span>
    //       <span> and </span>
    //       <span>Privacy Policy</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
