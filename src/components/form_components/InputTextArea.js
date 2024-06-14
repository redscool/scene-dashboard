import { useEffect, useState } from "react";
import styles from "./InputTextArea.module.css";
export default function InputTextArea({ state, setState, placeholder, id }) {
  const [rows, setRows] = useState(1);
  const handleChange = (event) => {
    setState(event.target.value);
    setRows(event.target.value.split("\n").length);
  };
  useEffect(() => {
    var textarea = document.getElementById(id);
    textarea.scrollTop = 1e9;
  }, [rows, state]);
  return (
    <div className={styles.areaContainer}>
      <textarea
        value={state}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.textarea}
        spellCheck="false"
        rows={rows > 4 ? 4 : rows}
        id={id}
      />
    </div>
  );
}
