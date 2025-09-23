import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import translations from '../../../../translations'
import { store } from '../../../store/store'
import { useScale } from '../../../hooks/useScale'
import DateTimePicker from '@react-native-community/datetimepicker';

const Calendar = ({ calendarVisible, setDate, setBirthdate, formatDate, setCalendarVisible, date }) => {
    const { s } = useScale()

    const [tempDate, setTempDate] = useState(new Date())

    // функция с fallback по ключу
    const label = (key: string, fallbackKey: string) => store.labels?.[key] || translations[store?.language]?.[fallbackKey] || fallbackKey;

    const handleChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            // На андроиде сразу закрываем модалку
            setCalendarVisible(false)
            if (selectedDate) {
                setDate(selectedDate)
                setBirthdate(formatDate(selectedDate))
            }
        } else {
            if (selectedDate) {
                setTempDate(selectedDate)
            }
        }
    }

    const confirmDate = () => {
        setDate(tempDate)
        setBirthdate(formatDate(tempDate))
        setCalendarVisible(false)
    }

    const cancelDate = () => {
        setTempDate(date)
        setCalendarVisible(false)
    }

    return (
        <Modal style={{flex: 1}} visible={calendarVisible} transparent animationType="fade">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000055' }}>
                <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center' }}>
                    <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleChange}
                        maximumDate={new Date()}
                        style={{ width: '100%', height: Platform.OS === 'ios' ? 300 : undefined }}
                        themeVariant='light'
                    />

                    {Platform.OS === 'ios' && (
                        <View style={{ flexDirection: 'row', marginTop: 10, gap: s(120)}}>
                            <TouchableOpacity 
                                onPress={cancelDate} 
                                style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#ccc', borderRadius: 10 }}>
                                <Text style={{ color: '#333' }}>{label('cancel', 'отмена')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={confirmDate} 
                                style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#2097EF', borderRadius: 10 }}>
                                <Text style={{ color: 'white' }}>{label('done', 'готово')}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

export default Calendar
