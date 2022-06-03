import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { OPEN_SUCCESS_ALERT } from "../../../../redux/User/Alerts/actionTypes";
import { OPEN_ERROR_ALERT } from "../../../../redux/User/Alerts/actionTypes";
//
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from "@mui/material";
//service
import { createNetworkResource } from "../../../../services/User/networks";
import { isStringOnlyNumberNotSign } from "../../../../utils/stringhandle";

export default function ModalAddNode(props) {
    const {
        idNetwork = "",
        open = false,
        handleCloseModal = () => {},
        typeNetwork = "sawtooth",
        reloadListResource = () => {},
    } = props;
    const [dataPost, setDataPost] = useState({
        resource_name: "",
        resource_config: { host: "", port: "" },
        resource_description: "",
    });
    const dispatch = useDispatch();
    const [ipv4, setIPv4] = useState(false);
    const [port, setPort] = useState(false);
    function changeNodeName(text) {
        setDataPost((prev) => {
            return {
                ...prev,
                resource_name: text,
            };
        });
    }
    function changeResourceDescription(text) {
        setDataPost((prev) => {
            return {
                ...prev,
                resource_description: text,
            };
        });
    }
    function changeHost(text) {
        setDataPost((prev) => {
            return {
                ...prev,
                resource_config: {
                    ...prev.resource_config,
                    host: text,
                },
            };
        });
        checkIPv4(text);
    }
    function changePort(text) {
        setDataPost((prev) => {
            return {
                ...prev,
                resource_config: {
                    ...prev.resource_config,
                    port: text,
                },
            };
        });
        setPort(!isStringOnlyNumberNotSign(text));
    }
    function checkCreateCondition() {
        if (typeNetwork === "sawtooth") {
            return (
                dataPost.resource_name &&
                dataPost.resource_config.host &&
                dataPost.resource_config.port &&
                !port &&
                !ipv4
            );
        } else {
            return (
                dataPost.resource_name &&
                dataPost.resource_config.host &&
                dataPost.resource_config.port &&
                dataPost.resource_config.organization_name &&
                !port &&
                !ipv4
            );
        }
    }
    function checkIPv4(ip) {
        const regexExp =
            /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
        setIPv4(!regexExp.test(ip));
    }
    async function createNewResource() {
        const data_post = {
            ...dataPost,
            resource_config: {
                ...dataPost.resource_config,
                port: Number(dataPost.resource_config.port),
            },
        };
        const res = await createNetworkResource(idNetwork, data_post);
        if (res.status === "success") {
            reloadListResource();
            setTimeout(() => {
                dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Creating!" } });
            }, 600);
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Have an error occurred! Action fail!" } });
        }
        handleCloseModal();
    }
    return (
        <div>
            <Dialog
                maxWidth={"xs"}
                open={open}
                fullWidth
                onClose={handleCloseModal}
                onClick={(e) => e.stopPropagation()}
                onContextMenu={(e) => e.stopPropagation()}
                style={{ zIndex: 1200 }}
            >
                <DialogTitle>Add node</DialogTitle>
                <DialogContent style={{ paddingTop: "20px" }}>
                    <div style={{ marginBottom: "8px" }}>
                        <TextField
                            value={dataPost.resource_name}
                            autoFocus
                            label="Node name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {
                                changeNodeName(e.target.value);
                            }}
                        />
                    </div>
                    <Divider />
                    <div style={{ marginBottom: "8px", marginTop: "8px" }}>
                        <TextField
                            error={ipv4}
                            value={dataPost.resource_config.host}
                            className="mb-3"
                            label="Host IP"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {
                                changeHost(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "8px", marginTop: "8px" }}>
                        <TextField
                            error={port}
                            value={dataPost.resource_config.port}
                            label="Port"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {
                                changePort(e.target.value);
                            }}
                        />
                    </div>
                    <Divider />
                    <div style={{ marginBottom: "8px", marginTop: "8px" }}>
                        <TextField
                            value={dataPost.resource_description}
                            label="Description"
                            className="mb-3"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {
                                changeResourceDescription(e.target.value);
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={{ paddingRight: "24px" }}>
                    <Button variant="outlined" color="error" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={createNewResource} disabled={!checkCreateCondition()}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
