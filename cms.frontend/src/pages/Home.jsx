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
  const navigate = useNavigate();

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
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '40px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px' }}>
            Bộ Sưu Tập Thời Trang Hè 2026
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto', opacity: 0.9 }}>
            Khám phá những mẫu quần áo sành điệu, chất liệu cao cấp và dịch vụ giao hàng siêu tốc.
          </p>
          <button onClick={() => navigate('/shop')} className="btn btn-success" style={{ padding: '12px 30px', fontSize: '16px' }}>
            Mua sắm ngay 🛍️
          </button>
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
