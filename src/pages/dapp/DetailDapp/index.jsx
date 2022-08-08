import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
// mui
import { Typography, Button, Grid, Card } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import { Row, CardBody, Media } from "reactstrap";
// import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// redux
import { dappActions } from "src/redux/User/Dapps/reducer";
import { OPEN_ERROR_ALERT } from "../../../redux/User/Alerts/actionTypes";
import { OPEN_SUCCESS_ALERT } from "../../../redux/User/Alerts/actionTypes";
import { retryCreateDapp, retryUpdateDapp, rollBackDapp, deleteDApps } from "../../../services/User/dapps";
import { STEP2_RELATIONSHIPS } from "src/redux/User/Dapps/actionTypes";
// image
import errorImg from "src/asset/images/search-not-found.png";
import logo from "src/asset/images/dapp.png";
// constant
import { networkStatus } from "../../../constant/networkStatus";
import { statusNetworkClassName } from "../../../constant/statusNetworkClassName";
import { dotColor } from "src/constant/dotColor";
// component
import CustomNodeFlow from "../NewDapp/components/custom_react_flow/CustomNodeFlow";
import FloatingEdge from "../NewDapp/components/custom_react_flow/FloatingEdge";
import Iconify from "../../../components/Iconify";

export default function DetailDApp() {
    const { dappId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let temp = null;
    let entities = [];
    let relationships = [];

    const layout = useSelector((state) => state.Storage.layout);
    const userData = useSelector((stores) => stores.User.user);
    const dapp = useSelector((state) => state.Dapp.current_dapp);
    useEffect(() => {
        dispatch(dappActions.getDappById(dappId));
    }, []);

    async function reCreateDapp() {
        const res = await retryCreateDapp(dappId);
        if (res.status === "success") {
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Send request done!" } });
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Send request fail!" } });
        }
    }

    async function reUpdateDapp() {
        const res = await retryUpdateDapp(dappId);
        if (res.status === "success") {
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Send request done!" } });
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Send request fail!" } });
        }
    }

    async function rollbackDapp() {
        const res = await rollBackDapp(dappId);
        if (res.status === "success") {
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Send request done!" } });
            setTimeout(() => {
                window.location.href = "/dapps";
            }, 700);
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Send request fail!" } });
        }
    }

    async function deleteDapp() {
        const res = await deleteDApps(dappId);
        if (res.status === "success") {
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Delete done!" } });
            setTimeout(() => {
                window.location.href = "/dapps";
            }, 700);
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Have error happened, action fail!" } });
        }
    }

    useEffect(() => {
        if (dapp && dapp.message) {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: dapp.message } });
        }
    }, [dapp]);

    if (dapp && dapp.entities) {
        dapp.entities.map((value, key) => {
            temp = {
                id: value.name,
                type: "customNode",
                data: value,
                position: { x: 50 + key * 300, y: 50 + (key - 1) * 50 },
            };
            entities.push(temp);
            value &&
                value.relationships &&
                value.relationships.map((edge, id) => {
                    temp = {
                        source: value.name,
                        sourceHandle: null,
                        target: edge.reference_to_entity,
                        targetHandle: null,
                        id: value.name + "-" + edge.type + "-" + edge.reference_to_entity,
                        data: {
                            id: value.name + "-" + edge.type + "-" + edge.reference_to_entity,
                            source: value.name,
                            target: edge.reference_to_entity,
                            type: edge.type,
                        },
                        type: "customEdge",
                    };
                    relationships.push(temp);
                });
        });
        dispatch({ type: STEP2_RELATIONSHIPS, payload: relationships });
    }
    const nodeTypes = {
        customNode: CustomNodeFlow,
    };
    const edgeTypes = {
        customEdge: FloatingEdge,
    };
    const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

    return dapp ? (
        <Fragment>
            <Grid container style={{ margin: "0 auto" }}>
                <Grid item xs={8} md={8} lg={8}>
                    <Grid style={{ display: "flex", alignItems: "center" }}>
                        <Grid item xs={2} md={2}>
                            <Media src={dapp[0].dapp_logo || logo} alt="" style={{ height: "92%", width: "80%" }} />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="h4" style={{ textTransform: "capitalize" }}>
                                {dapp[0].dapp_name}
                            </Typography>
                            <Typography
                                variant="button"
                                fontSize="small"
                                fontWeight="light"
                                color={statusNetworkClassName[dapp[0].status]}
                            >
                                <FiberManualRecordIcon
                                    color={dotColor[dapp[0].status]}
                                    sx={{ fontSize: "small" }}
                                ></FiberManualRecordIcon>
                                {networkStatus[dapp[0].status]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} lg={4} style={{ display: "flex", alignItems: "center" }}>
                    {dapp[0].status === "CREATE_FAIL" ? (
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "30%", marginRight: "8px" }}
                                startIcon={<Iconify icon="carbon:retry-failed" />}
                                onClick={reCreateDapp}
                            >
                                <Typography color="error" fontSize={"14px"} fontWeight="bold">
                                    Retry
                                </Typography>
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "30%" }}
                                startIcon={<Iconify icon="fluent:delete-48-regular" />}
                                onClick={deleteDapp}
                            >
                                <Typography color="error" fontSize={"14px"} fontWeight="bold">
                                    Delete
                                </Typography>
                            </Button>
                        </Grid>
                    ) : dapp[0].status === "UPDATE_FAIL" ? (
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "50%", marginRight: "8px" }}
                                onClick={rollbackDapp}
                            >
                                <Typography color="error" fontSize={"14px"} fontWeight="bold">
                                    Rollback
                                </Typography>
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "50%", marginRight: "8px" }}
                                startIcon={<Iconify icon="carbon:retry-failed" />}
                                onClick={reUpdateDapp}
                            >
                                <Typography color="error" fontSize={"14px"} fontWeight="bold">
                                    Retry
                                </Typography>
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "50%" }}
                                startIcon={<Iconify icon="fluent:delete-48-regular" />}
                                onClick={deleteDapp}
                            >
                                <Typography color="error" fontSize={"14px"} fontWeight="bold">
                                    Delete
                                </Typography>
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                color="primary"
                                variant="outlined"
                                style={{ width: "30%", marginRight: "8px" }}
                                startIcon={<Iconify icon="arcticons:huawei-system-update" />}
                                disabled={dapp[0].status.includes("PENDING")}
                                onClick={() => {
                                    navigate(`/dapps/edit/${dappId}`);
                                }}
                            >
                                Update
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                style={{ width: "30%" }}
                                startIcon={<Iconify icon="fluent:delete-48-regular" />}
                                disabled={dapp[0].status.includes("PENDING")}
                                onClick={deleteDapp}
                            >
                                Delete
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>

            <Card style={{ marginTop: "8px" }}>
                <CardBody style={{ padding: "30px" }}>
                    <h4 style={{ color: "#8CB8D8" }}>BASIC INFORMATION</h4>
                    <br />
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Name</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {dapp[0].dapp_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Description</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {dapp[0].dapp_description}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Status</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {networkStatus[dapp[0].status] || networkStatus.ELSE}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Dapp ID</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {dapp[0].dapp_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Network ID</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {dapp[0].network_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ opacity: "0.65", fontSize: "14px" }}>Owner</Typography>
                            <Typography fontWeight="bold" style={{ fontSize: "14px" }}>
                                {userData.full_name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <br />
                    <br />
                    <hr />
                    <br />
                    <h4 style={{ color: "#8CB8D8" }}>ENTITIES INFORMATION</h4>
                    <br />
                    <br />
                    <Row>
                        <ReactFlow
                            minZoom={0.5}
                            maxZoom={2}
                            style={{ width: "100%", height: "40rem", zIndex: "0" }}
                            elements={[...dapp[0].diagrams, ...relationships]}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            onlyRenderVisibleElements={false}
                            onLoad={onLoad}
                            snapToGrid={true}
                            snapGrid={[15, 15]}
                            key="edges"
                            nodesConnectable={false}
                            nodesDraggable={false}
                            elementsSelectable={false}
                        >
                            <MiniMap
                                nodeColor={(node) => {
                                    return node.data.color;
                                }}
                            />
                            <Controls />
                            <Background
                                variant="dots"
                                color="#f1f6f8"
                                style={layout === "light" || layout === "" ? { backgroundColor: "#f1f6f8" } : ""}
                            />
                        </ReactFlow>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    ) : (
        <>
            <img className="img-fluid m-auto" src={errorImg} alt="" style={{ display: "flex" }} />
        </>
    );
}
