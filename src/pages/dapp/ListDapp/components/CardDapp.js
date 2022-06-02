import { useNavigate } from "react-router";
// @mui
import { Card, Typography, Grid, Button, ButtonGroup } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../../components/Iconify";

//constant
import { dappStatus } from "src/constant/dappStatus";
import { dotColor } from "src/constant/dotColor";
import { DOCS_DAPP_URL } from "src/constant/config";
// ----------------------------------------------------------------------

export default function CardDapp({ dapp, image, color = "primary", sx, ...other }) {
    const navigate = useNavigate();

    return (
        <Card style={{ padding: "16px", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            {/* logo name */}
            <Grid container>
                <Grid item sm={5} md={5} textAlign={"left"}>
                    <div style={{ marginBottom: "8px" }}>
                        <img style={{ width: "60%" }} src={image}></img>
                    </div>
                </Grid>
                <Grid item sm={6} md={7} textAlign={"right"}>
                    <Typography variant="h4" style={{ textOverflow: "ellipsis" }}>
                        {dapp.dapp_name}
                    </Typography>
                    <Typography variant="button">
                        <FiberManualRecordIcon
                            color={dotColor[dapp.status]}
                            sx={{ fontSize: "small" }}
                        ></FiberManualRecordIcon>
                        {dappStatus[dapp.status]}
                    </Typography>
                </Grid>
            </Grid>
            {/* peer node */}
            <Grid container spacing={2} style={{ padding: "8px", height: "80px" }}>
                <Grid item xs={12}>
                    <Typography style={{ fontSize: 12, opacity: "0.5" }}>{dapp.dapp_description}</Typography>
                </Grid>
            </Grid>
            {/* button detail, explorer */}
            {dapp.status.includes("FAIL") ? (
                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={4}>
                        {dapp.status.includes("FAIL") ? (
                            <Button
                                to="#"
                                startIcon={<Iconify icon="carbon:retry-failed" />}
                                onClick={() => {
                                    navigate("new");
                                }}
                                color="error"
                            >
                                RETRY
                            </Button>
                        ) : (
                            <Button
                                to="#"
                                startIcon={<Iconify icon="eva:download-outline" />}
                                onClick={() => {
                                    navigate("new");
                                }}
                            >
                                SDK
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        {dapp.status === "CREATE_FAIL" ? (
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "100%" }}
                                disabled={dapp.status.includes("PENDING")}
                                onClick={() => {
                                    navigate(`${dapp.dapp_id}`);
                                }}
                            >
                                Detail
                            </Button>
                        ) : dapp.status === "UPDATE_FAIL" ? (
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "100%" }}
                                disabled={dapp.status.includes("PENDING")}
                                onClick={() => {
                                    navigate(`${dapp.dapp_id}`);
                                }}
                            >
                                Detail
                            </Button>
                        ) : (
                            <Button variant="outlined" color={color} style={{ width: "100%" }}>
                                ReDelete
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color={color} style={{ width: "100%" }}>
                            DELETE
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={4}>
                        <Button
                            to="#"
                            startIcon={<Iconify icon="eva:download-outline" />}
                            onClick={() => {
                                navigate("new");
                            }}
                        >
                            SDK
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="outlined"
                            style={{ width: "100%", color: "#4498ed" }}
                            disabled={dapp.status.includes("PENDING")}
                            onClick={() => {
                                navigate(`${dapp.dapp_id}`);
                            }}
                        >
                            Detail
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            style={{ width: "100%", backgroundColor: "#4498ed" }}
                            disabled={dapp.status.includes("PENDING")}
                            onClick={() => window.open(`${DOCS_DAPP_URL}/${dapp.dapp_id}/index.html`, "_blank")}
                        >
                            Docs
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Card>
    );
}
