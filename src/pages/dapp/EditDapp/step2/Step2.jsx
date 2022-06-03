import React from "react";
import { useNavigate, useParams } from "react-router";
// redux
import { useDispatch, useSelector } from "react-redux";
import { SELECTED_NODE } from "src/redux/User/Dapps/actionTypes";
//
import { Row, Col } from "reactstrap";
import { Stepper, Step, StepLabel, Button, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// components
import Iconify from "src/components/Iconify";
import Step2Diagram from "./Step2Diagram";
import Step2Sidebar from "./Step2Sidebar";
// constant
import { dotColor } from "src/constant/dotColor";
import { statusNetworkClassName } from "src/constant/statusNetworkClassName";
import { networkStatus } from "src/constant/networkStatus";

export default function Step2(props) {
    const { dappId } = props;
    const steps = ["Application Config", "Business Config", "Review Config"];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const step2Entities = useSelector((state) => state.Dapp.step2Entities);
    const dapp = useSelector((state) => state.Dapp);

    function gotoStep3() {
        dispatch({ type: SELECTED_NODE, payload: "null" });
        props.jumpToStep(2);
    }
    function checkEmptyEntity() {
        if (step2Entities.length === 0) return true;
        return false;
    }
    return (
        <div className="step2_new_dapp">
            <Grid container style={{ marginBottom: "24px" }}>
                <Grid style={{ width: "98%", display: "flex", justifyContent: "right" }}>
                    <Button
                        color="primary"
                        variant="outlined"
                        style={{ width: "15%" }}
                        startIcon={<Iconify icon="bx:arrow-back" />}
                        onClick={() => {
                            navigate(`/dapps/${dappId}`);
                        }}
                    >
                        Detail
                    </Button>
                </Grid>
            </Grid>
            <Step2Sidebar />
            <div className="step2_content">
                <div className="step2_header" style={{ margin: "-15px 30px 30px 30px" }}>
                    <Row style={{ margin: "0px" }}>
                        <Col sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                            <div style={{ width: "100%", maxWidth: "648px" }}>
                                <Stepper activeStep={1}>
                                    {steps.map((step, index) => {
                                        return (
                                            <Step key={step} className={index == 1 ? "active_step" : ""}>
                                                <StepLabel>{step}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="diagram">
                    <Step2Diagram />
                </div>
                <Grid
                    item
                    spacing={2}
                    style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <div style={{ margin: "8px" }}>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => props.jumpToStep(0)}
                            style={{ width: "109px", height: "36px" }}
                        >
                            {"Back"}
                        </Button>
                    </div>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={gotoStep3}
                        disabled={checkEmptyEntity()}
                        style={{ width: "109px", height: "36px" }}
                    >
                        {"Next"}
                    </Button>
                </Grid>
            </div>
        </div>
    );
}
