import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5278/api';

export const AppProvider = ({ children }) => {
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem('customer');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      const parsedCustomer = JSON.parse(savedCustomer);
      const savedCart = localStorage.getItem(`cart_${parsedCustomer.customerId}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Đồng bộ giỏ hàng với localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    if (customer) {
      localStorage.setItem(`cart_${customer.customerId}`, JSON.stringify(cart));
    }
  }, [cart, customer]);

  // Đồng bộ thông tin khách hàng và tải lại giỏ hàng tương ứng
  useEffect(() => {
    if (customer) {
      localStorage.setItem('customer', JSON.stringify(customer));
      const savedCart = localStorage.getItem(`cart_${customer.customerId}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      localStorage.removeItem('customer');
      setCart([]); // Làm trống giỏ hàng trên giao diện khi đăng xuất
    }
  }, [customer]);

  // Đăng nhập khách hàng
  const loginCustomer = (customerData) => {
    setCustomer(customerData);
  };

  // Đăng xuất khách hàng
  const logoutCustomer = () => {
    setCustomer(null);
  };

  // Cập nhật thông tin khách hàng (chỉ cập nhật một phần)
  const updateCustomerInfo = (newInfo) => {
    setCustomer(prev => {
      if (!prev) return null;
      return { ...prev, ...newInfo };
    });
  };

  // Thêm vào giỏ hàng
  const addToCart = (product, qty = 1) => {
    if (!customer) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      window.location.href = "/login";
      return false;
    }
    
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
    return true;
  };

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  const updateCartQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Làm trống giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Tính tổng số lượng hàng trong giỏ
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Tính tổng số tiền trong giỏ hàng
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <AppContext.Provider
      value={{
        customer,
        cart,
        loginCustomer,
        logoutCustomer,
        updateCustomerInfo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
