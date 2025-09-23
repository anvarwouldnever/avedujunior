import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
import { ru, uz } from 'date-fns/locale';
import { useScale } from '../../hooks/useScale';
import { useNavigation } from '@react-navigation/native';
import translations from '../../../translations';
import { store } from '../../store/store';

const MiniCalendar = () => {
  const { s, vs, isTablet } = useScale()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation()

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
    setSelectedDate(newMonth);
  };

  const getWeekDays = () => {
    const startOfWeekDate = subDays(selectedDate, getDay(selectedDate) - 1);
    return Array.from({ length: 5 }, (_, i) => addDays(startOfWeekDate, i));
  };

  const weekDays = getWeekDays();
  const monthName = capitalize(format(currentMonth, 'LLLL', { locale: store.language === 'ru' ? ru : uz }));

  return (
    <View style={[styles.card, {height:  isTablet ? '100%' : s(220), width:  isTablet ? '49%' : '100%', gap:  isTablet ? vs(45) : s(20), marginBottom:  isTablet ? vs(30) : s(30), padding:  isTablet ? vs(16) : s(16)}]}>

      <View style={styles.headerRow}>
        <Text style={[styles.title, {fontSize:  isTablet ? vs(18) : vs(16),}]}>{translations[store?.language]?.календарь}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Subjects')}>
          <Text style={[styles.viewAll, {fontSize:  isTablet ? vs(16) : vs(14),}]}>{translations[store?.language]?.посмотретьвсе}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.monthRow}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Feather name="chevron-left" size={ isTablet  ? vs(22) : vs(20)} />
        </TouchableOpacity>

        <Text style={[styles.month, {fontSize:  isTablet ? vs(18) : vs(16), marginHorizontal: vs(8),}]}>{monthName}</Text>

        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Feather name="chevron-right" size={ isTablet  ? vs(22) : vs(20)} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        <View style={{width: vs(20), height: vs(20)}}/>
        <Text style={[styles.dayName, {fontSize:  isTablet ? vs(18) : vs(16)}]}>{translations[store?.language]?.пн}</Text>
        <Text style={[styles.dayName, {fontSize:  isTablet ? vs(18) : vs(16)}]}>{translations[store?.language]?.вт}</Text>
        <Text style={[styles.dayName, {fontSize:  isTablet ? vs(18) : vs(16)}]}>{translations[store?.language]?.ср}</Text>
        <Text style={[styles.dayName, {fontSize:  isTablet ? vs(18) : vs(16)}]}>{translations[store?.language]?.чт}</Text>
        <Text style={[styles.dayName, {fontSize:  isTablet ? vs(18) : vs(16)}]}>{translations[store?.language]?.пт}</Text>
        <View style={{width: vs(20), height: vs(20)}}/>
      </View>

      <View style={[styles.dateRow, {marginTop: vs(8)}]}>
        <TouchableOpacity onPress={() => handleDayChange('prev')}>
          <Feather name="chevron-left" size={ isTablet  ? vs(22) : vs(20)} />
        </TouchableOpacity>

        {weekDays.map((date, i) => {
          const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          return (
            <Text
              key={i}
              style={[
                styles.dateNumber,
                isToday && styles.selectedDate,
                {fontSize:  isTablet ? vs(18) : vs(16)}
              ]}
            >
              {format(date, 'd')}
            </Text>
          );
        })}

        <TouchableOpacity onPress={() => handleDayChange('next')}>
          <Feather name="chevron-right" size={ isTablet  ? vs(22) : vs(20)} />
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
    elevation: 3,
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
  },
  viewAll: {
    color: '#7a5df7'
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  month: {
    fontWeight: '600',
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
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateNumber: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontWeight: '400',
  },
  selectedDate: {
    color: '#7a5df7',
    fontWeight: '700',
  },
});

export default MiniCalendar;
