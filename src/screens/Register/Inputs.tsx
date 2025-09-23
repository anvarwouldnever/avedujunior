import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { withTiming } from 'react-native-reanimated';
import translations from '../../../translations';
import { store } from '../../store/store';
import Calendar from './Inputs/Calendar';
import { observer } from 'mobx-react-lite';

const Inputs = ({ setSurname, setName, setFathersName, setBirthdate, setErrorMessage, setHomeAddress, errorMessage, translateY }) => {

    const { s, vs, isTablet } = useScale()

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [date, setDate] = useState(new Date())

    const formatDate = (date: Date) => {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    const label = (key: string, fallbackKey: string) => store.labels?.[key] || translations[store?.language]?.[fallbackKey];

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15), justifyContent: 'center'}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('lastName', 'фамилия')}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={label('lastName', 'фамилия')}
                    placeholderTextColor="#999"
                    onChangeText={(text) => setSurname(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('firstName', 'имя')}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={label('firstName', 'имя')}
                    placeholderTextColor="#999"
                    onChangeText={(text) => setName(text)}
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('patronymic', 'отчество')}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={label('patronymic', 'отчество')}
                    placeholderTextColor="#999"
                    onChangeText={(text) => setFathersName(text)}
                    autoCorrect={false}
                    onFocus={() => {
                        setErrorMessage(prev => (prev != null ? null : prev))
                        translateY.value = withTiming(vs(-30), { duration: 300 })
                    }}
                    onBlur={() => {
                        translateY.value = withTiming(0, { duration: 300 })
                    }}
                /> 
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('dateOfBirth', 'датарождения')}</Text>
                <View style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20,  borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput
                        style={{ fontSize: isTablet? vs(12) : s(12), width: '90%', height: '100%' }}
                        placeholder={`дд.мм.гггг`}
                        placeholderTextColor="#999"
                        value={formatDate(date)}
                        editable={false}
                        pointerEvents="none"
                    />
                    <Ionicons onPress={() => setCalendarVisible(prev => !prev)} name='calendar-clear-outline' size={vs(17)} /> 
                </View>
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('homeAddress', 'домашнийадрес')}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: isTablet? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={label('homeAddress', 'домашнийадрес')}
                    placeholderTextColor="#999"
                    onChangeText={(text) => setHomeAddress(text)}
                    autoCorrect={false}
                    onFocus={() => {
                        setErrorMessage(prev => (prev != null ? null : prev))
                        translateY.value = withTiming(vs(-150), { duration: 300 })
                    }}
                    onBlur={() => {
                        translateY.value = withTiming(0, { duration: 300 })
                    }}
                /> 
            </View>

            <Calendar calendarVisible={calendarVisible} setDate={setDate} setBirthdate={setBirthdate} formatDate={formatDate} setCalendarVisible={setCalendarVisible} date={date}  />

        </View>
    )
}

export default observer(Inputs);
