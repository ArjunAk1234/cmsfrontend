import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setToken(res.data.token);
    } catch (err) { alert("Login Failed"); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">CMS Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 bg-gray-700 rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-6 bg-gray-700 rounded" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition">Enter Dashboard</button>
      </form>
    </div>
  );
}