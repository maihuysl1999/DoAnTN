import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { login } from "src/services/Guest/login";
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------
import { setLocalToken, setRemember, setSessionToken } from "src/utils/token";
import { getRouteByRole, setLocalRole, setSessionRole } from "src/utils/role";
import { setLocalUser, setSessionUser } from "src/utils/user";
import { OPEN_ERROR_ALERT, OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: async (e) => {
            try {
                const data = {
                    username: values.username,
                    password: values.password,
                };
                console.log(data);
                const response = await login(data);
                const body = response.data;
                if (body.status === "success") {
                    if (state.remember) {
                        setLocalToken(body.data.token);
                        setLocalRole("user");
                        setLocalUser(body.data.user_id);
                        setRemember(true);
                        // localStorage.setItem("user", JSON.stringify(body.data.user));
                    } else {
                        setSessionToken(body.data.token);
                        setSessionRole("user");
                        setSessionUser(body.data.user_id);
                        setRemember(false);
                    }
                    // await dispatch(userActions.getProfile({ user_id: body.data.user_id }));
                    dispatch({
                        type: OPEN_SUCCESS_ALERT,
                        payload: { message: "Logged in successfully!" },
                    });
                    setTimeout(() => {
                        navigate(getRouteByRole("user"));
                    }, 900);
                } else {
                    dispatch({ type: OPEN_ERROR_ALERT, payload: { message: body.data.message } });
                    console.error(body);
                }
            } catch (error) {
                dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Login error!" } });
                console.error(error);
            }
            // navigate('/dashboard', { replace: true });
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const dispatch = useDispatch();

    const [state, setState] = useState({
        username: "",
        password: "",
        remember: true,
    });

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        label="Username"
                        {...getFieldProps("username")}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <FormControlLabel
                        control={<Checkbox {...getFieldProps("remember")} checked={values.remember} />}
                        label="Remember me"
                        onChange={(e) => {
                            setState({ ...state, remember: !state.remember });
                        }}
                    />

                    <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Login
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
