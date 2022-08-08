import React from "react";
import { CONSENSUS, ENGINE_BLOCKCHAIN, CLUSTER_NAME } from "../../../../redux/User/Networks/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const Step1 = (props) => {
    const dispatch = useDispatch();
    const engineBlockchain = useSelector((state) => state.Network.engineBlockchain);
    const consensus = useSelector((state) => state.Network.consensus);
    const clusterName = useSelector((state) => state.Network.clusterName);

    const handleChangeEngine = (event) => {
        dispatch({ type: ENGINE_BLOCKCHAIN, payload: event.target.value });
    };
    const handleChangeConsensus = (event) => {
        dispatch({ type: CONSENSUS, payload: event.target.value });
    };
    const handleChangeClusterName = (event) => {
        dispatch({ type: CLUSTER_NAME, payload: event.target.value });
    };
    function checkNetworkName() {
        if (!/[^a-z0-9-]+/g.test(clusterName)) {
            if (isNaN(clusterName[0])) {
                return true;
            }
        }
        return false;
    }
    return (
    <div>
            <div style={{width: "60%", margin: "auto"}}>
                <TextField
                    error={!checkNetworkName()}
                    inputMode="text"
                    name="clusterName"
                    label="Network Name"
                    variant="filled"
                    fullWidth
                    onChange={handleChangeClusterName}
                    value={clusterName}
                    required
                    size="small"
                    style={{ marginBottom: "31px" }}
                    helperText={!checkNetworkName() ? "Only lower letter, symbol - and number. Letter beginning!" : ""}
                />

                <FormControl variant="filled" fullWidth style={{ marginBottom: "31px" }} required size="small">
                    <InputLabel id="block_engine">{"Blockchain Engine"}</InputLabel>
                    <Select labelId="block_engine" onChange={handleChangeEngine} value={engineBlockchain}>
                        <MenuItem value={"Hyperledger Sawtooth"}>{"Hyperledger Sawtooth"}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth disabled={engineBlockchain === ""} style={{ marginBottom: "31px" }} required size="small">
                    <InputLabel id="consensus">{"Consensus"}</InputLabel>
                    {engineBlockchain === "Hyperledger Sawtooth" ? (
                        <>
                            <Select labelId="consensus" onChange={handleChangeConsensus} value={consensus}>
                                <MenuItem value={"PoET"}>{"PoET"}</MenuItem>
                                <MenuItem value={"PBFT"}>{"PBFT"}</MenuItem>
                            </Select>
                        </>
                    ) : (
                        <>
                            <Select labelId="consensus" onChange={handleChangeConsensus}>
                                {/* <MenuItem value={"PBFT"}>{"PBFT"}</MenuItem> */}
                                <MenuItem value={"RAFT"}>{"RAFT"}</MenuItem>
                            </Select>
                        </>
                    )}
                </FormControl>
            </div>
            <Button
                color="primary"
                variant="contained"
                onClick={() => props.jumpToStep(1)}
                disabled={!(clusterName !== "" && engineBlockchain !== "" && consensus !== "" && checkNetworkName())}
                style={{ margin: "0 auto", display: "block", width: "109px", height: "36px" }}
            >
                {"Next"}
            </Button>
        </div>
)}

export default Step1;