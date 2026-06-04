import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Register = () => {
  const { customer } = useContext(AppContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      navigate('/');
    }
  }, [customer, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc (Họ tên, Email, Mật khẩu)!');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/Auth/CustomerRegister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, phone, address }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Đăng ký tài khoản thành công! Đang chuyển hướng sang trang đăng nhập...');
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập để bắt đầu mua sắm.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Đăng ký thất bại. Email có thể đã tồn tại.');
      }
    } catch (err) {
      setError(`Lỗi kết nối máy chủ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '50px', marginBottom: '80px', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        padding: '40px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>📝 ĐĂNG KÝ TÀI KHOẢN</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Tạo tài khoản khách hàng mới để nhận nhiều ưu đãi</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: 'var(--danger)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #fca5a5'
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#d1fae5',
            color: 'var(--success)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #a7f3d0'
          }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Họ và tên <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên đầy đủ"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ Email <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Địa chỉ nhận hàng</label>
            <textarea
              className="form-control"
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Địa chỉ giao hàng mặc định"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: '700' }}
          >
            {loading ? 'Đang xử lý đăng ký...' : 'ĐĂNG KÝ NGAY'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
          Bạn đã có tài khoản? <Link to="/login" style={{ fontWeight: '700', color: 'var(--primary)' }}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};
