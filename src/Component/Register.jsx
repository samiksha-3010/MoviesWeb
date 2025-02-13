
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import "./Style/Register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role set to "user" (lowercase)
  });
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const selectRole = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role) {
      if (userData.password === userData.confirmPassword) {
        try {
          const response = await axios.post("http://localhost:8000/auth/register", { userData });
          
          if (response.data.success) {
            setUserData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "user",
            });
            toast.success(response.data.message);
            navigate('/login');
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred during registration. Please try again.");
        }
      } else {
        toast.error("Passwords do not match.");
      }
    } else {
      toast.error("All fields are mandatory.");
    }
  };

  // return (
  //   <div style={{ marginTop: "90px" }}>
  //     <div id="logscreen">
  //       <div id="logbody">
  //         <div>
  //           <p>Register to create a profile</p>
  //         </div>
  //         <div id="logform">
  //           <form onSubmit={handleSubmit}>
  //             <label>Name</label><br />
  //             <input
  //               value={userData.name}
  //               type="text"
  //               name="name"
  //               onChange={handleChange}
  //               required
  //             /><br />
              
  //             <label>Select Role:</label><br />
  //             <select value={userData.role} onChange={selectRole}>
  //               <option value="admin">Admin</option> {/* Use lowercase "admin" */}
  //               <option value="user">User</option>   {/* Use lowercase "user" */}
  //             </select><br />
              
  //             <label>Email</label><br />
  //             <input
  //               value={userData.email}
  //               type="email"
  //               name="email"
  //               onChange={handleChange}
  //               required
  //             /><br />
              
  //             <label>Password</label><br />
  //             <input
  //               value={userData.password}
  //               type="password"
  //               name="password"
  //               onChange={handleChange}
  //               required
  //             /><br />
              
  //             <label>Confirm Password</label><br />
  //             <input
  //               value={userData.confirmPassword}
  //               type="password"
  //               name="confirmPassword"
  //               onChange={handleChange}
  //               required
  //             /><br />
              
  //             <input type="submit" value="Register" /><br />
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  return (
    <div className="container">
      <div className="logscreen">
        <div className="logbody">
          <div className="header">
            <p>Register to create a profile</p>
          </div>
          <div className="logform">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                value={userData.name}
                type="text"
                name="name"
                onChange={handleChange}
                required
              />

              <label>Select Role:</label>
              <select value={userData.role} onChange={selectRole}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <label>Email</label>
              <input
                value={userData.email}
                type="email"
                name="email"
                onChange={handleChange}
                required
              />

              <label>Password</label>
              <input
                value={userData.password}
                type="password"
                name="password"
                onChange={handleChange}
                required
              />

              <label>Confirm Password</label>
              <input
                value={userData.confirmPassword}
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
              />

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
