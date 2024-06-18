import React, { useState } from "react";
import styles from "./TopEvents.module.css";
import Select from "../form_components/DropDown";
import useService from "../../utils/ServiceContext";
import EventCard from "./topEvent/EventCard";
import SolidButton from "../auth/SolidButton";
import EventsModal from "./updateEvent/EventsModal";
import AppCard from "./updateEvent/AppCard";

export default function UpdateEvent() {
  const { requestWithAccessToken } = useService();

  const [event, setEvent] = useState();
  const [apps, setApps] = useState([
    {
      iOS: "",
      android: "",
      name: "",
      logo: "",
    },
  ]);

  const handAddApp = () => {
    setApps([
      ...apps,
      {
        iOS: "",
        android: "",
        name: "",
        logo: "",
      },
    ]);
  };

  const setApp = (index, data) => {
    const temp = [...apps];
    temp[index] = data;
    setApps(temp);
  };

  const [selectedItem, setSelectedItem] = useState(0);

  const handleSubmit = async () => {
    const eventData = { price: 0 };
    if (selectedItem === 1) eventData["showAds"] = true;
    else if (selectedItem === 2) eventData["installApps"] = apps;
    try {
      await requestWithAccessToken("patch", "/api/dashboard/event", {
        eventId: event.id,
        eventData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Update Event</p>
      </div>
      {!event && <EventsModal setEvent={setEvent} />}
      {event && (
        <div className={styles.flowContainer}>
          <EventCard event={event} />
          <div className={styles.cityContainer}>
            <Select
              label={"Select a flow"}
              options={[
                { title: "Free", code: "free" },
                { title: "Ad", code: "ad" },
                { title: "Install Apps", code: "install_apps" },
              ]}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
          {selectedItem === 2 && (
            <>
              <SolidButton
                label={"Add App"}
                onClick={handAddApp}
                style={{ margin: "5vh auto" }}
              />
              {apps && (
                <div className={styles.appsContainer}>
                  {apps?.map((app, index) => (
                    <AppCard
                      key={`app-${index}`}
                      app={app}
                      setApp={(data) => setApp(index, data)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
      <SolidButton
        label={"Submit"}
        onClick={handleSubmit}
        style={{ margin: "5vh auto" }}
      />
    </div>
  );
}
