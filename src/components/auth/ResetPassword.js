import React, { useContext, useState } from "react";

import styles from "./Auth.module.css";
import InputBox from "./InputBox";
import SolidButton from "./SolidButton";
import { ROUTES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../utils/ServiceContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();
  const serviceObject = useContext(ServiceContext);

  const handleReset = async () => {
    if (cpassword !== password) {
      // showToast("Password and Confirm password are different");
      return;
    }
    const resetToken = localStorage.getItem("RESET_TOKEN");
    const data = await serviceObject.request(
      "post",
      "/api/auth/admin/resetPassword",
      { password, resetToken }
    );
    if (data?.error) {
      // showToast('Something went wrong.');
    } else {
      // showToast('Password Reset Successfully.');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>Reset Password</p>
      </div>
      <div className={styles.image}>
        <img src="/lock.svg" />
      </div>
      <div className={styles.form}>
        <InputBox
          label="Password"
          setState={setPassword}
          state={password}
          type="password"
        />
        <InputBox
          label="Confirm Password"
          setState={setCpassword}
          state={cpassword}
          type="password"
        />
      </div>
      <SolidButton
        label="Reset Password"
        onClick={handleReset}
        style={{ alignSelf: "center", marginTop: "5vh" }}
      />
    </div>
  );
}
