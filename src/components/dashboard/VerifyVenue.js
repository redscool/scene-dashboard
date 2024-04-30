import React from "react";

import styles from "./VerifyVenue.module.css";

export default function VerifyVenue() {
  const venues = [
    {
      banner: "temp.jpg",
      name: "DTU",
      type: "College",
      city: "Delhi",
      Address: "Main Bawana Road, Delhi-110042",
      location: "Main Bawana Road, Delhi-110042",
    },
    {
      banner: "temp.jpg",
      name: "DTU",
      type: "College",
      city: "Delhi",
      Address: "Main Bawana Road, Delhi-110042",
      location: "Main Bawana Road, Delhi-110042",
    },
    {
      banner: "temp.jpg",
      name: "DTU",
      type: "College",
      city: "Delhi",
      Address: "Main Bawana Road, Delhi-110042",
      location: "Main Bawana Road, Delhi-110042",
    },
  ];
  return (
    <div className={styles.mainContainer}>
      {venues.map((item, index) => (
        <div className={styles.section}>
          <div className={styles.label}>
            <p>Venue</p>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>
              <p>Email</p>
            </div>
            <div className={styles.fieldInput}>
              <p>askhan</p>
            </div>
          </div>
          <div className={styles.button}>
            <p>Approve</p>
          </div>
        </div>
      ))}
    </div>
  );
}
