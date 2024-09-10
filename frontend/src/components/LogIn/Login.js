import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

//Login component
const Login = () => {
  const [user, setUser] = useState(""); //get user id
  const [password, setPassword] = useState(""); //get password

  const navigate = useNavigate();

  //if user is loged In then navigate to ticket or '/' page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  //function to login user
  //function to login user
  const handlelogin = async () => {
    const randomId = Math.floor(Math.random() * 100) + 1; // Generate random integer between 1 and 100
    const result = { id: randomId };
    if ("ACM MEMBER") {
      //if user is verified then store it in localstorage
      localStorage.setItem("user", JSON.stringify(result));
      //navigate to ticket
      navigate("/");
    } else {
      alert("Please enter correct details...");
    }
  };

  return (
    <div className="login">
      <h1 id="eventName">Technical Tambola</h1>

      <h1 id="login">Log In</h1>

      {/* take user id and store it in user state */}
      <input
        className="inputBox"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter User ID"
      />

      {/* take password and store it in password state */}
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      {/* try to login user by handlelogin function */}
      <button onClick={handlelogin} className="button" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
