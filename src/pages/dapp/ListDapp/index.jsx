import React, { useEffect } from "react";
// @mui
import { Grid, Container, Typography, Stack, Button } from "@mui/material";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import CardDapp from "./components/CardDapp";
// redux
import { useDispatch, useSelector } from "react-redux";
import { dappActions } from "src/redux/User/Dapps/reducer";
import { useNavigate } from "react-router";
// image
import { dotColor } from "src/constant/dotColor";
// ----------------------------------------------------------------------

export default function DashboardApp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list_dapps = useSelector((state) => state.Dapp.list_dapps);

    useEffect(() => {
        dispatch(dappActions.getDApps({}));
        const interval = setInterval(() => {
            dispatch(dappActions.getDApps({}));
        }, 5000);
        // dispatch({ type: LAYOUT, payload: localStorage.getItem("layout_version") });
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Dapp
                    </Typography>
                    <Button
                        variant="contained"
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => {
                            navigate("new");
                        }}
                    >
                        Create Dapp
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {list_dapps &&
                        list_dapps.map((value, key) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <CardDapp
                                        key={key}
                                        dapp={value}
                                        image={value.dapp_logo}
                                        color={dotColor[value.status]}
                                    />
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
        </Page>
    );
}
