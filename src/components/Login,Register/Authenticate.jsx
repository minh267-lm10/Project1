import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, setToken } from "../../Service/Localtokenservice";

import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    const checklgoogle = async (authCode) => {
      try {
        const response = await axios.post(`http://localhost:8888/api/v1/identity/auth/outbound/authentication?code=${authCode}`);
        setToken(response.data.result?.token);
    //    alert("Thành công gg mã tk:"+getToken);

        setIsLoggedin(true);
      } catch (error) {
      //  alert("Error:"+ error+getToken);
      }
    };

    if (isMatch) {
      const authCode = isMatch[1];
      checklgoogle(authCode)
     
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}
