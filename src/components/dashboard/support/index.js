import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import AllIssues from "./AllIssues";

export default function Support() {
    return (
        <Routes>
            <Route exact path="/allIssues" element={<AllIssues />} />
            <Route exact path="/chat/:issueId" element={<Chat />} />
            <Route path="/*" element={<span> Not found </span>} />
        </Routes>
    )
}