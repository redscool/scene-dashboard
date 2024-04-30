import React, { useContext, useState } from "react";

import styles from "./AddUser.module.css";
import { ServiceContext } from "../../utils/ServiceContext";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const serviceObject = useContext(ServiceContext);
  const handleAddOrganiser = async () => {
    const response = await serviceObject.requestWithAccessToken(
      "post",
      "/api/dashboard/organiser/add",
      { email }
    );
    console.log(response);
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
