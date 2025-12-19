import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Mail, User, Clock, MessageSquare } from 'lucide-react';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/messages`;
  const token = localStorage.getItem('adminToken');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setMessages(res.data);
      alert(res.data)
    } catch (err) { console.error("Failed to fetch messages"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message forever?")) {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchMessages();
    }
  };

  if (loading) return <div className="p-8 text-gray-500 font-mono">Loading_Messages...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <MessageSquare className="text-blue-600" /> Inbox
      </h2>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl border border-dashed text-gray-400">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <User size={16} className="text-blue-500" /> {msg.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail size={14} /> {msg.email}
                  </p>
                </div>
                <button onClick={() => deleteMessage(msg.id)} className="text-gray-300 hover:text-red-600 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 border-l-4 border-blue-400">
                {msg.message}
              </div>
              <div className="mt-3 text-[10px] text-gray-400 flex items-center gap-1 uppercase font-mono">
                <Clock size={12} /> {new Date(msg.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}