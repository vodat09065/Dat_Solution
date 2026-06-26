import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Profile = () => {
  const { customer, updateCustomerInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (customer) {
      setEditForm({
        fullName: customer.fullName || '',
        phone: customer.phone || '',
        address: customer.address || ''
      });
    }
  }, [customer]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch(`${API_BASE}/Auth/CustomerUpdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: customer.customerId,
          fullName: editForm.fullName,
          phone: editForm.phone,
          address: editForm.address
        })
      });

      let data = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok && data) {
        alert('Cập nhật thông tin thành công!');
        updateCustomerInfo({
          fullName: data.fullName,
          phone: data.phone,
          address: data.address
        });
        setIsEditing(false);
      } else {
        alert(`Lỗi cập nhật: ${data ? data.message : 'Vui lòng kiểm tra lại Backend (chưa nhận API mới)'}`);
      }
    } catch (err) {
      alert(`Đã xảy ra lỗi: ${err.message}`);
    } finally {
      setUpdateLoading(false);
    }
  };

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

  const [activeTab, setActiveTab] = useState('profile');

  if (!customer) return null;

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Cột trái: Menu điều hướng */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👤</div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>{customer.fullName}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Khách hàng thành viên</p>
          </div>

          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '12px 16px',
              textAlign: 'left',
              backgroundColor: activeTab === 'profile' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-main)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: activeTab === 'profile' ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>📄</span> Hồ sơ cá nhân
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            style={{
              padding: '12px 16px',
              textAlign: 'left',
              backgroundColor: activeTab === 'history' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-main)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: activeTab === 'history' ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>📦</span> Lịch sử mua hàng
          </button>
        </div>

        {/* Cột phải: Nội dung theo tab */}
        <div>
          {activeTab === 'profile' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                  Hồ Sơ Cá Nhân
                </h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline"
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    ✏️ Cập nhật thông tin
                  </button>
                )}
              </div>
              
              {!isEditing ? (
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', fontSize: '16px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Họ và tên:</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{customer.fullName}</div>

                  <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Email đăng nhập:</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{customer.email}</div>

                  <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Số điện thoại:</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{customer.phone || 'Chưa cập nhật'}</div>

                  <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Địa chỉ nhận hàng:</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.4' }}>{customer.address || 'Chưa cập nhật'}</div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile}>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">Họ và tên</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">Email đăng nhập (Không thể đổi)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={customer.email}
                      disabled
                      style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">Số điện thoại</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">Địa chỉ nhận hàng</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      style={{ resize: 'vertical' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={updateLoading}
                      style={{ padding: '10px 24px' }}
                    >
                      {updateLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          fullName: customer.fullName || '',
                          phone: customer.phone || '',
                          address: customer.address || ''
                        });
                      }}
                      disabled={updateLoading}
                      style={{ padding: '10px 24px' }}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'history' && (
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
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
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
          )}
        </div>
      </div>
    </div>
  );
};
