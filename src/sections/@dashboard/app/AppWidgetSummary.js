import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Grid, Divider, Button, ButtonGroup } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
// import Iconify from "../../../components/Iconify";

//constant
import { networkStatus } from "../../../constant/networkStatus";
import { dotColor } from "../../../constant/dotColor";
// redux
import { VIEW_MORE } from "src/redux/User/Networks/actionTypes";
// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    sx: PropTypes.object,
};

export default function AppWidgetSummary({ network, image, color = "primary", sx, ...other }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleExplorer = () => {
        window.open("https://" + network.explorer_url, "_blank");
    };

    return (
        <Card
            sx={{
                padding: "10px",
                py: 4,
                boxShadow: 0,
                textAlign: "center",
                color: (theme) => theme.palette[color].darker,
                // bgcolor: (theme) => theme.palette[color].lighter,
                outlineStyle: "solid",
                outlineColor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            {/* logo name */}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <IconWrapperStyle
                        sx={{
                            color: (theme) => theme.palette[color].dark,
                            backgroundImage: (theme) =>
                                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                                    theme.palette[color].dark,
                                    0.24
                                )} 100%)`,
                        }}
                    >
                        <img src={image}></img>
                        {/* <Iconify icon={icon} width={24} height={24} /> */}
                    </IconWrapperStyle>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        <Typography variant="h5">{network.name}</Typography>
                        <Typography variant="button">
                            <FiberManualRecordIcon
                                color={dotColor[network.status]}
                                sx={{ fontSize: "small" }}
                            ></FiberManualRecordIcon>
                            {networkStatus[network.status]}
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            {/* peer node */}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography style={{ fontSize: 20 }}>NODE</Typography>
                    <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                        {padLeadingZeros(network.node_infrastructure.number_vm_nodes, 2)}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ fontSize: 20 }}>PEER</Typography>
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
                            <Button variant="contained" style={{ width: "100%" }}>
                                Recreate
                            </Button>
                        ) : network.status === "UPDATE_FAIL" ? (
                            <ButtonGroup
                                variant="contained"
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
                            variant="contained"
                            style={{ width: "100%" }}
                            disabled={network.status.includes("PENDING")}
                            onClick={() => {
                                dispatch({ type: VIEW_MORE, payload: network });
                                navigate(`${network.network_id}`);
                            }}
                        >
                            Detail
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            style={{ width: "100%" }}
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
