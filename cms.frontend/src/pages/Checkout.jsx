import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Checkout = () => {
  const { customer, cart, getCartTotal, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Điền sẵn thông tin khách hàng nếu đã đăng nhập
  useEffect(() => {
    if (customer) {
      setFullName(customer.fullName || '');
      setPhone(customer.phone || '');
      setAddress(customer.address || '');
    }
  }, [customer]);

  // Kiểm tra giỏ hàng rỗng
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer) {
      alert('Vui lòng đăng nhập để thực hiện đặt hàng!');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (!fullName || !phone || !address) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!');
      return;
    }

    setLoading(true);

    const orderPayload = {
      customerId: customer.customerId,
      notes: notes,
      cartItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch(`${API_BASE}/Orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.');
        clearCart();
        navigate('/profile');
      } else {
        alert(`Đặt hàng thất bại: ${data.message || 'Lỗi không xác định'}`);
      }
    } catch (err) {
      alert(`Đã xảy ra lỗi kết nối: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
    return (
      <div className="container" style={{ marginTop: '60px', marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '15px' }}>
          Bạn cần đăng nhập để thanh toán
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Đăng nhập giúp bạn quản lý đơn hàng dễ dàng và theo dõi hành trình giao hàng.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <Link to="/login" state={{ from: '/checkout' }} className="btn btn-primary" style={{ padding: '10px 24px' }}>
            Đăng nhập ngay
          </Link>
          <Link to="/register" className="btn btn-secondary" style={{ padding: '10px 24px' }}>
            Đăng ký tài khoản
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
        ⚡ Thanh Toán Đơn Hàng
      </h1>

      <form onSubmit={handlePlaceOrder} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Cột trái: Thông tin nhận hàng */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
            📍 Thông tin giao hàng
          </h2>

          <div className="form-group">
            <label className="form-label">Họ và tên người nhận</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập tên người nhận hàng"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại liên hệ</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại giao hàng"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ giao hàng</label>
            <textarea
              className="form-control"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ghi chú đơn hàng (Tùy chọn)</label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: giao giờ hành chính, gọi điện trước khi giao..."
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Cột phải: Tóm tắt giỏ hàng & Đặt hàng */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
            📝 Tóm tắt đơn hàng
          </h2>

          {/* Danh sách sản phẩm thu nhỏ */}
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '70%' }}>
                  <img
                    src={item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `https://localhost:7111${item.imageUrl}`) : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600'}
                    alt={item.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600';
                    }}
                  />
                  <span style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name} <span style={{ color: 'var(--text-muted)' }}>x {item.quantity}</span>
                  </span>
                </div>
                <span style={{ fontWeight: '600' }}>
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tạm tính</span>
            <span style={{ fontWeight: '600' }}>{getCartTotal().toLocaleString('vi-VN')} đ</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '15px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Phí vận chuyển</span>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Miễn phí</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700' }}>Tổng thanh toán</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>
              {getCartTotal().toLocaleString('vi-VN')} đ
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success"
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Đang xử lý đặt hàng...' : 'Xác nhận Đặt hàng'}
          </button>
        </div>
      </form>
    </div>
  );
};
