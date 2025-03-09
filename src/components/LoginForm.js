import React from 'react';
import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

const LoginForm = () => {
    return (
        <>
            <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" />

            <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="#!">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                    Don't have an account? <a href="#!" className="link-danger">Register</a>
                </p>
            </div>
        </>
    );
};

export default LoginForm;
