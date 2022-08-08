import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NAVIGATE } from "src/redux/User/Networks/actionTypes";
import { imagePath } from "../../../../constant/imagePath";

import { Card, CardActionArea } from "@mui/material";

export default function CardDAppNetwork(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigate_network = useSelector((state) => state.Network.navigate);

    // let status = "";
    // if (props.data.status === "CREATED") {
    //     status = "green";
    // } else if (props.data.status === "CREATE_PENDING" || props.data.status === "DELETE_PENDING") {
    //     status = "yellow";
    // } else {
    //     status = "red";
    // }

    function getStatusColor() {
        if (props.data.status === "CREATED") {
            return "#54D62C";
        } else if (props.data.status === "CREATE_PENDING" || props.data.status === "DELETE_PENDING") {
            return "#FFC107";
        } else {
            return "#f50057";
        }
    }

    const handleClick = () => {
        navigate(`/dapps/${props.data.dapp_id}`);
        dispatch({ type: NAVIGATE, payload: !navigate_network });
    };

    return (
        <Card
            style={{
                height: "110px",
                borderBottom: `2px solid ${getStatusColor()}`,
            }}
            onClick={() => handleClick()}
        >
            <CardActionArea style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        margin: "auto",
                        textAlign: "center",
                        marginBottom: 3,
                    }}
                >
                    <img
                        src={props.data.dapp_logo || imagePath.sawtooth}
                        style={{ width: "50%", margin: "auto", marginBottom: 8 }}
                        alt=""
                    ></img>
                </div>
                <div style={{ textAlign: "center", paddingBottom: 10 }}>{props.data.dapp_name}</div>
            </CardActionArea>
        </Card>
    );
}
