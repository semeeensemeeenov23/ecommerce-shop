import type { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Анна С.',
    rating: 5,
    comment: 'Отличный смартфон! Камера просто шикарная, батарея держит весь день. Очень довольна покупкой!',
    date: '2024-01-15',
  },
  {
    id: 2,
    productId: 1,
    userName: 'Михаил П.',
    rating: 4,
    comment: 'Хороший телефон, но немного нагревается при играх. В остальном все отлично.',
    date: '2024-01-10',
  },
  {
    id: 3,
    productId: 2,
    userName: 'Елена К.',
    rating: 5,
    comment: 'Ноутбук отличный! Легкий, быстрый, батарея держит долго. Для работы и учебы идеально.',
    date: '2024-01-20',
  },
];