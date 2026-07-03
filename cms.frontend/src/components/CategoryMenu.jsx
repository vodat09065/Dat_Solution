import React, { useState, useEffect } from 'react';
import { API_BASE } from '../context/AppContext';

export const CategoryMenu = ({ activeId, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/CategoriesProducts`)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải danh mục sản phẩm');
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '10px 0', color: 'var(--text-muted)' }}>
      Đang tải danh mục...
    </div>
  );
  if (error) return (
    <div style={{ textAlign: 'center', padding: '10px 0', color: 'var(--danger)' }}>
      Lỗi: {error}
    </div>
  );

  return (
    <div className="category-menu-bar" style={{ padding: '20px 0', background: 'transparent' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: '800' }}>Danh Mục Sản Phẩm</h2>
        <div style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          paddingBottom: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', minWidth: '100px' }}
            onClick={() => onSelectCategory('')}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold',
              boxShadow: (activeId === null || activeId === undefined || activeId === '') ? '0 0 0 3px #ff4b2b, 0 4px 10px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Tất cả
            </div>
            <span style={{ marginTop: '10px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>Tất cả sản phẩm</span>
          </div>

          {categories.map((cat) => (
            <div 
              key={cat.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', minWidth: '100px' }}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                backgroundImage: `url('${cat.imageUrl ? (cat.imageUrl.startsWith('http') ? cat.imageUrl : `https://localhost:7111${cat.imageUrl}`) : 'https://via.placeholder.com/80'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                boxShadow: Number(activeId) === Number(cat.id) ? '0 0 0 3px #0ea5e9, 0 4px 10px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <span style={{ marginTop: '10px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
