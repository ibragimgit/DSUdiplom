<template>
  <div class="calendar-container">
    <div class="calendar-wrapper">
      <div class="calendar-card">
        <div class="calendar-header">
          <button class="nav-button" @click="prevMonth">←</button>
          <h2>{{ monthYear }}</h2>
          <button class="nav-button" @click="nextMonth">→</button>
        </div>
        <div class="calendar-days">
          <div>{{ $t('calendar.days.sun') }}</div>
          <div>{{ $t('calendar.days.mon') }}</div>
          <div>{{ $t('calendar.days.tue') }}</div>
          <div>{{ $t('calendar.days.wed') }}</div>
          <div>{{ $t('calendar.days.thu') }}</div>
          <div>{{ $t('calendar.days.fri') }}</div>
          <div>{{ $t('calendar.days.sat') }}</div>
        </div>
        <div class="calendar-grid">
          <div
            v-for="day in calendarDays"
            :key="day.key"
            :class="{ day: true, event: day.hasEvent, selected: day.selected, range: day.inRange }"
            @click="selectDate(day)"
          >
            {{ day.day || '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Панель с событиями -->
    <div class="event-list" v-if="selectedDates.length > 0">
      <div class="event-card">
        <h3>{{ $t('calendar.events.title') }}</h3>
        <div v-if="filteredEvents.length === 0" class="no-events">
          {{ $t('calendar.events.noEvents') }}
        </div>
        <div v-for="(event, index) in filteredEvents" :key="index" class="event-item">
          <h4>{{ event.title }}</h4>
          <p>{{ event.date }}</p>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const currentDate = ref(new Date());
const startDate = ref(null);
const endDate = ref(null);
const selectedDates = ref([]);

const events = reactive({
  '2025-06-05': { date: '05.06.2025', title: 'Собрание команды', description: 'Ежемесячное собрание сотрудников.' },
  '2025-06-10': { date: '10.06.2025', title: 'Тренинг', description: 'Обучение новым навыкам.' },
  '2025-06-15': { date: '15.06.2025', title: 'Презентация', description: 'Презентация нового проекта.' },
  '2025-06-20': { date: '20.06.2025', title: 'Праздник', description: 'Корпоративный праздник.' },
});

const monthYear = computed(() =>
  currentDate.value.toLocaleString(locale.value, { month: 'long', year: 'numeric' })
);

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  const prevMonthDays = new Date(year, month, 0).getDate();
  const startDayOffset = (firstDay === 0 ? 6 : firstDay - 1);
  for (let i = startDayOffset - 1; i >= 0; i--) {
    const prevDay = prevMonthDays - i;
    days.push({ key: `prev-${prevDay}`, day: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const event = events[eventKey];
    const dateStr = `${day}.${String(month + 1).padStart(2, '0')}.${year}`;
    const isSelected = selectedDates.value.some(d => d.day === day && d.month === month && d.year === year);
    days.push({
      key: eventKey,
      day,
      month,
      year,
      hasEvent: !!event,
      selected: isSelected,
      inRange: isInRange(day, month, year),
    });
  }

  const totalDays = days.length;
  const remainingDays = (7 - (totalDays % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ key: `next-${i}`, day: null });
  }

  return days;
});

const filteredEvents = computed(() => {
  return Object.values(events).filter(event => {
    const [day, month, year] = event.date.split('.').map(Number);
    return selectedDates.value.some(d => d.day === day && d.month === month - 1 && d.year === year);
  });
});

function selectDate(dayObj) {
  if (!dayObj.day) return;

  if (!startDate.value) {
    startDate.value = { day: dayObj.day, month: dayObj.month, year: dayObj.year };
    selectedDates.value = [startDate.value];
  } else if (!endDate.value) {
    endDate.value = { day: dayObj.day, month: dayObj.month, year: dayObj.year };
    updateSelectedRange();
  } else {
    startDate.value = dayObj;
    endDate.value = null;
    selectedDates.value = [startDate.value];
  }
}

function updateSelectedRange() {
  const start = startDate.value;
  const end = endDate.value;
  selectedDates.value = [];

  const startDateTime = new Date(start.year, start.month, start.day);
  const endDateTime = new Date(end.year, end.month, end.day);
  if (startDateTime > endDateTime) [startDateTime, endDateTime] = [endDateTime, startDateTime];

  const currentMonth = currentDate.value.getMonth();
  const currentYear = currentDate.value.getFullYear();
  for (let d = new Date(startDateTime); d <= endDateTime; d.setDate(d.getDate() + 1)) {
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      selectedDates.value.push({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear() });
    }
  }
}

