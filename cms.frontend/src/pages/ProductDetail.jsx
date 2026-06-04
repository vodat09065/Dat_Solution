import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE}/Products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải chi tiết sản phẩm');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleQtyChange = (val) => {
    if (val < 1) return;
    if (product && val > product.stockQuantity) {
      alert(`Số lượng chọn vượt quá số lượng tồn kho (Tối đa: ${product.stockQuantity})`);
      return;
    }
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
  };

  if (loading) return <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Đang tải chi tiết sản phẩm...</div>;
  if (error) return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <div className="alert alert-danger" style={{ color: 'var(--danger)', marginBottom: '20px' }}>Lỗi: {error}</div>
      <Link to="/shop" className="btn btn-secondary">Quay lại cửa hàng</Link>
    </div>
  );

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/shop" style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
          ← Quay lại cửa hàng
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '50px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
      }}>
        {/* Cột hình ảnh */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', overflow: 'hidden', padding: '10px' }}>
          <img
            src={product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `https://localhost:7111${product.imageUrl}`) : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600'}
            alt={product.name}
            style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600';
            }}
          />
        </div>

        {/* Cột thông tin */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-main)' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>
              {product.price.toLocaleString('vi-VN')} đ
            </span>
            
            {isOutOfStock ? (
              <span className="badge badge-warning">Hết hàng</span>
            ) : (
              <span className="badge badge-success">Còn hàng: {product.stockQuantity} sản phẩm</span>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: 'var(--text-main)' }}>
              Mô tả chi tiết:
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
            </p>
          </div>

          {!isOutOfStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Số lượng:</div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  onClick={() => handleQtyChange(quantity - 1)}
                  style={{ width: '40px', height: '40px', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
                >
                  -
                </button>
                <span style={{ width: '50px', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>{quantity}</span>
                <button 
                  onClick={() => handleQtyChange(quantity + 1)}
                  style={{ width: '40px', height: '40px', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn btn-primary"
              style={{
                flexGrow: 1,
                padding: '14px',
                fontSize: '16px',
                opacity: isOutOfStock ? 0.6 : 1,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer'
              }}
            >
              🛒 Thêm vào giỏ hàng
            </button>
            <button 
              onClick={() => {
                if(!isOutOfStock) {
                  addToCart(product, quantity);
                  navigate('/checkout');
                }
              }}
              disabled={isOutOfStock}
              className="btn btn-success"
              style={{
                flexGrow: 1,
                padding: '14px',
                fontSize: '16px',
                opacity: isOutOfStock ? 0.6 : 1,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer'
              }}
            >
              ⚡ Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
