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

    // const year = 2025; // или today.getFullYear()
    // const month = 7; 

    const { timetable, hasFifthWeek, error, loading } = getTimetable();

    // console.log(hasFifthWeek)

    const subjectsByDate = useMemo(() => {
        const map: Record<string, any[]> = {};
    
        timetable?.forEach(item => {
            const dateKey = new Date(item.from).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
    
            if (!map[dateKey]) {
                map[dateKey] = [];
            }
    
            map[dateKey].push({
                name: item?.subject,
                color: item?.color,
                image: item?.subject_image,
            });
        });
    
        return map;
    }, [timetable]);

    const getWorkingDaysRange = () => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
      
        const findStartMonday = (firstDayOfMonth: Date) => {
            const day = firstDayOfMonth.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
            const diff = day === 0 ? 6 : day - 1;
        
            const monday = new Date(firstDayOfMonth);
            monday.setDate(firstDayOfMonth.getDate() - diff);
        
            const temp = new Date(monday);
            for (let i = 0; i < 5; i++) {
                if (temp.getMonth() === firstDayOfMonth.getMonth()) {
                    return monday;
                }
                temp.setDate(temp.getDate() + 1);
            }
        
            // иначе — возвращаем следующий понедельник
            monday.setDate(monday.getDate() + 7);
            return monday;
        };
      
        const findEndFriday = (lastDayOfMonth: Date) => {
            const day = lastDayOfMonth.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
            const diff = day <= 5 ? 5 - day : 5 + (7 - day);
        
            const friday = new Date(lastDayOfMonth);
            friday.setDate(lastDayOfMonth.getDate() + diff);
        
            // Проверим, содержит ли эта неделя хоть один день из текущего месяца
            const temp = new Date(friday);
            temp.setDate(friday.getDate() - 4); // отмотать к понедельнику той недели
        
            for (let i = 0; i < 5; i++) {
                if (temp.getMonth() === lastDayOfMonth.getMonth()) {
                    return friday; // есть хотя бы один день из текущего месяца — оставить
                }
                temp.setDate(temp.getDate() + 1);
            }
        
            // иначе — сдвинем назад на неделю
            friday.setDate(friday.getDate() - 7);
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

    const filledSubjectsByDate = useMemo(() => {
        const map = { ...subjectsByDate };
    
        if (!hasFifthWeek) return map;
    
        const lastRow = rows[rows.length - 1];
    
        const dayOfWeekSubjects: Record<number, Map<string, any>> = {};
    
        workingDays.forEach(date => {
            const day = date.getDay();
            const key = formatDate(date);
            const subjects = subjectsByDate[key];
    
            if (subjects?.length) {
                if (!dayOfWeekSubjects[day]) dayOfWeekSubjects[day] = new Map();
    
                subjects.forEach(subject => {
                    if (!dayOfWeekSubjects[day].has(subject.name)) {
                        dayOfWeekSubjects[day].set(subject.name, subject);
                    }
                });
            }
        });
    
        lastRow.forEach(date => {
            const day = date.getDay();
            const key = formatDate(date);
    
            const subjectMap = dayOfWeekSubjects[day];
            if (subjectMap) {
                const subjects = Array.from(subjectMap.values());
                map[key] = subjects;
            }
        });
    
        return map;
    }, [subjectsByDate, rows, workingDays, hasFifthWeek]);

    return (
        <ScrollView style={{ height: 'auto' }} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ height: 'auto' }}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row' }}>
                    {row.map((date, index) => {

                        const formattedDate = formatDate(date);
                        const subjects = filledSubjectsByDate[formattedDate];
                        
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
                                        color: date.getMonth() === month ? 'black' : '#aaa'
                                    }}
                                >
                                    {date.getDate()}
                                </Text>
                                <View style={{width: '100%', height: '90%', padding: vs(10), gap: Platform.isPad? vs(10) : s(10)}}>
                                    {subjects?.map((subject, index) => {
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