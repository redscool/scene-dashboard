import React, { useContext, useEffect, useState } from "react";
import styles from "./Query.module.css";
import { ServiceContext } from "../../../utils/ServiceContext";
import { useLocation } from "react-router-dom";
import Switch from "../../form_components/Switch";
import InputTextArea from "../../form_components/InputTextArea";
import SolidButton from "../../auth/SolidButton";
import InputFieldWithoutLabel from "../../form_components/InputFieldWithoutLabel";

const DataTypes = {
    string: "string",
    boolean: "boolean",
    number: "number",
}

export default function Query() {
    const [output, setOutput] = useState("Click Run to execute this query...");
    const [inputParams, setInputParams] = useState({});
    const serviceObject = useContext(ServiceContext);
    const locationState = useLocation();
    const {
        key,
        title,
        params
    } = locationState.state

    const runQuery = async () => {
        const resp = await serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/query",
            {
                key,
                params: inputParams,
            }
        );
        setOutput(JSON.stringify(resp, null, 2))

    };
    useEffect(() => {
        const initParams = {};
        Object.keys(params).map(param => {
            const type = params[param];
            if (type === DataTypes.string) {
                initParams[param] = "";
            }
            if (type === DataTypes.boolean) {
                initParams[param] = false;
            }
            if (type === DataTypes.number) {
                initParams[param] = 0;
            }
            setInputParams(initParams);
        })
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1>Query: {key}</h1>
            </div>
            <div className={styles.horizotalDivider}></div>
            <div className={styles.section}>
                <div className={styles.label}>
                    <p>{title}</p>
                </div>
                {
                    Object.keys(params).map(param => {
                        const type = params[param];
                        if (type === DataTypes.string) {
                            return (
                                <div className={styles.field}>
                                    <div className={styles.fieldLabel}>
                                        <p>{param}</p>
                                    </div>
                                    <InputTextArea
                                        state={inputParams[param]}
                                        setState={(val) => {
                                            setInputParams(pre => {
                                                const res = { ...pre };
                                                res[param] = val;
                                                return res;
                                            })
                                        }}
                                        id={"inputText" + param}
                                    />
                                </div>
                            )
                        }

                        if (type === DataTypes.boolean) {
                            return (
                                <div className={styles.field}>
                                    <div className={styles.fieldLabel}>
                                        <p>{param}</p>
                                    </div>
                                    <Switch
                                        value={inputParams[param]}
                                        setValue={(e) => {
                                            setInputParams(pre => {
                                                const res = { ...pre };
                                                res[param] = e.target.checked;
                                                return res;
                                            })
                                        }}
                                    />
                                </div>
                            )
                        }

                        if (type === DataTypes.number) {
                            return (
                                <div className={styles.field}>
                                    <div className={styles.fieldLabel}>
                                        <p>{param}</p>
                                    </div>
                                    <InputFieldWithoutLabel
                                        state={inputParams[param]}
                                        setState={(val) => {
                                            setInputParams(pre => {
                                                const res = { ...pre };
                                                res[param] = val;
                                                return res;
                                            })
                                        }}
                                        type="number"
                                        id={"inputText" + param}
                                    />
                                </div>
                            )
                        }

                        return <></>
                    })
                }
                <div className={styles.buttonRow}>
                    <SolidButton
                        label={"Run"}
                        onClick={runQuery}
                        style={{
                            margin: "5vh 5vw 5vh 0",
                        }}
                    />
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.label}>
                    <p>Output</p>
                </div>
                <div className={styles.labelOutput}>
                    <p>{output}</p>
                </div>
            </div>
        </div>
    );
}
