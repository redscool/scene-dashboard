import React, { useContext, useEffect, useState } from "react";

import styles from "./VerifyVenue.module.css";
import { ServiceContext } from "../../utils/ServiceContext";

export default function VerifyVenue() {
  const [venues, setVenues] = useState([]);
  const serviceObject = useContext(ServiceContext);
  const getVenues = async () => {
    const res = await serviceObject.requestWithAccessToken(
      "get",
      "/api/dashboard/venue/pendingvenues",
      {}
    );
    setVenues(res);
  };
  useEffect(() => {
    getVenues();
  }, []);
  const approveHandler = async (venue) => {
    try {
      await serviceObject.requestWithAccessToken(
        "post",
        "/api/dashboard/venue/approve",
        { venueId: venue._id }
      );

      getVenues();
    } catch (e) {
      // TODO: error handling
    }
  };
  const requiredKeys = [
    "name",
    "abbreviation",
    "type",
    "city",
    "address",
    "tags",
    "keywords",
  ];
  return (
    <div className={styles.mainContainer}>
      {venues.map((item, index) => (
        <div className={styles.section} key={index}>
          <div className={styles.label}>
            <p>Venue</p>
          </div>
          {requiredKeys.map((key, index) => (
            <div className={styles.field} key={index}>
              <div className={styles.fieldLabel}>
                <p>{key[0].toUpperCase() + key.substring(1)}</p>
              </div>
              <div className={styles.fieldInput}>
                <p>{JSON.stringify(item[key])}</p>
              </div>
            </div>
          ))}
          <div className={styles.field} key={"map"}>
            <div className={styles.fieldLabel}>
              <p>Location</p>
            </div>
            <a
              className={styles.fieldInput}
              href={`https://maps.google.com/maps?q=${item["location"].lat},${item["location"].lng}&hl=es&z=14&amp`}
              target="_blank"
            >
              <p>{JSON.stringify(item["location"])}</p>
            </a>
          </div>
          <div className={styles.button} onClick={() => approveHandler(item)}>
            <p>Approve</p>
          </div>
        </div>
      ))}
    </div>
  );
}
