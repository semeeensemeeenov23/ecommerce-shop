import { MapPin, Phone, Mail, Clock, MessageCircle, Send, User, AtSign } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 md:py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Свяжитесь с <span className="text-yellow-300">нами</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Мы всегда рады помочь! Оставьте свои контакты, и мы ответим в ближайшее время
          </p>
        </div>
      </div>

      <div className="h-20 md:h-24"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Левая колонка - форма */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Отправить сообщение</h2>
              <p className="text-gray-500 mb-6">Заполните форму, и мы свяжемся с вами</p>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                  Спасибо! Ваше сообщение отправлено. Мы ответим в ближайшее время.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-gray-700 mb-2 font-medium">Ваше имя *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Сообщение *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Опишите ваш вопрос или предложение..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>

          {/* Правая колонка - контакты и карта */}
          <div>
            {/* Контактная информация */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Контактная информация</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <MapPin className="text-green-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Адрес</p>
                    <p className="text-gray-500">г. Москва, Цветной бульвар, д. 30, стр. 1</p>
                    <p className="text-gray-400 text-sm mt-1">Метро "Цветной бульвар", выход к ТЦ "Цветной"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Phone className="text-green-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Телефон</p>
                    <p className="text-gray-500">8 (800) 555-35-35</p>
                    <p className="text-gray-400 text-sm mt-1">Бесплатно по России</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Mail className="text-green-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-500">support@sprint.ru</p>
                    <p className="text-gray-400 text-sm mt-1">Ответ в течение 24 часов</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Clock className="text-green-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Режим работы</p>
                    <p className="text-gray-500">Пн-Пт: 9:00 - 21:00</p>
                    <p className="text-gray-500">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="text-green-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Мессенджеры</p>
                    <p className="text-gray-500">Telegram: @sprint_support</p>
                    <p className="text-gray-500">WhatsApp: +7 (495) 123-45-67</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-80 w-full">
                <iframe
                  title="Sprint location - Москва, Цветной бульвар, 30"
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890abcdef&source=constructor&mode=search&text=Москва%2C%20Цветной%20бульвар%2C%2030%20стр%201&z=17"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50 text-center border-t">
                <p className="text-sm text-gray-600">
                  📍 г. Москва, Цветной бульвар, д. 30, стр. 1
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Метро "Цветной бульвар" - 2 минуты пешком
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 mb-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Нужна помощь?</h3>
          <p className="text-white/90 mb-4">
            Наши менеджеры готовы ответить на любые вопросы
          </p>
          <a
            href="tel:88005553535"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
          >
            <Phone size={16} />
            Позвонить сейчас
          </a>
        </div>
      </div>
      
      <div className="h-8"></div>
    </div>
  );
};

export default ContactPage;