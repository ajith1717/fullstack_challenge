import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer } from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user')) || {};
    const { name: userName, email: userEmail, role: userRole, userId } = userInfo;

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            navigate("/login");
        }
        if (userRole !== 'user') {
            fetchUsers();
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://fullstack-server-0gqs.onrender.com/auth/v1/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data?.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = (user = null) => {
        if (user || userRole === "user") {
            setEditUserId(user?.userId || userId);
            setName(user?.name || userName);
            setEmail(user?.email || userEmail);
            setPhone(user?.phone || '');
        } else {
            setEditUserId(null);
            setName('');
            setEmail('');
            setPhone('');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const url = editUserId
            ? 'https://fullstack-server-0gqs.onrender.com/auth/v1/updateUser'
            : 'https://fullstack-server-0gqs.onrender.com/auth/v1/signup';
        const method = editUserId ? 'PUT' : 'POST';
        const payload = {
            name, email, phone, userId: editUserId
        };
        if (password) payload.password = password;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            fetchUsers();
            handleClose();
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`https://fullstack-server-0gqs.onrender.com/auth/v1/user/${deleteUserId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            fetchUsers();
            setConfirmDelete(false);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <MDBContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
                <Typography variant="h6">Dashboard</Typography>
                <Box>
                    <Typography variant="body1">{userName}</Typography>
                    <Typography variant="body2">{userEmail}</Typography>
                    <Typography variant="body2">Role: {userRole}</Typography>
                </Box>
                {userRole !== "user" && (
                    <Button variant="contained" onClick={() => handleOpen()}>Add User</Button>
                )}
            </Box>

            {userRole !== "user" && (
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpen(user)} color="primary">Edit</Button>
                                        <Button onClick={() => { setDeleteUserId(user.userId); setConfirmDelete(true); }} color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {(userRole === "user") && (
                <Button variant="contained" onClick={() => handleOpen()} sx={{ marginTop: 3 }}>
                    Edit Profile
                </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editUserId ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    {/* <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth sx={{ mb: 2 }} /> */}
                    {userRole === "user" && (
                        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editUserId ? 'Update' : 'Sign Up'}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this user?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Box position="absolute" bottom={10} left={10}>
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
            </Box>
        </MDBContainer>
    );
}

export default Dashboard;
