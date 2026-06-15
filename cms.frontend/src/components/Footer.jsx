import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Let's also create a CSS file for the footer if needed, or inline styles. But inline css in a separate file is cleaner. Wait, I will use CSS modules or just a normal css file. Let's use vanilla CSS in `Footer.css`.

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">DatShop</h3>
          <p className="footer-desc">
            Mua sắm trực tuyến dễ dàng và tiện lợi. Chúng tôi mang đến cho bạn những sản phẩm chất lượng với giá cả hợp lý nhất.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i> Facebook</a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" className="social-link"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">Liên kết nhanh</h4>
          <ul className="footer-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/shop">Sản phẩm</Link></li>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Chính sách</h4>
          <ul className="footer-links">
            <li><Link to="/policy/shipping">Chính sách giao hàng</Link></li>
            <li><Link to="/policy/returns">Chính sách đổi trả</Link></li>
            <li><Link to="/policy/privacy">Bảo mật thông tin</Link></li>
            <li><Link to="/policy/terms">Điều khoản sử dụng</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Liên hệ</h4>
          <ul className="footer-contact">
            <li><i className="fas fa-map-marker-alt"></i> Trường Cao Đẳng Công Thương TPHCM</li>
            <li><i className="fas fa-phone"></i> 0123 456 789</li>
            <li><i className="fas fa-envelope"></i> contact@datshop.com</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 DatShop. Tất cả các quyền được bảo lưu.</p>
          <p>Thiết kế cho Chuyên đề ASP.NET</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
