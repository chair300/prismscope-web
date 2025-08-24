import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DemoHeader from './components/DemoHeader';
import ChatInterface from './components/ChatInterface';
import PriorDiscoveries from './components/PriorDiscoveries';
import InsightsReport from './components/InsightsReport';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DemoHeader />
      
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/discoveries" element={<PriorDiscoveries />} />
        <Route path="/insights" element={<InsightsReport />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;