function isInRange(day, month, year) {
  if (!startDate.value || !endDate.value) return false;
  const start = new Date(startDate.value.year, startDate.value.month, startDate.value.day);
  const end = new Date(endDate.value.year, endDate.value.month, endDate.value.day);
  const current = new Date(year, month, day);
  return current >= start && current <= end;
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  startDate.value = null;
  endDate.value = null;
  selectedDates.value = [];
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  startDate.value = null;
  endDate.value = null;
  selectedDates.value = [];
}

onMounted(() => {
  const today = new Date();
  currentDate.value = today;
  console.log('Calendar mounted, current date:', today.toLocaleDateString());
});
</script>

<style scoped>
.calendar-container {
  padding: 40px 20px; /* Уменьшен горизонтальный padding для предотвращения прокрутки */
  margin: 0 auto;
  background: #fff;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-columns: 1fr; /* По умолчанию одна колонка для лучшей симметрии */
  gap: 40px;
  max-width: 1200px;
  overflow-x: hidden; /* Убирает горизонтальную прокрутку */
}

.calendar-wrapper {
  display: contents;
}

.calendar-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 24px;
  width: 100%;
  max-width: 500px; /* Ограничение ширины для симметрии */
  margin: 0 auto; /* Центрирование */
  transition: box-shadow 0.3s ease;
}

.calendar-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-header h2 {
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1f2937;
}

.nav-button {
  padding: 8px 16px;
  background-color: #2a3b5c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #1f2c40;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 8px 0;
  font-size: 12px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding-top: 16px;
  align-content: start;
  overflow: hidden;
}

.day {
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s ease;
}

.day:hover {
  background: #e6eaf1;
}

.day.event {
  background: #2a3b5c;
  color: #ffffff;
}

.day.selected {
  background: #2a3b5c;
  color: #ffffff;
}

.day.range {
  background: #e6eaf1;
  color: #1f2937;
}

.event-list {
  display: flex;
  justify-content: center;
  align-self: flex-start;
  width: 100%;
}

.event-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 16px;
  width: 100%;
  max-width: 400px; /* Ограничение ширины для симметрии */
  margin: 0 auto; /* Центрирование */
  transition: box-shadow 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.event-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  text-transform: uppercase;
  margin: 0 0 12px 0;
  text-align: center;
}

.event-item {
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f1f3f7;
}

.event-item h4 {
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 6px 0;
}

.event-item p {
  font-size: 12px;
  color: #4b5563;
  margin: 0;
}

.no-events {
  font-size: 14px;
  color: #4b5563;
  text-align: center;
}

/* Адаптивные стили */
@media (min-width: 769px) {
  .calendar-container {
    grid-template-columns: 1fr 1fr; /* Две колонки на десктопе */
  }
}

@media (max-width: 768px) {
  .calendar-container {
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .calendar-card,
  .event-card {
    max-width: 100%;
  }

  .calendar-header h2 {
    font-size: 16px;
  }

  .day {
    font-size: 12px;
    height: 35px;
  }

  .event-card h3 {
    font-size: 16px;
  }

  .event-item h4 {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .calendar-container {
    padding-right: 40px;
    gap: 10px;
  }

  .calendar-card {
    padding: 12px;
  }

  .calendar-header h2 {
    font-size: 14px;
  }

  .nav-button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .calendar-days {
    font-size: 10px;
    padding: 6px 0;
  }

  .day {
    font-size: 10px;
    height: 30px;
  }

  .event-card {
    margin-left: 40px;
  }

  .event-card h3 {
    font-size: 14px;
  }

  .event-item h4 {
    font-size: 12px;
  }

  .event-item p {
    font-size: 10px;
  }

  .no-events {
    font-size: 12px;
  }
}
</style>