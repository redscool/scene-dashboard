import React, { useContext, useState } from "react";

import styles from "./Auth.module.css";
import InputBox from "./InputBox";
import SolidButton from "./SolidButton";
import { useNavigate } from "react-router-dom";
import { ROUTES, STORAGE_KEY } from "../../utils/constants";
import { ServiceContext } from "../../utils/ServiceContext";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const serviceObject = useContext(ServiceContext);

  const handleContinue = async () => {
    const email = localStorage.getItem(STORAGE_KEY.EMAIL);

    const data = await serviceObject.request(
      "post",
      "/api/auth/admin/verifyOtp",
      { otp, email }
    );
    if (data?.error) console.log(data);
    else {
      const { resetToken } = data;
      localStorage.setItem("RESET_TOKEN", resetToken);
      navigate(ROUTES.RESET_PASSWORD);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>Confirm Email</p>
      </div>
      <div className={styles.image}>
        <img src="/lock.svg" />
      </div>
      <div className={styles.form}>
        <InputBox
          label="OTP"
          setState={setOtp}
          state={otp}
          type="password"
          maxLength={4}
        />
      </div>
      <SolidButton
        label="Continue"
        onClick={handleContinue}
        style={{ alignSelf: "center", marginTop: "5vh" }}
      />
    </div>
  );
}
