import React, { Fragment } from "react";
import { useSelector } from "react-redux";
//
import { Card } from "@mui/material";
import { Container } from "reactstrap";
//components
import HeaderSetting from "./components/Header";
import Account from "./components/Account";
import Password from "./components/Password";
import Email from "./components/Email";
import Plan from "./components/Plan";

const Settings = () => {
    const category = useSelector((state) => state.Setting.category);

    return (
        <Fragment>
            <Container>
                <Card>
                    <HeaderSetting />
                    <hr />
                    {category === "account" ? <Account /> : category === "password" ? <Password /> : ""}
                </Card>
            </Container>
        </Fragment>
    );
};

export default Settings;
