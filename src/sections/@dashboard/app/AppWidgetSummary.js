import { useNavigate } from "react-router";
// @mui
import { Card, Typography, Grid, Divider, Button, ButtonGroup, Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
// import Iconify from "../../../components/Iconify";

//constant
import { networkStatus } from "../../../constant/networkStatus";
import { dotColor } from "../../../constant/dotColor";
// ----------------------------------------------------------------------

// const IconWrapperStyle = styled("div")(({ theme }) => ({
//     margin: "auto",
//     display: "flex",
//     borderRadius: "50%",
//     alignItems: "center",
//     width: theme.spacing(8),
//     height: theme.spacing(8),
//     justifyContent: "center",
//     marginBottom: theme.spacing(3),
// }));

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ network, image, color = "primary", sx, ...other }) {
    const navigate = useNavigate();

    const handleExplorer = () => {
        window.open("https://" + network.explorer_url, "_blank");
    };

    return (
        <Card style={{ padding: "16px" }}>
            {/* logo name */}
            <Grid container>
                <Grid item sm={5} md={5} textAlign={"left"}>
                    <div style={{ marginBottom: "8px" }}>
                        <img style={{ width: "40%" }} src={image}></img>
                    </div>
                    {/* <Iconify icon={icon} width={24} height={24} /> */}
                    <div style={{ width: "100%", marginBottom: "8px" }}>
                        <Chip
                            label={network.consensus}
                            style={{ width: "80%", background: "#e2f3ff", color: "#87CEFA" }}
                        />
                    </div>
                </Grid>
                <Grid item sm={6} md={7} textAlign={"right"}>
                    <Typography variant="h4" style={{ textOverflow: "ellipsis" }}>
                        {network.name}
                    </Typography>
                    <Typography variant="button">
                        <FiberManualRecordIcon
                            color={dotColor[network.status]}
                            sx={{ fontSize: "small" }}
                        ></FiberManualRecordIcon>
                        {networkStatus[network.status]}
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            {/* peer node */}
            <Grid container spacing={2} justifyContent={"center"} style={{ padding: "8px" }}>
                <Grid item xs={6}>
                    <Typography style={{ fontSize: 16, opacity: "0.5" }}>NODE</Typography>
                    <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                        {padLeadingZeros(network.node_infrastructure.number_vm_nodes, 2)}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ fontSize: 16, opacity: "0.5" }}>PEER</Typography>
                    <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                        {padLeadingZeros(network.blockchain_peer_config.number_peer, 2)}
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            {/* button detail, explorer */}
            {network.status.includes("FAIL") ? (
                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={6}>
                        {network.status === "CREATE_FAIL" ? (
                            <Button variant="outlined" style={{ width: "100%" }}>
                                Recreate
                            </Button>
                        ) : network.status === "UPDATE_FAIL" ? (
                            <ButtonGroup
                                variant="outlined"
                                color="secondary"
                                style={{ width: "100%", whiteSpace: "nowrap" }}
                            >
                                <Button>Re-Update</Button>
                                <Button>Rollback</Button>
                            </ButtonGroup>
                        ) : (
                            <Button variant="outlined" color={color} style={{ width: "100%" }}>
                                Re-Delete
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color={color} style={{ width: "100%" }}>
                            Terminate
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            style={{ width: "100%", color: "#87CEFA" }}
                            disabled={network.status.includes("PENDING")}
                            onClick={() => {
                                navigate(`${network.network_id}`);
                            }}
                        >
                            Detail
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            style={{ width: "100%", backgroundColor: "#87CEFA" }}
                            disabled={network.status.includes("PENDING")}
                            onClick={() => handleExplorer()}
                        >
                            Explorer
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Card>
    );
}

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
