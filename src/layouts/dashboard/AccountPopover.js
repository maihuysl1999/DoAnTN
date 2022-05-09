import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { LOGOUT } from "src/redux/User/Settings/actionTypes";
import { userActions } from "src/redux/Guest/reducer";

// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
// mocks_
import account from "../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: "Home",
        icon: "eva:home-fill",
        linkTo: "/",
    },
    {
        label: "Profile",
        icon: "eva:person-fill",
        linkTo: "#",
    },
    {
        label: "Settings",
        icon: "eva:settings-2-fill",
        linkTo: "#",
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const anchorRef = useRef(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getProfile({ user_id: localStorage.getItem("user_id") }));
        if (localStorage.getItem("layout_version")) {
            document.body.className = localStorage.getItem("layout_version");
        } else {
            localStorage.setItem("layout_version", "light");
        }
    });
    const user = useSelector((state) => state.User.user);
    const navigate = useNavigate();

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handlerLogout = () => {
        dispatch({ type: LOGOUT, payload: true });
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        "&:before": {
                            zIndex: 1,
                            content: "''",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            position: "absolute",
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    "& .MuiMenuItem-root": {
                        typography: "body2",
                        borderRadius: 0.75,
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user.full_name}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                        {account.email}
                    </Typography> */}
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={handlerLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </MenuPopover>
        </>
    );
}
