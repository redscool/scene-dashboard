import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import Feature from "./Feature";

export default function FeatureFlag() {
    return (
        <Routes>
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/key/:key" element={<Feature />} />
            <Route path="/*" element={<span> Not found </span>} />
        </Routes>
    )

}