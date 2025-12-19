import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AboutManager() {
  const [data, setData] = useState({ bio: '', sub_bio: '', image_url: '' });
  const token = localStorage.getItem('adminToken');
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}`
  useEffect(() => {
    axios.get(`${API_URL}/about`).then(res => setData(res.data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}/admin/about`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Edit My Bio</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="w-full p-2 border rounded text-black" placeholder="Image URL" value={data.image_url} onChange={e => setData({...data, image_url: e.target.value})} />
        <textarea className="w-full p-2 border rounded h-32 text-black" placeholder="Main Bio" value={data.bio} onChange={e => setData({...data, bio: e.target.value})} />
        <textarea className="w-full p-2 border rounded h-20 text-black" placeholder="Sub Headline" value={data.sub_bio} onChange={e => setData({...data, sub_bio: e.target.value})} />
        <button className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700">Update Portfolio Info</button>
      </form>
    </div>
  );
}