import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('insta_user')
    navigate('/login')
  }

  return (
    <div className="m-3">
      <div className='d-flex flex-column gap-3'>
        <img className="logo-text" src="src/assets/instagram-text.png" alt=""/>
        <div><button onClick={() => navigate('/')}><i className="bi bi-house-door"></i>Home</button></div>
        <div><i className="bi bi-search"></i>Search</div>
        <div><i className="bi bi-compass"></i>Explore</div>
        <div><i className="bi bi-play-btn"></i>Reels</div>
        <div><i className="bi bi-chat-dots"></i>Messages</div>
        <div><i className="bi bi-heart"></i>Notification</div>
        <div><i className="bi bi-plus-square"></i>Create</div>
        <div><button onClick={() => navigate('/profile')}><i className="bi bi-person-circle"></i>Profile</button></div>
      </div>
      <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>
        <div><i className="bi bi-threads"></i>Thread</div>
        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <i className="bi bi-box-arrow-left"></i> Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar