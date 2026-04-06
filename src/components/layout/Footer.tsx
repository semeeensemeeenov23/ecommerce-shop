import { Link } from 'react-router-dom';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaVk, FaYoutube, 
  FaTelegram, FaTiktok, FaCcVisa, FaCcMastercard 
} from 'react-icons/fa';
import { MapPin, Phone, Mail, Clock, Smartphone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Sprint</h3>
            <p className="text-sm leading-relaxed">
              Современный маркетплейс с широким ассортиментом качественных товаров. 
              Быстрая доставка, выгодные цены и надежное обслуживание.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-green-500 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaVk size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaYoutube size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaTelegram size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaTiktok size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-green-500 transition-colors">О компании</Link></li>
              <li><Link to="/contact" className="hover:text-green-500 transition-colors">Контакты</Link></li>
              <li><Link to="/privacy" className="hover:text-green-500 transition-colors">Политика конфиденциальности</Link></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Условия оплаты</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Способы доставки</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Возврат и обмен</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-green-500 transition-colors">Как сделать заказ</Link></li>
              <li><Link to="#" className="hover:text-green-500 transition-colors">Часто задаваемые вопросы</Link></li>
              <li><Link to="#" className="hover:text-green-500 transition-colors">Бонусная программа</Link></li>
              <li><Link to="#" className="hover:text-green-500 transition-colors">Подарочные сертификаты</Link></li>
              <li><Link to="#" className="hover:text-green-500 transition-colors">Стать партнером</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-green-500 mt-1" size={16} />
                <span>г. Москва, Цветной бульвар, д. 30, стр. 1</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-green-500 mt-1" size={16} />
                <div>
                  <div>8 (800) 555-35-35</div>
                  <div>+7 (495) 123-45-67</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-green-500 mt-1" size={16} />
                <span>support@sprint.ru</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-green-500 mt-1" size={16} />
                <div>
                  <div>Ежедневно: 9:00 - 21:00</div>
                  <div>Без выходных</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className="text-green-500 mt-1" size={16} />
                <div>
                  <div>Мобильное приложение</div>
                  <div className="flex gap-2 mt-1">
                    <a href="#" className="text-xs bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">App Store</a>
                    <a href="#" className="text-xs bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">Google Play</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">Принимаем к оплате:</span>
              <div className="flex gap-3">
                <FaCcVisa size={32} className="text-blue-600" />
                <FaCcMastercard size={32} className="text-orange-600" />
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">МИР</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>© {currentYear} ООО "Спринт". Все права защищены.</p>
              <p className="mt-1">Информация на сайте не является публичной офертой</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Скачайте наше приложение</h3>
            <p className="text-white/90 text-sm mb-4">Покупайте удобно где угодно и когда угодно</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#" className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-white/30 transition-colors">
                App Store
              </a>
              <a href="#" className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-white/30 transition-colors">
                Google Play
              </a>
              <a href="#" className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-white/30 transition-colors">
                App Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;