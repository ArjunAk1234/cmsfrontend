
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Plus, Edit2, Trash2, Eye, X, Upload } from 'lucide-react';

// export default function SectionManager({ table, fields }) {
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [editingId, setEditingId] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/${table}`;
//   const token = localStorage.getItem('adminToken');

//   useEffect(() => { fetchItems(); }, [table]);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
//       setItems(res.data);
//     } catch (err) { console.error("Fetch failed", err); }
//   };

//   // Convert File to Base64 for the database
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setIsUploading(true);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setFormData({ ...formData, image_url: reader.result });
//       setIsUploading(false);
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Clean data: remove 'id' or 'created_at' if they exist in formData before sending
//       const payload = { ...formData };
//       delete payload.id;
//       delete payload.created_at;

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         await axios.post(API_URL, payload, { headers: { Authorization: `Bearer ${token}` } });
//       }
      
//       resetForm();
//       fetchItems();
//       alert("Saved successfully!");
//     } catch (err) { alert("Error saving data"); }
//   };

//   const handleEditClick = (item) => {
//     setEditingId(item.id);
//     setFormData(item);
//     // Smooth scroll to top so user sees the form populated
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setFormData({});
//     setEditingId(null);
//   };

//   const deleteItem = async (id) => {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//       fetchItems();
//     }
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold capitalize text-gray-800">{table} Management</h2>
//         {editingId && (
//           <button onClick={resetForm} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300">
//             <X size={18}/> Cancel Edit
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* --- Editor Form --- */}
//         <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
//             {editingId ? <Edit2 size={18} className="text-blue-500"/> : <Plus size={18} className="text-green-500"/>} 
//             {editingId ? 'Edit Existing' : 'Add New'} {table.slice(0, -1)}
//           </h3>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {fields.map(f => (
//               <div key={f}>
//                 <label className="block text-sm font-medium text-gray-600 capitalize">{f.replace('_', ' ')}</label>
                
//                 {/* Special Case: Image Upload instead of just text URL */}
//                 {f === 'image_url' ? (
//                   <div className="mt-1 flex flex-col gap-2">
//                     <div className="flex items-center justify-center w-full">
//                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <Upload size={24} className="text-gray-400 mb-2" />
//                           <p className="text-sm text-gray-500">{isUploading ? "Processing..." : "Click to upload image"}</p>
//                         </div>
//                         <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                       </label>
//                     </div>
//                     <input 
//                       className="w-full p-2 border rounded text-xs text-gray-400 bg-gray-50" 
//                       placeholder="Or paste URL here"
//                       value={formData[f] || ''} 
//                       onChange={e => setFormData({...formData, [f]: e.target.value})} 
//                     />
//                   </div>
//                 ) : f === 'description' || f === 'content' || f === 'feedback' ? (
//                   <textarea 
//                     className="w-full p-2 border rounded mt-1 h-32 text-black focus:ring-2 focus:ring-blue-500 outline-none" 
//                     value={formData[f] || ''} 
//                     onChange={e => setFormData({...formData, [f]: e.target.value})} 
//                   />
//                 ) : (
//                   <input 
//                     className="w-full p-2 border rounded mt-1 text-black focus:ring-2 focus:ring-blue-500 outline-none" 
//                     value={formData[f] || ''} 
//                     onChange={e => setFormData({...formData, [f]: e.target.value})} 
//                   />
//                 )}
//               </div>
//             ))}
            
//             <button 
//               type="submit"
//               className={`w-full p-3 rounded-lg font-bold text-white transition shadow-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
//             >
//               {editingId ? 'Update & Save Changes' : 'Create New Entry'}
//             </button>
//           </form>
//         </section>

//         {/* --- Live Preview Pane --- */}
//         <section className="bg-slate-900 text-white p-6 rounded-xl shadow-inner sticky top-8 h-fit">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
//             <Eye size={18}/> Live Preview
//           </h3>
//           <div className="p-4 bg-slate-800 rounded-lg border border-dashed border-slate-600">
//              <div className="max-w-sm bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden mx-auto">
//                {formData.image_url ? (
//                  <img src={formData.image_url} className="h-48 w-full object-cover" alt="Preview"/>
//                ) : (
//                  <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image Provided</div>
//                )}
//                <div className="p-5">
//                  <h4 className="text-xl font-bold text-gray-800">{formData.title || formData.name || 'Title Preview'}</h4>
//                  <p className="text-sm text-gray-500 mt-2 line-clamp-4">
//                     {formData.description || formData.content || formData.feedback || 'Content will appear here as you type...'}
//                  </p>
                 
//                </div>
//              </div>
//           </div>
//           <p className="text-center text-slate-500 text-xs mt-4 italic">This is how the card will look on your portfolio website.</p>
//         </section>
//       </div>

