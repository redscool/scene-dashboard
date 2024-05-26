import { useContext, useState } from "react";
import styles from "./Search.module.css";
import InputFieldWithoutLabel from "../../form_components/InputFieldWithoutLabel";
import SolidButton from "../../auth/SolidButton";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../utils/ServiceContext";

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const serviceObject = useContext(ServiceContext);
    const navigate = useNavigate();

    const createFeature = async () => {
        if (searchText === "") return;
        await serviceObject.requestWithAccessToken(
            "post",
            "/api/dashboard/feature",
            { key: searchText }
        );
        return navigate('/dashboard/featureFlag/key/' + searchText)
    };
    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1>Search</h1>
                <div className={styles.searchRow}>
                    <InputFieldWithoutLabel
                        placeholder="feature_key"
                        state={searchText}
                        setState={setSearchText}
                    />
                    <SolidButton
                        label={"Search"}
                        onClick={() => navigate('/dashboard/featureFlag/key/' + searchText)}
                        style={{
                            marginLeft: 'auto'
                        }}
                    />
                    <SolidButton
                        label={"Create"}
                        onClick={createFeature}
                        style={{
                            backgroundColor: '#fda92d',
                            marginLeft: '4vw'
                        }}
                    />
                </div>
            </div>
            <div className={styles.horizotalDivider}></div>
        </div>
    );
}
