import { useContext, useEffect, useState } from "react";
import styles from "./AllIssues.module.css";
import SolidButton from "../../auth/SolidButton";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../utils/ServiceContext";
import { chunk } from "lodash";
import useAlert from "../../../hooks/useAlert";

function IssuesBlock({ issue }) {
    const {
        _id,
        userId,
        summary,
        resolved,
        createdAt,
        updatedAt,
        __v,
        assignedTo
    } = issue;
    const { showAlert } = useAlert();
    const serviceObject = useContext(ServiceContext);
    const assign = async () => {
        serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/support/assignIssue",
            { issueId: _id, }
        ).then(() => {
            showAlert('Assigned');
        }).catch(() => {
            showAlert('Something went wrong');

        });
    };
    const navigate = useNavigate();
    return (
        <div className={styles.issueBlockContainer}>
            <p>{(new Date(createdAt)).toLocaleString()}</p>
            <h3>{summary}</h3>
            <div className={styles.issueBlockContainerRow}>
                <SolidButton
                    label={"View"}
                    onClick={() => navigate('/dashboard/support/chat/' + _id)}
                    style={{
                        marginLeft: 'auto',
                        height: '5vh',
                        backgroundColor: '#d0d0d0',
                    }}
                />
                <SolidButton
                    label={"Assign to Me"}
                    onClick={() => assign()}
                    style={{
                        height: '5vh',
                        marginLeft: '4vw',
                        backgroundColor: '#fda92d',
                    }}
                />
            </div>
        </div>
    )
}

function MyIssues() {
    const [issues, setIssues] = useState([]);
    const serviceObject = useContext(ServiceContext);
    const viewAll = async () => {
        const data = await serviceObject.requestWithAccessToken(
            "get",
            "/api/dashboard/support/allIssues",
        );
        setIssues(data);
    };

    useEffect(() => {
        // viewAll();
    }, [])
    return (
        <div className={styles.issuesContainer}>
            <h3 className={styles.issuesContainerHeading}>My Issues</h3>
            {
                chunk(issues, 2).map(row => {
                    return (
                        <div className={styles.issuesRow}>
                            {
                                row.map(issue => {
                                    return <IssuesBlock issue={issue} />
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

function AllOpenIssues() {
    const [issues, setIssues] = useState([]);
    const serviceObject = useContext(ServiceContext);
    const viewAll = async () => {
        const data = await serviceObject.requestWithAccessToken(
            "get",
            "/api/dashboard/support/openIssues",
            { key: "" }
        );
        setIssues(data);
    };

    useEffect(() => {
        // viewAll();
    }, [])
    return (
        <div className={styles.issuesContainer}>
            <h3 className={styles.issuesContainerHeading}>All Open Issues</h3>
            {
                chunk(issues, 2).map(row => {
                    return (
                        <div className={styles.issuesRow}>
                            {
                                row.map(issue => {
                                    return <IssuesBlock issue={issue} />
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function AllIssues() {
    const [tab, setTab] = useState('');

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1>All Issues</h1>
                <div className={styles.searchRow}>
                    <SolidButton
                        label={"Show Open Issues"}
                        onClick={() => setTab('openIssues')}
                        style={{
                            marginLeft: 'auto',
                            height: '5vh',
                        }}
                    />
                    <SolidButton
                        label={"Show My Issues"}
                        onClick={() => setTab('myIssues')}
                        style={{
                            height: '5vh',
                            marginLeft: '4vw',
                        }}
                    />
                </div>
            </div>
            <div className={styles.horizotalDivider}></div>
            {
                (tab === 'openIssues' && <AllOpenIssues />)
            }
            {
                (tab === 'myIssues' && <MyIssues />)
            }
        </div>
    );
}

