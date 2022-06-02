import React, { useEffect, useState } from "react";
//
import { Button, CardActions, CardActionArea, Typography, Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Download, Plus } from "react-feather";
import FileSaver from "file-saver";
// redux
import { useDispatch } from "react-redux";
import { OPEN_SUCCESS_ALERT } from "../../../../redux/User/Alerts/actionTypes";
import { OPEN_ERROR_ALERT } from "../../../../redux/User/Alerts/actionTypes";
// constant
import { statusNetworkClassName } from "../../../../constant/statusNetworkClassName";
import { networkStatus } from "../../../../constant/networkStatus";
import { dotColor } from "src/constant/dotColor";
// component
import ModalAddNode from "../ModalAddNode/ModalAddNode";
// service
import { storageService } from "../../../../services/User/storages";
import { getNetworkResources } from "../../../../services/User/networks";
//asset image
import errorImg from "src/asset/images/search-not-found.png";

export default function ManageResource(props) {
    const dispatch = useDispatch();
    const { idNetwork } = props;
    const [openModal, setOpenModal] = useState(false);
    const [listResource, setListResource] = useState([]);
    function closeModal() {
        setOpenModal(false);
    }
    async function getListResource() {
        const res = await getNetworkResources(idNetwork);
        console.log(idNetwork);
        setListResource(res.data);
    }
    useEffect(() => {
        getListResource();
    }, []);

    async function downloadItem(fileName, idNode) {
        const res = await storageService.downloadFolder(idNode);
        if (res.status === 200) {
            var blob = new Blob([res.data], { type: "application/octet-stream" });
            FileSaver.saveAs(blob, `${fileName}.zip`);
            setTimeout(() => {
                dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Download done!" } });
            }, 600);
        } else {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Have an error occurred! Action fail!" } });
        }
    }
    return (
        <div style={{ marginBottom: "16px" }}>
            <CardActions>
                <div style={{ display: "flex", marginTop: "8px", width: "100%", alignItems: "center" }}>
                    <div style={{ paddingLeft: "16px", width: "20%" }}>
                        <Typography fontSize="medium" fontWeight="light" color="primary">
                            MANAGE RESOURCE
                        </Typography>
                    </div>
                    <div style={{ width: "79%", display: "flex", justifyContent: "right" }}>
                        <Button onClick={() => setOpenModal(true)} variant="contained" color="primary">
                            <Plus width={17} height={17} className="mr-2" />
                            {"Add node"}
                        </Button>
                    </div>
                </div>
            </CardActions>
            {listResource && listResource.length === 0 ? (
                <Grid xs={12}>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <img src={errorImg} alt="" />
                    </div>
                    <h4 style={{ display: "flex", justifyContent: "center" }}>
                        This network has no resource to display !!!
                    </h4>
                </Grid>
            ) : (
                <div style={{ paddingLeft: "24px", paddingRight: "16px" }}>
                    <CardActions>
                        <Grid container style={{ marginTop: "32px", marginBottom: "8px" }}>
                            <Grid xs={4}>
                                <Typography fontWeight="bold" fontSize={"14px"}>
                                    Name
                                </Typography>
                            </Grid>
                            <Grid xs={4}>
                                <Typography fontWeight="bold" fontSize={"14px"}>
                                    Status
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography fontWeight="bold" fontSize={"14px"}>
                                    Host
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography fontWeight="bold" fontSize={"14px"}>
                                    Port
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                    {listResource.map((item, index) => {
                        return (
                            <CardActionArea
                                key={"manageResource" + item.resource_id + index}
                                style={{
                                    backgroundColor: "#f9f9fc",
                                    height: "64px",
                                    marginBottom: "8px",
                                    paddingLeft: "8px",
                                    borderRadius: "15px",
                                }}
                            >
                                <Grid container style={{ alignItems: "center" }}>
                                    <Grid item xs={4}>
                                        <Typography fontSize={"14px"}>{item.resource_name}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{ display: "flex" }}>
                                            <FiberManualRecordIcon
                                                color={dotColor[item.status]}
                                                sx={{ fontSize: "small" }}
                                            ></FiberManualRecordIcon>
                                            <div style={{ fontSize: "14px" }}>
                                                <Typography fontSize={"14px"}>
                                                    {networkStatus[item.status] || networkStatus.ELSE}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography fontSize={"14px"}>{item.resource_config.host}</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                                        <div>
                                            <Typography fontSize={"14px"}>
                                                {item.resource_config.port || "#"}
                                            </Typography>
                                        </div>
                                        <div style={{ display: "flex", width: "80%", justifyContent: "right" }}>
                                            <Button
                                                title="download config"
                                                onClick={() =>
                                                    downloadItem(item.resource_name, item.resource_folder_id)
                                                }
                                            >
                                                <Download />
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                        );
                    })}
                </div>
            )}
            <ModalAddNode
                idNetwork={idNetwork}
                open={openModal}
                handleCloseModal={closeModal}
                reloadListResource={getListResource}
            />
        </div>
    );
}
