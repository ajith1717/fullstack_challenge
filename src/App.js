import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProfileEdit from './components/ProfileEdit';
import VerificationPending from './components/VerificationPending';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile-edit' element={<ProfileEdit />} />
                <Route path='/verification-pending' element={<VerificationPending />} />
            </Routes>
        </Router>
    );
}

export default App;