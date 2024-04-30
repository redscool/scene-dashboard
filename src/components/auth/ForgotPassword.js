import React, { useContext, useState } from "react";

import styles from "./Auth.module.css";
import InputBox from "./InputBox";
import SolidButton from "./SolidButton";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../utils/ServiceContext";
import { ROUTES, STORAGE_KEY } from "../../utils/constants";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const serviceObject = useContext(ServiceContext);

  const handleForgotPassword = async () => {
    const data = await serviceObject.request(
      "post",
      "/api/auth/admin/forgotPassword",
      { email }
    );
    if (data?.error) {
      // TODO: error handling
      console.log("error");
    }
    else {
      localStorage.setItem(STORAGE_KEY.EMAIL, email)
      navigate(ROUTES.CONFIRM_EMAIL);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>Forgot Password</p>
      </div>
      <div className={styles.image}>
        <img src="/lock.svg" />
      </div>
      <div className={styles.form}>
        <InputBox
          label="Email"
          setState={setEmail}
          state={email}
          type="email"
        />
      </div>
      <SolidButton
        label="Forgot Password"
        onClick={handleForgotPassword}
        style={{ alignSelf: "center", marginTop: "5vh" }}
      />
    </div>
  );
}
