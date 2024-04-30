import React from "react";

import styles from "./TextButton.module.css";

export default function TextButton({ label, onClick, style }) {
  return (
    <div className={styles.container} style={style} onClick={onClick}>
      <p>{label}</p>
    </div>
  );
}
