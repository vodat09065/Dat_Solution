import React, { useState, useEffect } from 'react';
import { API_BASE } from '../context/AppContext';

export const LatestBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/Posts`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải bài viết');
        return res.json();
      })
      .then((data) => {
        // Lấy tối đa 3 bài viết mới nhất
        setPosts(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '30px' }}>Đang tải tin tức...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '30px', color: 'var(--danger)' }}>Lỗi: {error}</div>;

  return (
    <section className="blog-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>📰 Tin tức mới nhất</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Xu hướng và mẹo mặc đẹp cho bạn</p>
        </div>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post.id} className="blog-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <img 
              src={post.imageUrl ? (post.imageUrl.startsWith('http') ? post.imageUrl : `https://localhost:7111${post.imageUrl}`) : 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600'} 
              alt={post.title} 
              className="blog-card-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600';
              }}
            />
            <div className="blog-card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                📅 {formatDate(post.createdDate)}
              </span>
              <h3 className="blog-card-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', height: '54px', overflow: 'hidden' }}>
                {post.title}
              </h3>
              <p className="blog-card-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '60px', marginBottom: '20px' }}>
                {post.content}
              </p>
              <button 
                onClick={() => setSelectedPost(post)}
                className="btn btn-secondary" 
                style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '6px 12px', fontSize: '13px' }}
              >
                Đọc tiếp →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal chi tiết bài viết */}
      {selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f1f5f9',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
            <img 
              src={selectedPost.imageUrl ? (selectedPost.imageUrl.startsWith('http') ? selectedPost.imageUrl : `https://localhost:7111${selectedPost.imageUrl}`) : 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600'} 
              alt={selectedPost.title} 
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600';
              }}
            />
            <div style={{ padding: '30px' }}>
              <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                📅 Ngày đăng: {formatDate(selectedPost.createdDate)}
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
                {selectedPost.title}
              </h2>
              <div style={{ color: '#334155', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-line' }}>
                {selectedPost.content}
              </div>
              <div style={{ marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setSelectedPost(null)} className="btn btn-primary">
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
