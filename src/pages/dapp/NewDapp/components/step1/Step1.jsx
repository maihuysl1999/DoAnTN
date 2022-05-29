import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "reactstrap";
import { TextField, Button, FormControl, InputLabel, Select, ListSubheader, MenuItem, Grid } from "@mui/material";

import { STEP1_DATA } from "src/redux/User/Dapps/actionTypes";
import { networkActions } from "src/redux/User/Networks/reducer";

import { v4 as uuidv4 } from "uuid";
import { isOnlyLowerLetterAndNumber } from "../../../../../utils/stringhandle";

import "./_step1.scss";

export default function Step1(props) {
    const dispatch = useDispatch();
    const step1Data = useSelector((state) => state.Dapp.step1Data);
    const list_network = useSelector((state) => state.Network.list_network);

    function uploadImg(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function (ee) {
            dispatch({
                type: STEP1_DATA,
                payload: {
                    ...step1Data,
                    dapp_logo: ee.target.result,
                },
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    function changeName(e) {
        dispatch({
            type: STEP1_DATA,
            payload: {
                ...step1Data,
                dapp_name: e.target.value,
            },
        });
    }
    function changeDesc(e) {
        dispatch({
            type: STEP1_DATA,
            payload: {
                ...step1Data,
                dapp_description: e.target.value,
            },
        });
    }
    useEffect(() => {
        dispatch(networkActions.getNetwork({}));
        dispatch({
            type: STEP1_DATA,
            payload: {
                ...step1Data,
                network_id: list_network[0] && list_network[0]["network_id"],
            },
        });
    }, []);
    function checkDappName() {
        if (isOnlyLowerLetterAndNumber(step1Data.dapp_name)) {
            if (isNaN(step1Data.dapp_name[0])) {
                return true;
            }
        }
        return false;
    }
    return (
        <Container className="dapp_step1">
            <Grid style={{ width: "100%", margin: "64px" }}>
                <Grid container>
                    <Grid item xs={1} md={1} lg={1}></Grid>
                    <Grid className="dapp_img_wrapper">
                        <div className="avata_wrapper">
                            <div className="avata_upload bg_upload">
                                <div>
                                    <div className="file_image_icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="49.558"
                                            height="57.818"
                                            viewBox="0 0 49.558 57.818"
                                        >
                                            <path
                                                id="Icon_metro-file-image"
                                                data-name="Icon metro-file-image"
                                                d="M49.935,14.464a7.508,7.508,0,0,1,1.549,2.452,7.446,7.446,0,0,1,.645,2.839V56.924a3.085,3.085,0,0,1-3.1,3.1H5.668a2.987,2.987,0,0,1-2.194-.9,2.987,2.987,0,0,1-.9-2.194V5.3a2.987,2.987,0,0,1,.9-2.194,2.987,2.987,0,0,1,2.194-.9H34.577a7.448,7.448,0,0,1,2.839.645A7.508,7.508,0,0,1,39.869,4.4ZM35.61,6.591V18.723H47.741a3.525,3.525,0,0,0-.71-1.323L36.932,7.3a3.524,3.524,0,0,0-1.323-.71ZM48,55.892V22.853H34.577a3.085,3.085,0,0,1-3.1-3.1V6.333H6.7V55.892H48Zm-4.13-14.455V51.762H10.83V45.567l6.195-6.195,4.13,4.13,12.39-12.39ZM17.025,35.242a6.169,6.169,0,0,1-6.195-6.195,6.169,6.169,0,0,1,6.195-6.195,6.169,6.169,0,0,1,6.195,6.195,6.169,6.169,0,0,1-6.195,6.195Z"
                                                transform="translate(-2.571 -2.203)"
                                                fill="#b7ccdb"
                                            />
                                        </svg>
                                    </div>
                                    <div style={{ padding: "0px 40px", color: "#6C6C6C" }}>
                                        Drop an image here or click
                                    </div>
                                </div>
                            </div>
                            <div
                                className="avata_upload img_uploaded"
                                style={{ display: step1Data.dapp_logo ? "" : "none" }}
                            >
                                <img
                                    src={step1Data.dapp_logo}
                                    style={{ width: "inherit", height: "inherit", objectFit: "cover" }}
                                />
                            </div>
                            <input onChange={uploadImg} className="avata_upload" type="file" id="drop_zone" />
                        </div>
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            error={!checkDappName()}
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Dapp name"
                            variant="filled"
                            value={step1Data.dapp_name}
                            onChange={changeName}
                            helperText={!checkDappName() ? "Only lower letter and number. Letter beginning!" : ""}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Dapp description"
                            variant="filled"
                            value={step1Data.dapp_description}
                            onChange={changeDesc}
                        />
                        <FormControl fullWidth margin="normal" size="small" variant="filled">
                            <InputLabel>Network</InputLabel>
                            <Select
                                value={step1Data.network_id}
                                id="grouped-select"
                                label="Network"
                                onChange={(e) => {
                                    dispatch({
                                        type: STEP1_DATA,
                                        payload: {
                                            ...step1Data,
                                            network_id: e.target.value,
                                        },
                                    });
                                }}
                            >
                                <ListSubheader>Hyperledger Sawtooth</ListSubheader>
                                {list_network.map((network, index) => {
                                    if (network.blockchain_type === "sawtooth" && network.status === "CREATED") {
                                        return (
                                            <MenuItem
                                                key={uuidv4()}
                                                value={network.network_id}
                                            >
                                                {network.name}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" size="small" variant="filled">
                            <InputLabel>Encryption type</InputLabel>
                            <Select
                                value={step1Data.encryption_type}
                                id="encrypt_type-select"
                                label="Encrypt type"
                                onChange={(e) => {
                                    dispatch({
                                        type: STEP1_DATA,
                                        payload: {
                                            ...step1Data,
                                            encryption_type: e.target.value,
                                        },
                                    });
                                }}
                            >
                                <ListSubheader>Symmetric Cryptography</ListSubheader>
                                <MenuItem value={"aes"}>
                                    {"AES"}
                                </MenuItem>

                                <ListSubheader>Asymmetric Cryptography</ListSubheader>
                                <MenuItem value={"rsa"}>
                                    RSA
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item style={{width:"85%", textAlign: "right"}} >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => props.jumpToStep(1)}
                            disabled={
                                step1Data.dapp_name &&
                                step1Data.dapp_description &&
                                step1Data.dapp_logo &&
                                step1Data.encryption_type &&
                                step1Data.network_id &&
                                checkDappName()
                                    ? false
                                    : true
                            }
                            style={{  marginRight:"40px", marginTop:"32px", width: "110px", height: "36px" }}
                        >
                            {"Next"}
                        </Button>
                   
                </Grid>
            </Grid>
        </Container>
    );
}
