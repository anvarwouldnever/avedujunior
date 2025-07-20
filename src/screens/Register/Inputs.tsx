import { View, Text, TextInput, Platform, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { withTiming } from 'react-native-reanimated';
import translations from '../../../translations';
import { store } from '../../store/store';

const Inputs = ({ setSurname, setName, setFathersName, setBirthdate, setErrorMessage, setHomeAddress, errorMessage, translateY }) => {

    const { s, vs } = useScale()

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [tempDate, setTempDate] = useState(new Date())

    const formatDate = (date: Date) => {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    const handleChange = (event, selectedDate) => {
        if (selectedDate) {
            setTempDate(selectedDate)
        }
    }

    const confirmDate = () => {
        setDate(tempDate)
        setBirthdate(formatDate(tempDate))
        setCalendarVisible(false)
    }

    const cancelDate = () => {
        setTempDate(date) // сброс к текущей дате
        setCalendarVisible(false)
    }

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15), justifyContent: 'center'}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.фамилия}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={translations[store?.language]?.фамилия}
                    onChangeText={(text) => setSurname(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.имя}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={translations[store?.language]?.имя}
                    onChangeText={(text) => setName(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.отчество}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={translations[store?.language]?.отчество}
                    onChangeText={(text) => setFathersName(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                /> 
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.датарождения}</Text>
                <View style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20,  borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput
                        style={{ fontSize: Platform.isPad? vs(12) : s(12), width: '90%', height: '100%' }}
                        placeholder={`дд.мм.гггг`}
                        value={formatDate(date)}
                        editable={false}
                        pointerEvents="none"
                    />
                    <Ionicons onPress={() => setCalendarVisible(prev => !prev)} name='calendar-clear-outline' size={vs(17)} /> 
                </View>
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.домашнийадрес}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={translations[store?.language]?.домашнийадрес}
                    onChangeText={(text) => setHomeAddress(text)}
                    autoCorrect={false}
                    onFocus={() => {
                        translateY.value = withTiming(vs(-150), { duration: 300 })
                    }}
                    onBlur={() => {
                        translateY.value = withTiming(0, { duration: 300 })
                    }}
                /> 
            </View>

            <Modal style={{flex: 1}} visible={calendarVisible} transparent animationType="fade">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000055' }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center' }}>
                        <DateTimePicker
                            value={tempDate}
                            mode="date"
                            display='spinner'
                            onChange={handleChange}
                            maximumDate={new Date()}
                            style={{ width: '100%', height: 300 }}
                            themeVariant='light'
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10, gap: s(120)}}>
                            <TouchableOpacity onPress={cancelDate} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#ccc', borderRadius: 10 }}>
                                <Text style={{ color: '#333' }}>{translations[store?.language]?.отмена}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmDate} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#2097EF', borderRadius: 10 }}>
                                <Text style={{ color: 'white' }}>{translations[store?.language]?.готово}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Inputs;