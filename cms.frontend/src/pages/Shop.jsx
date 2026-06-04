import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryMenu } from '../components/CategoryMenu';
import { ProductGrid } from '../components/ProductGrid';
import { API_BASE } from '../context/AppContext';

export const Shop = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nhận thông tin chuyển hướng từ trang chủ
  useEffect(() => {
    if (location.state && location.state.categoryProductId !== undefined) {
      setSelectedCategory(location.state.categoryProductId);
    }
  }, [location.state]);

  // Fetch sản phẩm mỗi khi thay đổi danh mục
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = selectedCategory
      ? `${API_BASE}/Products/category/${selectedCategory}`
      : `${API_BASE}/Products`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải danh sách sản phẩm');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div>
      {/* Menu danh mục lọc ngang ở Tầng 3 */}
      <CategoryMenu 
        activeId={selectedCategory} 
        onSelectCategory={(id) => setSelectedCategory(id)} 
      />

      <div className="container" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)' }}>
            🛒 Cửa Hàng Thời Trang
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
            Tìm kiếm và lựa chọn sản phẩm chất lượng phù hợp với cá tính của bạn.
          </p>
        </div>

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};
