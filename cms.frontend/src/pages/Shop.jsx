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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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

        <ProductGrid products={currentProducts} loading={loading} error={error} />

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', gap: '10px' }}>
            <button 
              className="btn btn-outline-secondary" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              style={{ padding: '8px 16px', borderRadius: '8px' }}
            >
              &laquo; Trang trước
            </button>
            <span style={{ padding: '8px 16px', fontWeight: 'bold', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
              Trang {currentPage} / {totalPages}
            </span>
            <button 
              className="btn btn-outline-secondary" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              style={{ padding: '8px 16px', borderRadius: '8px' }}
            >
              Trang sau &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
