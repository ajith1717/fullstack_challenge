import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');
        setError('');
        setSuccess('');

        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Enter a valid email');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        try {
            const response = await fetch('https://fullstack-server-0gqs.onrender.com/auth/v1/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            let data = await response.json();
            data = data?.data || {};
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                setSuccess('Login successful!');
                setTimeout(() => {
                    navigate(!data.isVerified ? '/dashboard' : '/verification-pending');
                    // navigate(!data.isVerified ? data.role === 'admin' ? '/dashboard' : '/profile-edit' : '/verification-pending');
                }, 1000);

            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <MDBContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <MDBRow style={{ width: '100%', maxWidth: '400px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px', background: '#fff', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>Login Page</h2>
                <MDBCol style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                    <TextField
                        label='Email address'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        style={{ marginBottom: '10px' }}
                        fullWidth
                    />
                    <TextField
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        style={{ marginBottom: '10px' }}
                        fullWidth
                    />
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                    <Button variant="contained" onClick={handleLogin} style={{ marginTop: '10px' }} fullWidth>Login</Button>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
