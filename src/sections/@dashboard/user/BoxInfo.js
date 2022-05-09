import { useSelector } from "react-redux";
// material
import { styled } from "@mui/material/styles";
import { Grid, Toolbar, Typography } from "@mui/material";

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 400,
    display: "flex",
    // justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 3),
}));

export default function BoxInfo({ network_info }) {
    const user = useSelector((stores) => stores.User.user);
    return (
        <RootStyle>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Typography fontSize="small" fontWeight="light" color="primary">
                        BASIC INFORMATION
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Name</Typography>
                    <Typography fontWeight="bold">{network_info.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Type</Typography>
                    <Typography fontWeight="bold">Sawtooth</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Consensus</Typography>
                    <Typography fontWeight="bold">{network_info.consensus}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography fontSize="small" fontWeight="light" color="primary">
                        MANAGEMENT INFORMATION
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Owner</Typography>
                    <Typography fontWeight="bold">{user.full_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Network ID</Typography>
                    <Typography fontWeight="bold">{network_info.network_id}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography></Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography fontSize="small" fontWeight="light" color="primary">
                        TOTAL CLUSTER CAPACITY
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>CPU</Typography>
                    <Typography fontWeight="bold">{network_info.node_infrastructure.node_plan.cpu}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Memory</Typography>
                    <Typography fontWeight="bold">{network_info.node_infrastructure.node_plan.ram}GB</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography></Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography fontSize="small" fontWeight="light" color="primary">
                        BLOCKCHAIN PEER CONFIG
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Number Of Peers</Typography>
                    <Typography fontWeight="bold">{network_info.blockchain_peer_config.number_peer}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography></Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography></Typography>
                </Grid>
            </Grid>
        </RootStyle>
    );
}
