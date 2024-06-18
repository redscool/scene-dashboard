import React, { useState } from "react";
import styles from "./AppCard.module.css";
import { getFileUrl } from "../../../utils/misc";
import UploadImage from "../../form_components/ImageUpload";
export default function AppCard({ app, setApp }) {
  const setState = (key, value) => {
    setApp({ ...app, [key]: value });
  };
  const [popup, setPopup] = useState(false);
  return (
    <>
      {popup && (
        <UploadImage
          setView={setPopup}
          setImage={(file) => setState("logo", file)}
        />
      )}
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => setPopup(true)}>
          <img src={getFileUrl(app.logo)} alt="logo" />
        </div>
        {Object.entries(app)
          .filter((item) => item[0] !== "logo")
          .map((v, index) => (
            <div className={styles.field} key={`field-${index}`}>
              <div className={styles.fieldLabel}>
                <p>{v[0]}</p>
              </div>
              <div className={styles.fieldInput}>
                <input
                  onChange={(e) => setState(v[0], e.target.value)}
                  placeholder="Placeholder"
                  value={v[1]}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
