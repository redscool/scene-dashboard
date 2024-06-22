import React, { useContext, useState } from "react";

import styles from "./AddUser.module.css";
import { ServiceContext } from "../../utils/ServiceContext";
import useAlert from "../../hooks/useAlert";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const serviceObject = useContext(ServiceContext);
  const { showAlert } = useAlert();

  const handleAddOrganiser = async () => {
    if (!email) {
      showAlert("Enter an email.");
      return;
    }
    try {
      await serviceObject.requestWithAccessToken(
        "post",
        "/api/dashboard/organiser/add",
        { email }
      );
      showAlert("User added successfully.");
      setEmail("");
    } catch (e) {
      // TODO: error handling
      showAlert("Something went wrong.");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.section}>
        <div className={styles.label}>
          <p>Create Organiser</p>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <p>Email</p>
          </div>
          <div className={styles.fieldInput}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              type="email"
              value={email}
            />
          </div>
        </div>
        <div className={styles.button} onClick={handleAddOrganiser}>
          <p>Add Organiser</p>
        </div>
      </div>
    </div>
  );
}
