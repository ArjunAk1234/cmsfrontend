import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import MessagesManager from './components/MessagesManager';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/admin" />} />
        <Route path="/admin/*" element={token ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
        <Route path="messages" element={<MessagesManager />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
