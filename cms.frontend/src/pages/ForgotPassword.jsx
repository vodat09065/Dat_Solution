import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../context/AppContext';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_BASE}/Auth/ForgotPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Mật khẩu mới đã được gửi vào email của bạn.');
        setEmail('');
      } else {
        setError(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '60px', marginBottom: '80px' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '800', color: 'var(--text-main)' }}>Quên Mật Khẩu</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '25px', fontSize: '15px' }}>
          Nhập địa chỉ email của bạn. Chúng tôi sẽ tạo mật khẩu mới và gửi nó qua email cho bạn.
        </p>

        {error && <div className="alert alert-danger" style={{ fontSize: '14px', marginBottom: '20px' }}>{error}</div>}
        {message && <div className="alert alert-success" style={{ fontSize: '14px', marginBottom: '20px' }}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '600' }}>Email của bạn</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Nhập email..." 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '8px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            disabled={loading}
            style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', marginTop: '10px' }}
          >
            {loading ? 'Đang xử lý...' : 'Cấp Lại Mật Khẩu'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};
