import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  startOfMonth,
  addMonths,
  subMonths,
  format,
  getDay,
  addDays,
  isSameMonth,
  subDays,
  isSameDay,
  addWeeks,
  subWeeks
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { useScale } from '../../hooks/useScale';

const MiniCalendar = () => {
  const { s, vs } = useScale()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!isSameDay(startOfMonth(selectedDate), currentMonth)) {
      setCurrentMonth(startOfMonth(selectedDate));
    }
  }, [selectedDate]);

  const handleDayChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'next' ? addWeeks(selectedDate, 1) : subWeeks(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newMonth = direction === 'next'
      ? addMonths(currentMonth, 1)
      : subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSelectedDate(newMonth); // Показываем первое число нового месяца
  };

  const getWeekDays = () => {
    // Сдвигаем дату к понедельнику
    const startOfWeekDate = subDays(selectedDate, getDay(selectedDate) - 1);
    return Array.from({ length: 5 }, (_, i) => addDays(startOfWeekDate, i));
  };

  const weekDays = getWeekDays();
  const monthName = capitalize(format(currentMonth, 'LLLL', { locale: ru }));


  return (
    <View style={styles.card}>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Календарь</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Посмотреть все</Text>
        </TouchableOpacity>
      </View>

      {/* Стрелки и месяц */}
      <View style={styles.monthRow}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Feather name="chevron-left" size={20} />
        </TouchableOpacity>

        <Text style={styles.month}>{monthName}</Text>

        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>

      {/* Дни недели */}
      <View style={styles.weekRow}>
        <View style={{width: s(20), height: vs(20)}}/>
        <Text style={styles.dayName}>Пн</Text>
        <Text style={styles.dayName}>Вт</Text>
        <Text style={styles.dayName}>Ср</Text>
        <Text style={styles.dayName}>Чт</Text>
        <Text style={styles.dayName}>Пт</Text>
        <View style={{width: s(20), height: vs(20)}}/>
      </View>

      {/* Даты */}
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => handleDayChange('prev')}>
          <Feather name="chevron-left" size={20} />
        </TouchableOpacity>

        {weekDays.map((date, i) => {
          const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          return (
            <Text
              key={i}
              style={[
                styles.dateNumber,
                isToday && styles.selectedDate
              ]}
            >
              {format(date, 'd')}
            </Text>
          );
        })}

        <TouchableOpacity onPress={() => handleDayChange('next')}>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    height: 220,
    width: '100%',
    gap: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#e2cef2'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  viewAll: {
    color: '#7a5df7',
    fontSize: 14,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  month: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
    textTransform: 'capitalize',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
    fontSize: 18
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateNumber: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontWeight: '400',
    fontSize: 18
  },
  selectedDate: {
    color: '#7a5df7',
    fontWeight: '700',
  },
});

export default MiniCalendar;
