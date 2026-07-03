import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const ProductGrid = ({ products, loading, error }) => {
  const { addToCart } = useContext(AppContext);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart(product, 1)) {
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '16px' }}>Đang tải danh sách sản phẩm...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--danger)' }}>Lỗi: {error}</div>;
  if (products.length === 0) return <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>Không có sản phẩm nào phù hợp.</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="card-product">
          <div style={{ overflow: 'hidden', height: '240px' }}>
            <img
              src={product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `https://localhost:7111${product.imageUrl}`) : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600'}
              alt={product.name}
              className="card-product-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600';
              }}
            />
          </div>
          <div className="card-product-body">
            <h3 className="card-product-title">{product.name}</h3>
            <div className="card-product-price">{formatPrice(product.price)}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <span className="btn btn-secondary" style={{ flexGrow: 1, padding: '8px', fontSize: '13px', textAlign: 'center' }}>
                Chi tiết
              </span>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="btn btn-primary"
                style={{ padding: '8px 12px', fontSize: '13px' }}
              >
                🛒 +
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
