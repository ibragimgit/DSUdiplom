import { ref } from 'vue';

// Данные сотрудников доступны сразу
const dummyEmployees = [
  { photo: 'https://via.placeholder.com/100', fio: 'Иван Иванов', position: 'Разработчик' },
  { photo: 'https://via.placeholder.com/100', fio: 'Анна Смирнова', position: 'Дизайнер' },
  { photo: 'https://via.placeholder.com/100', fio: 'Иван Иванов', position: 'Разработчик' },
  { photo: 'https://via.placeholder.com/100', fio: 'Анна Смирнова', position: 'Дизайнер' },
  { photo: 'https://via.placeholder.com/100', fio: 'Иван Иванов', position: 'Разработчик' },
  { photo: 'https://via.placeholder.com/100', fio: 'Анна Смирнова', position: 'Дизайнер' },
  { photo: 'https://via.placeholder.com/100', fio: 'Иван Иванов', position: 'Разработчик' },
  { photo: 'https://via.placeholder.com/100', fio: 'Анна Смирнова', position: 'Дизайнер' },
];

export function useEmployees() {
  const employees = ref(dummyEmployees);

  return { employees };
}