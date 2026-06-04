import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Profile = () => {
  const { customer } = useContext(AppContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customer) {
      navigate('/login');
      return;
    }

    fetch(`${API_BASE}/Orders/customer/${customer.customerId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải lịch sử đơn hàng');
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [customer, navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <span className="badge badge-warning">🕒 Chờ duyệt</span>;
      case 1:
        return <span className="badge badge-primary" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>🚚 Đang giao</span>;
      case 2:
        return <span className="badge badge-success">✅ Đã hoàn thành</span>;
      default:
        return <span className="badge badge-secondary">Không xác định</span>;
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.toLocaleTimeString('vi-VN')} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (!customer) return null;

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Cột trái: Thông tin cá nhân */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '10px' }}>👤</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>{customer.fullName}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Khách hàng thành viên</p>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', fontSize: '14px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-muted)', display: 'block' }}>Email đăng nhập</span>
              <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{customer.email}</span>
            </div>
            
            {customer.phone && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-muted)', display: 'block' }}>Số điện thoại</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{customer.phone}</span>
              </div>
            )}

            {customer.address && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-muted)', display: 'block' }}>Địa chỉ nhận hàng</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.4' }}>{customer.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cột phải: Lịch sử đơn hàng */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
            📦 Lịch Sử Mua Hàng
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>Đang tải lịch sử đơn hàng...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--danger)' }}>Lỗi: {error}</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              Bạn chưa mua đơn hàng nào. <Link to="/shop" style={{ fontWeight: '700' }}>Mua sắm ngay!</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  {/* Tiêu đề đơn hàng */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                    <div>
                      <span style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-main)' }}>
                        ĐƠN HÀNG #{order.id}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px', marginLeft: '12px' }}>
                        📅 {formatDate(order.orderDate)}
                      </span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Chi tiết sản phẩm trong đơn */}
                  <div style={{ marginBottom: '16px' }}>
                    {order.orderDetails.map((detail) => (
                      <div key={detail.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '70%' }}>
                          {detail.productImageUrl && (
                            <img
                              src={detail.productImageUrl.startsWith('http') ? detail.productImageUrl : `https://localhost:7111${detail.productImageUrl}`}
                              alt={detail.productName}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600';
                              }}
                            />
                          )}
                          <span style={{ fontWeight: '500' }}>
                            {detail.productName} <span style={{ color: 'var(--text-muted)' }}>x {detail.quantity}</span>
                          </span>
                        </div>
                        <span style={{ fontWeight: '600' }}>
                          {detail.totalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Ghi chú & Tổng tiền */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border)', paddingTop: '12px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', italic: 'true' }}>
                      {order.notes ? `Ghi chú: "${order.notes}"` : 'Không có ghi chú.'}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>
                      Tổng tiền: {order.totalOrderAmount.toLocaleString('vi-VN')} đ
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
