import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { API_BASE } from '../context/AppContext';

export const Shop = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Trạng thái bộ lọc
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Trạng thái loading/error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Cập nhật searchTerm nếu URL thay đổi
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchTerm) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Nhận thông tin chuyển hướng từ trang chủ
  useEffect(() => {
    if (location.state && location.state.categoryProductId !== undefined) {
      setSelectedCategory(location.state.categoryProductId.toString());
    }
  }, [location.state]);

  // Fetch danh mục 1 lần
  useEffect(() => {
    fetch(`${API_BASE}/CategoriesProducts`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Lỗi danh mục:", err));
  }, []);

  // Fetch dữ liệu mỗi khi bộ lọc thay đổi (có debounce)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE}/Products?`;
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        
        url += params.toString();

        const res = await fetch(url);
        if (!res.ok) throw new Error('Không thể tải dữ liệu từ máy chủ');
        
        let data = await res.json();
        
        // Lọc danh mục ở Frontend (hoặc có thể thêm vào backend API, nhưng API hiện tại chưa hỗ trợ lọc category trong GetProducts tổng, nên lọc ở frontend cho nhanh)
        if (selectedCategory) {
            data = data.filter(p => p.categoryProductId.toString() === selectedCategory.toString());
        }

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div style={{ backgroundColor: '#f8f9fa', paddingBottom: '60px' }}>
      <div className="container" style={{ paddingTop: '40px' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)' }}>
            🛒 Cửa Hàng
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
            Khám phá bộ sưu tập sản phẩm phong phú với mức giá tốt nhất.
          </p>
        </div>

        <div className="row">
          {/* SIDEBAR BỘ LỌC */}
          <div className="col-md-3">
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
              <h5 style={{ fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                <i className="fa-solid fa-filter"></i> Bộ Lọc
              </h5>
              
              {/* 1. Tìm kiếm */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Tìm kiếm từ khóa</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nhập tên sản phẩm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </div>

              {/* 2. Danh mục */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Lọc theo danh mục</label>
                <select 
                  className="form-select" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">-- Tất cả danh mục --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* 3. Khoảng giá (2 ô nhập) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Khoảng giá (VNĐ)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Min" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                  <span style={{ display: 'flex', alignItems: 'center' }}>-</span>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Max" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Nút Xóa bộ lọc */}
              <button 
                className="btn btn-light w-100" 
                style={{ borderRadius: '8px', fontWeight: '500', color: 'var(--text-muted)' }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setMinPrice('');
                  setMaxPrice('');
                  setSearchParams({});
                }}
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* LƯỚI SẢN PHẨM */}
          <div className="col-md-9">
            {loading ? (
               <div style={{ textAlign: 'center', padding: '50px 0' }}>
                 <div className="spinner-border text-primary" role="status"></div>
                 <p className="mt-2 text-muted">Đang tải sản phẩm...</p>
               </div>
            ) : error ? (
               <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                    Tìm thấy <strong style={{ color: 'var(--text-main)' }}>{products.length}</strong> sản phẩm phù hợp
                  </span>
                </div>

                <ProductGrid products={currentProducts} loading={false} error={null} />

                {/* Pagination Controls */}
                {products.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: 'white', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png" alt="Không tìm thấy" style={{ width: '120px', opacity: 0.6, marginBottom: '20px' }} />
                    <h4 style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Vui lòng thử lại với các từ khóa hoặc khoảng giá khác.</p>
                  </div>
                )}

                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', gap: '10px' }}>
                    <button 
                      className="btn btn-outline-secondary" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      style={{ padding: '8px 16px', borderRadius: '8px' }}
                    >
                      &laquo; Trang trước
                    </button>
                    <span style={{ padding: '8px 16px', fontWeight: 'bold', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
