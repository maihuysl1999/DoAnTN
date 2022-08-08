import React from "react";
import { Handle } from "react-flow-renderer";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import "./_custom_node_flow.scss";

import { Typography, Button, Grid, Card } from "@mui/material";

import Iconify from "../../../../../components/Iconify";

export default function CustomNodeFlow({ data, id }) {
    const { name, color, attributes, primary_key } = data;
    const selected = useSelector((state) => state.Dapp.selected);

    return (
        <div className={selected === id ? "table_node selected_node" : "table_node"} style={{ borderTopColor: color }}>
            <Handle
                className="dot_source"
                id={id + "sleft"}
                type="source"
                position="left"
                style={{ height: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_target"
                id={id + "tleft"}
                type="target"
                position="left"
                style={{ height: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_source"
                id={id + "stop"}
                type="source"
                position="top"
                style={{ width: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_target"
                id={id + "ttop"}
                type="target"
                position="top"
                style={{ width: "100%", borderRadius: "0" }}
            />
            <div className="table_node_title">{name}</div>
            {attributes.map((attr, index) => {
                return (
                    <div>
                        <Grid container style={{ marginTop: "8px" }}>
                            <Grid item xs={2} style={{ marginTop: "4px", textAlign: "center" }}>
                                {primary_key === attr.idAttr ? (
                                    <span>
                                        {" "}
                                        <Iconify icon="ep:key" />
                                    </span>
                                ) : (
                                    ""
                                )}
                                {attr.encrypt ? (
                                    <span>
                                        <Iconify icon="ic:outline-enhanced-encryption" />
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "4px", marginTop: "4px" }}>
                                <div style={{ fontSize: "14px" }}>{attr.name}</div>
                            </Grid>
                            <Grid item xs={2} style={{ marginBottom: "4px", marginTop: "4px" }}>
                                <div style={{ fontSize: "14px" }}>{attr.type}</div>
                            </Grid>
                        </Grid>
                        {/* <Row key={"node" + attr.idAttr} className="row_data_node">
                            <Col xs={2} className="row_data_icon">
                                {primary_key === attr.idAttr ? (
                                    <span>
                                        {" "}
                                        <i className="fa fa-key"></i>
                                    </span>
                                ) : (
                                    ""
                                )}
                                {attr.encrypt ? (
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="shield-alt"
                                            className="svg-inline--fa fa-shield-alt fa-w-16"
                                            role="img"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Col>
                            <Col xs={6}>{attr.name}</Col>
                            <Col xs={3}>{attr.type}</Col>
                        </Row> */}
                    </div>
                );
            })}
            <Handle
                className="dot_source"
                type="source"
                position="right"
                id={id + "sright"}
                style={{ height: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_target"
                type="target"
                position="right"
                id={id + "tright"}
                style={{ height: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_source"
                type="source"
                position="bottom"
                id={id + "sbottom"}
                style={{ width: "100%", borderRadius: "0" }}
            />
            <Handle
                className="dot_target"
                type="target"
                position="bottom"
                id={id + "tbottom"}
                style={{ width: "100%", borderRadius: "0" }}
            />
        </div>
    );
}
