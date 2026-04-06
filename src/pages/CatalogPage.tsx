import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { FaFilter, FaSearch, FaTimes, FaTh, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CatalogPage = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 9;

  const categories = ['Все', ...new Set(products.map(product => product.category))];
  const maxPrice = Math.max(...products.map(p => p.price));

  let filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'Все' || !filterCategory ? true : product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (sortOrder === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setFilterCategory('');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
    setSortOrder('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Каталог товаров</h1>
          <p className="text-gray-500">Выберите из более чем {products.length} товаров</p>
        </div>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FaFilter className="text-green-600" />
              <span>Фильтры и сортировка</span>
            </div>
            <span className="text-gray-400">{isFilterOpen ? '▲' : '▼'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая панель фильтров */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-80 flex-shrink-0"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b">
                    <div className="flex items-center gap-2">
                      <FaFilter className="text-green-600" />
                      <h2 className="font-semibold text-lg">Фильтры</h2>
                    </div>
                    {(filterCategory || searchQuery || priceRange[0] > 0 || priceRange[1] < maxPrice || sortOrder) && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                      >
                        <FaTimes size={12} />
                        Сбросить
                      </button>
                    )}
                  </div>

                  {/* Поиск */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        placeholder="Название товара..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Категория */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setFilterCategory(cat === 'Все' ? '' : cat)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                            (cat === 'Все' && !filterCategory) || (filterCategory === cat)
                              ? 'bg-green-600 text-white shadow-md scale-105'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Цена */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Цена</label>
                    <Slider
                      range
                      min={0}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-3"
                      trackStyle={[{ backgroundColor: '#26b864' }]}
                      handleStyle={[{ borderColor: '#26b864' }, { borderColor: '#26b864' }]}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>от {priceRange[0].toLocaleString()} ₽</span>
                      <span>до {priceRange[1].toLocaleString()} ₽</span>
                    </div>
                  </div>

                  {/* Сортировка */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'По умолчанию' },
                        { value: 'price-asc', label: 'Цена: по возрастанию' },
                        { value: 'price-desc', label: 'Цена: по убыванию' },
                        { value: 'rating', label: 'По рейтингу' },
                        { value: 'name', label: 'По названию' },
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors">
                          <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={sortOrder === option.value}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-600">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1">
            {/* Верхняя панель */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Найдено: <span className="font-semibold text-gray-700">{filteredProducts.length}</span> товаров
                  </span>
                  <div className="hidden sm:flex gap-1 border-l pl-3">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-all duration-200 ${viewMode === 'grid' ? 'bg-green-100 text-green-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <FaTh size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-all duration-200 ${viewMode === 'list' ? 'bg-green-100 text-green-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <FaBars size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Показано {paginatedProducts.length} из {filteredProducts.length}
                </div>
              </div>
            </div>

            {/* Товары с анимацией */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ничего не найдено</h3>
                <p className="text-gray-500 mb-4">Попробуйте изменить параметры поиска или фильтры</p>
                <button
                  onClick={clearFilters}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Сбросить фильтры
                </button>
              </motion.div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${filterCategory}-${sortOrder}-${searchQuery}-${priceRange}-${currentPage}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1'
                    }`}
                  >
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-2 mt-10"
                  >
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all hover:scale-105"
                    >
                      ←
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`min-w-[40px] h-10 px-2 rounded-lg transition-all duration-200 ${
                              currentPage === pageNum
                                ? 'bg-green-600 text-white scale-105 shadow-md'
                                : 'border border-gray-300 hover:bg-gray-50 hover:scale-105'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all hover:scale-105"
                    >
                      →
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;