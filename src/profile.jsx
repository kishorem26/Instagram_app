import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import './profile.css'

const initialProfile = {
  username: 'suren_02',
  name: 'Suren',
  bio: 'Hello everyone',
  threads: 'suren',
  followers: 248,
  following: 183,
  avatar: '/images/myprofile.jpg',
}

const initialHighlights = [
  { id: 1, label: '•', cover: null },
  { id: 2, label: '🍽', cover: null },
  { id: 3, label: '👁', cover: null },
  { id: 4, label: '🚗', cover: null },
  { id: 5, label: 'trip', cover: null },
]

const initialPosts = [
  { id: 1, url: '/images/postimage1.jpg', type: 'image' },
  { id: 2, url: '/images/postimage2.jpg', type: 'image' },
  { id: 3, url: '/images/postimage3.jpg', type: 'image' },
  { id: 4, url: '/images/postimage4.jpg', type: 'image' },
]

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile)
  const [posts, setPosts] = useState(initialPosts)
  const [highlights, setHighlights] = useState(initialHighlights)
  const [activeTab, setActiveTab] = useState('grid')
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({ ...initialProfile })
  const [deleteMode, setDeleteMode] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [pendingHighlightId, setPendingHighlightId] = useState(null)

  const avatarInputRef = useRef()
  const postInputRef = useRef()
  const highlightInputRef = useRef()

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setProfile((p) => ({ ...p, avatar: url }))
    if (editOpen) setEditData((d) => ({ ...d, avatar: url }))
  }

  const handleAddPost = (e) => {
    const files = Array.from(e.target.files)
    const newPosts = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
    }))
    setPosts((p) => [...newPosts, ...p])
    e.target.value = ''
  }

  const handleDeletePost = (id) => {
    setPosts((p) => p.filter((post) => post.id !== id))
  }

  const handleHighlightCover = (e) => {
    const file = e.target.files[0]
    if (!file || !pendingHighlightId) return
    const url = URL.createObjectURL(file)
    setHighlights((h) =>
      h.map((hl) => (hl.id === pendingHighlightId ? { ...hl, cover: url } : hl))
    )
    e.target.value = ''
    setPendingHighlightId(null)
  }

  const handleSaveEdit = () => {
    setProfile({ ...editData })
    setEditOpen(false)
  }

  return (
    <div className="page">

      {/* TOP NAV */}
      <div className="topNav">
        <div className="navLeft">
          <span className="plusIcon">+</span>
        </div>
        <div className="navCenter">
          <span className="navUsername">{profile.username}</span>
        </div>
        <div className="navRight">
          <i className="bi bi-threads navIcon"></i>
          <span className="navIcon">☰</span>
        </div>
      </div>

      {/* PROFILE ROW */}
      <div className="profileRow">
        <div className="avatarWrap">
          <div className="avatarRing" onClick={() => avatarInputRef.current.click()}>
            {profile.avatar
              ? <img src={profile.avatar} alt="avatar" className="avatarImg" />
              : <div className="avatarEmpty">👤</div>}
          </div>
          <div className="addBtn" onClick={() => avatarInputRef.current.click()}>+</div>
          <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </div>

        <div className="statsCol">
          <p className="displayName">{profile.name}</p>
          <div className="statsRow">
            {[
              { v: posts.length, l: 'posts' },
              { v: profile.followers, l: 'followers' },
              { v: profile.following, l: 'following' },
            ].map((st) => (
              <div key={st.l} className="statBox">
                <span className="statNum">{st.v}</span>
                <span className="statTxt">{st.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BIO */}
      <div className="bioWrap">
        <p className="displayName" style={{ fontSize: 15 }}>{profile.name}</p>
        {profile.bio.split('\n').map((line, i) => (
          <p key={i} className="bioLine">{line || '\u00a0'}</p>
        ))}
        {profile.threads && (
          <p className="threadsRow">
            <i className="bi bi-threads" style={{ marginRight: 5 }}></i>
            {profile.threads}
          </p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="actionRow">
        <button className="actionBtn" onClick={() => { setEditData({ ...profile }); setEditOpen(true) }}>
          Edit profile
        </button>
        <button className="actionBtn">Share profile</button>
        <button className="iconBtn">
          <i className="bi bi-person-add"></i>
        </button>
      </div>

      {/* HIGHLIGHTS */}
      <div className="hlRow">
        <div className="hlItem">
          <div className="hlCircle hlCircleNew" onClick={() => postInputRef.current.click()}>
            <span style={{ fontSize: 28, color: '#fff' }}>+</span>
          </div>
          <span className="hlLabel">New</span>
        </div>
        {highlights.map((hl) => (
          <div key={hl.id} className="hlItem">
            <div className="hlCircle" onClick={() => { setPendingHighlightId(hl.id); highlightInputRef.current.click() }}>
              {hl.cover
                ? <img src={hl.cover} alt="" className="hlImg" />
                : <div className="hlEmpty" />}
            </div>
            <span className="hlLabel">{hl.label}</span>
          </div>
        ))}
        <input ref={highlightInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleHighlightCover} />
      </div>

      {/* TABS */}
      <div className="tabs">
        {[
          { id: 'grid', icon: 'bi bi-grid-3x3-gap-fill' },
          { id: 'reels', icon: 'bi bi-play-btn' },
          { id: 'repeat', icon: 'bi bi-repeat' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tabBtn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon}></i>
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid">
        <div className="addTile" onClick={() => postInputRef.current.click()}>
          <span className="addTileIcon">+</span>
          <span className="addTileTxt">Add photo</span>
        </div>
        <input ref={postInputRef} type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={handleAddPost} />
        {posts.map((post) => (
          <div key={post.id} className="gridCell">
            {post.type === 'video'
              ? <video src={post.url} className="gridMedia" muted loop playsInline />
              : <img src={post.url} alt="" className="gridMedia" onClick={() => !deleteMode && setLightbox(post.url)} />}
            {deleteMode && (
              <button className="delBtn" onClick={() => handleDeletePost(post.id)}>✕</button>
            )}
          </div>
        ))}
      </div>

      {posts.length > 0 && (
        <button className="toggleDelBtn" onClick={() => setDeleteMode((d) => !d)}>
          {deleteMode ? '✓ Done' : '🗑 Remove posts'}
        </button>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="full" className="lightboxImg" />
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && createPortal(
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setEditOpen(false)}>
          <div className="modal">
            <div className="modalTop">
              <span className="modalCancel" onClick={() => setEditOpen(false)}>Cancel</span>
              <span className="modalTitle">Edit Profile</span>
              <span className="modalSave" onClick={handleSaveEdit}>Done</span>
            </div>

            <div className="modalAvRow">
              <div className="modalAvCircle" onClick={() => avatarInputRef.current.click()}>
                {editData.avatar
                  ? <img src={editData.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: 34 }}>👤</span>}
              </div>
              <span className="changePhotoTxt" onClick={() => avatarInputRef.current.click()}>
                Change profile photo
              </span>
            </div>

            {[
              { label: 'Name', key: 'name' },
              { label: 'Username', key: 'username' },
              { label: 'Threads', key: 'threads' },
            ].map(({ label, key }) => (
              <div key={key} className="field">
                <label className="fieldLbl">{label}</label>
                <input
                  className="fieldIn"
                  value={editData[key] || ''}
                  onChange={(e) => setEditData((d) => ({ ...d, [key]: e.target.value }))}
                />
              </div>
            ))}

            <div className="field">
              <label className="fieldLbl">Bio</label>
              <textarea
                className="fieldIn"
                style={{ height: 90, resize: 'none' }}
                value={editData.bio || ''}
                onChange={(e) => setEditData((d) => ({ ...d, bio: e.target.value }))}
              />
            </div>

            <div className="field">
              <label className="fieldLbl">Followers</label>
              <input className="fieldIn" type="number" value={editData.followers || ''}
                onChange={(e) => setEditData((d) => ({ ...d, followers: Number(e.target.value) }))} />
            </div>

            <div className="field">
              <label className="fieldLbl">Following</label>
              <input className="fieldIn" type="number" value={editData.following || ''}
                onChange={(e) => setEditData((d) => ({ ...d, following: Number(e.target.value) }))} />
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}