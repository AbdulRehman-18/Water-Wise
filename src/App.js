import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WaterUsage from './components/WaterUsage';
import ReportLeak from './components/ReportLeak';
import Community from './components/Community';
import Games from './components/Games';
import VirtualReality from './components/VirtualReality';
import AIAssistant from './components/AIAssistant';
import WaterQuiz from './components/games/WaterQuiz';
import Login from './components/auth/Login';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Home />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/water-usage"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <WaterUsage />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/report-leak"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <ReportLeak />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Community />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Games />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/games/quiz"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <WaterQuiz />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/virtual-reality"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <VirtualReality />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/ai-assistant"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <AIAssistant />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