//       {/* --- Data List Table --- */}
//       <section className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-4 font-semibold text-gray-600">Existing Content</th>
//               <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(item => (
//               <tr key={item.id} className={`border-b hover:bg-gray-50 transition ${editingId === item.id ? 'bg-blue-50' : ''}`}>
//                 <td className="p-4">
//                   <div className="flex items-center gap-4">
//                     {item.image_url && <img src={item.image_url} className="w-12 h-12 rounded object-cover border" alt="thumb" />}
//                     <div>
//                       <div className="font-bold text-gray-900">{item.title || item.name}</div>
//                       <div className="text-xs text-gray-400 uppercase">{item.category || item.company || table}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4 text-right space-x-2">
//                   <button 
//                     onClick={() => handleEditClick(item)} 
//                     className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
//                     title="Edit Item"
//                   >
//                     <Edit2 size={20}/>
//                   </button>
//                   <button 
//                     onClick={() => deleteItem(item.id)} 
//                     className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
//                     title="Delete Item"
//                   >
//                     <Trash2 size={20}/>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {items.length === 0 && (
//               <tr><td colSpan="2" className="p-10 text-center text-gray-400 italic">No items found in this section.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Eye, X, Upload, Mail, Clock, User } from 'lucide-react';

export default function SectionManager({ table, fields }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const isMessages = table === 'messages'; // Check if we are in the Inbox
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/${table}`;
  const token = localStorage.getItem('adminToken');

  useEffect(() => { fetchItems(); }, [table]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setItems(res.data);
    } catch (err) { console.error("Fetch failed", err); }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, image_url: reader.result });
      setIsUploading(false);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      delete payload.id; delete payload.created_at;
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(API_URL, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      resetForm(); fetchItems();
    } catch (err) { alert("Error saving data"); }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => { setFormData({}); setEditingId(null); };

  const deleteItem = async (id) => {
    if (window.confirm("Delete this permanently?")) {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchItems();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold capitalize text-gray-800">
            {isMessages ? "Inbox (Messages)" : `${table} Management`}
        </h2>
        {editingId && (
          <button onClick={resetForm} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-gray-700">
            <X size={18}/> Cancel Edit
          </button>
        )}
      </div>

      {/* Hide Form and Preview if we are viewing Messages */}
      {!isMessages && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
              {editingId ? <Edit2 size={18} className="text-blue-500"/> : <Plus size={18} className="text-green-500"/>} 
              {editingId ? 'Edit Item' : 'Add New Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(f => (
                <div key={f}>
                  <label className="block text-sm font-medium text-gray-600 capitalize">{f.replace('_', ' ')}</label>
                  {f === 'image_url' ? (
                    <div className="mt-1 flex flex-col gap-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <Upload size={24} className="text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">{isUploading ? "Uploading..." : "Click to upload image"}</p>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                  ) : f === 'description' || f === 'content' || f === 'feedback' ? (
                    <textarea className="w-full p-2 border rounded mt-1 h-32 text-black outline-none" value={formData[f] || ''} onChange={e => setFormData({...formData, [f]: e.target.value})} />
                  ) : (
                    <input className="w-full p-2 border rounded mt-1 text-black outline-none" value={formData[f] || ''} onChange={e => setFormData({...formData, [f]: e.target.value})} />
                  )}
                </div>
              ))}
              <button type="submit" className="w-full p-3 rounded-lg font-bold text-white transition bg-blue-600 hover:bg-blue-700">
                {editingId ? 'Update & Save' : 'Create Entry'}
              </button>
            </form>
          </section>

          <section className="bg-slate-900 text-white p-6 rounded-xl shadow-inner sticky top-8 h-fit">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400"><Eye size={18}/> Live Preview</h3>
            <div className="p-4 bg-slate-800 rounded-lg border border-dashed border-slate-600">
               <div className="max-w-sm bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden mx-auto">
                 {formData.image_url && <img src={formData.image_url} className="h-48 w-full object-cover" alt="Preview"/>}
                 <div className="p-5">
                   <h4 className="text-xl font-bold">{formData.title || formData.name || 'Preview Title'}</h4>
                   <p className="text-sm text-gray-500 mt-2 line-clamp-4">{formData.description || formData.content || formData.feedback || 'Type something...'}</p>
                 </div>
               </div>
            </div>
          </section>
        </div>
      )}

      {/* --- Data List / Messages List --- */}
      <section className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {isMessages ? (
          // Custom Layout for Messages
          <div className="divide-y divide-gray-100">
            {items.map(msg => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 transition flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-900 flex items-center gap-2"><User size={16} className="text-blue-500"/> {msg.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2"><Mail size={16}/> {msg.email}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700 italic border-l-4 border-blue-400 whitespace-pre-wrap">
                    "{msg.message}"
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1 uppercase">
                    <Clock size={12}/> {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                <button onClick={() => deleteItem(msg.id)} className="ml-4 p-2 text-gray-300 hover:text-red-600 transition">
                  <Trash2 size={20}/>
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Standard Table for Projects, Skills, etc.
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Entry</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={`border-b hover:bg-gray-50 transition ${editingId === item.id ? 'bg-blue-50' : ''}`}>
                  <td className="p-4 flex items-center gap-4">
                    {item.image_url && <img src={item.image_url} className="w-12 h-12 rounded object-cover border" alt="thumb" />}
                    <div>
                      <div className="font-bold text-gray-900">{item.title || item.name}</div>
                      <div className="text-xs text-gray-400 uppercase">{item.category || item.role || table}</div>
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEditClick(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"><Edit2 size={20}/></button>
                    <button onClick={() => deleteItem(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"><Trash2 size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {items.length === 0 && <div className="p-10 text-center text-gray-400 italic">No entries found.</div>}
      </section>
    </div>
  );
}