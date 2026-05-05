import React, { useEffect, useState } from 'react'

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '15px',
      padding: '15px 12px',
      overflowX: 'auto',
      borderBottom: '1px solid #dbdbdb',
      backgroundColor: '#fff',
      scrollbarWidth: 'none'
    }}>

      {/* Your Story */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', color: '#fff'
        }}>
          +
        </div>
        <span style={{ fontSize: '12px' }}>Your Story</span>
      </div>

      {/* Stories */}
      {stories.map((story) => (
        <div key={story.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <div style={{
            padding: '2px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          }}>
            <div style={{ padding: '2px', background: '#fff', borderRadius: '50%' }}>
              <img
                src={story.profile_pic}
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
          <span style={{ fontSize: '12px', maxWidth: '60px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {story.username}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Stories