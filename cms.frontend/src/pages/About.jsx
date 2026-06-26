import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px' }}>
          Về <span style={{ color: 'var(--primary)' }}>DatShop</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Chúng tôi tự hào mang đến cho khách hàng một trải nghiệm mua sắm trực tuyến hiện đại, nhanh chóng và an toàn. 
          Sứ mệnh của chúng tôi là cung cấp những sản phẩm chất lượng nhất với giá thành hợp lý.
        </p>
      </div>

      {/* Tầm nhìn và sứ mệnh */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '40px', 
        marginBottom: '80px' 
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>👁️</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '15px', color: 'var(--text-main)' }}>
            Tầm Nhìn
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Trở thành nền tảng thương mại điện tử hàng đầu khu vực, nơi mọi người có thể tìm thấy và khám phá bất cứ điều gì họ muốn mua trực tuyến.
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '15px', color: 'var(--text-main)' }}>
            Sứ Mệnh
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Mang lại giá trị vượt trội cho khách hàng thông qua sự đa dạng của sản phẩm, giá cả cạnh tranh và dịch vụ khách hàng xuất sắc.
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>💎</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '15px', color: 'var(--text-main)' }}>
            Giá Trị Cốt Lõi
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Khách hàng là trọng tâm. Chất lượng là ưu tiên hàng đầu. Luôn đổi mới và học hỏi không ngừng để phục vụ tốt hơn.
          </p>
        </div>
      </div>

      {/* Giới thiệu thành viên/Câu chuyện */}
      <div style={{
        backgroundColor: 'var(--primary-light)',
        borderRadius: '24px',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', marginBottom: '20px' }}>
          Tại sao lại chọn chúng tôi?
        </h2>
        <p style={{ color: 'var(--text-main)', fontSize: '18px', maxWidth: '700px', lineHeight: '1.8', marginBottom: '40px' }}>
          Được thành lập từ niềm đam mê với công nghệ và mong muốn đơn giản hóa cuộc sống của mọi người. DatShop không ngừng phát triển, từ một cửa hàng nhỏ trở thành đối tác tin cậy của hàng ngàn khách hàng trên toàn quốc. Sự hài lòng của bạn chính là thước đo thành công của chúng tôi.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '18px', fontWeight: '700', borderRadius: '50px' }}>
          Khám phá Sản phẩm ngay 🚀
        </Link>
      </div>

    </div>
  );
};
