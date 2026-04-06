import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center py-20">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-gray-600 mb-8">Похоже, вы еще не добавили ни одного товара.</p>
          <Link
            to="/catalog"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full inline-block"
          >
            Продолжить покупки
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 p-4 font-semibold text-gray-700">
              <div className="col-span-5">Товар</div>
              <div className="col-span-2 text-center">Цена</div>
              <div className="col-span-2 text-center">Количество</div>
              <div className="col-span-2 text-center">Сумма</div>
              <div className="col-span-1"></div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                <div className="md:col-span-5 flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Товар';
                    }}
                  />
                  <div>
                    <Link to={`/product/${item.id}`} className="font-semibold hover:text-green-600">
                      {item.name}
                    </Link>
                  </div>
                </div>
                <div className="md:col-span-2 text-center text-gray-600">
                  {item.price.toLocaleString()} ₽
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                    }
                    className="w-20 mx-auto text-center border rounded-md p-1"
                  />
                </div>
                <div className="md:col-span-2 text-center font-semibold text-green-600">
                  {(item.price * item.quantity).toLocaleString()} ₽
                </div>
                <div className="md:col-span-1 text-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-500 hover:text-red-700"
            >
              Очистить корзину
            </button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Итого</h2>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Товары</span>
                <span>{totalAmount.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате</span>
                  <span className="text-green-600">{totalAmount.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center mt-6"
            >
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;