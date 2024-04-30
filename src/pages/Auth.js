import React from "react";
import { Route, Routes } from "react-router-dom";

import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import Otp from "../components/auth/Otp";
import ResetPassword from "../components/auth/ResetPassword";
import styles from "./Auth.module.css";

export default function Auth() {
  return (
    <div className={styles.page}>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/confirmemail" element={<Otp />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
