import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { reviews as initialReviews } from '../data/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import type { RootState } from '../store/store';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from 'react-icons/fa';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Review } from '../types';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const product = products.find(p => p.id === Number(id));
  
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <p className="text-gray-600">К сожалению, запрошенный товар отсутствует.</p>
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.productId === product.id);
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : product.rating;

  const renderRating = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starSize = size === 'lg' ? 'text-2xl' : 'text-sm';

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`${starSize} text-yellow-400`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={`${starSize} text-yellow-400`} />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={`${starSize} text-yellow-400`} />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    alert(`Добавлено ${quantity} шт. товара "${product.name}" в корзину!`);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      alert('Товар удален из избранного');
    } else {
      dispatch(addToWishlist(product));
      alert('Товар добавлен в избранное');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    const review: Review = {
      id: reviews.length + 1,
      productId: product.id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ userName: '', rating: 5, comment: '' });
    alert('Спасибо за ваш отзыв!');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Галерея изображений */}
          <div>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto rounded-xl shadow-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/500x500?text=Товар';
              }}
            />
          </div>
          
          {/* Информация о товаре */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex gap-1 mr-3">{renderRating(averageRating, 'lg')}</div>
              <span className="text-gray-500">({productReviews.length} отзывов)</span>
            </div>
            
            <div className="mb-4">
              {product.oldPrice ? (
                <>
                  <span className="text-3xl font-bold text-green-600">{product.price.toLocaleString()} ₽</span>
                  <span className="text-xl text-gray-400 line-through ml-3">{product.oldPrice.toLocaleString()} ₽</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-green-600">{product.price.toLocaleString()} ₽</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Категория:</span>{' '}
              <span className="text-gray-600">{product.category}</span>
            </div>
            
            <div className="mb-6">
              <span className="font-semibold text-gray-700">Наличие:</span>{' '}
              {product.inStock ? (
                <span className="text-green-600 font-semibold">В наличии</span>
              ) : (
                <span className="text-red-500 font-semibold">Нет в наличии</span>
              )}
            </div>
            
            {/* Количество */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-gray-700">Количество:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Кнопки */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </button>
              
              <button
                onClick={handleWishlist}
                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 border-2 ${
                  isInWishlist
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <FaHeart className={isInWishlist ? 'fill-current' : ''} />
                {isInWishlist ? 'В избранном' : 'В избранное'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Описание товара */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Описание</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Характеристики:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Высокое качество материалов</li>
              <li>Гарантия 12 месяцев</li>
              <li>Оригинальная продукция</li>
              <li>Быстрая доставка</li>
            </ul>
          </div>
        </div>
        
        {/* Отзывы */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Отзывы покупателей</h2>
          
          {/* Форма добавления отзыва */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Оставить отзыв</h3>
            <form onSubmit={handleAddReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ваше имя *</label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Оценка *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      {star <= newReview.rating ? (
                        <FaStar className="text-3xl text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-3xl text-yellow-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ваш отзыв *</label>
                <textarea
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          
          {/* Список отзывов */}
          {productReviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Пока нет отзывов. Будьте первым!</p>
          ) : (
            <div className="space-y-6">
              {productReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-800">{review.userName}</span>
                      <div className="flex gap-1 mt-1">{renderRating(review.rating)}</div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;