import React from "react";

import styles from "./InputBox.module.css";

export default function InputBox({
  label,
  maxLength,
  placeholder = "Placeholder",
  setState,
  state,
  type,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
      <div className={styles.input}>
        <input
          maxLength={maxLength}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          type={type}
        />
      </div>
    </div>
  );
}
