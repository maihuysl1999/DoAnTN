import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registry } from "src/services/Guest/registry";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import { getRouteByRole } from "src/utils/role";
import { OPEN_ERROR_ALERT, OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("User name required"),
        full_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Full name required"),
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            full_name: "",
            phone: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: async (e) => {
            try {
                const data_post = {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    full_name: values.full_name,
                    phone: values.phone,
                };
                const response = await registry(data_post);
                console.log(response);
                if (response.data.status == "success") {
                    dispatch({
                        type: OPEN_SUCCESS_ALERT,
                        payload: { message: "Sign Up Success! Let's login now." },
                    });
                    setTimeout(() => {
                        navigate(getRouteByRole("guest"));
                    }, 900);
                } else {
                    dispatch({ type: OPEN_ERROR_ALERT, payload: { message: response.data.data.message } });
                    console.error(response.data);
                }
            } catch (error) {
                dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Registration failed!" } });
                console.error(error);
            }
        },
    });

    const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Fullname"
                        {...getFieldProps("full_name")}
                        error={Boolean(touched.full_name && errors.full_name)}
                        helperText={touched.full_name && errors.fulfull_namelName}
                    />

                    <TextField
                        fullWidth
                        autoComplete="email"
                        type="email"
                        label="Email address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

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
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Register
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
