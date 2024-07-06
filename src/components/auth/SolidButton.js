import React from "react";

import styles from "./SolidButton.module.css";

export default function SolidButton({ label, onClick, style, labelStyle }) {
  return (
    <div className={styles.container} style={style} onClick={onClick}>
      <p style={labelStyle}>{label}</p>
    </div>
  );
}
