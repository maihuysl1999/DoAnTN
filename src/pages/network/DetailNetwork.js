import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// redux
import { networkActions } from "src/redux/User/Networks/reducer";
// mui
import { Typography, Button, Grid, Card, CardActions } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//
import Page from "../../components/Page";
import { imagePath } from "src/constant/imagePath";
import errorImg from "src/asset/images/search-not-found.png";
// constant
import { statusNetworkClassName } from "src/constant/statusNetworkClassName";
import { networkStatus } from "src/constant/networkStatus";
import { dotColor } from "src/constant/dotColor";
import { BoxInfo } from "../../sections/@dashboard/user";

import Iconify from "../../components/Iconify";

import CardDAppNetwork from "./DetailNetwork/components/CardDAppNetwork";
import ManageResource from "./DetailNetwork/ManageResource/ManageResource";

export default function DashboardApp() {
    const { networkId } = useParams();
    const dispatch = useDispatch();
    const currentNetwork = useSelector((state) => state.Network.currentNetwork);
    useEffect(() => {
        dispatch(networkActions.getNetworkById(networkId));
    }, []);
    return (
        <Page title="Dashboard">
            {currentNetwork ? (
                <div>
                    <Grid container>
                        <Grid item xs={8} md={8} lg={8}>
                            <Grid style={{ display: "flex", alignItems: "center" }}>
                                <Grid item xs={1} md={1}>
                                    <img src={imagePath.sawtooth} alt="" style={{ height: "92%", width: "80%" }} />
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Typography variant="h4" style={{ textTransform: "capitalize" }}>
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
                        <Grid item xs={4} md={4} lg={4} style={{ display: "flex", alignItems: "center" }}>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "right" }}>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    style={{ width: "40%" }}
                                    startIcon={<Iconify icon="fluent:delete-48-regular" />}
                                >
                                    <Typography color="error" display="flex" fontSize="14px" fontWeight="bold">
                                        Delete
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Card style={{ marginTop: "8px" }}>
                        <BoxInfo network_info={currentNetwork[0]} />
                    </Card>
                    <Card style={{ marginTop: "8px" }}>
                        <CardActions>
                            <Grid container style={{ marginTop: "8px" }}>
                                <Grid item xs={8} md={8} lg={8} style={{ paddingLeft: "16px" }}>
                                    <Typography fontSize="medium" fontWeight="light" color="primary">
                                        DAPP IN NETWORK
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4} style={{ display: "flex", alignItems: "right" }}>
                                    <Grid style={{ width: "30%" }}></Grid>
                                    <Grid style={{ margin: "auto", opacity: "0.5" }}>
                                        <FiberManualRecordIcon
                                            color="success"
                                            sx={{ fontSize: "small" }}
                                        ></FiberManualRecordIcon>
                                        Running
                                    </Grid>
                                    <Grid style={{ margin: "auto", opacity: "0.5" }}>
                                        <FiberManualRecordIcon
                                            color="warning"
                                            sx={{ fontSize: "small" }}
                                        ></FiberManualRecordIcon>
                                        Pending
                                    </Grid>
                                    <Grid style={{ margin: "auto", opacity: "0.5" }}>
                                        <FiberManualRecordIcon
                                            color="error"
                                            sx={{ fontSize: "small" }}
                                        ></FiberManualRecordIcon>
                                        Error
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActions>
                        {currentNetwork[0] && currentNetwork[0].dapps.length === 0 ? (
                            <Grid xs={12} className="text-center">
                                <img className="img-fluid m-auto" src={errorImg} alt="" />
                                <h5 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    This network has no DApp to display !!!
                                </h5>
                            </Grid>
                        ) : (
                            <CardActions style={{ padding: "24px" }}>
                                <Grid container spacing={3}>
                                    {currentNetwork[0].dapps.map((value, key) => {
                                        return (
                                            <Grid item xs={2} md={2} lg={2}>
                                                <CardDAppNetwork
                                                    data={value}
                                                    key={"carddappnetwprk" + key}
                                                    end={false}
                                                    order={key}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </CardActions>
                        )}
                    </Card>
                    <Card style={{ marginTop: "8px" }}>
                        <ManageResource idNetwork={currentNetwork[0].network_id} />
                    </Card>
                </div>
            ) : (
                <div></div>
            )}
        </Page>
    );
}
