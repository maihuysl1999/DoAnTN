import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// redux
import { STEP1_DATA } from "src/redux/User/Dapps/actionTypes";
import { OPEN_ERROR_ALERT } from "src/redux/User/Alerts/actionTypes";
import { STEP2_ENTITIES } from "src/redux/User/Dapps/actionTypes";
import { STEP2_RELATIONSHIPS } from "src/redux/User/Dapps/actionTypes";
import { CLEAR_DAPP_STATE } from "src/redux/User/Dapps/actionTypes";
//
import { Stepper, Step, StepLabel, Typography, Stack, Card, Button, Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Container, Row, Col, CardBody } from "reactstrap";
// components
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
//
import logo from "src/asset/images/dapp.png";
// service
import { getDetailDAppById } from "src/services/User/dapps";
// constant
import { dotColor } from "src/constant/dotColor";
import { statusNetworkClassName } from "src/constant/statusNetworkClassName";
import { networkStatus } from "src/constant/networkStatus";

export default function EditDapp() {
    const { dappId } = useParams();
    const dispatch = useDispatch();
    const dapp = useSelector((stores) => stores.Dapp);
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    function jumpToStep(number) {
        setActiveStep(number);
    }
    const steps = [
        { name: "Application Config", component: <Step1 jumpToStep={jumpToStep} /> },
        { name: "Business Config", component: <Step2 jumpToStep={jumpToStep} dappId={dappId} /> },
        { name: "Review Config", component: <Step3 jumpToStep={jumpToStep} dappId={dappId} /> },
    ];

    useEffect(() => {
        (async () => {
            const res = await getDetailDAppById(dappId);
            if (res.data.status == "success") {
                const dappInfo = res.data.data[0];
                dispatch({
                    type: STEP1_DATA,
                    payload: {
                        dapp_name: dappInfo.dapp_name,
                        dapp_description: dappInfo.dapp_description,
                        network_id: dappInfo.network_id,
                        encryption_type: dappInfo.encryption_type,
                        dapp_logo: dappInfo.dapp_logo || logo,
                        status: dappInfo.status,
                    },
                });

                const entityLength = dappInfo.entities.length;
                const diagramLength = dappInfo.diagrams.length;
                let entityList = [];
                let relationShipList = [];
                for (let i = 0; i < diagramLength; i++) {
                    if (i < entityLength) {
                        entityList.push({
                            ...dappInfo.diagrams[i],
                            data: {
                                ...dappInfo.diagrams[i].data,
                                is_old_data: true,
                                attributes: dappInfo.diagrams[i].data.attributes.map((attr, index) => {
                                    return {
                                        ...attr,
                                        is_old_data: true,
                                    };
                                }),
                            },
                        });
                    } else {
                        relationShipList.push({
                            ...dappInfo.diagrams[i],
                            data: {
                                ...dappInfo.diagrams[i].data,
                                is_old_data: true,
                            },
                        });
                    }
                }

                dispatch({ type: STEP2_ENTITIES, payload: entityList });
                dispatch({ type: STEP2_RELATIONSHIPS, payload: relationShipList });
            } else {
                dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "DApp is not exist!" } });
                setTimeout(() => {
                    navigate(`/dapps`);
                }, 700);
            }
        })();

        return () => {
            dispatch({ type: CLEAR_DAPP_STATE });
        };
    }, []);

    return (
        <>
            {activeStep !== 1 ? (
                <>
                    <Grid container style={{ marginBottom: "16px" }}>
                        <Grid item xs={8} md={8} lg={8}>
                            <Grid style={{ display: "flex", alignItems: "center" }}>
                                <Grid item xs={1} md={1}>
                                    <img
                                        src={dapp.step1Data.dapp_logo}
                                        alt=""
                                        style={{ height: "92%", width: "80%" }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Typography variant="h4" style={{ textTransform: "capitalize" }}>
                                        {dapp.step1Data.dapp_name}
                                    </Typography>
                                    <Typography
                                        variant="button"
                                        fontSize="small"
                                        fontWeight="light"
                                        color={statusNetworkClassName[dapp.step1Data.status]}
                                    >
                                        <FiberManualRecordIcon
                                            color={dotColor[dapp.step1Data.status]}
                                            sx={{ fontSize: "small" }}
                                        ></FiberManualRecordIcon>
                                        {networkStatus[dapp.step1Data.status]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} md={4} lg={4} style={{ display: "flex", alignItems: "center" }}>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "right" }}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    style={{ width: "40%" }}
                                    startIcon={<Iconify icon="bx:arrow-back" />}
                                    onClick={() => {
                                        navigate(`/dapps/${dappId}`);
                                    }}
                                >
                                    Detail
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Page title="Dashboard">
                        <Container maxWidth="xl">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom>
                                    Edit Dapp
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
                                        <CardBody>{steps[activeStep].component}</CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Page>
                </>
            ) : (
                <div style={{ margin: "0 -15px 0px -15px" }}>{steps[activeStep].component}</div>
            )}
        </>
    );
}
