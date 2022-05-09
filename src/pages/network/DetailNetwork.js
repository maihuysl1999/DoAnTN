import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";
// redux
import { networkActions } from "src/redux/User/Networks/reducer";
// mui
import { Typography, Button, Grid, Card } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//
import Page from "../../components/Page";
import { imagePath } from "src/constant/imagePath";
// constant
import { statusNetworkClassName } from "src/constant/statusNetworkClassName";
import { networkStatus } from "src/constant/networkStatus";
import { dotColor } from "src/constant/dotColor";
import { BoxInfo } from "../../sections/@dashboard/user";

import Iconify from "../../components/Iconify";

export default function DashboardApp() {
    const { networkId } = useParams();
    const dispatch = useDispatch();
    const currentNetwork = useSelector((state) => state.Network.currentNetwork);
    useEffect(() => {
        dispatch(networkActions.getNetworkById(networkId));
    });
    return (
        <Page title="Dashboard">
            {currentNetwork ? (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={7} md={7} lg={7}>
                            <Grid container spacing={3}>
                                <Grid item xs={2} md={2} lg={2}>
                                    <img src={imagePath.sawtooth} style={{ height: "90%", width: "90%" }} />
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Typography variant="h3" style={{ textTransform: "capitalize" }}>
                                        {currentNetwork[0].name}
                                    </Typography>
                                    <Typography
                                        variant="button"
                                        fontSize="small"
                                        fontWeight="light"
                                        color={statusNetworkClassName[currentNetwork[0].status]}
                                    >
                                        <FiberManualRecordIcon
                                            color={dotColor[currentNetwork[0].status]}
                                            sx={{ fontSize: "small" }}
                                        ></FiberManualRecordIcon>
                                        {networkStatus[currentNetwork[0].status]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                        <Grid item xs={3} md={3} lg={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6}></Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Button
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        startIcon={<Iconify icon="fluent:delete-48-regular" />}
                                    >
                                        <Typography component="p" variant="h6" color="info" display="flex">
                                            Delete
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Card>
                        <BoxInfo network_info={currentNetwork[0]} />
                    </Card>
                </div>
            ) : (
                <div></div>
            )}
        </Page>
    );
}
