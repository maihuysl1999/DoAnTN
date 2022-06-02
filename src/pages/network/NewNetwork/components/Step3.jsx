import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORGANIZATIONS } from "src/redux/User/Networks/actionTypes";
import { NODE_PLAN } from "src/redux/User/Networks/actionTypes";
import { NUMBER_NODES } from "src/redux/User/Networks/actionTypes";
import { NUMBER_OF_PEERS } from "src/redux/User/Networks/actionTypes";
import { CLUSTER_NAME } from "src/redux/User/Networks/actionTypes";
import { CONSENSUS } from "src/redux/User/Networks/actionTypes";
import { ENGINE_BLOCKCHAIN } from "src/redux/User/Networks/actionTypes";
import { createNetwork } from "src/services/User/networks";
import { Button, Grid, Typography } from "@mui/material";

export default function Step3(props) {
    const engineBlockchain = useSelector((state) => state.Network.engineBlockchain);
    const consensus = useSelector((state) => state.Network.consensus);
    const clusterName = useSelector((state) => state.Network.clusterName);
    const numberNodes = useSelector((state) => state.Network.numberNodes);
    const numberOfPeers = useSelector((state) => state.Network.numberOfPeers);
    const organizations = useSelector((state) => state.Network.organizations);
    const nodePlan = useSelector((state) => state.Network.nodePlan);
    console.log(nodePlan)
    const dispatch = useDispatch();
    const clear = () => {
        dispatch({ type: ENGINE_BLOCKCHAIN, payload: "" });
        dispatch({ type: CONSENSUS, payload: "" });
        dispatch({ type: NUMBER_NODES, payload: "" });
        dispatch({ type: NUMBER_OF_PEERS, payload: "" });
        dispatch({ type: CLUSTER_NAME, payload: "" });
        dispatch({ type: NODE_PLAN, payload: "" });
        dispatch({ type: UPDATE_ORGANIZATIONS, payload: [{ name: "", number_peer: "" }] });
    };

    const handleSubmit = async () => {
        if (engineBlockchain === "Hyperledger Fabric") {
            const newFabric = {
                name: clusterName,
                blockchain_type: "fabric",
                consensus: consensus.toLowerCase(),
                node_infrastructure: {
                    type: "internal",
                    number_vm_nodes: numberNodes,
                    node_plan: {
                        cpu: nodePlan.cpu,
                        ram: nodePlan.ram,
                        disk: nodePlan.storage,
                    },
                },
                blockchain_peer_config: {
                    organizations: organizations,
                },
            };
            await createNetwork(newFabric);
            window.location.href = "/networks";
            clear();
        } else {
            const newSawtooth = {
                name: clusterName,
                blockchain_type: "sawtooth",
                consensus: consensus.toLowerCase(),
                node_infrastructure: {
                    type: "internal",
                    number_vm_nodes: numberNodes,
                    node_plan: {
                        cpu: nodePlan.cpu,
                        ram: nodePlan.ram,
                        disk: nodePlan.storage,
                    },
                },
                blockchain_peer_config: {
                    number_peer: Number(numberOfPeers),
                },
            };
            await createNetwork(newSawtooth);
            window.location.href = "/dashboard/networks";
            clear();
        }
    };
    return (
        <div className="step_3">
            <div style={{marginBottom: "30px"}} >
            <Grid container spacing={3} style={{textAlign:"center"}}>
                <Grid item xs={4}>
                    <Typography>Name</Typography>
                    <Typography fontWeight="bold">{clusterName}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Type</Typography>
                    <Typography fontWeight="bold">Hyperledger Sawtooth</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Consensus</Typography>
                    <Typography fontWeight="bold">{consensus}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Number Node</Typography>
                    <Typography fontWeight="bold">{numberNodes}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Number of Peer</Typography>
                    <Typography fontWeight="bold">{numberOfPeers}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Node Plan</Typography>
                    <Typography fontWeight="bold">{nodePlan.name}</Typography>
                </Grid>
            </Grid>
            </div>

            <Grid container spacing={2} style={{width:"50%", margin: "auto", justifyContent:"center"}}>
                <Grid item xs={4} style={{ textAlign: "left" }}>
                <Button color="primary" variant="outlined" onClick={() => props.jumpToStep(1)} style={{ width: "109px", height: "36px" }}>
                        {"Back"}
                    </Button>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ width: "109px", height: "36px" }}>
                        {"Submit"}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
