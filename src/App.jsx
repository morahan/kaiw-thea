import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './App.css';

const agent = { name: 'Thea', emoji: '🏛️', role: 'Brand Strategist', color: '#8b5cf6' };

const sentimentData = [
  { name: 'Positive', value: 72, color: '#22c55e' },
  { name: 'Neutral', value: 18, color: '#6b7280' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const channelData = [
  { channel: 'Twitter', reach: 45000, engagement: 4.2 },
  { channel: 'Instagram', reach: 28000, engagement: 5.8 },
  { channel: 'LinkedIn', reach: 12000, engagement: 3.1 },
  { channel: 'YouTube', reach: 8500, engagement: 6.2 },
];

const campaigns = [
  { id: 1, name: 'AI Workout Launch', status: 'active', reach: 125000, engagement: 4.8 },
  { id: 2, name: 'Fitness Trends Q1', status: 'active', reach: 89000, engagement: 5.2 },
  { id: 3, name: 'User Testimonials', status: 'planning', reach: 0, engagement: 0 },
  { id: 4, name: 'Partner Integration', status: 'active', reach: 45000, engagement: 3.9 },
];

function App() {
  const [brand] = useState({ mentions: 1240, sentiment: 72, share: 12.5 });

  return (
    <div className="dashboard">
      <header style={{ '--color': agent.color }}>
        <span className="emoji">{agent.emoji}</span>
        <div>
          <h1>{agent.name}</h1>
          <p>{agent.role}</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat">
          <span>Brand Mentions</span>
          <strong>{brand.mentions.toLocaleString()}</strong>
          <span className="trend positive">↑ 23%</span>
        </div>
        <div className="stat">
          <span>Sentiment Score</span>
          <strong>{brand.sentiment}%</strong>
          <span className="trend positive">↑ 5%</span>
        </div>
        <div className="stat">
          <span>Share of Voice</span>
          <strong>{brand.share}%</strong>
          <span className="trend positive">↑ 1.2%</span>
        </div>
        <div className="stat">
          <span>Active Campaigns</span>
          <strong>3</strong>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Brand Sentiment</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {sentimentData.map(s => (
              <div key={s.name} className="legend-item">
                <span style={{ backgroundColor: s.color }}></span>
                {s.name}: {s.value}%
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h3>Channel Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="channel" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none' }} />
              <Bar dataKey="reach" fill={agent.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section">
        <h2>📢 Campaign Overview</h2>
        <div className="campaign-list">
          {campaigns.map(campaign => (
            <div key={campaign.id} className={`campaign-item ${campaign.status}`}>
              <div className="campaign-info">
                <span className="campaign-name">{campaign.name}</span>
                <span className={`status-badge ${campaign.status}`}>{campaign.status}</span>
              </div>
              {campaign.status === 'active' && (
                <div className="campaign-stats">
                  <span>Reach: {campaign.reach.toLocaleString()}</span>
                  <span>Eng: {campaign.engagement}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
