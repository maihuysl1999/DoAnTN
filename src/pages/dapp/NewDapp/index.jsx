import React, { useState } from "react";
import { Container, Row, Col, CardBody } from "reactstrap";
import Step1 from "./components/step1/Step1";
import Step2 from "./components/step2/Step2";
import Step3 from "./components/step3/Step3";
import { Stepper, Step, StepLabel, Typography, Stack, Card } from "@mui/material";

import Page from "src/components/Page";

const NewDApp = () => {
    const [activeStep, setActiveStep] = useState(0);
    function jumpToStep(number) {
        setActiveStep(number);
    }
    const steps = [
        { name: "Application Config", component: <Step1 jumpToStep={jumpToStep} /> },
        { name: "Business Config", component: <Step2 jumpToStep={jumpToStep} /> },
        { name: "Review Config", component: <Step3 jumpToStep={jumpToStep} /> },
    ];

    return (
        <>
            {activeStep !== 1 ? (
                <Page title="Dashboard">
                    <Container maxWidth="xl">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                            <Typography variant="h4" gutterBottom>
                                New Dapp
                            </Typography>
                            <Stepper activeStep={activeStep}>
                                {steps.map((step, index) => {
                                    return (
                                        <Step key={step.name} className={index === activeStep ? "active_step" : ""}>
                                            <StepLabel>{step.name}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Stack>
                        <Row>
                            <Col sm="12">
                                <Card>
                                    <CardBody>
                                        {steps[activeStep].component}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Page>
            ) : (
                <div>{steps[activeStep].component}</div>
            )}
        </>
    );
};

export default NewDApp;
