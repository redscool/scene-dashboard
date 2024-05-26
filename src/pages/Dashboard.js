import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AddUser from "../components/dashboard/AddUser";
import Sidebar from "../components/dashboard/Sidebar";
import styles from "./Dashboard.module.css";
import VerifyVenue from "../components/dashboard/VerifyVenue";
import Home from "../components/dashboard/Home";

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
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/addOrganiser" element={<AddUser />} />
        <Route exact path="/verifyVenue" element={<VerifyVenue />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
