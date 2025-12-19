import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Code, Briefcase, FileText, MessageSquare, Star, Settings, LogOut } from 'lucide-react';
import SectionManager from '../components/SectionManager';
import AboutManager from '../components/AboutManager';

export default function Dashboard({ logout }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold mb-8 flex items-center gap-2 text-blue-400">
          <Settings size={24} /> Admin CMS
        </h1>
        <SidebarLink to="/admin/about" icon={<User size={20}/>} label="About Me" />
        <SidebarLink to="/admin/skills" icon={<Code size={20}/>} label="Skills" />
        <SidebarLink to="/admin/projects" icon={<Briefcase size={20}/>} label="Projects" />
        <SidebarLink to="/admin/blogs" icon={<FileText size={20}/>} label="Blogs" />
        <SidebarLink to="/admin/experience" icon={<LayoutDashboard size={20}/>} label="Experience" />
        <SidebarLink to="/admin/testimonials" icon={<Star size={20}/>} label="Testimonials" />
        <SidebarLink to="/admin/messages" icon={<MessageSquare size={20}/>} label="Messages" />
        
        <button onClick={logout} className="flex items-center gap-3 p-3 w-full mt-10 text-red-400 hover:bg-gray-800 rounded transition">
          <LogOut size={20} /> Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="about" element={<AboutManager />} />
          <Route path="skills" element={<SectionManager table="skills" fields={['name', 'level', 'category']} />} />
          <Route path="projects" element={<SectionManager table="projects" fields={['title', 'description', 'image_url', 'live_link', 'github_link', 'tags']} />} />
          <Route path="blogs" element={<SectionManager table="blogs" fields={['title', 'content', 'image_url']} />} />
          <Route path="experience" element={<SectionManager table="experience" fields={['company', 'role', 'duration', 'description']} />} />
          <Route path="testimonials" element={<SectionManager table="testimonials" fields={['name', 'position', 'feedback', 'image_url']} />} />
        </Routes>
      </main>
    </div>
  );
}

const SidebarLink = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded transition text-gray-300 hover:text-white">
    {icon} {label}
  </Link>
);