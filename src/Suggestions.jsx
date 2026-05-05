import React, { useEffect, useState } from 'react'

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [followed, setFollowed] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }, []);

  const toggleFollow = (userId) => {
    setFollowed(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div style={{ padding: '20px 10px', width: '280px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#8e8e8e' }}>Suggested for you</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>See All</span>
      </div>

      {/* Users */}
      {users.map((user) => (
        <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={user.profile_pic}
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{user.username}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#8e8e8e' }}>{user.bio}</p>
            </div>
          </div>

          <button
            onClick={() => toggleFollow(user.id)}
            style={{
              border: 'none',
              background: 'none',
              color: followed[user.id] ? '#8e8e8e' : '#0095f6',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {followed[user.id] ? 'Following' : 'Follow'}
          </button>

        </div>
      ))}
    </div>
  )
}

export default Suggestions