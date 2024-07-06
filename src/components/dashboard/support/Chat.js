import React, { useContext, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { ServiceContext } from "../../../utils/ServiceContext";
import { useNavigate, useParams } from "react-router-dom";
import InputTextArea from "../../form_components/InputTextArea";
import SolidButton from "../../auth/SolidButton";
import useAlert from "../../../hooks/useAlert";

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
        <div className={`${styles.messageTile} ${isUser ? styles.messageTileUser : ''}`}>
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
        setMessages(preMessages => {
            const newArr = [...preMessages, {
                _id: Math.random().toString(),
                message: reply,
                isUser: false,
                createdAt: (new Date()).toISOString(),
            }];
            return newArr;
        })
        setReply('');
    };

    const getIssue = async () => {
        serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/support/getMessagesForIssue",
            {
                issueId,
            }
        ).then((data) => {
            setUser(data.user);
            setMessages(data.messages);
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
        getIssue()
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
                            messages.map(message => {
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
