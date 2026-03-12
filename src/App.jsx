import { useState, useEffect } from 'react'
import './App.css'

// Mock data - in production this would come from Notion API
const reviewHistory = [
  { id: 'REV-001', title: 'Dead Hangs', author: 'Renzo', verdict: 'revise', score: 8.5, date: '2026-02-17', type: 'article' },
  { id: 'REV-002', title: 'Loaded Carries', author: 'Renzo', verdict: 'revise', score: 7.5, date: '2026-02-17', type: 'article' },
  { id: 'REV-003', title: 'Muscle Growth 101', author: 'Kaia', verdict: 'ship', score: 9.2, date: '2026-02-16', type: 'article' },
  { id: 'REV-004', title: 'HIIT Mistakes', author: 'Renzo', verdict: 'kill', score: 4.2, date: '2026-02-16', type: 'article' },
  { id: 'REV-005', title: 'Morning Warmup', author: 'Kaia', verdict: 'ship', score: 8.8, date: '2026-02-15', type: 'article' },
  { id: 'REV-006', title: 'Squat Deep', author: 'Renzo', verdict: 'revise', score: 7.9, date: '2026-02-15', type: 'article' },
]

const pendingReviews = [
  { id: 1, title: 'Mobility Flow', author: 'Renzo', submitted: '10m ago', type: 'article', preview: 'Unlock your hips with these proven mobility drills. Based on the latest research from the Journal of Sports Science...', wordCount: 1100 },
  { id: 2, title: 'Squat Form Guide', author: 'Renzo', submitted: '2h ago', type: 'article', preview: 'The king of exercises deserves respect. Here is proper form for maximum gains and injury prevention...', wordCount: 1450 },
  { id: 3, title: 'Morning Routine', author: 'Kaia', submitted: '4h ago', type: 'social', preview: '5 moves to start your day right. No equipment needed.', wordCount: 180 },
]

