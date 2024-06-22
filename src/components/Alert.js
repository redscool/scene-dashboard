import React from "react";
import styles from "./Alert.module.css";
export default function Alert({ title, setTitle }) {
  if (!title) return null;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.button} onClick={() => setTitle("")}>
        <img src="/cross.svg" />
      </div>
    </div>
  );
}
