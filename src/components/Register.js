import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import authService from '../services/authService';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await authService.register(name, email, password);
        if (response.success) {
            navigate('/login');
        } else {
            setError(response.message);
        }
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <MDBInput label='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBInput label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='text-danger'>{error}</p>}
                    <MDBBtn onClick={handleRegister}>Register</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
