import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Login = () => {
  const { customer, loginCustomer } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Điểm quay lại sau khi đăng nhập thành công
  const redirectPath = location.state?.from || '/';

  useEffect(() => {
    if (customer) {
      navigate(redirectPath);
    }
  }, [customer, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/Auth/CustomerLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Lưu thông tin khách hàng vào AppContext
        loginCustomer({
          customerId: data.customerId,
          fullName: data.fullName,
          email: data.email,
          token: data.token,
          // Fetch thêm thông tin chi tiết nếu cần, hoặc giả lập lưu thông tin ban đầu
        });
        alert('Đăng nhập thành công!');
        navigate(redirectPath);
      } else {
        setError(data.message || 'Email hoặc mật khẩu không đúng.');
      }
    } catch (err) {
      setError(`Lỗi kết nối máy chủ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '60px', marginBottom: '80px', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        maxWidth: '450px',
        width: '100%',
        padding: '40px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>🔑 ĐĂNG NHẬP KHÁCH HÀNG</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Đăng nhập để tiếp tục trải nghiệm mua sắm</p>
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Địa chỉ Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: '700' }}
          >
            {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
          Bạn chưa có tài khoản? <Link to="/register" style={{ fontWeight: '700', color: 'var(--primary)' }}>Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};
