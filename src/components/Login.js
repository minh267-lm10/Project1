import React, { useState } from "react";
import "../css/login.css";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Apiuser from "../Api/Apiuser";
import { useNavigate } from "react-router-dom";
import { setToken } from "../Service/Localtokenservice";
import { OAuthConfig } from "./configurations/configuration";
import { FcGoogle } from "react-icons/fc";
function Login(props) {
  let [Username, setUsername] = useState();
  let [Password, setPassword] = useState();
  let navigate = useNavigate();

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  let checklogin = async (e) => {
    e.preventDefault();
    try {
      let dataUser = {
        username: Username,
        password: Password,
      };
      let response = (await Apiuser.apiLogin(dataUser)).data;
      let { token } = response.result;
      setToken(token);
      navigate("/");
    } catch (error) {
      let a = error.response.data.message;
      alert("kiểm tra lại thông tin đăng nhập:" + a);
    }
  };
  return (
    <div className="Baoboc">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="inputbox">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="iconn" />
          </div>
          <div className="inputbox">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="iconn" />
          </div>
          <button type="submit" onClick={checklogin}>
            Login
          </button>
          <button
            type="submit"
            className="regis"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: "#fff",
              color: "#000",
              // border: "1px solid #ccc",
              //  borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleContinueWithGoogle}
          >
            <FcGoogle style={{ width: "20px", height: "20px" }} />
            Login with Google
          </button>

          <button
            type="submit"
            className="regis"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
