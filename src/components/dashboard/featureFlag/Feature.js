import React, { useContext, useEffect, useState } from "react";
import styles from "./Feature.module.css";
import { ServiceContext } from "../../../utils/ServiceContext";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "../../form_components/Switch";
import InputTextArea from "../../form_components/InputTextArea";

export default function Feature() {
    const { key } = useParams();
    const [value, setValue] = useState(false);
    const [userIds, setUserIds] = useState('');
    const [featureId, setFeatureId] = useState();
    const serviceObject = useContext(ServiceContext);
    const navigate = useNavigate();

    const isValidObjectId = (id) => !!id.match(/^[0-9a-fA-F]{24}$/);

    const getFeature = async () => {
        const res = await serviceObject.requestWithAccessToken(
            "get",
            "/api/dashboard/feature",
            { key }
        );
        if (!res) {
            alert('Invalid Feature Key !!!');
            return navigate('/dashboard/featureFlag/search');
        }
        setFeatureId(res._id);
        setValue(res.value);
        setUserIds(res.userIds.join('\n'));
    };
    const updateFeature = async () => {
        const formattedIds = userIds.split('\n').filter(id => id !== '');
        const valid = formattedIds.reduce((prev, id) => isValidObjectId(id) && prev, true);
        if (!valid) return alert("Invalid User Ids !!!");
        await serviceObject.requestWithAccessToken(
            "patch",
            "/api/dashboard/feature",
            {
                id: featureId,
                value,
                userIds: formattedIds,
            }
        );
    };
    const deleteFeature = async () => {
        await serviceObject.requestWithAccessToken(
            "delete",
            "/api/dashboard/feature",
            {
                id: featureId,
            }
        );
    };
    useEffect(() => {
        getFeature();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1>Feature</h1>
            </div>
            <div className={styles.horizotalDivider}></div>
            <div className={styles.section}>
                <div className={styles.label}>
                    <p>{key}</p>
                </div>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>
                        <p>Value</p>
                    </div>
                    <Switch value={value} setValue={() => setValue(v => !v)} />
                </div>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>
                        <p>Users</p>
                    </div>
                    <InputTextArea
                        state={userIds}
                        setState={setUserIds}
                        placeholder={"userIds"}
                        id={"featureUserIds"}
                    />
                </div>
                <div className={styles.buttonRow}>
                    <div className={styles.button} onClick={updateFeature}>
                        <p>Save</p>
                    </div>
                    <div className={styles.button + " " + styles.delete} onClick={() => {
                        if (window.confirm("Confirm DELETE !!!??")) {
                            deleteFeature();
                            return navigate('/dashboard/featureFlag/search');
                        }
                    }}>
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
