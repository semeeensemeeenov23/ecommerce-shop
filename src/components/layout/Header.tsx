import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
  setIsMobileMenuOpen(false);
  window.scrollTo(0, 0); 
};

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/about', label: 'О нас' },
    { path: '/contact', label: 'Контакты' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-slate-900 py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="group flex items-center gap-2 text-2xl font-bold transition-all hover:scale-105"
            >
              <span className="text-green-500 group-hover:text-green-400 transition-colors">⚡</span>
              <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                Sprint
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-base font-medium transition-all duration-300 rounded-lg
                    ${isActive(item.path) 
                      ? 'text-green-500' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-green-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <Link 
                to="/wishlist" 
                onClick={handleLinkClick}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors group"
              >
                <FaHeart 
                  size={20} 
                  className="text-gray-300 group-hover:text-red-500 transition-colors" 
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-lg">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/cart" 
                onClick={handleLinkClick}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors group"
              >
                <FaShoppingCart 
                  size={20} 
                  className="text-gray-300 group-hover:text-green-500 transition-colors" 
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-lg">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Burger button - mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={22} className="text-white" />
                ) : (
                  <FaBars size={22} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 w-72 h-full bg-gradient-to-b from-slate-800 to-slate-900 z-50 shadow-2xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-700">
            <span className="text-xl font-bold text-green-500">⚡ Sprint</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaTimes size={20} className="text-white" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`block px-6 py-4 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-green-600/20 text-green-500 border-r-4 border-green-500'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="p-5 border-t border-gray-700">
            <div className="flex justify-center gap-6">
              <Link to="/wishlist" onClick={handleLinkClick} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart size={20} />
              </Link>
              <Link to="/cart" onClick={handleLinkClick} className="text-gray-400 hover:text-green-500 transition-colors">
                <FaShoppingCart size={20} />
              </Link>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">© 2024 Sprint</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;