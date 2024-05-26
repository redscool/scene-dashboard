import styles from "./InputFieldWithoutLabel.module.css";
export default function InputFieldWithoutLabel({
  placeholder,
  state,
  setState,
}) {
  return (
    <div className={styles.fieldContainer}>
      <input
        placeholder={placeholder}
        className={styles.fieldInput}
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
    </div>
  );
}
