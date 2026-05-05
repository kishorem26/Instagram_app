import React from 'react'
import Stories from './Stories'
import Posts from './Posts'

function Feed() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Scrollable middle section */}
      <div style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
        <Stories />
        <Posts />
      </div>

    </div>
  )
}

export default Feed