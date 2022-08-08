import React, { useState } from "react";
import { Row, Col, CardBody } from "reactstrap";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import { Stepper, Step, StepLabel, Container, Typography, Stack, Card } from "@mui/material";
import Page from "src/components/Page";
const NewNetwork = () => {
    const [activeStep, setActiveStep] = useState(0);
    function jumpToStep(number) {
        setActiveStep(number);
    }
    const steps = [
        {
            name: "Blockchain Config",
            component: <Step1 jumpToStep={jumpToStep} />,
        },
        {
            name: "Cluster Config",
            component: <Step2 jumpToStep={jumpToStep} />,
        },
        {
            name: "Review Config",
            component: <Step3 jumpToStep={jumpToStep} />,
        },
    ];
    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Network
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
                            <CardBody style={{ padding: "80px 30px 110px 30px" }}>
                                {steps[activeStep].component}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

export default NewNetwork;
