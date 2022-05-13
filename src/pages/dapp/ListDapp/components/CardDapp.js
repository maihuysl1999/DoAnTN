import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Typography, Grid, Divider, Button, ButtonGroup, Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
// import Iconify from "../../../components/Iconify";

//constant
import { dappStatus } from "src/constant/dappStatus";
import { dotColor } from "src/constant/dotColor";
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

// AppWidgetSummary.propTypes = {
//     color: PropTypes.string,
//     icon: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     total: PropTypes.number.isRequired,
//     sx: PropTypes.object,
// };

export default function CardDapp({ dapp, image, color = "primary", sx, ...other }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Card style={{ padding: "16px" }}>
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
            <Grid container spacing={2} style={{ padding: "8px" }}>
                <Grid item xs={12}>
                    <Typography style={{ fontSize: 12, opacity: "0.5" }}>{dapp.dapp_description}</Typography>
                </Grid>
            </Grid>
            {/* button detail, explorer */}
            {dapp.status.includes("FAIL") ? (
                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={6}>
                        {dapp.status === "CREATE_FAIL" ? (
                            <Button variant="outlined" style={{ width: "100%" }}>
                                Recreate
                            </Button>
                        ) : dapp.status === "UPDATE_FAIL" ? (
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
                            style={{ width: "100%", color: "#4498ed" }}
                            disabled={dapp.status.includes("PENDING")}
                            onClick={() => {
                                navigate(`${dapp.dapp_id}`);
                            }}
                        >
                            Detail
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            style={{ width: "100%", backgroundColor: "#4498ed" }}
                            disabled={dapp.status.includes("PENDING")}
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
