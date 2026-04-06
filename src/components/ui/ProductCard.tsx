import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import type { Product } from '../../types';
import type { RootState } from '../../store/store';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import Modal from './Modal';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xs md:text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs md:text-sm" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs md:text-sm" />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <>
      <div 
        className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-gray-100">
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Товар';
              }}
            />
            
            <div className="absolute top-2 left-2 flex flex-col gap-1 md:gap-2">
              {product.oldPrice && (
                <span className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-700 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                  Нет в наличии
                </span>
              )}
            </div>
            
            <button
              onClick={handleWishlist}
              className={`absolute top-2 right-2 p-1.5 md:p-2 rounded-full bg-white shadow-md transition-all transform hover:scale-110 ${
                isInWishlist ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 md:gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 md:p-3 rounded-full transition-all transform hover:scale-110"
              >
                <ShoppingCart size={16} />
              </button>
              <Link
                to={`/product/${product.id}`}
                className="bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 md:p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Eye size={16} />
              </Link>
            </div>
          </div>
        </Link>
        
        {/* Контент карточки с flex-колонкой и кнопкой внизу */}
        <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 hover:text-green-600 transition-colors text-xs sm:text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center mb-2 md:mb-3">
            <div className="flex gap-0.5">{renderRating(product.rating)}</div>
            <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2">({product.rating})</span>
          </div>
          
          {/* Цена */}
          <div className="flex flex-col mt-auto">
            <span className="text-sm sm:text-base md:text-xl font-bold text-green-600">
              {product.price.toLocaleString()} ₽
            </span>
            {product.oldPrice && (
              <span className="text-[10px] md:text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full mt-3 h-[36px] sm:h-[38px] md:h-[42px] rounded-lg font-semibold transition-all flex items-center justify-center gap-1 md:gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap ${product.inStock ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            <ShoppingCart size={14} className="md:w-4 md:h-4" />
            <span>В корзину</span>
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Товар добавлен!</h3>
          <p className="text-gray-600 mb-4">{product.name} добавлен в корзину</p>
          <Link
            to="/cart"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Перейти в корзину
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;