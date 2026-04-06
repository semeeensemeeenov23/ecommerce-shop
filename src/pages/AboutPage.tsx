import { Users, Target, Award, Rocket, Shield, Zap, Heart, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const stats = [
    { icon: Users, value: '5000+', label: 'Довольных клиентов', color: 'from-blue-500 to-blue-600' },
    { icon: Rocket, value: '24ч', label: 'Среднее время доставки', color: 'from-purple-500 to-purple-600' },
    { icon: Award, value: '98%', label: 'Положительных отзывов', color: 'from-yellow-500 to-yellow-600' },
    { icon: TrendingUp, value: '300%', label: 'Рост за год', color: 'from-green-500 to-green-600' },
  ];

  const values = [
    { icon: Zap, title: 'Скорость', desc: 'Быстрая обработка и доставка заказов', color: 'bg-orange-100 text-orange-600' },
    { icon: Shield, title: 'Надежность', desc: 'Гарантия подлинности товаров', color: 'bg-blue-100 text-blue-600' },
    { icon: Heart, title: 'Забота', desc: 'Индивидуальный подход к каждому клиенту', color: 'bg-red-100 text-red-600' },
    { icon: Target, title: 'Качество', desc: 'Только проверенные поставщики', color: 'bg-green-100 text-green-600' },
  ];

  const team = [
    {
      name: 'Алексей Иванов',
      position: 'Основатель и CEO',
      image: '/images/team/ivan.jpg',
    },
    {
      name: 'Мария Петрова',
      position: 'Руководитель отдела продаж',
      image: '/images/team/maria.jpg',
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Технический директор',
      image: '/images/team/dmitr.jpg',
    },
    {
      name: 'Елена Волкова',
      position: 'HR-директор',
      image: '/images/team/elena.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            О компании <span className="text-yellow-300">Sprint</span>
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto">
            Мы создаем лучший опыт онлайн-покупок для миллионов людей
          </p>
        </div>
      </div>

      <div className="h-8 md:h-12"></div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
              <div className="relative bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px]">
                <div className={`inline-flex p-2 md:p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3 md:mb-4`}>
                  <stat.icon size={24} className="md:w-7 md:h-7" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500 text-center">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
              <Clock size={16} />
              <span className="text-sm font-medium">Наша история</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Как всё начиналось</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sprint был основан в 2020 году группой энтузиастов, объединенных общей целью — 
              сделать онлайн-шопинг быстрым, удобным и доступным для каждого. 
              Мы начали с небольшого склада и команды из 5 человек.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Сегодня это полноценный маркетплейс с тысячами довольных клиентов по всей стране. 
              Наш подход прост: мы предлагаем только качественные товары от проверенных поставщиков, 
              обеспечиваем быструю доставку и всегда готовы помочь.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`}
                    alt="Team"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-800">50+ сотрудников</div>
                <div className="text-sm text-gray-500">И растем каждый день</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-2xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Наша команда"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/0f172a/26b864?text=Sprint+Team';
              }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 mb-24 text-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Target size={16} />
              <span className="text-sm font-medium">Наша миссия</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Делаем покупки лучше</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Сделать качественные товары доступными каждому, обеспечивая лучший сервис 
              и полную прозрачность на всех этапах покупки.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-semibold mb-1">Доступность</div>
              <div className="text-sm text-gray-400">Цены ниже рыночных</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="font-semibold mb-1">Скорость</div>
              <div className="text-sm text-gray-400">Доставка 1-3 дня</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💚</div>
              <div className="font-semibold mb-1">Качество</div>
              <div className="text-sm text-gray-400">Гарантия на все товары</div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Наши ценности</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Принципы, которые определяют нашу работу
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Наша команда</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
              Профессионалы, которые делают Sprint лучше каждый день
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?background=26b864&color=fff&name=${encodeURIComponent(member.name)}&length=2&font-size=0.33&size=128`;
                  }}
                />
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">Готовы сделать покупки?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных клиентов Sprint
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
            >
              Перейти в каталог
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm font-bold px-8 py-3 rounded-full hover:bg-white/30 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;