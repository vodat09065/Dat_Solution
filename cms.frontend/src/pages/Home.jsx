import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryMenu } from '../components/CategoryMenu';
import { ProductGrid } from '../components/ProductGrid';
import { LatestBlog } from '../components/LatestBlog';
import { API_BASE } from '../context/AppContext';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      title: "Bộ Sưu Tập Thời Trang Hè 2026",
      desc: "Khám phá những mẫu quần áo sành điệu, chất liệu cao cấp và dịch vụ giao hàng siêu tốc.",
      btnText: "Mua sắm ngay 🛍️",
      bg: "linear-gradient(135deg, #4f46e5 0%, #0ea5e9 50%, #8b5cf6 100%)"
    },
    {
      id: 2,
      title: "Ưu Đãi Độc Quyền - Giảm 50%",
      desc: "Nâng tầm phong cách của bạn với những thiết kế mới nhất. Đừng bỏ lỡ cơ hội mua sắm tiết kiệm.",
      btnText: "Khám phá ngay 🔥",
      bg: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #f9d423 100%)"
    }
  ];

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  useEffect(() => {
    fetch(`${API_BASE}/Products`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải sản phẩm');
        return res.json();
      })
      .then((data) => {
        // Hiển thị 8 sản phẩm đầu trên trang chủ
        setProducts(data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectCategory = (id) => {
    // Chuyển hướng sang trang Shop kèm state categoryProductId
    navigate('/shop', { state: { categoryProductId: id } });
  };

  return (
    <div>
      {/* Category Menu Bar ở Tầng 3 */}
      <CategoryMenu activeId="" onSelectCategory={handleSelectCategory} />

      {/* Hero Banner Section */}
      <style>
        {`
          @keyframes floatBackAndForth {
            0% { transform: translateX(-30px); }
            100% { transform: translateX(30px); }
          }
          .animate-banner-content {
            animation: floatBackAndForth 4s ease-in-out infinite alternate;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-banner-bg {
            background-size: 200% 200% !important;
            animation: gradientMove 5s ease-in-out infinite alternate;
          }
        `}
      </style>
      <section className="animate-banner-bg" style={{
        background: banners[currentBannerIndex].bg,
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '40px',
        transition: 'background 1s ease'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div className="container animate-banner-content" style={{ position: 'relative', zIndex: 1 }} key={banners[currentBannerIndex].id}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            {banners[currentBannerIndex].title}
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto', opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            {banners[currentBannerIndex].desc}
          </p>
          <button onClick={() => navigate('/shop')} className="btn btn-success" style={{ 
            padding: '12px 30px', 
            fontSize: '16px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {banners[currentBannerIndex].btnText}
          </button>
        </div>
        {/* Banner Indicators */}
        <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
          {banners.map((_, index) => (
            <span 
              key={index} 
              onClick={() => setCurrentBannerIndex(index)}
              style={{
                width: '12px', height: '12px', borderRadius: '50%', 
                background: currentBannerIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </section>

      {/* Product Section ở Tầng 4 */}
      <section className="container" style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>🔥 Sản phẩm nổi bật</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Các sản phẩm bán chạy nhất tuần này</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn btn-secondary">
            Xem tất cả
          </button>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>

      {/* Blog Section ở Tầng 5 */}
      <div className="container" style={{ marginBottom: '60px' }}>
        <LatestBlog />
      </div>
    </div>
  );
};
