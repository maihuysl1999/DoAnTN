import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "reactstrap";
import { Stepper, Step, StepLabel, Button, Grid } from "@mui/material";

import Step2Diagram from "./Step2Diagram";
import Step2Sidebar from "./Step2Sidebar";

import { SELECTED_NODE } from "src/redux/User/Dapps/actionTypes";


export default function Step2(props) {
    const steps = ["Application Config", "Business Config", "Review Config"];
    const dispatch = useDispatch();
    const step2Entities = useSelector((state) => state.Dapp.step2Entities);

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
            <Step2Sidebar />
            <div className="step2_content">
                <div className="step2_header" style={{ margin: "0px 0px 30px 0px" }}>
                    <Row style={{ margin: "0px" }}>
                        <Col sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                            <div style={{ width: "100%", maxWidth: "648px" }}>
                                <Stepper activeStep={1}>
                                    {steps.map((step, index) => {
                                        return (
                                            <Step key={step} className={index === 1 ? "active_step" : ""}>
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
                        color="primary"
                        variant="contained"
                        onClick={gotoStep3} 
                        disabled={checkEmptyEntity()}
                        style={{ width: "109px", height: "36px" }}
                    >
                        {"Next"}
                    </Button>
                </Grid>
            </Grid>
            </div>
        </div>
    );
}
