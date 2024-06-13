import React, { useEffect, useState } from "react";
import styles from "./TopEvents.module.css";
import Select from "../form_components/DropDown";
import useService from "../../utils/ServiceContext";
import EventCard from "./topEvent/EventCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SolidButton from "../auth/SolidButton";

export default function TopEvents() {
  const [city, setCity] = useState(0);
  const [cities, setCities] = useState([]);

  const [events, setEvents] = useState();

  const [remainingEvents, setRemainingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const { request, requestWithAccessToken } = useService();

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const source = result.source.droppableId,
      destination = result.destination.droppableId;
    if (source === destination) {
      const box = Array.from(
        source === "selected" ? selectedEvents : remainingEvents
      );
      console.log(box);
      const [draggedItem] = box.splice(result.source.index, 1);
      box.splice(result.destination.index, 0, draggedItem);
      if (source === "selected") setSelectedEvents(box);
      else setRemainingEvents(box);
      console.log(box);
      return;
    }
    const sBox = Array.from(
      source === "selected" ? selectedEvents : remainingEvents
    );
    const dBox = Array.from(
      destination === "selected" ? selectedEvents : remainingEvents
    );
    const [draggedItem] = sBox.splice(result.source.index, 1);
    dBox.splice(result.destination.index, 0, draggedItem);
    if (source === "selected") setSelectedEvents(sBox);
    else setRemainingEvents(sBox);
    if (destination === "selected") setSelectedEvents(dBox);
    else setRemainingEvents(dBox);
  };

  const init = async () => {
    const res = await request("get", "/api/app/cities/", {});
    setCities(res);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!events) return;
    const temp = [];
    for (let event of events) {
      let flag = false;
      for (let sEvent of selectedEvents) {
        if (sEvent.id === event.id) {
          flag = true;
          break;
        }
      }
      if (!flag) temp.push(event);
    }
    setRemainingEvents(temp);
  }, [selectedEvents, events]);

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

  const handleSubmit = async () => {
    const data = [];
    for (const event of selectedEvents) data.push(event.id);
    console.log(data);
    try {
      await requestWithAccessToken("patch", "/api/dashboard/appconfig", {
        city: cities[city - 1].code,
        key: "topEvents",
        data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEvents();
  }, [city]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Top Events</p>
      </div>
      <div className={styles.cityContainer}>
        <Select
          options={[{ title: "Select City", code: null }, ...cities]}
          selectedItem={city}
          setSelectedItem={setCity}
        />
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.selectedTitle}>
          <p>Selected Events</p>
        </div>
        <div className={styles.allTitle}>
          <p>All Events</p>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="selected">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.selectedContainer}
              >
                {selectedEvents?.map((e, index) => (
                  <Draggable key={e.id} draggableId={e.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <EventCard event={e} key={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="remaining">
            {(provided) => (
              <div
                className={styles.allContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {remainingEvents?.map((e, index) => (
                  <Draggable key={e.id} draggableId={e.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <EventCard event={e} key={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <SolidButton
        label={"Submit"}
        onClick={handleSubmit}
        style={{ margin: "5vh auto" }}
      />
    </div>
  );
}
