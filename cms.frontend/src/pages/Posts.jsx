import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../context/AppContext';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${API_BASE}/Posts`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải danh sách bài viết');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          Tất Cả Bài Viết
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          Cập nhật những tin tức, xu hướng và mẹo vặt mới nhất từ chúng tôi.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '24px', marginBottom: '15px' }}>⏳</div>
          <p>Đang tải danh sách bài viết...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--danger)' }}>
          <div style={{ fontSize: '24px', marginBottom: '15px' }}>❌</div>
          <p>Lỗi: {error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px dashed var(--border)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
            Hiện chưa có bài viết nào
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            Chúng tôi đang nỗ lực cập nhật thêm nhiều bài viết hữu ích. Vui lòng quay lại sau nhé!
          </p>
          <Link to="/" className="btn btn-primary" style={{ padding: '12px 30px' }}>
            Về Trang Chủ
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {currentPosts.map((post) => (
            <div key={post.id} style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            >
              <Link to={`/posts/${post.id}`}>
                <img
                  src={post.imageUrl ? (post.imageUrl.startsWith('http') ? post.imageUrl : `https://localhost:7111${post.imageUrl}`) : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600'}
                  alt={post.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600';
                  }}
                />
              </Link>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>
                  📅 {formatDate(post.createdDate)}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  <Link to={`/posts/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {/* Sử dụng một đoạn chữ thô hoặc strip HTML nếu content là HTML */}
                  {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </p>
                <Link to={`/posts/${post.id}`} className="btn btn-outline" style={{ textAlign: 'center' }}>
                  Đọc tiếp
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', gap: '10px' }}>
          <button 
            className="btn btn-outline-secondary" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: '8px 16px', borderRadius: '8px' }}
          >
            &laquo; Trang trước
          </button>
          <span style={{ padding: '8px 16px', fontWeight: 'bold', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            Trang {currentPage} / {totalPages}
          </span>
          <button 
            className="btn btn-outline-secondary" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: '8px 16px', borderRadius: '8px' }}
          >
            Trang sau &raquo;
          </button>
        </div>
      )}
    </div>
  );
};
