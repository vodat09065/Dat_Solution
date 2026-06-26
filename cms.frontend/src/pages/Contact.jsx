import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Giả lập gọi API gửi liên hệ
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Ẩn thông báo thành công sau 5 giây
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '15px' }}>
          Liên Hệ Với Chúng Tôi
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Chúng tôi luôn lắng nghe ý kiến của bạn. Đừng ngần ngại để lại tin nhắn hoặc gọi trực tiếp cho DatCMS Shop nếu bạn cần hỗ trợ.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Cột trái: Thông tin liên hệ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-main)' }}>
            Thông Tin Trực Tiếp
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                📍
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px', color: 'var(--text-main)' }}>Địa chỉ trụ sở</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5' }}>
                  123 Đường Công Nghệ, Phường Sáng Tạo, Quận Phát Triển, Thành phố Hồ Chí Minh
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                📞
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px', color: 'var(--text-main)' }}>Đường dây nóng</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5' }}>
                  Hỗ trợ 24/7: <strong>1900 6868</strong><br/>
                  Kinh doanh: <strong>0909 123 456</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                📧
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px', color: 'var(--text-main)' }}>Hỗ trợ Email</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5' }}>
                  Chăm sóc KH: <strong>support@datcms.com</strong><br/>
                  Hợp tác: <strong>partner@datcms.com</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Form liên hệ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
            Gửi Tin Nhắn
          </h2>

          {submitted && (
            <div style={{ 
              backgroundColor: 'var(--success-light)', 
              color: 'var(--success)', 
              padding: '15px 20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontWeight: '500',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              ✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Họ và tên</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control" 
                  placeholder="Tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email của bạn</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tiêu đề</label>
              <input 
                type="text" 
                name="subject"
                className="form-control" 
                placeholder="Vấn đề bạn cần hỗ trợ"
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nội dung tin nhắn</label>
              <textarea 
                name="message"
                className="form-control" 
                rows="5"
                placeholder="Hãy mô tả chi tiết yêu cầu của bạn..."
                value={formData.message}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600' }}
              disabled={loading}
            >
              {loading ? 'Đang gửi tin nhắn...' : '🚀 Gửi Tin Nhắn Ngay'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
