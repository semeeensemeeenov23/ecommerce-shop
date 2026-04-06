import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Percent } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white overflow-hidden pt-24">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 pt-8 pb-12 relative z-10 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Percent className="w-4 h-4" />
              <span className="text-sm font-medium">🔥 Мега распродажа до -50%</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Лучшие товары
              <span className="block text-yellow-300">по лучшим ценам</span>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-white/90 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Откройте для себя нашу премиальную коллекцию высококачественных товаров. 
              Быстрая доставка, гарантия качества и лучшие цены.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all hover:translate-y-[-2px] hover:shadow-lg"
              >
                <ShoppingBag size={20} />
                Начать покупки
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src="https://placehold.co/600x500/0f172a/26b864?text=Sprint"
                alt="Shopping"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-6 pb-4 mb-4 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">5000+</div>
            <div className="text-sm text-white/80 mt-1">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">100%</div>
            <div className="text-sm text-white/80 mt-1">Гарантия качества</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300">24/7</div>
            <div className="text-sm text-white/80 mt-1">Поддержка</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;