import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryMenu } from '../components/CategoryMenu';
import { ProductGrid } from '../components/ProductGrid';
import { LatestBlog } from '../components/LatestBlog';
import { API_BASE } from '../context/AppContext';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Đang tải dữ liệu...",
      desc: "Vui lòng chờ trong giây lát",
      btnText: "Đọc tiếp",
      bg: "linear-gradient(135deg, #4f46e5 0%, #0ea5e9 50%, #8b5cf6 100%)",
      url: "/"
    }
  ]);
  const navigate = useNavigate();

  const defaultGradients = [
    "linear-gradient(135deg, #4f46e5 0%, #0ea5e9 50%, #8b5cf6 100%)",
    "linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #f9d423 100%)",
    "linear-gradient(135deg, #0ba360 0%, #3cba92 50%, #30E8BF 100%)"
  ];

  useEffect(() => {
    fetch(`${API_BASE}/Banners`)
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
          const dynamicBanners = data.map(b => ({
            id: b.id,
            title: b.title,
            desc: b.description || "Khám phá ngay bộ sưu tập mới nhất",
            btnText: "Xem chi tiết",
            imageUrl: b.imageUrl ? (b.imageUrl.startsWith('http') ? b.imageUrl : `https://localhost:7111${b.imageUrl}`) : null,
            bg: b.imageUrl ? null : defaultGradients[b.id % defaultGradients.length],
            url: b.targetUrl || "/shop"
          }));
          setBanners(dynamicBanners);
        }
      })
      .catch(err => console.log("Lỗi tải banner: ", err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/Products/Featured`).then(res => res.json()),
      fetch(`${API_BASE}/Products/New`).then(res => res.json()),
      fetch(`${API_BASE}/Products/Hot`).then(res => res.json())
    ])
      .then(([featuredData, newData, hotData]) => {
        setProducts(featuredData);
        setNewProducts(newData);
        setHotProducts(hotData);
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
      <section 
        key={banners[currentBannerIndex].id}
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '20px',
          background: banners[currentBannerIndex].imageUrl 
                        ? `url('${banners[currentBannerIndex].imageUrl}') center/cover no-repeat` 
                        : banners[currentBannerIndex].bg,
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          marginBottom: '40px'
        }}
      >
        {/* Dark overlay cho ảnh dễ nhìn chữ hơn */}
        {banners[currentBannerIndex].imageUrl && (
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1
            }}></div>
        )}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }} className="animate__animated animate__fadeInLeft">
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            {banners[currentBannerIndex].title}
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto', opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            {banners[currentBannerIndex].desc}
          </p>
          <button onClick={() => navigate(banners[currentBannerIndex]?.url || '/shop')} className="btn btn-success" style={{ 
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

      {/* New Product Section */}
      <section className="container" style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>🆕 3 Sản phẩm mới nhất</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Những mẫu sản phẩm vừa cập bến cửa hàng</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn btn-secondary">
            Xem tất cả
          </button>
        </div>
        <ProductGrid products={newProducts} loading={loading} error={error} />
      </section>

      {/* Hot Product Section */}
      <section className="container" style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ff416c' }}>🔥 Sản phẩm Bán Chạy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Được nhiều khách hàng yêu thích nhất</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn btn-secondary">
            Xem tất cả
          </button>
        </div>
        <ProductGrid products={hotProducts} loading={loading} error={error} />
      </section>

      {/* Featured Product Section */}
      <section className="container" style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>⭐ Sản phẩm nổi bật</h2>
          </div>
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
