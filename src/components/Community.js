import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  // Sample data - In a real app, this would come from an API
  const posts = [
    {
      id: 1,
      user: 'Environmental Club',
      avatar: '🌱',
      content: 'Join us for the Campus Water Conservation Workshop this Friday! Learn practical tips to save water in your daily routine.',
      likes: 45,
      comments: 12,
      timestamp: '2 hours ago',
      tags: ['workshop', 'conservation']
    },
    {
      id: 2,
      user: 'Engineering Department',
      avatar: '⚡',
      content: 'Our new smart water meters have helped reduce water wastage by 30% in the engineering building! Check out the real-time data on the dashboard.',
      likes: 89,
      comments: 23,
      timestamp: '5 hours ago',
      tags: ['innovation', 'technology']
    },
    {
      id: 3,
      user: 'Student Council',
      avatar: '👥',
      content: 'Proud to announce that our campus has saved over 1 million gallons of water this semester through our collective conservation efforts!',
      likes: 156,
      comments: 34,
      timestamp: '1 day ago',
      tags: ['achievement', 'sustainability']
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Science Building',
      score: 2150,
      change: 'up',
      savings: '45%'
    },
    {
      rank: 2,
      name: 'Library',
      score: 1890,
      change: 'up',
      savings: '38%'
    },
    {
      rank: 3,
      name: 'Student Center',
      score: 1650,
      change: 'down',
      savings: '35%'
    },
    {
      rank: 4,
      name: 'Sports Complex',
      score: 1520,
      change: 'up',
      savings: '32%'
    },
    {
      rank: 5,
      name: 'Arts Building',
      score: 1340,
      change: 'same',
      savings: '28%'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Water Conservation Workshop',
      date: 'Dec 30, 2024',
      time: '2:00 PM',
      location: 'Main Auditorium',
      attendees: 45,
      type: 'workshop'
    },
    {
      id: 2,
      title: 'Campus Leak Hunt Challenge',
      date: 'Jan 5, 2025',
      time: '10:00 AM',
      location: 'Campus Wide',
      attendees: 120,
      type: 'activity'
    },
    {
      id: 3,
      title: 'Sustainable Technology Expo',
      date: 'Jan 15, 2025',
      time: '11:00 AM',
      location: 'Science Building',
      attendees: 200,
      type: 'expo'
    }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle post submission
    setNewPost('');
  };

  return (
    <div className="community-container">
      <div className="community-header">
        <h1>Community Hub</h1>
        <p>Connect, Share, and Make a Difference Together</p>
      </div>

      <div className="community-tabs">
        <button 
          className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          Feed
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
      </div>

      <div className="community-content">
        {activeTab === 'feed' && (
          <div className="feed-section">
            <div className="create-post">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your water conservation story..."
                />
                <div className="post-actions">
                  <button type="button" className="attach-btn">📎 Attach</button>
                  <button type="submit" className="share-btn">Share</button>
                </div>
              </form>
            </div>

            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <span className="avatar">{post.avatar}</span>
                    <div className="post-info">
                      <h3>{post.user}</h3>
                      <span className="timestamp">{post.timestamp}</span>
                    </div>
                  </div>
                  <div className="post-content">{post.content}</div>
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="post-actions">
                    <button className="action-btn">
                      👍 {post.likes}
                    </button>
                    <button className="action-btn">
                      💬 {post.comments}
                    </button>
                    <button className="action-btn">
                      ↗️ Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <div className="leaderboard-header">
              <h2>Conservation Champions</h2>
              <p>Buildings leading the way in water conservation</p>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((item, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="rank">#{item.rank}</div>
                  <div className="building-info">
                    <h3>{item.name}</h3>
                    <div className="stats">
                      <span className="score">{item.score} points</span>
                      <span className="savings">{item.savings} saved</span>
                    </div>
                  </div>
                  <div className={`trend ${item.change}`}>
                    {item.change === 'up' ? '↑' : item.change === 'down' ? '↓' : '−'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <div className="events-header">
              <h2>Upcoming Events</h2>
              <p>Join these events to make a bigger impact</p>
            </div>
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className={`event-card ${event.type}`}>
                  <div className="event-type-icon">
                    {event.type === 'workshop' ? '🎓' : 
                     event.type === 'activity' ? '🎯' : '🎪'}
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <p>📅 {event.date}</p>
                    <p>⏰ {event.time}</p>
                    <p>📍 {event.location}</p>
                  </div>
                  <div className="event-footer">
                    <span className="attendees">👥 {event.attendees} attending</span>
                    <button className="join-btn">Join Event</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
