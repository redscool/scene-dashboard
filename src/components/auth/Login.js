import React, { useContext, useState } from "react";

import styles from "./Auth.module.css";
import InputBox from "./InputBox";
import SolidButton from "./SolidButton";
import TextButton from "./TextButton";
import { useNavigate } from "react-router-dom";
import { ROUTES, SECURE_STORAGE_KEY, STORAGE_KEY } from "../../utils/constants";
import { ServiceContext } from "../../utils/ServiceContext";
import useAlert from "../../hooks/useAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const serviceObject = useContext(ServiceContext);

  const handleLogin = async () => {
    if (!email) {
      showAlert("Enter email.");
      return;
    }
    if (!password) {
      showAlert("Enter password.");
      return;
    }
    const data = await serviceObject.request("post", "/api/auth/admin/login", {
      email,
      password,
    });
    if (data?.error) {
      // TODO: HandleError
      showAlert("Something went wrong.");
    } else {
      const { accessToken, refreshToken, userId } = data;
      localStorage.setItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEY.USER_ID, userId);
      localStorage.setItem(STORAGE_KEY.EMAIL, email);
      navigate(ROUTES.ADD_ORGANISER);
    }
  };

  const handleForgotPassWord = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>Login</p>
      </div>
      <div className={styles.image}>
        <img src="/verify.svg" />
      </div>
      <div className={styles.form}>
        <InputBox
          label="Email"
          setState={setEmail}
          state={email}
          type="email"
        />
        <InputBox
          label="Password"
          setState={setPassword}
          state={password}
          type="password"
        />
      </div>
      <SolidButton
        label="Login"
        onClick={handleLogin}
        style={{ alignSelf: "center", marginTop: "5vh" }}
      />
      <TextButton
        label="Forgot Password"
        onClick={handleForgotPassWord}
        style={{ alignSelf: "center", marginTop: "1vh" }}
      />
    </div>
  );
}
