import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { pathname } = useLocation();

  // Автоматический скролл вверх при смене страницы
  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' // плавная прокрутка
  });
}, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-0 md:pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default Layout;