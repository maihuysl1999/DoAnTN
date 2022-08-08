import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CATEGORY } from "src/redux/User/Settings/actionTypes";

import { Button, Typography } from "@mui/material";

export default function HeaderSetting() {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.Setting.category);
    const handleCategory = (value) => {
        dispatch({ type: CATEGORY, payload: value });
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginBottom: "16px" }}>
            <div style={{ width: "10%" }}>
                <Button
                    variant="text"
                    style={category === "account" ? { backgroundColor: "#ebf6ff" } : {}}
                    fullWidth
                    onClick={() => handleCategory("account")}
                >
                    <Typography fontSize="16px" fontWeight="bold">
                        Account
                    </Typography>
                </Button>
            </div>
            <div style={{ width: "10%" }}>
                <Button
                    variant="text"
                    style={category === "password" ? { backgroundColor: "#ebf6ff" } : {}}
                    onClick={() => handleCategory("password")}
                    fullWidth
                >
                    <Typography fontSize="16px" fontWeight="bold">
                        Password
                    </Typography>
                </Button>
            </div>
        </div>
    );
}
