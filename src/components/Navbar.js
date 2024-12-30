import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getInitials = (email) => {
    if (!email) return '?';
    const parts = email.split('@')[0].split('.');
    return parts.map(part => part[0].toUpperCase()).join('');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        💧 WaterWise
      </Link>
      
      <button 
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/water-usage" className="nav-item" onClick={() => setIsOpen(false)}>
          Water Usage
        </Link>
        <Link to="/report-leak" className="nav-item" onClick={() => setIsOpen(false)}>
          Report Leak
        </Link>
        <Link to="/community" className="nav-item" onClick={() => setIsOpen(false)}>
          Community
        </Link>
        <Link to="/games" className="nav-item" onClick={() => setIsOpen(false)}>
          Games
        </Link>
        <Link to="/virtual-reality" className="nav-item" onClick={() => setIsOpen(false)}>
          VR Experience
        </Link>
        
        {currentUser && (
          <div className="profile-menu-container" ref={profileMenuRef}>
            <button 
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="Profile menu"
            >
              <div className="profile-avatar">
                {getInitials(currentUser.email)}
              </div>
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar large">
                    {getInitials(currentUser.email)}
                  </div>
                  <div className="profile-info">
                    <span className="profile-name">{currentUser.email}</span>
                  </div>
                </div>
                <div className="profile-menu-items">
                  <button className="profile-menu-item" onClick={() => {
                    navigate('/profile');
                    setShowProfileMenu(false);
                  }}>
                    <i className="fas fa-user"></i>
                    Profile Settings
                  </button>
                  <button className="profile-menu-item">
                    <i className="fas fa-bell"></i>
                    Notifications
                  </button>
                  <button className="profile-menu-item">
                    <i className="fas fa-chart-line"></i>
                    Water Stats
                  </button>
                  <button className="profile-menu-item">
                    <i className="fas fa-cog"></i>
                    Preferences
                  </button>
                  <button className="profile-menu-item">
                    <i className="fas fa-question-circle"></i>
                    Help & Support
                  </button>
                  <button className="profile-menu-item logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
