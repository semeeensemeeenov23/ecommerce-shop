import { Link } from 'react-router-dom';
import { Percent, ArrowRight } from 'lucide-react';

const SaleBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Percent className="w-4 h-4" />
              <span className="text-sm font-medium">Ограниченное предложение</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Скидка до 50%
            </h2>
            <p className="text-white/90 text-lg mb-6">
              На все товары из новой коллекции. Успейте купить по выгодной цене!
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all"
            >
              Успеть купить
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white">-30%</div>
                <div className="text-white/80 text-sm">На электронику</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white">-50%</div>
                <div className="text-white/80 text-sm">На одежду</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white">-20%</div>
                <div className="text-white/80 text-sm">На аксессуары</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white">-40%</div>
                <div className="text-white/80 text-sm">На обувь</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;