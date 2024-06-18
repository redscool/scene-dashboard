import React, { useEffect, useState } from "react";
import styles from "./EventsModal.module.css";
import useService from "../../../utils/ServiceContext";
import Select from "../../form_components/DropDown";
import EventCard from "../topEvent/EventCard";

export default function EventsModal({ setEvent }) {
  const { request } = useService();

  const [city, setCity] = useState(0);
  const [cities, setCities] = useState([]);

  const [events, setEvents] = useState();

  const init = async () => {
    const res = await request("get", "/api/app/cities/", {});
    setCities(res);
  };

  const getEvents = async () => {
    if (!city) return;
    const res = await request("post", "/api/app/search/", {
      cityKey: cities[city - 1].code,
      labels: {
        index: "event",
      },
    });
    setEvents(res);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getEvents();
  }, [city]);

  return (
    <div className={styles.container}>
      <div className={styles.cityContainer}>
        <Select
          options={[{ title: "Select City", code: null }, ...cities]}
          selectedItem={city}
          setSelectedItem={setCity}
        />
      </div>
      <div className={styles.mainContainer}>
        {events?.map((e, index) => (
          <EventCard event={e} key={index} onClick={() => setEvent(e)} />
        ))}
      </div>
    </div>
  );
}
