import React from "react";

import styles from "./EventCard.module.css";
// import TagCard from "./TagCard";

import {
  getAddress,
  getEventCardDateFormat,
  getFileUrl,
} from "../../../utils/misc";

const EventCard = ({ event, onClick }) => {
  const date = getEventCardDateFormat(event.time);
  return (
    <div className={styles.container} {...(onClick && { onClick })}>
      <div className={styles.image}>
        <img src={getFileUrl(event.bannerImage)} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.name}>
          <p>{event.name}</p>
        </div>
        <div className={styles.date}>
          <p>{date}</p>
        </div>

        <div className={styles.abbreviationContainer}>
          {/* <p className={styles.abbreviation}>{event.abbreviation}</p> */}
          {/* </div> */}
          {/* <div className={styles.venueContainer}> */}
          {/* <img color={colors.secondary} name="location" size={8} /> */}
          {/* <p className={styles.venue}>{getAddress(event.address)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
