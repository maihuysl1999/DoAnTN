import NodePlan from "./NodePlan";
import React from "react";
import { Row, Col } from "reactstrap";
import { NODE_PLAN, NUMBER_NODES, NUMBER_OF_PEERS } from "../../../../redux/User/Networks/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import InputNumber from "./InputNumber";
import { isPositiveNumber } from "src/utils/stringhandle";

const Step2 = (props) => {
    const dispatch = useDispatch();
    const numberNodes = useSelector((state) => state.Network.numberNodes);
    const numberOfPeers = useSelector((state) => state.Network.numberOfPeers);
    const nodePlan = useSelector((state) => state.Network.nodePlan);
    const [value, setValue] = React.useState(nodePlan?.id ?nodePlan.id : -1);

    const handleChangeNumberNodes = (event) => {
        dispatch({ type: NUMBER_NODES, payload: event.target.value });
    };
    const handleChangeNumberOfPeers = (event) => {
        dispatch({ type: NUMBER_OF_PEERS, payload: event.target.value });
    };

    const handleChangeNodePlan = (event) => {
        // setValue(newValue);
        console.log(event.target.value)
        dispatch({ type: NODE_PLAN, payload: NodePlan[event.target.value]});
    };

    return (
        <div>
            <div style={{width: "60%", margin: "auto"}}>
                <Row className="form-row">
                    <Col md="12 mb-3">
                        <InputNumber
                            label="Number Nodes"
                            variant="filled"
                            OnChange={handleChangeNumberNodes}
                            value={numberNodes}
                            onlyPositive={true}
                            required={true}
                            style={{ marginBottom: "31px" }}
                        />
                    </Col>
                    <Col md="12 mb-3">
                        <InputNumber
                            label="Number Peers"
                            variant="filled"
                            OnChange={handleChangeNumberOfPeers}
                            value={numberOfPeers}
                            onlyPositive={true}
                            required={true}
                        />
                    </Col>
                </Row>
            </div>

            <br />
            <div style={{width: "60%", margin: "auto"}}>
                <FormControl variant="filled" fullWidth style={{ marginBottom: "31px" }} required size="small">
                    <InputLabel>{"NodePlan"}</InputLabel>
                    <Select labelId="consensus" onChange={handleChangeNodePlan} value={nodePlan?.id ?nodePlan.id : ""}>
                        {NodePlan.map((value, key) => (
                            <MenuItem value={key} key={key}>{value.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <h5 className="mb-3" style={{ color: "#8CB8D8" }}>
                    Node Plan
                </h5>
                <Box sx={{ width: "100%", marginBottom: "30px", textAlign:"center" }}>
                    <Tabs value={value} onChange={handleChangeNodePlan} aria-label="wrapped label tabs example">
                        {NodePlan.map((value, key) => (
                            <Tab value={key} label={value.name}/>
                        ))}
                    </Tabs>
                </Box> */}
            </div>

            <Grid container spacing={2} style={{width:"70%", margin: "auto", justifyContent:"center"}}>
                <Grid item xs={6} style={{textAlign: "center"}}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => props.jumpToStep(0)}
                        style={{ width: "109px", height: "36px" }}
                    >
                        {"Back"}
                    </Button>
                </Grid>
                <Grid item xs={6} style={{textAlign: "center"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.jumpToStep(2)}
                        disabled={!(isPositiveNumber(numberNodes) && isPositiveNumber(numberOfPeers) && nodePlan)}
                        style={{ width: "109px", height: "36px" }}
                    >
                        {"Next"}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Step2;
