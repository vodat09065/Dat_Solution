import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE } from '../context/AppContext';

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/Posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Không tìm thấy bài viết');
          throw new Error('Lỗi khi tải bài viết');
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '60px', marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '15px' }}>⏳</div>
        <p style={{ color: 'var(--text-muted)' }}>Đang tải bài viết...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{ marginTop: '60px', marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--danger)', marginBottom: '15px' }}>
          Đã xảy ra lỗi
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{error || 'Không tìm thấy bài viết'}</p>
        <Link to="/posts" className="btn btn-primary" style={{ padding: '10px 24px' }}>
          Quay lại danh sách Bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px', maxWidth: '800px' }}>
      <Link to="/posts" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '30px', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
        ← Quay lại danh sách
      </Link>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
        {post.imageUrl && (
          <img
            src={post.imageUrl.startsWith('http') ? post.imageUrl : `https://localhost:7111${post.imageUrl}`}
            alt={post.title}
            style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600';
            }}
          />
        )}
        
        <div style={{ padding: '40px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>📅 {formatDate(post.createdDate)}</span>
            <span>📂 Tin tức chung</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '30px', lineHeight: '1.3' }}>
            {post.title}
          </h1>

          <div 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.8', 
              color: 'var(--text-main)' 
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};
