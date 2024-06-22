import React, { useEffect, useState } from "react";
import styles from "./TopEvents.module.css";
import Select from "../form_components/DropDown";
import useService from "../../utils/ServiceContext";
import EventCard from "./topEvent/EventCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SolidButton from "../auth/SolidButton";
import useAlert from "../../hooks/useAlert";

export default function TopVenues() {
  const [city, setCity] = useState(0);
  const [cities, setCities] = useState([]);

  const [venues, setVenues] = useState();

  const [remainingVenues, setRemainingVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);

  const { request, requestWithAccessToken } = useService();
  const { showAlert } = useAlert();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const source = result.source.droppableId,
      destination = result.destination.droppableId;
    if (source === destination) {
      const box = Array.from(
        source === "selected" ? selectedVenues : remainingVenues
      );
      const [draggedItem] = box.splice(result.source.index, 1);
      box.splice(result.destination.index, 0, draggedItem);
      if (source === "selected") setSelectedVenues(box);
      else setRemainingVenues(box);
      return;
    }
    const sBox = Array.from(
      source === "selected" ? selectedVenues : remainingVenues
    );
    const dBox = Array.from(
      destination === "selected" ? selectedVenues : remainingVenues
    );
    const [draggedItem] = sBox.splice(result.source.index, 1);
    dBox.splice(result.destination.index, 0, draggedItem);
    if (source === "selected") setSelectedVenues(sBox);
    else setRemainingVenues(sBox);
    if (destination === "selected") setSelectedVenues(dBox);
    else setRemainingVenues(dBox);
  };

  const init = async () => {
    try {
      const res = await request("get", "/api/app/cities/", {});
      setCities(res);
    } catch (e) {
      // TODO: error handling
      showAlert("Something went wrong.");
    }
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!venues) return;
    const temp = [];
    for (let venue of venues) {
      let flag = false;
      for (let sVenue of selectedVenues) {
        if (sVenue.id === venue.id) {
          flag = true;
          break;
        }
      }
      if (!flag) temp.push(venue);
    }
    setRemainingVenues(temp);
  }, [selectedVenues, venues]);

  const getVenues = async () => {
    if (!city) return;
    try {
      const res = await request("post", "/api/app/search/", {
        cityKey: cities[city - 1].code,
        labels: {
          index: "venue",
        },
      });
      setVenues(res);
    } catch (e) {
      // TODO: error handling
      showAlert("Something went wrong.");
    }
  };

  const handleSubmit = async () => {
    const data = [];
    for (const venue of selectedVenues) data.push(venue.id);
    console.log(data);
    try {
      await requestWithAccessToken("patch", "/api/dashboard/appconfig", {
        city: cities[city - 1].code,
        key: "topVenues",
        data,
      });
      showAlert("Top Venues set successfully.");
    } catch (e) {
      // TODO: error handling
      showAlert("Something went wrong.");
      console.log(e);
    }
  };

  useEffect(() => {
    getVenues();
  }, [city]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Top Venues</p>
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
          <p>Selected Venues</p>
        </div>
        <div className={styles.allTitle}>
          <p>All Venues</p>
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
                {selectedVenues?.map((e, index) => (
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
                {remainingVenues?.map((e, index) => (
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
