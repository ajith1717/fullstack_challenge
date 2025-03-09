import React from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
// import SocialLogin from '../components/SocialLogin';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {
    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample"
                    />
                </MDBCol>
                <MDBCol col='4' md='6'>
                    {/* <SocialLogin /> */}
                    <LoginForm />
                </MDBCol>
            </MDBRow>
            <Footer />
        </MDBContainer>
    );
};

export default LoginPage;
