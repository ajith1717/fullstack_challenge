import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function EditProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        if (!user || !user.token) {
            navigate("/login");
        } else {
            setToken(user.token);
            fetchUserDetails(user.token);
        }
    }, [navigate]);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch("https://fullstack-server-0gqs.onrender.com/auth/v1/userDetails", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
                data = data?.data || {};
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
                localStorage.setItem("user", JSON.stringify({ ...data, token }));
            } else {
                navigate("/login");
            }
        } catch {
            navigate("/login");
        }
    };

    const handlePasswordChange = async () => {
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://fullstack-server-0gqs.onrender.com/auth/v1/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: currentPassword }),
            });
            const data = await response.json();

            if (response.ok) {
                setShowNewPassword(true);
            } else {
                setError(data.message || "Invalid current password");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleUpdateProfile = async () => {
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://fullstack-server-0gqs.onrender.com/auth/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email, password: newPassword }),
            });

            if (response.ok) {
                setSuccess("Profile updated successfully!");
                fetchUserDetails(token);
            } else {
                setError("Update failed. Try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <MDBContainer style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                maxWidth="900px"
                padding="10px 20px"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                borderRadius="8px"
                bgcolor="#fff"
                marginBottom="20px"
            >
                <Typography variant="h5">Edit Profile</Typography>
                <Box textAlign="right">
                    <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                    <Typography variant="body1"><strong>Role:</strong> {role}</Typography>
                </Box>
            </Box>

            {/* Form */}
            <MDBRow
                style={{
                    width: "33%",
                    padding: "20px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Email"
                    value={email}
                    disabled
                    fullWidth
                    style={{ marginBottom: "10px" }}
                />

                <TextField
                    label="Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                />

                <Button
                    variant="contained"
                    onClick={handlePasswordChange}
                    style={{ marginBottom: "10px" }}
                    fullWidth
                >
                    Change Password
                </Button>

                {showNewPassword && (
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "10px" }}
                    />
                )}

                <Button
                    variant="contained"
                    onClick={handleUpdateProfile}
                    fullWidth
                >
                    Update Profile
                </Button>

                {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}
                {success && <Typography color="success" style={{ marginTop: "10px" }}>{success}</Typography>}
            </MDBRow>
        </MDBContainer>
    );
}

export default EditProfile;
