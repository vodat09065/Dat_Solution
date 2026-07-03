import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext, API_BASE } from '../context/AppContext';

export const Navbar = () => {
  const { customer, logoutCustomer, getCartCount } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleLogout = () => {
    logoutCustomer();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      fetch(`${API_BASE}/Products?search=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
          setShowSuggestions(true);
        })
        .catch(err => console.error("Lỗi search suggestions:", err));
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <header className="header-navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span>🛍️ DatCMS Shop</span>
        </Link>

        <form 
          ref={searchRef}
          onSubmit={(e) => {
            e.preventDefault();
            if(searchTerm) {
              setShowSuggestions(false);
              navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            }
          }}
          style={{ display: 'flex', width: '180px', marginLeft: '10px', position: 'relative' }}
        >
          <input 
            type="text" 
            name="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Tìm kiếm..." 
            style={{ 
              flex: 1, minWidth: 0, padding: '6px 12px', fontSize: '14px', borderRadius: '20px 0 0 20px', 
              border: '1px solid #ddd', outline: 'none' 
            }}
            autoComplete="off"
          />
          <button type="submit" style={{
            padding: '6px 12px', borderRadius: '0 20px 20px 0', fontSize: '14px',
            background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer'
          }}>
            🔍
          </button>
          
          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              backgroundColor: 'white', borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: '8px',
              zIndex: 1000, overflow: 'hidden'
            }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {suggestions.map(p => (
                  <li key={p.id}>
                    <Link 
                      to={`/product/${p.id}`}
                      onClick={() => setShowSuggestions(false)}
                      style={{
                        display: 'flex', alignItems: 'center', padding: '10px 16px',
                        textDecoration: 'none', color: 'var(--text-main)',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <img 
                        src={p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `https://localhost:7111${p.imageUrl}`) : 'https://via.placeholder.com/40'} 
                        alt={p.name}
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '12px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 'bold' }}>{p.price.toLocaleString('vi-VN')} đ</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ padding: '8px', textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: '1px solid #f0f0f0' }}>
                <Link to={`/shop?search=${encodeURIComponent(searchTerm)}`} onClick={() => setShowSuggestions(false)} style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>
                  Xem tất cả kết quả
                </Link>
              </div>
            </div>
          )}
        </form>

        <nav>
          <ul className="navbar-menu">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
              >
                Cửa hàng
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
              >
                Bài viết
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="btn btn-secondary" style={{ position: 'relative', padding: '8px 16px' }}>
            🛒 Giỏ hàng
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--danger)',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>

          {customer ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>
                👤 {customer.fullName}
              </span>
              <Link to="/profile" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-primary"
                style={{ padding: '6px 12px', fontSize: '13px', backgroundColor: 'var(--danger)' }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
