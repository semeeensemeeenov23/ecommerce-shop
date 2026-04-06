import { Truck, Shield, HeadphonesIcon, RotateCcw, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Бесплатная доставка',
      description: 'При заказе от 5000 ₽',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Shield,
      title: 'Безопасная оплата',
      description: 'Защита ваших данных',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: HeadphonesIcon,
      title: 'Поддержка 24/7',
      description: 'Всегда на связи',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: RotateCcw,
      title: 'Легкий возврат',
      description: '30 дней на возврат',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Award,
      title: 'Гарантия качества',
      description: '100% оригинальные товары',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Clock,
      title: 'Быстрая доставка',
      description: '1-3 дня по России',
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <section className="py-16 bg-white" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы заботимся о наших клиентах и предлагаем только лучшее
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;