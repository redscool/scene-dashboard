import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";

export default function Select({
  options,
  selectedItem,
  setSelectedItem,
  label,
}) {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      {label ? (
        <div className={styles.label}>
          <p>{label}</p>
        </div>
      ) : null}
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <p>{options[selectedItem]?.title}</p>
        <img src={!isOpen ? "/down.svg" : "/up.svg"} />
      </div>
      <div
        className={`${styles.dropdownBody} ${isOpen ? "" : styles.visible} ${
          label ? "" : styles.margin
        }`}
      >
        {options.map((item, idx) => {
          return (
            <div
              className={`${styles.dropdownItem} ${
                item === selectedItem ? styles.selectedItem : ""
              }`}
              onClick={() => handleItemClick(idx)}
              key={idx}
            >
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
