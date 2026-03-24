import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getThreadsForUser, sendMessage } from '../utils/messagesStore';

export default function Messages() {
  const { user } = useAuth();
  const location = useLocation();
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      const userThreads = getThreadsForUser(user.id);
      setThreads(userThreads);
      
      if (location.state?.activeThreadId) {
        setActiveThreadId(location.state.activeThreadId);
      } else if (userThreads.length > 0) {
        setActiveThreadId(userThreads[0].id);
      }
    }
  }, [user, location.state]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeThreadId || !user) return;
    
    sendMessage(activeThreadId, user.id, newMessage);
    setThreads(getThreadsForUser(user.id));
    setNewMessage('');
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
      
      {/* Thread List */}
      <div className="glass-card" style={{ width: 300, marginRight: '1rem', display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
        <h3 style={{ padding: '0 1rem', marginBottom: '1rem' }}>Messages</h3>
        {threads.length === 0 ? (
          <p style={{ padding: '0 1rem', color: 'var(--text-secondary)' }}>No messages yet.</p>
        ) : (
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {threads.map(thread => {
              const otherId = thread.participants.find(id => id !== user.id);
              const otherUser = thread.participantDetails[otherId];
              const lastMessage = thread.messages[thread.messages.length - 1];
              
              return (
                <div 
                  key={thread.id} 
                  onClick={() => setActiveThreadId(thread.id)}
                  style={{ 
                    padding: '1rem', 
                    cursor: 'pointer',
                    background: activeThreadId === thread.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderLeft: activeThreadId === thread.id ? '3px solid var(--primary-accent)' : '3px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={otherUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${otherUser?.name}`} 
                      alt="" 
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {otherUser?.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {lastMessage ? lastMessage.text : 'New connection'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {activeThread ? (
          <>
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {(() => {
                const otherId = activeThread.participants.find(id => id !== user.id);
                const otherUser = activeThread.participantDetails[otherId];
                return (
                  <>
                    <img 
                      src={otherUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${otherUser?.name}`} 
                      alt="" 
                      style={{ width: 48, height: 48, borderRadius: '50%' }}
                    />
                    <h3 style={{ margin: 0 }}>{otherUser?.name}</h3>
                  </>
                );
              })()}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeThread.messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                  Send a message to start the conversation!
                </div>
              ) : (
                activeThread.messages.map(msg => {
                  const isMine = msg.senderId === user.id;
                  return (
                    <div key={msg.id} style={{ alignSelf: isMine ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                      <div style={{ 
                        background: isMine ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)', 
                        padding: '0.75rem 1rem', 
                        borderRadius: isMine ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                        color: isMine ? 'white' : 'var(--text-primary)'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: isMine ? 'right' : 'left' }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder="Type your message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>Send</button>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            Select a conversation to start chatting
          </div>
        )}
      </div>

    </div>
  );
}
