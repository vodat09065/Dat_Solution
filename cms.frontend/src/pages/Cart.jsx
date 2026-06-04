import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useContext(AppContext);
  const navigate = useNavigate();

  const handleQtyChange = (productId, newQty) => {
    updateCartQuantity(productId, newQty);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ marginTop: '60px', marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Hãy thêm các sản phẩm chất lượng vào giỏ hàng trước khi thanh toán.</p>
        <Link to="/shop" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
        🛒 Giỏ Hàng Của Bạn
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Bảng sản phẩm */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          overflowX: 'auto'
        }}>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-item-info">
                      <img
                        src={item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `https://localhost:7111${item.imageUrl}`) : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600'}
                        alt={item.name}
                        className="cart-item-img"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600';
                        }}
                      />
                      <div>
                        <Link to={`/product/${item.id}`} style={{ fontWeight: '700', color: 'var(--text-main)', display: 'block', fontSize: '15px' }}>
                          {item.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', width: 'fit-content' }}>
                      <button
                        onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span style={{ width: '36px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--danger)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
            Thông tin đơn hàng
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tạm tính</span>
            <span style={{ fontWeight: '600' }}>{getCartTotal().toLocaleString('vi-VN')} đ</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '15px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Giao hàng</span>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Miễn phí</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '700' }}>Tổng tiền</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>
              {getCartTotal().toLocaleString('vi-VN')} đ
            </span>
          </div>

          <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            Tiến hành thanh toán
          </button>

          <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};
