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
    <div className="category-menu-bar">
      <div className="container category-menu-container">
        <button
          className={`category-menu-item ${activeId === null || activeId === undefined || activeId === '' ? 'active' : ''}`}
          onClick={() => onSelectCategory('')}
        >
          Tất cả sản phẩm
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-menu-item ${Number(activeId) === Number(cat.id) ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
