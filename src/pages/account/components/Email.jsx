import { useEffect, useState } from "react";
import React from "react";
import { TextField, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SEND_VERIFY } from "src/redux/User/Settings/actionTypes";
import { VERIFY_EMAIL } from "src/redux/User/Settings/actionTypes";

export default function Email() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.User.user);
    const currentEmail = user.email;
    const tempEmail = user.temp_email;
    const [displayVerify, setDisplayVerify] = useState(false);
    const [email, setEmail] = useState(currentEmail === "" ? tempEmail : currentEmail);
    const [otp, setOtp] = useState();
    const handleEmail = (e) => {
        setDisplayVerify(!displayVerify);
        dispatch({ type: SEND_VERIFY, payload: { user_id: user.user_id } });
    };
    const handleVerifyOTP = () => {
        dispatch({ type: VERIFY_EMAIL, payload: { user_id: user.user_id, otp: otp, email: email } });
    };
    return (
        <>
            <Grid style={{ textAlign: "center", margin: "16px" }}>
                <h1>{currentEmail === "" ? "Verify" : "Change"} Email</h1>
            </Grid>

            <Grid spacing={2} style={{ display: "flex", justifyContent: "center" }}>
                <Grid style={{ width: "50%" }}>
                    <Grid>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            size="small"
                            label="Email"
                            variant="filled"
                            fullWidth
                            defaultValue={currentEmail === "" ? tempEmail : currentEmail}
                        />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={(e) => handleEmail()}>
                            Verify
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className="col-md-12 d-center" style={{ display: !displayVerify ? "none" : "" }}>
                <Grid className="rowEditProfile d-center">
                    <Grid className="col-md-6">
                        <TextField
                            size="small"
                            label="OTP Code"
                            variant="filled"
                            className="input"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => handleVerifyOTP()}>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ height: "100px" }}></div>
        </>
    );
}
