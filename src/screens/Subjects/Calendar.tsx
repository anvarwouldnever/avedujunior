import { View, Text, Platform, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useScale } from '../../hooks/useScale';
import { getTimetable } from './hooks/getTimetable';
import { colors } from '../../components/Colors';

const Calendar = () => {
    const { s, vs } = useScale();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const { timetable, error, loading } = getTimetable();

    const subjectsByDate = useMemo(() => {
        const map: Record<string, any[]> = {};

        timetable.forEach(item => {
            map[item?.date] = item?.subjects;
        });

        return map;
    }, [timetable]);

    const getWorkingDaysRange = () => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
    
        const findStartMonday = (date: Date) => {
            const day = date.getDay();
            const diff = day === 0 ? 6 : day - 1;
            const monday = new Date(date);
            monday.setDate(date.getDate() - diff);
            return monday;
        };

        const findEndFriday = (date: Date) => {
            const day = date.getDay();
            const diff = day <= 5 ? 5 - day : 5 + (7 - day);
            const friday = new Date(date);
            friday.setDate(date.getDate() + diff);
            return friday;
        };
    
        const startMonday = findStartMonday(firstDayOfMonth);
        const endFriday = findEndFriday(lastDayOfMonth);
    
        return { startMonday, endFriday };
    };

    const { startMonday, endFriday } = getWorkingDaysRange();

    const getWorkingDaysFullRange = () => {
        const days = [];
        const date = new Date(startMonday);
        while (date <= endFriday) {
            const day = date.getDay();
            if (day >= 1 && day <= 5) {
                days.push(new Date(date));
            }
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const workingDays = getWorkingDaysFullRange();

    const rows = [];
    
    for (let i = 0; i < workingDays.length; i += 5) {
        rows.push(workingDays.slice(i, i + 5));
    };
    
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <ScrollView style={{ height: 'auto' }} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ height: 'auto' }}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row' }}>
                    {row.map((date, index) => {

                        const formattedDate = formatDate(date);
                        const subjects = subjectsByDate[formattedDate] || [];
                        
                        return (
                            <View
                                key={index}
                                style={{
                                    padding: 10,
                                    width: Platform.isPad? vs(200) : s(200),
                                    height: Platform.isPad? vs(200) : s(200),
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    borderRightWidth: index !== row.length - 1 ? 1 : 0,
                                    borderBottomWidth: rowIndex !== rows.length - 1 ? 1 : 0,
                                    borderColor: '#c8cfce',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: Platform.isPad? vs(14) : s(14),
                                        color: date.getMonth() === month ? 'black' : '#aaa' // Серый цвет, если не текущий месяц
                                    }}
                                >
                                    {date.getDate()}
                                </Text>
                                <View style={{width: '100%', height: '90%', padding: vs(10), gap: Platform.isPad? vs(10) : s(10)}}>
                                    {subjects.map((subject, index) => {
                                        const color = colors[index % colors?.length];
                                        return (
                                            <View key={index} style={{backgroundColor: color.primary, width: '100%', height: Platform.isPad? vs(20) : s(20), borderRadius: vs(5), alignItems: 'center',  flexDirection: 'row', paddingHorizontal: vs(15), gap: Platform.isPad? vs(8) : s(8)}}>
                                                <View style={{backgroundColor: subject.color, width: Platform.isPad? vs(7) : s(7), height: Platform.isPad? vs(7) : s(7), borderRadius: 100}}/>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '95%', fontSize: Platform.isPad? vs(12) : s(12) }}>{subject?.name}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )})}
                </View>
            ))}
            </View>
        </ScrollView>
    )
}

export default Calendar;