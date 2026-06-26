import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Navbar = () => {
  const { customer, logoutCustomer, getCartCount } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutCustomer();
    navigate('/login');
  };

  return (
    <header className="header-navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span>🛍️ DatCMS Shop</span>
        </Link>

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