function App() {
  const [time, setTime] = useState(new Date())
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedReview, setSelectedReview] = useState(null)
  const [voiceText, setVoiceText] = useState('')
  const [voiceGenerating, setVoiceGenerating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const keyStats = {
    pendingReviews: pendingReviews.length,
    shippedToday: reviewHistory.filter(r => r.verdict === 'ship').length,
    avgScore: (reviewHistory.reduce((a, b) => a + b.score, 0) / reviewHistory.length).toFixed(1),
    approvalRate: Math.round((reviewHistory.filter(r => r.verdict === 'ship').length / reviewHistory.length) * 100),
  }

  const handleVerdict = (verdict) => {
    alert(`${verdict.toUpperCase()} - This would trigger the review kickback workflow.`)
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">Θ</span>
          <span className="logo-text">Thea</span>
        </div>
        <nav className="top-nav">
          <button className={`nav-btn ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>Dashboard</button>
          <button className={`nav-btn ${activeView === 'reviews' ? 'active' : ''}`} onClick={() => setActiveView('reviews')}>Reviews</button>
          <button className={`nav-btn ${activeView === 'voice' ? 'active' : ''}`} onClick={() => setActiveView('voice')}>Voice</button>
          <button className={`nav-btn ${activeView === 'history' ? 'active' : ''}`} onClick={() => setActiveView('history')}>History</button>
        </nav>
        <div className="header-right">
          <span className="status-dot online"></span>
          <span className="time">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      <main className="main">
        {activeView === 'dashboard' && (
          <>
            <section className="key-metrics">
              <div className="metric" onClick={() => setActiveView('reviews')}>
                <div className="metric-number warning">{keyStats.pendingReviews}</div>
                <div className="metric-label">Pending</div>
              </div>
              <div className="metric">
                <div className="metric-number success">{keyStats.shippedToday}</div>
                <div className="metric-label">Shipped</div>
              </div>
              <div className="metric">
                <div className="metric-number">{keyStats.avgScore}</div>
                <div className="metric-label">Avg Score</div>
              </div>
              <div className="metric">
                <div className="metric-number">{keyStats.approvalRate}%</div>
                <div className="metric-label">Approval</div>
              </div>
            </section>

            <div className="two-col">
              <section className="section">
                <div className="section-header">
                  <h2>⏳ Pending Reviews</h2>
                  <span className="badge warning">{pendingReviews.length}</span>
                </div>
                <div className="card-list">
                  {pendingReviews.slice(0, 3).map(item => (
                    <div key={item.id} className="card pending" onClick={() => { setSelectedReview(item); setActiveView('reviews'); }}>
                      <div className="card-content">
                        <h3>{item.title}</h3>
                        <span className="meta">{item.author} · {item.type} · {item.submitted}</span>
                      </div>
                      <span className="arrow">→</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <div className="section-header">
                  <h2>📊 Recent Verdicts</h2>
                </div>
                <div className="card-list">
                  {reviewHistory.slice(0, 3).map(item => (
                    <div key={item.id} className={`card ${item.verdict === 'ship' ? 'shipped' : item.verdict === 'kill' ? 'killed' : 'revised'}`}>
                      <div className="card-content">
                        <h3>{item.title}</h3>
                        <span className="meta">{item.author} · {item.date}</span>
                      </div>
                      <div className="verdict-badge" data-verdict={item.verdict}>{item.verdict}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="section">
              <div className="section-header">
                <h2>💎 Brand Standards</h2>
              </div>
              <div className="brand-grid">
                <div className="brand-item">
                  <span className="brand-icon">⚗️</span>
                  <div>
                    <h4>Scientific</h4>
                    <p>3-5 sources per article</p>
                  </div>
                </div>
                <div className="brand-item">
                  <span className="brand-icon">🏛️</span>
                  <div>
                    <h4>Elegant</h4>
                    <p>750-1,250 words</p>
                  </div>
                </div>
                <div className="brand-item">
                  <span className="brand-icon">🔥</span>
                  <div>
                    <h4>Warm</h4>
                    <p>No hype, just facts</p>
                  </div>
                </div>
                <div className="brand-item">
                  <span className="brand-icon">✨</span>
                  <div>
                    <h4>Confident</h4>
                    <p>Clear CTAs</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'reviews' && (
          <section className="reviews-view">
            <div className="section-header">
              {selectedReview && <button className="back-btn" onClick={() => setSelectedReview(null)}>← Back</button>}
              <h2>{selectedReview ? 'Review Detail' : 'Pending Queue'}</h2>
            </div>
            
            {selectedReview ? (
              <div className="review-detail">
                <div className="review-header">
                  <h3>{selectedReview.title}</h3>
                  <span className="review-meta">{selectedReview.author} · {selectedReview.type} · {selectedReview.wordCount} words</span>
                </div>
                <p className="preview">{selectedReview.preview}</p>
                
                <div className="checklist">
                  <h4>Quick Check</h4>
                  <label className="check-item"><input type="checkbox" /> Headline ≤10 words</label>
                  <label className="check-item"><input type="checkbox" /> 3-5 sources</label>
                  <label className="check-item"><input type="checkbox" /> Clear CTA</label>
                  <label className="check-item"><input type="checkbox" /> No fake experience</label>
                </div>

                <div className="review-actions">
                  <button className="btn btn-ship" onClick={() => handleVerdict('ship')}>✅ Ship</button>
                  <button className="btn btn-revise" onClick={() => handleVerdict('revise')}>🔄 Revise</button>
                  <button className="btn btn-kill" onClick={() => handleVerdict('kill')}>❌ Kill</button>
                </div>
              </div>
            ) : (
              <div className="review-list">
                {pendingReviews.map(item => (
                  <div key={item.id} className="review-item" onClick={() => setSelectedReview(item)}>
                    <div className="review-info">
                      <h4>{item.title}</h4>
                      <span>{item.author} · {item.wordCount} words</span>
                    </div>
                    <span className="review-time">{item.submitted}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeView === 'voice' && (
          <section className="voice-view">
            <div className="section-header"><h2>🎙️ Voice Engine</h2></div>
            
            <div className="voice-card">
              <div className="voice-status">
                <span className="status-indicator online"></span>
                <div>
                  <h3>Fish Speech</h3>
                  <p>thea-cori-v3 · 1.2x speed</p>
                </div>
              </div>
              
              <div className="voice-params">
                <h4>Parameters (Locked)</h4>
                <div className="params-grid">
                  <div className="param"><span>temp</span><span>0.2</span></div>
                  <div className="param"><span>top_p</span><span>0.7</span></div>
                  <div className="param"><span>rep_pen</span><span>1.0</span></div>
                  <div className="param"><span>seed</span><span>42</span></div>
                </div>
              </div>

              <div className="voice-test">
                <h4>Test Voice</h4>
                <textarea placeholder="Quality is the only message worth sending." value={voiceText} onChange={(e) => setVoiceText(e.target.value)} />
                <button className="btn btn-voice" disabled={voiceGenerating || !voiceText.trim()}>
                  {voiceGenerating ? 'Generating...' : '🎙️ Generate'}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeView === 'history' && (
          <section className="history-view">
            <div className="section-header"><h2>📜 Review History</h2></div>
            
            <div className="history-stats">
              <div className="hist-stat"><span className="hist-num">{reviewHistory.filter(r => r.verdict === 'ship').length}</span><span>Shipped</span></div>
              <div className="hist-stat"><span className="hist-num">{reviewHistory.filter(r => r.verdict === 'revise').length}</span><span>Revised</span></div>
              <div className="hist-stat"><span className="hist-num">{reviewHistory.filter(r => r.verdict === 'kill').length}</span><span>Killed</span></div>
            </div>

            <div className="history-list">
              {reviewHistory.map(item => (
                <div key={item.id} className="history-item">
                  <div className={`verdict-dot ${item.verdict}`}></div>
                  <div className="history-info">
                    <h4>{item.title}</h4>
                    <span>{item.author} · {item.date}</span>
                  </div>
                  <span className="history-score">{item.score}</span>
                  <span className={`verdict-tag ${item.verdict}`}>{item.verdict}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>Built by Thea 🏛️</span>
        <span>MiniMax M2.5</span>
      </footer>
    </div>
  )
}

export default App
