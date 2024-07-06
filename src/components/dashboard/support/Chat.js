import React, { useContext, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { ServiceContext } from "../../../utils/ServiceContext";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "../../form_components/Switch";
import InputTextArea from "../../form_components/InputTextArea";
import SolidButton from "../../auth/SolidButton";
import useAlert from "../../../hooks/useAlert";

const slug = {
    "messages": [
        {
            "_id": "66889688cb933087e4ff753b",
            "issueId": "66889561b7662bc20730506b",
            "message": "hey, any update on this?",
            "expireAt": "2024-07-06T00:57:44.909Z",
            "createdAt": "2024-07-06T00:57:44.914Z",
            "updatedAt": "2024-07-06T00:57:44.914Z",
            "isUser": true,
            "__v": 0
        },
        {
            "_id": "6688d93c3b5e4280e9effe43",
            "issueId": "66889561b7662bc20730506b",
            "message": "ho jayega aaj ?",
            "isUser": true,
            "expireAt": "2024-07-06T05:42:20.105Z",
            "createdAt": "2024-07-06T05:42:20.110Z",
            "updatedAt": "2024-07-06T05:42:20.110Z",
            "__v": 0
        },
        {
            "_id": "66889688cb933087e4ff753a",
            "issueId": "66889561b7662bc20730506b",
            "message": "hey, any update on this?",
            "expireAt": "2024-07-06T00:57:44.909Z",
            "createdAt": "2024-07-06T00:57:44.914Z",
            "updatedAt": "2024-07-06T00:57:44.914Z",
            "isUser": true,
            "__v": 0
        },
        {
            "_id": "6688d93c3b5e4280e9effe41",
            "issueId": "66889561b7662bc20730506b",
            "message": "rukja. hora hai...",
            "isUser": false,
            "expireAt": "2024-07-06T05:42:20.105Z",
            "createdAt": "2024-07-06T05:42:20.110Z",
            "updatedAt": "2024-07-06T05:42:20.110Z",
            "__v": 0
        },
        {
            "_id": "6688d93c3b5e4280e9effe41",
            "issueId": "66889561b7662bc20730506b",
            "message": "ho jayega aaj ?",
            "isUser": true,
            "expireAt": "2024-07-06T05:42:20.105Z",
            "createdAt": "2024-07-06T05:42:20.110Z",
            "updatedAt": "2024-07-06T05:42:20.110Z",
            "__v": 0
        }
    ],
    "user": {
        "_id": "663f6eb1163f4ba297cefae3",
        "email": "e@mail.com",
        "profileComplete": false
    }
}

function MessageTile({ messageObj }) {
    const {
        _id,
        issueId,
        message,
        isUser,
        expireAt,
        createdAt,
        updatedAt,
        __v
    } = messageObj;
    return (
        <div className={`${styles.messageTile} ${isUser ? styles.messageTileUser: ''}`}>
            <p className={styles.messageTileDate}>{(new Date(createdAt)).toLocaleString()}</p>
            {isUser && <h4>User</h4>}
            <p>{message}</p>
        </div>
    )
}

export default function Chat() {
    const { issueId } = useParams();
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');
    const serviceObject = useContext(ServiceContext);
    const navigate = useNavigate();
    const { showAlert } = useAlert();


    const sendReply = async () => {
        if (!reply) return showAlert('Empty message')
        await serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/support/replyOnIssue",
            {
                issueId,
                message: reply,
            }
        );
        setReply('');
    };

    const getIssue = async () => {
        serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/support/getMessagesForIssue",
            {
                issueId,
            }
        ).then(() => {

        }).catch(() => {
            showAlert('Something went wrong')
        })

    };
    const resolve = async () => {
        if (window.confirm("Are you sure to resolve the issue !!?")) {
            await serviceObject.requestWithAccessToken(
                "post",
                "/api/dashboard/support/resolveIssue",
                {
                    issueId,
                }
            );
            alert('Resolved ticket');
            return navigate('/dashboard/support/allIssues');
        }
    }
    useEffect(() => {
        // getIssue()
    }, []);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headSection}>
                <h1>Support</h1>
            </div>
            <div className={styles.horizotalDivider}></div>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <SolidButton
                        label={"Resolve"}
                        onClick={() => resolve()}
                        style={{
                            width: "fit-content",
                            backgroundColor: "#dc0000",
                        }}
                        labelStyle={{
                            color: "#fcfcfc",
                        }}
                    />
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.rightContent}>
                    <div className={styles.rightContentMessageBlock}>
                        {
                            slug.messages.map(message => {
                                return <MessageTile messageObj={message} />
                            })
                        }
                    </div>
                    <div className={styles.rightContentMessageBar}>
                        <InputTextArea
                            id={'supportChatInputBox'}
                            placeholder={"Reply"}
                            setState={setReply}
                            state={reply}
                        />
                        <SolidButton
                            label={"Reply"}
                            onClick={() => sendReply()}
                            style={{
                                width: "fit-content",
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
