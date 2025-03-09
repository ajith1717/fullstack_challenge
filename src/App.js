import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProfileEdit from './components/ProfileEdit';
import VerificationPending from './components/VerificationPending';

const isAuthenticated = () => {
    return !!localStorage.getItem('user'); // Replace with your auth check logic
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
                <Route path='/profile-edit' element={<PrivateRoute element={<ProfileEdit />} />} />
                <Route path='/verification-pending' element={<PrivateRoute element={<VerificationPending />} />} />
                <Route path='*' element={<Navigate to="/login" />} /> {/* Redirect unknown routes */}
            </Routes>
        </Router>
    );
}

export default App;
