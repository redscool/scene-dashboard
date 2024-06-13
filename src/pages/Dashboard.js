import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AddUser from "../components/dashboard/AddUser";
import Sidebar from "../components/dashboard/Sidebar";
import styles from "./Dashboard.module.css";
import VerifyVenue from "../components/dashboard/VerifyVenue";
import Home from "../components/dashboard/Home";
import FeatureFlag from "../components/dashboard/featureFlag";
import TopEvents from "../components/dashboard/TopEvents";
import TopVenues from "../components/dashboard/TopVenues";

export default function Dashboard() {
  const links = [
    {
      href: "addorganiser",
      displayText: "Add Organiser",
    },
    {
      href: "verifyVenue",
      displayText: "Verify Venue",
    },
    {
      href: "featureFlag/search",
      displayText: "Feature Flag",
    },
    {
      href: "topEvents",
      displayText: "Top Events",
    },
    {
      href: "topVenues",
      displayText: "Top Venues",
    },
  ];
  const location = useLocation();
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);
  return (
    <div className={styles.page}>
      <Sidebar selected={selected} links={links} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addOrganiser" element={<AddUser />} />
        <Route exact path="/verifyVenue" element={<VerifyVenue />} />
        <Route exact path="/featureFlag/*" element={<FeatureFlag />} />
        <Route exact path="/topEvents/" element={<TopEvents />} />
        <Route exact path="/topVenues/" element={<TopVenues />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
