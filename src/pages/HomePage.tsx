import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import NewArrivals from '../components/sections/NewArrivals';
import SaleBanner from '../components/sections/SaleBanner';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const HomePage = () => {
  const popularProducts = products.slice(0, 4);
  const saleProducts = products.filter(p => p.oldPrice).slice(0, 4);

  return (
    <>
      <Hero />
      <Features />
      <NewArrivals />
      <SaleBanner />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Популярные товары
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🔥 Товары со скидкой</h2>
            <p className="text-gray-600">Успейте купить по выгодным ценам</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;