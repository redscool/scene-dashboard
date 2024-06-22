import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AddUser from "../components/dashboard/AddUser";
import Sidebar from "../components/dashboard/Sidebar";
import styles from "./Dashboard.module.css";
import VerifyVenue from "../components/dashboard/VerifyVenue";
import Home from "../components/dashboard/Home";
import FeatureFlag from "../components/dashboard/featureFlag";
import TopEvents from "../components/dashboard/TopEvents";
import TopVenues from "../components/dashboard/TopVenues";
import UpdateEvent from "../components/dashboard/UpdateEvent";
import Queries from "../components/dashboard/queries";
import { ROUTES, SECURE_STORAGE_KEY } from "../utils/constants";
import useAlert from "../hooks/useAlert";

export default function Dashboard() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
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
    {
      href: "updateEvent",
      displayText: "Update Event",
    },
    {
      href: "queries/list",
      displayText: "Queries",
    },
  ];
  const location = useLocation();
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);
  useEffect(() => {
    const accessToken = localStorage.getItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    if (!accessToken) {
      showAlert("Please login...");
      navigate(ROUTES.LOGIN);
    }
  }, []);
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
        <Route exact path="/updateEvent/" element={<UpdateEvent />} />
        <Route exact path="/queries/*" element={<Queries />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
