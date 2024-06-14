import { Route, Routes } from "react-router-dom";
import List from "./List";
import Query from "./Query";

export default function Queries() {
    return (
        <Routes>
            <Route exact path="/list" element={<List />} />
            <Route exact path="/run" element={<Query />} />
            <Route path="/*" element={<span> Not found </span>} />
        </Routes>
    )
}