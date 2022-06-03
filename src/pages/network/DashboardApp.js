import React, { useEffect } from "react";
// @mui
import { Grid, Container, Typography, Stack, Button } from "@mui/material";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
// sections
import { AppWidgetSummary } from "../../sections/@dashboard/app";
// redux
import { useDispatch, useSelector } from "react-redux";
import { networkActions } from "src/redux/User/Networks/reducer";
import { useNavigate } from "react-router";
// image
import { imagePath } from "../../constant/imagePath";
import { dotColor } from "src/constant/dotColor";
// ----------------------------------------------------------------------

export default function DashboardApp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list_network = useSelector((state) => state.Network.list_network);

    useEffect(() => {
        dispatch(networkActions.getNetwork({}));
        const interval = setInterval(() => dispatch(networkActions.getNetwork({})), 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Network
                    </Typography>
                    <Button
                        variant="contained"
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => {
                            navigate("new");
                        }}
                    >
                        Create Network
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {list_network &&
                        list_network.map((value, key) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <AppWidgetSummary
                                        network={value}
                                        image={imagePath.sawtooth}
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
