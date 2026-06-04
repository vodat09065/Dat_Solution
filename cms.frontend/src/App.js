import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <footer style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border)',
            padding: '30px 0',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '14px',
            marginTop: '50px'
          }}>
            <div className="container">
              <p>© 2026 DatShop Client. Tất cả các quyền được bảo lưu.</p>
              <p style={{ marginTop: '5px', fontSize: '12px' }}>Thiết kế cho Chuyên đề ASP.NET - Trường Cao Đẳng Công Thương TPHCM</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
