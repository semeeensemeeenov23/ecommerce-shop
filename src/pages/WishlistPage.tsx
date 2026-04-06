import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeFromWishlist } from '../store/wishlistSlice';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { addToCart } from '../store/cartSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center py-20">
          <Heart className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Избранное пусто</h2>
          <p className="text-gray-600 mb-8">Добавляйте товары в избранное, чтобы не потерять их.</p>
          <Link
            to="/catalog"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full inline-block"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Избранное</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Товар';
                }}
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-semibold mb-2 hover:text-green-600">{item.name}</h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-green-600">{item.price.toLocaleString()} ₽</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;