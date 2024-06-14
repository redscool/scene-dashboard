import React, { useContext, useEffect, useState } from "react";
import styles from "./List.module.css";
import { ServiceContext } from "../../../utils/ServiceContext";
import SolidButton from "../../auth/SolidButton";
import { useNavigate } from "react-router-dom";

export default function List() {
    const serviceObject = useContext(ServiceContext);
    const navigate = useNavigate();

    const [list, setList] = useState([])

    const getList = async () => {
        const res = await serviceObject.requestWithAccessToken(
            "get",
            "/api/dashboard/query",
            {}
        );
        setList(res);
    };

    useEffect(() => {
        getList();
    }, [])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1>List Queries</h1>
            </div>
            <div className={styles.horizotalDivider}></div>
            <div className={styles.section}>
                {
                    list.map((query) => {
                        return (
                            <div className={styles.row}>
                                <h3>{query.title}</h3>
                                <SolidButton
                                    label={"Run"}
                                    onClick={() => {
                                        navigate('/dashboard/queries/run', { state: query })
                                    }}
                                    style={{
                                        height: '5vh',
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
