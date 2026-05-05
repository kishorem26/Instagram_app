import React, { useEffect, useState } from 'react'
import instaPost from './assets/insta-post.jpg'

function Posts() {

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(err => console.log(err))
  }, []);

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, likes: likedPosts[postId] ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: 'me', comment: text }] }
        : p
    ));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div style={{ maxWidth: '470px', margin: '0 auto' }}>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} style={{ borderBottom: '1px solid #dbdbdb', backgroundColor: '#fff' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={post.user.profile_pic}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #dbdbdb' }}
                  />
                  <strong style={{ fontSize: '14px' }}>{post.user.username}</strong>
                </div>
                <i className="bi bi-three-dots" style={{ fontSize: '18px', cursor: 'pointer' }}></i>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                style={{ width: '100%', display: 'block' }}
                onDoubleClick={() => toggleLike(post.id)}
              />

              {/* Icons Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <i
                    className={likedPosts[post.id] ? "bi bi-heart-fill" : "bi bi-heart"}
                    style={{ fontSize: '26px', cursor: 'pointer', color: likedPosts[post.id] ? 'red' : 'black' }}
                    onClick={() => toggleLike(post.id)}
                  ></i>
                  <i
                    className="bi bi-chat"
                    style={{ fontSize: '26px', cursor: 'pointer' }}
                    onClick={() => toggleComments(post.id)}
                  ></i>
                  <i className="bi bi-send" style={{ fontSize: '26px', cursor: 'pointer' }}></i>
                </div>
                <i
                  className={bookmarkedPosts[post.id] ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
                  style={{ fontSize: '26px', cursor: 'pointer' }}
                  onClick={() => toggleBookmark(post.id)}
                ></i>
              </div>

              {/* Likes */}
              <div style={{ padding: '0 12px 4px' }}>
                <strong style={{ fontSize: '14px' }}>{post.likes} likes</strong>
              </div>

              {/* Caption */}
              <div style={{ padding: '0 12px 8px' }}>
                <span style={{ fontSize: '14px' }}>
                  <strong>{post.user.username}</strong> {post.caption}
                </span>
              </div>

              {/* Comments Section */}
              {openComments[post.id] && (
                <div style={{ padding: '0 12px 10px', borderTop: '1px solid #f0f0f0' }}>
                  {post.comments.map((c) => (
                    <p key={c.id} style={{ margin: '6px 0', fontSize: '14px' }}>
                      <strong>{c.user}</strong> {c.comment}
                    </p>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', borderTop: '1px solid #dbdbdb', paddingTop: '8px' }}>
                    <input
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      placeholder="Add a comment..."
                      style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px' }}
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      style={{ border: 'none', background: 'none', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div>
          <img src={instaPost} alt="Loading..." style={{ width: '100%' }} />
        </div>
      )}
    </div>
  )
}

export default Posts;